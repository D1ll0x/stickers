"""Get new sticker images ready and check them for duplicates.

Usage: py add_stickers.py [folder]      (default folder: incoming)

For each image in the folder (png, jpg, jpeg, webp, gif) it:
- crops away empty transparent edges and shrinks it to a 256px WebP at quality 85,
  saved to <folder>/ready/<original name>.webp
- compares it with every sticker already in stickers/ and with the other new ones,
  and lists the closest matches
- draws <folder>/sheet.png: each new sticker next to its three closest existing
  stickers, so the duplicates can be checked by eye

It never touches stickers/ or STICKERS.md: naming, describing and moving the files
is done by hand afterwards (see CONTRIBUTING.md).
"""
import sys
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).parent
EXTS = {".png", ".jpg", ".jpeg", ".webp", ".gif"}
SIZE = 256
LIKELY = 24  # differing bits out of 256 at or below which two images are probably the same picture
CHECK = 44   # at or below this, look at them side by side (different blob faces often land here)


def prepare(path: Path) -> Image.Image:
    im = Image.open(path)
    im.seek(0)
    im = im.convert("RGBA")
    box = im.getchannel("A").getbbox()
    if box:
        im = im.crop(box)
    im.thumbnail((SIZE, SIZE), Image.LANCZOS)
    return im


def fingerprint(im: Image.Image) -> list[bool]:
    flat = Image.new("RGBA", im.size, (255, 255, 255, 255))
    flat.alpha_composite(im.convert("RGBA"))
    small = flat.convert("L").resize((17, 16), Image.LANCZOS)
    px = small.load()
    return [px[x, y] > px[x + 1, y] for y in range(16) for x in range(16)]


def distance(a: list[bool], b: list[bool]) -> int:
    return sum(x != y for x, y in zip(a, b))


def main() -> None:
    folder = ROOT / (sys.argv[1] if len(sys.argv) > 1 else "incoming")
    new = sorted(p for p in folder.iterdir() if p.is_file() and p.suffix.lower() in EXTS) if folder.exists() else []
    if not new:
        print(f"No images in {folder}. Put the new sticker images there first.")
        return

    ready = folder / "ready"
    ready.mkdir(exist_ok=True)
    existing = {p.name: fingerprint(Image.open(p)) for p in sorted((ROOT / "stickers").glob("*.webp"))}

    prepared = []
    for path in new:
        im = prepare(path)
        out = ready / (path.stem + ".webp")
        im.save(out, "WEBP", quality=85)
        prepared.append((path.name, out, im, fingerprint(im)))

    rows = []
    for i, (name, out, im, fp) in enumerate(prepared):
        near = sorted((distance(fp, other), other_name) for other_name, other in existing.items())[:3]
        twins = [(distance(fp, p[3]), p[0]) for j, p in enumerate(prepared) if j != i]
        twins = [t for t in twins if t[0] <= LIKELY]
        best = near[0][0] if near else 999
        verdict = "PROBABLY A DUPLICATE" if best <= LIKELY else "check by eye" if best <= CHECK else "looks new"
        print(f"{name} -> ready/{out.name} {im.size[0]}x{im.size[1]}: {verdict}")
        print("   closest: " + ", ".join(f"{n} ({d})" for d, n in near))
        if twins:
            print("   also close to new: " + ", ".join(f"{n} ({d})" for d, n in twins))
        rows.append((name, im, near))

    cell, label = 150, 16
    sheet = Image.new("RGB", (cell * 4, (cell + label) * len(rows)), "white")
    draw = ImageDraw.Draw(sheet)
    for r, (name, im, near) in enumerate(rows):
        y = r * (cell + label)
        tiles = [(f"NEW {name}", im)] + [(f"{n} ({d})", Image.open(ROOT / "stickers" / n).convert("RGBA")) for d, n in near]
        for c, (text, tile) in enumerate(tiles):
            tile = tile.copy()
            tile.thumbnail((cell - 6, cell - 6))
            sheet.paste(tile, (c * cell + 3, y + 3), tile)
            draw.text((c * cell + 3, y + cell + 1), text[:24], fill="black")
    sheet.save(folder / "sheet.png")
    print(f"\nWrote {len(rows)} stickers to {ready} and the comparison sheet to {folder / 'sheet.png'}.")
    print("Lower numbers are more alike (0 = identical). Open sheet.png and look before deciding.")


if __name__ == "__main__":
    main()
