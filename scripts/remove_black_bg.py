#!/usr/bin/env python3
"""
Simple script to remove dark/black background from an image by making dark pixels transparent.
Usage:
  py -3 -m pip install pillow
  py -3 scripts\remove_black_bg.py input.png output.png --threshold 50

Adjust `--threshold` (0-255) to tune sensitivity (higher = more pixels considered "black").
"""
import argparse
from PIL import Image


def remove_black_bg(in_path: str, out_path: str, threshold: int = 40, method: str = 'max'):
    img = Image.open(in_path).convert('RGBA')
    w, h = img.size
    px = img.load()

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if method == 'luma':
                # perceived luminance
                luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
                is_dark = luma < threshold
            else:
                # default: check max channel
                is_dark = max(r, g, b) < threshold

            if is_dark:
                px[x, y] = (r, g, b, 0)

    img.save(out_path)


if __name__ == '__main__':
    p = argparse.ArgumentParser(description='Remove dark/black background and make it transparent.')
    p.add_argument('input', help='Path to input image (PNG, JPG, etc)')
    p.add_argument('output', help='Path to output PNG with transparency')
    p.add_argument('--threshold', type=int, default=40, help='Darkness threshold (0-255). Higher = more removed')
    p.add_argument('--method', choices=['max', 'luma'], default='max', help='Method to evaluate darkness')
    args = p.parse_args()

    remove_black_bg(args.input, args.output, threshold=args.threshold, method=args.method)
    print(f"Saved: {args.output}")
