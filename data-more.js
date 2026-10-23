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

// ===================== 🧠 背單字妙招（10/23 使用者想要「有記憶點的口訣」：重點放在字首字尾和諧音，難背的字用聯想和一家人） =====================
// 格式：'英文=中文=口訣／拆法'。卡片正面是中文，背面是英文＋口訣
{
  const AFFIX = { un: 'un-', re: 're-', dis: 'dis-', im: 'im-／in-', pre: 'pre-', er: '-er／-or', ful: '-ful', less: '-less', ly: '-ly', able: '-able',
    mis: 'mis-', over: 'over-', num: 'uni-／bi-／tri-', tion: '-tion', ness: '-ness', ment: '-ment',
    sub: 'sub-', inter: 'inter-', ous: '-ous', ship: '-ship', ist: '-ist', en: '-en', port: 'port', spect: 'spect', vis: 'vis／vid',
    tele: 'tele-', phon: 'phon', aud: 'aud', y: '-y', al: '-al', ive: '-ive',
    dict: 'dict', struct: 'struct', form: 'form', ize: '-ize', ward: '-ward' };
  const card = ([en, zh, hint], key, p) => ({
    id: `${p}-${key}-${slug(en)}`, front: AFFIX[key] ? `${zh}\n（用 ${AFFIX[key]}）` : zh,
    back: en + (hint && hint !== zh ? '\n💡 ' + hint : ''), say: en, group: `${p}-${key}`
  });
  // 使用者想要放在「單字」裡面，不要另外一格，才不用分兩個地方點（10/23）
  const vocab = NOTES.find(c => c.id === 'vocab');
  vocab.desc += '，還有字首字尾、諧音口訣';
  // 使用者覺得小格太多 → 每一組的筆記合併成 6 大格（卡片還是一組一組，id 不變）
  const SECTIONS = [
    ['prefix', '⬅️ 字首：放在前面', 'un re dis im pre mis over num sub inter tele'],
    ['suffix', '➡️ 字尾：放在後面', 'er ist ful less ly able tion ness ment ous ship en y al ive ize ward'],
    ['root', '🧩 字根：單字的核心', 'port spect vis phon aud dict struct form'],
    ['sound', '🎵 諧音口訣', 'loan loan2 sound sound2 sound3'],
    ['link', '💭 聯想、拆字、一家人', 'link link2 family'],
    ['confuse', '🤯 容易搞混、同音字', 'confuse homo homo2']
  ];
  const mergeTricks = items => {
    const cards = items.filter(it => !it.note), notes = items.filter(it => it.note);
    return [...SECTIONS.map(([key, title, groups]) => {
      const gs = groups.split(' ').map(g => notes.find(n => n.id === 'mm-' + g));
      const n = cards.filter(c => gs.some(g => c.group === g.id)).length;
      return {
        id: 'mm-' + key, title: `${title}（${n} 個）`,
        // 每一組一個框框：【標題】、說明、單字表；小提醒接在框框下面
        note: '{{nogrid}}' + gs.map(g => {
          const [intro, rows, tip] = g.note.split('\n\n');
          // 小提醒改成 👉 開頭，才會留在自己那一組的框框裡（💡 開頭的會被搬到別的地方）
          return `【${g.title.replace(/（\d+ 個）$/, '')}】\n${intro}\n${rows}` + (tip ? '\n' + tip.replace(/^💡 ?/gm, '👉 ').replace(/^⚠️ ?/gm, '👉 ⚠️ ') : '');
        }).join('\n\n')
      };
    }), ...cards];
  };
  vocab.items.push(
      {
        id: 'mm-how',
        title: '💡 4 種背單字的方法（先看這則）',
        note: `單字硬背很容易忘，有「記憶點」才記得久。這裡用 4 種方法：

① 拆字首、字尾（最推薦）
學一個字首，就能看懂一大串字。
un- = 不：unhappy 不開心的、unfair 不公平的
-ful = 充滿：careful 小心的、helpful 有幫助的

② 諧音口訣
用中文的發音幫忙記「意思」。
ambulance 救護車 →「俺不能死」

③ 聯想小故事
familiar 熟悉的 → 裡面有 family（家人），跟家人一樣熟

④ 一家人一起背
help 幫助 → helpful 有幫助的 → helpless 無助的 → helper 幫手

⚠️ 諧音只能用來記「意思」，發音一定要按 🔊 聽真人念。中文的音跟英文差很多，照諧音念會念錯
💡 foreign（外國的）可以聯想「門外的」：它真正的字源就是拉丁文的「在門外」。之前說的「foreign 裡面有 reign（統治）」只是拼字剛好像，不是真的字源，用來幫忙記可以，但不要當成規則
💡 背的時候：先看口訣 → 按 🔊 念三次 → 閉上眼睛拼一次`
      },
      ...mergeTricks(buildGroups('mm', [
        ['un', '🚫 un- = 不、相反', '放在形容詞前面 → 「不…的」；放在動詞前面 → 「把動作反過來」。',
          'unhappy=不開心的=un（不）＋ happy（開心）|unfair=不公平的=un（不）＋ fair（公平）|unkind=不友善的=un（不）＋ kind（友善）|unfamiliar=不熟悉的=un（不）＋ familiar（熟悉）|unhealthy=不健康的=un（不）＋ healthy（健康）|unlock=開鎖=un（反過來）＋ lock（鎖上）',
          '💡 un- 是最常見的「不」，看到 un 開頭先猜「不…」'],
        ['re', '🔁 re- = 再一次、回來', '動詞前面加 re-，就是「再做一次」或「回到原本」。',
          'redo=重做=re（再）＋ do（做）|rewrite=重寫=re（再）＋ write（寫）|reread=重讀=re（再）＋ read（讀）|reuse=重複使用=re（再）＋ use（用）|replay=重播=re（再）＋ play（播放）|return=回來、歸還=re（回）＋ turn（轉）',
          '💡 re 念 /ri/，像中文的「瑞」'],
        ['dis', '🙅 dis- = 不、拿掉', '跟 un- 很像，但大多放在動詞前面。',
          'dislike=不喜歡=dis（不）＋ like（喜歡）|disagree=不同意=dis（不）＋ agree（同意）|dishonest=不誠實的=dis（不）＋ honest（誠實）|disappear=消失=dis（不）＋ appear（出現）|disconnect=斷線=dis（不）＋ connect（連接）|discover=發現=dis（拿掉）＋ cover（蓋子）→ 把蓋子掀開就「發現」了',
          '💡 discover 很好記：掀開蓋子，就發現裡面的東西'],
        ['im', '⛔ im-／in- = 不', '也是「不」的意思。p、b、m 開頭的字前面用 im-，其他大多用 in-。',
          'impossible=不可能的=im（不）＋ possible（可能）|impolite=不禮貌的=im（不）＋ polite（禮貌）|impatient=沒耐心的=im（不）＋ patient（有耐心）|incorrect=不正確的=in（不）＋ correct（正確）|informal=非正式的=in（不）＋ formal（正式）|invisible=看不見的=in（不）＋ visible（看得見）',
          '💡 p、b、m 都是要「閉嘴巴」才念得出來的音，所以前面用 im-（m 也要閉嘴）\n⚠️ 不是每個 in 開頭的字都是「不」：inside 是「裡面」、invite 是「邀請」'],
        ['pre', '⏪ pre- = 事先、在…之前', '動作還沒發生之前先做。',
          'preview=預習、預覽=pre（事先）＋ view（看）|prepay=預付=pre（事先）＋ pay（付錢）|preheat=預熱=pre（事先）＋ heat（加熱）|preschool=幼兒園=pre（之前）＋ school（學校）→ 上小學之前|predict=預測=pre（事先）＋ dict（說）→ 事先說出來|prefix=字首=pre（前面）＋ fix（固定）→ 固定在前面的',
          '💡 prefix 這個字本身就是「字首」，un-、re-、pre- 都是 prefix'],
        ['er', '👩‍🏫 -er／-or = 做這件事的人', '動詞後面加 -er，就變成「做這件事的人」。',
          'teacher=老師=teach（教）＋ er → 教書的人|driver=司機=drive（開車）＋ r → 開車的人|singer=歌手=sing（唱）＋ er → 唱歌的人|player=球員、玩家=play（玩）＋ er|actor=演員=act（演）＋ or|visitor=訪客=visit（拜訪）＋ or',
          '💡 字尾已經有 e 的，只加 r：drive → driver、write → writer\n💡 -or 比較少，常見的有 actor、visitor、doctor、sailor，遇到就記起來'],
        ['ful', '😊 -ful = 充滿…的', '名詞後面加 -ful，變成形容詞「充滿…的」。',
          'careful=小心的=care（小心）＋ ful → 充滿小心|helpful=有幫助的=help（幫助）＋ ful|useful=有用的=use（用處）＋ ful|beautiful=美麗的=beauty（美）＋ ful，y 變 i|colorful=色彩繽紛的=color（顏色）＋ ful|painful=疼痛的=pain（痛）＋ ful',
          '💡 full（滿的）有兩個 l，當字尾 -ful 只有一個 l\n💡 -ful 和 -less 常常是一對：careful 小心 ↔ careless 粗心'],
        ['less', '🕳️ -less = 沒有…的', '名詞後面加 -less，變成「沒有…的」，剛好跟 -ful 相反。',
          'careless=粗心的=care（小心）＋ less（沒有）|useless=沒用的=use（用處）＋ less|homeless=無家可歸的=home（家）＋ less|endless=沒完沒了的=end（結束）＋ less|helpless=無助的=help（幫助）＋ less|hopeless=沒希望的=hope（希望）＋ less',
          '💡 less 本身就是「比較少」的意思，所以 -less 是「沒有」'],
        ['ly', '🏃 -ly = 變副詞（…地）', '形容詞後面加 -ly，就變成副詞，用來形容「怎麼做」。',
          'quickly=快速地=quick（快）＋ ly|slowly=慢慢地=slow（慢）＋ ly|happily=開心地=happy（開心）＋ ly，y 變 i|carefully=小心地=careful（小心的）＋ ly|easily=容易地=easy（容易）＋ ly，y 變 i|friendly=友善的=friend（朋友）＋ ly → 像朋友一樣的',
          '⚠️ friendly 是形容詞（友善的），不是副詞！名詞＋ly 會變形容詞：friendly、lovely 可愛的、weekly 每週的\n💡 例句：She speaks slowly. 她說話很慢。'],
        ['able', '👍 -able = 可以…的', '動詞後面加 -able，變成「可以被…的」。',
          'washable=可以洗的=wash（洗）＋ able|drinkable=可以喝的=drink（喝）＋ able|readable=好讀的=read（讀）＋ able|enjoyable=令人愉快的=enjoy（享受）＋ able|comfortable=舒服的=comfort（舒適）＋ able|reusable=可以重複用的=re（再）＋ use（用）＋ able → 一次用了兩個',
          '💡 able 本身就是「能夠」：I am able to swim. 我會游泳。\n💡 comfortable 念 /ˈkʌmftəbl/，中間的 or 幾乎不念，按 🔊 聽聽看'],
        ['mis', '❌ mis- = 錯誤地', '動詞前面加 mis-，就是「做錯了」。',
          'misunderstand=誤會=mis（錯）＋ understand（了解）|mistake=錯誤=mis（錯）＋ take（拿）→ 拿錯了|misspell=拼錯=mis（錯）＋ spell（拼字）|misuse=誤用=mis（錯）＋ use（用）|mislead=誤導=mis（錯）＋ lead（帶領）→ 帶錯路|misplace=放錯地方=mis（錯）＋ place（放）',
          '💡 misspell 有兩個 s：mis ＋ spell，兩個字直接黏起來\n💡 例句：Sorry, I misunderstood you. 抱歉，我誤會你了。'],
        ['over', '⬆️ over- = 太多、超過', '動詞或名詞前面加 over-，就是「超過、太多」。',
          'oversleep=睡過頭=over（超過）＋ sleep（睡）|overeat=吃太多=over（太多）＋ eat（吃）|overwork=工作過度=over（太多）＋ work（工作）|overtime=加班=over（超過）＋ time（時間）→ 超過下班時間|overweight=過重的=over（超過）＋ weight（重量）|overseas=海外的=over（越過）＋ seas（海）→ 越過大海',
          '💡 over 本身是「在…上方、越過」，所以 over- 是「超過」\n💡 例句：I overslept this morning. 我今天早上睡過頭了。'],
        ['num', '🔢 uni- = 1、bi- = 2、tri- = 3', '數字字首，看到就知道「有幾個」。',
          'unicorn=獨角獸=uni（1）＋ corn（角）→ 一隻角|uniform=制服=uni（1）＋ form（樣子）→ 大家同一個樣子|bicycle=腳踏車=bi（2）＋ cycle（輪子）→ 兩個輪子|bilingual=雙語的=bi（2）＋ lingual（語言的）|triangle=三角形=tri（3）＋ angle（角）|tricycle=三輪車=tri（3）＋ cycle（輪子）',
          '💡 bike 就是 bicycle 的簡稱\n💡 一個字學會，其他就猜得到：bicycle 兩輪 → tricycle 三輪'],
        ['tion', '📦 -tion = 變名詞（動作 → 事情）', '動詞後面加 -tion（或 -ation），就變成名詞。',
          'action=行動=act（行動）＋ ion|invitation=邀請（函）=invite（邀請）＋ ation，去掉 e|information=資訊=inform（通知）＋ ation|education=教育=educate（教育）＋ ion，去掉 e|celebration=慶祝=celebrate（慶祝）＋ ion，去掉 e|collection=收藏=collect（收集）＋ ion',
          '💡 -tion 念 /ʃən/，像中文的「訓」：action 念「艾克訓」\n💡 重音通常在 -tion 前面那一節：inforMAtion、eduCAtion'],
        ['ness', '💗 -ness = 變名詞（形容詞 → 狀態）', '形容詞後面加 -ness，就變成名詞「…的狀態」。',
          'happiness=幸福=happy（開心）＋ ness，y 變 i|kindness=善良、好意=kind（善良）＋ ness|sadness=悲傷=sad（難過）＋ ness|darkness=黑暗=dark（暗）＋ ness|illness=疾病=ill（生病）＋ ness|weakness=弱點=weak（弱）＋ ness',
          '💡 例句：Thank you for your kindness. 謝謝你的好意。'],
        ['ment', '📄 -ment = 變名詞（動作 → 結果）', '動詞後面加 -ment，就變成名詞。',
          'movement=動作=move（移動）＋ ment|payment=付款=pay（付錢）＋ ment|agreement=同意、協議=agree（同意）＋ ment|enjoyment=樂趣=enjoy（享受）＋ ment|government=政府=govern（治理）＋ ment|treatment=治療=treat（對待、治療）＋ ment',
          '💡 government 中間有 n，很多人會漏掉：govern ＋ ment\n💡 -tion、-ness、-ment 看到這三個字尾，就知道是名詞'],
        ['sub', '⬇️ sub- = 下面、次一等', '放在字前面，表示「在下面」或「附屬的」。',
          'subway=地鐵=sub（下面）＋ way（路）→ 地下的路|submarine=潛水艇=sub（下面）＋ marine（海的）→ 在海面下|subtitle=字幕=sub（下面）＋ title（標題）→ 畫面下面的字|subzero=零下的=sub（下面）＋ zero（零）|subtotal=小計=sub（次一等）＋ total（總計）|suburb=郊區=sub（附近）＋ urb（城市）→ 城市旁邊',
          '💡 美國說 subway，英國說 underground 或 the Tube\n💡 看影片開字幕：Turn on the subtitles.'],
        ['inter', '🔗 inter- = 在…之間、互相', '放在字前面，表示「在兩者之間」或「互相」。',
          'international=國際的=inter（之間）＋ national（國家的）→ 國家和國家之間|internet=網際網路=inter（之間）＋ net（網）|interview=面試、採訪=inter（互相）＋ view（看）→ 面對面互相看|interact=互動=inter（互相）＋ act（行動）|interchange=交流道=inter（互相）＋ change（交換）|intersection=十字路口=inter（之間）＋ section（區塊）',
          '💡 interview 念 /ˈɪntərvjuː/，重音在前面\n💡 例句：I have a job interview tomorrow. 我明天有工作面試。'],
        ['ous', '✨ -ous = 變形容詞（充滿…的）', '名詞後面加 -ous，就變成形容詞。',
          'dangerous=危險的=danger（危險）＋ ous|famous=有名的=fame（名聲）＋ ous，去掉 e|nervous=緊張的=nerve（神經）＋ ous，去掉 e → 神經繃很緊|humorous=幽默的=humor（幽默）＋ ous|adventurous=愛冒險的=adventure（冒險）＋ ous，去掉 e|poisonous=有毒的=poison（毒）＋ ous',
          '💡 -ous 念 /əs/，像中文的「餓斯」，很輕\n💡 delicious（好吃的）、jealous（忌妒的）也是 -ous 結尾的形容詞'],
        ['ship', '🤝 -ship = 關係、身分', '名詞後面加 -ship，變成「…的關係、資格」。',
          'friendship=友誼=friend（朋友）＋ ship|relationship=關係、感情=relation（關係）＋ ship|membership=會員資格=member（會員）＋ ship|leadership=領導能力=leader（領導者）＋ ship|championship=冠軍賽=champion（冠軍）＋ ship|citizenship=公民身分、國籍=citizen（公民）＋ ship',
          '⚠️ ship 單獨是「船」，但當字尾 -ship 跟船沒關係\n💡 in a relationship 是「有交往對象」：Are you in a relationship? 你有在交往嗎？'],
        ['ist', '🎨 -ist = 專門做…的人', '跟 -er 一樣是「人」，但常是專業、專家。',
          'artist=藝術家=art（藝術）＋ ist|pianist=鋼琴家=piano（鋼琴）＋ ist，去掉 o|scientist=科學家=science（科學）＋ ist|tourist=觀光客=tour（旅遊）＋ ist|dentist=牙醫=dent（牙齒，拉丁文）＋ ist|guitarist=吉他手=guitar（吉他）＋ ist',
          '💡 dent 是拉丁文的「牙齒」，所以 dental 是「牙齒的」：dental clinic 牙科診所\n💡 -er 和 -ist 都是人：singer 歌手、pianist 鋼琴家'],
        ['en', '🔧 -en = 讓…變得', '形容詞後面加 -en，變成動詞「使變得…」。',
          'shorten=縮短=short（短）＋ en|sharpen=削尖、磨利=sharp（尖）＋ en|darken=變暗=dark（暗）＋ en|weaken=變弱=weak（弱）＋ en|soften=變軟=soft（軟）＋ en，t 不發音|fasten=繫緊=fast（牢固）＋ en，t 不發音',
          '💡 搭飛機一定會聽到：Please fasten your seatbelt. 請繫好安全帶。\n💡 fasten、soften 的 t 都不念：/ˈfæsn/、/ˈsɔːfn/'],
        ['port', '📦 字根 port = 搬、帶', '字根是一個字的「核心」，前後再加字首、字尾。port 就是「搬東西」。',
          'transport=運輸=trans（從這到那）＋ port（搬）|import=進口=im（進來）＋ port（搬）|export=出口=ex（出去）＋ port（搬）|report=報告=re（回來）＋ port（帶）→ 把消息帶回來|portable=可攜帶的=port（搬）＋ able（可以）|porter=搬運工、行李員=port（搬）＋ er（人）',
          '⚠️ airport、passport 的 port 是「港口」，是另一個意思\n💡 import ↔ export 是一對：im 進來、ex 出去（exit 出口也是 ex）'],
        ['spect', '👀 字根 spect = 看', 'spect 就是「看」，加上不同字首，看的方式就不一樣。',
          'inspect=檢查=in（往裡面）＋ spect（看）|respect=尊敬=re（再）＋ spect（看）→ 值得再看一眼|expect=期待=ex（往外）＋ spect（看）→ 往外看，等著|spectator=觀眾=spect（看）＋ ator（人）|suspect=懷疑=su（下面）＋ spect（看）→ 從下面偷偷看|spectacular=壯觀的=spect（看）→ 很值得看的',
          '💡 expect 少了 s：ex ＋ spect 黏在一起時，s 合併了'],
        ['vis', '👁️ 字根 vis／vid = 看', '另一個「看」的字根，在很多常用字裡。',
          'visit=拜訪、參觀=vis（看）→ 去看人、看地方|vision=視力=vis（看）＋ ion|visible=看得見的=vis（看）＋ ible（可以）|video=影片=vid（看）|television=電視=tele（遠）＋ vision（看）→ 看到遠方的東西|revise=修改=re（再）＋ vise（看）→ 再看一次',
          '💡 tele = 遠：telephone 電話（遠方的聲音）、telescope 望遠鏡\n💡 invisible 隱形的 = in（不）＋ visible（看得見）'],
        ['tele', '📡 tele- = 遠', '放在字前面，表示「很遠的地方」。',
          'telephone=電話=tele（遠）＋ phone（聲音）→ 聽到遠方的聲音|television=電視=tele（遠）＋ vision（看）→ 看到遠方的畫面|telescope=望遠鏡=tele（遠）＋ scope（看的工具）|telegram=電報=tele（遠）＋ gram（寫下來的）→ 傳到遠方的字|teleport=瞬間移動=tele（遠）＋ port（搬）→ 一下子搬到遠方',
          '💡 TV 就是 television 的簡稱\n💡 teleport 的 port 就是前面學過的字根「搬」'],
        ['phon', '🎧 字根 phon = 聲音', 'phone 不只是「電話」，它的字根意思是「聲音」。',
          'microphone=麥克風=micro（小）＋ phone（聲音）→ 把小聲音變大|headphones=頭戴式耳機=head（頭）＋ phones（聲音）|earphones=耳機=ear（耳朵）＋ phones（聲音）|smartphone=智慧型手機=smart（聰明）＋ phone|phonics=自然發音法=phon（聲音）＋ ics（學問）→ 看字母就會念|saxophone=薩克斯風=Sax（發明的人）＋ phone（聲音）',
          '💡 ph 念 /f/，跟 f 一樣：phone 念「佛恩」\n💡 耳機常用複數：headphones、earphones（因為有兩邊）'],
        ['aud', '👂 字根 aud = 聽', 'aud 就是「聽」，跟聲音有關的字很多。',
          'audio=聲音、音訊=aud（聽）|audience=觀眾、聽眾=aud（聽）＋ ience → 來聽的人|audition=試鏡、試唱=aud（聽）＋ ition → 唱給評審聽|audible=聽得見的=aud（聽）＋ ible（可以）|audiobook=有聲書=audio（聲音）＋ book（書）|auditorium=禮堂=aud（聽）＋ orium（地方）→ 大家聽演講的地方',
          '💡 visible 看得見的 ↔ audible 聽得見的，一起記\n💡 aud 念 /ɔːd/，像中文的「喔的」'],
        ['y', '☀️ -y = 變形容詞', '名詞後面加 -y，就變成形容詞「有…的、…多的」。',
          'lucky=幸運的=luck（運氣）＋ y|noisy=吵鬧的=noise（噪音）＋ y，去掉 e|salty=鹹的=salt（鹽）＋ y|sleepy=想睡的=sleep（睡覺）＋ y|healthy=健康的=health（健康）＋ y|dirty=髒的=dirt（泥土）＋ y → 都是泥土',
          '💡 天氣也一樣：sun → sunny（中間多一個 n）、rain → rainy、cloud → cloudy\n💡 例句：I feel sleepy. 我好想睡。'],
        ['al', '🌿 -al = 變形容詞（…的）', '名詞後面加 -al，就變成形容詞。',
          'natural=自然的=nature（自然）＋ al，去掉 e|musical=音樂的=music（音樂）＋ al|national=國家的=nation（國家）＋ al|personal=個人的=person（人）＋ al|traditional=傳統的=tradition（傳統）＋ al|cultural=文化的=culture（文化）＋ al，去掉 e',
          '💡 national 和 international 是一家人：inter（之間）＋ national\n💡 例句：That is my personal opinion. 那是我個人的看法。'],
        ['ive', '🔥 -ive = 變形容詞（有…性質的）', '動詞後面加 -ive，就變成形容詞。',
          'active=活躍的=act（行動）＋ ive|creative=有創意的=create（創造）＋ ive，去掉 e|expensive=貴的=expense（花費）＋ ive，去掉 e|attractive=有吸引力的=attract（吸引）＋ ive|talkative=愛說話的=talk（說話）＋ ative|protective=保護的=protect（保護）＋ ive',
          '💡 -ive 念 /ɪv/，像中文的「一夫」，很輕\n💡 expensive 貴的 ↔ cheap 便宜的'],
        ['dict', '🗣️ 字根 dict = 說', 'dict 就是「說」，跟說話、文字有關。',
          'dictionary=字典=dict（說）＋ ion ＋ ary → 收集所有說法的書|dictation=聽寫=dict（說）＋ ation → 老師說、你寫|prediction=預測（名詞）=pre（事先）＋ dict（說）＋ ion|contradict=反駁、矛盾=contra（相反）＋ dict（說）→ 說相反的話|verdict=判決=ver（真的）＋ dict（說）→ 說出真相',
          '💡 predict（動詞）→ prediction（名詞），加 -ion 變名詞'],
        ['struct', '🏗️ 字根 struct = 建造', 'struct 就是「蓋、建造」。',
          'structure=結構=struct（建造）＋ ure → 蓋起來的樣子|construct=建造=con（一起）＋ struct（建造）|construction=工程、建設=construct（建造）＋ ion|instruct=指導=in（進去）＋ struct（建造）→ 把知識蓋進腦袋|instruction=說明、指示=instruct（指導）＋ ion',
          '💡 工地常看到：Under construction 施工中\n💡 說明書：instructions（常用複數）'],
        ['form', '🔷 字根 form = 形狀', 'form 就是「形狀、樣子」。',
          'transform=變形=trans（改變）＋ form（形狀）|inform=通知=in（進去）＋ form（形狀）→ 把消息放進你腦中|format=格式=form（形狀）＋ at|formal=正式的=form（形狀）＋ al → 有固定樣子的|reform=改革=re（再）＋ form（形狀）→ 重新塑造',
          '💡 form 單獨用也是「表格」：fill in the form 填表格\n💡 formal 正式的 ↔ informal 非正式的'],
        ['ize', '⚙️ -ize = 使…化（變動詞）', '名詞或形容詞後面加 -ize，就變成動詞。',
          'memorize=背起來=memory（記憶）＋ ize → 放進記憶|realize=了解到、發覺=real（真的）＋ ize → 發現是真的|apologize=道歉=apology（道歉，名詞）＋ ize|organize=整理、籌辦=organ（組織）＋ ize|modernize=現代化=modern（現代的）＋ ize',
          '💡 英式拼法常寫成 -ise：realise、organise，意思一樣\n💡 背單字就是 memorize words！'],
        ['ward', '🧭 -ward = 往…方向', '加在方向字後面，表示「往…」。',
          'forward=向前=for（前）＋ ward|backward=向後=back（後）＋ ward|upward=向上=up（上）＋ ward|downward=向下=down（下）＋ ward|toward=朝向=to（到）＋ ward|homeward=回家的=home（家）＋ ward',
          '💡 寫信常用：I look forward to seeing you. 期待見到你（to 後面加 V-ing）\n💡 英式常寫 towards、backwards，加 s 也對'],
        ['loan', '🎵 諧音①：中文本來就是照發音翻的', '這些字的中文就是音譯，念出來幾乎一樣，最好記！',
          'sofa=沙發=沙發 → 發音幾乎一樣|humor=幽默=幽默|logic=邏輯=邏輯|guitar=吉他=吉他|salad=沙拉=沙拉|pudding=布丁=布丁|toast=吐司=吐司|cartoon=卡通=卡通|engine=引擎=引擎|hacker=駭客=駭客',
          '💡 生活中還有很多：bus 巴士、taxi 的士、cool 酷、typhoon 颱風（這個是英文跟中文借的）'],
        ['sound', '🎵 諧音②：中文口訣', '用好笑的中文句子記意思，越好笑越記得住。',
          'ambulance=救護車=俺不能死 → 快叫救護車|pest=害蟲=拍死它|agony=極大的痛苦=愛過你 → 愛過才知道有多痛|economy=經濟=依靠農民 → 經濟要靠農民|strong=強壯的=死壯 → 壯到不行|flee=逃走=飛離 → 飛快地離開|coward=膽小鬼=靠我的 → 什麼都要靠我|bachelor=單身漢=白吃了 → 單身漢常常白吃白喝|candidate=候選人=看的累 → 候選人那麼多，看得好累|sting=螫、刺=死盯 → 蜜蜂死盯著你，然後螫你',
          '⚠️ 諧音只用來記「意思」！真正的發音一定要按 🔊 聽，照中文念會念錯\n💡 自己編的口訣最好記，想到好笑的可以寫在本子上'],
        ['link', '💭 聯想和拆字：難背的字', '有些字可以拆開，或用一個小故事記，拼字也不容易錯。',
          'familiar=熟悉的=裡面有 family（家人）→ 跟家人一樣熟|foreign=外國的=字源是「在門外」→ 門外來的，就是外國的|breakfast=早餐=break（打破）＋ fast（禁食）→ 睡一整晚沒吃，早餐把它打破|pineapple=鳳梨=pine（松樹）＋ apple（蘋果）→ 長得像松果的水果|butterfly=蝴蝶=butter（奶油）＋ fly（飛）→ 奶油色的會飛的蟲|eager=渴望的=像 eagle（老鷹）→ 老鷹渴望地盯著獵物|island=島=is ＋ land（陸地）→ 島也是陸地，s 不發音|Wednesday=星期三=拆成 Wed-nes-day 記拼字，念的時候是 /ˈwenzdeɪ/|friend=朋友=fri ＋ end → a friend to the end 朋友到最後都在|believe=相信=中間藏著 lie（謊言）→ 不要相信謊言|piece=一片=開頭藏著 pie（派）→ a piece of pie 一片派',
          '💡 拆字最大的好處是「拼字不會錯」：friend 不會拼成 freind，因為 end 要在最後\n💡 一家人一起背：help → helpful → helpless → helper；care → careful → careless → carefully'],
        ['loan2', '🎵 諧音③：音譯字第二組', '吃的、玩的，很多都是照英文發音翻的。',
          'microphone=麥克風=麥克風|radar=雷達=雷達|lemon=檸檬=檸檬|mango=芒果=芒果|golf=高爾夫=高爾夫|yoga=瑜伽=瑜伽|marathon=馬拉松=馬拉松|cheese=起司=起司|chocolate=巧克力=巧克力|poker=撲克牌=撲克',
          '💡 mic 是 microphone 的簡稱，念 /maɪk/「麥克」'],
        ['sound2', '🎵 諧音④：老師編的口訣', '這組是老師自己編的，越好笑越好記。',
          'hurry=匆忙=哈利 → 哈利快點，要遲到了！|lazy=懶惰的=累死 → 懶人一動就喊累死|honey=蜂蜜、親愛的=哈尼 → 甜得像蜂蜜的哈尼|money=錢=媽你 → 媽，你可以給我錢嗎？|tease=取笑、捉弄=踢死 → 再取笑我就踢死你|sigh=嘆氣=賽 → 今天好賽，嘆一口氣|doubt=懷疑=到底 → 到底是不是真的？好懷疑|mood=心情=木的 → 心情不好，整個人木木的|shy=害羞的=帥 → 長太帥被大家看，好害羞|admire=欽佩、欣賞=愛的媽 → 最欣賞愛我的媽媽',
          '⚠️ 諧音只用來記「意思」！真正的發音一定要按 🔊 聽\n💡 doubt 的 b 不發音，念 /daʊt/'],
        ['link2', '💭 聯想和拆字②', '把長的字拆成認識的短字，意思和拼字一起記住。',
          'hear=聽=h ＋ ear（耳朵）→ 用耳朵聽|heart=心=藏著 ear（耳朵）→ 用心聽|together=一起=to ＋ get ＋ her → 去找她一起|airport=機場=air（空中）＋ port（港口）→ 空中的港口|passport=護照=pass（通過）＋ port（港口）→ 通過港口要用的|popcorn=爆米花=pop（砰！）＋ corn（玉米）→ 砰一聲爆開的玉米|rainbow=彩虹=rain（雨）＋ bow（弓）→ 下完雨出現的弓|strawberry=草莓=straw（稻草）＋ berry（莓果）|dessert=甜點=有兩個 s → 甜點想吃兩份|knowledge=知識=know（知道）＋ ledge → 知道的東西就是知識',
          '⚠️ dessert（甜點，兩個 s）和 desert（沙漠，一個 s）很容易搞混：沙漠很乾，只有一個 s\n💡 knowledge 的 k 不發音，念 /ˈnɑːlɪdʒ/'],
        ['family', '👨‍👩‍👧 一家人一起背', '同一個字的「家人」一起記，名詞、動詞、形容詞一次學會。',
          'success=成功（名詞）=一家人：succeed 成功（動詞）、successful 成功的|decide=決定（動詞）=一家人：decision 決定（名詞）|choose=選擇（動詞）=一家人：choice 選擇（名詞）|beauty=美（名詞）=一家人：beautiful 美麗的、beautifully 美麗地|health=健康（名詞）=一家人：healthy 健康的|danger=危險（名詞）=一家人：dangerous 危險的|friend=朋友=一家人：friendly 友善的、friendship 友誼|music=音樂=一家人：musician 音樂家、musical 音樂的',
          '💡 背一個字的時候，順便查它的「家人」，等於一次背 2～3 個字\n💡 字尾看詞性：-ful、-ous、-y 是形容詞；-tion、-ness、-ment、-ship 是名詞'],
        ['confuse', '🤯 長得很像、很容易搞混的字', '兩兩一對，用小口訣分清楚。',
          'quiet=安靜的=qui-et 兩個音節，念得比較長、慢慢的，很安靜|quite=相當、很=一個音節，很快就念完，結尾是 te|lose=失去、輸=只有一個 o → 輸掉了一個 o|loose=鬆的=兩個 o → 太鬆了，多出一個 o|advice=建議（名詞）=c 是名詞：give me some advice|advise=建議（動詞）=s 是動詞：I advise you to rest.|borrow=（跟別人）借=借進來：Can I borrow your pen?|lend=借給（別人）=借出去：Can you lend me your pen?|then=然後、那時=e 跟時間有關：and then 然後|than=比=thAn 和 compAre（比較）都有 a：taller than me',
          '💡 lose 念 /luːz/（尾音像 z），loose 念 /luːs/（尾音像 s），按 🔊 比較看看\n💡 borrow 是「拿進來」，lend 是「給出去」，方向相反'],
        ['homo', '👯 發音一樣、拼法不同的字', '這些字念起來完全一樣，聽的時候要看前後文，寫的時候要記拼法。',
          'meet=見面=兩個 e 像兩個人面對面|meat=肉=裡面藏著 eat（吃）→ 肉是拿來吃的|see=看=兩個 e 像兩隻眼睛|sea=海=sea 的 a 像海浪|week=一週=跟 weekend（週末）一起記|weak=虛弱的=跟 weakness（弱點）一起記|write=寫=w 不發音：write a letter 寫信|right=對的、右邊=gh 不發音：turn right 右轉|flower=花=裡面有 low（低）→ 花長得低低的|flour=麵粉=裡面有 our（我們的）→ 我們的麵粉拿來做麵包',
          '💡 聽到 /miːt/，要看前後文：Nice to meet you. 是見面；I don\'t eat meat. 是肉\n💡 還有：hear 聽／here 這裡、their 他們的／there 那裡'],
        ['sound3', '🎵 諧音⑤：生活小字口訣', '老師編的第二組，都是生活中很常用的字。',
          'busy=忙的=逼死 → 忙到快被逼死|cheap=便宜的=氣噗 → 賣這麼便宜，老闆氣噗噗|tip=小費=貼 → 貼一點小費給服務生|sour=酸的=餿 → 餿掉的東西是酸的|bite=咬=拜 → 拜託不要咬我|cry=哭=快 → 快哭了|cough=咳嗽=咳夫 → 一直咳|lie=說謊=賴 → 說謊又賴皮|sweat=汗=水的 → 流汗流得都是水',
          '⚠️ 諧音只用來記「意思」！真正的發音一定要按 🔊 聽\n💡 cough 的 gh 念 /f/，跟 laugh（笑）一樣'],
        ['homo2', '👯 發音一樣的字②', '再一組念起來一樣的字，寫作文最容易寫錯。',
          'hear=聽=裡面有 ear（耳朵）|here=這裡=跟 there、where 一家人，都是地點|their=他們的=有 i，像「人」→ 屬於人的|there=那裡=裡面藏著 here（這裡）→ 也是地點|son=兒子=o 跟 boy 的 o 一樣|sun=太陽=跟 sunny（晴天）一起記|buy=買=有 u → you buy 你買|by=搭、透過=最短的那個：by bus 搭公車|eight=八=gh 不發音|ate=吃了=eat 的過去式：I ate lunch.',
          '💡 there、their、they\'re 三個都念 /ðer/：There is a cat. 那裡有貓／their cat 他們的貓／They\'re happy. 他們很開心']
      ], { card }))
  );
}

// ---------- 🔤 長單字拆音節（10/23 使用者想要：3 個音節以上的字用橫線拆開）----------
// 一個一個手寫，不用程式猜。顯示在「單字」筆記英文後面（括號裡）和卡片背面第二行
{
  const SYL = Object.fromEntries(('January=Jan-u-ar-y|February=Feb-ru-ar-y|September=Sep-tem-ber|October=Oc-to-ber|November=No-vem-ber|December=De-cem-ber|Saturday=Sat-ur-day|' +
    'afternoon=af-ter-noon|yesterday=yes-ter-day|tomorrow=to-mor-row|family=fam-i-ly|together=to-geth-er|' +
    'abdomen=ab-do-men|accountant=ac-count-ant|adventurous=ad-ven-tur-ous|agony=ag-o-ny|agreement=a-gree-ment|ambulance=am-bu-lance|announcer=an-nounc-er|apartment=a-part-ment|apologize=a-pol-o-gize|apricot=a-pri-cot|archery=arch-er-y|asparagus=as-par-a-gus|assistant=as-sis-tant|astronaut=as-tro-naut|atmosphere=at-mo-sphere|attendant=at-tend-ant|attorney=at-tor-ney|attractive=at-trac-tive|' +
    'audio=au-di-o|audible=au-di-ble|audiobook=au-di-o-book|audition=au-di-tion|auditorium=au-di-to-ri-um|' +
    'bachelor=bach-e-lor|badminton=bad-min-ton|balcony=bal-co-ny|banana=ba-nan-a|basketball=bas-ket-ball|beautiful=beau-ti-ful|beverage=bev-er-age|bicycle=bi-cy-cle|bilingual=bi-lin-gual|broccoli=broc-co-li|bulldozer=bull-doz-er|businessperson=busi-ness-per-son|butterfly=but-ter-fly|' +
    'cabinet=cab-i-net|camellia=ca-mel-li-a|candidate=can-di-date|capsicum=cap-si-cum|carefully=care-ful-ly|carnation=car-na-tion|cauliflower=cau-li-flow-er|celebration=cel-e-bra-tion|celery=cel-er-y|championship=cham-pi-on-ship|chocolate=choc-o-late|cinema=cin-e-ma|citizenship=cit-i-zen-ship|coconut=co-co-nut|collection=col-lec-tion|colorful=col-or-ful|comfortable=com-fort-a-ble|computer=com-put-er|construction=con-struc-tion|contradict=con-tra-dict|convenience=con-ve-nience|creative=cre-a-tive|cucumber=cu-cum-ber|cultural=cul-tur-al|' +
    'dangerous=dan-ger-ous|detective=de-tec-tive|dictation=dic-ta-tion|dictionary=dic-tion-ar-y|director=di-rec-tor|disagree=dis-a-gree|disappear=dis-ap-pear|disconnect=dis-con-nect|discover=dis-cov-er|dishonest=dis-hon-est|drinkable=drink-a-ble|' +
    'easily=eas-i-ly|economy=e-con-o-my|editor=ed-i-tor|education=ed-u-ca-tion|elephant=el-e-phant|elevator=el-e-va-tor|engineer=en-gi-neer|enjoyable=en-joy-a-ble|enjoyment=en-joy-ment|expensive=ex-pen-sive|explorer=ex-plor-er|' +
    'familiar=fa-mil-iar|firefighter=fire-fight-er|fisherman=fish-er-man|gallery=gal-ler-y|geography=ge-og-ra-phy|government=gov-ern-ment|granddaughter=grand-daugh-ter|grandfather=grand-fa-ther|grandmother=grand-moth-er|guitarist=gui-tar-ist|gymnastics=gym-nas-tics|' +
    'hairdresser=hair-dress-er|hamburger=ham-burg-er|happily=hap-pi-ly|happiness=hap-pi-ness|hazelnut=ha-zel-nut|headteacher=head-teach-er|helicopter=hel-i-cop-ter|history=his-to-ry|horizontal=hor-i-zon-tal|hospital=hos-pi-tal|humidity=hu-mid-i-ty|humorous=hu-mor-ous|hurricane=hur-ri-cane|hydrangea=hy-dran-gea|' +
    'impatient=im-pa-tient|impolite=im-po-lite|impossible=im-pos-si-ble|incorrect=in-cor-rect|informal=in-for-mal|information=in-for-ma-tion|institute=in-sti-tute|instruction=in-struc-tion|interact=in-ter-act|interchange=in-ter-change|international=in-ter-na-tion-al|internet=in-ter-net|intersection=in-ter-sec-tion|interview=in-ter-view|invisible=in-vis-i-ble|invitation=in-vi-ta-tion|' +
    'javelin=jav-e-lin|journalist=jour-nal-ist|kangaroo=kan-ga-roo|kindergarten=kin-der-gar-ten|lavender=lav-en-der|leadership=lead-er-ship|lemonade=lem-on-ade|library=li-brar-y|' +
    'marathon=mar-a-thon|membership=mem-ber-ship|memorize=mem-o-rize|microphone=mi-cro-phone|misunderstand=mis-un-der-stand|modernize=mod-ern-ize|motorcycle=mo-tor-cy-cle|mulberry=mul-ber-ry|museum=mu-se-um|musical=mu-si-cal|musician=mu-si-cian|' +
    'narcissus=nar-cis-sus|national=na-tion-al|natural=nat-u-ral|officer=of-fi-cer|organize=or-ga-nize|overcast=o-ver-cast|overeat=o-ver-eat|overseas=o-ver-seas|oversleep=o-ver-sleep|overtime=o-ver-time|overweight=o-ver-weight|overwork=o-ver-work|' +
    'pajamas=pa-ja-mas|parallel=par-al-lel|peony=pe-o-ny|persimmon=per-sim-mon|personal=per-son-al|pharmacy=phar-ma-cy|pianist=pi-an-ist|pineapple=pine-ap-ple|poisonous=poi-son-ous|policeman=po-lice-man|portable=port-a-ble|potato=po-ta-to|prediction=pre-dic-tion|professor=pro-fes-sor|protective=pro-tec-tive|' +
    'readable=read-a-ble|realize=re-al-ize|refrigerator=re-frig-er-a-tor|relationship=re-la-tion-ship|reporter=re-port-er|researcher=re-search-er|restaurant=res-tau-rant|reusable=re-us-a-ble|' +
    'salami=sa-la-mi|salesperson=sales-per-son|sandpaper=sand-pa-per|saxophone=sax-o-phone|screwdriver=screw-driv-er|secretary=sec-re-tar-y|skateboarding=skate-board-ing|spectacular=spec-tac-u-lar|spectator=spec-ta-tor|stadium=sta-di-um|stepfather=step-fa-ther|stepmother=step-moth-er|strawberry=straw-ber-ry|submarine=sub-ma-rine|subtitle=sub-ti-tle|subtotal=sub-to-tal|subzero=sub-ze-ro|sugarcane=sug-ar-cane|sunflower=sun-flow-er|supermarket=su-per-mar-ket|' +
    'talkative=talk-a-tive|telegram=tel-e-gram|telephone=tel-e-phone|teleport=tel-e-port|telescope=tel-e-scope|television=tel-e-vi-sion|theater=the-a-ter|tomato=to-ma-to|tornado=tor-na-do|tortilla=tor-ti-lla|traditional=tra-di-tion-al|triangle=tri-an-gle|tricycle=tri-cy-cle|' +
    'underwear=un-der-wear|unfamiliar=un-fa-mil-iar|unhappy=un-hap-py|unhealthy=un-health-y|unicorn=u-ni-corn|uniform=u-ni-form|university=u-ni-ver-si-ty|utility=u-til-i-ty|' +
    'venison=ven-i-son|video=vid-e-o|violet=vi-o-let|visible=vis-i-ble|visitor=vis-i-tor|volleyball=vol-ley-ball|washable=wash-a-ble|watermelon=wa-ter-mel-on|weightlifting=weight-lift-ing')
    .split('|').map(s => s.split('=')));
  const vocab = NOTES.find(c => c.id === 'vocab');
  for (const it of vocab.items) {
    // 卡片：背面第一行是答案，音節放第二行
    if (it.front && SYL[it.say]) it.back = it.back.replace(/^[^\n]*/, m => m + '\n🔤 ' + SYL[it.say]);
    if (!it.note) continue;
    // 單字表：「comfortable {{say:comfortable}}」、妙招表：一行開頭「comfortable　」
    it.note = it.note.replace(/([A-Za-z]+) \{\{say:([A-Za-z]+)\}\}/g, (m, w, s) => w === s && SYL[w] ? `${m}{{syl:${SYL[w]}}}` : m)
      .replace(/^([A-Za-z]+)　/gm, (m, w) => SYL[w] ? `${w} {{say:${w}}}{{syl:${SYL[w]}}}　` : m);
  }
}
