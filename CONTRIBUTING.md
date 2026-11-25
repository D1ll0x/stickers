# Adding stickers (for Claudes with write access)

This is how a Claude whose user is a collaborator on this repository adds new stickers. Every new sticker goes through a pull request, and the owner (D1ll0x) and their Claude look at it before it lands in `main`. Nothing goes into `main` directly.

You need Python with Pillow (`pip install pillow`) and `git`. Work in your clone, `~/.claude/stickers`.

## 1. Collect

- Only use images your user gives you or picks themselves. Don't download images on your own.
- Put them in `incoming/` at the top of the repository. That folder is ignored by git, so nothing in it gets uploaded.
- Good stickers have one clear expression or idea, read well at small size, and ideally have a transparent background.
- Leave out: anything sexual or gory, photos of private people who didn't agree to it, anything with someone's personal details (names, addresses, phone numbers, chats), and anything hateful.

## 2. Prepare and check for duplicates

Run:

```
py add_stickers.py
```

For each image it makes a 256px WebP in `incoming/ready/`, prints the closest existing stickers with a number (0 = identical, lower = more alike), and draws `incoming/sheet.png` with each new sticker next to its three closest matches.

- Open `sheet.png` and look at it yourself. The number is a hint, your eyes decide.
- "PROBABLY A DUPLICATE": drop it unless it's clearly sharper or better than the one we have. Then it replaces that one, keeping its file name (say so in the pull request).
- "check by eye": a lot of the blob stickers land here because they share the same body. Only the face matters: if the face is different, it's new.
- Two new images that match each other: keep the better one.

## 3. Name and describe

Open each picture in `incoming/ready/` and look at it before you write anything.

- File name: short, lowercase, hyphens, says what it shows: `pizza-eating.webp`, `side-eye-dog.webp`. Check `stickers/` so the name isn't taken.
- Move the file into `stickers/` under that name.
- Add one line to `STICKERS.md` in the right category, in this format:
  `- file-name.webp — what it shows; when to use it`
  The part before the `;` describes the picture plainly (face, pose, props, any text on it). The part after lists moods and moments it fits. Mention it if it reads as suggestive or mean, like the existing lines do.
- Categories: the hamster blob ones go under "Blob: happy and nice", "Blob: thinking and working", "Blob: shocked and scared", "Blob: mad and annoyed", "Blob: sad, tired and cringe", "Blob: food, drinks and chilling" or "Blob: costumes and seasons". Everything else goes under "Meme: hype and happy", "Meme: laughing", "Meme: love and cute", "Meme: chill", "Meme: shocked", "Meme: confused", "Meme: side-eye and sus", "Meme: roasts and callouts", "Meme: mad and yelling", "Meme: sad and crying", "Meme: awkward and cringe" or "Meme: brainrot and random". Real animal photos go under "Meme: cats" or "Meme: other animals", even with text on them. If none fits, use the closest and say so in the pull request.

## 4. Rebuild the generated files

```
py make_tray.py
```

This updates `tray.html` and the picker's `sticker-picker/catalog.json` and `thumbs.json`.

## 5. Open a pull request

```
git checkout -b stickers/<your-user's-github-name>-<date>
git add stickers STICKERS.md tray.html sticker-picker
git commit -m "Add <n> stickers: <a few names>"
git push -u origin HEAD
```

Then open a pull request into `main` (with `gh pr create`, or your user does it on github.com). In the description, list each new sticker with its description line, and any you replaced and why. Leave a short note in `notes/` too, and tell your user so they can let the owner know.

## 6. Review (the owner's side)

The owner's Claude checks out the branch, looks at every new sticker, runs `py add_stickers.py` again against the result if anything seems off, fixes names or descriptions, and merges. If something needs changing on your side, the answer comes as a comment on the pull request or a note in `notes/`.

Don't merge your own pull request, and don't push to `main`.
