(() => {
  const $ = id => document.getElementById(id);
  const src = $('src'), code = $('code'), prev = $('preview');
  let timer;

  const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');

  function decode(buf) {
    try { return new TextDecoder('utf-8', {fatal:true}).decode(buf); }
    catch { return new TextDecoder('windows-874').decode(buf); }
  }

  function convert(text) {
    text = text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
    if ($('optE').checked) text = esc(text);
    if ($('optA').checked)
      text = text.replace(/(https?:\/\/[^\s<]+[^\s<.,;:!?)\]'"])/g,
        u => `<a href="${u}" target="_blank" rel="noopener noreferrer">${u}</a>`);
    if ($('optP').checked)
      return text.split(/\n{2,}/).filter(p => p.trim())
        .map(p => '    <p>' + p.trim().replace(/\n/g, '<br>\n      ') + '</p>').join('\n');
    return '    ' + text.replace(/\n/g, '<br>\n    ');
  }

  function build() {
    const font = $('font').value;
    const gf = font.replace(/ /g, '+');
    return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc($('title').value)}</title>
  <link href="https://fonts.googleapis.com/css2?family=${gf}:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body { max-width: 720px; margin: 40px auto; padding: 0 16px; font-family: '${font}', sans-serif; line-height: 1.8; color: #1e293b; }
    p { margin: 0 0 1.2em; }
    a { color: #4f46e5; word-break: break-all; }
  </style>
</head>
<body>
  <main>
${convert(src.value)}
  </main>
</body>
</html>
`;
  }

  function update() {
    $('count').textContent = src.value.length.toLocaleString('th-TH') + ' ตัวอักษร';
    clearTimeout(timer);
    timer = setTimeout(() => {
      const html = build();
      code.value = html;
      prev.srcdoc = html;
    }, 250);
  }

  function readFile(f) {
    if (!f) return;
    $('fileName').textContent = f.name;
    const base = f.name.replace(/\.[^.]+$/, '');
    $('title').value = base;
    f.arrayBuffer().then(b => { src.value = decode(b); update(); });
  }

  $('file').onchange = e => readFile(e.target.files[0]);
  const drop = $('drop');
  ['dragenter','dragover'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('over'); }));
  ['dragleave','drop'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('over'); }));
  drop.addEventListener('drop', e => readFile(e.dataTransfer.files[0]));

  document.querySelectorAll('[data-sample]').forEach(b => b.onclick = () => {
    src.value = SAMPLES[b.dataset.sample];
    $('title').value = b.textContent;
    update();
  });

  document.querySelectorAll('.tab').forEach(t => t.onclick = () => {
    document.querySelectorAll('.tab').forEach(x => x.classList.toggle('on', x === t));
    const isCode = t.dataset.tab === 'code';
    code.hidden = !isCode; prev.hidden = isCode;
  });

  $('copy').onclick = async () => {
    const btn = $('copy');
    try { await navigator.clipboard.writeText(code.value); }
    catch { code.hidden = false; code.select(); document.execCommand('copy'); code.hidden = prev.hidden === false; }
    const old = btn.textContent; btn.textContent = 'คัดลอกแล้ว';
    setTimeout(() => btn.textContent = old, 1500);
  };

  $('download').onclick = () => {
    const name = ($('title').value.trim() || 'output').replace(/[\\/:*?"<>|]/g, '_') + '.html';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([code.value], {type: 'text/html;charset=utf-8'}));
    a.download = name; a.click(); URL.revokeObjectURL(a.href);
  };

  ['title','font','optP','optA','optE'].forEach(id => $(id).addEventListener('input', update));
  src.addEventListener('input', update);
  SAMPLES && (src.value = SAMPLES.article, update());
})();
