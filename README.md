# Stickers for Claude

A sticker collection Claude can send in chat, like stickers on WhatsApp. Claude sends them on its own when they fit.

Works in Claude Code: the Code tab of the Claude desktop app, or the `claude` terminal app. It doesn't work in regular claude.ai chats.

## Setup

Open a new chat in Claude Code and send this:

> Set up the stickers from https://github.com/D1ll0x/stickers by following the setup steps for Claude in its README.

Once it's done, start a new chat and the stickers are there. New stickers arrive on their own when you start a chat.

## Setup steps for Claude

Do these on the user's computer, after telling them what you're about to change:

1. Make sure `git` is installed. If it isn't, help the user install it.
2. Clone this repository into the user's Claude folder:
   `git clone https://github.com/D1ll0x/stickers.git ~/.claude/stickers`
3. Add this line to the user's global `~/.claude/CLAUDE.md`, creating the file if needed and keeping anything already in it:
   `@~/.claude/stickers/STICKERS.md`
   Do not import `MAINTAINING.md`. It's for the repository owner only.
4. To keep the stickers up to date, add a `SessionStart` hook to `~/.claude/settings.json`, merged with any settings already there:
   ```json
   {
     "hooks": {
       "SessionStart": [
         { "hooks": [ { "type": "command", "command": "git -C ~/.claude/stickers pull -q --ff-only" } ] }
       ]
     }
   }
   ```
5. Tell the user to start a new chat to begin using the stickers.

To remove the stickers later, undo steps 2 to 4.
