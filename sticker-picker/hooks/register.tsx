import type { Register } from 'claude-code'

const PANE = 'sticker-picker'
const MAX_COLS = 4
// Pane columns each sticker needs so the picture and both buttons fit side by side.
const CELL_COLS = 20
const colsFor = (width?: number) =>
  width ? Math.max(1, Math.min(MAX_COLS, Math.floor(width / CELL_COLS))) : MAX_COLS
const WIN = 12
const SIZE = 100
const BLANK = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}"></svg>`
let firstRow = 0
let pending: string | null = null
const sentWith = new Map<string, string>()
let rowCount = 0
const GROUPS: { id: string; label: string; cats: [string, string][] }[] = [
  { id: 'hamsters', label: 'Hamsters', cats: [
    ['Blob: happy and nice', 'Happy'],
    ['Blob: thinking and working', 'Thinking'],
    ['Blob: shocked, mad and sad', 'Shocked'],
    ['Blob: food, drinks and chilling', 'Food'],
    ['Blob: costumes and seasons', 'Costumes'],
  ] },
  { id: 'memes', label: 'Memes', cats: [
    ['Meme: happy and hype', 'Happy'],
    ['Meme: roasting and judging', 'Roasting'],
    ['Meme: shocked and confused', 'Shocked'],
    ['Meme: awkward, sad and done', 'Sad & done'],
    ['Meme: animals', 'Animals'],
  ] },
]
let group = 'hamsters'
const groupOf = (c: string) => (c.startsWith('Blob') ? 'hamsters' : 'memes')

type Sticker = { file: string; name: string; desc: string; cat: string }

let all: Sticker[] = []
let query = ''
let cat = 'all'
const thumbs = new Map<string, string>()
let loadError = ''

async function load($: any) {
  try {
    all = JSON.parse(await $.fs.read(`${$.plugin.root}/catalog.json`)) as Sticker[]
    loadError = ''
  } catch (err) { all = []; loadError = String((err as Error)?.message ?? err) }
}

async function loadThumbs($: any) {
  if (thumbs.size > 0) return
  try {
    const map = JSON.parse(await $.fs.read(`${$.plugin.root}/thumbs.json`)) as Record<string, string>
    for (const [k, v] of Object.entries(map)) thumbs.set(k, v)
  } catch {}
}

function matches(): Sticker[] {
  const q = query.trim().toLowerCase()
  return all.filter(s =>
    (query.trim() ? true : groupOf(s.cat) === group) &&
    (cat === 'all' || s.cat === cat) &&
    (!q || s.name.includes(q) || s.desc.toLowerCase().includes(q)))
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await load($)
    await $.command.register({ name: 'sticker-picker', description: 'Open the sticker picker' })
    void $.ui.open({ id: PANE, title: 'Stickers' })
    return next(e)
  })

  on('command.run', { command: 'sticker-picker' }, async $ => {
    if (all.length === 0) await load($)
    await $.ui.open({ id: PANE, title: 'Stickers' })
    return { text: 'Sticker picker opened.' }
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text, Button, Input, Svg } = $.ui.resolve(e) as any
    const redraw = () => $.ui.invalidate('ui.render')

    if (all.length === 0) await load($)
    if (all.length === 0) return <Text dimColor>Couldn't read your sticker list. {loadError}</Text>

    // bodyColumns is the pane's own width; viewport.columns is the whole window.
    const paneCols = (e.props as any)?.bodyColumns ?? e.viewport?.columns
    const COLS = colsFor(paneCols)
    const pct = `${Math.floor(100 / COLS)}%`
    // Stack Send over Add when a cell is too narrow to hold both side by side.
    const stackButtons = paneCols ? paneCols / COLS < 24 : false
    const list = matches()
    const shown = list

    await loadThumbs($)

    const send = (s: Sticker) => $.prompt.submit({ text: `[sticker] ${s.file}`, asUser: true })
    const add = (s: Sticker) => { pending = s.file; redraw() }
    const pick = (c: string) => { cat = c; firstRow = 0; redraw() }

    const cell = (s: Sticker, live: boolean) => {
      const b64 = live ? (thumbs.get(s.file) ?? '') : ''
      return (
        <Box key={`cell-${s.file}`} flexDirection="column" alignItems="center" flexGrow={1} flexShrink={1} width={pct} minWidth={0}>
          {Svg
            ? <Svg alt={s.name} width={SIZE} height={SIZE}
                source={b64
                  ? `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}"><image href="data:image/webp;base64,${b64}" width="${SIZE}" height="${SIZE}" preserveAspectRatio="xMidYMid meet"/></svg>`
                  : BLANK} />
            : <Text dimColor>{s.name}</Text>}
          <Box flexDirection={stackButtons ? 'column' : 'row'} alignItems="center" gap={stackButtons ? 0 : 1}>
            <Button key={`send-${s.file}`} label="Send" onPress={() => send(s)} />
            <Button key={`add-${s.file}`} label="Add" dimColor onPress={() => add(s)} />
          </Box>
        </Box>
      )
    }

    const rows = Array.from({ length: Math.ceil(shown.length / COLS) }, (_, r) => shown.slice(r * COLS, r * COLS + COLS))
    rowCount = rows.length
    if (firstRow > Math.max(0, rowCount - WIN)) firstRow = Math.max(0, rowCount - WIN)

    return (
      <Box flexDirection="column" gap={1}>
        <Input key="search" placeholder="Search stickers" value={query} submitLabel="search"
          onInput={(v: string) => { query = v; firstRow = 0; redraw() }}
          onSubmit={(v: string) => { query = v; firstRow = 0; redraw() }} />
        <Box flexDirection="row" gap={1}>
          {GROUPS.map(g => (
            <Button key={`group-${g.id}`} label={g.label}
              {...(group === g.id ? { variant: 'primary' } : {})}
              onPress={() => { group = g.id; cat = 'all'; firstRow = 0; redraw() }} />
          ))}
        </Box>
        <Box flexDirection="row" flexWrap="wrap" gap={1}>
          {[['all', 'All'] as [string, string], ...(GROUPS.find(g => g.id === group)?.cats ?? [])].map(([full, short]) => (
            <Button key={`cat-${group}-${short}`} label={short} dimColor={cat !== full}
              {...(cat === full ? { variant: 'secondary' } : {})}
              onPress={() => pick(full)} />
          ))}
        </Box>
        {list.length === 0 && <Text dimColor>No stickers match that.</Text>}
        {rows.map((row, r) => (
          <Box key={`row-${r}`} flexDirection="row" gap={1}>
            {row.map(st => cell(st, r >= firstRow && r < firstRow + WIN))}
            {Array.from({ length: COLS - row.length }, (_, k) => (
              <Box key={`pad-${r}-${k}`} flexGrow={1} flexShrink={1} width={pct} minWidth={0} />
            ))}
          </Box>
        ))}
      </Box>
    )
  })

  on('ui.scroll', async ($, e, next) => {
    if (e.requestId === PANE && rowCount > WIN) {
      const top = Math.max(0, Math.min(1, (e.offset) / Math.max(1, e.contentRows)))
      const want = Math.max(0, Math.min(rowCount - WIN, Math.floor(top * rowCount) - 3))
      if (Math.abs(want - firstRow) >= 2 || (want === 0 && firstRow !== 0) || (want === rowCount - WIN && firstRow !== want)) {
        firstRow = want
        $.ui.invalidate('ui.render')
      }
    }
    return next(e)
  })

  on('ui.render', { component: 'UserMessage' }, async ($, e, next) => {
    const raw = e.props.text.trim()
    let m = /^\[sticker\] ([a-z0-9-]+\.webp)\s*([\s\S]*)$/.exec(raw)
    if (!m && sentWith.has(raw)) m = Object.assign([raw, sentWith.get(raw)!, raw], { index: 0, input: raw }) as RegExpExecArray
    if (!m) return next(e)
    const { Box, Svg, Text } = $.ui.resolve(e) as any
    await loadThumbs($)
    const b64 = thumbs.get(m[1]) ?? ''
    if (!Svg || !b64) return next(e)
    return (
      <Box width="100%" flexDirection="column" alignItems="flex-end" gap={1}>
        <Svg alt={`Sticker: ${m[1].replace(/\.webp$/, '')}`} width={140} height={140}
          source={`<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140"><image href="data:image/webp;base64,${b64}" width="140" height="140" preserveAspectRatio="xMidYMid meet"/></svg>`} />
        {m[2] ? <Text>{m[2]}</Text> : null}
      </Box>
    )
  })

  on('prompt.submit', async ($, e, next) => {
    const kind = (e.origin as any)?.kind
    if (!pending || !['composer', 'bridge', 'sdk', 'unclassified'].includes(kind) || e.command) return next(e)
    if (/^\[sticker\] /.test(e.text)) return next(e)
    const file = pending
    pending = null
    sentWith.set(e.text.trim(), file)
    $.ui.invalidate('ui.render')
    return next({ ...e, text: `[sticker] ${file} ${e.text}`.trim() })
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) return next(e)
    const { Box, Button, Svg, Text } = $.ui.resolve(e) as any
    await loadThumbs($)
    const b64 = pending ? (thumbs.get(pending) ?? '') : ''
    return (
      <Box flexDirection="row" alignItems="center" gap={1}>
        <Button key="open-stickers" label="Stickers" dimColor
          onPress={() => $.ui.open({ id: PANE, title: 'Stickers' })} />
        {pending && Svg && b64
          ? <Svg alt={`Attached sticker: ${pending}`} width={40} height={40}
              source={`<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><image href="data:image/webp;base64,${b64}" width="40" height="40" preserveAspectRatio="xMidYMid meet"/></svg>`} />
          : null}
        {pending ? <Text dimColor>goes with your next message</Text> : null}
        {pending
          ? <Button key="drop-sticker" label="Remove" dimColor onPress={() => { pending = null; $.ui.invalidate('ui.render') }} />
          : null}
      </Box>
    )
  })
}
