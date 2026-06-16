#!/usr/bin/env python3
"""Letterbox article PNGs to 2000×800 (5:2) — scale-to-fit, no crop."""

from __future__ import annotations

import argparse
import shutil
from pathlib import Path

from PIL import Image

TARGET_W, TARGET_H = 2000, 800
PAD_RGB = (0x1A, 0x0A, 0x2E)  # dark purple

PREFIXES = (
    "x-article-",
    "article-ugc-",
    "ugc-tiktok-grid",
    "ugc-clickbait-",
)


def matches_article_asset(name: str) -> bool:
    if not name.endswith(".png") or name.endswith("-5x2.png"):
        return False
    return any(name.startswith(p) for p in PREFIXES)


def letterbox(im: Image.Image, bg: tuple[int, int, int] = PAD_RGB) -> Image.Image:
    src = im.convert("RGB")
    scale = min(TARGET_W / src.width, TARGET_H / src.height)
    new_w = max(1, round(src.width * scale))
    new_h = max(1, round(src.height * scale))
    resized = src.resize((new_w, new_h), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (TARGET_W, TARGET_H), bg)
    x = (TARGET_W - new_w) // 2
    y = (TARGET_H - new_h) // 2
    canvas.paste(resized, (x, y))
    return canvas


def center_crop_cover(im: Image.Image) -> Image.Image:
    """Cover-scale then center-crop to 2000×800 (for comparison only)."""
    src = im.convert("RGB")
    scale = max(TARGET_W / src.width, TARGET_H / src.height)
    new_w = max(1, round(src.width * scale))
    new_h = max(1, round(src.height * scale))
    resized = src.resize((new_w, new_h), Image.Resampling.LANCZOS)
    left = (new_w - TARGET_W) // 2
    top = (new_h - TARGET_H) // 2
    return resized.crop((left, top, left + TARGET_W, top + TARGET_H))


def verify_fits(canvas: Image.Image, orig: Image.Image) -> None:
    assert canvas.size == (TARGET_W, TARGET_H)
    scale = min(TARGET_W / orig.width, TARGET_H / orig.height)
    assert round(orig.width * scale) <= TARGET_W
    assert round(orig.height * scale) <= TARGET_H


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--assets",
        type=Path,
        default=Path(__file__).resolve().parents[1] / "assets",
    )
    parser.add_argument(
        "--export",
        type=Path,
        default=Path.home() / "Downloads" / "joltra-article-assets",
    )
    parser.add_argument("--comparison-hero-v2", action="store_true")
    args = parser.parse_args()

    assets: Path = args.assets
    export: Path = args.export
    export.mkdir(parents=True, exist_ok=True)

    sources = sorted(p for p in assets.glob("*.png") if matches_article_asset(p.name))
    if not sources:
        print("No matching source PNGs found.")
        return

    processed = 0
    for src_path in sources:
        im = Image.open(src_path)
        out = letterbox(im)
        verify_fits(out, im)
        out_path = assets / f"{src_path.stem}-5x2.png"
        out.save(out_path, "PNG", optimize=True)
        shutil.copy2(out_path, export / out_path.name)
        processed += 1
        print(f"OK {src_path.name} -> {out_path.name} ({im.size} -> {out.size})")

    if args.comparison_hero_v2:
        hero = assets / "x-article-50-fake-creators-hero-v2.png"
        if hero.exists():
            im = Image.open(hero)
            crop = center_crop_cover(im)
            box = letterbox(im)
            comp = Image.new("RGB", (TARGET_W * 2, TARGET_H), PAD_RGB)
            comp.paste(crop, (0, 0))
            comp.paste(box, (TARGET_W, 0))
            comp_path = assets / "x-article-50-fake-creators-hero-v2-crop-vs-letterbox.png"
            comp.save(comp_path, "PNG", optimize=True)
            shutil.copy2(comp_path, export / comp_path.name)
            print(f"Comparison: {comp_path.name} (left=crop, right=letterbox)")

    print(f"\nProcessed {processed} images -> {export}")


if __name__ == "__main__":
    main()
