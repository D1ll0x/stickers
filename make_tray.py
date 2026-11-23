"""Build tray.html, the tap-to-send sticker tray Claude shows in chat, from STICKERS.md."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).parent
BASE = "https://cdn.jsdelivr.net/gh/D1ll0x/stickers@main/stickers/"
SHORT = {
    "Blob: happy and nice": "Happy",
    "Blob: thinking and working": "Thinking",
    "Blob: shocked, mad and sad": "Shocked",
    "Blob: food, drinks and chilling": "Food",
    "Blob: costumes and seasons": "Costumes",
    "Meme: happy and hype": "Happy",
    "Meme: roasting and judging": "Roasting",
    "Meme: shocked and confused": "Shocked",
    "Meme: awkward, sad and done": "Sad & done",
    "Meme: animals": "Animals",
}

items, cats, cat = [], [], ""
for line in (ROOT / "STICKERS.md").read_text(encoding="utf8").splitlines():
    head = re.match(r"^###\s+(.+)$", line)
    if head:
        full = head.group(1).strip()
        cat = full
        cats.append([SHORT.get(full, full), 0 if full.startswith("Blob") else 1])
        continue
    row = re.match(r"^- ([a-z0-9-]+)\.webp — (.*)$", line)
    if row:
        when = row.group(2).rsplit(";", 1)[-1].strip().lower()
        items.append([row.group(1), len(cats) - 1, when])

data = json.dumps({"c": cats, "s": items}, ensure_ascii=False, separators=(",", ":"))

html = """<h2 class="sr-only">Sticker tray: tap a sticker to send it</h2>
<style>
.tr-top{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 10px}
.tr-top input{flex:1 1 180px}
.tr-cats{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 10px}
.tr-cats button{font-size:13px;padding:4px 10px}
.tr-cats button.on{background:var(--bg-accent);color:var(--text-accent);border-color:var(--border-accent)}
.tr-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(76px,1fr));gap:6px;max-height:420px;overflow-y:auto}
.tr-grid button{padding:4px;height:84px;border:0.5px solid var(--border);border-radius:var(--radius);background:var(--surface-2);display:flex;align-items:center;justify-content:center}
.tr-grid img{max-width:72px;max-height:72px;object-fit:contain;pointer-events:none}
.tr-empty{font-size:13px;color:var(--text-secondary)}
</style>
<div class="tr-top"><input id="trq" type="search" placeholder="lol, tired, pizza" aria-label="Search stickers"></div>
<div class="tr-cats" id="trt"></div>
<div class="tr-cats" id="trc"></div>
<div class="tr-grid" id="trg"></div>
<p class="tr-empty" id="tre" hidden>No stickers match that.</p>
<script>
const D=__DATA__,B="__BASE__";let grp=0,cat=-1,q="";
const g=document.getElementById("trg"),t=document.getElementById("trt"),c=document.getElementById("trc"),e=document.getElementById("tre");
const btns=D.s.map(([n])=>{const b=document.createElement("button");b.title=n;b.setAttribute("aria-label","Send "+n);
b.innerHTML='<img loading="lazy" alt="'+n+'" src="'+B+n+'.webp">';b.onclick=()=>sendPrompt("[sticker] "+n+".webp");g.appendChild(b);return b});
const tabs=["Hamsters","Memes"].map((l,i)=>{const b=document.createElement("button");b.textContent=l;b.onclick=()=>{grp=i;cat=-1;draw()};t.appendChild(b);return b});
function chips(){c.innerHTML="";const all=document.createElement("button");all.textContent="All";all.onclick=()=>{cat=-1;draw()};all.classList.toggle("on",cat<0);c.appendChild(all);
D.c.forEach(([l,gi],i)=>{if(gi!==grp)return;const b=document.createElement("button");b.textContent=l;b.onclick=()=>{cat=i;draw()};b.classList.toggle("on",cat===i);c.appendChild(b)})}
function draw(){let n=0;D.s.forEach(([name,ci,w],i)=>{const ok=(q?true:D.c[ci][1]===grp)&&(cat<0||ci===cat)&&(!q||name.includes(q)||w.includes(q));btns[i].style.display=ok?"":"none";if(ok)n++});
tabs.forEach((b,i)=>b.classList.toggle("on",i===grp));chips();e.hidden=n>0}
document.getElementById("trq").oninput=ev=>{q=ev.target.value.trim().toLowerCase();draw()};
draw();
</script>""".replace("__DATA__", data).replace("__BASE__", BASE)

(ROOT / "tray.html").write_text(html, encoding="utf8")
print(f"tray.html: {len(items)} stickers, {len(html)} chars")

# The sticker-picker mod reads these two files from its own folder.
import base64
import io

from PIL import Image

catalog, current = [], ""
for line in (ROOT / "STICKERS.md").read_text(encoding="utf8").splitlines():
    head = re.match(r"^###\s+(.+)$", line)
    if head:
        current = head.group(1).strip()
        continue
    row = re.match(r"^- ([a-z0-9-]+\.webp) — (.*)$", line)
    if row:
        catalog.append({"file": row.group(1), "name": row.group(1)[:-5], "desc": row.group(2), "cat": current})

thumbs = {}
for entry in catalog:
    im = Image.open(ROOT / "stickers" / entry["file"])
    im.thumbnail((104, 104), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "WEBP", quality=65)
    thumbs[entry["file"]] = base64.b64encode(buf.getvalue()).decode()

picker = ROOT / "sticker-picker"
(picker / "catalog.json").write_text(json.dumps(catalog, ensure_ascii=False, separators=(",", ":")), encoding="utf8")
(picker / "thumbs.json").write_text(json.dumps(thumbs, separators=(",", ":")), encoding="utf8")
print(f"sticker-picker: {len(catalog)} stickers in catalog.json and thumbs.json")
