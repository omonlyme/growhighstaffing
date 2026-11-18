"""
Generates the vector Growhigh logo files in brand/svg/ (mark, wordmark, stacked + horizontal lockups,
colour + white versions). Geometry is measured from the original artwork (brand/logo-source.jpeg).

Usage: python3 scripts/build-logo-svg.py
"""
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "brand" / "svg"
OUT.mkdir(parents=True, exist_ok=True)

BLUE_TOP, BLUE_BOTTOM = "#0a74a8", "#11335a"
ORANGE_L, ORANGE_R = "#f7ae1f", "#ec7b22"
TAGLINE = "#1d4b66"
TAGLINE_TEXT = ("STAFFING", "RECRUITMENT CONSULTANCY")
SW = 17  # stroke width of the mark


def f(n):
    return f"{n:.2f}".rstrip("0").rstrip(".")


def rounded_polyline(points, radii):
    """Path through points; interior corners rounded with the given radii (one per interior point)."""
    d = [f"M{f(points[0][0])} {f(points[0][1])}"]
    for i in range(1, len(points) - 1):
        (px, py), (vx, vy), (nx, ny) = points[i - 1], points[i], points[i + 1]
        r = radii[i - 1]
        u1 = ((px - vx), (py - vy)); l1 = math.hypot(*u1); u1 = (u1[0] / l1, u1[1] / l1)
        u2 = ((nx - vx), (ny - vy)); l2 = math.hypot(*u2); u2 = (u2[0] / l2, u2[1] / l2)
        theta = math.acos(max(-1, min(1, u1[0] * u2[0] + u1[1] * u2[1])))
        t = r / math.tan(theta / 2)
        t1 = (vx + u1[0] * t, vy + u1[1] * t)
        t2 = (vx + u2[0] * t, vy + u2[1] * t)
        cross = (vx - px) * (ny - vy) - (vy - py) * (nx - vx)
        sweep = 1 if cross > 0 else 0
        d.append(f"L{f(t1[0])} {f(t1[1])} A{f(r)} {f(r)} 0 0 {sweep} {f(t2[0])} {f(t2[1])}")
    d.append(f"L{f(points[-1][0])} {f(points[-1][1])}")
    return " ".join(d)


# ── Mark (coordinates in the original artwork's pixel space) ─────────────
CX = 159.5
STEM_L, STEM_R, STEM_TOP = 117.5, 201.5, 106
pts = [
    (STEM_L, STEM_TOP),
    (STEM_L, STEM_L + 101),        # bottom-left vertex (on line x - y = -101)
    (31.5, 132.5),                 # left corner
    (CX, 4.5),                     # apex
    (287.5, 132.5),                # right corner
    (STEM_R, 420 - STEM_R),        # bottom-right vertex (on line x + y = 420)
    (STEM_R, STEM_TOP),
]
MARK_PATH = rounded_polyline(pts, [12, 34, 34, 34, 12])
MARK_BOX = (37, 9.5, 246, 199.5)  # x, y, w, h


def mark_body(prefix, white=False):
    stroke = "#ffffff" if white else f"url(#{prefix}-blue)"
    return (
        f'<path d="{MARK_PATH}" fill="none" stroke="{stroke}" stroke-width="{SW}" stroke-linecap="round" stroke-linejoin="round"/>'
        f'<line x1="96.5" y1="148.5" x2="220.5" y2="148.5" stroke="url(#{prefix}-orange)" stroke-width="{SW}" stroke-linecap="round"/>'
        f'<circle cx="{CX}" cy="106" r="21" fill="url(#{prefix}-dot)"/>'
    )


def defs(prefix, y0, y1, x0, x1):
    return (
        "<defs>"
        f'<linearGradient id="{prefix}-blue" x1="0" y1="{f(y0)}" x2="0" y2="{f(y1)}" gradientUnits="userSpaceOnUse">'
        f'<stop offset="0" stop-color="{BLUE_TOP}"/><stop offset="1" stop-color="{BLUE_BOTTOM}"/></linearGradient>'
        f'<linearGradient id="{prefix}-orange" x1="{f(x0)}" y1="0" x2="{f(x1)}" y2="0" gradientUnits="userSpaceOnUse">'
        f'<stop offset="0" stop-color="{ORANGE_L}"/><stop offset="1" stop-color="{ORANGE_R}"/></linearGradient>'
        f'<linearGradient id="{prefix}-dot" x1="{f(CX - 21)}" y1="0" x2="{f(CX + 21)}" y2="0" gradientUnits="userSpaceOnUse">'
        f'<stop offset="0" stop-color="{ORANGE_L}"/><stop offset="1" stop-color="{ORANGE_R}"/></linearGradient>'
        f'<linearGradient id="{prefix}-wblue" x1="0" y1="257" x2="0" y2="358" gradientUnits="userSpaceOnUse">'
        f'<stop offset="0" stop-color="{BLUE_TOP}"/><stop offset="1" stop-color="{BLUE_BOTTOM}"/></linearGradient>'
        "</defs>"
    )


def svg(viewbox, body, title="Growhigh Staffing"):
    x, y, w, h = viewbox
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{f(x)} {f(y)} {f(w)} {f(h)}" width="{f(w)}" height="{f(h)}" role="img" aria-label="{title}">'
        f"<title>{title}</title>{body}</svg>\n"
    )


# ── Wordmark "GROWHiGH" (original artwork coordinates; cap height ~100, stroke 12.5) ──
WS = 12.5


def g_letter(cx):
    """Blue arc + the "⌐" spur. Returns (arc_path, spur_path)."""
    cy, r = 307.5, 44.25
    a0, a1 = math.radians(-44), math.radians(42)
    sx, sy = cx + r * math.cos(a0), cy + r * math.sin(a0)
    ex, ey = cx + r * math.cos(a1), cy + r * math.sin(a1)
    arc = f"M{f(sx)} {f(sy)} A{f(r)} {f(r)} 0 1 0 {f(ex)} {f(ey)}"
    spur = f"M{f(cx + 14)} 309.5 H{f(cx + r)} V349.5"
    return arc, spur


def wordmark_body(prefix, white=False):
    blue = "#ffffff" if white else f"url(#{prefix}-wblue)"
    orange = f"url(#{prefix}-orange)"
    g1_arc, g1_spur = g_letter(330.5)
    g2_arc, g2_spur = g_letter(868.5)
    blue_paths = " ".join([
        g1_arc,
        # R
        "M398.25 349.5 V281 A17.75 17.75 0 0 1 416 263.25 H424.5 A23.13 23.13 0 0 1 424.5 309.5 H416",
        "M424.5 309.5 H433 A16.5 16.5 0 0 1 449.5 326 V349.5",
        # O
        "M516 263.25 A42.75 44.25 0 1 1 515.99 263.25 Z",
        # W
        "M585.25 265.25 V327.75 A24 24 0 0 0 633.25 327.75 V265.25 M633.25 327.75 A24 24 0 0 0 681.25 327.75 V265.25",
        # H
        "M711.25 265.25 V349.75 M766.75 265.25 V349.75 M711.25 303 H766.75",
        # i (stem)
        "M798.25 291.25 V349.75",
        # second G (all blue)
        g2_arc, g2_spur,
        # second H
        "M937.25 265.25 V349.75 M992.75 265.25 V349.75 M937.25 303 H992.75",
    ])
    return (
        f'<path d="{blue_paths}" fill="none" stroke="{blue}" stroke-width="{WS}" stroke-linecap="round" stroke-linejoin="round"/>'
        f'<path d="{g1_spur}" fill="none" stroke="{orange}" stroke-width="{WS}" stroke-linecap="round" stroke-linejoin="round"/>'
        f'<circle cx="798.5" cy="268.5" r="9" fill="{orange}"/>'
    )


FONT_PATH = ROOT / "brand" / "fonts" / "Inter-Medium-latin.ttf"  # SIL Open Font License (see Inter-LICENSE.txt)
TAG_X, TAG_BASELINE, TAG_WIDTH, TAG_CAP = 299.5, 407, 680, 23


def _outline_runs(runs, x0, baseline, cap_height, width):
    """Convert text runs [(text, key)] to SVG path data per key, tracked to exactly `width`."""
    from fontTools.ttLib import TTFont
    from fontTools.pens.svgPathPen import SVGPathPen
    from fontTools.pens.transformPen import TransformPen

    font = TTFont(FONT_PATH)
    gs, cmap, hmtx = font.getGlyphSet(), font.getBestCmap(), font["hmtx"]
    scale = cap_height / font["OS/2"].sCapHeight
    chars = [(ch, key) for text, key in runs for ch in text]
    advances = [hmtx[cmap[ord(c)]][0] * scale for c, _ in chars]
    extra = (width - sum(advances)) / (len(chars) - 1)
    out, x = {}, x0
    for (c, key), adv in zip(chars, advances):
        if c != " ":
            pen = SVGPathPen(gs, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
            gs[cmap[ord(c)]].draw(TransformPen(pen, (scale, 0, 0, -scale, x, baseline)))
            out.setdefault(key, []).append(pen.getCommands())
        x += adv + extra
    return {k: " ".join(v) for k, v in out.items()}


def tagline_body(prefix, white=False):
    color = "#ffffff" if white else TAGLINE
    a, b = TAGLINE_TEXT
    paths = _outline_runs([(a + " ", "ink"), ("|", "bar"), (" " + b, "ink")], TAG_X, TAG_BASELINE, TAG_CAP, TAG_WIDTH)
    return f'<path d="{paths["ink"]}" fill="{color}"/><path d="{paths["bar"]}" fill="url(#{prefix}-orange)"/>'


WORD_BOX = (279, 255, 722, 156)  # x, y, w, h  (wordmark + tagline)


def write(name, viewbox, body):
    (OUT / name).write_text(svg(viewbox, body))
    print("wrote", name)


if __name__ == "__main__":
    for white in (False, True):
        sfx = "-white" if white else ""
        # Mark only (tight) + square version for favicons/app icons
        write(f"mark{sfx}.svg", MARK_BOX, defs("ghm", 10, 208, 88, 230) + mark_body("ghm", white))
        side = MARK_BOX[2] * 1.06
        sq = (MARK_BOX[0] + MARK_BOX[2] / 2 - side / 2, MARK_BOX[1] + MARK_BOX[3] / 2 - side / 2 - 4, side, side)
        write(f"mark-square{sfx}.svg", sq, defs("ghq", 10, 208, 88, 230) + mark_body("ghq", white))

        # Stacked: mark centred above wordmark (as in the original artwork)
        mx, my = 480, 8
        body = (
            defs("ghs", 10, 208, 88, 230)
            + f'<g transform="translate({mx} {my})">{mark_body("ghs", white)}</g>'
            + wordmark_body("ghs", white) + tagline_body("ghs", white)
        )
        write(f"logo-stacked{sfx}.svg", (279, my + MARK_BOX[1] - 1, 722, 411 - (my + MARK_BOX[1] - 1)), body)

        # Horizontal: mark left, wordmark + tagline right
        wx, wy, ww, wh = WORD_BOX
        scale = 0.92 * wh / MARK_BOX[3]
        mark_w = MARK_BOX[2] * scale
        gap = 34
        ty = (wh - MARK_BOX[3] * scale) / 2
        body = (
            defs("ghh", 10, 208, 88, 230)
            + f'<g transform="translate({f(-MARK_BOX[0] * scale)} {f(ty - MARK_BOX[1] * scale)}) scale({f(scale)})">{mark_body("ghh", white)}</g>'
            + f'<g transform="translate({f(mark_w + gap - wx)} {f(-wy)})">{wordmark_body("ghh", white)}{tagline_body("ghh", white)}</g>'
        )
        write(f"logo-horizontal{sfx}.svg", (0, 0, mark_w + gap + ww, wh), body)
