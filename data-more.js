// ===================== 第六批（10/23 使用者截圖，原文簡體，已改繁體） =====================
// 放在獨立的檔案。index.html 在 data-extra.js 後面、app.js 前面載入（要用到 data-extra.js 的 buildGroups、slug）。
// 截圖收在 原始素材/筆記截圖/第六批（10-23）/

// ---------- 🎵 記憶口訣：四組「記口訣」選擇題 ----------
NOTES.find(c => c.id === 'mnemonic').items.push(
  {
    id: 'mn-tool',
    title: '「用」什麼做事：in、by、with、use',
    note: '中文都說「用…」，英文要看是用什麼。\n\n【口訣】\n語言 → [in]\n方式 → [by]\n工具 → [with]\n主詞後面 → [use]\n\n① 語言用 in\nShe says hello [in] French. 她用法語打招呼。\n\n② 方式用 by（後面常接 V-ing 或交通工具）\nI exercise [by] working out. 我透過健身來鍛鍊身體。\nI go to work [by] bus. 我搭公車上班。\n\n③ 工具用 with\nHe hits the ball [with] a racket. 他用球拍打球。\n\n④ 放在主詞後面當動詞，用 use\nShe [uses] a pen to do her homework. 她用筆寫作業。\n\n💡 in、by、with 是介係詞；use 是動詞，所以前面要有主詞，而且要跟著主詞變化：she uses、he uses\n⚠️ 收集的筆記有錯：She say hello 少了 s，正確是 She says hello；She use a pen 也要寫成 She uses a pen',
    front: 'He hits the ball ___ a racket.\n（他用球拍打球）',
    back: 'with\n工具用 with',
    quiz: { q: 'He hits the ball ___ a racket.（用球拍）', options: ['in', 'by', 'with', 'use'], answer: 2 }
  },
  {
    id: 'mn-tool-in',
    front: 'She says hello ___ French.\n（她用法語打招呼）',
    back: 'in\n語言用 in',
    quiz: { q: 'She says hello ___ French.（用法語）', options: ['in', 'by', 'with', 'use'], answer: 0 }
  },
  {
    id: 'mn-tool-by',
    front: 'I go to work ___ bus.\n（我搭公車上班）',
    back: 'by\n方式（交通工具）用 by',
    quiz: { q: 'I exercise ___ working out.（透過健身）', options: ['in', 'by', 'with', 'use'], answer: 1 }
  },
  {
    id: 'mn-tool-use',
    front: 'She ___ a pen to do her homework.\n（她用筆寫作業）',
    back: 'uses\n放在主詞後面當動詞，用 use（she 要加 s）',
    quiz: { q: 'She ___ a pen to do her homework.', options: ['in', 'by', 'with', 'uses'], answer: 3 }
  },
  {
    id: 'mn-no-not',
    title: 'no 和 not 怎麼選',
    note: '兩個都是「沒有、不」，看後面接什麼字。\n\n【口訣】\n名詞前 → [no]\n其他字前 → [not]\n\n① 名詞前面用 no\nI have [no] storybooks. 我沒有故事書。\nThere is [no] milk. 沒有牛奶了。\n\n② 其他字（動詞、形容詞…）前面用 not\nI do [not] have crayons. 我沒有蠟筆。\nShe is [not] happy. 她不開心。\n\n💡 no ＝ not any：I have no storybooks. ＝ I don\'t have any storybooks.\n💡 do not 常縮寫成 don\'t：I don\'t have crayons.',
    front: 'I have ___ storybooks.\n（我沒有故事書）',
    back: 'no\nstorybooks 是名詞，名詞前面用 no',
    quiz: { q: 'I have ___ storybooks.（我沒有故事書）', options: ['no', 'not', 'none', 'nothing'], answer: 0 }
  },
  {
    id: 'mn-no-not-2',
    front: 'I do ___ have crayons.\n（我沒有蠟筆）',
    back: 'not\nhave 是動詞，不是名詞，用 not',
    quiz: { q: 'I do ___ have crayons.（我沒有蠟筆）', options: ['no', 'not', 'none', 'nothing'], answer: 1 }
  },
  {
    id: 'mn-why-not',
    title: 'Why not 和 Why don\'t 怎麼選',
    note: '兩個都是「為什麼不…呢？」，常用來給別人建議。\n\n【口訣】\nWhy not ＋ 動詞原形\nWhy don\'t ＋ 主詞 ＋ 動詞原形\n\n① Why not 後面直接接動詞\n[Why not] ask your teacher for help? 為什麼不向老師求助呢？\n\n② Why don\'t 後面要先有主詞\n[Why don\'t] you try again? 你為什麼不再試一次呢？\n\n💡 兩句意思一樣：Why not try again? ＝ Why don\'t you try again?\n💡 Why don\'t we…? 是「我們要不要…？」：Why don\'t we go out for dinner? 我們要不要出去吃晚餐？',
    front: 'Why ___ ask your teacher for help?\n（為什麼不向老師求助呢）',
    back: 'Why not ask your teacher for help?\n後面直接是動詞原形 → Why not',
    quiz: { q: 'Why ___ ask your teacher for help?', options: ['not', 'don\'t', 'no', 'doesn\'t'], answer: 0 }
  },
  {
    id: 'mn-why-dont',
    front: 'Why ___ you try again?\n（你為什麼不再試一次呢）',
    back: 'Why don\'t you try again?\n後面先有主詞 you → Why don\'t',
    quiz: { q: 'Why ___ you try again?', options: ['not', 'don\'t', 'no', 'aren\'t'], answer: 1 }
  },
  {
    id: 'mn-do-can-are',
    title: 'Do you、Can you、Are you 怎麼選',
    note: '問句開頭要看你想問什麼。\n\n【口訣】\nDo you → 習慣\nCan you → 能力\nAre you → 正在進行\n\n① 問習慣（常常做的事）用 Do you\n[Do you] skip rope every day? 你每天跳繩嗎？\n\n② 問能力（會不會）用 Can you\n[Can you] draw? 你會畫畫嗎？\n\n③ 問現在正在做的事用 Are you（後面接 V-ing）\n[Are you] singing? 你正在唱歌嗎？\n\n💡 看後面的動詞也能判斷：V-ing（singing）→ Are you；原形動詞（draw）→ Do you 或 Can you\n💡 Are you 後面也可以接形容詞：Are you tired? 你累了嗎？',
    front: '___ skip rope every day?\n（你每天跳繩嗎）',
    back: 'Do you\n每天做的事是「習慣」→ Do you',
    quiz: { q: '___ skip rope every day?（習慣）', options: ['Do you', 'Can you', 'Are you'], answer: 0 }
  },
  {
    id: 'mn-can-you',
    front: '___ draw?\n（你會畫畫嗎）',
    back: 'Can you\n問「會不會」是能力 → Can you',
    quiz: { q: '___ draw?（你會畫畫嗎）', options: ['Do you', 'Can you', 'Are you'], answer: 1 }
  },
  {
    id: 'mn-are-you',
    front: '___ singing?\n（你正在唱歌嗎）',
    back: 'Are you\n後面是 V-ing，正在進行 → Are you',
    quiz: { q: '___ singing?（你正在唱歌嗎）', options: ['Do you', 'Can you', 'Are you'], answer: 2 }
  }
);

// ---------- ⭐ 基礎文法：條件句 ----------
NOTES.find(c => c.id === 'basics').items.push(
  {
    id: 'b-if',
    title: '條件句：if、unless、as long as',
    note: '表示「如果／除非／只要……，就……」。\n\n【三個常用的字】\nif　如果\nunless　除非（＝ if not）\nas long as　只要\n\n【核心規則：主將從現】\n主要句子用未來式（will），if 那半句用現在式\n[If] it rains tomorrow, we will stay at home. 如果明天下雨，我們就待在家。\n\n① 主情從現：主要句子有情態動詞（can、may、must），if 那半句也用現在式\nIf you finish your homework, you can watch TV. 如果你寫完功課，就可以看電視。\n\n② 主祈從現：主要句子是祈使句（叫人做事），if 那半句也用現在式\nIf you are tired, take a rest. 如果你累了，就休息一下。\n\n③ unless ＝ if not\n[Unless] you hurry, you will be late. 除非你快一點，不然會遲到。\nIf you don\'t hurry, you will be late. 意思一樣。\n\n④ as long as：只要\n[As long as] you try, you will improve. 只要你肯試，就會進步。\n\n⚠️ 注意：if 那半句不加 will\n✗ If it will rain tomorrow, we will stay at home.\n⚠️ if 放在前面，中間要加逗號；放在後面就不用加\nWe will stay at home if it rains tomorrow.\n\n💡 主＝主要句子、從＝if 那半句（從句）、將＝將來式（will）、現＝現在式',
    front: 'If it ___ (rain) tomorrow,\nwe will stay at home.',
    back: 'rains\n主將從現：if 那半句用現在式，不加 will',
    quiz: { q: 'If it ___ tomorrow, we will stay at home.', options: ['rains', 'will rain', 'rained', 'rain'], answer: 0 }
  },
  {
    id: 'b-if-unless',
    front: 'unless 是什麼意思？',
    back: '除非（＝ if not）\nUnless you hurry, you will be late.',
    quiz: { q: 'Unless you hurry, you ___ late.', options: ['are', 'will be', 'was', 'be'], answer: 1 }
  }
);

// ---------- ⚡ 常用動詞和形容詞：動詞變職業、單字家族 ----------
NOTES.find(c => c.id === 'core').items.push(
  {
    id: 'cw-er',
    title: '動詞加 -er 變成「做這件事的人」',
    note: '很多動詞後面加 -er，就變成「做這件事的人」，常常就是職業。\n\n【三種加法】\n一般直接加 er　teach → teacher\ne 結尾只加 r　dance → dancer\n短母音＋一個子音結尾：重複最後一個字母再加 er　run → runner\n\n① 直接加 er\nteach　teacher　老師\nsing　singer　歌手\nread　reader　讀者\npaint　painter　畫家\nclean　cleaner　清潔工\nbuild　builder　建築工人\ndesign　designer　設計師\nreport　reporter　記者\nbuy　buyer　買家\nfight　fighter　戰士\n\n② e 結尾只加 r\ndance　dancer　舞者\nwrite　writer　作家\ndrive　driver　司機\n\n③ 重複字母再加 er\nprogram　programmer　程式設計師\nrun　runner　跑者\nswim　swimmer　游泳的人\n\n④ 例外：不是加 er\nedit　editor　編輯（加 or）\nact　actor　演員（加 or）\ncook　cook　廚師（cook 本身就是廚師）\n\n⚠️ 注意：cooker 是「爐具、電鍋」，不是廚師！廚師是 cook 或 chef\n⚠️ 收集的筆記有錯：每一個都寫 +er，其實 write、dance、drive 只加 r；programmer 要重複 m；editor 是加 or；cook 加 er 變成 cooker 是「爐具」，筆記寫「廚具」放在職業裡容易誤會',
    front: 'write（寫）→ 作家？',
    back: 'writer\ne 結尾只加 r',
    quiz: { q: 'run → 跑者？', options: ['runer', 'runner', 'running', 'runor'], answer: 1 }
  },
  {
    id: 'cw-er-edit',
    front: 'edit（編輯）→ 編輯（人）？',
    back: 'editor\n加 or，不是 er',
    quiz: { q: 'act → 演員？', options: ['acter', 'actor', 'actress', 'acting'], answer: 1 }
  },
  {
    id: 'cw-er-cook',
    front: '「廚師」的英文？\ncook 還是 cooker？',
    back: 'cook（或 chef）\ncooker 是爐具、電鍋',
    quiz: { q: 'My mom is a good ___.（我媽媽是很棒的廚師）', options: ['cook', 'cooker', 'cooking', 'cooks'], answer: 0 }
  },
  {
    id: 'cw-er-program',
    front: 'program（寫程式）→ 程式設計師？',
    back: 'programmer\n重複 m 再加 er',
    quiz: { q: 'program → 程式設計師？', options: ['programer', 'programmer', 'programor', 'programming'], answer: 1 }
  },
  {
    id: 'cw-family',
    title: '單字家族：一個字變出很多字',
    note: '記住一個字，再看它前後加了什麼，就能一次背好幾個字。\n\n💡 常見的變化：\n加 ly → 副詞：patiently 耐心地\n加 im、un → 相反的意思：impatient 不耐煩的、untested 未經考驗的\n加 ern、ward → 方向：northern 北方的、northward 向北\n加 ence、ity、tion → 名詞：patience、simplicity、simplification\n\n【wall 牆】\nwall　n. 牆\nwalled　adj. 有圍牆的\n\n【patient 有耐心的；病人】\npatient　adj. 有耐心的；n. 病人\npatience　n. 耐心\npatiently　adv. 耐心地\nimpatient　adj. 不耐煩的、急切的\nimpatience　n. 不耐煩\nimpatiently　adv. 不耐煩地\noutpatient　n. 門診病人\ninpatient　n. 住院病人\n\n【news 消息】\nnews　n. 消息、新聞\nnewspaper　n. 報紙\nnewsletter　n. 通訊、簡報\nnewsy　adj. 新聞多的\n\n【test 測試】\ntest　n. 測試、考驗\ntesting　adj. 棘手的、考驗人的\ntester　n. 測試員；試用品\nuntested　adj. 未經考驗的\n\n【north 北方】\nnorth　n. 北方\nnorthern　adj. 北方的\nnorthernmost　adj. 最北的\nnorthward　adv. 向北\n\n【simple 簡單的】\nsimple　adj. 簡單的、樸素的\nsimply　adv. 簡單地；只是\nsimplify　v. 簡化\nsimplified　adj. 簡化的\nsimplification　n. 簡化\noversimplify　v. 過度簡化\nsimplicity　n. 簡單、樸素\nsimplistic　adj. 過於簡單化的\nsimpleton　n. 傻瓜\n\n【technology 科技】\ntechnology　n. 科技、技術\ntech　n. 科技（口語）\nhigh-tech　adj. 高科技的\ntechnological　adj. 科技的\ntechnologically　adv. 技術上\ntechnologist　n. 技術專家\n\n💡 news 雖然有 s，但是不可數名詞：The news is good.（不是 are）',
    front: 'patient 的兩個意思？',
    back: 'adj. 有耐心的\nn. 病人',
    say: 'patient',
    quiz: { q: 'impatient 是什麼意思？', options: ['有耐心的', '不耐煩的', '病人', '耐心地'], answer: 1 }
  },
  {
    id: 'cw-family-news',
    front: 'The news ___ good.\n用 is 還是 are？',
    back: 'is\nnews 雖然有 s，但是不可數名詞',
    quiz: { q: 'The news ___ good.', options: ['is', 'are', 'be', 'were'], answer: 0 }
  },
  {
    id: 'cw-family-simple',
    front: 'simple → 簡化（動詞）？',
    back: 'simplify\nsimplicity 是「簡單」（名詞），simply 是「簡單地」（副詞）',
    say: 'simplify'
  }
);

// ---------- 💬 生活常用句：What do you…? ----------
NOTES.find(c => c.id === 'daily').items.push(...buildGroups('dl', [
  ['what', 'What do you…? 常用問句', '用 What do you ＋ 動詞？就能問很多事情。',
    "What do you think?=你覺得怎麼樣？|What do you want?=你想要什麼？|What do you need?=你需要什麼？|What do you mean?=你是什麼意思？|What do you like?=你喜歡什麼？|What do you prefer?=你比較喜歡什麼？|What do you believe?=你相信什麼？|What do you remember?=你記得什麼？|What do you expect?=你期待什麼？|What do you care about?=你在乎什麼？|What do you suggest?=你建議什麼？|What do you focus on?=你專注在什麼？|What do you do?=你做什麼工作？|What do you think about it?=你覺得這個怎麼樣？|What do you say?=你覺得呢？（要不要？）|What do you want to do?=你想做什麼？|What do you know?=你知道什麼？|What do you need right now?=你現在需要什麼？|What do you see?=你看到什麼？|What do you hear?=你聽到什麼？|What do you plan to do?=你打算做什麼？|What do you expect from me?=你對我有什麼期待？|How do you feel?=你感覺如何？|Which one do you choose?=你選哪一個？|What did you decide?=你決定好了嗎？|What are you looking for?=你在找什麼？|What are you worried about?=你在擔心什麼？|What are your plans?=你有什麼計畫？",
    '💡 What do you do? 是問「你做什麼工作？」，不是問你現在在做什麼（那是 What are you doing?）\n💡 正在做的事要用 What are you ＋ V-ing：What are you looking for? 你在找什麼？\n💡 What do you say? 是「你覺得呢？要不要？」：Let\'s go for a walk. What do you say? 我們去散步，你覺得呢？\n💡 問「英文怎麼說」要用 How：How do you say this in English?\n💡 問感覺用 How，不用 What：How do you feel?\n⚠️ 收集的筆記有錯：What do you feel / choose / decide / consider / look for / plan / worry about 不自然，已經改成 How do you feel?、Which one do you choose?、What did you decide?、What are you looking for?、What are your plans?、What are you worried about?；What do you consider? 沒有放']
], {
  card: ([en, zh], key, p) => ({ id: `${p}-${key}-${slug(en)}`, front: zh, back: en, say: en, group: `${p}-${key}` })
}));

// ---------- 🖼️ 情境單字：看一張圖學一個地方的單字 ----------
{
  const SCENES = [
    ['restaurant', '🍽️ 西餐廳', '',
      '【餐廳和人】|restaurant=餐廳|western restaurant=西餐廳|bistro=小餐館|waiter=服務生|【點餐】|menu=菜單|dessert=甜點|sparkling water=氣泡水|【店裡的擺設】|bar counter=吧台（坐著點飲料的長桌）|bar stool=高腳椅|booth=卡座（靠牆、像沙發的座位，通常面對面坐）|wine cabinet=酒櫃|coffee maker=咖啡機|sideboard=餐具櫃（靠牆的矮櫃子，放盤子和杯子）|light fixture=燈具（裝在天花板或牆上的燈）|anchor=錨（船錨，餐廳的裝飾品）|potted plant=盆栽|【桌上的餐具】|silverware=餐具（刀、叉、湯匙）|dinner plate=主餐盤|steak knife=牛排刀|table knife=餐刀|dessert fork=甜點叉|napkin=餐巾|bread basket=麵包籃|butter dish=奶油碟|pepper mill=胡椒研磨器（轉一轉就會磨出胡椒）|sugar bowl=糖罐|coffee cup=咖啡杯|water glass=水杯|wine glass=酒杯|ice bucket=冰桶',
      '💡 這組原本的插畫上音標有錯（店名、steak knife），所以沒有放圖\n💡 bistro 是比較小、比較輕鬆的西式小餐館\n💡 dessert（甜點）重音在後面；desert（沙漠）重音在前面，拼法差一個 s\n💡 silverware 是刀叉湯匙的總稱，不一定是銀做的'],
    ['baggage', '🧳 機場：行李提領區', 'img/scene/baggage-claim.jpg',
      '【領行李】|baggage claim=行李提領處|baggage carousel=行李轉盤|conveyor belt=輸送帶|suitcase=行李箱|luggage cart=行李推車|【周圍看到的】|passenger=旅客|sign=指示牌|display screen=顯示螢幕|security camera=監視器|guardrail=護欄|floor=地板',
      '💡 baggage 和 luggage 意思一樣（行李），都不可數：two pieces of luggage 兩件行李\n💡 插畫上寫 camera（攝影機），機場天花板上的其實是監視器，英文叫 security camera'],
    ['airport', '✈️ 機場：航廈和停機坪', 'img/scene/airport.jpg',
      '【指示牌】|international arrivals=國際線入境|domestic departures=國內線出境|【窗外看到的】|terminal=航廈|airliner=客機|runway=跑道|shuttle bus=接駁巴士|ground support vehicle=地勤車輛|high-mast light=高桿燈',
      '💡 Arrivals 是「入境、到達」，Departures 是「出境、出發」\n💡 international 國際的、domestic 國內的\n💡 terminal 航廈：Terminal 1 第一航廈\n💡 插畫上的 Civil Aviation Airliner、Ground Service Support Vehicle 太長，平常說 airliner（或 plane）、ground support vehicle 就可以']
  ];
  const at = NOTES.findIndex(c => c.id === 'vocab');
  NOTES.splice(at + 1, 0, {
    id: 'scene', name: '情境單字', icon: '🖼️', color: '#4a8fa8', desc: '一個地方一組單字，出國用得到',
    items: SCENES.flatMap(([key, name, img, list, tip]) => {
      // 【小標題】把一長串分成幾段
      const parts = list.split('|');
      const rows = parts.filter(s => s.includes('=')).map(s => s.split('='));
      return [
        {
          id: 'sc-' + key, title: `${name}（${rows.length} 個）`,
          note: '{{nogrid}}' + (img ? `{{card:${img}}}\n\n點圖可以放大\n\n` : '') +
            parts.map(s => s.includes('=') ? s.replace('=', '　') : '\n' + s).join('\n').trim() + '\n\n' + tip
        },
        ...rows.map(([en, zh]) => ({
          id: `sc-${key}-${slug(en)}`, front: zh, back: en, say: en, group: 'sc-' + key
        }))
      ];
    })
  });
}

// ===================== 第七批（10/23 使用者截圖：主謂／主謂賓、5 個形容詞、閱讀測驗技巧） =====================
// 截圖收在 原始素材/筆記截圖/第七批（10-23）/

// ---------- 📖 文法用語：5 大句型補上「主謂 vs 主謂賓」 ----------
{
  const n = NOTES.find(c => c.id === 'terms').items.find(i => i.id === 'g-sentence-patterns');
  n.note += '\n\n【① 和 ② 怎麼分？看動詞】\n不及物動詞 → ① S + V（主謂）\nMy watch stopped. 我的錶停了。\n及物動詞 → ② S + V + O（主謂賓）\nWe played football. 我們踢足球。\n💡 動詞後面不用接東西，句子就完整 → 不及物動詞；後面一定要接「動作的對象」→ 及物動詞\n💡 「主謂」＝主詞＋動詞（謂語）；「主謂賓」＝主詞＋動詞＋受詞（賓語）';
}

// ---------- ⚡ 常用動詞和形容詞：5 個常用形容詞（一個字一則） ----------
// [英文, 中文, 美式音標, 三個例句, 小提醒, 測驗題, 測驗選項, 答案]
NOTES.find(c => c.id === 'core').items.push(...[
  ['eager', '渴望的', '/ˈiːɡɚ/',
    'He is eager to learn. 他渴望學習。\nShe is eager for success. 她渴望成功。\nThe kids are eager to open gifts. 孩子們急著想打開禮物。',
    '💡 記法：eager 來自古法文「尖銳的」，像箭一樣衝出去 → 渴望的\n💡 常用搭配：be eager to ＋ 動詞、be eager for ＋ 名詞',
    'The kids are ___ to open gifts.（孩子們急著想打開禮物）', ['eager', 'fair', 'firm', 'foreign'], 0],
  ['fair', '公平的；淺色的', '/fer/',
    'That\'s not fair! 那不公平！\nShe has fair hair. 她的頭髮是淺色的（金髮）。\nWe need a fair decision. 我們需要一個公平的決定。',
    '💡 記法：f 像天平，air 像公正的氣氛 → 公平的（這是聯想，不是真的字根）\n💡 fair hair 金髮、淺色頭髮；fair skin 白皙的皮膚\n💡 英式音標是 /feə/，網站念的是美式 /fer/',
    'That\'s not ___!（那不公平）', ['firm', 'fair', 'eager', 'familiar'], 1],
  ['familiar', '熟悉的', '/fəˈmɪljɚ/',
    'His face is familiar to me. 他的臉我很熟悉。\nThis song sounds familiar. 這首歌聽起來很耳熟。\nShe is familiar with the city. 她對這座城市很熟悉。',
    '💡 記法：family（家庭）＋ ar → 像家人一樣親近 → 熟悉的（真的是同一個字根）\n💡 東西 is familiar to 人：某人覺得某東西很熟\n💡 人 is familiar with 東西：某人熟悉某東西\n💡 英式音標是 /fəˈmɪliə/，網站念的是美式 /fəˈmɪljɚ/',
    'She is familiar ___ the city.（她對這座城市很熟悉）', ['to', 'with', 'for', 'at'], 1],
  ['firm', '堅定的；結實的', '/fɝːm/',
    'He has a firm belief. 他有堅定的信念。\nThe mattress is firm. 床墊很硬。\nShe gave a firm handshake. 她有力地握了握手。',
    '💡 記法：f 像挺直的腰，irm 像穩穩站住 → 堅定的（這是聯想）\n💡 firm 當名詞是「公司」：a law firm 律師事務所',
    'The mattress is ___.（床墊很硬）', ['foreign', 'eager', 'firm', 'fair'], 2],
  ['foreign', '外國的', '/ˈfɔːrən/',
    'She speaks a foreign language. 她會說一種外語。\nHe likes foreign films. 他喜歡外國電影。\nThey buy foreign products. 他們買外國產品。',
    '💡 記法：拉丁文 foris 是「門外」→ 外面來的 → 外國的\n💡 g 不發音（跟 sign 一樣，gn 的 g 不念）\n💡 外國人是 foreigner，但當面說不太禮貌，可以說 people from other countries\n⚠️ 收集的筆記有錯：截圖說 foreign 是「for（外面）＋ eign」，英文的 for 沒有「外面」的意思，真正的來源是拉丁文 foris（門外）\n💡 英式音標是 /ˈfɒrən/，網站念的是美式 /ˈfɔːrən/',
    'He likes ___ films.（他喜歡外國電影）', ['familiar', 'foreign', 'firm', 'eager'], 1]
].map(([en, zh, ipa, ex, tip, q, options, answer]) => ({
  id: 'cw-adj-' + en,
  title: `${en} ${zh}`,
  note: `${en}　adj. ${zh}\n音標（美式）：${ipa} {{say:${en}}}\n\n【例句】\n${ex}\n\n${tip}`,
  front: `${zh}（adj.）`,
  back: `${en}\n${ex.split('\n')[0]}`,
  say: en,
  group: 'cw-adj-f',
  quiz: { q, options, answer }
})));

// ---------- 📖 文法用語：閱讀測驗解題技巧（放在「語法填空答題技巧」後面） ----------
{
  const terms = NOTES.find(c => c.id === 'terms').items;
  const ATTITUDE = 'positive=正面的、積極的|optimistic=樂觀的|favorable=贊成的|sympathetic=同情的|neutral=中立的|objective=客觀的|cautious=謹慎的|negative=負面的|pessimistic=悲觀的|critical=批評的|skeptical=懷疑的|sarcastic=諷刺的、挖苦的|ironic=反諷的（說反話）|biased=有偏見的'
    .split('|').map(s => s.split('='));
  terms.splice(terms.findIndex(i => i.id === 'g-cloze-tips') + 1, 0,
    {
      id: 'g-reading-tips',
      title: '閱讀測驗解題技巧（5 種題型）',
      note: '{{nogrid}}考試的閱讀測驗大多是這 5 種題目。先看題目是哪一種，再用對的方法回去找答案。初學先看懂就好，以後考試用得到。\n\n' +
        '① 主旨題：問整篇在講什麼\n【題目常出現的字】\nmain idea　主要想法\nmainly explain　主要在解釋\nis mainly about　主要是關於\nkey point　重點\nmain topic　主題\nmainly discuss　主要在討論\nmain point　主要觀點\nbest title　最好的標題\npurpose　目的\n【怎麼找答案】\n注意一直重複出現的字\n主旨句通常在第一段或最後一段\n答案通常是「總結、概括」的句子\n【錯誤選項常見的樣子】\n第一段裡的小細節或例子\n跟文章無關，或意思相反\n意思對，但沒有主題字\n\n' +
        '② 細節題：問文章裡的某個事實\n【題目常出現的字】\n事實：what、when、where、who、which、whom\n原因結果：why、because、for、in fact、due to、lead to\n目的：purpose、aim to、in order to、so that\n舉例：for example\n【怎麼找答案】\n先圈出題目的主詞，回文章找到這個字，答案通常就在那一句\n那一句沒有答案，就看前一句或後一句\n用題目裡好找的字回去找：人名、地名、數字、年代、日期、大寫字母、特殊標點\n注意轉折字：no、never、but 後面的才是重點\n破折號（—）：後面是解釋說明\n冒號（:）：後面是解釋說明\n驚嘆號（！）：這一句是重點\n問號（？）：後面的回答是重點\n\n' +
        '③ 推理題：答案沒有直接寫，要自己推出來\n【題目常出現的字】\nimply　暗示\nsuggest　表明、暗示\nindicate　表明\ninfer　推斷\nconclude　推出結論\n【常見的問法】\nIn paragraph 3, the writer suggests that… 在第 3 段，作者想表達…\nIt can be inferred from the passage that… 從文章可以推斷…\n【怎麼找答案】\n答案來自文章，但比文章多想一步\n答案常用文章裡的字的「同義詞」\n不能自己亂加文章沒有的東西\n可以從事實、人物的表情動作說話、作者的態度去推\n\n' +
        '④ 猜字題：猜畫線的字是什麼意思\n【常見的問法】\nWhat does the underlined word "…" mean? 畫線的字是什麼意思？\nThe underlined word "…" can be replaced by ___. 畫線的字可以換成哪個字？\n【常考的三種】\n不認識的新字：看上下文猜\n認識的字但用了特別的意思：最常見、最常用的意思往往「不是」答案\n代名詞（it、they、this）指什麼：往前找它代替的東西\n\n' +
        '⑤ 態度題：問作者的態度、文章的語氣\n【常見的問法】\nThe author\'s attitude towards… is ___. 作者對…的態度是？\nThe tone of this passage can be described as ___. 這篇文章的語氣是？\n【怎麼找答案】\n問整篇 → 看作者自己的態度\n問一部分 → 看例子裡那個人的態度\n看清楚題目問的是「誰」的態度\n【常考的態度字】\n' +
        ATTITUDE.map(([en, zh]) => `${en}　${zh}`).join('\n') +
        '\n💡 名詞也常考：approval 贊成、disapproval 不贊成、opposition 反對、suspicion 懷疑、sympathy 同情\n\n' +
        '⚠️ 收集的筆記有錯：\nIn paragraph 3, the writer suggest that… → writer 是第三人稱單數，要用 suggests\nIt can be inferred from the next that… → 應該是 from the passage（或 the text）that…\npessimistic 寫成「悲傷的」→ 是「悲觀的」\ndisapproval 寫成 adj.（形容詞）→ 是 n.（名詞）「不贊成」\nmain topic 寫成「主要觀點」→ 是「主題」；mainly discuss 寫成「主要論點」→ 是「主要在討論」\ncritical 在同一頁重複寫了兩次',
      front: 'Which is the best title for the passage?\n是哪一種題型？',
      back: '主旨題\n看重複出現的字、第一段和最後一段',
      quiz: { q: 'It can be inferred from the passage that… 是哪一種題型？', options: ['主旨題', '細節題', '推理題', '態度題'], answer: 2 }
    },
    {
      id: 'g-reading-detail',
      front: '細節題的答案通常在哪裡？',
      back: '找到題目的關鍵字在文章的那一句\n沒有的話看前一句或後一句',
      quiz: { q: 'but、never 這種轉折字後面的內容？', options: ['不重要', '才是重點', '一定是錯的', '是例子'], answer: 1 }
    },
    ...ATTITUDE.map(([en, zh]) => ({
      id: 'g-reading-att-' + slug(en), front: zh + '（態度）', back: en, say: en, group: 'g-reading-att',
      avoid: { sarcastic: ['ironic'], ironic: ['sarcastic'], positive: ['optimistic', 'favorable'], optimistic: ['positive'], favorable: ['positive'], neutral: ['objective'], objective: ['neutral'] }[en]
    }))
  );
}

// ===================== 第八批（10/23 使用者截圖：不定式 to do 12 張，原文簡體） =====================
// 截圖收在 原始素材/筆記截圖/第八批（10-23）/。跟「to 的用法」重複的沒有放，只放新的 5 個主題 + 6 題練習
{
  const toItems = NOTES.find(c => c.id === 'to').items;
  const after = id => toItems.findIndex(i => i.id === id) + 1;
  toItems.splice(after('to-for-of-wh'), 0,
    {
      id: 'to-who-does',
      title: '誰來做這件事？want to do 和 want someone to do',
      note: `只多一個人，做動作的人就變了。

① 自己做：動詞 ＋ to do
I want to leave. 我想離開。（我想、我走）
I decided to stay. 我決定留下。（我決定、我留）
常用：want、hope、decide、plan、refuse ＋ to do

② 別人做：動詞 ＋ 人 ＋ to do
I want you to leave. 我想要你離開。（我想、你走）
I told Ben to stay. 我叫 Ben 留下。（我說、Ben 留）
常用：ask、tell、allow、remind ＋ 人 ＋ to do

【not 放哪裡，意思不一樣】
I told Ben not to leave. 我叫 Ben 不要走。
I did not tell Ben to leave. 我沒有叫 Ben 走。
👉 not 放在 to 前面 → 否定後面那件事；放在動詞前面 → 否定「說」這個動作

【後面的 to do 不會跟著變】
I want to leave. He wants to leave. He wanted to leave.
👉 變的是 want、wants、wanted；to leave 永遠不變，不會寫成 to leaves、to left

💡 hope 不能接「人 ＋ to do」：要說 I hope Ben can come.，不能說 I hope Ben to come.`,
      front: 'I want ___ leave.\n（我想要你離開）',
      back: 'I want you to leave.\n別人做：want ＋ 人 ＋ to do',
      quiz: { q: 'I told Ben ___ leave.（我叫 Ben 不要走）', options: ['not to', 'to not', "don't", 'no to'], answer: 0 }
    },
    {
      id: 'to-hope',
      front: '「我希望 Ben 能來」英文怎麼說？',
      back: 'I hope Ben can come.\nhope 不能接「人 ＋ to do」',
      quiz: { q: '「我希望 Ben 能來」哪一句對？', options: ['I hope Ben can come.', 'I hope Ben to come.', 'I hope Ben coming.', 'I hope Ben come.'], answer: 0 }
    },
    {
      id: 'to-noun',
      title: '名詞後面的 to do：說明是什麼東西',
      note: `{{nogrid}}to do 放在名詞後面，說明「是什麼樣的東西」。

① 東西是動作的對象
a book to read 一本要讀的書（讀的是書）
some water to drink 一些要喝的水

② 人是做動作的人
a person to help me 一個來幫我的人（幫忙的是這個人）

③ 說明是什麼的機會、時間
a chance to speak 說話的機會
time to go 該走的時間

【動詞本來要的介係詞，不能丟】
a chair to sit on 一張可以坐的椅子（sit on a chair）
a pen to write with 一支可以寫字的筆（write with a pen）
someone to talk to 一個可以聊天的人（talk to someone）
I need a chair to sit on. 我需要一張椅子坐。
👉 想一下原本的說法：sit on a chair、write with a pen，介係詞就不會忘記`,
      front: 'I need a pen to write ___.\n（我需要一支筆來寫字）',
      back: 'with\n原本是 write with a pen，介係詞不能丟',
      quiz: { q: 'I need a pen to write ___.（我需要一支筆寫字）', options: ['with', 'on', 'to', '不用加'], answer: 0 }
    },
    {
      id: 'to-noun-sit',
      front: 'I need a chair to sit ___.\n（我需要一張椅子坐）',
      back: 'on\n原本是 sit on a chair',
      quiz: { q: 'I need a chair to sit ___.', options: ['on', 'with', 'in', '不用加'], answer: 0 }
    },
    {
      id: 'to-noun-talk',
      front: 'I need someone to talk ___.\n（我需要一個可以聊天的人）',
      back: 'to\n原本是 talk to someone',
      quiz: { q: 'I need someone to talk ___.', options: ['to', 'on', 'in', '不用加'], answer: 0 }
    }
  );
  toItems.splice(after('to-purpose-reason-result'), 0,
    {
      id: 'to-too-enough',
      title: 'too … to 和 … enough to',
      note: `兩個都在說「程度」，但意思相反。

① too ＋ 形容詞 ＋ to do：太…所以不能…
The tea is too hot to drink. 茶太燙了，不能喝。
He is too tired to walk. 他太累了，走不動。

② 形容詞 ＋ enough ＋ to do：夠…所以可以…
The tea is cool enough to drink. 茶夠涼了，可以喝。
She is old enough to drive. 她夠大了，可以開車。

💡 enough 放在形容詞「後面」：old enough ✓，enough old ✗
💡 too … to 本身就有「不能」的意思，不用再加 not`,
      front: 'The tea is ___ hot ___ drink.\n（茶太燙了，不能喝）',
      back: 'too … to\nThe tea is too hot to drink.',
      quiz: { q: 'She is ___ to drive.（她夠大了，可以開車）', options: ['old enough', 'enough old', 'too old', 'very old'], answer: 0 }
    }
  );
  toItems.splice(after('to-plus-doing'), 0,
    {
      id: 'to-or-doing',
      title: 'stop、remember、try：接 to do 和 doing 意思不同',
      note: `同一個動詞，後面接 to do 或 doing，意思差很多。

① stop
He stopped talking. 他不說話了。（停掉的是「說話」）
He stopped to talk. 他停下來，要說話。（停下別的事，為了說話）

② remember
Remember to lock the door. 記得要鎖門。（還沒做，要去做）
I remember locking the door. 我記得鎖過門了。（已經做了，現在想起來）

③ try
I tried to open the window. 我想辦法要打開窗戶。（努力做，不一定成功）
Try restarting the computer. 試試看重開電腦。（試一個方法，看有沒有用）

👉 口訣：to do 是「還沒做、要去做」；doing 是「本來就在做、已經做過」`,
      front: 'He stopped ___.\n（他停下來，要喝點水）',
      back: 'to drink\nstop to do：停下別的事，去做這件事',
      quiz: { q: 'He stopped ___.（他不說話了）', options: ['talking', 'to talk', 'talk', 'talked'], answer: 0 }
    },
    {
      id: 'to-or-doing-remember',
      front: 'I remember ___ the door.\n（我記得鎖過門了）',
      back: 'locking\nremember doing：記得做過',
      quiz: { q: 'Remember ___ the door.（記得要鎖門）', options: ['to lock', 'locking', 'lock', 'locked'], answer: 0 }
    }
  );
  toItems.splice(after('no-to'), 0,
    {
      id: 'no-to-more',
      title: '不加 to 的補充：had better、would rather、help',
      note: `這幾個後面直接接動詞原形，不加 to。

① had better：最好…
You had better go. 你最好走了。

② would rather：寧願…
I would rather stay. 我寧願留下。

③ help：加不加 to 都可以
Help me carry the box. 幫我搬箱子。
Help me to carry the box. 幫我搬箱子。

【make 改成被動，to 要加回來】
They made Ben wait. 他們讓 Ben 等。
Ben was made to wait. Ben 被要求等。
💡 「被允許」通常用 be allowed to：I was allowed to go. 我被允許去。`,
      front: 'You had better ___.\n（你最好走了）',
      back: 'go\nhad better 後面不加 to',
      quiz: { q: 'I would rather ___.（我寧願留下）', options: ['stay', 'to stay', 'staying', 'stayed'], answer: 0 }
    },
    // 截圖最後一頁的 6 題練習
    ...[
      ['They made me ___ (wait).', ['wait', 'to wait', 'waiting', 'waited'], 'make 後面不加 to'],
      ['I was made ___ (wait).', ['to wait', 'wait', 'waiting', 'waited'], '被動的 be made 後面要加 to'],
      ['It is kind ___ you to help.', ['of', 'for', 'to', 'with'], '評價「人」很體貼，用 of'],
      ['I need a pen to write ___.', ['with', 'on', 'to', 'by'], '用筆寫：write with a pen'],
      ['I look forward to ___ (see) you.', ['seeing', 'see', 'saw', 'seen'], '這裡的 to 是介係詞，後面接 doing'],
      ['I stopped ___ (drink) some water.（停下手邊的事，去喝水）', ['to drink', 'drinking', 'drink', 'drank'], 'stop to do：停下來去做另一件事']
    ].map(([q, options, why], i) => ({
      id: 'to-practice-' + (i + 1),
      front: q,
      back: options[0] + '\n' + why,
      quiz: { q, options, answer: 0 }
    }))
  );
}

// ===================== 第九批（10/23 Claude 以老師角度補充：聊天用的句子和單字） =====================
{
  const card = ([en, zh], key, p) => ({ id: `${p}-${key}-${slug(en)}`, front: zh, back: en, say: en, group: `${p}-${key}` });
  // 💬 生活常用句：聊天真的會用到的句子
  NOTES.find(c => c.id === 'daily').items.push(...buildGroups('dl', [
    ['rescue', '🆘 聽不懂時的救命句', '對話卡住的時候，用這幾句就不怕。初學者最重要的一組！',
      "Sorry, could you say that again?=不好意思，可以再說一次嗎？|Could you speak more slowly?=可以說慢一點嗎？|What does that mean?=那是什麼意思？|How do you spell it?=那個怎麼拼？|I don't understand.=我聽不懂。|Do you mean this one?=你是說這個嗎？|Can you write it down?=可以寫下來嗎？|How do you say this in English?=這個英文怎麼說？|Sorry, my English isn't very good.=抱歉，我的英文不是很好。|Just a moment, please.=請等一下。|Let me think.=讓我想一下。|Could you show me?=可以指給我看嗎？",
      "💡 Sorry? 或 Pardon? 尾音上揚，也可以表示「再說一次？」\n💡 聽不懂很正常，直接問比假裝聽懂好很多"],
    ['react', '💬 接話、回應', '對方說完以後，用這些回應，對話才接得下去。',
      "Really?=真的嗎？|That's great!=太棒了！|I see.=我懂了。|Me too.=我也是。|Me neither.=我也不（否定句的「我也是」）。|Sounds good.=聽起來不錯。|That's too bad.=真可惜／好慘。|No way!=不會吧！|Of course.=當然。|I think so.=我想是吧。|I don't think so.=我不這麼認為。|That makes sense.=有道理。|Good idea!=好主意！|Congratulations!=恭喜！",
      "💡 對方說 I don't like coffee.，你也不喜歡 → 要說 Me neither.，不是 Me too.\n💡 That's too bad. 是同情對方，不是「太壞了」"],
    ['plan', '🗓️ 約時間、邀約', '約朋友、約會、約見面都用得到。',
      "Are you free on Saturday?=你星期六有空嗎？|What are you doing this weekend?=你這個週末要做什麼？|Do you want to grab coffee?=要不要一起喝杯咖啡？|How about 7 p.m.?=晚上七點怎麼樣？|Where should we meet?=我們要在哪裡見面？|Let's meet at the station.=我們在車站見。|I'm free after work.=我下班後有空。|Sorry, I'm busy that day.=抱歉，那天我有事。|Can we change it to Sunday?=可以改成星期天嗎？|See you then!=到時候見！|I'm running late.=我會晚一點到。|I'm on my way.=我在路上了。",
      "💡 grab coffee 是很口語的「喝杯咖啡」，約朋友很常用\n💡 遲到要先傳訊息：I'm running late. Sorry!"],
    ['drink', '🧋 點飲料和特殊需求', '點手搖飲、點餐時的特別要求。',
      "Less sugar, please.=少糖，謝謝。|No sugar, please.=無糖，謝謝。|Less ice, please.=少冰，謝謝。|No ice, please.=去冰，謝謝。|Can I have it hot?=可以做熱的嗎？|Can I get a large?=可以給我大杯嗎？|I'm allergic to peanuts.=我對花生過敏。|I don't eat beef.=我不吃牛肉。|Not too spicy, please.=不要太辣，謝謝。|Can I have the sauce on the side?=醬可以另外放嗎？|Is this vegetarian?=這是素的嗎？|Can I have a bag, please?=可以給我一個袋子嗎？",
      "💡 國外通常沒有「半糖」這種選項，可以說 less sugar（少糖）或 half sugar\n💡 過敏一定要說清楚：I'm allergic to + 食物"],
    ['hobby', '🎨 興趣嗜好', '自我介紹、交朋友時聊興趣。',
      "What do you do for fun?=你平常喜歡做什麼？|What are your hobbies?=你的興趣是什麼？|I'm into hiking.=我很喜歡爬山。|I enjoy cooking.=我喜歡煮飯。|I like watching movies.=我喜歡看電影。|I love traveling.=我很愛旅行。|I play the guitar.=我會彈吉他。|I go to the gym three times a week.=我一週去健身房三次。|I'm learning English.=我在學英文。|I'm not into sports.=我對運動沒什麼興趣。|How about you?=你呢？|We have a lot in common!=我們有好多共同點！",
      "💡 I'm into… 是很口語的「我很迷…」，後面接名詞或 V-ing\n💡 like、enjoy 後面的動作要加 ing：I enjoy cooking.\n💡 樂器前面要加 the：play the guitar；運動不用：play tennis"],
    ['mobile', '📱 手機和網路', '出國、上班、跟朋友聯絡都會用到。',
      "Can I charge my phone here?=我可以在這裡充電嗎？|My phone is dead.=我的手機沒電了。|What's the Wi-Fi password?=Wi-Fi 密碼是什麼？|The Wi-Fi isn't working.=Wi-Fi 不能用。|Can I have your LINE?=可以給我你的 LINE 嗎？|Send me a message.=傳訊息給我。|I'll call you later.=我晚點打給你。|Can you send me the photo?=可以把照片傳給我嗎？|I'll text you the address.=我把地址傳給你。|Let me take a picture.=我拍張照。|Can you take a photo of us?=可以幫我們拍張照嗎？|There's no signal here.=這裡收不到訊號。",
      "💡 My phone is dead. 是「手機沒電」，不是手機壞掉\n💡 text 當動詞是「傳簡訊、傳訊息」：I'll text you."],
    ['taxi', '🚕 交通：計程車、公車、買票', '出國搭車用得到的句子。',
      "Can you take me to this address?=可以載我到這個地址嗎？|How much is it to the airport?=到機場多少錢？|Please stop here.=請停在這裡。|Can I pay by card?=可以刷卡嗎？|Which bus goes to the museum?=哪一班公車到博物館？|Does this bus go downtown?=這班公車有到市中心嗎？|Where can I buy a ticket?=哪裡可以買票？|One ticket to Tokyo, please.=一張到東京的票，謝謝。|A round-trip ticket, please.=一張來回票，謝謝。|What time is the next train?=下一班火車是幾點？|How long does it take?=要多久？|Where do I get off?=我要在哪裡下車？",
      "💡 單程票 one-way ticket；來回票 round-trip ticket\n💡 get on 上車、get off 下車"],
    ['link', '🔗 說話用的連接詞', '把短句連起來，說話就不會一句一句斷掉。',
      "I'm tired because I worked late.=我很累，因為我工作到很晚。|It was raining, so I stayed home.=那時在下雨，所以我待在家。|I like it, but it's too expensive.=我喜歡，但是太貴了。|First, I wash my face. Then, I eat breakfast.=首先我洗臉，然後吃早餐。|Actually, I don't like coffee.=其實我不喜歡咖啡。|By the way, are you free tomorrow?=對了，你明天有空嗎？|For example, I like apples and bananas.=例如，我喜歡蘋果和香蕉。|I want to go, but I'm busy.=我想去，但是我很忙。|After work, I go to the gym.=下班後我去健身房。|Anyway, let's go!=總之，我們走吧！",
      "💡 中文說「因為…所以…」，英文 because 和 so 只能選一個：Because I was tired, I slept. 或 I was tired, so I slept.\n💡 By the way 是要換話題的時候用"]
  ], { card }));
  // ⚡ 常用動詞和形容詞：頻率副詞、個性和外表
  NOTES.find(c => c.id === 'core').items.push(...buildGroups('cw', [
    ['freq', '🔁 頻率副詞：多常做', '說自己的習慣一定會用。順序是 100% → 0%。',
      "always=總是（100%）|usually=通常（90%）|often=常常（70%）|sometimes=有時候（50%）|rarely=很少（10%）|never=從不（0%）|every day=每天|once a week=一週一次|twice a month=一個月兩次|on weekends=週末的時候",
      "💡 頻率副詞放在一般動詞前面、be 動詞後面：I always get up early.／I am always busy.\n💡 例句：I usually take the bus to work. 我通常搭公車上班。\n💡 問頻率：How often do you exercise? 你多常運動？"],
    ['people', '😊 個性和外表', '介紹朋友、描述一個人。',
      "friendly=友善的|kind=善良的|funny=好笑的、幽默的|shy=害羞的|outgoing=外向的|smart=聰明的|patient=有耐心的|lazy=懶惰的|honest=誠實的|tall=高的|short=矮的|slim=苗條的|cute=可愛的|handsome=帥的|pretty=漂亮的|long hair=長頭髮|short hair=短頭髮|glasses=眼鏡",
      "💡 描述外表：She has long hair. 她留長頭髮。He wears glasses. 他戴眼鏡。\n💡 問個性：What is he like? 他是個怎樣的人？（不是問他喜歡什麼）\n💡 fat（胖）不太禮貌，可以說 a little big 或不要提"]
  ], { card }));
}

// ---------- 📅 學習建議：每日小流程（放在文法用語第一則；今日課表的「今日文法」第一天會先讀到這則） ----------
NOTES.find(c => c.id === 'terms').items.unshift({
  id: 'study-routine',
  title: '📅 每日學習小流程（老師建議，先看這則）',
  note: `每天大約 25～30 分鐘。打開「今日」照順序按「開始」就好，不用自己想今天要練什麼。

【每天的順序】
① 卡片複習＋新單字　8 分鐘　詞彙
② 📖 今日文法：讀一則筆記　5 分鐘　文法
③ 📕 錯題抽查 5 題　2 分鐘　補弱點
④ 🎧 聽力 5 題　2 分鐘　聽
⑤ 🧩 句子重組 3 題　2 分鐘　語法
⑥ ⌨️ 看中文打英文 3 題　3 分鐘　自己想出來
⑦ 💬 情境對話一個　5 分鐘　說、交流

【每週的安排】
週一～週五：照上面做
週六：只做「錯題」，把這週的錯題清一清
週日：休息，或看一部有英文字幕的影片

【老師的 3 個提醒】
👉 每天一點，比一次很多有用：寧可每天 15 分鐘，也不要週末一次 2 小時
👉 一定要出聲：卡片、對話的句子都念出來，嘴巴練過才說得出來
👉 答錯是好事：錯的題目會進錯題本，那就是你最需要練的

💡 建議的學習順序：📖 文法用語 → ⭐ 基礎文法 → 💬 生活常用句的「🆘 救命句」「💬 接話回應」→ 其他
💡 「今日文法」會照這個順序，每天自動挑下一則還沒讀過的筆記`
});
