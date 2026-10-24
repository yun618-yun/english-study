// 句型問答的「詞性小標籤」草稿產生器（node 工具，不會放上網站）
// 用法：node 工具/tag-draft.js 句子清單.json 輸出.txt
// 產生的草稿一定要人工逐句檢查，改好的放進 data-grammar.js
const W = s => s.split(' ');
const LEX = {};
const add = (tag, words) => W(words).forEach(w => { LEX[w] = (LEX[w] ? LEX[w] + ',' : '') + tag; });
add('V', 'add agree ask asked asks believe blew bloom blooms booked borrow bought breaks bring brings broke builds burned buy buys came carries catches caused choose climb climbs comes cooks cross cry cuts dig doing done draw drank drinks drive drives eat eaten eating eats ends enjoy expect feel fell fill find finds finish fix flies focus forget forgot freeze gave get give gives go goes going got grab grows had hang has have hear heard helps hides hit hold hurry hurts improve improving joins jump keep keeps kisses knits know lays learn learning learns leaving lend let like likes listen listening listens live lose made make makes meet miss move need needs opened pack pass pay played plays prefer pull put puts raining rains read reading reads recommend remember restarting ride rides rises rub run running runs sat saw say says see sell sells send shake shaved showed sing sit sleeps smells smiles sounds speak speaks spell starts stay stayed stopped stops studies study studying suffer suggest support swim swims take takes talking talks tastes teach tell tells thank think throws throwing took tore traveling try turn understand use used uses visits wait waiting wake want wants wash watched watches watching wear wears went win wins worked works write writes come hurt cut');
add('VN', 'book break brush call care change charge check cook cover dash drink end exercise help hike hope kiss leave leaves lives lock love meeting order plan plans play practice rain rest ring rings sleep smell smile snow show start stop text travel update visit walk watch work dance shower match');
add('A', 'afraid allergic angry bad baked bald beautiful best big biased black blue bored boring brave bright broken brown busy careful cautious clean clear closed cloudy cold common cool critical cute dark dead dirty domestic dry dull eager easy empty excited exciting expensive familiar famous fast favorite favorable fat female fine first foreign free fresh fried friendly full golden good gray great green happy hard healthy heavy helpful high highest honest hot humid hungry important interested interesting international ironic juicy kind large last late little long loose loud low lower male married medium negative nervous neutral new next nice objective old open optimistic pessimistic pink poor popular positive pretty purple ready red relieved right round sad same sarcastic scary second sharp short shortest sick silver single skeptical skilled sleepy slow small smaller smart smoked smooth snowy soft sorry sour sparkling special spicy square steamed stiff stinky straight strong sunny sure sweet sympathetic tall taller thin thirsty tight tired tough warm western white windy wireless worried yellow young rainy stormy foggy overcast covered lost potted round-trip wet whole');
add('R', 'please actually again almost always anyway back correctly down enough far happily here home just more most much never often only out quickly really slowly so sometime sometimes then together too twice up usually very well off inside outside downtown away partly');
add('T', 'today tomorrow tonight yesterday now later');
add('P', 'about above after along around at before behind between by for from in into of on over through to under with without than as near like');
add('C', 'and but or because when if unless');
add('Q', 'what which where who why how whose');
add('AUX', 'do does did can could will would should must may might');
add('BE', 'am is are was were be been');
add('PS', 'i he she we they');
add('PY', 'you it');
add('PD', 'this that these those');
add('PO', 'me him us them himself');
add('PP', 'my your his our their its');
add('QA', 'some any every many few each another both all');
add('NUM', 'one two three four five six seven eight nine ten eleven twelve twenty thirty half zero');
add('PN', 'everyone something others someone everything nothing');
add('INT', 'hello hi oh ok yes no thanks');
add('V', 'mean decide excuse looking');
const TIMEN = W('weekend day week morning afternoon evening night year month summer winter spring fall autumn');
add('NEG', 'not never');
add('A2', 'such');
add('R2', 'either there');
const CON = { "i'm": '主詞＋be動詞', "he's": '主詞＋be動詞', "it's": '主詞＋be動詞', "that's": '主詞＋be動詞', "what's": '疑問詞＋be動詞', "there's": 'There＝有＋is',
  "don't": '助動詞＋not', "doesn't": '助動詞＋not', "can't": '助動詞＋not', "isn't": 'be動詞＋not', "aren't": 'be動詞＋not', "wasn't": 'be動詞＋not', "didn't": '助動詞＋not', "won't": '助動詞＋not', "you're": '主詞＋be動詞', "we're": '主詞＋be動詞', "they're": '主詞＋be動詞', "she's": '主詞＋be動詞', "i'll": '主詞＋助動詞', "i'd": '主詞＋助動詞', "let's": "Let's＝一起…吧" };
const LABEL = { NEG: '否定', A2: '形容詞', R2: '副詞', D: '冠詞', A: '形容詞', R: '副詞', T: '時間', P: '介系詞', C: '連接詞', Q: '疑問詞', AUX: '助動詞', BE: 'be動詞', PP: '所有格', QA: '形容詞', NUM: '數字', INT: '感嘆詞', PD: '指示詞' };
add('D', 'a an the');
add('A', 'fair firm close mean');
add('V', 'ate types dry wrote');
add('VN', 'park');
const NOTING = W('something nothing everything anything spring thanksgiving peking lightning ring rings morning evening king sing bring thing building ceiling clothing stocking earring wedding pudding');
const PHRASAL = W('put turn take pick wake get try give clean call');
add('V', 'paddle stick handed');
add('VN', 'download cut');
add('A', 'horizontal parallel martial social');
add('P', 'past');
add('V', 'look looks rose');
add('A', 'faster');
add('V', 'open close clean');
const NOTLY = W('rally family july lily jelly belly fly butterfly reply italy holy');
const ADV_AFTER_V = W('late hard fast early high long');
const LINKING = W('feel feels felt look looks sound sounds smell smells taste tastes get gets got turn turns become seem stay keep');

function tag(en) {
  const toks = en.split(' ');
  const core = toks.map(t => t.replace(/^[^A-Za-z0-9']+|[^A-Za-z0-9']+$/g, '').toLowerCase());
  const lex = c => LEX[c] || (CON[c] ? 'CON' : /^\d/.test(c) ? 'NUM' : /'s$/.test(c) ? 'POSS' : /ly$/.test(c) && !NOTLY.includes(c) ? 'R' : 'N');
  const out = [];
  let zone = 'subj', verbSeen = false, clauseC = false, lastVerb = '';
  for (let i = 0; i < toks.length; i++) {
    const c = core[i], L = lex(c), prev = out[i - 1], nextL = i + 1 < toks.length ? lex(core[i + 1]) : '';
    const prevPos = prev ? prev.pos : 'START';
    let pos = L.split(',')[0], label;
    if (L === 'CON') {
      label = CON[c];
      verbSeen = true;
      zone = /^(主詞|疑問詞)/.test(label) ? (/be動詞/.test(label) ? 'be' : 'obj') : c === "let's" ? 'start' : c === "there's" ? 'be' : /^be/.test(label) ? 'be' : 'after';
      if (/^(助動詞|be動詞)/.test(label) && prevPos === 'START') zone = 'subj2';
      out.push({ pos: 'CON', label });
      continue;
    }
    if (c === 'there' && (/^(is|are|was|were|will)$/.test(core[i + 1] || '') || (i === 1 && prevPos === 'BE'))) { out.push({ pos: 'THERE', label: 'There＝有' }); zone = 'thr'; continue; }
    if (L.split(',').includes('VN')) {
      const nounCtx = /^(D|PP|A|QA|NUM|P|POSS|PD)$/.test(prevPos) || (prevPos === 'START' && /^(BE|V|AUX)$/.test(nextL.split(',')[0])) || (prevPos === 'N' && zone !== 'subj');
      pos = nounCtx ? 'N' : 'V';
    }
    if (c === 'to') pos = /(^|,)(V|VN|BE)(,|$)/.test(nextL) || /^(do|does)$/.test(core[i + 1] || '') ? 'TO' : 'P';
    if (/^(do|does|did)$/.test(c) && (prevPos === 'TO' || (zone === 'after' && /^(PS|PY|N|PRON)$/.test(prevPos)))) pos = 'V';
    if (pos === 'A' && !verbSeen && /^(PS|PY|N)$/.test(prevPos) && /ed$|^lost$/.test(c)) pos = 'V';
    if (pos === 'P' && /^(on|off|in|out|up|down|back|over)$/.test(c) && (i === toks.length - 1 || /,$/.test(toks[i])) && prevPos !== 'START') pos = 'R';
    if (toks[i].replace(/[^A-Za-z]/g, '') === 'May' && i > 0) pos = 'N';
    if (c === 'so' && /^(PS|PY|PRON|CON)/.test(nextL)) pos = 'C';
    if (ADV_AFTER_V.includes(c) && prevPos === 'V' && !LINKING.includes(lastVerb) && !/^(N|VN)/.test(nextL)) pos = 'R';
    if (prevPos === 'TO' && L.split(',').includes('V')) pos = 'V';
    if (/ing$/.test(c) && !NOTING.includes(c) && (prevPos === 'P' || (prevPos === 'V' && !/^(is|are|am|was|were)$/.test(lastVerb)))) pos = 'GER';
    if (/^(do|does|did)$/.test(c) && i + 1 < toks.length && !/^(V|VN|PS|PY|NEG|PRON|PD|CON|N)/.test(nextL)) pos = 'V';
    if (/^(do|does|did)$/.test(c) && /^(N)/.test(nextL) && !/[A-Z]/.test(toks[i + 1][0])) pos = 'V';
    if (i === 0 && L.split(',').includes('V') && /^(PP|D|PO|PD|HER)/.test(nextL)) pos = 'V';
    if (/ing$/.test(c) && i === 0 && !NOTING.includes(c)) pos = 'GER';
    if (prev && prev.label === '助動詞＋not' && pos !== 'BE') pos = 'V';
    if (/^(right|left)$/.test(c) && /^turns?$/.test(lastVerb) && prevPos === 'V') pos = 'R';
    if (c === 'when' && i === 0) pos = 'Q';
    if (c === 'fun' && prevPos === 'BE') pos = 'A';
    if (c === 'one' && i === toks.length - 1) pos = 'ONE';
    if (/^(up|down|off)$/.test(c) && /^(D|PP)/.test(nextL)) pos = 'P';
    if (/^(on|off|up|down|out|in)$/.test(c) && prevPos === 'V' && PHRASAL.includes(lastVerb.replace(/s$/, ''))) pos = 'R';
    if (zone === 'be' && /^(BE|R|NEG)$/.test(prevPos) && L.split(',').includes('A')) pos = 'A';
    if (pos === 'AUX' && i === toks.length - 1 && /^(D|N)$/.test(prevPos)) pos = 'N';
    if (pos === 'A' && !verbSeen && /^(PS|PY)$/.test(prevPos) && L.split(',').includes('V')) pos = 'V';
    if (zone === 'be' && prevPos === 'BE' && /ing$/.test(c) && !L.startsWith('A')) pos = 'V';
    if (!verbSeen && zone === 'subj' && /^(N|POSS|PS|PY)$/.test(prevPos) && pos === 'N' && /s$/.test(c) && /^(D|PP|PO|QA|NUM|A|N|HER|PD)/.test(nextL) && !/'s$/.test(c)) pos = 'V';
    if (c === 'like' && prevPos === 'V') pos = 'P';
    if (c === 'one' && /^(Q|PD|D)$/.test(prevPos)) pos = 'ONE';
    if (/^(this|that|these|those)$/.test(c)) pos = /^(N|A|NUM|VN|POSS)/.test(nextL) ? 'PD' : 'PRON';
    if (c === 'that' && verbSeen && prevPos !== 'P' && pos === 'PRON' && /^(PS|PY|D|PP|N|THERE)/.test(nextL)) pos = 'C';
    if (c === 'her') pos = /^(N|A|VN|NUM|POSS)/.test(nextL) ? 'PP' : 'PO';
    if (c === 'like' && /^(PS|PY|N|PRON)$/.test(prevPos) && !verbSeen) pos = 'V';
    if (c === 'when' && i > 0) pos = 'C';
    if (/ing$/.test(c) && pos === 'V' && prevPos === 'V') pos = 'GER';
    if (c === 'right' && core[i + 1] === 'now') pos = 'R';
    if (/^(sorry|good|hi|hello|ok|oh)$/.test(c) && i === 0 && /[,!]$/.test(toks[i])) pos = 'INT';
    if (c === 'no' && /^(N|A|VN)/.test(nextL)) pos = 'QA';
    // 時間片語：this weekend、every day、that day、next week
    if (TIMEN.includes(c.replace(/s$/, '')) && /^(PD|QA|A)$/.test(prevPos) && /^(this|that|every|next|last)$/.test(core[i - 1]) && prevPos !== 'P') { out[i - 1].label = '時間'; out.push({ pos: 'T', label: '時間' }); continue; }
    if (pos === 'N' && prevPos === 'Q' && /^(BE|AUX)/.test(nextL)) { out.push({ pos: 'Q', label: '疑問詞' }); continue; }
    switch (pos) {
      case 'V': label = '動詞'; verbSeen = true; zone = 'obj'; lastVerb = c; break;
      case 'BE': case 'AUX':
        label = LABEL[pos];
        if (zone === 'thr') { zone = 'thrN'; verbSeen = true; break; }
        if (!verbSeen && (prevPos === 'START' || en.endsWith('?'))) zone = 'subj2';   // 問句：後面才是主詞
        else zone = pos === 'BE' ? 'be' : 'after';
        verbSeen = true; break;
      case 'PS': label = '主詞'; if (zone === 'subj2') zone = 'after'; break;
      case 'PO': label = '受詞'; break;
      case 'PY': case 'PRON': case 'PN':
        label = zone === 'subj' || zone === 'subj2' ? '主詞' : zone === 'obj' || zone === 'pobj' ? '受詞' : pos === 'PRON' || pos === 'PN' ? '代名詞' : '受詞';
        if (zone === 'subj2') zone = 'after';
        break;
      case 'ONE': label = '代名詞'; break;
      case 'TO': label = '不定詞'; break;
      case 'GER': label = '動名詞'; zone = 'obj'; break;
      case 'N': case 'POSS':
        label = pos === 'POSS' ? '所有格' : zone === 'subj' || zone === 'subj2' || zone === 'thrN' ? (zone === 'thrN' ? '名詞' : '主詞') : zone === 'obj' ? '受詞' : '名詞';
        if (zone === 'subj2' && !/^(N|POSS)/.test(nextL)) zone = 'after';
        break;
      case 'P': label = '介系詞'; zone = 'pobj'; break;
      case 'C': label = '連接詞'; if (/^(PS|PY|D|PP|PRON|THERE|CON|N)/.test(nextL) && c !== 'and' && c !== 'or') { zone = 'subj'; verbSeen = false; clauseC = true; } break;
      default: label = LABEL[pos] || '';
    }
    out.push({ pos, label });
    if (/[.!?]$/.test(toks[i])) { zone = 'subj'; verbSeen = false; clauseC = false; }
    if (/,$/.test(toks[i]) && (!verbSeen || (clauseC && i > 0))) { zone = 'subj'; verbSeen = false; clauseC = false; }
  }
  // 整句沒有動詞（例如 Less sugar, please.）→ 名詞不分主詞受詞
  if (!out.some(o => /動詞/.test(o.label || ''))) out.forEach(o => { if (/^(主詞|受詞)$/.test(o.label)) o.label = '名詞'; });
  return out.map(o => o.label || '-');
}
module.exports = { tag };
if (require.main === module) {
  const fs = require('fs');
  const list = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  fs.writeFileSync(process.argv[3], list.map(([en], n) => n + ' ' + en.split(' ').map((t, i) => t + '/' + tag(en)[i]).join(' ')).join('\n'));
}
