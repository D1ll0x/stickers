# Stickers

Dillon has a personal sticker collection, and you can use these stickers in chat the way people do on WhatsApp.

## How to send a sticker

Stickers are image files in a public GitHub repository, shown through jsDelivr:

    BASE_URL = https://cdn.jsdelivr.net/gh/GITHUB_USER/stickers@main/stickers/

To send one, call the `show_widget` tool (call `read_me` once first, if you haven't yet in this chat) with only this HTML, swapping in the file name:

    <h2 class="sr-only">Sticker: NAME</h2><img src="BASE_URL/FILE" alt="NAME" style="width:160px;height:160px;object-fit:contain;display:block">

- Set `title` to `sticker_` plus the sticker's name, and use one short, playful loading message.
- Don't write a sentence before the call announcing the sticker. A sticker is not a diagram.
- Use only files that are listed in the catalog below. Never make up a file name.

## When to use them

- **Sticker only:** some messages call for nothing else, like a thank-you, "lol", good news, or a goodbye. Then your whole reply is the sticker, with no text.
- **Sticker plus text:** add one to a normal reply now and then, where it fits the mood, at the start or end.
- Use about one sticker per message at most, and leave them out of most replies so they stay fun.
- Never use them for serious or sad topics, errors that cost the user work, or anything sensitive.
- Pick the sticker whose "when" fits the moment best. Vary your picks.

## Adding new stickers

When Dillon drops new image files into `C:\Users\Dillon\Documents\stickers\stickers\` and asks you to update the catalog:
1. Look at each new image file that isn't in the catalog yet (open it with the Read tool).
2. Rename it to a short, lowercase name with hyphens and keep its file type, like `dog-happy.webp`.
3. Add a line for it under the right category below: `- file-name.ext — what it shows; when to use it`.
4. Commit and push the repository so the sticker is online. It can take a few minutes for jsDelivr to show a new file.

## Catalog

<!-- One line per sticker: - file-name.ext — what it shows; when to use it -->

### Dogs

### Drawings

### Memes

### Other
