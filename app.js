// ===== 小工具 =====
const $view = document.getElementById('view');
const $title = document.getElementById('page-title');

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 所有項目攤平，並記住屬於哪個分類
const ALL = NOTES.flatMap(cat => cat.items.map(it => ({ ...it, cat: cat.id, catName: cat.name })));
const CAT = Object.fromEntries(NOTES.map(c => [c.id, c]));
const isCard = it => it.front && it.back;

// ===== 「已熟／不熟」存在手機裡 =====
const STORE_KEY = 'english-study-status';
let status = {};
try { status = JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { status = {}; }

function setStatus(id, value) {
  if (value) status[id] = value; else delete status[id];
  try { localStorage.setItem(STORE_KEY, JSON.stringify(status)); } catch (e) { /* 存不了就算了 */ }
  if (value === 'unknown') logError(id);
}
// 📊 弱點分析：每張卡片答錯（或標不熟）幾次（10/24）
const ERR_KEY = 'english-study-errlog';
let errLog = {};
try { errLog = JSON.parse(localStorage.getItem(ERR_KEY)) || {}; } catch (e) {}
function logError(id) {
  errLog[id] = (errLog[id] || 0) + 1;
  try { localStorage.setItem(ERR_KEY, JSON.stringify(errLog)); } catch (e) {}
}
function badge(id) {
  if (status[id] === 'known') return '<span class="badge known">已熟</span>';
  if (status[id] === 'unknown') return '<span class="badge unknown">不熟</span>';
  return '';
}
function statusButtons(id) {
  const s = status[id];
  return `<div class="small-btns">
    <button data-mark="unknown" data-id="${esc(id)}" class="${s === 'unknown' ? 'on-unknown' : ''}">😵 不熟</button>
    <button data-mark="known" data-id="${esc(id)}" class="${s === 'known' ? 'on-known' : ''}">😎 已熟</button>
  </div>`;
}
// 不熟的排最前面，再來是還沒標記的，已熟的排最後
function byPriority(items) {
  const rank = it => status[it.id] === 'unknown' ? 0 : status[it.id] === 'known' ? 2 : 1;
  return shuffle(items).sort((a, b) => rank(a) - rank(b));
}

// ===== 目前在哪裡 =====
let currentTab = 'notes';
let currentCat = null;   // null = 在大分類首頁；'all' = 全部混在一起（卡片、測驗用）
let openItem = null;     // 筆記分頁：正在看的那一則

function itemsInCat() {
  if (currentCat === 'wrong') return ALL.filter(it => status[it.id] === 'unknown');   // 📕 錯題本：答錯、標不熟的
  return currentCat === 'all' ? ALL : ALL.filter(it => it.cat === currentCat);
}
function catStyle(c) { return `style="--c:${esc(c.color || '#1f5a6b')}"`; }

// ===== 大分類卡片（三個分頁共用） =====
function renderCatGrid(mode) {
  const intro = {
    notes: '選一個分類開始看筆記',
    cards: '要練哪一類？一次 20 題選擇題，不熟的會先出現',
    quiz: '要測驗哪一類？一次 10 題'
  }[mode];
  const countText = c => {
    const items = ALL.filter(it => it.cat === c.id);
    if (mode === 'notes') return `${items.filter(it => it.note).length} 則筆記`;
    const cards = items.filter(isCard);
    const bad = cards.filter(it => status[it.id] === 'unknown').length;
    return `${cards.length} 張卡片${bad ? `・不熟 ${bad}` : ''}`;
  };
  const cats = NOTES.map((c, i) => {
    const wide = i === NOTES.length - 1 && NOTES.length % 2 === 1;
    return `<button class="cat ${wide ? 'wide' : ''}" data-cat="${esc(c.id)}" ${catStyle(c)}>
      <span class="ci">${c.icon || '📘'}</span>
      ${wide ? '<span class="cbody">' : ''}
      <span class="cn">${esc(c.name)}</span>
      <span class="cd">${esc(c.desc || '')}</span>
      <span class="cc">${countText(c)}</span>
      ${wide ? '</span>' : ''}
    </button>`;
  }).join('');
  const mix = mode === 'notes' ? '' : `
    <button class="cat wide" data-cat="all" style="--c:#1f5a6b;margin-top:12px;width:100%">
      <span class="ci">🔀</span>
      <span class="cbody"><span class="cn">全部混在一起</span>
      <span class="cc">${ALL.filter(isCard).length} 張卡片</span></span>
    </button>`;
  const search = mode === 'notes'
    ? `<input id="search" class="search" type="search" placeholder="🔍 搜尋筆記和單字（中文、英文都可以）" autocomplete="off"><div id="search-results"></div>` : '';
  $view.innerHTML = `${search}<p class="intro">${intro}</p><div class="cat-grid">${cats}</div>${mix}`;
}

// ===== 🔍 搜尋：筆記（標題＋內容）和卡片（題目＋答案），中英文都可以 =====
const plain = s => (s || '').replace(/\{\{[^}]*\}\}/g, '').replace(/[\[\]]/g, '');
function renderSearch(q) {
  const box = document.getElementById('search-results');
  const hideGrid = on => $view.querySelectorAll('.intro, .cat-grid').forEach(el => { el.style.display = on ? 'none' : ''; });
  q = q.trim().toLowerCase();
  if (!q) { box.innerHTML = ''; hideGrid(false); return; }
  hideGrid(true);
  const has = s => plain(s).toLowerCase().includes(q);
  const notes = ALL.filter(it => it.note && (has(it.title) || has(it.note))).slice(0, 30);
  const cards = ALL.filter(it => isCard(it) && !it.note && (has(it.front) || has(it.back))).slice(0, 40);
  // 筆記內容裡找到的那一行，拿來當預覽
  const peek = it => {
    const l = plain(it.note).split('\n').find(l => l.toLowerCase().includes(q)) || '';
    return l.length > 40 ? l.slice(0, 40) + '…' : l;
  };
  box.innerHTML = (!notes.length && !cards.length) ? '<div class="empty">找不到「' + esc(q) + '」</div>' :
    (notes.length ? `<h3 class="sec-title">📖 筆記（${notes.length}）</h3>` + notes.map(it =>
      `<button class="search-row" data-act="open-note" data-c="${esc(it.cat)}" data-id="${esc(it.id)}">
        <b>${esc(it.title)}</b><span class="muted">${esc(CAT[it.cat].name)}${peek(it) ? '・' + esc(peek(it)) : ''}</span></button>`).join('') : '') +
    (cards.length ? `<h3 class="sec-title">🃏 卡片（${cards.length}）</h3>` + cards.map(it =>
      `<div class="search-row"><div><b>${esc(firstLine(it.back))}</b> ${cardSay(it) || isEnglish(firstLine(it.back)) ? sayBtn(cardSay(it) || firstLine(it.back)) : ''}</div>
        <span class="muted">${esc(it.front.replace(/\n/g, ' '))}</span></div>`).join('') : '');
}
document.addEventListener('input', e => { if (e.target.id === 'search') renderSearch(e.target.value); });

function backBtn(text = '分類') {
  return `<button class="back" data-act="back">‹ ${esc(text)}</button>`;
}
function catHead() {
  if (currentTab === 'cards') {
    const opts = [['all', '🔀 全部混在一起'], ...NOTES.map(c => [c.id, `${c.icon || '📘'} ${c.name}`])]
      .map(([id, name]) => `<option value="${esc(id)}" ${id === currentCat ? 'selected' : ''}>${esc(name)}</option>`).join('');
    return `<div class="deck-head"><span class="muted">練習範圍</span><select id="deck-cat">${opts}</select></div>`;
  }
  if (currentCat === 'wrong') {
    const n = itemsInCat().filter(isCard).length;
    return `<div class="today-head"><span>📕 錯題本 <b>${n}</b> 題</span><span class="muted">不同的兩天都答對 → 記住了</span></div>`;
  }
  if (currentCat === 'all') return `${backBtn()}<div class="cat-head"><span class="ci" style="--c:#1f5a6b">🔀</span><div><h2>全部混在一起</h2></div></div>`;
  const c = CAT[currentCat];
  return `${backBtn()}<div class="cat-head" ${catStyle(c)}><span class="ci">${c.icon || '📘'}</span>
    <div><h2>${esc(c.name)}</h2><p>${esc(c.desc || '')}</p></div></div>`;
}

// ===== 把筆記文字排成截圖那種版面 =====
// 規則：①② 或【】開頭 → 白色框框，第一行是青色標題
//       👉 開頭 → 咖啡色結論；💡 ⚠️ 開頭 → 米色提示框
//       「標籤：內容」→ 左右對齊；英文為主的句子字比較大，中文說明字比較小
//       [方括號] 裡的字 → 青色粗體
const MARK = /^[①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮]|^【/;
// 中文只在「詞和詞之間」換行（麵包、房間不會被拆開）；標點前面不斷，句號才不會自己跑到下一行。要配合 CSS word-break: keep-all
const zhSeg = typeof Intl !== 'undefined' && Intl.Segmenter ? new Intl.Segmenter('zh-Hant', { granularity: 'word' }) : null;
const zhWrap = s => zhSeg ? [...zhSeg.segment(s)].map((x, i) => (i && /^[\p{L}\p{N}]/u.test(x.segment) ? '<wbr>' : '') + x.segment).join('') : s;
const inline = s => esc(s)
  .replace(/\[([^\]]+)\]/g, '<span class="hl">$1</span>')
  .replace(/\{\{pic:([^}]+)\}\}/g, (_, p) => picHtml(p.replace(/^faded:/, ''), p.startsWith('faded:') ? 'pic faded' : 'pic'))
  .replace(/\{\{say:([^}]+)\}\}/g, (_, t) => sayBtn(t))
  .replace(/\{\{syl:([^}]+)\}\}/g, '<span class="syl">$1</span>')   // 音節：單字下面一行灰色小字
  // 片語的例句：中文下面一行小字；英文和中文翻譯分兩行（10/24 使用者：擠在同一行，中文會被拆成「…同一間／房間。」）
  .replace(/\{\{ex:([^}]+)\}\}/g, (_, t) => {
    const m = t.match(/^(.*[.!?])\s+([^.!?]*[一-鿿].*)$/);   // 最後一個句點後面、有中文的那段是翻譯（UN 代表聯合國 也算）
    return m ? `<span class="ex"><span class="ex-en">${m[1]} ${sayBtn(m[1].replace(/<[^>]+>/g, "").replace(/&#39;/g, "'").replace(/&quot;/g, "\"").replace(/&amp;/g, "&"))}</span><span class="ex-zh">${zhWrap(m[2])}</span></span>` : `<span class="ex">${t}</span>`;
  })
  .replace(/⟪([^⟫]+)⟫/g, (_, t) => sayBtn(t.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/\bsb\./g, 'somebody').replace(/\bsth\./g, 'something')))
  .replace(/\{\{tip:([^}]+)\}\}/g, (_, t) => {
    if (t.startsWith('👩‍🏫')) return `<span class="wtip teach"><b>👩‍🏫 老師說</b>${t.replace('👩‍🏫', '').split('¶').join('<br>')}</span>`;
    const warn = t.startsWith('⚠️');
    const body = t.replace(/^(💡|⚠️)\s*/, '').split('¶').join('<br>');
    return `<span class="wtip ${warn ? 'warn' : ''}">${warn ? '⚠️ 注意' : '💡'} ${body}</span>`;
  })
  .replace(/⟦👩‍🏫([^⟧]*)⟧/g, (_, t) => `<span class="wtip teach"><b>👩‍🏫 老師說</b>${t.split('¶').join('<br>')}</span>`)
  .replace(/\{\{card:([^}]+)\}\}/g, (_, p) => `<img class="card-img" src="${p}" alt="" loading="lazy" data-zoom>`)
  // 短的（括號）和「引號」不要從中間斷行（10/24 使用者：手機上「可／數）」這種斷句很怪）；只動標籤外面的字
  .split(/(<[^>]+>)/).map(t => t.startsWith('<') ? t : t.replace(/([（「][^（）「」]{1,8}[）」])/g, '<span class="nw">$1</span>')).join('');

// ===== 圖片：Emoji 或圖片檔（img/xxx.png） =====
const isImageFile = p => /\.(png|jpe?g|webp|gif|svg)$/i.test(p);
function picHtml(p, cls = 'pic') {
  if (!p) return '';
  return isImageFile(p) ? `<img class="${cls}" src="${esc(p)}" alt="">` : `<span class="${cls}">${p}</span>`;
}

// ===== 發音：用手機／電腦內建的語音念英文 =====
function sayBtn(text) {
  return `<button class="say" data-say="${esc(text)}" aria-label="念出 ${esc(text)}">🔊</button>`;
}
let enVoice = null;
const VOICE_KEY = 'english-study-voice';
const enVoices = () => (window.speechSynthesis ? speechSynthesis.getVoices() : []).filter(v => /^en/i.test(v.lang));
function pickVoice() {
  const voices = enVoices();
  // 使用者在「進度」頁選過聲音就用那個
  let saved = null;
  try { saved = localStorage.getItem(VOICE_KEY); } catch (e) {}
  const us = voices.filter(v => /^en[-_]US/i.test(v.lang));
  // 沒選過：盡量挑比較自然的聲音（iPhone 的 Samantha、Windows 的 Aria／Jenny、Chrome 的 Google）
  enVoice = voices.find(v => v.name === saved) || us.find(v => /Samantha|Aria|Jenny|Google US/i.test(v.name)) || us[0] || voices[0] || null;
}
// 聲音的口音：en-US → 美式
const ACCENT = { US: '美式', GB: '英式', AU: '澳洲', CA: '加拿大', IE: '愛爾蘭', IN: '印度', NZ: '紐西蘭', ZA: '南非' };
const accentOf = v => ACCENT[(v.lang.split(/[-_]/)[1] || '').toUpperCase()] || v.lang;
if (window.speechSynthesis) { pickVoice(); speechSynthesis.onvoiceschanged = () => { pickVoice(); if (currentTab === 'progress') renderProgress(); }; }   // 聲音清單晚一點才載入，進度頁要重畫選單
function speak(text) {
  if (!window.speechSynthesis) return alert('這個瀏覽器不支援發音');
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/\s*\/\s*/g, ', '));
  u.lang = enVoice ? enVoice.lang : 'en-US';
  u.rate = slowVoice ? 0.55 : 0.85;   // 🐢 慢速：右上角的按鈕切換
  if (enVoice) u.voice = enVoice;
  speechSynthesis.speak(u);
}
// 英文字母開頭的就當英文句子
const isEnglish = s => /^[A-Za-z"'\[(]/.test(s.replace(/^[\s　]+/, ''));
// 用全形空白「　」隔開的一行 → 表格的一列（第一欄青色粗體）
function tableRow(t) {
  // 一般表格：小提醒拿出來，放在這一列的下面（整排寬）；有插圖的單字卡，提醒留在卡片裡
  let tips = '';
  // Emoji 圖示的單字列（不是插畫格子）也一樣拿出來，才不會擠在中文那邊（使用者 10/23 要的）
  const imgRow = /\{\{pic:[^}]*\.(png|jpe?g|webp|gif)\}\}/i.test(t);
  if (!imgRow) t = t.replace(/\{\{tip:[^}]*\}\}/g, m => { tips += inline(m); return ''; });
  // 插畫格子：提醒留在卡片裡；另外放一份在下面，「藏起圖片」變清單時改顯示這份
  else if (t.includes('{{tip:')) tips = '<div class="row-tips">' + t.match(/\{\{tip:[^}]*\}\}/g).map(inline).join('') + '</div>';
  let parts = t.split('　');
  // 第三欄跟第二欄一樣（例如 sofa　沙發　沙發）就不重複顯示
  if (parts.length === 3 && parts[2].trim() === parts[1].trim()) { parts = parts.slice(0, 2); t = parts.join('　'); }
  // 表格第一欄是英文（例如 be interested in、I am）→ 後面加 🔊；已經有 🔊 或插圖的就不重複加
  const allEn = parts.length >= 2 && parts.every(p => isEnglish(p) && !/[一-鿿]/.test(p));   // 整列都是英文（代名詞表）→ 念整列
  const text = allEn ? parts.join(', ') : englishPart(parts[0]);
  const say = i => i === 0 && !t.includes('{{say:') && !t.includes('{{pic:') && (isEnglish(parts[0]) || /^[\d,]+ \(?[a-z]/i.test(parts[0])) && /[a-z]/i.test(text)
    ? ' ' + sayBtn(text.replace(/\bsb\./g, 'somebody').replace(/\bsth\./g, 'something')) : '';
  // 英文是一整句（三個字以上）：改成英文在上、中文在下，比較不擠
  const sent = parts.length === 2 && !t.includes('{{pic:') && isEnglish(parts[0]) &&
    (/[.?!]\s*(\{\{.*)?$/.test(parts[0].trim()) || englishPart(parts[0]).split(/\s+/).length >= 5);
  const tipBtn = imgRow && t.includes('{{tip:') ? '<button class="tip-btn" aria-label="看小提醒">💡</button>' : '';
  return `<div class="row ${parts.length > 2 ? 'multi' : ''} ${sent ? 'sent' : ''}">${tipBtn}${parts.map((p, i) =>
    `<span class="${i ? 'v' : 'k'}">${inline(p)}${say(i)}</span>`).join('')}</div>${tips}`;
}
// 一行裡的英文部分（後面的中文翻譯不念）
const englishPart = l => l.replace(/\{\{syl:[^}]*\}\}/g, '').replace(/[\[\]]/g, '').replace(/[✓✗]/g, '').split(/[　-鿿＀-￯]/)[0].trim();
// 卡片背面要念什麼：有 say 就用；沒有的話，念背面裡英文開頭的句子（要有空白，才是句子不是單一公式）
const cardSay = it => it.say || it.back.split('\n').filter(isEnglish).map(englishPart).filter(t => / /.test(t) && !/\//.test(t)).join('. ');
function line(l) {
  l = l.replace(/^[\s　]+/, '');
  // 框框裡 👉 開頭的提醒：用黃色（⚠️ 是粉紅色）小框，才看得出來是提醒（10/23 使用者說太淡）
  if (l.startsWith('👉')) {
    const t = l.replace(/^👉\s*/, ''), warn = t.startsWith('⚠️');
    return `<div class="wtip ${warn ? 'warn' : ''}">${warn ? '⚠️ ' : '💡 '}${inline(t.replace(/^⚠️\s*/, ''))}</div>`;
  }
  if (l.includes('　')) return tableRow(l);
  const kv = l.match(/^([^：:\[]{1,6})：(.+)$/);
  // 「英文句子. 中文翻譯」→ 英文一行、中文換到下一行（10/24 使用者：英文後面直接接中文，排版很醜）
  const tr = (t, label) => {
    const m = !t.includes('{{') && t.match(/^(.*[.!?])\s+([^.!?]*[一-鿿].*)$/);
    if (!m || /[一-鿿]/.test(m[1]) || !isEnglish(m[1])) return '';
    return `<div class="trl"><div class="ex-en">${label ? `<small>${inline(label)}</small> ` : ''}${inline(m[1])} ${sayBtn(englishPart(m[1]))}</div><div class="ex-zh">${/[[{]/.test(m[2]) ? inline(m[2]) : zhWrap(esc(m[2]))}</div></div>`;
  };
  if (kv && /^例/.test(kv[1]) && tr(kv[2], kv[1])) return tr(kv[2], kv[1]);
  if (!kv && tr(l)) return tr(l);
  if (kv) {
    // 「例：I love pears. 我喜歡梨。」這種，英文例句後面也加 🔊
    const ex = isEnglish(kv[2]) && /[A-Za-z]{2,}/.test(kv[2]) ? englishPart(kv[2]) : '';   // 10/24：「否定：She isn't…」這種也要有 🔊
    return `<div class="kv"><span>${inline(kv[1])}</span><b>${inline(kv[2])}${ex ? ' ' + sayBtn(ex) : ''}</b></div>`;
  }
  if (!isEnglish(l)) return `<div class="zh">${inline(l)}</div>`;
  // 「on Sundays 在週日、on weekends 在週末」：用「、」隔開的每一個英文詞，後面各自一個 🔊
  const segs = l.split('、');
  if (segs.length >= 2 && segs.every(s => isEnglish(s) && /[一-鿿]/.test(s))) {
    return `<div class="en">${segs.map(s => `${inline(s)} ${sayBtn(englishPart(s))}`).join('、')}</div>`;
  }
  // 英文句子後面加 🔊，只念英文的部分（後面的中文翻譯不念）
  const english = englishPart(l);
  // 「up 常有『向上』的意思」這種中文說明句，英文只有一個短字，不加 🔊
  if (english.split(/\s+/).length === 1 && english.length <= 4 && /[一-鿿]/.test(l)) return `<div class="zh">${inline(l)}</div>`;
  return `<div class="en">${inline(l)}${english ? ' ' + sayBtn(english) : ''}</div>`;
}
function splitBlocks(text) {
  const blocks = [];
  let cur = [];
  for (const l of text.split('\n')) {
    if (!l.trim()) { if (cur.length) blocks.push(cur); cur = []; continue; }
    // ①②、【】、💡 小提醒、⚠️ 更正，每一條都自己成一塊
    if ((MARK.test(l.trim()) || /^(💡|⚠️)/.test(l.trim())) && cur.length) { blocks.push(cur); cur = []; }
    cur.push(l);
  }
  if (cur.length) blocks.push(cur);
  return blocks;
}
// 筆記開頭寫 {{grid}}：連續的【】小框排成兩欄（例如 12 組字母組合）
// 👩‍🏫 老師說（data-teach.js）：把講解插在筆記對應那一行下面（10/24 使用者要的）
// 用 {{tip:👩‍🏫…}} 的格式，表格、兩欄、提醒的排法都跟 💡 小提醒一樣
function addTeach(note, id) {
  const list = typeof TEACH !== 'undefined' && TEACH[id];
  if (!list) return note;
  const lines = note.split('\n');
  for (const [anchor, text] of list) {
    let i = lines.findIndex(l => l.includes(anchor));
    if (i < 0) continue;
    // ▍小標題要自己一行才會變成標題：講解放到下面那一段的第一行後面
    if (lines[i].trim().startsWith('▍')) { i++; while (i < lines.length - 1 && !lines[i].trim()) i++; }
    // 講解裡兩個字以上的英文，後面加 🔊（10/24 使用者要的）：用 ⟪ ⟫ 標起來，inline 再換成按鈕
    const body = text.replace(/\n/g, '¶').replace(/　/g, ' ').replace(/[{}]/g, '')
      .replace(/[A-Za-z\[][A-Za-z'’\[\] .,!?-]*[A-Za-z.!?\]]/g, m => {
        const t = m.replace(/[\[\]]/g, '').replace(/[ ,]+$/, '');
        return /[A-Za-z]{2,}.* [A-Za-z]/.test(t) && !/^(sb|sth)\b/.test(t) ? `${m}⟪${t}⟫` : m;
      });
    const tip = `{{tip:👩‍🏫${body}}}`;
    // 那一行在 💡／⚠️ 提醒裡：提醒會整段搬走、變成一個小框，講解用 ⟦ ⟧ 包著一起帶走（inline 再畫出來）
    // 找這一行屬於哪一塊（跟 splitBlocks 一樣：空行、①【】、💡⚠️ 都會開新的一塊）
    let s = i; while (s > 0 && lines[s - 1].trim() && !(MARK.test(lines[s].trim()) || /^(💡|⚠️)/.test(lines[s].trim()))) s--;
    if (/^(💡|⚠️)/.test(lines[s].trim())) lines.splice(i + 1, 0, `⟦👩‍🏫${body}⟧`);
    else if (/　/.test(lines[i].trim())) lines[i] += tip; else lines.splice(i + 1, 0, tip);
  }
  return lines.join('\n');
}
// 一框太多（超過 8 個）就平均分成每框最多 7 個，「{」才不會太長（10/24 使用者：「全部跑一遍」）
// 提醒、講解（👉 💡 ⚠️ {{tip}} ⟦⟧ 開頭的行）跟著上一個字走；第二框以後標題加 ②③…，① 開頭的標題改加（續）
function splitLongBoxes(text) {
  if (text.startsWith('{{wide}}')) return text;
  const pre = (text.match(/^\{\{\w+\}\}/) || [''])[0];
  const isTipLine = l => /^(👉|💡|⚠️|\{\{tip:|⟦)/.test(l.trim());
  // 跟 splitBlocks 一樣：空行、①【】、💡⚠️ 開頭都算新的一塊
  const blocks = p => p.split('\n').reduce((a, l) => {
    if (a.length && !(MARK.test(l.trim()) || /^(💡|⚠️)/.test(l.trim()))) a[a.length - 1].push(l); else a.push([l]);
    return a;
  }, []);
  return pre + text.slice(pre.length).split('\n\n').map(para => blocks(para).map(ls => {
    const p = ls.join('\n');
    // 有插圖的單字表本來就排成圖卡格子，拆開反而左右對不齊（10/24 使用者截圖：「其他水果 ①②」）
    if (ls.some(l => /\{\{pic:[^}]*\.(png|jpe?g|webp|gif)\}\}/i.test(l))) return p;
    const labeled = MARK.test(ls[0].trim());
    if (!labeled && (ls.length <= 8 || !ls.every(l => isEnglish(l) || /　/.test(l) || isTipLine(l)))) return p;
    const head = labeled ? ls[0] : null;
    const items = [];
    for (const l of labeled ? ls.slice(1) : ls) {
      if (isTipLine(l) && items.length) items[items.length - 1].push(l); else items.push([l]);
    }
    if (items.length <= 8) return p;
    const k = Math.ceil(items.length / 7), size = Math.ceil(items.length / k);
    return Array.from({ length: k }, (_, i) => {
      const part = items.slice(i * size, (i + 1) * size);
      let h = head;
      if (head && i > 0) {
        const m = head.trim().match(/^【(.*?)(（\d+ 個）)?】$/);
        h = m ? `【${m[1]} ${'①②③④⑤⑥'[i]}${m[2] ? `（${part.length} 個）` : ''}】` : head + '（續）';
      } else if (head) h = head.replace(/（\d+ 個）】$/, `（${part.length} 個）】`).replace(/^(【[^（】]*?)(（\d+ 個）)?】$/, (s, a, c) => /^[①-⑮]/.test(head.trim()) ? s : `${a} ①${c || ''}】`);
      return [h, ...part.flat()].filter(x => x != null).join('\n');
    }).join('\n\n');
  }).join('\n')).join('\n\n');
}
function formatNote(text) {
  if (text.startsWith('{{grid}}')) {
    const parts = text.replace(/^\{\{grid\}\}\n*/, '').split('\n\n');
    const boxes = parts.filter(p => MARK.test(p.trim()));
    // 框框前面的說明放上面，框框後面的提醒放下面
    const first = parts.findIndex(p => MARK.test(p.trim()));
    const isBox = p => MARK.test(p.trim());
    return parts.slice(0, Math.max(first, 0)).filter(p => !isBox(p)).map(formatBlocks).join('') +
      `<div class="nbgrid">${boxes.map(formatBlocks).join('')}</div>` +
      parts.slice(Math.max(first, 0)).filter(p => !isBox(p)).map(formatBlocks).join('');
  }
  // 筆記開頭寫 {{nogrid}}：框框都一整排，不自動並排（情境單字的英文比較長，並排會擠）
  // 筆記開頭寫 {{pair}}：每個框框都兩欄並排（就算是三欄的表格；框框裡會改成上下排）
  // 筆記開頭寫 {{wide}}：框框一整排、不左右並排（一列字很長的表，例如不規則動詞；10/24 使用者同意例外）
  if (text.startsWith('{{wide}}')) return '<div class="wide-note">' + formatBlocks(text.replace(/^\{\{wide\}\}\n*/, ''), true) + '</div>';
  if (text.startsWith('{{pair}}')) return formatBlocks(text.replace(/^\{\{pair\}\}\n*/, ''), false, true);
  // {{nogrid}}：以前用來不讓框框並排；10/23 使用者要全部兩欄，現在當成一般筆記
  if (text.startsWith('{{nogrid}}')) return formatBlocks(text.replace(/^\{\{nogrid\}\}\n*/, ''));
  return formatBlocks(text);
}
// 短的框框（每行都不長、行數不多）自動兩個一排；長句子的框框維持一整排
// 很長的單字表（8 行以上、每行都是「短英文　中文」）→ 框框裡排成兩欄，不用一直往下滑（10/23 使用者要的）
const twoCol = ls => {
  // 10/24：框框最多 7 個以後，兩欄（英文　中文）的表不在框裡分兩欄，讓框框左右並排；三、四欄的大表才整排
  if (ls.every(l => l.replace(/\{\{[^}]*\}\}/g, '').trim().split('　').length <= 2)) return '';
  // 框框裡前面有一兩行說明（例如例句）也可以：只看有「　」的表格列，說明行最多 3 行
  const rows = ls.filter(l => !l.trim().startsWith('{{tip:') && !l.trim().startsWith('👉') && (l.includes('　') || ls.filter(x => !x.includes('　')).length > 3));
  // 放寬（10/23 使用者要每個區塊都兩欄）：短句子（英文 60 字、中文 30 字內）、三四欄的表格（每欄 24 字內）也可以
  return rows.length >= 6 && rows.every(l => { const p = l.replace(/{{tip:[^}]*}}/g, '').trim().split('　'); if (l.includes('{{pic:') || p.length > 4) return false; return p.length === 2 ? visibleLen(p[0]) <= 60 && visibleLen(p[1]) <= 30 : p.every(x => visibleLen(x) <= 24); }) ? ' two' : '';
};
const visibleLen = l => l.replace(/\{\{[^}]*\}\}/g, '').replace(/[\[\]]/g, '').trim().length;
// 10/23 使用者希望多用兩欄四宮格、少往下滑：每行不長（26 字以內）的框框都並排，短的英文句子也可以
const isShortBlock = ls => ls.length >= 2 && ls.length <= 16 &&
  (MARK.test(ls[0].trim()) || ls.every(l => /　/.test(l))) &&
  ls.every(l => visibleLen(l) <= 26 && (l.trim().split('　').length <= 2));
// 小提醒搬到它在講的那一行下面：拿提醒裡的英文字，去前面的內容找最相符的一行
const STOP = new Set(['the', 'and', 'for', 'you', 'are', 'not', 'can', 'his', 'her', 'its', 'this', 'that', 'with', 'one', 'two']);
function attachTips(blocks) {
  const body = blocks.filter(ls => !/^(💡|⚠️)/.test(ls[0].trim()));
  // 合併的筆記：每個 ▍小標題算一段，提醒只能放在自己那一段
  let n = 0; const sec = new Map(blocks.map(ls => [ls, ls[0].trim().startsWith('▍') ? ++n : n]));
  const moved = new Set();
  // 更正（收集的筆記哪裡寫錯）不顯示；⚠️ 注意事項和 💡 小提醒一樣，放到相關的那一行下面
  const isCorrection = ls => /收集的筆記|原本筆記|原本的筆記|原本寫|插畫上|截圖|口訣把|不是正確的說|→ 正確是|→ 比較正確|→ 常用意思|→ 最常用的意思|筆記寫/.test(ls.join(''));
  for (const ls of blocks) {
    if (!/^(💡|⚠️)/.test(ls[0].trim()) || isCorrection(ls)) continue;
    const text = ls.join(' ');
    const words = [...new Set((text.match(/[A-Za-z][A-Za-z'.-]*[A-Za-z]/g) || []).map(w => w.toLowerCase()))].filter(w => !STOP.has(w));
    let best = null, bestScore = 0;
    body.forEach(b => sec.get(b) === sec.get(ls) && b.forEach((l, i) => {
      if (l.trim().startsWith('{{tip:') || l.trim().startsWith('▍')) return;   // 不要對到別的提醒、合併筆記的小標題
      const low = l.toLowerCase();
      const has = w => new RegExp(`(^|[^a-z])${w.replace(/[.']/g, '\\$&')}([^a-z]|$)`).test(low);
      // 對不到的話，試試去掉字尾（foreigner → foreign），分數算一半
      const stem = w => w.length > 6 ? w.replace(/(ers|er|s|ed|ing)$/, '') : w;
      const score = words.filter(has).length || words.filter(w => stem(w) !== w && has(stem(w))).length * 0.5;
      if (score > bestScore) { bestScore = score; best = [b, i]; }
    }));
    const tip = `{{tip:${ls.map(l => l.trim()).join('¶').replace(/　/g, ' ').replace(/[{}]/g, '')}}}`;
    if (!best) continue;   // 對不到的提醒留在原本的位置（合併的筆記才不會全部擠到最下面）
    moved.add(ls);
    if (/　/.test(best[0][best[1]])) best[0][best[1]] += tip;   // 表格的一列（例如單字卡）：提醒放進同一格裡
    else best[0].splice(best[1] + 1, 0, tip);
  }
  return blocks.filter(ls => !moved.has(ls) && !(/^(💡|⚠️)/.test(ls[0].trim()) && isCorrection(ls)));   // ⚠️ 更正不顯示
}
function formatBlocks(text, noGrid, pairAll) {
  const blocks = attachTips(splitBlocks(text));
  const html = blocks.map(renderBlock);
  if (noGrid) return html.join('');
  // 連續兩個以上的短框框 → 包成兩欄
  let out = '', run = [];
  const flush = () => { out += run.length >= 2 ? `<div class="nbgrid">${run.join('')}</div>` : run.join(''); run = []; };
  // 10/23 使用者要每個區塊都兩欄：所有框框都可以並排；裡面已經分兩欄的長表格自己一塊
  // 只有一行的小框框：旁邊也是一行的就一起並排；夾在大框框旁邊的就自己一塊（不然一大一小排不平均）
  const cand = blocks.map((ls, i) => html[i].startsWith('<div class="nb') && !html[i].startsWith('<div class="nb two'));
  const one = blocks.map(ls => ls.length === 1);
  const ok = i => cand[i] && (!one[i] || (cand[i - 1] && one[i - 1]) || (cand[i + 1] && one[i + 1]));
  blocks.forEach((ls, i) => {
    // 一行的和多行的不放在同一組
    if (ok(i) && run.length && one[i] !== one[i - 1]) flush();
    if (ok(i)) run.push(html[i]);
    else { flush(); out += html[i]; }
  });
  flush();
  return out;
}
function renderBlock(ls, i, blocks) {
  {
    const first = ls[0].trim();
    // ▍開頭：合併後的筆記，每一段的小標題
    if (first.startsWith('▍') && ls.length === 1) return `<h3 class="msec">${inline(first.slice(1).trim())}</h3>`;
    if (first.startsWith('👉')) return `<div class="takeaway">${inline(ls.join(' ').replace('👉', '').trim())}</div>`;
    if (/^(💡|⚠️)/.test(first)) {
      const fix = first.startsWith('⚠️');
      const body = ls.map(l => inline(l.trim().replace(/^(💡|⚠️)\s*/, ''))).join('<br>');
      return `<div class="tip ${fix ? 'fix' : ''}"><span class="tag">${fix ? '⚠️ 注意' : '💡 小提醒'}</span>${body}</div>`;
    }
    // 一整段都是圖卡 → 排成格子
    if (ls.every(l => /^\{\{card:[^}]+\}\}$/.test(l.trim()))) return `<div class="card-grid">${ls.map(l => inline(l.trim())).join('')}</div>`;
    if (MARK.test(first)) {
      const label = first.replace(/^【(.*)】$/, '$1');
      // 口訣：每一句都用一樣大小的字（不要因為英文開頭就變大）
      if (label === '口訣') return `<div class="nb"><div class="lbl">口訣</div>${ls.slice(1).map(l => `<div class="poem">${inline(l.trim())}</div>`).join('')}</div>`;
      // 分段的小框（標題有「（N 個）」）：不在框框裡分兩欄，讓框框跟框框左右並排（10/24 使用者：要四宮格）
      return `<div class="nb${/（\d+ 個）$/.test(label) ? '' : twoCol(ls.slice(1))}"><div class="lbl${/^[①-⑳]/.test(label) ? ' hang' : ''}">${inline(label)}</div>${ls.slice(1).map(line).join('')}</div>`;
    }
    // 一行一個的清單（單字表、發音規則）→ 左右兩欄
    const isTip = l => l.trim().startsWith('{{tip:');
    const isRow = l => /　/.test(l.trim()) || /^\d+\.\s/.test(l.trim()) || isTip(l);
    if (ls.filter(l => !isTip(l)).length >= 3 && ls.every(isRow)) {
      return `<div class="nb${twoCol(ls)}">${ls.map(l => {
        if (isTip(l)) return inline(l.trim());
        const t = l.trim().replace(/^\d+\.\s*/, '');
        return tableRow(t.includes('　') ? t : t.replace('：', '　'));
      }).join('')}</div>`;
    }
    // 開頭的說明文字
    if ((i === 0 || (blocks[i - 1] || [''])[0].trim().startsWith('▍')) && blocks.length > 1 && !ls.some(isEnglish)) return `<p class="sub">${ls.map(l => inline(l.trim())).join('<br>')}</p>`;
    return `<div class="nb${twoCol(ls)}">${ls.map(line).join('')}</div>`;
  }
}

// ===== 分頁：筆記 =====
function renderNotes() {
  if (!currentCat) return renderCatGrid('notes');
  const items = ALL.filter(it => it.cat === currentCat && it.note);
  if (openItem) {
    const idx = items.findIndex(it => it.id === openItem);
    const it = items[idx];
    $view.innerHTML = `${backBtn(CAT[currentCat].name)}${it.note.includes('{{pic:') ? picToggleBtn() : ''}
      <article class="page" ${catStyle(CAT[currentCat])}>
        <h2>${esc(it.title)}</h2>
        ${formatNote(splitLongBoxes(addTeach(it.note, it.id)))}
      </article>
      ${statusButtons(it.id)}
      <div class="pager">
        <button data-act="prev" ${idx === 0 ? 'disabled' : ''}>‹ 上一則</button>
        <button data-act="next" ${idx === items.length - 1 ? 'disabled' : ''}>下一則 ›</button>
      </div>
      ${planRun === 'note' ? '<div class="empty">' + planBack('note') + '</div>' : ''}`;
    markRead(it.id);   // 今日文法：打開過就算讀過
    masonry();
    buildToc();
    fitLabels();
    return;
  }
  // 單字：每一類排成有封面插畫的格子（封面用這一類第一個有插畫的字）
  if (currentCat === 'vocab') {
    // 封面：有指定就用指定的（陣列 = 四宮格），不然用第一個有插畫的字
    const COVER = {
      color: ['red', 'yellow', 'green', 'blue'].map(c => `img/color/${c}.jpg`),
      tableware: ['img/tableware/plate.jpg', 'img/tableware/chopsticks.jpg', 'img/tableware/spoon.jpg', 'img/tableware/mug.jpg'],
      time: 'img/time/morning.jpg', family: 'img/family/family.jpg', home: 'img/home/living-room.jpg', weather: 'img/weather/rainbow.jpg'
    };
    const cover = key => COVER[key] || (ALL.find(o => o.group === key && isImageFile(o.pic || '')) || {}).pic;
    const coverHtml = (pic, key) => Array.isArray(pic)
      ? `<span class="vquad">${pic.map(p => `<img src="${esc(p)}" alt="" loading="lazy">`).join('')}</span>`
      : pic ? `<img src="${esc(pic)}" alt="" loading="lazy">` : `<span class="vicon">${VOCAB_ICON[key] || '📚'}</span>`;
    const tile = it => {
      const key = it.id.replace(/^vocab-/, ''), word = it.id.startsWith('vocab-');
      const [, icon, name, n] = it.title.match(/^(\S+)\s(.+?)(?:（(\d+) 個）)?$/) || [, '📚', it.title, ''];
      return `<button class="vtile" data-open="${esc(it.id)}">
        ${word ? coverHtml(cover(it.coverKey || key), key) : `<span class="vicon">${esc(icon)}</span>`}
        <span class="vname">${esc(name)}</span>${n ? `<span class="vcount">${n} 個</span>` : ''}</button>`;
    };
    // 背單字妙招（字首字尾、諧音）放在單字下面另一區
    // 下面兩區：背單字妙招、情境圖解和發音規則（10/23 從小分類搬進來的）
    const words = items.filter(it => it.id.startsWith('vocab-')), tricks = items.filter(it => it.id.startsWith('mm-'));
    const extra = items.filter(it => !it.id.startsWith('vocab-') && !it.id.startsWith('mm-'));
    const sec = (name, list) => list.length ? `<h3 class="vsec">${name}</h3><div class="vgrid">${list.map(tile).join('')}</div>` : '';
    $view.innerHTML = catHead() + `<div class="vgrid">${words.map(tile).join('')}</div>` +
      sec('🧠 背單字妙招：字首字尾、諧音口訣', tricks) + sec('🖼️ 情境圖解和 🔤 發音規則', extra);
    return;
  }
  // 其他分類：兩欄的彩色小方塊。標題拆成「主標題」和「副標題」（全形空白或括號後面的部分）
  $view.innerHTML = catHead() + `<div class="ngrid" ${catStyle(CAT[currentCat])}>${items.map((it, i) => {
    const star = it.title.startsWith('⭐');
    let t = it.title.replace(/^⭐\s*/, '');
    const count = (t.match(/（(\d+ 個)）$/) || [])[1];
    if (count) t = t.replace(/（\d+ 個）$/, '');
    const m = t.match(/^([^（]+?)(?:　+(.+)|（(.+)）)$/);
    const main = m ? m[1] : t;
    const sub = [m ? (m[2] || m[3]) : '', count].filter(Boolean).join('・');
    return `<button class="ntile" data-open="${esc(it.id)}">
      <span class="nnum">${String(i + 1).padStart(2, '0')}${star ? ' ⭐' : ''}</span>
      <span class="nmain">${esc(main)}</span>
      ${sub ? `<span class="nsub">${esc(sub)}</span>` : ''}
      ${badge(it.id)}
    </button>`;
  }).join('')}</div>`;
}

// ===== 分頁：卡片練習（看英文選中文） =====
let deck = [], deckPos = 0;
// 一次只練 20 張（使用者覺得一口氣答一千題記不住）：不熟的先，再來今天還沒練過的，已熟的最後
const CARD_ROUND = 20, SEEN_KEY = 'english-study-cards-seen';
let seenToday = { day: 0, ids: [] };
try { seenToday = JSON.parse(localStorage.getItem(SEEN_KEY)) || seenToday; } catch (e) {}
function markSeen(id) {
  const d = new Date().toDateString();
  if (seenToday.day !== d) seenToday = { day: d, ids: [] };
  if (!seenToday.ids.includes(id)) seenToday.ids.push(id);
  try { localStorage.setItem(SEEN_KEY, JSON.stringify(seenToday)); } catch (e) {}
  logPractice(id);
}
// 📕 錯題本：每天抽 10 題；同一題在「不同的兩天」都答對 → 記住了，標成已熟、離開錯題本
const WRONG_KEY = 'english-study-wrong', WRONG_ROUND = 10, WRONG_PASS = 2;
let wrongLog = {};   // { id: { ok: 連續答對的天數, day: 最後一次答對的日子 } }
try { wrongLog = JSON.parse(localStorage.getItem(WRONG_KEY)) || {}; } catch (e) {}
let wrongPassed = 0, cardScore = 0;   // 「測驗」分頁併進卡片了，卡片練完也顯示答對幾題
function wrongResult(id, ok) {
  const d = new Date().toDateString(), r = wrongLog[id] || { ok: 0, day: '' };
  if (!ok) { r.ok = 0; r.day = ''; }
  else if (r.day !== d) { r.ok++; r.day = d; }
  if (r.ok >= WRONG_PASS) { delete wrongLog[id]; setStatus(id, 'known'); wrongPassed++; }
  else wrongLog[id] = r;
  try { localStorage.setItem(WRONG_KEY, JSON.stringify(wrongLog)); } catch (e) {}
  return r.ok >= WRONG_PASS;
}
function startDeck() {
  wrongPassed = 0; cardScore = 0;
  const seen = seenToday.day === new Date().toDateString() ? seenToday.ids : [];
  if (currentCat === 'wrong') {
    const today = new Date().toDateString();
    const done = it => (wrongLog[it.id] || {}).day === today;   // 今天已經答對過的排後面
    deck = shuffle(itemsInCat().filter(isCard)).sort((a, b) => (done(a) - done(b)) || (seen.includes(a.id) - seen.includes(b.id))).slice(0, WRONG_ROUND);
    deckPos = 0;
    return;
  }
  const rank = it => status[it.id] === 'unknown' ? 0 : status[it.id] === 'known' ? 3 : seen.includes(it.id) ? 2 : 1;
  deck = currentCat ? shuffle(itemsInCat().filter(isCard)).sort((a, b) => rank(a) - rank(b)).slice(0, CARD_ROUND) : [];
  deckPos = 0;
}
// 單字卡：英文大字 + 🔊，選中文意思（使用者覺得比翻卡片好）
// 答案是英文、題目是中文的卡片 → 反過來出題；其他卡片用一般選擇題；兩種都做不出來才翻卡片
const firstLine = s => s.split('\n')[0];
// 單字卡（題目中文、答案英文）的 3 個錯誤選項：同一組的字優先
function wordPool(it) {
  if (!isCard(it)) return null;   // 純筆記沒有答案
  const en = firstLine(it.back);
  if (!isEnglish(en) || isEnglish(it.front) || it.front.includes('\n') || it.blank) return null;
  const near = o => (it.group && o.group === it.group ? 0 : o.cat === it.cat ? 1 : 2);
  const avoid = it.avoid || [];
  const pool = shuffle(ALL.filter(o => isCard(o) && o.id !== it.id && isEnglish(firstLine(o.back)) && !isEnglish(o.front) &&
      !o.front.includes('\n') && firstLine(o.back) !== en && !avoid.includes(firstLine(o.back))))
    .sort((a, b) => near(a) - near(b))
    .filter((o, i, a) => o.front !== it.front && a.findIndex(x => x.front === o.front) === i)
    .slice(0, 3);
  return pool.length < 3 ? null : pool;
}
function wordQuestion(it, pool = wordPool(it)) {
  if (!pool) return null;
  const en = firstLine(it.back);
  // 看英文選中文：選項旁邊放插畫／Emoji 多一個記憶點（10/24）。4 個都有圖才放，不然有圖的那個會太顯眼
  // 選項只放主要意思（「；」後面的其他意思答完在上面的大字卡看）
  const main = zh => zh.split('；')[0];
  const opts = [{ text: main(it.front), right: true, pic: it.pic || it.groupIcon }, ...pool.map(o => ({ text: main(o.front), right: false, pic: o.pic || o.groupIcon }))];
  if (!opts.every(o => o.pic)) opts.forEach(o => delete o.pic);
  return { id: it.id, word: en, say: it.say || en, options: shuffle(opts) };
}

// ===== ✏️ 句型問答：卡片選項下面的空位，同一個單字再出一題句子填空 =====
// 例句從哪裡來：① data-sentences.js 的 WORD_SENTENCES（專門寫的）② 這張卡片背面 ③ 同分類的筆記 ④ 其他筆記
const wordRe = w => new RegExp(`(^|[^A-Za-z'-])(${w.replace(/[.*+?^$()|[\]\\]/g, '\\$&')})(?=$|[^A-Za-z'-])`, 'i');
const splitSentence = l => {
  const m = l.replace(/\{\{[^}]*\}\}/g, '').replace(/[\[\]✓✗]/g, '').trim().match(/^([A-Za-z"'][^　-鿿＀-￯]*[.?!])\s*(.*)$/);
  return m && m[1].split(' ').length >= 3 ? { en: m[1], zh: m[2] } : null;
};
let sentenceLines = null;
function findSentence(it, word) {
  // 同一個字在不同類意思不同（例如 plane 飛機／刨刀），可以用「類別:字」另外寫
  const own = typeof WORD_SENTENCES !== 'undefined' && (WORD_SENTENCES[`${it.group}:${word.toLowerCase()}`] || WORD_SENTENCES[word.toLowerCase()]);
  if (typeof own === 'string') return splitSentence(own);   // 一定要是字串（避免拿到 constructor 這種內建的東西）
  if (!sentenceLines) sentenceLines = ALL.flatMap(o => [o.back || '', o.note || ''].join('\n').split('\n').filter(l => !/✗|=|\bsb\b|\bsth\b/.test(l)).map(splitSentence).filter(Boolean).map(s => ({ ...s, cat: o.cat, id: o.id })));
  const re = wordRe(word);
  const hits = sentenceLines.filter(s => re.test(s.en) && s.en.toLowerCase() !== word.toLowerCase() + '.');
  return hits.find(s => s.id === it.id) || hits.find(s => s.cat === it.cat) || hits[0] || null;
}
function blankQuestion(it, word, others) {
  if (others.length < 3) return null;
  const s = findSentence(it, word);
  if (!s) return null;
  const m = s.en.match(wordRe(word));
  if (!m) return null;
  const hit = m[2], cap = /^[A-Z]/.test(hit) && m.index === 0;
  const fix = w => (cap ? w[0].toUpperCase() + w.slice(1) : w);
  const q = s.en.slice(0, m.index + m[1].length) + '______' + s.en.slice(m.index + m[0].length);
  const opts = [{ text: hit, right: true }, ...others.map(w => ({ text: fix(w), right: false }))];
  return { q, zh: s.zh, full: s.en, hitAt: m.index + m[1].length, hitLen: hit.length, options: shuffle(opts) };
}
// 答完的句子：英文每個字下面小小的標詞性（data-grammar.js），考的那個字用藍綠色
function grammarHtml(b) {
  const codes = typeof GRAMMAR_TAGS !== 'undefined' && GRAMMAR_TAGS[b.full];
  let pos = 0;
  const words = b.full.split(' ').map((w, i) => {
    const start = pos;
    pos += w.length + 1;
    const hit = start < b.hitAt + b.hitLen && b.hitAt < start + w.length;
    const c = codes && codes[i];
    const tag = c && c !== '.' ? GRAMMAR_LABELS[c.charCodeAt(0) - 65] : '';
    return `<span class="gw${hit ? ' hit' : ''}"><span class="gw-en">${esc(w)}</span><span class="gw-tag">${esc(tag) || '&nbsp;'}</span></span>`;
  });
  return `<div class="gram">${words.join('')}</div>`;
}

// A／B／C／D 選項：字都很短就排成 2×2，長的一排一個
function optsHtml(options, act) {
  const grid = options.every(o => o.text.length <= 12) ? ' grid2' : '';
  return `<div class="opts${grid}">` + options.map((o, i) =>
    `<button class="opt" data-act="${act}" data-i="${i}"><span class="letter">${'ABCD'[i]}</span>${o.pic ? picHtml(o.pic, 'opic') : ''}<span class="otext">${esc(o.text)}</span><span class="mark"></span></button>`).join('') + '</div>' +
    '<button class="btn opt-submit" data-act="opt-submit" disabled>先點一個選項</button>';   // 點選項只是選起來，按這顆才送出（手機怕誤觸）
}
// 答完：正確的打 ✓，其他打 ✗（root：只標這一題的選項）
function markOpts(options, picked, root = $view) {
  const btns = root.querySelectorAll('.opt');
  btns[0].parentElement.classList.add('done');
  const sub = btns[0].parentElement.nextElementSibling;
  if (sub && sub.classList.contains('opt-submit')) sub.remove();
  options.forEach((o, j) => {
    btns[j].classList.add(o.right ? 'right' : j === picked ? 'wrong' : 'dim');
    btns[j].querySelector('.mark').textContent = o.right ? '✓' : '✗';
  });
}
let cardQ = null;
function renderCards() {
  if (!currentCat) return renderCatGrid('cards');
  if (currentCat === 'wrong' && deckPos >= deck.length) {
    const left = itemsInCat().filter(isCard).length;
    const back = planBack('wrong');
    $view.innerHTML = catHead() + (deck.length
      ? `<div class="empty">✅ 今天的抽查做完了！<br>${wrongPassed ? `🎉 有 ${wrongPassed} 題已經記住，離開錯題本了<br>` : ''}
          還有 ${left} 題，明天再抽查一次<br><br>${back || (left ? `<button class="btn" data-act="restart-deck">再練 ${WRONG_ROUND} 題</button>` : '')}</div>`
      : '<div class="empty">🎉 錯題本是空的！<br>在今日、卡片、測驗答錯，或按「😵 不熟」的題目，都會自動放進來</div>');
    return;
  }
  if (deckPos >= deck.length) {
    $view.innerHTML = catHead() + (deck.length
      ? `<div class="empty">${cardScore === deck.length ? '🏆' : '🎉'} 這一組 ${deck.length} 張練完了！<br>答對 <b>${cardScore}</b> / ${deck.length} 題，答錯的已經放進錯題本<br>休息一下，明天再來效果最好<br><br><button class="btn" data-act="restart-deck">再練 ${CARD_ROUND} 張</button></div>`
      : '<div class="empty">這個分類還沒有卡片</div>');
    return;
  }
  const it = deck[deckPos];
  // 看英文選中文、看中文選英文，隨機穿插
  const pool = wordPool(it);
  cardQ = (Math.random() < 0.5 && wordQuestion(it, pool)) || makeQuestion(it) || wordQuestion(it, pool);
  if (cardQ && pool) {
    cardQ.isWord = !!cardQ.word || !it.quiz;   // 單字卡：選完上面變成 suffer 那種顯示
    cardQ.blank = blankQuestion(it, firstLine(it.back), pool.map(o => firstLine(o.back)));
  }
  if (cardQ) {
    const shortQ = !cardQ.word && !cardQ.pic && !cardQ.q.includes('\n') && cardQ.q.length <= 14;   // 短短的中文 → 也用大字卡
    const b = cardQ.blank;
    $view.innerHTML = catHead() + `
      <div class="counter">${deckPos + 1} / ${deck.length}　${currentCat === 'all' ? esc(it.catName) : ''}　${badge(it.id)}</div>
      <div id="card-top">${cardQ.word
        ? `<div class="word-card"><div class="big-word">${esc(cardQ.word)}</div>${sayBtn(cardQ.say)}</div>`
        : shortQ ? `<div class="word-card"><div class="big-word zh">${esc(cardQ.q)}</div><div class="muted">選出英文</div></div>`
        : `${cardQ.pic ? `<div class="q-pic">${picHtml(cardQ.pic, 'pic big')}</div>` : ''}<div class="q">${esc(cardQ.q)}</div>`}</div>
      <div id="card-opts">${optsHtml(cardQ.options, 'card-ans')}</div>
      ${b ? `<div class="blank-q">
        <div class="blank-title">✏️ 句型問答</div>
        <div class="q">${esc(b.q)}</div>
        ${b.zh ? `<div class="muted blank-zh">${esc(b.zh)}</div>` : ''}
        <div id="blank-opts">${optsHtml(b.options, 'blank-ans')}</div>
        <div id="blank-after"></div>
      </div>` : ''}
      <div id="card-after"></div>`;
    if (cardQ.word) speak(cardQ.say);   // 一出來就念一次
    return;
  }
  $view.innerHTML = catHead() + `
    <div class="counter">${deckPos + 1} / ${deck.length}　${currentCat === 'all' ? esc(it.catName) : ''}　${badge(it.id)}</div>
    <div class="flip" data-act="flip">
      <div class="flip-inner">
        <div class="face front"><span class="lbl">題目</span>
          ${it.pic || it.groupIcon ? picHtml(it.pic || it.groupIcon, it.pic ? 'pic big' : 'pic big faded') : ''}
          <div class="pre">${esc(it.front)}</div></div>
        <div class="face back"><span class="lbl">答案</span><div class="pre">${esc(it.back)}</div>
          ${cardSay(it) ? `<div class="say-wrap">${sayBtn(cardSay(it))}</div>` : ''}</div>
      </div>
    </div>
    <p class="hint">點卡片翻面</p>
    <div class="row-btns">
      <button class="btn bad" data-act="card-mark" data-v="unknown">😵 不熟</button>
      <button class="btn good" data-act="card-mark" data-v="known">😎 已熟</button>
    </div>
    <div class="row-btns"><button class="btn ghost" data-act="card-skip">跳過</button></div>`;
}

// 卡片選完：標 ✓✗、顯示完整答案；答錯自動標「不熟」
function answerCard(i) {
  if (cardQ.answered) return;
  cardQ.answered = true;
  const it = deck[deckPos], ok = cardQ.options[i].right, say = cardSay(it);
  markOpts(cardQ.options, i, document.getElementById('card-opts'));
  markSeen(it.id);
  if (ok) cardScore++;
  if (!ok) setStatus(it.id, 'unknown');
  const passed = currentCat === 'wrong' && wrongResult(it.id, ok);
  // 單字卡：上面的大字卡直接變成「英文 🔊 ＋ 綠色（答錯紅色）中文」，像 suffer 那張圖
  document.getElementById('card-top').innerHTML = cardQ.isWord
    ? `<div class="word-card done ${ok ? 'ok' : 'ng'}">
        ${it.pic ? picHtml(it.pic, 'pic big') : ''}
        <div class="big-word">${esc(firstLine(it.back))}</div>${sayBtn(say || firstLine(it.back))}
        <div class="big-zh">${esc(it.front)}</div>
        ${it.back.includes('\n') ? `<div class="muted pre">${esc(it.back.split('\n').slice(1).join('\n'))}</div>` : ''}
      </div>`
    : document.getElementById('card-top').innerHTML + `<div class="answer-box ${ok ? 'ok' : 'ng'}">
        <div class="ab-title">${ok ? '⭕ 答對了！' : '❌ 答錯了，已經標成「不熟」'}</div>
        <div class="pre">${esc(it.back)}</div>
        ${say ? `<div class="say-wrap">${sayBtn(say)}</div>` : ''}
      </div>`;
  document.getElementById('card-after').innerHTML = `
    ${passed ? '<div class="answer-box ok"><div class="ab-title">🎉 記住了！不同的兩天都答對，離開錯題本</div></div>' : ''}
    ${currentCat === 'wrong' && ok && !passed ? '<p class="hint">👍 答對了！明天再答對一次就記住了</p>' : ''}
    <div class="row-btns">
      ${ok && currentCat !== 'wrong' ? '<button id="known-btn" class="btn good" data-act="card-mark" data-v="known">😎 很熟了</button>' : ''}
      <button class="btn" data-act="card-skip">下一張 ›</button>
    </div>`;
  const en = say || (isEnglish(firstLine(it.back)) ? firstLine(it.back) : '');
  if (!cardQ.word && en) speak(en);   // 看中文選英文的，選完念英文
}
// 句子填空選完：標 ✓✗，念整句；答錯也標「不熟」
function answerBlank(i) {
  const b = cardQ.blank;
  if (!b || b.answered) return;
  b.answered = true;
  const ok = b.options[i].right;
  markOpts(b.options, i, document.getElementById('blank-opts'));
  if (!ok) {
    setStatus(deck[deckPos].id, 'unknown');
    if (currentCat === 'wrong') wrongResult(deck[deckPos].id, false);   // 句型問答答錯也重新算
    const k = document.getElementById('known-btn');
    if (k) k.remove();
  }
  document.getElementById('blank-after').innerHTML = `
    <div class="answer-box ${ok ? 'ok' : 'ng'}">
      <div class="ab-title">${ok ? '⭕ 答對了！' : '❌ 正確答案：' + esc(b.options.find(o => o.right).text)}</div>
      ${grammarHtml(b)}
      ${b.zh ? `<div class="zh-tr">譯：${zhWrap(esc(b.zh))}</div>` : ''}
      <div class="say-wrap">${sayBtn(b.full)}</div>
    </div>`;
  speak(b.full);
}

// ===== 分頁：選擇題測驗 =====
const QUIZ_SIZE = 10;
let quiz = [], quizPos = 0, quizScore = 0, quizAnswered = false;

// 有寫 quiz 就用；沒寫就拿 front 當題目，答案配上其他卡片的答案當錯誤選項
function makeQuestion(it) {
  if (it.quiz) {
    const opts = it.quiz.options.map((text, i) => ({ text, right: i === it.quiz.answer }));
    return { id: it.id, q: it.quiz.q, options: shuffle(opts) };
  }
  if (!isCard(it)) return null;
  const right = it.back.split('\n')[0];
  // 錯誤選項優先從同一組（單字）或同一分類找，比較像真的題目
  const near = o => (it.group && o.group === it.group ? 0 : o.cat === it.cat ? 1 : 2);
  // avoid：意思太接近、會變成兩個都對的字，不拿來當錯誤選項
  const avoid = it.avoid || [];
  const pool = shuffle(ALL.filter(o => o.id !== it.id && o.back && o.front !== it.front && !avoid.includes(o.back.split('\n')[0])))
    .sort((a, b) => near(a) - near(b))
    .map(o => o.back.split('\n')[0])
    .filter((t, i, a) => t !== right && a.indexOf(t) === i)
    .slice(0, 3);
  if (pool.length < 1) return null;
  const opts = [{ text: right, right: true }, ...pool.map(text => ({ text, right: false }))];
  return { id: it.id, q: it.blank || it.front, pic: it.pic, options: shuffle(opts) };
}
function startQuiz() {
  quiz = currentCat ? byPriority(itemsInCat()).map(makeQuestion).filter(Boolean).slice(0, QUIZ_SIZE) : [];
  quizPos = 0; quizScore = 0; quizAnswered = false;
}
function renderQuiz() {
  if (!currentCat) return renderCatGrid('quiz');
  if (!quiz.length) { $view.innerHTML = catHead() + '<div class="empty">這個分類還沒有題目</div>'; return; }
  if (quizPos >= quiz.length) {
    $view.innerHTML = catHead() + `<div class="empty">
      <div style="font-size:44px">${quizScore === quiz.length ? '🏆' : '💪'}</div>
      答對 <b>${quizScore}</b> / ${quiz.length} 題<br>
      <span>答錯的題目已經自動標成「不熟」</span><br><br>
      <button class="btn" data-act="restart-quiz">再測一次</button></div>`;
    return;
  }
  const q = quiz[quizPos];
  $view.innerHTML = catHead() + `
    <div class="counter">第 ${quizPos + 1} / ${quiz.length} 題</div>
    ${q.pic ? `<div class="q-pic">${picHtml(q.pic, 'pic big')}</div>` : ''}
    <div class="q">${esc(q.q)}</div>
    ${optsHtml(q.options, 'answer')}
    <div id="next-wrap"></div>`;
}
function answerQuiz(i) {
  if (quizAnswered) return;
  quizAnswered = true;
  const q = quiz[quizPos];
  markOpts(q.options, i);
  if (q.options[i].right) quizScore++;
  else setStatus(q.id, 'unknown');
  document.getElementById('next-wrap').innerHTML =
    `<button class="btn" data-act="next-q">${quizPos + 1 < quiz.length ? '下一題' : '看結果'}</button>`;
}

// ===== 分頁：進度 =====
function renderProgress() {
  // 只算有卡片的項目（純筆記不算）
  const cards = ALL.filter(isCard);
  const rows = [{ name: '全部', icon: '🔀', items: cards }, ...NOTES.map(c => ({ name: c.name, icon: c.icon, items: cards.filter(it => it.cat === c.id) }))];
  // 📊 上面的總覽：連續天數、學過幾張、錯題本、明天要複習、今日課表
  const learned = Object.keys(srs).length, t = today();
  const stat = (icon, label, value) => `<div class="stat"><div class="sv">${value}</div><div class="sl">${icon} ${label}</div></div>`;
  const summary = `<div class="stat-grid">
    ${stat('🔥', '連續天數', streak())}
    ${stat('📚', '學過的卡片', `${learned}<small> / ${cards.length}</small>`)}
    ${stat('😎', '已熟', cards.filter(it => status[it.id] === 'known').length)}
    ${stat('📕', '錯題本', cards.filter(it => status[it.id] === 'unknown').length)}
    ${stat('📅', '明天要複習', Object.values(srs).filter(r => r.due <= t + 1 && r.due > t).length)}
    ${stat('📋', '今日課表', `${(studyDays.includes(t) ? 1 : 0) + planToday().length}<small> / ${PLAN.length + 1}</small>`)}
  </div><h3 class="sec-title">各分類</h3>`;
  $view.innerHTML = summary + rows.map(r => {
    const n = r.items.length || 1;
    const k = r.items.filter(it => status[it.id] === 'known').length;
    const u = r.items.filter(it => status[it.id] === 'unknown').length;
    return `<div class="box">
      <h3>${r.icon || ''} ${esc(r.name)}</h3>
      <div class="bar"><div class="k" style="width:${k / n * 100}%"></div><div class="u" style="width:${u / n * 100}%"></div></div>
      <div class="stat-row"><span>已熟 ${k}</span><span>不熟 ${u}</span><span>未標記 ${r.items.length - k - u}</span></div>
    </div>`;
  }).join('') + weekHistoryHtml() + settingsHtml() + `<button class="btn ghost" data-act="reset">清除所有標記</button>`;
  // 月曆放在總覽下面
  document.querySelector('.sec-title').insertAdjacentHTML('beforebegin', calendarHtml() + weakHtml() + levelSettingsHtml());
}

// ===== 🗓️ 學習月曆：這個月有做完複習的日子打勾 =====
const dayNum = d => Math.floor((d - d.getTimezoneOffset() * 60000) / 86400000);   // 跟 today() 同一種算法
let calOffset = 0;   // 0 = 這個月，-1 = 上個月
function calendarHtml() {
  const now = new Date(), first = new Date(now.getFullYear(), now.getMonth() + calOffset, 1);
  const days = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const set = new Set(studyDays), t = today();
  let cells = '<span class="cal-h">日</span><span class="cal-h">一</span><span class="cal-h">二</span><span class="cal-h">三</span><span class="cal-h">四</span><span class="cal-h">五</span><span class="cal-h">六</span>';
  cells += '<span></span>'.repeat(first.getDay());
  let count = 0;
  for (let i = 1; i <= days; i++) {
    const n = dayNum(new Date(first.getFullYear(), first.getMonth(), i));
    const ok = set.has(n); if (ok) count++;
    cells += `<span class="cal-d ${ok ? 'ok' : ''} ${n === t ? 'today' : ''}">${ok ? '✓' : i}</span>`;
  }
  return `<div class="box cal">
    <div class="cal-top"><button class="cal-nav" data-act="cal" data-v="-1">‹</button>
      <b>${first.getFullYear()} 年 ${first.getMonth() + 1} 月</b>　<span class="muted">練習了 ${count} 天</span>
      <button class="cal-nav" data-act="cal" data-v="1" ${calOffset >= 0 ? 'disabled' : ''}>›</button></div>
    <div class="cal-grid">${cells}</div></div>`;
}

// ===== ⚙️ 設定：選聲音、備份／還原紀錄 =====
function settingsHtml() {
  const voices = enVoices();
  const opts = voices.map(v => `<option value="${esc(v.name)}" ${enVoice && v.name === enVoice.name ? 'selected' : ''}>${esc(accentOf(v))}・${esc(v.name)}</option>`).join('');
  return `<h3 class="sec-title">⚙️ 設定</h3>
    ${typeof cloudBoxHtml === 'function' ? cloudBoxHtml() : ''}
    <div class="box">
      <h3>🎙️ 英文語音</h3>
      ${voices.length ? `<select id="voice-sel" class="search">${opts}</select>` : '<p class="muted">這個瀏覽器沒有英文語音</p>'}
      <p class="muted">選了會念一句給你聽。iPhone 可以到「設定 → 輔助使用 → 朗讀內容 → 聲音 → 英文」下載更自然的聲音（例如 Ava、Samantha 的「加強版」）</p>
    </div>
    <div class="box">
      <h3>💾 備份練習紀錄</h3>
      <p class="muted">清除網站資料或換手機以前，先備份；之後按「還原」就能找回來</p>
      <div class="row-btns"><button class="btn ghost" data-act="backup-copy">📋 複製備份文字</button><button class="btn ghost" data-act="backup-file">💾 存成檔案</button></div>
      <div class="row-btns"><button class="btn ghost" data-act="restore-paste">📥 貼上還原</button><label class="btn ghost">📂 從檔案還原<input type="file" id="restore-file" accept=".json,.txt" hidden></label></div>
    </div>`;
}
// 備份：所有 english-study- 開頭的紀錄
function backupText() {
  const data = {};
  try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.startsWith('english-study-') && k !== 'english-study-cloud') data[k] = localStorage.getItem(k); } } catch (e) {}
  return JSON.stringify({ app: 'english-study', date: new Date().toISOString().slice(0, 10), data });
}
function restoreText(text) {
  try {
    const o = JSON.parse(text);
    if (!o || o.app !== 'english-study' || !o.data) throw new Error();
    if (!confirm(`要用 ${o.date} 的備份覆蓋現在的紀錄嗎？`)) return;
    Object.entries(o.data).forEach(([k, v]) => localStorage.setItem(k, v));
    alert('✅ 還原好了！');
    location.reload();
  } catch (e) { alert('❌ 這不是正確的備份內容'); }
}
document.addEventListener('change', e => {
  if (e.target.id === 'voice-sel') {
    try { localStorage.setItem(VOICE_KEY, e.target.value); } catch (err) {}
    pickVoice(); speak('Hello! This is my voice.');
  }
  if (e.target.id === 'restore-file' && e.target.files[0]) e.target.files[0].text().then(restoreText);
});

// ===== 🐢 慢速語音（記在手機裡，下次打開還是一樣） =====
let slowVoice = false;
try { slowVoice = localStorage.getItem('english-study-slow') === '1'; } catch (e) {}
function renderSpeedBtn() {
  const b = document.getElementById('speed-btn');
  if (b) b.innerHTML = slowVoice ? '🐢 慢速' : '🐇 正常';
  if (b) b.classList.toggle('on', slowVoice);
}
document.getElementById('speed-btn').addEventListener('click', () => {
  slowVoice = !slowVoice;
  try { localStorage.setItem('english-study-slow', slowVoice ? '1' : '0'); } catch (e) {}
  renderSpeedBtn();
  speak(slowVoice ? 'This is slow.' : 'This is normal speed.');
});
renderSpeedBtn();

// ===== 🎨 背景配色：A 燕麥米色（預設）／D 奶茶色，記在手機裡 =====
// 10/24 加 W 白底筆記風（跟使用者的複習筆記一樣），先當預設給使用者試；用新的記錄名稱，舊的米色設定不會蓋掉它
const THEMES = { w: ['🎨 筆記', '#cfc5b2'], a: ['🎨 米色', '#e3dac9'], d: ['🎨 奶茶', '#d8cbbb'] };
let theme = 'w';
try { const t = localStorage.getItem('english-study-theme2'); if (THEMES[t]) theme = t; } catch (e) {}
function applyTheme() {
  document.documentElement.dataset.theme = theme;
  document.getElementById('theme-btn').innerHTML = THEMES[theme][0];
  document.querySelector('meta[name="theme-color"]').content = THEMES[theme][1];
}
document.getElementById('theme-btn').addEventListener('click', () => {
  theme = { w: 'a', a: 'd', d: 'w' }[theme];
  try { localStorage.setItem('english-study-theme2', theme); } catch (e) {}
  applyTheme();
});
applyTheme();

// ===== 🖼️ 單字表的插圖：可以藏起來變成精簡清單（卡片練習的圖不受影響），記在手機裡 =====
let showPics = true;
try { showPics = localStorage.getItem('english-study-pics') !== 'off'; } catch (e) {}
const picToggleBtn = () => `<button class="pic-toggle" id="pic-toggle">${showPics ? '📋 藏起圖片' : '🖼️ 顯示圖片'}</button>`;
function applyPics() { document.documentElement.dataset.pics = showPics ? 'on' : 'off'; }
document.addEventListener('click', e => {
  if (!e.target.closest('#pic-toggle')) return;
  showPics = !showPics;
  try { localStorage.setItem('english-study-pics', showPics ? 'on' : 'off'); } catch (e) {}
  applyPics();
  e.target.closest('#pic-toggle').outerHTML = picToggleBtn();
  masonry();
});
applyPics();

// ===== 🌱 等級：先練日常、簡單的，再進階、高階（10/24 使用者要的） =====
// 「今日」的新卡片、今日文法、課表的聽力／重組／打字只出現在等級以內的；筆記、卡片分頁不受限制
// 名單裡寫筆記 id 或卡片的組別（group）；卡片沒有組別的，id 開頭對到也算。沒列到的都是第 2 級
const LEVEL_1 = ['study-routine', 'study-think-en', 'g-overview', 'g-group-pos', 'g-group-pos2', 'g-group-pos3', 'g-pos-abbr', 'g-pos', 'g-noun', 'g-pronoun', 'g-verb', 'g-adj', 'g-adv', 'g-article', 'g-prep', 'g-conj', 'g-person', 'g-numbers', 'g-ordinal',
  'b-structure', 'b-be', 'b-subject-verb', 'b-subject', 'b-group-pronoun', 'b-pronoun', 'b-group-sentence', 'b-neg', 'b-q', 'b-imperative', 'b-contractions', 'b-group-noun', 'b-article', 'b-plural', 'b-in-on-at', 'b-in', 'b-wh', 'b-there-is', 'b-there',
  'mn-be', 'mn-time-prep', 'mn-time', 'mn-group-plural', 'mn-plural', 'mn-fe', 'mn-group-present', 'mn-present',
  'dl-greet', 'dl-intro', 'dl-group-food', 'dl-food', 'dl-drink', 'dl-shop', 'dl-group-way', 'dl-way', 'dl-taxi', 'dl-group-talk', 'dl-rescue', 'dl-react', 'dl-feel', 'nm-group-num', 'nm-num', 'nm-price', 'nm-group-time', 'nm-time', 'nm-date',
  'cw-group-verb', 'cw-verb-daily', 'cw-verb-common', 'cw-adj-pair', 'cw-adj-feel', 'cw-freq',
  'vocab-g-time', 'month', 'season', 'time', 'week', 'vocab-color', 'color', 'vocab-g-food', 'staple', 'meal', 'vocab-g-drink', 'drink', 'vocab-fruit', 'fruit', 'vocab-vegetable', 'vegetable',
  'vocab-family', 'family', 'vocab-animal', 'animal', 'vocab-g-home', 'home', 'vocab-g-feel', 'feel', 'vocab-clothes', 'clothes', 'mm-how'];
// 10/24 第 1 級控制在 600 多張：麵包點心、餐具、浴室、教室用品、大自然、身體、生活動詞第三組、個性外表放第 2 級
const LEVEL_3 = ['g-group-tips', 'g-group-tips2', 'g-group-tips3', 'g-position', 'g-cloze', 'g-reading', 'g-reading-att', 'g-clauses',
  'to-do-roles', 'to-role', 'to-purpose-reason-result', 'to-reason', 'to-only', 'to-opinion', 'to-noun', 'to-wh', 'to-forms', 'to-not', 'to-plus-doing', 'to-plus', 'to-or-doing', 'to-or', 'to-object', 'used-to', 'to-group-no', 'no-to', 'to-vs-for', 'to-vs', 'for-doing', 'to-for',
  'ph-bare', 'ph-group-prep', 'ph-group-prep-with', 'ph-for', 'ph-with', 'ph-about', 'ph-at', 'ph-in2',
  'passive-table', 't-8-active-passive', 't-8', 't-group-perfect-cont', 't-usage', 's-group-present', 's-group-past-future', 's-simple', 's-present', 's-past',
  'mm-prefix', 'mm-prefix2', 'mm-prefix3', 'mm-suffix', 'mm-suffix2', 'mm-suffix3', 'mm-suffix4', 'mm-suffix5', 'mm-root', 'mm-root2',
  'mm-un', 'mm-re', 'mm-dis', 'mm-im', 'mm-pre', 'mm-mis', 'mm-over', 'mm-num', 'mm-sub', 'mm-inter', 'mm-tele', 'mm-er', 'mm-ist', 'mm-ful', 'mm-less', 'mm-ly', 'mm-able', 'mm-ous', 'mm-y', 'mm-al', 'mm-ive',
  'mm-tion', 'mm-ness', 'mm-ment', 'mm-ship', 'mm-en', 'mm-ize', 'mm-ward', 'mm-spect', 'mm-vis', 'mm-phon', 'mm-aud', 'mm-port', 'mm-dict', 'mm-struct', 'mm-form'];
const inLevel = (list, it) => list.some(k => it.group === k || it.id === k || it.id.startsWith(k + '-'));
const levelOf = it => inLevel(LEVEL_1, it) ? 1 : inLevel(LEVEL_3, it) ? 3 : 2;
const LEVEL_NAME = { 1: '🌱 第 1 級：日常入門', 2: '🌿 第 2 級：進階', 3: '🌳 第 3 級：高階' };
const LEVEL_KEY = 'english-study-level';
let userLevel = 1;
try { userLevel = Number(localStorage.getItem(LEVEL_KEY)) || 1; } catch (e) {}
const setLevel = n => { userLevel = n; try { localStorage.setItem(LEVEL_KEY, String(n)); } catch (e) {} };
// 這一級學了多少：學過＝今日複習裡出現過（srs 有紀錄）
function levelProgress(n = userLevel) {
  const cards = ALL.filter(it => isCard(it) && levelOf(it) === n);
  const learned = cards.filter(it => srs[it.id]).length;
  return { learned, total: cards.length, pct: cards.length ? learned / cards.length : 1 };
}
// 升級條件：這一級學過 80%，而且最近一次每週小考 80 分以上 → 出現升級按鈕（按了才升）
function canLevelUp() {
  if (userLevel >= 3) return false;
  const last = weekResults[weekResults.length - 1];
  return levelProgress().pct >= 0.8 && !!last && last.score / last.total >= 0.8;
}
function levelBanner() {
  const p = levelProgress();
  return `<div class="level-banner"><span><b>${LEVEL_NAME[userLevel]}</b>　已學 ${p.learned} / ${p.total}</span>
    <span class="level-bar"><span style="width:${Math.round(p.pct * 100)}%"></span></span>
    ${canLevelUp() ? `<button class="btn" data-act="level-up">🎉 可以升到第 ${userLevel + 1} 級了！</button>` : ''}</div>`;
}
// 「進度」分頁：說明＋手動切換
// 📊 弱點分析：把答錯的卡片歸到它所在的那則筆記（主題），找出錯最多的 3 個主題
let cardTopic = null;
function topicOf(card) {
  if (!cardTopic) {
    cardTopic = {};
    const notes = ALL.filter(it => it.note);
    ALL.filter(isCard).forEach(c => {
      const en = firstLine(c.back), key = isEnglish(en) ? en : c.front;
      // 同一個分類裡，內容提到這張卡片的那則筆記
      // 先用編號對（b-in-1 → b-in-on-at、group fruit → vocab-fruit），對不到再看筆記內容有沒有提到這張卡片
      const same = notes.filter(x => x.cat === c.cat), stem = c.group || c.id.split('-').slice(0, 2).join('-');
      const merged = typeof MERGED_INTO === 'undefined' ? '' : MERGED_INTO[stem] || (Object.entries(MERGED_INTO).find(([k]) => k.startsWith(stem + '-')) || [])[1];
      const n = same.find(x => x.id === stem || x.id === merged || x.id === 'vocab-' + stem || x.id.startsWith(stem + '-') || x.id.endsWith('-' + stem)) ||
        same.find(x => x.note.includes(key) || x.note.includes(firstLine(c.front)));
      cardTopic[c.id] = n ? { id: n.id, cat: n.cat, title: n.title } : { id: '', cat: c.cat, title: c.catName };
    });
  }
  return cardTopic[card.id];
}
function weakHtml() {
  const score = {};
  ALL.filter(isCard).forEach(c => {
    const n = (errLog[c.id] || 0) + (status[c.id] === 'unknown' && !errLog[c.id] ? 1 : 0);   // 以前標不熟、還沒有錯誤紀錄的算 1 次
    if (!n) return;
    const t = topicOf(c), k = t.id || 'cat:' + t.cat;
    score[k] = score[k] || { ...t, n: 0, cards: 0 };
    score[k].n += n; score[k].cards++;
  });
  const top = Object.values(score).filter(t => t.n >= 2).sort((a, b) => b.n - a.n).slice(0, 3);
  const body = top.length ? top.map((t, i) => `<div class="weak-row">
      <div><b>${i + 1}. ${esc(t.title.replace(/（\d+ (個|項)）$/, ''))}</b><div class="muted">${esc(CAT[t.cat] ? CAT[t.cat].name : '')}・錯了 ${t.n} 次（${t.cards} 張卡片）</div></div>
      <div class="row-btns">${t.id ? `<button class="btn ghost" data-act="open-note" data-c="${t.cat}" data-id="${t.id}">📖 看筆記</button>` : ''}
        <button class="btn ghost" data-act="weak-cards" data-c="${t.cat}">🃏 練這類</button></div></div>`).join('')
    : '<p class="muted">多練幾天，這裡會告訴你最常錯的是哪一類，以及該複習哪一則筆記。</p>';
  return `<h3 class="sec-title">📊 弱點分析：最常錯的主題</h3><div class="box">${body}</div>`;
}
function levelSettingsHtml() {
  const rows = [1, 2, 3].map(n => { const p = levelProgress(n); return `<button class="btn ${n === userLevel ? '' : 'ghost'}" data-act="level-set" data-v="${n}">${LEVEL_NAME[n]}<br><small>已學 ${p.learned} / ${p.total}</small></button>`; }).join('');
  return `<h3 class="sec-title">🌱 學習等級</h3><div class="box">
    <p class="muted">「今日」的新卡片、今日文法、課表練習只從現在的等級出（筆記和卡片分頁不受限制，隨時都能看）。這一級學過 80%、每週小考 80 分以上，「今日」會出現升級按鈕。</p>
    <div class="level-pick">${rows}</div></div>`;
}

// ===== 📅 每日複習（間隔複習）=====
// 每張卡片記：下次要複習的日子 due、目前間隔 iv（天）。記得 → 間隔拉長；忘記 → 明天再來
const SRS_KEY = 'english-study-srs', DAY_KEY = 'english-study-days';
const NEW_PER_DAY = 10;
const LADDER = [1, 3, 7, 14, 30, 60, 120];
let srs = {}, studyDays = [];
try { srs = JSON.parse(localStorage.getItem(SRS_KEY)) || {}; studyDays = JSON.parse(localStorage.getItem(DAY_KEY)) || []; } catch (e) {}
const saveSrs = () => { try { localStorage.setItem(SRS_KEY, JSON.stringify(srs)); localStorage.setItem(DAY_KEY, JSON.stringify(studyDays)); } catch (e) {} };
const today = () => { const d = new Date(); return Math.floor((d - d.getTimezoneOffset() * 60000) / 86400000); };

let todayQueue = [], todayPos = 0, todayDone = 0, extraNew = 0;
function startToday() {
  const t = today();
  const cards = ALL.filter(isCard);
  const due = cards.filter(c => srs[c.id] && srs[c.id].due <= t).sort((a, b) => srs[a.id].due - srs[b.id].due);
  // 新卡片：以前標「不熟」的先，再照分類順序（文法用語、基礎文法…）
  const learnedToday = cards.filter(c => srs[c.id] && srs[c.id].first === t).length;
  // 新卡片只從現在的等級以內出（低等級還沒學完的先）；同一級裡生活句、單字、動詞、文法輪流出，不會一連好幾天都是文法
  const CAT_TURN = ['daily', 'vocab', 'core', 'basics', 'phrase', 'terms', 'mnemonic', 'to', 'tenses'];
  const turn = new Map();
  const fresh = cards.filter(c => !srs[c.id] && levelOf(c) <= userLevel)
    .map(c => { const k = levelOf(c) + c.cat; turn.set(k, (turn.get(k) || 0) + 1); return { c, n: turn.get(k) }; })
    .sort((a, b) => (levelOf(a.c) - levelOf(b.c)) || ((status[b.c.id] === 'unknown') - (status[a.c.id] === 'unknown')) || (a.n - b.n) ||
      ((CAT_TURN.indexOf(a.c.cat) + 1 || 99) - (CAT_TURN.indexOf(b.c.cat) + 1 || 99)))
    .map(x => x.c)
    .slice(0, Math.max(0, NEW_PER_DAY + extraNew - learnedToday));
  todayQueue = [...due, ...fresh];
  todayPos = 0; todayDone = 0;
}
function streak() {
  const set = new Set(studyDays); let n = 0, d = today();
  if (!set.has(d)) d--;           // 今天還沒做完也不算中斷
  while (set.has(d)) { n++; d--; }
  return n;
}
// 🔔 每週備份提醒：有練習紀錄、而且超過 7 天沒備份，就在「今日」上面提醒（雲端保存做好以前先用這個）
const BACKUP_KEY = 'english-study-lastbackup';
function backupBanner() {
  let last = 0;
  try { last = Number(localStorage.getItem(BACKUP_KEY)) || 0; } catch (e) {}
  if (!studyDays.length || Date.now() - last < 7 * 86400000) return '';
  const days = last ? Math.floor((Date.now() - last) / 86400000) : 0;
  return `<div class="backup-banner">💾 ${last ? `已經 ${days} 天沒備份了` : '還沒備份過練習紀錄'}，清除網站資料前記得備份！
    <button class="btn" data-act="backup-copy">一鍵複製備份</button></div>`;
}
const markBackup = () => { try { localStorage.setItem(BACKUP_KEY, String(Date.now())); } catch (e) {} };
function renderToday() {
  if (weekRun) return renderWeek();
  const s = streak();
  const head = backupBanner() + weekBanner() + levelBanner() + `<div class="today-head"><span>🔥 連續 <b>${s}</b> 天</span><span>今天剩 <b>${todayQueue.length - todayPos}</b> 張</span></div>`;
  if (todayPos >= todayQueue.length) {
    if (todayDone > 0 && !studyDays.includes(today())) { studyDays.push(today()); saveSrs(); }
    const upcoming = Object.values(srs).filter(r => r.due === today() + 1).length;
    $view.innerHTML = backupBanner() + weekBanner() + levelBanner() + `<div class="today-head"><span>🔥 連續 <b>${streak()}</b> 天</span></div>
      <div class="plan-step done">✅ 1. 卡片複習　<span class="muted">明天大約要複習 ${upcoming} 張</span></div>
      ${planHtml()}
      <div class="empty" style="padding-top:8px"><button class="btn ghost" data-act="more-new">還想學：再學 10 張新卡片</button></div>`;
    return;
  }
  const it = todayQueue[todayPos];
  const isNew = !srs[it.id];
  // 選擇題（同一題重畫時不要重新洗牌）；做不出選擇題的卡片才用翻卡片
  if (!todayQ || todayQ.id !== it.id || todayQ.pos !== todayPos) todayQ = { ...(makeQuestion(it) || {}), id: it.id, pos: todayPos };
  // 複習的卡片：答案是短短的英文 → 改成自己打字
  const rightText = todayQ.options && (todayQ.options.find(o => o.right) || {}).text;
  if (!isNew && rightText && canType(rightText)) {
    todayQ.typing = rightText;
    const hint = rightText.split(' ').map(w => w[0] + w.slice(1).replace(/[A-Za-z]/g, '_')).join(' ');
    $view.innerHTML = head + `
      <div class="counter">✍️ 打字複習　${esc(it.catName)}</div>
      ${todayQ.pic ? `<div class="q-pic">${picHtml(todayQ.pic, 'pic big')}</div>` : ''}
      <div class="q">${esc(todayQ.q)}</div>
      <input id="type-ans" class="type-input" type="text" placeholder="用英文打出答案" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
      <div class="row-btns">
        <button class="btn ghost" data-act="type-hint">💡 提示</button>
        <button class="btn" data-act="type-ok">確定</button>
      </div>
      <div id="type-hint" class="type-hint" hidden>開頭字母：<b>${esc(hint)}</b></div>
      <div id="today-after"></div>`;
    const inp = document.getElementById('type-ans');
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') checkTyping(); });
    setTimeout(() => inp.focus(), 50);
    return;
  }
  if (todayQ.options) {
    $view.innerHTML = head + `
      <div class="counter">${isNew ? '🆕 新題目' : '🔁 複習'}　${esc(it.catName)}</div>
      ${todayQ.pic ? `<div class="q-pic">${picHtml(todayQ.pic, 'pic big')}</div>` : ''}
      <div class="q">${esc(todayQ.q)}</div>
      ${optsHtml(todayQ.options, 'today-ans')}
      <div id="today-after"></div>`;
    return;
  }
  $view.innerHTML = head + `
    <div class="counter">${isNew ? '🆕 新卡片' : '🔁 複習'}　${esc(it.catName)}</div>
    <div class="flip" data-act="flip">
      <div class="flip-inner">
        <div class="face front"><span class="lbl">題目</span>
          ${it.pic || it.groupIcon ? picHtml(it.pic || it.groupIcon, it.pic ? 'pic big' : 'pic big faded') : ''}
          <div class="pre">${esc(it.front)}</div></div>
        <div class="face back"><span class="lbl">答案</span><div class="pre">${esc(it.back)}</div>
          ${cardSay(it) ? `<div class="say-wrap">${sayBtn(cardSay(it))}</div>` : ''}</div>
      </div>
    </div>
    <p class="hint">先自己想答案，再點卡片翻面</p>
    <div class="row-btns three">
      <button class="btn bad" data-act="srs" data-v="0">😵 忘記了</button>
      <button class="btn ghost" data-act="srs" data-v="1">🤔 有點難</button>
      <button class="btn good" data-act="srs" data-v="2">😎 記得</button>
    </div>`;
}
let todayQ = null;
// 適合打字的答案：英文、最多 4 個字（太長的句子還是用選擇題）
const canType = t => /^[A-Za-z][A-Za-z '’.\-\/]*$/.test(t.trim()) && t.trim().split(/\s+/).length <= 4;
// 比對時忽略大小寫、標點、多的空白；「A / B」兩種寫法都算對
const normAns = s => s.toLowerCase().replace(/[’]/g, "'").replace(/[.,!?]/g, '').replace(/\s+/g, ' ').trim();
function checkTyping() {
  if (todayQ.answered) return;
  const inp = document.getElementById('type-ans');
  const got = normAns(inp.value);
  if (!got) { inp.focus(); return; }
  todayQ.answered = true;
  inp.disabled = true;
  const ok = todayQ.typing.split('/').map(normAns).includes(got);
  inp.classList.add(ok ? 'right' : 'wrong');
  const it = todayQueue[todayPos], say = cardSay(it);
  document.getElementById('today-after').innerHTML = `
    <div class="answer-box ${ok ? 'ok' : 'ng'}">
      <div class="ab-title">${ok ? '⭕ 答對了！' : '❌ 正確答案是：' + esc(todayQ.typing)}</div>
      ${ok ? '' : `<div class="muted">你打的是：${esc(inp.value)}</div>`}
      <div class="pre">${esc(it.back)}</div>
      ${say ? `<div class="say-wrap">${sayBtn(say)}</div>` : ''}
    </div>
    ${ok ? '' : '<button class="btn ghost" data-act="srs" data-v="2" style="margin-bottom:10px">我其實答對了（只是打錯字）</button>'}
    <button class="btn" data-act="srs" data-v="${ok ? 2 : 0}">下一題 ›</button>`;
  if (say) speak(say);
}
// 選擇題作答：標出對錯，顯示完整答案和 🔊，按「下一題」才記錄（對 = 記得，錯 = 忘記）
function answerToday(i) {
  if (todayQ.answered) return;
  todayQ.answered = true;
  const it = todayQueue[todayPos];
  markOpts(todayQ.options, i);
  const ok = todayQ.options[i].right;
  const say = cardSay(it);
  document.getElementById('today-after').innerHTML = `
    <div class="answer-box ${ok ? 'ok' : 'ng'}">
      <div class="ab-title">${ok ? '⭕ 答對了！' : '❌ 答錯了，等一下會再考一次'}</div>
      <div class="pre">${esc(it.back)}</div>
      ${say ? `<div class="say-wrap">${sayBtn(say)}</div>` : ''}
    </div>
    <button class="btn" data-act="srs" data-v="${ok ? 2 : 0}">下一題 ›</button>`;
  if (say) speak(say);   // 答完自動念一次
}
function answerSrs(v) {
  const it = todayQueue[todayPos], t = today();
  const r = srs[it.id] || { iv: 0, first: t };
  if (v === 0) { r.iv = 0; r.due = t + 1; setStatus(it.id, 'unknown'); todayQueue.push(it); }   // 忘記：等一下再出現一次，明天再複習
  else {
    const next = v === 2 ? (LADDER.find(d => d > r.iv) || r.iv * 2) : Math.max(1, Math.round(r.iv * 1.2) || 1);
    r.iv = next; r.due = t + next;
    if (next >= 7) setStatus(it.id, 'known');
  }
  srs[it.id] = r; saveSrs();
  logPractice(it.id);
  todayPos++; todayDone++;
  renderToday();
  window.scrollTo(0, 0);
}

// ===== 📝 每週小考：星期日從這 7 天練過的卡片出 20 題，最後給分數（10/24 使用者要的） =====
const WEEK_LOG_KEY = 'english-study-weeklog', WEEK_RESULT_KEY = 'english-study-weektest', WEEK_SIZE = 20, WEEK_MIN = 5;
let weekLog = {}, weekResults = [], weekRun = null;
try { weekLog = JSON.parse(localStorage.getItem(WEEK_LOG_KEY)) || {}; weekResults = JSON.parse(localStorage.getItem(WEEK_RESULT_KEY)) || []; } catch (e) {}
// 每張卡片記「最後一次練習是哪一天」；超過 14 天的清掉，才不會越存越大
function logPractice(id) {
  const t = today();
  weekLog[id] = t;
  for (const k in weekLog) if (weekLog[k] < t - 14) delete weekLog[k];
  try { localStorage.setItem(WEEK_LOG_KEY, JSON.stringify(weekLog)); } catch (e) {}
}
// 這 7 天練過的卡片（每週小考做好以前的紀錄，用間隔複習推回最後一次複習的日子）
function weekPool() {
  const t = today();
  return ALL.filter(it => isCard(it) && (weekLog[it.id] > t - 7 || (srs[it.id] && srs[it.id].due - srs[it.id].iv > t - 7)));
}
const lastSunday = () => today() - new Date().getDay();
const weekDone = () => weekResults.some(r => r.day >= lastSunday());
// 星期日的「今日」最上面出現；這週考過了就顯示分數
function weekBanner() {
  if (new Date().getDay() !== 0) return '';
  const done = weekResults.find(r => r.day >= lastSunday());
  if (done) return `<div class="week-banner done">📝 本週小考：<b>${done.score} / ${done.total}</b> 分</div>`;
  const n = weekPool().length;
  if (n < WEEK_MIN) return '';
  return `<div class="week-banner">📝 今天是星期日，來做「本週小考」！從這週練過的 ${n} 張卡片抽 ${Math.min(WEEK_SIZE, n)} 題
    <button class="btn" data-act="week-go">開始小考</button></div>`;
}
function startWeek() {
  // 不熟的優先，其他隨機
  const pool = shuffle(weekPool()).sort((a, b) => (status[b.id] === 'unknown') - (status[a.id] === 'unknown'));
  const qs = [];
  for (const it of pool) {
    if (qs.length >= WEEK_SIZE) break;
    const q = makeQuestion(it);
    if (q) qs.push({ ...q, it });
  }
  weekRun = { qs, pos: 0, score: 0, wrong: [], saved: false };
  go('today');
}
function renderWeek() {
  const w = weekRun;
  if (w.pos >= w.qs.length) {
    if (!w.saved) {
      w.saved = true;
      weekResults.push({ day: today(), score: w.score, total: w.qs.length });
      try { localStorage.setItem(WEEK_RESULT_KEY, JSON.stringify(weekResults)); } catch (e) {}
      w.wrong.forEach(it => setStatus(it.id, 'unknown'));   // 錯的進錯題本
    }
    const pct = w.qs.length ? Math.round(w.score / w.qs.length * 100) : 0;
    const msg = pct >= 90 ? '🏆 太厲害了！這週學的幾乎都記住了' : pct >= 70 ? '👍 很不錯！錯的幾題已經放進錯題本' : '💪 沒關係，錯的題目已經放進錯題本，下週會更好';
    $view.innerHTML = `<div class="week-result">
        <div class="wr-title">📝 本週小考成績</div>
        <div class="wr-score">${w.score}<small> / ${w.qs.length}</small></div>
        <p>${msg}</p>
      </div>
      ${w.wrong.length ? `<h3 class="sec-title">❌ 答錯的題目（已放進錯題本）</h3>` + w.wrong.map(it => `<div class="box wr-wrong">
        <div>${esc(it.front)}</div><b>${esc(firstLine(it.back))}</b> ${cardSay(it) ? sayBtn(cardSay(it)) : ''}</div>`).join('') : ''}
      <button class="btn" data-act="week-end">回到今日</button>`;
    return;
  }
  const q = w.qs[w.pos];
  $view.innerHTML = `
    <div class="counter">📝 本週小考　${w.pos + 1} / ${w.qs.length}　答對 ${w.score} 題</div>
    ${q.pic ? `<div class="q-pic">${picHtml(q.pic, 'pic big')}</div>` : ''}
    <div class="q">${esc(q.q)}</div>
    ${optsHtml(q.options, 'week-ans')}
    <div id="week-after"></div>`;
}
function answerWeek(i) {
  const q = weekRun.qs[weekRun.pos];
  if (q.answered) return;
  q.answered = true;
  markOpts(q.options, i);
  const ok = q.options[i].right, say = cardSay(q.it);
  if (ok) weekRun.score++; else weekRun.wrong.push(q.it);
  document.getElementById('week-after').innerHTML = `
    <div class="answer-box ${ok ? 'ok' : 'ng'}">
      <div class="ab-title">${ok ? '⭕ 答對了！' : '❌ 答錯了'}</div>
      <div class="pre">${esc(q.it.back)}</div>
      ${say ? `<div class="say-wrap">${sayBtn(say)}</div>` : ''}
    </div>
    <button class="btn" data-act="week-next">${weekRun.pos + 1 < weekRun.qs.length ? '下一題 ›' : '看成績 ›'}</button>`;
  if (say) speak(say);
}
// 「進度」分頁：歷次成績＋隨時可以考
function weekHistoryHtml() {
  const n = weekPool().length;
  const list = weekResults.slice(-6).reverse().map(r => {
    const d = new Date((r.day * 86400000) + new Date().getTimezoneOffset() * 60000);
    return `<div class="stat-row"><span>${d.getMonth() + 1}/${d.getDate()}</span><span><b>${r.score}</b> / ${r.total} 分</span></div>`;
  }).join('');
  return `<h3 class="sec-title">📝 每週小考</h3><div class="box">
    <p class="muted">每週日在「今日」出題：這 7 天練過的卡片抽 ${WEEK_SIZE} 題。這週目前練過 ${n} 張。</p>
    ${list || '<p class="muted">還沒有考過</p>'}
    ${n >= WEEK_MIN ? `<button class="btn ghost" data-act="week-go">${weekDone() ? '再考一次' : '現在就考'}</button>` : `<p class="muted">練到 ${WEEK_MIN} 張以上就可以考</p>`}
  </div>`;
}

// ===== 📋 今日課表：卡片複習做完，接著照順序做這幾項（每天一次，記在 english-study-plan） =====
// 每日小流程：詞彙（卡片複習）→ 文法（讀一則）→ 補弱點 → 聽 → 語法 → 自己想 → 說和交流
const PLAN = [
  { k: 'note', name: '📖 今日文法', unit: '讀一則筆記' },
  { k: 'wrong', name: '📕 錯題抽查', n: 5 },
  { k: 'listen', name: '🎧 聽力', n: 5 },
  { k: 'order', name: '🧩 句子重組', n: 3 },
  { k: 'type', name: '⌨️ 看中文打英文', n: 3 },
  { k: 'dialog', name: '💬 情境對話', unit: '每天換一個' }
];
// 📖 今日文法：照網站的分類順序，挑下一則還沒讀過的筆記（單字表、情境單字不算）
const READ_KEY = 'english-study-read';
let readNotes = [];
try { readNotes = JSON.parse(localStorage.getItem(READ_KEY)) || []; } catch (e) {}
function markRead(id) {
  if (readNotes.includes(id)) return;
  readNotes.push(id);
  try { localStorage.setItem(READ_KEY, JSON.stringify(readNotes)); } catch (e) {}
}
const nextNote = () => ALL.find(it => it.note && (!['vocab', 'scene'].includes(it.cat) || it.pron) && !readNotes.includes(it.id) && levelOf(it) <= userLevel);   // 發音規則搬進「單字」後還是要讀；只挑現在等級以內的
const PLAN_KEY = 'english-study-plan';
let planDone = { day: '', done: [] }, planRun = null;
try { planDone = JSON.parse(localStorage.getItem(PLAN_KEY)) || planDone; } catch (e) {}
const planToday = () => (planDone.day === new Date().toDateString() ? planDone.done : []);
function finishPlan(k) {
  const d = new Date().toDateString();
  if (planDone.day !== d) planDone = { day: d, done: [] };
  if (!planDone.done.includes(k)) planDone.done.push(k);
  try { localStorage.setItem(PLAN_KEY, JSON.stringify(planDone)); } catch (e) {}
  planRun = null;
}
function planHtml() {
  const done = planToday();
  const next = PLAN.find(p => !done.includes(p.k));
  return PLAN.map((p, i) => {
    const ok = done.includes(p.k);
    return `<div class="plan-step ${ok ? 'done' : ''}">${ok ? '✅' : '⬜'} ${i + 2}. ${p.name}（${p.unit || p.n + ' 題'}）
      ${!ok && p === next ? `<button class="btn" data-act="plan-go" data-k="${p.k}">開始 ›</button>` : ''}</div>`;
  }).join('') + (next ? '' : '<div class="empty">🏆 今天的課表全部完成！明天見 👋</div>');
}
function startPlan(k) {
  const p = PLAN.find(x => x.k === k);
  planRun = k;
  if (k === 'note') {
    const it = nextNote();
    if (!it) { finishPlan(k); return renderToday(); }   // 全部讀完了
    return go('notes', it.cat, it.id);
  }
  if (k === 'dialog') {
    if (typeof DIALOGS === 'undefined') { finishPlan(k); return renderToday(); }
    go('listen');
    const ds = DIALOGS.filter(d => d.level <= userLevel);   // 只挑等級以內的，每天換一個
    startDialog(ds[today() % ds.length].id);
    return renderDialog();
  }
  if (k === 'wrong') {
    if (!ALL.some(it => status[it.id] === 'unknown' && isCard(it))) { finishPlan(k); return renderToday(); }   // 沒有錯題就跳過
    go('wrong');
    deck = deck.slice(0, p.n); renderCards();
    return;
  }
  go('listen');
  startListenRound(k, k === 'listen' || k === 'type' ? (Math.random() < 0.5 ? 'word' : 'daily') : 'daily', p.n);
  renderListen();
}
// 課表裡的練習做完：記成完成，按鈕變成「回到今日」
const planBack = k => planRun === k ? (finishPlan(k), '<button class="btn" data-act="plan-back">✅ 完成！回到今日 ›</button>') : null;

// ===== 🎧 聽說：聽力（只聽聲音選意思）、跟讀（聽一句、跟著念，用麥克風檢查） =====
const LISTEN_ROUND = 10;
let listenMode = null, listenSrc = null, lDeck = [], lPos = 0, lScore = 0, lQ = null;
const LISTEN_SRC = {
  word: { name: '📚 單字', items: () => ALL.filter(it => it.cat !== 'daily' && wordPool(it)) },
  daily: { name: '💬 生活常用句', items: () => ALL.filter(it => it.cat === 'daily' && isCard(it)) },
  example: { name: '✏️ 單字例句', items: () => typeof WORD_SENTENCES === 'undefined' ? [] :
    Object.entries(WORD_SENTENCES).map(([k, s]) => ({ id: 'ex-' + k, ...splitSentence(s) })).filter(s => s.en) },
  // 🧠 不經過中文（10/24 使用者：不想一直中翻英）：看插畫打英文、看英文解釋選字
  // 看圖：只用看圖就認得出來的類別（月份、星期、家人光看圖分不出來）
  pic: { name: '🖼️ 看圖', items: () => ALL.filter(it => it.front && it.pic && isImageFile(it.pic) && PIC_GROUPS.includes(it.group)) },
  ee: { name: '🔤 英英', items: () => typeof EN_DEFS === 'undefined' ? [] : EN_DEFS.map(d => ({ id: 'ee-' + d.en, ...d })) }
};
const PIC_GROUPS = ['color', 'staple', 'bakery', 'tableware', 'drink', 'flower', 'fruit', 'vegetable', 'meat', 'transport', 'tool', 'weather', 'place', 'home', 'job', 'clothes', 'sport', 'body'];
// 中文意思（答完才給看）：單字庫裡有的字才有
const zhOf = en => { const it = ALL.find(o => o.front && o.cat === 'vocab' && firstLine(o.back) === en); return it ? it.front : ''; };
const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
function startListen() { listenMode = null; listenSrc = null; }
function listenHome() {
  const srcBtns = mode => Object.entries(LISTEN_SRC)
    .filter(([k]) => k !== 'pic' && k !== 'ee')
    .filter(([k]) => mode === 'listen' || mode === 'type' ? k !== 'example' : mode === 'order' ? k !== 'word' : true)
    .map(([k, s]) => `<button class="btn ghost" data-act="listen-go" data-mode="${mode}" data-src="${k}">${s.name}</button>`).join('');
  // 對話照等級分組（10/24），每一級都可以點
  const dlgBtns = typeof DIALOGS === 'undefined' ? '' : [1, 2, 3].map(n => `<div class="dlg-level">${LEVEL_NAME[n]}</div><div class="dlg-grid">` +
    DIALOGS.filter(d => d.level === n).map(d => `<button class="btn ghost" data-act="dlg-start" data-id="${d.id}">${esc(d.title)}</button>`).join('') + '</div>').join('');
  $view.innerHTML = `
    <p class="intro">每次 ${LISTEN_ROUND} 題。看不懂字沒關係，用耳朵聽！</p>
    <div class="listen-box think-en">
      <h3>🧠 不經過中文</h3><p class="muted">練習直接用英文想：看圖打出英文、看英文解釋選出單字（題目都不給中文）</p>
      <div class="row-btns">
        <button class="btn ghost" data-act="listen-go" data-mode="pic" data-src="pic">🖼️ 看圖打英文</button>
        <button class="btn ghost" data-act="listen-go" data-mode="ee" data-src="ee">🔤 英英解釋</button>
      </div>
    </div>
    ${storyListHtml()}
    <div class="listen-box">
      <h3>💬 情境對話</h3><p class="muted">你扮演「你」：對方說完，輪到你先看中文、自己用英文說，再看答案</p>
      ${dlgBtns}
    </div>
    <div class="listen-box">
      <h3>🎧 聽力</h3><p class="muted">只播聲音、不給字，選出中文意思。答錯會放進錯題本</p>
      <div class="row-btns">${srcBtns('listen')}</div>
    </div>
    <div class="listen-box">
      <h3>🧩 句子重組</h3><p class="muted">看中文，把打亂的英文字排回正確順序（練習「自己說出句子」）</p>
      <div class="row-btns">${srcBtns('order')}</div>
    </div>
    <div class="listen-box">
      <h3>⌨️ 看中文打英文</h3><p class="muted">沒有選項，自己想、自己打出來（大小寫、標點不用管，I'm 和 I am 都算對）</p>
      <div class="row-btns">${srcBtns('type')}</div>
    </div>
    <div class="listen-box">
      <h3>🗣️ 跟讀</h3><p class="muted">先聽一句，再按 🎤 跟著念，網站會標出你念對哪些字${Rec ? '' : '<br>⚠️ 這個瀏覽器不支援語音辨識，只能聽完自己跟著念（iPhone 請用 Safari）'}</p>
      <div class="row-btns">${srcBtns('shadow')}</div>
    </div>`;
}
function startListenRound(mode, src, n = LISTEN_ROUND) {
  listenMode = mode; listenSrc = src; lPos = 0; lScore = 0;
  let items = LISTEN_SRC[src].items();
  if (planRun) items = items.filter(it => !it.cat || levelOf(it) <= userLevel);   // 今日課表：只用等級以內的
  // 句子重組：3～10 個字的句子才好排
  if (mode === 'type') items = items.filter(it => orderTokens(listenEn(it)).length <= 7);   // 太長的句子打字太累
  if (mode === 'order') items = items.filter(it => { const k = orderTokens(listenEn(it)).length; return k >= 3 && k <= 10 && !/[/()]/.test(listenEn(it)); });
  lDeck = shuffle(items).slice(0, n);
}
// ⌨️ 看中文打英文：比對時把縮寫展開（I'm = I am、don't = do not），「A / B」兩種寫法都算對
const expandShort = s => normAns(s).replace(/\bcan't\b/g, 'cannot').replace(/\bwon't\b/g, 'will not')
  .replace(/n't\b/g, ' not').replace(/'m\b/g, ' am').replace(/'re\b/g, ' are').replace(/'ll\b/g, ' will')
  .replace(/'ve\b/g, ' have').replace(/'d\b/g, ' would').replace(/\b(it|that|what|there|he|she|who|where|how)'s\b/g, '$1 is');
function checkType2() {
  if (lQ.answered) return;
  const inp = document.getElementById('type-ans');
  if (!inp.value.trim()) return inp.focus();
  lQ.answered = true; inp.disabled = true;
  const it = lDeck[lPos], got = expandShort(inp.value);
  const ok = lQ.en.split('/').map(expandShort).includes(got);
  inp.classList.add(ok ? 'right' : 'wrong');
  if (ok) lScore++; else if (it.cat && listenMode !== 'pic') setStatus(it.id, 'unknown');
  document.getElementById('card-after').innerHTML = `<div class="answer-box ${ok ? 'ok' : 'ng'}">
      <div class="ab-title">${ok ? '⭕ 答對了！' : '❌ 正確答案：'}</div>
      <div class="pre">${esc(lQ.en)}${lQ.zh ? '　' + esc(lQ.zh) : ''}</div>${ok ? '' : `<div class="muted">你打的是：${esc(inp.value)}</div>`}
      <div class="say-wrap">${sayBtn(lQ.en)}</div></div>
    <div class="row-btns">${ok ? '' : '<button class="btn ghost" data-act="type2-fix">我其實答對了（只是打錯字）</button>'}
      <button class="btn" data-act="listen-next">下一題 ›</button></div>`;
  speak(lQ.en);
}

// 🧩 句子重組：用空白切成字卡，句尾的 . ? ! 拿掉（排完再補上）
const orderTokens = en => en.replace(/[.?!]+$/, '').split(/\s+/).filter(Boolean);
const sameWord = (a, b) => a.toLowerCase().replace(/’/g, "'") === b.toLowerCase().replace(/’/g, "'");
function renderOrder() {
  document.getElementById('order-answer').innerHTML = lQ.picked.length
    ? lQ.picked.map((t, i) => `<button class="tile on" data-act="order-undo" data-i="${i}">${esc(lQ.tiles[t])}</button>`).join('')
    : '<span class="muted">點下面的字，排出句子</span>';
  document.getElementById('order-pool').innerHTML = lQ.tiles.map((w, i) =>
    `<button class="tile" data-act="order-pick" data-i="${i}" ${lQ.picked.includes(i) ? 'disabled' : ''}>${esc(w)}</button>`).join('');
  if (lQ.picked.length === lQ.tiles.length) checkOrder();
}
function checkOrder() {
  const it = lDeck[lPos], right = orderTokens(lQ.en);
  const ok = lQ.picked.every((t, i) => sameWord(lQ.tiles[t], right[i]));
  if (!lQ.tried) { if (ok) lScore++; else if (it.cat) setStatus(it.id, 'unknown'); }   // 再排一次答對不重複算分
  lQ.tried = true;
  lQ.answered = true;
  document.getElementById('order-pool').innerHTML = '';
  document.getElementById('card-after').innerHTML = `<div class="answer-box ${ok ? 'ok' : 'ng'}">
      <div class="ab-title">${ok ? '⭕ 排對了！' : '❌ 正確的順序是：'}</div>
      <div class="pre">${esc(lQ.en)}</div><div class="say-wrap">${sayBtn(lQ.en)}</div></div>
    <div class="row-btns">${ok ? '' : '<button class="btn ghost" data-act="order-reset">再排一次</button>'}
      <button class="btn" data-act="listen-next">下一題 ›</button></div>`;
  speak(lQ.en);
}
const listenEn = it => it.en || it.say || firstLine(it.back);
const listenZh = it => it.zh || it.front;
function renderListen() {
  if (!listenMode) return listenHome();
  if (listenMode === 'dialog') return renderDialog();
  if (listenMode === 'story') return renderStory();
  const head = `<button class="back" data-act="listen-home">‹ 聽說</button>`;
  if (lPos >= lDeck.length) {
    const back = planBack(listenMode);
    $view.innerHTML = head + `<div class="empty">🎉 這一組做完了！${listenMode !== 'shadow' ? `<br>答對 <b>${lScore}</b> / ${lDeck.length} 題` : ''}<br><br>
      ${back || `<button class="btn" data-act="listen-go" data-mode="${listenMode}" data-src="${listenSrc}">再來 ${LISTEN_ROUND} 題</button>`}</div>`;
    return;
  }
  const it = lDeck[lPos], en = listenEn(it);
  const counter = `<div class="counter">${LISTEN_SRC[listenSrc].name}　${lPos + 1} / ${lDeck.length}</div>`;
  if (listenMode === 'listen') {
    lQ = wordQuestion(it);
    if (!lQ) { lPos++; return renderListen(); }   // 做不出選項的就跳過
    $view.innerHTML = head + counter + `
      <div class="word-card" id="card-top">
        <button class="big-say" data-act="listen-play">🔊</button>
        <div class="muted">聽聽看，是什麼意思？（可以一直按）</div>
      </div>
      <div id="card-opts">${optsHtml(lQ.options, 'listen-ans')}</div>
      <div id="card-after"></div>`;
  } else if (listenMode === 'type') {
    lQ = { en };
    const hint = en.split(' ').map(w => w.replace(/^([A-Za-z])([A-Za-z'’]*)/, (m, a, b) => a + b.replace(/[A-Za-z]/g, '_'))).join(' ');
    $view.innerHTML = head + counter + `
      <div class="word-card"><div class="big-word zh" style="font-size:26px">${esc(listenZh(it))}</div><div class="muted">用英文打出來</div></div>
      <input id="type-ans" class="type-input" type="text" placeholder="用英文打出答案" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
      <div class="row-btns"><button class="btn ghost" data-act="type2-hint">💡 提示</button><button class="btn" data-act="type2-ok">確定</button></div>
      <div id="type-hint" class="type-hint" hidden>開頭字母：<b>${esc(hint)}</b></div>
      <div id="card-after"></div>`;
    const inp = document.getElementById('type-ans');
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') checkType2(); });
    setTimeout(() => inp.focus(), 50);
    return;   // 打字題一開始不念（念了就等於給答案）
  } else if (listenMode === 'pic') {
    // 🖼️ 看圖打英文：只給插畫，不給中文
    lQ = { en, zh: it.front };
    const hint = en.split(' ').map(w => w.replace(/^([A-Za-z])([A-Za-z'’-]*)/, (m, a, b) => a + b.replace(/[A-Za-z]/g, '_'))).join(' ');
    $view.innerHTML = head + counter + `
      <div class="word-card">${picHtml(it.pic, 'pic big')}<div class="muted">這是什麼？用英文打出來</div></div>
      <input id="type-ans" class="type-input" type="text" placeholder="用英文打出答案" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
      <div class="row-btns"><button class="btn ghost" data-act="type2-hint">💡 提示</button><button class="btn" data-act="type2-ok">確定</button></div>
      <div id="type-hint" class="type-hint" hidden>開頭字母：<b>${esc(hint)}</b></div>
      <div id="card-after"></div>`;
    const inp = document.getElementById('type-ans');
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') checkType2(); });
    setTimeout(() => inp.focus(), 50);
    return;
  } else if (listenMode === 'ee') {
    // 🔤 英英解釋：看簡單的英文解釋，選出是哪個字
    const others = shuffle(EN_DEFS.filter(d => d.en !== it.en)).slice(0, 3);
    lQ = { en: it.en, options: shuffle([{ text: it.en, right: true }, ...others.map(d => ({ text: d.en, right: false }))]) };
    $view.innerHTML = head + counter + `
      <div class="word-card" id="card-top"><div class="ee-def">${esc(it.def)}</div><div class="muted">這是在說哪個字？</div></div>
      <div id="card-opts">${optsHtml(lQ.options, 'ee-ans')}</div>
      <div id="card-after"></div>`;
    return;
  } else if (listenMode === 'order') {
    // 打亂到跟原本順序不一樣為止
    const tiles = orderTokens(en);
    let order = shuffle(tiles.map((_, i) => i));
    for (let t = 0; t < 5 && order.every((v, i) => v === i); t++) order = shuffle(order);
    lQ = { en, tiles: order.map(i => tiles[i]), picked: [] };
    $view.innerHTML = head + counter + `
      <div class="word-card"><div class="big-word zh" style="font-size:24px">${esc(listenZh(it))}</div><div class="muted">用英文怎麼說？</div></div>
      <div class="order-answer" id="order-answer"></div>
      <div class="order-pool" id="order-pool"></div>
      <div id="card-after"></div>`;
    renderOrder();
    return;   // 重組題一開始不念（念了就等於給答案）
  } else {
    lQ = { en };
    $view.innerHTML = head + counter + `
      <div class="word-card">
        <div class="shadow-en" id="shadow-en">${esc(en)}</div>
        <div class="muted">${esc(listenZh(it))}</div>
        <div class="row-btns"><button class="btn ghost" data-act="listen-play">🔊 聽</button>
          ${Rec ? '<button class="btn" id="rec-btn" data-act="shadow-rec">🎤 跟著念</button>' : ''}</div>
      </div>
      <div id="card-after">${Rec ? '' : '<p class="hint">聽完自己大聲跟著念 2～3 次</p>'}</div>
      <div class="row-btns"><button class="btn ghost" data-act="listen-next">下一句 ›</button></div>`;
  }
  setTimeout(() => speak(en), 300);   // 一出來就念
}
// ===== 📖 分級小短文（10/24）：點英文字看中文、每句可以看翻譯、整篇念、讀完答 2 題 =====
const STORY_READ_KEY = 'english-study-stories';
let storyRead = [], story = null;
try { storyRead = JSON.parse(localStorage.getItem(STORY_READ_KEY)) || []; } catch (e) {}
function storyListHtml() {
  if (typeof STORIES === 'undefined') return '';
  return `<div class="listen-box"><h3>📖 小短文</h3><p class="muted">一篇 8 句的生活小故事。不懂的字直接點，會跳出中文；每句後面的「中」可以看翻譯</p>` +
    [1, 2, 3].map(n => `<div class="dlg-level">${LEVEL_NAME[n]}</div><div class="dlg-grid">` +
      STORIES.filter(s => s.level === n).map(s => `<button class="btn ghost" data-act="story-start" data-id="${s.id}">${storyRead.includes(s.id) ? '✅ ' : ''}${esc(s.title)}</button>`).join('') + '</div>').join('') + '</div>';
}
// 查字：這篇的 words → 常用小字 → 單字庫（去掉 s、ed、ing 再查）
let storyDict = null;
function lookupWord(w) {
  if (!storyDict) {
    storyDict = {};
    ALL.filter(it => it.front && it.back && ['core', 'vocab'].includes(it.cat)).forEach(it => {
      const en = firstLine(it.back).toLowerCase();
      if (!storyDict[en]) storyDict[en] = it.front.split('；')[0];
    });
  }
  w = w.toLowerCase().replace(/’/g, "'");
  const forms = [w, w.replace(/'s$/, ''), w.replace(/ies$/, 'y'), w.replace(/es$/, ''), w.replace(/s$/, ''), w.replace(/ied$/, 'y'),
    w.replace(/ed$/, ''), w.replace(/d$/, ''), w.replace(/ing$/, ''), w.replace(/ing$/, 'e'), w.replace(/(\w)\1(ed|ing)$/, '$1')];
  const local = story && story.words ? Object.fromEntries(story.words.split('|').map(p => p.split('='))) : {};
  for (const f of forms) if (local[f]) return local[f];
  for (const f of forms) if (STORY_COMMON[f]) return STORY_COMMON[f];
  for (const f of forms) if (storyDict[f]) return storyDict[f];
  return '';
}
function startStory(id) { story = { ...STORIES.find(s => s.id === id), answered: 0 }; listenMode = 'story'; }
function renderStory() {
  const s = story;
  const words = en => en.split(/([A-Za-z][A-Za-z']*)/).map((p, i) => i % 2 ? `<span class="st-w" data-act="st-word" data-w="${esc(p)}">${esc(p)}</span>` : esc(p)).join('');
  // 問題的選項打亂一次就好（重畫時不要換位置）
  s.q = s.q || s.qs.map(([q, ...opts]) => ({ q, options: shuffle(opts.map((t, i) => ({ text: t, right: i === 0 }))) }));
  $view.innerHTML = `<button class="back" data-act="listen-home">‹ 聽說</button>
    <div class="today-head"><span><b>${esc(s.title)}</b></span><span class="muted">${LEVEL_NAME[s.level]}</span></div>
    <div class="row-btns"><button class="btn ghost" data-act="st-play">🔊 整篇念</button><button class="btn ghost" data-act="st-zh-all">中 全部翻譯</button></div>
    <div class="story">${s.lines.map((l, i) => `<div class="st-line">
      <span class="st-en">${words(l.en)}</span> ${sayBtn(l.en)}<button class="st-zh-btn" data-act="st-zh" data-i="${i}">中</button>
      <div class="st-zh" id="st-zh-${i}" hidden>${zhWrap(esc(l.zh))}</div></div>`).join('')}</div>
    <h3 class="sec-title">✏️ 看懂了嗎？</h3>
    ${s.q.map((q, k) => `<div class="st-q" data-q="${k}"><div class="q">${k + 1}. ${esc(q.q)}</div>${optsHtml(q.options, 'st-ans')}<div class="st-after"></div></div>`).join('')}
    <div id="story-end"></div>`;
}
function answerStory(el) {
  const box = el.closest('[data-q]'), q = story.q[Number(box.dataset.q)], i = Number(el.dataset.i);
  if (q.answered) return;
  q.answered = true;
  markOpts(q.options, i, box);
  const ok = q.options[i].right;
  box.querySelector('.st-after').innerHTML = `<div class="answer-box ${ok ? 'ok' : 'ng'}"><div class="ab-title">${ok ? '⭕ 答對了！' : '❌ 答案是：' + esc(q.options.find(o => o.right).text)}</div></div>`;
  if (story.q.every(x => x.answered)) {
    if (!storyRead.includes(story.id)) { storyRead.push(story.id); try { localStorage.setItem(STORY_READ_KEY, JSON.stringify(storyRead)); } catch (e) {} }
    const same = STORIES.filter(x => x.level === story.level), next = same[same.findIndex(x => x.id === story.id) + 1];
    document.getElementById('story-end').innerHTML = `<div class="answer-box ok"><div class="ab-title">🎉 讀完了！</div>
      <div class="muted">再整篇聽一次、跟著念，效果更好</div></div>
      <div class="row-btns">${next ? `<button class="btn" data-act="story-start" data-id="${next.id}">下一篇：${esc(next.title)} ›</button>` : ''}
      <button class="btn ghost" data-act="listen-home">回到聽說</button></div>`;
  }
}
// 點字：下面跳出小框框（中文＋🔊）
function showWordPop(w) {
  document.querySelectorAll('.word-pop').forEach(p => p.remove());
  const zh = lookupWord(w);
  const pop = document.createElement('div');
  pop.className = 'word-pop';
  pop.innerHTML = `<b>${esc(w)}</b> ${sayBtn(w)}<div class="wp-zh">${zh ? esc(zh) : '（這個字還沒有收錄，看整句的翻譯試試）'}</div><button class="wp-x" aria-label="關閉">✕</button>`;
  pop.addEventListener('click', e => { if (e.target.closest('.wp-x')) pop.remove(); else if (e.target.closest('[data-say]')) speak(e.target.closest('[data-say]').dataset.say); });
  document.body.appendChild(pop);
  speak(w);
}
function answerEE(i) {
  if (lQ.answered) return;
  lQ.answered = true;
  const it = lDeck[lPos], ok = lQ.options[i].right, zh = zhOf(it.en);
  markOpts(lQ.options, i, document.getElementById('card-opts'));
  if (ok) lScore++;
  document.getElementById('card-after').innerHTML = `<div class="answer-box ${ok ? 'ok' : 'ng'}">
      <div class="ab-title">${ok ? '⭕ 答對了！' : '❌ 答案是：' + esc(it.en)}</div>
      <div class="pre"><b>${esc(it.en)}</b>＝${esc(it.def)}${zh ? '\n中文：' + esc(zh) : ''}</div>
      <div class="say-wrap">${sayBtn(it.en + '. ' + it.def)}</div></div>
    <div class="row-btns"><button class="btn" data-act="listen-next">下一題 ›</button></div>`;
  speak(it.en);
}
function answerListen(i) {
  if (lQ.answered) return;
  lQ.answered = true;
  const it = lDeck[lPos], ok = lQ.options[i].right;
  markOpts(lQ.options, i, document.getElementById('card-opts'));
  if (ok) lScore++; else if (it.cat) setStatus(it.id, 'unknown');
  document.getElementById('card-top').innerHTML = `<div class="word-card done ${ok ? 'ok' : 'ng'}" style="margin:0;border:0;box-shadow:none">
    <div class="big-word">${esc(listenEn(it))}</div>${sayBtn(listenEn(it))}<div class="big-zh">${esc(listenZh(it))}</div></div>`;
  document.getElementById('card-after').innerHTML = `<div class="row-btns"><button class="btn" data-act="listen-next">下一題 ›</button></div>`;
}
// 跟讀：比對念出來的字。念對的字變綠色，沒念到的變紅色
// 「字」= 英文字母、數字、撇號連在一起的一段（I'd、7、o'clock）；比對時不分大小寫
const WORD_PART = /[A-Za-z0-9'’]+/g;
const wordsOf = s => (s.match(WORD_PART) || []).map(w => w.toLowerCase().replace(/’/g, "'"));
// 用麥克風聽使用者念 en：念完回傳 { html: 念對綠色／沒念到紅色的句子, pct, heard }，出錯回傳 { error }
function recognize(en, btn, done) {
  const r = new Rec();
  r.lang = 'en-US'; r.interimResults = false; r.maxAlternatives = 3;
  btn.textContent = '👂 請念…'; btn.disabled = true;
  r.onresult = e => {
    const heard = [...e.results[0]].map(a => a.transcript);
    const target = wordsOf(en);
    // 幾個辨識結果裡，挑對到最多字的那一個
    const best = heard.map(h => { const w = wordsOf(h); return { h, hit: target.map(t => w.includes(t)) }; })
      .sort((a, b) => b.hit.filter(Boolean).length - a.hit.filter(Boolean).length)[0];
    const pct = Math.round(best.hit.filter(Boolean).length / target.length * 100);
    let k = 0;
    // 先切成「字」和「字中間的東西」，再各自 esc，撇號才不會被拆開
    const html = en.split(/([A-Za-z0-9'’]+)/).map((p, i) =>
      i % 2 ? `<span class="${best.hit[k++] ? 'w-ok' : 'w-ng'}">${esc(p)}</span>` : esc(p)).join('');
    done({ html, pct, heard: best.h });
  };
  r.onerror = e => done({ error: e.error === 'not-allowed' ? '⚠️ 請允許使用麥克風' : '沒有聽到聲音，再試一次' });
  r.onend = () => { btn.textContent = '🎤 再念一次'; btn.disabled = false; };
  r.start();
}
const recResult = res => res.error ? `<p class="hint">${res.error}</p>` : `<div class="answer-box ${res.pct >= 80 ? 'ok' : 'ng'}">
  <div class="ab-title">${res.pct >= 80 ? '👍 很棒！' : res.pct >= 50 ? '💪 差一點，再念一次' : '🔁 再聽一次，慢慢念'}　${res.pct}%</div>
  <div class="muted">網站聽到的：${esc(res.heard)}</div></div>`;
function shadowRec() {
  recognize(lQ.en, document.getElementById('rec-btn'), res => {
    if (res.html) document.getElementById('shadow-en').innerHTML = res.html;
    document.getElementById('card-after').innerHTML = recResult(res);
  });
}

// ===== 💬 情境對話：對方的話自動念出來；輪到「你」的時候先看中文，自己說，再看答案 =====
let dlg = null, dPos = 0, dShown = false;
function startDialog(id) { dlg = DIALOGS.find(d => d.id === id); dPos = 0; dShown = false; listenMode = 'dialog'; }
function renderDialog() {
  const head = `<button class="back" data-act="listen-home">‹ 聽說</button>
    <div class="today-head"><span><b>${esc(dlg.title)}</b></span><span class="muted">你 ↔ ${esc(dlg.other)}</span></div>
    <p class="muted">${esc(dlg.scene)}</p>`;
  const bubble = (l, i) => {
    const hide = l.me && i === dPos && !dShown;   // 輪到你、還沒看答案
    return `<div class="bubble ${l.me ? 'me' : ''}"><div class="who">${l.me ? '🙋 你' : esc(l.who)}</div>
      ${hide ? `<div class="en muted">（用英文怎麼說？）</div>` : `<div class="en" id="${i === dPos ? 'dlg-en' : ''}">${esc(l.en)} ${sayBtn(l.en)}</div>`}
      <div class="zh">${esc(l.zh)}</div></div>`;
  };
  const done = dPos >= dlg.lines.length;
  const cur = dlg.lines[dPos];
  const back = done && planBack('dialog');
  const btns = done
    ? `<div class="empty">🎉 對話練完了！<br><br>${back || `<button class="btn ghost" data-act="dlg-start" data-id="${dlg.id}">再練一次</button>
        <button class="btn" data-act="listen-home">換一個對話</button>`}</div>`
    : cur.me && !dShown
      ? `<div class="row-btns">${Rec ? '<button class="btn" id="rec-btn" data-act="dlg-rec">🎤 說說看</button>' : ''}
          <button class="btn ghost" data-act="dlg-show">👀 看答案</button></div>`
      : `<div class="row-btns"><button class="btn" data-act="dlg-next">下一句 ›</button></div>`;
  $view.innerHTML = head + `<div class="chat">${dlg.lines.slice(0, dPos + 1).map(bubble).join('')}</div>
    <div id="dlg-after"></div>${btns}`;
  const last = $view.querySelector('.bubble:last-of-type');
  if (last && !done) last.scrollIntoView({ block: 'center' });
  if (!done && (!cur.me || dShown)) speak(cur.en);   // 對方說的、或你看完答案 → 念出來
}
function dialogRec() {
  const cur = dlg.lines[dPos];
  recognize(cur.en, document.getElementById('rec-btn'), res => {
    if (res.error) { document.getElementById('dlg-after').innerHTML = recResult(res); return; }
    dShown = true; renderDialog();
    document.getElementById('dlg-en').innerHTML = res.html + ' ' + sayBtn(cur.en);
    document.getElementById('dlg-after').innerHTML = recResult(res);
  });
}

// ===== 切換分頁 =====
const TABS = {
  today: { title: '每日複習', render: renderToday, start: startToday },
  notes: { title: '筆記', render: renderNotes },
  // 卡片：點了直接開始練（全部混在一起），不要先出現分類按鈕；想專練一類用上面的下拉選單
  cards: { title: '卡片練習', render: renderCards, start: () => { if (!currentCat) currentCat = 'all'; startDeck(); } },
  wrong: { title: '錯題本', render: renderCards, start: () => { currentCat = 'wrong'; startDeck(); } },
  quiz: { title: '小測驗', render: renderQuiz, start: startQuiz },
  listen: { title: '聽力和跟讀', render: renderListen, start: startListen },
  progress: { title: '學習進度', render: renderProgress }
};
function showTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tabs button').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  $title.textContent = TABS[tab].title;
  if (TABS[tab].start) TABS[tab].start();
  TABS[tab].render();
  window.scrollTo(0, 0);
}


// ===== 換頁：每次換頁都記在網址上（#分頁/分類/筆記），瀏覽器的「上一頁」才會有用 =====
function route() {
  document.querySelectorAll(".word-pop").forEach(p => p.remove());   // 換頁時關掉小短文查字的框框
  const [tab, cat, item] = decodeURIComponent(location.hash.slice(1)).split('/');
  currentTab = TABS[tab] ? tab : 'today';
  // 分類搬家、筆記合併後，舊的網址（或「回到上次那一頁」）也要能打開：找不到就回到那則筆記現在所在的分類
  const moved = item && ALL.find(it => it.id === item && it.note);
  currentCat = CAT[cat] || (cat === 'all' && currentTab !== 'notes') ? cat : null;
  if (moved && currentTab === 'notes' && moved.cat !== currentCat) currentCat = moved.cat;
  openItem = currentTab === 'notes' && currentCat && ALL.some(it => it.id === item && it.cat === currentCat && it.note) ? item : null;
  showTab(currentTab);
}
function go(tab, cat, item, replace) {
  const hash = '#' + [tab, cat, item].filter(Boolean).join('/');
  const depth = (history.state && history.state.depth || 0) + (replace ? 0 : 1);
  if (replace) history.replaceState({ depth }, '', hash);
  else history.pushState({ depth }, '', hash);
  route();
}
// 返回上一層：如果是從網站裡點進來的，就跟瀏覽器「上一頁」一樣
function goUp() {
  if (history.state && history.state.depth > 0) return history.back();
  go(currentTab, openItem ? currentCat : null, null, true);
}
window.addEventListener('popstate', route);
// 卡片的「練習範圍」下拉選單
document.addEventListener('change', e => {
  if (e.target.id === 'deck-cat') go('cards', e.target.value === 'all' ? null : e.target.value, null, true);
});

document.querySelector('.tabs').addEventListener('click', e => {
  const b = e.target.closest('button[data-tab]');
  if (!b) return;
  const tab = b.dataset.tab;
  // 再點一次目前的分頁 → 回到分類首頁；換分頁時保留同一個分類
  let cat = tab === currentTab || tab === 'progress' ? null : currentCat;
  if (tab === 'notes' && cat === 'all') cat = null;
  go(tab, cat);
});

$view.addEventListener('click', e => {
  const say = e.target.closest('[data-say]');
  if (say) return speak(say.dataset.say);   // 放最前面：卡片上的 🔊 不要順便翻面
  // 圖卡右上角的 💡：點了才打開小提醒（10/24：小提醒把卡片撐高，同一排會空一大塊）
  const tipBtn = e.target.closest('.tip-btn');
  if (tipBtn) { tipBtn.closest('.row').classList.toggle('tip-open'); return masonry(); }

  // 點圖卡 → 全螢幕放大，再點一下關掉
  const zoom = e.target.closest('[data-zoom]');
  if (zoom) {
    const box = document.createElement('div');
    box.className = 'zoom';
    box.innerHTML = `<img src="${esc(zoom.getAttribute('src'))}" alt="">`;
    box.onclick = () => box.remove();
    document.body.appendChild(box);
    return;
  }

  const cat = e.target.closest('[data-cat]');
  if (cat) return go(currentTab, cat.dataset.cat);

  const open = e.target.closest('[data-open]');
  if (open) return go('notes', currentCat, open.dataset.open);

  const mark = e.target.closest('[data-mark]');
  if (mark) {
    const id = mark.dataset.id, v = mark.dataset.mark;
    setStatus(id, status[id] === v ? null : v);   // 再按一次可以取消
    const y = window.scrollY;
    renderNotes();
    window.scrollTo(0, y);
    return;
  }

  let el = e.target.closest('[data-act]');
  if (!el) return;
  // 選擇題：點選項 → 先選起來＋念英文；按「送出答案」才真的作答
  if (el.classList.contains('opt')) {
    const text = el.querySelector('.otext').textContent;
    if (el.dataset.act !== 'listen-ans' && isEnglish(text)) speak(text);   // 聽力題不念，不然等於洩漏答案
    const box = el.parentElement;
    if (!box.classList.contains('done')) {
      box.querySelectorAll('.opt').forEach(b => b.classList.toggle('picked', b === el));
      const sub = box.nextElementSibling;
      if (sub && sub.classList.contains('opt-submit')) { sub.disabled = false; sub.textContent = '✅ 送出答案'; }
      return;
    }
  }
  if (el.dataset.act === 'opt-submit') {
    el = el.previousElementSibling.querySelector('.opt.picked');
    if (!el) return;
  }
  switch (el.dataset.act) {
    case 'back': goUp(); break;
    case 'prev': case 'next': {
      const list = ALL.filter(it => it.cat === currentCat && it.note);
      const i = list.findIndex(it => it.id === openItem) + (el.dataset.act === 'next' ? 1 : -1);
      if (list[i]) go('notes', currentCat, list[i].id, true);   // 上一則／下一則不另外記紀錄
      break;
    }
    case 'flip': el.classList.toggle('flipped'); break;
    case 'srs': answerSrs(Number(el.dataset.v)); break;
    case 'today-ans': answerToday(Number(el.dataset.i)); break;
    case 'type-ok': checkTyping(); break;
    case 'type-hint': document.getElementById('type-hint').hidden = false; break;
    case 'level-up': setLevel(userLevel + 1); startToday(); renderToday(); window.scrollTo(0, 0); break;
    case 'level-set': setLevel(Number(el.dataset.v)); renderProgress(); break;
    case 'week-go': startWeek(); window.scrollTo(0, 0); break;
    case 'week-ans': answerWeek(Number(el.dataset.i)); break;
    case 'week-next': weekRun.pos++; renderWeek(); window.scrollTo(0, 0); break;
    case 'week-end': weekRun = null; renderToday(); window.scrollTo(0, 0); break;
    case 'more-new': extraNew += 10; startToday(); renderToday(); break;
    case 'card-mark': setStatus(deck[deckPos].id, el.dataset.v); deckPos++; renderCards(); break;
    case 'card-skip': deckPos++; renderCards(); window.scrollTo(0, 0); break;
    case 'card-ans': answerCard(Number(el.dataset.i)); break;
    case 'blank-ans': answerBlank(Number(el.dataset.i)); break;
    case 'listen-home': listenMode = null; renderListen(); break;
    case 'cal': calOffset += Number(el.dataset.v); renderProgress(); break;
    case 'backup-copy':
      markBackup();
      navigator.clipboard.writeText(backupText()).then(() => alert('✅ 已複製！貼到備忘錄或 LINE 傳給自己存起來'), () => prompt('請全選複製這串文字：', backupText()));
      document.querySelectorAll('.backup-banner').forEach(b => b.remove());
      break;
    case 'backup-file': {
      markBackup();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([backupText()], { type: 'application/json' }));
      a.download = `英文學習備份-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      break;
    }
    case 'restore-paste': { const t = prompt('把備份文字貼在這裡：'); if (t) restoreText(t); break; }
    case 'open-note': go('notes', el.dataset.c, el.dataset.id); break;
    case 'weak-cards': go('cards', el.dataset.c); window.scrollTo(0, 0); break;
    case 'plan-go': startPlan(el.dataset.k); window.scrollTo(0, 0); break;
    case 'plan-back': go('today'); break;
    case 'listen-go': planRun = null; startListenRound(el.dataset.mode, el.dataset.src); renderListen(); window.scrollTo(0, 0); break;
    case 'listen-play': speak(listenEn(lDeck[lPos])); break;
    case 'listen-ans': answerListen(Number(el.dataset.i)); break;
    case 'ee-ans': answerEE(Number(el.dataset.i)); break;
    case 'story-start': startStory(el.dataset.id); renderListen(); window.scrollTo(0, 0); break;
    case 'st-word': showWordPop(el.dataset.w); break;
    case 'st-zh': { const z = document.getElementById('st-zh-' + el.dataset.i); z.hidden = !z.hidden; break; }
    case 'st-zh-all': { const zs = [...document.querySelectorAll('.st-zh')], show = zs.some(z => z.hidden); zs.forEach(z => { z.hidden = !show; }); break; }
    case 'st-play': speak(story.lines.map(l => l.en).join(' ')); break;
    case 'st-ans': answerStory(el); break;
    case 'listen-next': lPos++; renderListen(); window.scrollTo(0, 0); break;
    case 'shadow-rec': shadowRec(); break;
    case 'dlg-start': startDialog(el.dataset.id); renderDialog(); window.scrollTo(0, 0); break;
    case 'dlg-show': dShown = true; renderDialog(); break;
    case 'dlg-next': dPos++; dShown = false; renderDialog(); break;
    case 'dlg-rec': dialogRec(); break;
    case 'type2-ok': checkType2(); break;
    case 'type2-hint': document.getElementById('type-hint').hidden = false; break;
    case 'type2-fix': lScore++; el.remove(); break;
    case 'order-pick': if (!lQ.answered) { lQ.picked.push(Number(el.dataset.i)); renderOrder(); } break;
    case 'order-undo': if (!lQ.answered) { lQ.picked.splice(Number(el.dataset.i), 1); renderOrder(); } break;
    case 'order-reset': lQ.picked = []; lQ.answered = false; document.getElementById('card-after').innerHTML = ''; renderOrder(); break;
    case 'restart-deck': planRun = null; startDeck(); renderCards(); break;
    case 'answer': answerQuiz(Number(el.dataset.i)); break;
    case 'next-q': quizPos++; quizAnswered = false; renderQuiz(); window.scrollTo(0, 0); break;
    case 'restart-quiz': startQuiz(); renderQuiz(); break;
    case 'reset':
      if (confirm('確定要清除所有「已熟／不熟」標記嗎？')) {
        status = {};
        try { localStorage.removeItem(STORE_KEY); } catch (e) {}
        renderProgress();
      }
      break;
  }
});

// 打開網站時：30 分鐘內看過的話，回到上次那一頁；隔比較久才從「今日」開始
const LAST_KEY = 'english-study-last';
let startHash = location.hash;
if (!startHash) {
  try {
    const last = JSON.parse(localStorage.getItem(LAST_KEY));
    if (last && Date.now() - last.time < 30 * 60 * 1000) startHash = last.hash;
  } catch (e) {}
}
history.replaceState({ depth: 0 }, '', startHash || '#today');

setInterval(() => { try { localStorage.setItem(LAST_KEY, JSON.stringify({ hash: location.hash, time: Date.now() })); } catch (e) {} }, 2000);
route();

// 離線也能用（只有放到網路上 https 時才會啟用）
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js');
  // 自動更新（10/24 使用者要的）：iPhone 主畫面的 App 切回來時不會重新載入，
  // 所以回到 App 時去看 sw.js 的 VERSION，跟打開時不一樣就重新載入（頁面會回到剛剛那一頁）。
  // 正在用的時候有新版，不打斷，只在上面出現「點一下更新」。
  const swVersion = () => fetch('sw.js', { cache: 'no-store' }).then(r => r.text()).then(t => (t.match(/VERSION = '([^']+)'/) || [])[1]).catch(() => null);
  let loadedVersion = null;
  swVersion().then(v => { loadedVersion = v; });
  const checkUpdate = async auto => {
    const v = await swVersion();
    if (!v || !loadedVersion || v === loadedVersion) return;
    if (auto) return location.reload();
    if (document.querySelector('.update-bar')) return;
    const bar = Object.assign(document.createElement('button'), { className: 'update-bar', textContent: '🆕 網站有新版本，點一下更新' });
    bar.onclick = () => location.reload();
    document.body.appendChild(bar);
  };
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') checkUpdate(true); });
  setInterval(() => { if (document.visibilityState === 'visible') checkUpdate(false); }, 10 * 60 * 1000);
}

// 框框標題太長換成兩行時，把框框上面的空間和大括號往下移，才不會疊到內容
function fitLabels() {
  document.querySelectorAll('.page .nb > .lbl').forEach(l => {
    if (getComputedStyle(l).position !== 'absolute') return;
    const h = l.offsetHeight;
    if (h > 28) { l.parentElement.style.setProperty('--pt', (h + 10) + 'px'); l.parentElement.style.setProperty('--bt', (h + 12) + 'px'); }
  });
}

// 兩欄框框：照順序一個一個放進「目前比較矮的那一欄」→ 左右交錯、不留空白（10/23 使用者要的）
// 有插畫的單字表在顯示圖片時維持一欄（圖卡本身就是兩欄）
function masonry() {
  document.querySelectorAll('.page .nbgrid').forEach(g => {
    if (!g._items) g._items = [...g.children].filter(el => !el.classList.contains('mcol'));
    const single = false;   // 10/23 使用者要有插畫的單字表也兩欄（每一段的圖卡排成一直排）
    const items = g._items;
    g.innerHTML = '';
    g.classList.remove('stack', 'masonry');
    items.forEach(el => el.classList.remove('wide'));
    if (single) { items.forEach(el => g.appendChild(el)); return; }
    g.classList.add('masonry');
    const row = g.appendChild(Object.assign(document.createElement('div'), { className: 'mrow' }));
    const cols = [0, 1].map(() => row.appendChild(Object.assign(document.createElement('div'), { className: 'mcol' })));
    // 先量每個框框放在半邊時有多高
    items.forEach(el => cols[0].appendChild(el));
    fitLabels();   // 標題換行會讓框框變高，先調好再量
    const h = items.map(el => el.offsetHeight);
    // 10/23 使用者：一律兩欄、左右要平均。所有分法都試一遍，挑左右差最少的（同一欄裡照原本順序）
    const best = idx => {
      let bestSide = null, bestGap = Infinity;
      const n = idx.length, tries = n <= 14 ? 1 << n : 0;
      for (let m = 0; m < tries; m += 2) {   // 第一個框框一定放左邊
        let a = 0, b = 0;
        idx.forEach((i, k) => { if (m >> k & 1) b += h[i]; else a += h[i]; });
        if (Math.abs(a - b) < bestGap) { bestGap = Math.abs(a - b); bestSide = m; }
      }
      if (bestSide === null) {   // 太多框框：從最高的開始放進比較矮的那邊
        const sum = [0, 0], side = {};
        [...idx].sort((x, y) => h[y] - h[x]).forEach(i => { const c = sum[0] <= sum[1] ? 0 : 1; side[i] = c; sum[c] += h[i]; });
        return { side, gap: Math.abs(sum[0] - sum[1]) };
      }
      const side = {}; idx.forEach((i, k) => { side[i] = bestSide >> k & 1; });
      return { side, gap: bestGap };
    };
    const all = items.map((_, i) => i);
    // 先照順序放進比較矮的那一欄（左右輪流，順序最自然）；差很多才用「最平均」的分法
    const inOrder = (() => { const sum = [0, 0], side = {}; all.forEach(i => { const c = sum[0] <= sum[1] ? 0 : 1; side[i] = c; sum[c] += h[i]; }); return { side, gap: Math.abs(sum[0] - sum[1]) }; })();
    const tot0 = h.reduce((s, x) => s + x, 0);
    let plan = inOrder.gap <= Math.max(200, tot0 * 0.12) ? inOrder : best(all);
    // 還是差很多的話，試試把最後一個或最長的那個拉到下面變寬；明顯比較平均才換
    if (items.length >= 3 && plan.gap > 200) {
      for (const idx of [all.slice(0, -1)]) {   // 只拉最後一個，才不會打亂順序
        const p = best(idx);
        if (p.gap < plan.gap - 200) plan = p;
      }
    }
    // 怎麼分都差很多（框框少、一個特別長）→ 每個框框一整排、裡面的字分兩欄，才不會空一大塊
    const tot = h.reduce((s, x) => s + x, 0);
    // 只有 2 個框框就一律左右並排（10/24 使用者：「冠詞和名詞單複數」一長一短變整排不好看）
    if (items.length > 2 && plan.gap > Math.max(300, tot * 0.35)) plan = { side: {} };   // 只有差到很誇張才變一整排（使用者比較想要兩欄）
    // 框框照原本的順序放回去（同一欄裡上下順序不變）
    items.forEach((el, i) => {
      const inCol = i in plan.side;
      el.classList.toggle('wide', !inCol);
      if (inCol) cols[plan.side[i]].appendChild(el); else g.appendChild(el);
    });
  });
  // 字型、圖片載入完高度會變，再排一次
  if (!masonry.waiting) {
    masonry.waiting = true;
    const again = () => { clearTimeout(masonryTimer); masonryTimer = setTimeout(() => { masonry.waiting = false; masonry(); fitLabels(); }, 150); };
    if (document.fonts && document.fonts.status !== 'loaded') document.fonts.ready.then(again);
    else document.querySelectorAll('.page img').forEach(img => { if (!img.complete) img.addEventListener('load', again, { once: true }); });
    setTimeout(() => { masonry.waiting = false; }, 3000);
  }
}
let masonryTimer;
window.addEventListener('resize', () => { clearTimeout(masonryTimer); masonryTimer = setTimeout(() => { masonry(); fitLabels(); }, 200); });

// ===== 🔤 字的大小：小／中／大（10/23 使用者要的：改成兩欄後字比較小），記在手機裡 =====
const FONT_KEY = 'english-study-font', FONTS = [['小', 0.9], ['中', 1], ['大', 1.15]];
let fontIdx = 1;
try { const v = Number(localStorage.getItem(FONT_KEY)); if (FONTS[v]) fontIdx = v; } catch (e) {}
function applyFont() {
  document.documentElement.style.setProperty('--fz', FONTS[fontIdx][1]);
  document.getElementById('font-btn').textContent = '🔤 ' + FONTS[fontIdx][0];
}
document.getElementById('font-btn').addEventListener('click', () => {
  fontIdx = (fontIdx + 1) % FONTS.length;
  try { localStorage.setItem(FONT_KEY, fontIdx); } catch (e) {}
  applyFont();
  if (document.querySelector('.page')) { masonry(); fitLabels(); }   // 字變大小，兩欄要重排
});
applyFont();

// ===== 📑 長筆記的小目錄：最上面一排按鈕，點一下跳到那一段（10/23 使用者要的） =====
function buildToc() {
  const page = document.querySelector('.page'); if (!page) return;
  // 有 ▍小標題就用小標題；沒有的話，框框多（5 個以上）就用框框的標題
  let marks = [...page.querySelectorAll('h3.msec')];
  if (marks.length < 2) { marks = [...page.querySelectorAll('.nb > .lbl')]; if (marks.length < 5) return; }
  const name = el => el.textContent.replace(/（\d+ 個）/, '').replace(/^[①-⑳]\s*/, '').replace(/\s*[①-⑥]$|（續）$/, '').trim();
  // 一組拆成好幾框（①②③）的只留一個按鈕；照筆記原本的順序排（兩欄排版會把框框的順序打亂）
  const src = ((openItem && ALL.find(it => it.id === openItem)) || {}).note || '';
  const pos = m => { const i = src.indexOf(name(m)); return i < 0 ? 1e9 : i; };
  const seen = new Set();
  marks = marks.filter(m => !seen.has(name(m)) && seen.add(name(m))).map((m, i) => [m, i]).sort((a, b) => pos(a[0]) - pos(b[0]) || a[1] - b[1]).map(x => x[0]);
  if (marks.length < 2) return;
  const nav = document.createElement('nav');
  nav.className = 'toc';
  nav.innerHTML = '<span class="toc-t">📑 跳到：</span>' + marks.map((m, i) => `<button data-toc="${i}">${esc(name(m).slice(0, 18))}</button>`).join('');
  page.querySelector('h2').after(nav);
  nav.addEventListener('click', e => { const b = e.target.closest('[data-toc]'); if (b) marks[b.dataset.toc].scrollIntoView({ behavior: 'smooth', block: 'start' }); });
}
// 往下滑很多的時候，右下角出現「⬆」回到最上面
const topBtn = Object.assign(document.createElement('button'), { className: 'to-top', textContent: '⬆', title: '回到最上面' });
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.body.appendChild(topBtn);
window.addEventListener('scroll', () => topBtn.classList.toggle('show', window.scrollY > 800 && !!document.querySelector('.page')), { passive: true });
