const fs=require('fs'),vm=require('vm');
const dir=process.argv[2];
const ctx={console};vm.createContext(ctx);
for(const f of['data.js','data-extra.js','data-more.js','data-sentences.js'])vm.runInContext(fs.readFileSync(dir+'/'+f,'utf8').replace(/^const /gm,'var ').replace(/^let /gm,'var '),ctx,{filename:f});
const app=fs.readFileSync(dir+'/app.js','utf8');
const pick=(re)=>app.match(re)[0];
const code=`
const ALL = NOTES.flatMap(cat => cat.items.map(it => ({ ...it, cat: cat.id, catName: cat.name })));
const isCard = it => it.front && it.back;
${pick(/const firstLine = .*/)}
${pick(/const isEnglish = .*/)}
${pick(/const wordRe = .*/)}
${pick(/const splitSentence = l => \{[\s\S]*?\n\};/)}
let sentenceLines = null;
${pick(/function findSentence[\s\S]*?\n\}/)}
const out=new Map();
for(const it of ALL){ if(!isCard(it))continue; const en=firstLine(it.back);
 if(!isEnglish(en)||isEnglish(it.front)||it.front.includes(String.fromCharCode(10))||it.blank)continue;
 const s=findSentence(it,en); if(s&&wordRe(en).test(s.en)) out.set(s.en,(s.zh||'')); }
JSON.stringify([...out]);`;
fs.writeFileSync(process.argv[3],vm.runInContext(code,ctx));
