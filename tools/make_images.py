"""Draws Engineer Connect's share picture (og-image.png) and app icons.
Usage: python make_images.py <output folder>"""
import math
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT = Path(sys.argv[1])
BG = (17, 22, 29)
ACCENT = (91, 155, 255)
TEXT = (230, 235, 242)
MUTED = (147, 161, 180)
FONT_BOLD = "C:/Windows/Fonts/segoeuib.ttf"
FONT_SEMI = "C:/Windows/Fonts/seguisb.ttf"


def gear_points(cx, cy, r_out, r_in, teeth, rotation=0.0):
    pts = []
    step = 2 * math.pi / teeth
    for k in range(teeth):
        a = k * step + rotation
        for frac, r in ((0.0, r_in), (0.12, r_out), (0.45, r_out), (0.57, r_in)):
            ang = a + frac * step
            pts.append((cx + r * math.cos(ang), cy + r * math.sin(ang)))
    return pts


def draw_gear(d, cx, cy, r, teeth, color, hole_color, rotation=0.0):
    d.polygon(gear_points(cx, cy, r, r * 0.80, teeth, rotation), fill=color)
    d.ellipse([cx - r * 0.30, cy - r * 0.30, cx + r * 0.30, cy + r * 0.30], fill=hole_color)


def gears(d, x, y, s, hole_color):
    """Two meshing gears; (x, y) is the big gear's centre, s its radius."""
    draw_gear(d, x, y, s, 12, ACCENT, hole_color)
    draw_gear(d, x + s * 1.38, y - s * 0.92, s * 0.62, 8, TEXT, hole_color, rotation=0.2)


def og_image():
    S = 2  # draw at double size, then shrink for smooth edges
    W, H = 1200 * S, 630 * S
    img = Image.new("RGB", (W, H), BG)

    # soft colour glows
    glow = Image.new("RGB", (W, H), BG)
    g = ImageDraw.Draw(glow)
    g.ellipse([-500 * S, -420 * S, 700 * S, 520 * S], fill=(32, 56, 104))
    g.ellipse([780 * S, 120 * S, 1600 * S, 900 * S], fill=(16, 64, 66))
    img = Image.blend(img, glow.filter(ImageFilter.GaussianBlur(160 * S)), 0.9)

    d = ImageDraw.Draw(img, "RGBA")
    # blueprint grid
    for x in range(0, W, 32 * S):
        d.line([(x, 0), (x, H)], fill=(91, 155, 255, 40 if x % (160 * S) == 0 else 18), width=S)
    for y in range(0, H, 32 * S):
        d.line([(0, y), (W, y)], fill=(91, 155, 255, 40 if y % (160 * S) == 0 else 18), width=S)

    gears(d, 150 * S, 360 * S, 96 * S, BG)

    title = ImageFont.truetype(FONT_BOLD, 86 * S)
    tag = ImageFont.truetype(FONT_SEMI, 40 * S)
    small = ImageFont.truetype(FONT_SEMI, 30 * S)
    x0 = 400 * S
    d.text((x0, 214 * S), "Engineer", font=title, fill=TEXT)
    w = d.textlength("Engineer", font=title)
    d.text((x0 + w, 214 * S), "Connect", font=title, fill=ACCENT)
    d.rounded_rectangle([x0 + 4 * S, 336 * S, x0 + 300 * S, 342 * S], radius=3 * S, fill=ACCENT)
    d.text((x0, 368 * S), "Where engineers build together", font=tag, fill=TEXT)
    d.text((x0, 432 * S), "Ideas  ·  Connections  ·  Jobs  ·  News", font=small, fill=MUTED)

    img.resize((1200, 630), Image.LANCZOS).save(OUT / "og-image.png", optimize=True)


def icon(size, name):
    S = 4
    W = size * S
    img = Image.new("RGB", (W, W), BG)
    d = ImageDraw.Draw(img)
    gears(d, W * 0.36, W * 0.62, W * 0.24, BG)
    img.resize((size, size), Image.LANCZOS).save(OUT / name, optimize=True)


og_image()
icon(180, "apple-touch-icon.png")
icon(32, "favicon-32.png")
print("done")
