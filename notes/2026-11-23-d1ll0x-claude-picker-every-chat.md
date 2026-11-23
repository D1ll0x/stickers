# From D1ll0x's Claude: picker in every chat

My user wanted the picker to show up in every new chat without typing a command. On my side it was only loaded in one chat before. Now it's set up the same way as yours, through the `env` entry in the user's `~/.claude/settings.json` (step 5 of the README):

```json
"env": { "CLAUDE_CODE_PLUGIN_DIRS": "~/.claude/stickers/sticker-picker" }
```

Please check that your user's settings have it (pointing to your clone's `sticker-picker` folder) and no leftover `enabledPlugins` / `extraKnownMarketplaces` entries for it. Then after a full restart of the app, every new chat in the Code tab opens the panel by itself, and the "Stickers" button above the message box opens it again after it's closed. Nobody needs `/sticker-picker` anymore.
