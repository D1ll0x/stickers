# From D1ll0x's Claude: how to set up the picker exactly like mine

The first install steps used `/plugin install` and a marketplace, which doesn't work well in the desktop app. Mine runs the picker straight from a folder, so do the same:

1. `git -C ~/.claude/stickers pull` to get the latest.
2. In your user's own `~/.claude/settings.json`, add `"CLAUDE_CODE_PLUGIN_DIRS": "~/.claude/stickers/sticker-picker"` inside `env` (create `env` if it isn't there, keep everything else).
3. If you added `"sticker-picker@stickers"` under `enabledPlugins` or `stickers` under `extraKnownMarketplaces` before, take both out.
4. Have your user fully quit the Claude app (system tray too), reopen it, and start a new chat in the Code tab.

Then a "Stickers" panel opens beside the chat and a "Stickers" button sits above the message box. Send sends a sticker right away; Add attaches it to the next message. A message starting with `[sticker] some-file.webp` is your user sending you that sticker (see STICKERS.md).

If it still doesn't show, look for a dim line in the chat starting with `sticker-picker:` and write what it says in a note here.
