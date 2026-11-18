"""
Regenerate every logo/icon asset from a single source logo image.

Usage:  python3 scripts/build-logos.py [path/to/logo.png]   (default: brand/logo-source.jpeg)

The source should be the stacked logo (mark on top, "GROWHIGH" wordmark, tagline
underneath) on a white/light background. Outputs go to public/ and public/images/.
Requires Pillow (pip install pillow).
"""
import sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "images"
OUT.mkdir(parents=True, exist_ok=True)

src = Image.open(sys.argv[1] if len(sys.argv) > 1 else ROOT / "brand" / "logo-source.jpeg").convert("RGB")

# Scale small sources up / huge sources down so processing is consistent.
if src.height < 800:
    f = 800 / src.height
    src = src.resize((round(src.width * f), round(src.height * f)), Image.LANCZOS)

W, H = src.size
EDGE = max(6, W // 150)  # ignore any thin border/frame around the image
px = src.load()


def ink(x, y):
    return min(px[x, y]) < 200


rows = [y for y in range(EDGE, H - EDGE) if any(ink(x, y) for x in range(EDGE, W - EDGE, 2))]
segs = []
for y in rows:
    if segs and y <= segs[-1][1] + 3:
        segs[-1][1] = y
    else:
        segs.append([y, y])
segs = [s for s in segs if s[1] - s[0] > 3]
if len(segs) < 3:
    sys.exit(f"Expected mark / wordmark / tagline bands, found {len(segs)}: {segs}")
mark_band, word_band, tag_band = segs[0], segs[-2], segs[-1]


def cols(y0, y1):
    xs = [x for x in range(EDGE, W - EDGE) if any(ink(x, y) for y in range(y0, y1 + 1, 2))]
    return xs[0], xs[-1]


def to_transparent(img):
    """White background -> alpha, un-premultiplying anti-aliased edges."""
    img = img.convert("RGBA")
    p = img.load()
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, _ = p[x, y]
            a = 255 - min(r, g, b)
            if a < 10:
                p[x, y] = (255, 255, 255, 0)
                continue
            af = a / 255
            un = lambda c: max(0, min(255, round((c - (1 - af) * 255) / af)))
            p[x, y] = (un(r), un(g), un(b), a)
    return img


def whiten(img):
    """Brand blues -> white, keep the orange accents (for dark backgrounds)."""
    img = img.copy()
    p = img.load()
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = p[x, y]
            if a and not (r > 170 and r > b + 70):
                p[x, y] = (255, 255, 255, a)
    return img


def crop_band(band, pad):
    x0, x1 = cols(*band)
    return to_transparent(src.crop((x0 - pad, band[0] - pad, x1 + pad + 1, band[1] + pad + 1)))


def comp(base, im, xy):
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    layer.paste(im, xy)
    return Image.alpha_composite(base, layer)


def fit_h(img, h):
    return img.resize((round(img.width * h / img.height), h), Image.LANCZOS)


pad = 4
# Full stacked logo
x0 = min(cols(*b)[0] for b in (mark_band, word_band, tag_band))
x1 = max(cols(*b)[1] for b in (mark_band, word_band, tag_band))
full = to_transparent(src.crop((x0 - pad, mark_band[0] - pad, x1 + pad + 1, tag_band[1] + pad + 1)))
full = fit_h(full, 330)
full.save(OUT / "logo.png", optimize=True)
whiten(full).save(OUT / "logo-white.png", optimize=True)

# Mark
mark = crop_band(mark_band, pad)
mark = mark.crop(mark.getbbox())

# Square icon + favicons
s = round(max(mark.size) * 1.12)
sq = comp(Image.new("RGBA", (s, s), (0, 0, 0, 0)), mark, ((s - mark.width) // 2, (s - mark.height) // 2))
sq.resize((512, 512), Image.LANCZOS).save(OUT / "logo-mark.png", optimize=True)
sq.resize((32, 32), Image.LANCZOS).save(ROOT / "public" / "favicon-32.png")
sq.resize((192, 192), Image.LANCZOS).save(ROOT / "public" / "icon-192.png")
touch = comp(Image.new("RGBA", (180, 180), (255, 255, 255, 255)), sq.resize((150, 150), Image.LANCZOS), (15, 15))
touch.convert("RGB").save(ROOT / "public" / "apple-touch-icon.png")

# Horizontal lockup: mark | wordmark over tagline
words_src = to_transparent(src.crop((cols(word_band[0], tag_band[1])[0] - pad, word_band[0] - pad,
                                     cols(word_band[0], tag_band[1])[1] + pad + 1, tag_band[1] + pad + 1)))
words_src = words_src.crop(words_src.getbbox())
Hh = 162
mk = fit_h(mark, Hh)
wd = fit_h(words_src, round(Hh * 0.74))
gap = round(Hh * 0.17)
horiz = Image.new("RGBA", (mk.width + gap + wd.width, Hh), (0, 0, 0, 0))
horiz = comp(horiz, mk, (0, 0))
horiz = comp(horiz, wd, (mk.width + gap, (Hh - wd.height) // 2))
horiz.save(OUT / "logo-horizontal.png", optimize=True)
whiten(horiz).save(OUT / "logo-horizontal-white.png", optimize=True)

print("Generated:", ", ".join(p.name for p in sorted(OUT.glob("logo*.png"))), "+ favicons")
print("Horizontal logo size:", horiz.size, "(update width/height in Header.astro if the ratio changed)")


# ── Open Graph share image (1200×630) ──────────────────────────
from PIL import ImageDraw, ImageFilter, ImageFont


def font(bold, size):
    for p in (
        f"/System/Library/Fonts/Supplemental/Arial{' Bold' if bold else ''}.ttf",
        f"/usr/share/fonts/truetype/dejavu/DejaVuSans{'-Bold' if bold else ''}.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ):
        if Path(p).exists():
            return ImageFont.truetype(p, size)
    return ImageFont.load_default(size)


OW, OH = 1200, 630
og = Image.new("RGB", (OW, OH))
d = ImageDraw.Draw(og)
top, bot = (6, 26, 46), (14, 53, 87)
for y in range(OH):
    t = y / OH
    d.line([(0, y), (OW, y)], fill=tuple(int(top[i] + (bot[i] - top[i]) * t) for i in range(3)))
glow = Image.new("L", (OW, OH), 0)
ImageDraw.Draw(glow).ellipse((750, -250, 1350, 350), fill=110)
og = Image.composite(Image.new("RGB", (OW, OH), (27, 108, 168)), og, glow.filter(ImageFilter.GaussianBlur(120))).convert("RGBA")
ov = Image.new("RGBA", (OW, OH), (0, 0, 0, 0))
od = ImageDraw.Draw(ov)
for cx, cy, s, col in [(1080, 120, 300, (255, 255, 255, 22)), (1000, 560, 160, (243, 146, 0, 60))]:
    od.polygon([(cx, cy - s), (cx + s, cy), (cx, cy + s), (cx - s, cy)], outline=col, width=3)
og = Image.alpha_composite(og, ov)
og = comp(og, fit_h(whiten(horiz), 84), (80, 74))
d = ImageDraw.Draw(og)
big = font(True, 76)
d.text((80, 250), "Connecting Talent", font=big, fill="white")
d.text((80, 340), "with ", font=big, fill="white")
d.text((80 + d.textlength("with ", font=big), 340), "Opportunity.", font=big, fill=(243, 146, 0))
d.rounded_rectangle((80, 460, 84, 500), radius=2, fill=(243, 146, 0))
d.text((100, 462), "Recruitment & Staffing Solutions  ·  Growing Careers, Building Businesses.", font=font(False, 28), fill=(210, 222, 235))
d.text((80, 560), "growhighstaffing.com", font=font(True, 26), fill=(243, 146, 0))
og.convert("RGB").save(ROOT / "public" / "og-image.jpg", quality=88)
print("Generated: og-image.jpg")
