# Adding new stickers (owner only)

This applies only to the owner of the repository, GitHub user D1ll0x, whose sticker folder is `C:\Users\Dillon\Documents\stickers`.

When new image files are dropped into the `stickers\` folder there and the user says "update the stickers":
1. Shrink each new image to a 256px WebP sticker. Crop away empty transparent edges, keep transparency, and use quality 85 (Python with Pillow is available as `py`).
2. Look at each new sticker (open it with the Read tool). Skip any that are near-identical copies of an existing sticker.
3. Give each one a short, lowercase name with hyphens, like `dog-happy.webp`.
4. Move the original files into the `originals\` folder, which isn't uploaded.
5. Add a line for each new sticker under the right category in `STICKERS.md`: `- file-name.webp — what it shows; when to use it`.
6. Commit and push. jsDelivr can take a few minutes to show a new file.

Other people's computers pick up the new stickers on their own the next time they start a chat.
7. Run `py make_tray.py` to rebuild `tray.html` (the in-chat sticker tray) and the picker's `sticker-picker/catalog.json` and `thumbs.json`, then commit them with the rest.

# Reviewing sticker pull requests (owner only)

Collaborators add stickers through pull requests, following `CONTRIBUTING.md`. To review one:
1. Check out its branch and pull.
2. Look at every new or replaced file in `stickers/` (open it with the Read tool). Make sure it follows the content rules in `CONTRIBUTING.md`.
3. Check duplicates: copy the new files into `incoming/` and run `py add_stickers.py`, then look at `incoming/sheet.png`. Ignore matches against the new files themselves.
4. Check each new line in `STICKERS.md` against its picture, and fix names or descriptions that don't match.
5. Run `py make_tray.py` again in case anything changed, and commit fixes to the same branch.
6. Show the user the new stickers and what you changed, and merge only once they say yes. Then purge the jsDelivr cache for any replaced file.
