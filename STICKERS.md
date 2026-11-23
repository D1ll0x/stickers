# Stickers

Dillon has a personal sticker collection, and you can use these stickers in chat the way people do on WhatsApp.

## How to send a sticker

Stickers are image files in a public GitHub repository, shown through jsDelivr:

    BASE_URL = https://cdn.jsdelivr.net/gh/D1ll0x/stickers@main/stickers/

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

Most stickers show the same character: a round white blob (hamster-like) meme drawing.

### Blob: happy and nice
- thumbs-up.webp — blob giving a big thumbs up; approval, "nice", "done", agreeing
- happy-blush.webp — blushing, content smile; happy, pleased, "aww"
- shy-blush.webp — shy, blushing; flattered by a compliment
- flirty-lashes.webp — long lashes, cute smile; flirty, "you're sweet"
- laughing.webp — big open-mouth laugh; lol, funny, happy
- crazy-tongue.webp — derpy laugh with tongue out; crazy, very funny, silly
- blep.webp — little tongue out; playful, teasing, cheeky
- peace.webp — sneaky peace sign; hi, bye, cheeky
- thank-you.webp — "Thank You" with hearts; thanks
- holding-mini.webp — holding a tiny blob; wholesome, cute, "mini me"
- rainbow-tears.webp — teary-eyed in front of a rainbow; touched, wholesome, "everything is fine now"
- unicorn-ride.webp — riding a unicorn, overjoyed; celebrating, great news, magical
- flex.webp — flexing an arm; strong, "nailed it", motivation
- fairy-tutu.webp — tutu and star wand; magic, fabulous, "poof, fixed"
- cats.webp — with two cats; cats, cuteness

### Blob: thinking and working
- typing.webp — glasses, typing on a keyboard; working, coding, "on it"
- actually.webp — nerd glasses, finger raised; "actually...", fun fact, explaining
- rubiks-genius.webp — glasses, solving a Rubik's cube; clever, figuring it out
- detective.webp — magnifying glass; investigating, looking into it
- confused.webp — tilted head, worried eyes; confused, "huh?"
- eyebrow-raise.webp — one eyebrow raised; suspicious, skeptical, "hmm"
- side-eye.webp — huge zoomed side eye; side eye, "I saw that"
- nervous-fingers.webp — fingertips tapping together; nervous, hopeful, waiting
- evil-scheme.webp — evil grin, hands together; scheming, plotting, having a plan
- smug.webp — wide smug grin; smug, proud, "told you"

### Blob: shocked, mad and sad
- gasp.webp — wide-eyed gasp; surprised, "omg"
- jaw-drop.webp — mouth hanging open way down; speechless, stunned
- horrified.webp — shocked open mouth; horrified, "noooo"
- skeleton-shock.webp — electrocuted, skeleton showing; extremely shocked
- rage-scream.webp — screaming with flames behind; angry, furious, or extremely hyped
- power-up.webp — spiky green hair, screaming; powering up, going all out
- breaking-chains.webp — screaming while breaking chains; freedom, finally done, unleashed
- cringe-teeth.webp — clenched teeth grimace; awkward, cringe, yikes
- intense-stare.webp — intense, serious face; "bruh", disgusted, dead serious
- unimpressed.webp — squinting, pursed lips; unimpressed, doubtful
- deadpan.webp — blank, deadpan face; "really?", no reaction
- dramatic-swoon.webp — hand on forehead, swooning; exhausted, drama, "ugh"
- sad-pout.webp — sad little pout; disappointed, sad
- fading-away.webp — blob fading out; disappearing, leaving, "I'm out"
- rip.webp — in a coffin with flowers; "I'm dead" (laughing), RIP, it's over
- lurking.webp — peeking from the shadows; lurking, watching, sneaky

### Blob: food, drinks and chilling
- coffee-tired.webp — tired eyes, holding coffee; morning, need coffee, tired
- soda.webp — cola cap, holding soda cans; drinks, thirsty, cheers
- lollipop.webp — propeller hat, licking a lollipop; sweets, childlike joy
- pizza-eating.webp — eating a slice of pizza; food, hungry, eating
- pizza-costume.webp — dressed as a pizza slice; pizza, food, silly
- cozy-movie-night.webp — blanket, popcorn and laptop; chilling, movie night, relaxing
- good-night.webp — pajamas, nightcap and candle; good night, sleepy, bedtime
- money-rain.webp — sunglasses, money raining down; rich, payday, "deal with it"
- cash-hands.webp — smirking, holding cash; money, profit, got paid
- bucket-hat.webp — wearing a bucket hat; casual, chill

### Blob: costumes and seasons
- batman.webp — bat costume and cape; hero, "I'll handle it"
- batman-nervous.webp — bat costume, sweating; nervous hero, "uh oh"
- spiderman.webp — spider costume; hero, spider jokes
- winter-cozy.webp — knit hat, jacket and mittens; cold weather, bundled up, winter
- freezing.webp — blue and frozen in snow; freezing cold
- snowman.webp — blob as a snowman; winter, snow
- santa-cocoa.webp — Santa hat, cup of cocoa; Christmas, holidays
- elf.webp — elf costume; Christmas, holidays
- grinch.webp — green and grumpy, Christmas sweater; grumpy, hating something festive
- pumpkin.webp — blob as a jack-o'-lantern; Halloween, autumn

### Real animals
- dog-stare.webp — Bernese mountain dog staring straight ahead; "looking at you", waiting, judging
- dog-side-glance.webp — Bernese mountain dog glancing sideways; side eye, suspicious, unsure
- lizard.webp — a real lizard held in a hand; reptiles, lizards, "look at this guy"
