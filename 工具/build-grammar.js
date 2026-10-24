// 產生 data-grammar.js（句型問答答完後，英文每個字下面的小標籤）
// 用法：node 工具/build-grammar.js
// 流程：collect-sentences 抓出句型問答會用到的所有例句 → tag-draft 自動標 → tag-fixes 人工修正 → 寫檔
// 新增例句後重跑一次，再看「沒修正過」的新句子對不對，不對就加進 tag-fixes.js
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const root = path.join(__dirname, '..');
const tmp = path.join(require('os').tmpdir(), 'grammar-sents.json');
execFileSync(process.execPath, [path.join(__dirname, 'collect-sentences.js'), root, tmp]);
const list = JSON.parse(fs.readFileSync(tmp, 'utf8'));
const { tag } = require('./tag-draft.js');
const fixes = require('./tag-fixes.js');
const CODES = [];
const code = l => { let i = CODES.indexOf(l); if (i < 0) { i = CODES.length; CODES.push(l); } return String.fromCharCode(65 + i); };
const out = {};
let bad = 0;
for (const [en] of list) {
  const n = en.split(' ').length;
  const labels = fixes[en] ? fixes[en].split(' ') : tag(en);
  if (labels.length !== n) { console.log('字數不合：', en, labels.join(' ')); bad++; continue; }
  out[en] = labels.map(l => (l === '-' ? '.' : code(l))).join('');
}
for (const k of Object.keys(fixes)) if (!out[k]) console.log('修正表裡的句子沒用到：', k);
fs.writeFileSync(path.join(root, 'data-grammar.js'),
  '// 句型問答的詞性小標籤（工具/build-grammar.js 產生的，不要手改；要改請改 工具/tag-fixes.js 再重跑）\n' +
  '// 每句一串字母，一個字母對應英文的一個字，字母是 GRAMMAR_LABELS 的第幾個（A=0），「.」代表不標\n' +
  `const GRAMMAR_LABELS = ${JSON.stringify(CODES)};\n` +
  `const GRAMMAR_TAGS = ${JSON.stringify(out, null, 0).replace(/","/g, '",\n"')};\n`);
console.log(`完成：${Object.keys(out).length} 句，${CODES.length} 種標籤，${bad} 句有問題`);
