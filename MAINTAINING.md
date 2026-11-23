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
