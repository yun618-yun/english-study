// 筆記資料（從使用者的截圖整理，原文簡體，已改成繁體）
// 每個分類有很多「項目」。每個項目：
//   id     不重複的代號（英文）。「已熟／不熟」靠它記錄，不要隨便改
//   title  標題（筆記分頁顯示）
//   note   筆記內容（\n 是換行）。沒有 note 的項目只會出現在卡片和測驗
//   front  卡片正面（題目）
//   back   卡片背面（答案）。測驗會用第一行當答案
//   quiz   （可省略）選擇題：{ q: 題目, options: [選項...], answer: 正確選項的位置(從 0 開始) }
//          沒有寫 quiz 的話，App 會自動用 front/back 出題
// 不規則動詞：「原形=過去式=過去分詞=中文」，用 | 隔開
const IRREGULAR = 'be=was / were=been=是|have=had=had=有|do=did=done=做|go=went=gone=去|come=came=come=來|get=got=got / gotten=得到|make=made=made=製作|take=took=taken=拿|give=gave=given=給|see=saw=seen=看見|know=knew=known=知道|think=thought=thought=想|say=said=said=說|tell=told=told=告訴|eat=ate=eaten=吃|drink=drank=drunk=喝|buy=bought=bought=買|bring=brought=brought=帶來|teach=taught=taught=教|find=found=found=找到|feel=felt=felt=感覺|leave=left=left=離開|meet=met=met=遇見|pay=paid=paid=付錢|sleep=slept=slept=睡覺|send=sent=sent=寄|spend=spent=spent=花（時間、錢）|sit=sat=sat=坐|stand=stood=stood=站|write=wrote=written=寫|read=read=read=讀（過去式念 red）|speak=spoke=spoken=說（語言）|break=broke=broken=打破|choose=chose=chosen=選擇|drive=drove=driven=開車|ride=rode=ridden=騎|swim=swam=swum=游泳|begin=began=begun=開始|run=ran=run=跑|become=became=become=變成|put=put=put=放|cut=cut=cut=切|let=let=let=讓|hit=hit=hit=打|cost=cost=cost=花費（價錢）|lose=lost=lost=遺失、輸|win=won=won=贏|forget=forgot=forgotten=忘記|wear=wore=worn=穿|grow=grew=grown=長大、種植'
  .split('|').map(s => s.split('='));

const NOTES = [
  // ===================== 📖 文法用語（名詞解釋：動詞、代名詞是什麼） =====================
  {
    id: 'terms',
    name: '文法用語',
    icon: '📖', color: '#4f7a9a', desc: '動詞、代名詞是什麼？先看這裡',
    items: [
      {
        id: 'g-overview',
        title: '一個句子裡有哪些零件？（總覽）',
        note: '英文句子就像組合積木，每個字都有自己的「身分」。先看一個完整的例子：\n\nMy sister usually drinks a cup of hot coffee in the morning.\n我姊姊通常在早上喝一杯熱咖啡。\n\n【拆開來看】\nMy　代名詞（所有格）　我的\nsister　名詞　姊姊\nusually　副詞　通常\ndrinks　動詞　喝\na　冠詞　一\ncup　名詞　杯\nof　介係詞　…的\nhot　形容詞　熱的\ncoffee　名詞　咖啡\nin　介係詞　在\nthe　冠詞　那個\nmorning　名詞　早上\n\n① 最重要的是這兩個\n名詞：人、事、物的名字（誰？什麼東西？）\n動詞：動作（做什麼？）\n\n② 其他都是來「幫忙」的\n形容詞：形容名詞（怎樣的東西？）\n副詞：形容動詞（怎麼做？多常做？）\n冠詞、介係詞：放在名詞前面的小字\n\n👉 每個詞性都有一則筆記，往下一則一則看。'
      },
      {
        id: 'g-pos-abbr',
        title: '10 種詞性和縮寫（v.、n.、adj.…）',
        note: '字典和筆記裡常看到 v.、n. 這些縮寫，就是「詞性」。英文單字一共分成 10 種：\n\n【10 種詞性】\nn.　名詞　book、teacher\npron.　代名詞　I、he、it\nv.　動詞　eat、go、is\nadj.　形容詞　big、happy\nadv.　副詞　quickly、very\nart.　冠詞　a、an、the\nprep.　介係詞　in、on、to\nconj.　連接詞　and、but\nnum.　數詞　one、first\nint.　感嘆詞　oh、wow\n\n① 比較少提到的兩個\n數詞：數字和順序，one、two（幾個）、first、second（第幾）\n感嘆詞：表達情緒的聲音，Wow!（哇）Oh!（喔）Ouch!（好痛）\n\n💡 方位介係詞圖卡上的 prep.、adv.、adj. 就是這些縮寫。\n\n⚠️ 收集的筆記「整個英語語法體系」有幾個錯：\n手寫版詞類寫了「形詞 n.」，重複了名詞，應該是「冠詞 art.」\n手寫版「個詞」是錯字，應該是「介詞（介係詞）」\n郭老師版的表格「代詞 pron.」寫了兩次\n郭老師版連詞的例子 besides、furthermore、moreover、in addition 其實是副詞（連接副詞）；真正的連詞是 and、but、or、because、if\n💡 郭老師版說代詞「代替名詞/形容詞/數詞」，最常見的是代替名詞，例如 Tom → he',
        front: 'v.、n.、adj.、adv.\n各是什麼詞性？',
        back: 'v. 動詞、n. 名詞\nadj. 形容詞、adv. 副詞',
        quiz: { q: 'adj. 是哪一種詞性？', options: ['形容詞', '副詞', '動詞', '名詞'], answer: 0 }
      },
      {
        id: 'g-pos-abbr-2',
        front: 'prep.、conj.、pron.、art.\n各是什麼詞性？',
        back: 'prep. 介係詞、conj. 連接詞\npron. 代名詞、art. 冠詞',
        quiz: { q: 'prep. 是哪一種詞性？', options: ['代名詞', '介係詞', '連接詞', '冠詞'], answer: 1 }
      },
      {
        id: 'g-position',
        title: '看位置猜詞性（填空題 8 個口訣）',
        note: '做填空題時，先看空格的「位置」，就能猜出要填什麼詞性。\n\n① 逗號後面 → 常用 doing（同時在做的事）\nShe sat by the window, [reading] a book.\n她坐在窗邊，看著書。\n\n② 介係詞後面 → 動詞要用 doing\nWhat about [going] swimming?\n去游泳怎麼樣？\n\n③ 形容詞前面 → 副詞\nHe is [very] clever.\n他非常聰明。very 修飾 clever\n\n④ 形容詞後面 → 名詞\nHe has a healthy [breakfast].\n他吃了一頓健康的早餐。\n\n⑤ 主詞和動詞中間 → 副詞\nThey [happily] went fishing.\n他們開心地去釣魚。\n\n⑥ be、look、feel 這類動詞後面 → 形容詞\nHe is [tall].\n他很高。\n\n⑦ 受詞就是主詞自己 → 反身代名詞\nHe hurt [himself].\n他弄傷了自己。\nHe went home by [himself].\n他自己一個人回家。\n\n⑧ feel、get 後面 → 形容詞或過去分詞\nWe feel [sad]. 我們覺得難過。\nThey get [tired]. 他們累了。\n\n💡 這些是「常見情況」，不是 100% 的規則，做題時當作提示就好。\n\n⚠️ 收集的筆記有幾個錯誤，這裡已經改正：\n例句 reding 拼錯 → reading\n第 7 條寫 He went home herself → he 是男生要用 himself，而且要說 by himself\n第 7 條的規則文字也不對 → 應該是「受詞就是主詞自己時，用反身代名詞」\n標題「完型填空」→ 正確是「完形填空」',
        front: 'What about ___ (go) swimming?',
        back: 'going\n介係詞（about）後面的動詞要用 doing',
        quiz: { q: 'What about ___ swimming?', options: ['go', 'going', 'went', 'to go'], answer: 1 }
      },
      {
        id: 'g-position-adv',
        front: 'They ___ (happy) went fishing.\n主詞和動詞中間要用什麼詞性？',
        back: 'happily（副詞）\n主詞和動詞中間放副詞',
        quiz: { q: 'They ___ went fishing.', options: ['happy', 'happily', 'happiness', 'happier'], answer: 1 }
      },
      {
        id: 'g-position-self',
        front: 'He hurt ___.（他弄傷了自己）',
        back: 'himself\n受詞就是主詞自己，用反身代名詞',
        quiz: { q: 'He hurt ___ when he fell.', options: ['him', 'his', 'himself', 'herself'], answer: 2 }
      },
      {
        id: 'g-cloze-tips',
        title: '語法填空答題技巧',
        note: '填空題分兩種：空格旁邊「沒有提示詞」和「有提示詞」。\n\n【沒有提示詞：想想缺什麼】\n冠詞　a / an、the\n介係詞　with、by、for…\n連接詞　and、but、so…\n代名詞、從句引導詞　who、which、that、what\n\n① 冠詞：什麼時候用 the\n第二次提到的名詞：I saw a dog. [The] dog was cute.\n序數詞前面：[the] first、[the] second\n最高級前面：[the] best\n獨一無二的東西：[the] sun、[the] moon、[the] earth\n樂器：play [the] piano\n\n② 介係詞：後面接名詞或名詞片語\nwith　帶著、和…一起\nwithout　沒有\nlike　像\nsuch as　例如\nfor　為了、對於\nby　被、藉由、在…旁邊\nIt\'s easy [for] me to solve. 對我來說很容易解決。\nbe grateful [to] sb. [for] sth. 為某事感謝某人\n\n③ 連接詞\nand、but、so、because　連接兩個句子\nas long as　只要\nnot … until　直到…才：I didn\'t sleep until 12. 我直到 12 點才睡。\nhowever　但是（前後用逗號隔開）：It\'s cheap. [However], it\'s not good.\n\n④ 成對的連接詞\nboth … and　兩個都\neither … or　不是…就是\nneither … nor　兩個都不\none … the other　（兩個裡面）一個…另一個\n\n⑤ 從句引導詞\n時間：when、while\n讓步（雖然）：although、though\n結果：so + 形容詞 + that\n條件：if（主將從現：if 子句用現在式，主要句子用未來式）\nIf it rains tomorrow, I will stay home. 如果明天下雨，我會待在家。\n指人：who / that；指物：which / that\nI don\'t know [what] to do. 我不知道該做什麼。\n\n【有提示詞：把提示的字變形】\n名詞：看到 one of、several（幾個）→ 用複數\n動詞：看時態、主詞\n形容詞、副詞：看位置（看「看位置猜詞性」那則筆記）\n\n💡 one of + 複數名詞：one of my [friends]（我的朋友之一）\n⚠️ 收集的筆記有錯：the + man 應該是 the + moon；by 不是「和」；although / though 是「讓步（雖然）」，不是時間',
        front: 'If it ___ (rain) tomorrow, I will stay home.',
        back: 'rains\nif 子句用現在式，主要句子用未來式（主將從現）',
        quiz: { q: 'If it ___ tomorrow, I will stay home.', options: ['rain', 'rains', 'will rain', 'rained'], answer: 1 }
      },
      {
        id: 'g-cloze-pairs',
        front: 'neither … nor 是什麼意思？',
        back: '兩個都不\nNeither Tom nor Amy came. 湯姆和艾咪都沒來。',
        quiz: { q: 'I like ___ tea ___ coffee. 我茶和咖啡都喜歡。', options: ['both … and', 'either … or', 'neither … nor', 'one … the other'], answer: 0 }
      },
      {
        id: 'g-cloze-until',
        front: 'I didn\'t sleep until 12.\n是什麼意思？',
        back: '我直到 12 點才睡\nnot … until ＝ 直到…才',
        quiz: { q: 'She is one of my ___.', options: ['friend', 'friends', 'friend\'s', 'a friend'], answer: 1 }
      },
      {
        id: 'g-noun',
        title: '名詞是什麼？',
        note: '名詞 ＝ 人、事、物、地方的「名字」\n回答「誰？」「什麼？」「哪裡？」的字，就是名詞。\n\n【例子】\n人　teacher、mom、Tom\n東西　book、phone、coffee\n地方　school、Taipei、home\n抽象的東西　love、time、money\n\n① 怎麼認\n前面可以加 a / the / my 的，通常是名詞。\na [book]、the [teacher]、my [phone]\n\n② 名詞分兩種\n可數名詞：可以一個一個數（a book、two books）\n不可數名詞：沒辦法一個一個數（water、money）\n\n💡 詳細的單複數規則在「基礎文法 → 名詞單複數」',
        front: '什麼是名詞？',
        back: '人、事、物、地方的名字\n例：teacher、book、school、money',
        quiz: { q: '下面哪一個是名詞？', options: ['happy', 'run', 'table', 'quickly'], answer: 2 }
      },
      {
        id: 'g-pronoun',
        title: '代名詞是什麼？',
        note: '代名詞 ＝ 用來「代替名詞」的字\n為了不要一直重複同一個名字。\n\n【例子】\n不用代名詞：Tom is my friend. Tom likes music. Tom plays the guitar.\n用代名詞：Tom is my friend. [He] likes music. [He] plays the guitar.\n第二次開始用 he 代替 Tom，句子就不會囉嗦。\n\n【常見的代名詞】\n人　I、you、he、she、we、they\n東西　it、they\n指東西　this、that、these、those\n\n① 中文也有\n中文的「我、你、他、它、這個、那個」都是代名詞。\n\n② 英文比較麻煩的地方\n同一個「我」，放的位置不同，形狀會變：\nI（我）、me（我）、my（我的）、mine（我的東西）\n\n💡 完整的變化表在「基礎文法 → 代名詞」',
        front: '什麼是代名詞？',
        back: '用來代替名詞的字\n例：Tom → he；the book → it',
        quiz: { q: 'Tom is tired. ___ wants to sleep.\n（代替 Tom 的代名詞）', options: ['She', 'He', 'It', 'They'], answer: 1 }
      },
      {
        id: 'g-verb',
        title: '動詞是什麼？',
        note: '動詞 ＝ 表示「動作」或「狀態」的字\n回答「做什麼？」「是什麼狀態？」\n每個英文句子一定要有動詞！\n\n① 一般動詞：看得到的動作、心裡的感覺\neat 吃、run 跑、go 去、work 工作\nlike 喜歡、know 知道、want 想要\nI [eat] rice. 我吃飯。\n\n② be 動詞：「是、在」\nam、is、are、was、were\nShe [is] a nurse. 她是護士。\nI [am] at home. 我在家。\n\n③ 助動詞：放在動詞前面幫忙的\ncan 能、will 將會、should 應該、do / does / did\nI [can] swim. 我會游泳。\n\n⚠️ 中文常常可以省略「是」，英文不行：\n我很累 → I [am] tired.（一定要有 am）\n\n💡 動詞會變形狀（go、goes、went、gone、going），下一則有說明。',
        front: '什麼是動詞？',
        back: '表示動作或狀態的字\n例：eat、go、like、is\n每個英文句子一定要有動詞',
        quiz: { q: 'She ___ tired.（她很累）', options: ['very', 'is', 'so', '不用填'], answer: 1 }
      },
      {
        id: 'g-verb-kinds',
        front: '動詞分成哪三種？',
        back: '一般動詞（eat、go）\nbe 動詞（am、is、are）\n助動詞（can、will、do）',
        quiz: { q: '下面哪一個是 be 動詞？', options: ['can', 'eat', 'are', 'do'], answer: 2 }
      },
      {
        id: 'g-verb-forms',
        title: '動詞的 5 種形狀',
        note: '中文的「吃」永遠是「吃」，但英文動詞會依照時間和主詞改變形狀。\n\n【以 eat 和 go 為例】\n形狀　eat　go\n原形　eat　go\n第三人稱單數　eats　goes\n過去式　ate　went\n過去分詞　eaten　gone\n現在分詞（ing）　eating　going\n\n① 原形：最原本的樣子\n字典裡查到的樣子。用在 can / will / do 後面、to 後面。\nI can [eat]. I want to [go].\n\n② 第三人稱單數：加 s / es\n主詞是 he / she / it，現在式要用。\nShe [eats] breakfast every day.\n\n③ 過去式：已經發生的事\nI [ate] breakfast. 我吃過早餐了。\n\n④ 過去分詞：用在完成式、被動語態\nI have [eaten]. 我已經吃了。\n\n⑤ 現在分詞（ing）：正在做\nI am [eating]. 我正在吃。',
        front: 'eat 的 5 種形狀？',
        back: 'eat（原形）、eats（第三人稱單數）\nate（過去式）、eaten（過去分詞）\neating（ing 形）',
        quiz: { q: 'I have ___ lunch.（我已經吃過午餐了）', options: ['eat', 'ate', 'eaten', 'eating'], answer: 2 }
      },
      {
        id: 'g-verb-base',
        front: '什麼是「原形動詞」？',
        back: '動詞最原本的樣子（字典查到的樣子）\n例：go、eat、be',
        quiz: { q: '下面哪一個是「原形」？', options: ['went', 'goes', 'go', 'gone'], answer: 2 }
      },
      {
        id: 'g-adj',
        title: '形容詞是什麼？',
        note: '形容詞 ＝ 形容「名詞」的字\n回答「怎麼樣的？」，就像中文的「…的」。\n\n【例子】\n大小　big 大的、small 小的\n顏色　red 紅的、white 白的\n感覺　happy 開心的、tired 累的\n評價　good 好的、beautiful 漂亮的\n\n① 放在名詞前面\na [red] car 一台紅色的車\na [beautiful] day 美好的一天\n\n② 放在 be 動詞後面\nThe car is [red]. 這台車是紅的。\nI am [tired]. 我很累。\n\n💡 形容詞可以比較：big → bigger → the biggest（「基礎文法 → 比較級」）',
        front: '什麼是形容詞？',
        back: '形容名詞的字（怎麼樣的？）\n例：big、red、happy、beautiful',
        quiz: { q: '下面哪一個是形容詞？', options: ['quickly', 'beautiful', 'sing', 'and'], answer: 1 }
      },
      {
        id: 'g-adv',
        title: '副詞是什麼？',
        note: '副詞 ＝ 形容「動詞、形容詞」的字\n回答「怎麼做？」「多常？」「多…？」\n\n【例子】\n怎麼做　quickly 快速地、slowly 慢慢地、well 很好地\n多常　always 總是、usually 通常、never 從不\n程度　very 非常、too 太、really 真的\n時間地點　now 現在、here 這裡、yesterday 昨天\n\n① 形容動詞（怎麼做）\nHe runs [quickly]. 他跑得很快。\n\n② 形容形容詞（多…）\nI am [very] tired. 我非常累。\n\n③ 怎麼認\n很多副詞是「形容詞 + ly」：\nquick 快的 → quickly 快速地\nslow 慢的 → slowly 慢慢地\n\n⚠️ 形容詞 vs 副詞\nShe is a [good] singer.（形容詞，形容 singer）\nShe sings [well].（副詞，形容 sings）',
        front: '什麼是副詞？',
        back: '形容動詞或形容詞的字（怎麼做？多常？）\n例：quickly、always、very',
        quiz: { q: 'He drives ___.（他開車很慢）', options: ['slow', 'slowly', 'slower', 'slowness'], answer: 1 }
      },
      {
        id: 'g-adj-adv',
        front: 'She is a good singer.\nShe sings well.\ngood 和 well 差在哪？',
        back: 'good 是形容詞，形容 singer（名詞）\nwell 是副詞，形容 sings（動詞）',
        quiz: { q: 'She speaks English very ___.', options: ['good', 'well', 'best', 'goods'], answer: 1 }
      },
      {
        id: 'g-article',
        title: '冠詞是什麼？',
        note: '冠詞 ＝ 戴在名詞頭上的小帽子\n只有三個：a、an、the\n\n① a / an：不特定的「一個」\na book 一本書（隨便哪一本）\nan apple 一顆蘋果\n\n② the：特定的「那個」\nthe book 那本書（我們都知道是哪一本）\n\n③ 中文沒有冠詞\n中文說「我買了書」，英文要說 I bought [a] book.\n所以台灣人很常忘記加，要特別注意。\n\n④ 位置：冠詞 + (形容詞) + 名詞\na book\na [red] book\nthe [big red] book\n\n💡 什麼時候用 a、an、the，在「基礎文法 → 冠詞」',
        front: '什麼是冠詞？有哪幾個？',
        back: '戴在名詞前面的小字\n只有三個：a、an、the',
        quiz: { q: '下面哪一個是冠詞？', options: ['this', 'the', 'my', 'some'], answer: 1 }
      },
      {
        id: 'g-prep',
        title: '介係詞是什麼？',
        note: '介係詞 ＝ 放在名詞前面，說明「位置、時間、方向、關係」的小字\n\n【例子】\n位置　in 在裡面、on 在上面、under 在下面、next to 在旁邊\n時間　at 在（幾點）、before 之前、after 之後\n方向　to 往、from 從、into 進入\n關係　with 和、for 為了、of …的、about 關於\n\n① 介係詞 + 名詞\nThe cat is [on] the table. 貓在桌子上。\nI go to work [by] bus. 我搭公車上班。\nThis is a gift [for] you. 這是給你的禮物。\n\n② 介係詞後面如果是動詞，要用 ing\nThank you for [helping] me.\n\n💡 最常用的 in / on / at 在「基礎文法」；to 的用法有一整個分類',
        front: '什麼是介係詞？',
        back: '放在名詞前面，說明位置、時間、方向的小字\n例：in、on、at、to、with',
        quiz: { q: 'The cat is ___ the table.（在桌子上）', options: ['on', 'and', 'very', 'is'], answer: 0 }
      },
      {
        id: 'g-conj',
        title: '連接詞是什麼？',
        note: '連接詞 ＝ 把兩個字或兩個句子「接起來」的字\n\n【常用連接詞】\nand　和、而且\nbut　但是\nor　或者\nso　所以\nbecause　因為\nwhen　當…的時候\nif　如果\n\n① 連接兩個字\ntea [and] coffee 茶和咖啡\ntea [or] coffee 茶或咖啡\n\n② 連接兩個句子\nI was tired, [so] I went to bed.\n我很累，所以我去睡了。\nI like it, [but] it\'s too expensive.\n我喜歡，但是太貴了。\n\n⚠️ 中文常說「因為…所以…」，英文只能選一個：\nBecause I was tired, so I slept. ✗\nBecause I was tired, I slept. ✓\nI was tired, so I slept. ✓',
        front: '什麼是連接詞？',
        back: '把兩個字或兩個句子接起來的字\n例：and、but、or、so、because',
        quiz: { q: '「因為我很累，所以我睡了」哪一句對？', options: ['Because I was tired, so I slept.', 'I was tired, so I slept.', 'Because so I was tired, I slept.', 'I was tired, because so I slept.'], answer: 1 }
      },
      {
        id: 'g-subject-object',
        title: '主詞、受詞、補語是什麼？',
        note: '詞性（名詞、動詞…）是「這個字是什麼」；\n主詞、受詞是「這個字在句子裡做什麼工作」。\n\n① 主詞：做動作的人或東西（誰？）\n通常在句子最前面、動詞前面。\n[Tom] eats an apple. → 誰吃？Tom\n\n② 受詞：接受動作的人或東西（對誰？什麼？）\n通常在動詞後面。\nTom eats [an apple]. → 吃什麼？an apple\nI love [you]. → 愛誰？you\n\n③ 補語：補充說明主詞是什麼、怎麼樣\n通常在 be 動詞後面。\nTom is [a doctor]. → Tom 是什麼？醫生\nTom is [happy]. → Tom 怎麼樣？開心\n\n【整理】\n主詞　Tom　誰做？\n動詞　eats　做什麼？\n受詞　an apple　對什麼做？',
        front: 'Tom eats an apple.\n主詞和受詞是誰？',
        back: '主詞：Tom（誰吃？）\n受詞：an apple（吃什麼？）',
        quiz: { q: 'I love my mom. 這句的「受詞」是？', options: ['I', 'love', 'my mom', '沒有受詞'], answer: 2 }
      },
      {
        id: 'g-subject',
        front: '什麼是主詞？',
        back: '做動作的人或東西（誰？）\n通常在句子最前面',
        quiz: { q: 'My brother plays soccer. 主詞是？', options: ['My brother', 'plays', 'soccer', 'My'], answer: 0 }
      },
      {
        id: 'g-sentence-parts',
        title: '句子的 8 種成分（主語、謂語、定語、狀語…）',
        note: '前面學過主詞、受詞；完整的「句子成分」有 8 種。課本和文法書常用這些名稱，認得就好。\n\n【8 種句子成分】\n主語（主詞）　誰、什麼　名詞、代名詞\n謂語（述語）　做什麼　動詞\n賓語（受詞）　動作的對象　名詞、代名詞\n表語（主詞補語）　主詞是什麼、怎麼樣　be 動詞後面\n定語　修飾名詞　形容詞\n狀語　修飾動詞、形容詞或整句　副詞、時間地點\n補語（受詞補語）　補充說明受詞\n同位語　換個說法說同一個東西\n\n① 一句話看懂\nThe [tall] boy [quickly] ate [an apple] [in the kitchen].\ntall 是定語（修飾 boy）\nquickly、in the kitchen 是狀語（說明怎麼吃、在哪吃）\n\n② 補語和同位語\nWe call [her] [Miss Li]. 我們叫她李老師。（Miss Li 是受詞補語）\nMy friend [Tom] is a doctor. 我朋友湯姆是醫生。（Tom 是同位語）\n\n💡 大陸課本叫「主語、賓語、表語」，台灣常說「主詞、受詞、主詞補語」，是同一個東西',
        front: '「定語」和「狀語」差在哪？',
        back: '定語：修飾名詞（a tall boy）\n狀語：修飾動詞或整句（ran quickly、in the kitchen）',
        quiz: { q: 'The tall boy ran quickly. 哪個是「定語」？', options: ['tall', 'boy', 'ran', 'quickly'], answer: 0 }
      },
      {
        id: 'g-sentence-uses',
        title: '句子的 4 種用途（陳述、疑問、祈使、感嘆）',
        note: '① 陳述句：說明一件事（肯定句、否定句都是）\nWe have a new classroom. 我們有一間新教室。\n\n② 疑問句：問問題，分成四種\n一般疑問句（Yes / No）：Can you do Kung Fu? 你會功夫嗎？\n特殊疑問句（疑問詞開頭）：Where do you live?\n選擇疑問句（A 還是 B）：Do you want tea or coffee?\n反義疑問句（…對吧？）：You like it, don\'t you?\n\n③ 祈使句：命令、請求、勸告、禁止，沒有主詞\nDon\'t worry. 別擔心。\nPlease sit down. 請坐。\n\n④ 感嘆句：表達強烈的感覺，最後是驚嘆號\nWhat a hot day it is! 天氣好熱！\nHow beautiful! 好漂亮！',
        front: 'Don\'t worry.\n這是哪一種句子？',
        back: '祈使句\n叫別人做（或不要做）某事，沒有主詞',
        quiz: { q: 'What a hot day it is! 是哪一種句子？', options: ['陳述句', '疑問句', '祈使句', '感嘆句'], answer: 3 }
      },
      {
        id: 'g-sentence-patterns',
        title: '5 大基本句型（S + V + O…）',
        note: '英文句子幾乎都能放進這 5 種骨架。S 主詞、V 動詞、O 受詞、C 補語。\n\n① S + V（主 + 動）\nHe runs. 他跑。\nHe walks quickly. 他走得很快。\n\n② S + V + O（主 + 動 + 受）\nI like apples. 我喜歡蘋果。\nI love him. 我愛他。\n\n③ S + V + C（主 + 連綴動詞 + 補語）\nShe is beautiful. 她很漂亮。\nThe weather is good. 天氣很好。\n\n④ S + V + O + O（主 + 動 + 兩個受詞）\nShe shows me a book. 她給我看一本書。\nI gave him all my money. 我把錢都給他了。\n\n⑤ S + V + O + C（主 + 動 + 受 + 受詞補語）\nShe made John sad. 她讓約翰傷心了。\nI made my brother cry. 我把弟弟弄哭了。\n\n💡 連綴動詞（系動詞）：be、look、feel、seem、become、get…，後面接形容詞，說明主詞的狀態\nYou look tired. 你看起來很累。',
        front: 'She shows me a book.\n是哪一種句型？',
        back: 'S + V + O + O\nme 和 a book 都是受詞',
        quiz: { q: 'She made John sad. 是哪一種句型？', options: ['S + V', 'S + V + O', 'S + V + O + O', 'S + V + O + C'], answer: 3 }
      },
      {
        id: 'g-clauses',
        title: '從句和特殊句型（先認識名字就好）',
        note: '這些是比較進階的文法，初學先知道「有這些東西」就好。\n\n【從句】一個句子裡面包著另一個小句子\n賓語從句（受詞子句）　He said [that he wanted to be a teacher].\n主語從句（主詞子句）　[That the earth is round] is true.\n狀語從句（副詞子句）　[When I was a boy], I swam in that river.\n定語從句（形容詞子句）　This is the book [that I bought].\n表語從句　The problem is [that I\'m tired].\n\n【特殊句型】\n倒裝句　把順序倒過來：Here comes the bus.\n強調句　It is … that …：It was Tom that broke the window.\nThere be 句型　表示「某地方有某東西」\n省略句　省掉重複的部分：Me too.\n虛擬語氣　說假設、不是真的事：If I were you, I would go.\n\n💡 台灣課本常把「從句」叫「子句」',
        front: '「從句」是什麼？',
        back: '句子裡面包著的另一個小句子\nHe said [that he was tired].',
        quiz: { q: 'If I were you, I would go. 用了哪一種句型？', options: ['倒裝句', '強調句', '虛擬語氣', '省略句'], answer: 2 }
      },
      {
        id: 'g-numbers',
        title: '數詞：數字、序數、分數',
        note: '① 基數詞：幾個\none、two、twenty-one（21 中間加連字號）\n三位數要在百位和十位中間加 and（英式一定加；美式常常省略）：\n125 ＝ one hundred [and] twenty-five\n\n② 序數詞：第幾\n除了 first（第一）、second（第二）、third（第三），其他大多在後面加 th：\nfourth、sixth、tenth、twenty-first（第 21 還是用 first）\n⚠️ 特別：fifth、ninth、twelfth、twentieth\n\n③ 分數：分子用基數、分母用序數\n1/3 ＝ one third\n2/3 ＝ two thirds（分子大於 1，分母加 s）\n1/2 ＝ a half　1/4 ＝ a quarter',
        front: '125 英文怎麼念？',
        back: 'one hundred and twenty-five\n百位和十位中間加 and',
        quiz: { q: '2/3 英文怎麼說？', options: ['two three', 'two third', 'two thirds', 'second three'], answer: 2 }
      },
      {
        id: 'g-ordinal',
        front: '5、9、12 的序數詞（第幾）？',
        back: 'fifth、ninth、twelfth\n不是 fiveth、nineth、twelveth',
        quiz: { q: '「第 21」英文是？', options: ['twenty-oneth', 'twenty-first', 'twentieth-one', 'twenty-one'], answer: 1 }
      },
      {
        id: 'g-sentence-types',
        title: '肯定句、否定句、問句是什麼？',
        note: '同一件事，可以用三種方式說：\n\n① 肯定句：說「是、有、會」\nI like coffee. 我喜歡咖啡。\nShe is a teacher. 她是老師。\n\n② 否定句：說「不是、沒有、不會」，句子裡有 not\nI [don\'t] like coffee. 我不喜歡咖啡。\nShe [isn\'t] a teacher. 她不是老師。\n\n③ 問句：問問題，句子最後是問號 ?\n分成兩種：\nYes / No 問句：回答「是」或「不是」\n[Do] you like coffee? — Yes, I do. ／ No, I don\'t.\n疑問詞問句：用 what、where 等開頭，要回答內容\n[What] do you like? — I like coffee.\n\n💡 怎麼把肯定句改成否定句、問句，在「基礎文法 → 否定句和問句」',
        front: '肯定句、否定句、問句\n各是什麼？',
        back: '肯定句：說「是、有」\n否定句：說「不是、沒有」，有 not\n問句：問問題，最後有 ?',
        quiz: { q: '下面哪一句是否定句？', options: ['I like tea.', 'Do you like tea?', 'I don\'t like tea.', 'What do you like?'], answer: 2 }
      },
      {
        id: 'g-yes-no',
        front: 'Do you like coffee?\n怎麼回答？',
        back: 'Yes, I do. ／ No, I don\'t.\nYes / No 問句，用 Yes 或 No 回答',
        quiz: { q: 'Are you a student? — Yes, ___.', options: ['I am', 'I do', 'I is', 'I are'], answer: 0 }
      },
      {
        id: 'g-person',
        title: '人稱、第三人稱單數是什麼？',
        note: '「人稱」就是「說話的時候，在講誰」。\n\n【三種人稱】\n第一人稱　說話的人自己　I、we\n第二人稱　聽話的人　you\n第三人稱　其他人、東西　he、she、it、they、Tom、my mom\n\n① 單數和複數\n單數 ＝ 一個；複數 ＝ 兩個以上\n單數：I、you、he、she、it、Tom、a cat\n複數：we、you、they、Tom and Amy、cats\n\n② 為什麼「第三人稱單數」很重要？\n現在式的時候，主詞是第三人稱單數，動詞要加 s：\nI [play]. You [play]. They [play].\nHe [plays]. She [plays]. Tom [plays]. My mom [plays].\n\n👉 看到主詞是「一個別人／一個東西」，現在式動詞就要加 s。',
        front: '什麼是「第三人稱單數」？',
        back: '「一個」別人或東西\n例：he、she、it、Tom、my mom\n現在式動詞要加 s：He plays.',
        quiz: { q: 'My mom ___ dinner every day.', options: ['cook', 'cooks', 'cooking', 'are cook'], answer: 1 }
      },
      {
        id: 'g-person-which',
        front: '下面哪些是第三人稱單數？\nI、she、they、Tom、you、it',
        back: 'she、Tom、it\nI 是第一人稱；you 是第二人稱；they 是複數',
        quiz: { q: '下面哪一個是第三人稱單數？', options: ['I', 'you', 'they', 'my dog'], answer: 3 }
      },
      {
        id: 'g-tense',
        title: '時態是什麼？',
        note: '時態 ＝ 用「動詞的形狀」來表示事情發生的時間\n\n① 中文 vs 英文\n中文靠加字來表示時間：\n我吃飯／我在吃飯／我吃了飯／我會吃飯\n英文靠動詞變形狀：\nI eat／I am eating／I ate／I will eat\n\n② 時態 ＝ 時間 + 狀態\n時間：過去、現在、未來\n狀態：簡單（一般）、進行（正在）、完成（已經）\n組合起來就有很多種時態。\n\n【最常用的 5 個】\n現在簡單式　I eat.　我（平常）吃\n現在進行式　I am eating.　我正在吃\n過去簡單式　I ate.　我吃了\n未來式　I will eat.　我會吃\n現在完成式　I have eaten.　我已經吃了\n\n💡 一開始先學這 5 個就夠用了，在「基礎文法 → 最常用的 5 個時態」',
        front: '什麼是時態？',
        back: '用動詞的形狀表示事情發生的時間\n例：I eat／I ate／I will eat',
        quiz: { q: '「我正在吃」是哪個時態？', options: ['現在簡單式', '現在進行式', '過去簡單式', '未來式'], answer: 1 }
      }
    ]
  },

  // ===================== ⭐ 基礎文法（初學者先學這一類） =====================
  {
    id: 'basics',
    name: '基礎文法',
    icon: '⭐', color: '#c9932a', desc: '初學者從這裡開始，照順序學',
    items: [
      {
        id: 'b-structure',
        title: '句子的基本結構',
        note: '英文句子的骨架：誰 → 做什麼 → 對象。先抓到這個，再加其他東西。\n\n① 主詞 + 動詞\n[I] [run].\n我跑步。誰（I）＋ 做什麼（run）\n\n② 主詞 + 動詞 + 受詞\n[I] [eat] [an apple].\n我吃一顆蘋果。受詞就是動作的對象（吃什麼？）\n\n③ 主詞 + be 動詞 + 說明\n[She] [is] [a teacher].\n她是老師。be 動詞後面說明主詞是什麼、怎麼樣\n\n④ 加上地點和時間\nI eat breakfast [at home] [every day].\n順序：誰 → 做什麼 → 東西 → 在哪裡 → 什麼時候\n\n👉 英文的「地點、時間」通常放在句子最後面。',
        front: '英文句子最基本的順序是？',
        back: '主詞 + 動詞 + 受詞\nI eat an apple.（誰 → 做什麼 → 對象）',
        quiz: { q: '哪一句的順序是對的？', options: ['I eat breakfast at home every day.', 'I every day eat breakfast at home.', 'Every day at home I breakfast eat.', 'I at home eat every day breakfast.'], answer: 0 }
      },
      {
        id: 'b-structure-time',
        front: '「我每天在家吃早餐」\n英文怎麼排？',
        back: 'I eat breakfast at home every day.\n誰 → 做什麼 → 東西 → 地點 → 時間'
      },
      {
        id: 'b-be',
        title: 'be 動詞 am / is / are',
        note: 'be 動詞的意思是「是、在」，要跟著主詞變化。\n\n【現在式】\nI　am\nhe / she / it　is\nyou / we / they　are\n\n【過去式】\nI / he / she / it　was\nyou / we / they　were\n\n【縮寫（口語很常用）】\nI am　I\'m\nhe is　he\'s\nyou are　you\'re\nis not　isn\'t\nare not　aren\'t\n\n① 用法\nI am a student. 我是學生。\nShe is at home. 她在家。\nThey were happy. 他們（那時）很開心。\n\n⚠️ be 動詞和一般動詞不能一起用：\nI am like coffee. ✗　→　I like coffee. ✓',
        front: 'I / he / you 各配哪個 be 動詞？',
        back: 'I am、he is、you are\nhe / she / it 配 is；you / we / they 配 are',
        quiz: { q: 'They ___ my friends.', options: ['am', 'is', 'are', 'be'], answer: 2 }
      },
      {
        id: 'b-be-past',
        front: 'be 動詞的過去式有哪兩個？',
        back: 'was / were\nI / he / she / it 用 was；you / we / they 用 were',
        quiz: { q: 'We ___ at school yesterday.', options: ['was', 'were', 'are', 'is'], answer: 1 }
      },
      {
        id: 'b-be-like',
        front: '「我喜歡咖啡」\nI am like coffee. 對嗎？',
        back: '不對 → I like coffee.\nbe 動詞和一般動詞不能放在一起',
        quiz: { q: '「我喜歡咖啡」哪一句對？', options: ['I am like coffee.', 'I like coffee.', 'I am likes coffee.', 'I liking coffee.'], answer: 1 }
      },
      {
        id: 'b-subject-verb',
        title: '主詞和動詞怎麼搭配',
        note: '主詞換了，動詞也要跟著變。現在式只要記住：he / she / it（一個別人或一樣東西）後面的動詞要變形。\n\n【be 動詞】\nI　am　我是\nyou / we / they　are　你是、我們是、他們是\nhe / she / it　is　他是、她是、它是\nGrace（一個人名）　is　Grace 是\n\n【do】\nI / you / we / they　do　做\nhe / she / it　does　做\n\n【have】\nI / you / we / they　have　有\nhe / she / it　has　有\n\n【go】\nI / you / we / they　go　去\nhe / she / it　goes　去\n\n【like、play（大部分動詞直接加 s）】\nI / you / we / they　like　play\nhe / she / it　likes　plays\n\n💡 be 動詞口訣（可以唱出來）：\nbe 動詞是個媽媽，她生了 3 個娃：am、is、are。\n我用 am，你用 are，is 跟著他、她、它；單數 is，複數 are。\n\n👉 一個人名（Grace、Tom）或一樣東西（my phone），就跟 he / she / it 一樣',
        front: 'She ___ (have) a cat.',
        back: 'has\nhe / she / it 配 has',
        quiz: { q: 'She ___ a cat.', options: ['have', 'has', 'haves', 'having'], answer: 1 }
      },
      {
        id: 'b-subject-verb-go',
        front: 'He ___ (go) to school by bus.',
        back: 'goes\nhe / she / it 後面，go 變 goes',
        quiz: { q: 'He ___ to school by bus.', options: ['go', 'goes', 'gos', 'going'], answer: 1 }
      },
      {
        id: 'b-subject-verb-name',
        front: 'Grace ___ my friend.\n人名要配哪個 be 動詞？',
        back: 'is\n一個人名就跟 she 一樣，用 is',
        quiz: { q: 'Grace ___ my friend.', options: ['am', 'is', 'are', 'be'], answer: 1 }
      },
      {
        id: 'b-pronoun',
        title: '代名詞 I / me / my / mine / myself',
        note: '同一個「我」，放在句子不同位置，形狀會變。\n\n【代名詞表】\n主格　受格　所有格　所有代名詞\nI　me　my　mine\nyou　you　your　yours\nhe　him　his　his\nshe　her　her　hers\nit　it　its　its\nwe　us　our　ours\nthey　them　their　theirs\n\n【反身代名詞：…自己】\nI　myself\nyou　yourself（一個人）／yourselves（多個人）\nhe　himself\nshe　herself\nit　itself\nwe　ourselves\nthey　themselves\n\n① 主格：放在動詞前面（誰做的）\n[She] loves cats. 她喜歡貓。\n\n② 受格：放在動詞或介係詞後面\nI love [her]. 我愛她。\nCome with [me]. 跟我來。\n\n③ 所有格：後面一定要接名詞\nThis is [my] book. 這是我的書。\n\n④ 所有代名詞：後面不接名詞\nThis book is [mine]. 這本書是我的。\n\n⑤ 反身代名詞：主詞和受詞是同一個人\nHe hurt [himself]. 他弄傷了自己。\nI made it [myself]. 我自己做的。\n\n⚠️ 收集的筆記寫「物主代詞後面一定要跟名詞」不完全對：my、your 這種（所有格）後面要接名詞；mine、yours 這種（所有代名詞）後面不接名詞\n⚠️ they 的所有代名詞是 theirs，不是 their。（收集的筆記「英語語法體系」這裡寫錯了）',
        front: 'I 的受格、所有格、所有代名詞？',
        back: 'me / my / mine\nShe loves me.／my book／It\'s mine.',
        quiz: { q: 'Can you help ___?', options: ['I', 'me', 'my', 'mine'], answer: 1 }
      },
      {
        id: 'b-pronoun-my-mine',
        front: 'This is ___ book.\nThis book is ___.\n各填 my 還是 mine？',
        back: 'my book（後面有名詞）\nThis book is mine.（後面沒有名詞）',
        quiz: { q: 'This book is ___.（這本書是我的）', options: ['I', 'me', 'my', 'mine'], answer: 3 }
      },
      {
        id: 'b-pronoun-they',
        front: 'they 的受格、所有格、所有代名詞？',
        back: 'them / their / theirs',
        quiz: { q: 'I met ___ yesterday.（我昨天遇到他們）', options: ['they', 'them', 'their', 'theirs'], answer: 1 }
      },
      {
        id: 'b-pronoun-self',
        front: 'he、she、they 的反身代名詞？\n（…自己）',
        back: 'himself、herself、themselves',
        quiz: { q: 'She looked at ___ in the mirror.（她照鏡子看自己）', options: ['her', 'hers', 'herself', 'himself'], answer: 2 }
      },
      {
        id: 'b-one-other',
        title: 'one、another、the other、others',
        note: '這幾個字都有「一個、另一個、其他」的意思，差別在「是不是特定的那個」和「總共有幾個」。\n\n① one 和 it\none：同一種東西裡的「任何一個」（不特定）\nI lost my pen. I need to buy [one].\n我的筆丟了，我要買一支。（隨便一支都可以）\nit：就是「那一個」（特定）\nI lost my pen. I can\'t find [it].\n我找不到它。（就是丟掉的那支）\n\n② another：（三個以上）再一個、另一個\nThis cup is dirty. Can I have [another]?\n這個杯子髒了，可以再給我一個嗎？\n\n③ the other：（總共只有兩個）另一個\nI have two cats. One is white, [the other] is black.\n我有兩隻貓，一隻是白的，另一隻是黑的。\n\n④ others：其他一些（不是全部）\nSome people like tea. [Others] like coffee.\n有些人喜歡茶，有些人喜歡咖啡。\n\n⑤ the others：剩下的全部\nI have five books. One is here. [The others] are at home.\n我有五本書，一本在這裡，其他的都在家。\n\n⑥ other + 名詞：其他的…\nDo you have [other] colors?\n你們有其他顏色嗎？\n\n👉 口訣：只有兩個 → the other；三個以上再一個 → another；剩下全部 → the others\n\n⚠️ 收集的筆記寫「one 指代特定的、已知的人或物」是錯的：特定的那個要用 it，one 是不特定的。（原本的截圖只拍到第一行，這則是重新整理的完整版）',
        front: 'I have two cats. One is white, ___ is black.\n要用 another 還是 the other？',
        back: 'the other\n總共只有兩個，剩下那一個用 the other',
        quiz: { q: 'I have two hands. One is clean, ___ is dirty.', options: ['another', 'the other', 'other', 'others'], answer: 1 }
      },
      {
        id: 'b-one-it',
        front: 'I lost my pen. I need to buy ___.\n用 one 還是 it？',
        back: 'one\n買「一支」（不特定）用 one；找回「那支」用 it',
        quiz: { q: 'This cup is dirty. Can I have ___?（再給我一個）', options: ['other', 'another', 'the other', 'others'], answer: 1 }
      },
      {
        id: 'b-neg-question',
        title: '否定句和問句',
        note: '要先看句子裡有沒有 be 動詞。\n\n① 有 be 動詞：直接改 be 動詞\nShe is a student.\n否定：She [is not] a student.（isn\'t）\n問句：[Is] she a student?（be 動詞搬到最前面）\n\n② 一般動詞：借 do / does / did 來幫忙\nI like coffee.\n否定：I [don\'t] like coffee.\n問句：[Do] you like coffee?\n\n③ 主詞是 he / she / it：用 does\nHe likes coffee.\n否定：He [doesn\'t] like coffee.\n問句：[Does] he like coffee?\n\n④ 過去式：用 did\nI went to Taipei.\n否定：I [didn\'t] go to Taipei.\n問句：[Did] you go to Taipei?\n\n⚠️ 用了 does / did，後面的動詞要變回原形：\nHe doesn\'t likes. ✗　→　He doesn\'t like. ✓\nDid you went? ✗　→　Did you go? ✓',
        front: 'He likes coffee.\n改成否定句和問句？',
        back: 'He doesn\'t like coffee.\nDoes he like coffee?\n（用了 does，likes 變回 like）',
        quiz: { q: 'She ___ like fish.（她不喜歡魚）', options: ['don\'t', 'doesn\'t', 'isn\'t', 'not'], answer: 1 }
      },
      {
        id: 'b-neg-did',
        front: 'I went to Taipei.\n改成否定句？',
        back: 'I didn\'t go to Taipei.\n用了 did，went 要變回原形 go',
        quiz: { q: '___ you go to work yesterday?', options: ['Do', 'Does', 'Did', 'Are'], answer: 2 }
      },
      {
        id: 'b-neg-be',
        front: 'She is a student.\n改成問句？',
        back: 'Is she a student?\n有 be 動詞 → 把 be 動詞搬到最前面',
        quiz: { q: '___ you tired?（你累了嗎）', options: ['Do', 'Does', 'Are', 'Is'], answer: 2 }
      },
      {
        id: 'b-q-start',
        title: '問句開頭：用 be 動詞、助動詞，還是情態動詞？',
        note: '把句子改成 Yes / No 問句時，先看句子裡有什麼動詞。\n\n【三種開頭】\nbe 動詞　am、is、are\n助動詞　do、does（過去用 did）\n情態動詞　can、may、must、will、should\n\n💡 萬能口訣：\n有動詞原形，用助動詞！\n沒有動詞原形，用 be 動詞！\n有情態動詞，往前搬！\n\n① 有動詞原形（like）→ 用 do / does\n[Do] you like apples?\n你喜歡蘋果嗎？（you 是第二人稱，用 do）\n\n② 沒有動詞原形（happy 是形容詞）→ 用 be 動詞\n[Is] he happy?\n他開心嗎？（he 是第三人稱，用 is）\n\n③ 有情態動詞（can）→ 把 can 搬到最前面\nShe can dance. → [Can] she dance?\n她會跳舞嗎？',
        front: 'She can dance.\n改成問句？',
        back: 'Can she dance?\n有情態動詞 → 直接搬到最前面',
        quiz: { q: '___ he happy?（他開心嗎）', options: ['Do', 'Does', 'Is', 'Can'], answer: 2 }
      },
      {
        id: 'b-q-start-do',
        front: '___ you like apples?\n用 Do 還是 Are？',
        back: 'Do\n句子裡有動詞原形 like → 用助動詞 do',
        quiz: { q: '___ you like apples?', options: ['Do', 'Are', 'Is', 'Does'], answer: 0 }
      },
      {
        id: 'b-imperative-neg',
        title: '否定祈使句：Don\'t + 原形、No + V-ing',
        note: '祈使句就是「叫別人做（或不要做）某件事」的句子，前面沒有主詞。\n\n💡 口訣：\nDon\'t ＋ 動詞原形\nNo ＋ 動詞 ing\n\n① 不要在這裡停車\n[Don\'t] park your car here.\n[No] parking here.\n\n② 禁止吸菸\n[Don\'t] smoke here.\n[No] smoking here.\n\n💡 Don\'t… 是對人說話；No + V-ing 常出現在告示牌上（No smoking、No parking）\n\n⚠️ 收集的筆記寫成 Dont，少了一撇，正確是 Don\'t（do not 的縮寫）',
        front: '「禁止吸菸」的告示牌怎麼寫？',
        back: 'No smoking.\nNo ＋ 動詞 ing；也可以說 Don\'t smoke here.',
        quiz: { q: '「不要在這裡停車」哪一句對？', options: ['Don\'t parking here.', 'No park here.', 'Don\'t park here.', 'Not park here.'], answer: 2 }
      },
      {
        id: 'b-imperative-neg-2',
        front: 'Don\'t ___ (smoke) here.\nNo ___ (smoke) here.',
        back: 'Don\'t smoke here.\nNo smoking here.',
        quiz: { q: 'No ___ here.', options: ['smoke', 'smoking', 'smoked', 'to smoke'], answer: 1 }
      },
      {
        id: 'b-contractions',
        title: '常用縮寫（I\'m、don\'t、let\'s…）',
        note: '口語和考試很常見。規律：省略的字母用一撇 \' 代替。\n\n【規律】\nam　\'m\nis　\'s\nare　\'re\nnot　n\'t\nwill　\'ll\nus　\'s（只有 let\'s）\n\n【be 動詞】\nI am　I\'m\nyou are　you\'re\nhe is　he\'s\nshe is　she\'s\nit is　it\'s\nwe are　we\'re\nthey are　they\'re\nthere is　there\'s\nthat is　that\'s\n\n【否定】\ncannot　can\'t\ncould not　couldn\'t\ndo not　don\'t\ndoes not　doesn\'t\ndid not　didn\'t\nis not　isn\'t\nare not　aren\'t\nwas not　wasn\'t\nwere not　weren\'t\nwill not　won\'t\n\n【其他】\nI will　I\'ll\nwe will　we\'ll\nwhat is　what\'s\nwho is　who\'s\nwhere is　where\'s\nwhen is　when\'s\nlet us　let\'s\n\n⚠️ 特別注意：will not 縮寫是 won\'t，不是 willn\'t\n⚠️ 收集的筆記有錯：You are = He\'s 寫錯了，正確是 You\'re\n💡 「不能」寫成一個字 cannot 比較正確（can not 也看得到，但 cannot 較常用）\n💡 it\'s（it is）和 its（它的）不一樣！',
        front: 'will not 的縮寫是？',
        back: 'won\'t\n不是 willn\'t',
        quiz: { q: 'You are = ?', options: ['He\'s', 'You\'re', 'Your', 'You\'s'], answer: 1 }
      },
      {
        id: 'b-contractions-its',
        front: 'it\'s 和 its 差在哪？',
        back: 'it\'s ＝ it is（它是）\nits ＝ 它的（所有格，沒有一撇）',
        quiz: { q: 'Let us go! = ?', options: ['Let\'s go!', 'Lets go!', 'Let\'us go!', 'Let go!'], answer: 0 }
      },
      {
        id: 'b-article',
        title: '冠詞 a / an / the',
        note: '① a 和 an：「一個」，第一次提到、不特定的東西\n看後面單字的「發音」，不是看字母：\n母音的音開頭 → an：an apple、an egg、an hour（h 不發音）\n子音的音開頭 → a：a book、a car、a university（u 念 you）\n\n② the：「那個」，雙方都知道是哪一個\nI bought [a] book. [The] book is great.\n第一次提到用 a，第二次提到用 the。\n\n③ 一定要用 the 的情況\n世界上只有一個的：the sun、the moon\n樂器：play the piano\n最高級：the best、the biggest\n\n④ 不用冠詞的情況\n三餐：have breakfast\n運動：play basketball\n複數泛指：I like cats.（喜歡貓這種動物）',
        front: '___ hour、___ university\n各用 a 還是 an？',
        back: 'an hour、a university\n看「發音」：hour 開頭是母音的音，university 開頭念 you',
        quiz: { q: 'I waited for ___ hour.', options: ['a', 'an', 'the', '不用加'], answer: 1 }
      },
      {
        id: 'b-article-the',
        front: 'I bought a book. ___ book is great.\n第二次提到要用什麼？',
        back: 'The\n第一次提到用 a，第二次提到用 the',
        quiz: { q: 'I bought a book. ___ book is great.', options: ['A', 'An', 'The', '不用加'], answer: 2 }
      },
      {
        id: 'b-article-none',
        front: 'play basketball 還是 play the basketball？\nplay piano 還是 play the piano？',
        back: 'play basketball（運動不加）\nplay the piano（樂器要加 the）',
        quiz: { q: 'She plays ___ piano every day.', options: ['a', 'an', 'the', '不用加'], answer: 2 }
      },
      {
        id: 'b-plural',
        title: '名詞單複數、可數／不可數',
        note: '① 可數名詞：可以一個一個數\n一個用 a / an：a cat\n兩個以上加 s：two cats\n\n② 加 s 的規則\n一般：加 s　book → books\ns, sh, ch, x, o 結尾：加 es　bus → buses、box → boxes、potato → potatoes\n子音 + y 結尾：y 變 i 加 es　baby → babies\nf / fe 結尾：變 ves　knife → knives\n💡 o 結尾有例外：photo → photos、piano → pianos 只加 s\n\n【不規則，要背】\nman　men\nwoman　women\nchild　children\nfoot　feet\ntooth　teeth\nmouse　mice\nfish　fish（單複數一樣）\n\n③ 不可數名詞：不能直接數，不加 s，不用 a\nwater、milk、rice、money、bread、information、advice\n要數的話用單位：a glass of water、a piece of bread\n\n④ many 和 much\nmany + 可數：many books\nmuch + 不可數：much water\na lot of 兩種都可以',
        front: 'child、foot、tooth 的複數？',
        back: 'children、feet、teeth\n不規則複數，要背',
        quiz: { q: 'There are three ___ in the park.', options: ['child', 'childs', 'children', 'childrens'], answer: 2 }
      },
      {
        id: 'b-plural-uncount',
        front: '「一杯水」怎麼說？\n可以說 a water 嗎？',
        back: 'a glass of water\nwater 不可數，要用單位來數',
        quiz: { q: 'How ___ money do you have?', options: ['many', 'much', 'a', 'any of'], answer: 1 }
      },
      {
        id: 'b-plural-es',
        front: 'box、baby、knife 的複數？',
        back: 'boxes、babies、knives\nx 結尾加 es；子音 + y 變 ies；f / fe 變 ves',
        quiz: { q: 'baby 的複數是？', options: ['babys', 'babies', 'babyes', 'baby'], answer: 1 }
      },
      {
        id: 'b-in-on-at',
        title: '介係詞 in / on / at',
        note: '範圍：in 最大 → on 中間 → at 最小、最精準\n\n【時間】\nin　月、年、季節、早上下午晚上\non　星期幾、日期、特定的某一天\nat　幾點、中午、晚上（night）\n\n① 時間的例子\nin July、in 2025、in summer、in the morning\non Monday、on May 5th、on my birthday\nat 7 o\'clock、at noon、at night\n\n【地點】\nin　在裡面、大地方（城市、國家）\non　在表面上、在街道上\nat　在某個點、某個地址\n\n② 地點的例子\nin the box、in Taipei、in Taiwan\non the table、on the wall、on Main Street\nat the door、at the bus stop、at home、at work\n\n👉 口訣：in 大範圍、on 某一天／表面、at 一個點',
        front: '___ Monday、___ July、___ 7 o\'clock\n各用 in / on / at？',
        back: 'on Monday、in July、at 7 o\'clock\n星期幾 on；月份 in；幾點 at',
        quiz: { q: 'I was born ___ 1995.', options: ['in', 'on', 'at', 'to'], answer: 0 }
      },
      {
        id: 'b-in-on-at-day',
        front: '___ my birthday\n用 in / on / at？',
        back: 'on my birthday\n特定的某一天用 on',
        quiz: { q: 'See you ___ Friday!', options: ['in', 'on', 'at', 'to'], answer: 1 }
      },
      {
        id: 'b-in-on-at-place',
        front: 'The book is ___ the table.\nI live ___ Taipei.',
        back: 'on the table（在表面上）\nin Taipei（城市用 in）',
        quiz: { q: 'I\'m waiting ___ the bus stop.', options: ['in', 'on', 'at', 'to'], answer: 2 }
      },
      {
        id: 'b-in-on-at-time',
        front: '___ night、___ the morning\n用 in 還是 at？',
        back: 'at night\nin the morning（afternoon、evening 也用 in）',
        quiz: { q: 'I usually read ___ night.', options: ['in', 'on', 'at', 'to'], answer: 2 }
      },
      {
        id: 'b-wh',
        title: '疑問詞 what / where / when / who / why / how',
        note: '要問「具體的東西」時，疑問詞放在句子最前面。\n\n【六大疑問詞】\nwhat　什麼\nwhere　哪裡\nwhen　什麼時候\nwho　誰\nwhy　為什麼\nhow　怎麼、如何\n\n【其他常用】\nwhich　哪一個\nwhose　誰的\nhow much　多少錢、多少（不可數）\nhow many　多少個（可數）\nhow old　幾歲\nhow long　多久、多長\nhow tall　多高（身高）\nhow heavy　多重\nhow big　多大\nhow often　多常（頻率）\nwhat color　什麼顏色\nwhat time　幾點\nwhat day　星期幾\n\n① 句型：疑問詞 + 一般問句\nWhere [do you live]? 你住在哪裡？\nWhat [is your name]? 你叫什麼名字？\nWhy [are you late]? 你為什麼遲到？\nHow much [is this]? 這個多少錢？\n\n② 回答 why 用 because\nWhy are you late? → Because I missed the bus.',
        front: '「這個多少錢？」英文怎麼說？',
        back: 'How much is this?\nhow much ＝ 多少錢',
        quiz: { q: '___ do you live?（你住哪裡）', options: ['What', 'Where', 'When', 'Who'], answer: 1 }
      },
      {
        id: 'b-wh-why',
        front: 'Why are you late?\n要用什麼開頭回答？',
        back: 'Because…\nBecause I missed the bus.',
        quiz: { q: '___ are you late? — Because I missed the bus.', options: ['What', 'How', 'Why', 'When'], answer: 2 }
      },
      {
        id: 'b-wh-how-many',
        front: 'how much 和 how many 差在哪？',
        back: 'how many + 可數（幾個）\nhow much + 不可數、問價錢',
        quiz: { q: '___ brothers do you have?', options: ['How much', 'How many', 'How old', 'How long'], answer: 1 }
      },
      {
        id: 'b-wh-often',
        front: '「你多常運動？」\n要用 how 的哪一個？',
        back: 'How often do you exercise?\nhow often ＝ 多常（回答：twice a week）',
        quiz: { q: 'How ___ do you exercise? — Twice a week.', options: ['often', 'long', 'many', 'much'], answer: 0 }
      },
      {
        id: 'b-wh-what-day',
        front: 'what time 和 what day 差在哪？',
        back: 'what time：幾點（It\'s 3 o\'clock.）\nwhat day：星期幾（It\'s Monday.）',
        quiz: { q: '___ is it today? — It\'s Friday.', options: ['What time', 'What day', 'What color', 'How often'], answer: 1 }
      },
      {
        id: 'b-tenses5',
        title: '⭐ 最常用的 5 個時態',
        note: '「16 大時態」裡，日常生活最常用的只有這 5 個，先學會就夠用了。\n\n① 現在簡單式　do / does\n習慣、事實、每天都做的事\nI drink coffee every day.\n看到：every day、always、usually、often\n\n② 現在進行式　am / is / are + doing\n現在正在做的事\nI am drinking coffee now.\n看到：now、right now、Look!、Listen!\n\n③ 過去簡單式　did\n過去發生、已經結束的事\nI drank coffee yesterday.\n看到：yesterday、last week、ago、in 2020\n\n④ 未來式　will do / be going to do\n將來要做的事\nI will drink coffee tomorrow.\n看到：tomorrow、next week、soon\n\n⑤ 現在完成式　have / has + done\n過去做了，跟現在有關係；或從過去持續到現在\nI have drunk coffee already.\nI have lived here for 5 years.\n看到：already、yet、ever、never、for、since\n\n💡 其他 11 個時態可以之後再看「16 大時態」分類。\n💡 台灣課本叫「現在簡單式」，大陸叫「一般現在時」，是同一個東西。',
        front: '日常最常用的 5 個時態是？',
        back: '現在簡單式、現在進行式、過去簡單式\n未來式、現在完成式',
        quiz: { q: 'I ___ here for 5 years.（住了五年，現在還住）', options: ['live', 'lived', 'have lived', 'will live'], answer: 2 }
      },
      {
        id: 'b-tenses5-now',
        front: 'I drink coffee every day.\nI am drinking coffee now.\n差在哪？',
        back: '第一句：每天的習慣（現在簡單式）\n第二句：現在正在喝（現在進行式）',
        quiz: { q: 'Be quiet! The baby ___.', options: ['sleeps', 'is sleeping', 'slept', 'has slept'], answer: 1 }
      },
      {
        id: 'b-irregular',
        title: '不規則動詞表（50 個最常用）',
        note: '大部分動詞的過去式加 ed 就好（play → played），但下面這些常用動詞是不規則的，要背。\n\n過去式：用在過去簡單式（I went）\n過去分詞：用在完成式、被動語態（I have gone、It was broken）\n\n原形　過去式　過去分詞　中文\n' +
          IRREGULAR.map(v => v.join('　')).join('\n') +
          '\n\n💡 背的小技巧：三個都一樣（put、cut、let、hit、cost）最好背，先背這組。'
      },
      ...IRREGULAR.map(([base, past, pp, zh]) => ({
        id: 'irr-' + base, group: 'irregular', say: `${base}, ${past}, ${pp}`,
        front: `${base}（${zh.replace(/（.*）/, '')}）\n過去式、過去分詞？`,
        back: `${past} → ${pp}`
      })),
      {
        id: 'b-modal',
        title: '助動詞 can / must / should / will / may',
        note: '助動詞放在動詞前面，增加「能、必須、應該」等意思。\n\n【常用助動詞】\ncan　能、會、可以\ncould　能（過去）、可以嗎（比較客氣）\nmust　必須（語氣很強）\nshould　應該（建議）\nwill　將會、願意\nmay　可能、可以\n\n① 規則：助動詞後面一定接動詞原形\nShe can [swim]. ✓\nShe can swims. ✗\nShe can to swim. ✗\n\n② 否定：直接在後面加 not\ncan\'t、mustn\'t、shouldn\'t、won\'t（＝ will not）\n\n③ 問句：助動詞搬到最前面\n[Can] you help me? 你可以幫我嗎？\n[Should] I go? 我應該去嗎？\n\n④ have to 和 must 都是「必須」\nI have to work tomorrow. 我明天得上班。\n⚠️ 但 don\'t have to ＝ 不必；mustn\'t ＝ 不准\nYou don\'t have to come.（不用來）\nYou mustn\'t smoke here.（禁止抽菸）',
        front: 'She can ___ (swim).\n要不要變化？',
        back: 'swim\n助動詞後面一定接原形，不加 s、不加 to',
        quiz: { q: 'He can ___ English very well.', options: ['speak', 'speaks', 'to speak', 'speaking'], answer: 0 }
      },
      {
        id: 'b-modal-should',
        front: '「你應該多休息」\n用 must 還是 should？',
        back: 'You should rest more.\nshould ＝ 建議；must 語氣太強',
        quiz: { q: 'You look tired. You ___ go to bed early.', options: ['should', 'mustn\'t', 'can\'t', 'won\'t'], answer: 0 }
      },
      {
        id: 'b-modal-dont-have-to',
        front: 'don\'t have to 和 mustn\'t 差在哪？',
        back: 'don\'t have to ＝ 不必（可以不做）\nmustn\'t ＝ 不准、禁止',
        quiz: { q: 'You ___ smoke here.（這裡禁止抽菸）', options: ['don\'t have to', 'mustn\'t', 'should', 'can'], answer: 1 }
      },
      {
        id: 'b-there-is',
        title: 'There is / There are（某個地方有…）',
        note: '要說「某個地方有某樣東西」時用 there is / are，不是用 have。\n\n① 看後面的東西是單數還是複數\nThere [is] a cat on the sofa. 沙發上有一隻貓。\nThere [are] two cats on the sofa. 沙發上有兩隻貓。\nThere [is] some water in the bottle.（不可數用 is）\n\n② 過去式\nThere was a party last night.\nThere were many people.\n\n③ 否定和問句\nThere isn\'t a bank near here. 這附近沒有銀行。\n[Is there] a bank near here? 這附近有銀行嗎？\n[Are there] any questions? 有任何問題嗎？\n\n⚠️ 中文的「有」不一定用 have：\n桌上有一本書 → There is a book on the table. ✓\n　　　　　　　 → The table has a book. ✗（不自然）',
        front: 'There ___ two cats on the sofa.\n用 is 還是 are？',
        back: 'are\n後面是複數（two cats）用 are',
        quiz: { q: 'There ___ a bank near my house.', options: ['is', 'are', 'have', 'has'], answer: 0 }
      },
      {
        id: 'b-there-question',
        front: '「這附近有銀行嗎？」英文怎麼說？',
        back: 'Is there a bank near here?\n把 is 搬到 there 前面',
        quiz: { q: '___ any questions?（有任何問題嗎）', options: ['Is there', 'Are there', 'Have', 'Do there'], answer: 1 }
      },
      {
        id: 'b-comparison',
        title: '形容詞比較級和最高級',
        note: '比較兩個用「比較級」，三個以上選最…用「最高級」。\n\n① 短的形容詞：加 er / est\ntall　taller　the tallest\nbig　bigger　the biggest\nhappy　happier　the happiest\n注意：big 要重複字尾的 g；happy 的 y 變 i\n\n② 長的形容詞（兩個音節以上）：加 more / most\nbeautiful　more beautiful　the most beautiful\nexpensive　more expensive　the most expensive\n\n③ 不規則，要背\ngood　better　the best\nbad　worse　the worst\nmany / much　more　the most\nlittle　less　the least\nfar　farther　the farthest\n\n④ 比較級 + than：比…更\nTom is [taller than] me.\n湯姆比我高。\n\n⑤ the + 最高級：最…\nHe is [the tallest] in our class.\n他是我們班最高的。\n\n⑥ as + 形容詞 + as：跟…一樣\nI am [as tall as] you.\n我跟你一樣高。',
        front: 'good、bad 的比較級和最高級？',
        back: 'good → better → the best\nbad → worse → the worst',
        quiz: { q: 'This phone is ___ than that one.', options: ['gooder', 'better', 'best', 'more good'], answer: 1 }
      },
      {
        id: 'b-comparison-more',
        front: 'beautiful 的比較級？\nbeautifuler 對嗎？',
        back: 'more beautiful\n長的形容詞用 more / most',
        quiz: { q: 'She is ___ than her sister.', options: ['beautifuler', 'more beautiful', 'most beautiful', 'beautifulest'], answer: 1 }
      },
      {
        id: 'b-comparison-big',
        front: 'big 的比較級和最高級？',
        back: 'bigger → the biggest\n短母音 + 子音結尾，重複最後一個字母',
        quiz: { q: 'This is ___ room in the hotel.', options: ['big', 'bigger', 'the biggest', 'the most big'], answer: 2 }
      }
    ]
  },

  // ===================== to 的用法 =====================
  {
    id: 'to',
    name: 'to 的用法',
    icon: '🎯', color: '#e8833a', desc: 'to 後面接什麼、怎麼用',
    items: [
      {
        id: 'to-overview',
        title: 'to 的三種用法（總覽）',
        note: 'to 有兩種身分：介係詞 to、不定詞的 to。\n\n① 介係詞 to ＋ 名詞／代名詞\n　去哪裡、交給誰、指向什麼對象\n　例：go to school\n\n② 不定詞 to ＋ 動詞原形\n　想做什麼、讓誰做、為什麼做、結果如何\n　例：want to learn\n\n③ 介係詞 to 也能接 doing\n　期待、習慣、反對後面說的事情\n　例：look forward to learning\n\n👉 to 的用法要連著前後一起看，後面是原形還是 doing，放進完整片語裡分清楚。',
        front: 'to 後面可以接哪三種東西？',
        back: '① 名詞／代名詞：go to school\n② 動詞原形：want to learn\n③ doing：look forward to learning',
        quiz: { q: 'I\'m looking forward to ___ you.', options: ['see', 'seeing', 'saw', 'seen'], answer: 1 }
      },
      {
        id: 'to-want-learn',
        front: 'I want to ___ (learn) English.\n不定詞 to 後面接什麼？',
        back: 'learn（動詞原形）\n不定詞 to ＋ 動詞原形',
        quiz: { q: 'I want to ___ English.', options: ['learn', 'learning', 'learned', 'learns'], answer: 0 }
      },
      {
        id: 'to-direction',
        title: '把 to 看成箭頭：它指向哪裡？',
        note: '去向、接收者、交流對象，都可以畫出清楚的箭頭。\n\n① 去向：人走向一個地方\n　She walked to the station.\n　她走路去了車站。（she → the station）\n\n② 接收者：東西交給一個人\n　I handed the ticket to Anna.\n　我把票遞給了安娜。（the ticket → Anna）\n\n③ 交流對象：訊息傳給誰\n　He explained the rule to me.\n　他向我解釋了這條規則。（the rule → me）\n\n👉 to 指出目標，不保證動作已經完成。\n　on the way to the station ＝ 在去車站的路上',
        front: 'I handed the ticket to Anna.\n這裡的 to 表示什麼？',
        back: '接收者\n東西交給一個人（the ticket → Anna）',
        quiz: { q: 'He explained the rule ___ me.', options: ['to', 'at', 'in', 'on'], answer: 0 }
      },
      {
        id: 'to-do-roles',
        title: '同樣是 to do，放進句子後作用不同',
        note: '「做某件事」可以被討論、被補充，也可以用來交代目的。\n\n① 當主詞：哪件事需要勇氣？\n　[To travel alone] takes courage.\n　獨自旅行需要勇氣。「獨自旅行」整個當主詞。\n\n② 當受詞：想做什麼？\n　I want [to learn Spanish].\n　我想學西班牙語。說清楚 want 的內容。\n\n③ 當主詞補語（表語）：目標是什麼？\n　My goal is [to finish the course].\n　我的目標是完成課程。說清楚 goal 的內容。\n\n④ 當形容詞（定語）：有什麼事要做？\n　I have two emails [to answer].\n　我有兩封郵件要回覆。to answer 修飾 emails。\n\n⑤ 當受詞補語：讓誰做什麼？\n　The teacher asked us [to wait].\n　老師讓我們等候。做 wait 這個動作的是 us。\n\n⑥ 表示目的：為什麼打開窗戶？\n　I opened the window [to let some air in].\n　我打開窗戶通風。交代開窗的目的。\n\n👉 同一個形式，要看清楚它在這一句裡說明什麼。'
      },
      {
        id: 'to-role-subject',
        front: '[To travel alone] takes courage.\n括號裡的 to do 當什麼？',
        back: '主詞\n獨自旅行需要勇氣。「獨自旅行」整個當主詞'
      },
      {
        id: 'to-role-object',
        front: 'I want [to learn Spanish].\n括號裡的 to do 當什麼？',
        back: '受詞\n我想學西班牙語。說清楚 want 的內容'
      },
      {
        id: 'to-role-complement',
        front: 'My goal is [to finish the course].\n括號裡的 to do 當什麼？',
        back: '主詞補語（表語）\n我的目標是完成課程。說清楚 goal 的內容'
      },
      {
        id: 'to-role-attributive',
        front: 'I have two emails [to answer].\n括號裡的 to do 當什麼？',
        back: '形容詞（修飾前面的名詞）\n我有兩封郵件要回覆。to answer 修飾 emails'
      },
      {
        id: 'to-role-obj-complement',
        front: 'The teacher asked us [to wait].\n括號裡的 to do 當什麼？',
        back: '受詞補語\n老師讓我們等候。做 wait 的是 us'
      },
      {
        id: 'to-role-purpose',
        front: 'I opened the window [to let some air in].\n括號裡的 to do 當什麼？',
        back: '表示目的\n我打開窗戶「為了」通風'
      },
      {
        id: 'to-endpoint',
        title: '「到」一個地方，也能「到」時間和結果',
        note: '地方、時間、數字、狀態，都可以成為一個終點。\n\n① 時間範圍：從幾點，到幾點？\n　The shop is open from 9 a.m. to 6 p.m.\n　營業時間：從上午 9 點一直到下午 6 點\n\n② 數值終點：升到多少？\n　The temperature rose to 35°C.\n　溫度升到了 35 度。to 後面是達到的數值。\n\n③ 結果狀態：最後變成什麼樣？\n　He tore the photo to pieces.\n　他把照片撕成了碎片。\n\n④ 差多少到整點：ten to nine\n　It\'s ten to nine. ＝ 8:50\n　距離九點還差十分鐘，所以是八點五十分。\n\n👉 讀 to 後面的內容，就知道終點落在哪裡。',
        front: 'It\'s ten to nine. 是幾點？',
        back: '8:50\n距離九點還差十分鐘',
        quiz: { q: 'It\'s ten to nine. 是幾點？', options: ['9:10', '8:50', '10:09', '9:00'], answer: 1 }
      },
      {
        id: 'to-endpoint-result',
        front: 'He tore the photo to pieces.\n這裡的 to 表示什麼？',
        back: '結果狀態\n他把照片撕成了碎片（最後變成什麼樣）'
      },
      {
        id: 'to-relation',
        title: '沒有東西在移動，to 也能把關係連起來',
        note: '對應、連接、比較，以及人的看法，都要放回句子裡讀。\n\n① 對應與連接：兩樣東西有什麼關係？\n　The answer to this question is simple.\n　Attach the label to the box.\n　答案對應這個問題；標籤貼到這個盒子上。\n\n② 比較：to 後面是拿來比較的對象\n　This bag is similar to mine. 這個包和我的相似。\n　I prefer tea to coffee. 比起咖啡，我更喜歡茶。\n\n③ 其他\n　To me, the plan sounds reasonable.\n　在我看來，這個計畫聽起來合理。\n　To our surprise, the shop was still open.\n　令我們吃驚的是，商店還開著。\n　The children danced to the music.\n　孩子們隨著音樂跳舞。',
        front: 'I prefer tea to coffee.\n比較喜歡哪一個？',
        back: '茶（tea）\nprefer A to B ＝ 比起 B 更喜歡 A',
        quiz: { q: 'I prefer tea to coffee. 意思是？', options: ['比起咖啡，更喜歡茶', '比起茶，更喜歡咖啡', '茶和咖啡都喜歡', '把茶加進咖啡'], answer: 0 }
      },
      {
        id: 'to-opinion',
        front: 'To me, the plan sounds reasonable.\nTo me 是什麼意思？',
        back: '在我看來\n在我看來，這個計畫聽起來合理'
      },
      {
        id: 'to-purpose-reason-result',
        title: 'to do 說明的，不一定都是「為了做」',
        note: '目的、原因和結果，可以用三組句子分清楚。\n\n① 目的：為了後面的事，做前面的事\n　She called me to ask for help.\n　她打電話給我求助。打電話是動作，求助是目的。\n\n② 原因：後面的事情，引起前面的感受\n　I was relieved to hear the news.\n　聽到這個消息，我鬆了一口氣。\n\n③ 意外結果：做完前面的事，結果卻……\n　He returned to the office, only to find it locked.\n　他回到辦公室，卻發現門鎖了。only to 帶出意外的情況。\n\n④ too… to／enough to\n　The box is too heavy for me to lift.\n　箱子太重，我搬不動。\n　She is tall enough to reach the shelf.\n　她夠高，能搆到架子。\n\n💡 目的也可以用 in order to／so as to；\n　否定是 in order not to／so as not to。'
      },
      {
        id: 'to-reason',
        front: 'I was relieved to hear the news.\nto hear 表示什麼？',
        back: '原因\n聽到消息，才有了「鬆一口氣」的感受'
      },
      {
        id: 'to-only-to',
        front: 'He returned to the office, only to find it locked.\nonly to 表示什麼？',
        back: '意外結果\n他回到辦公室，「卻」發現門鎖了'
      },
      {
        id: 'to-too-to',
        front: 'The box is too heavy for me to lift.\n意思是？',
        back: '箱子太重，我搬不動\ntoo… to ＝ 太…而不能',
        quiz: { q: 'The box is too heavy for me to lift. 意思是？', options: ['箱子很輕，我搬得動', '箱子太重，我搬不動', '我要去搬箱子', '箱子是我的'], answer: 1 }
      },
      {
        id: 'to-for-of-wh',
        title: '誰來做、做什麼，to do 前面也能說明',
        note: 'for／of 和疑問詞，都在幫我們把意思交代完整。\n\n① for me：誰來做\n　It is difficult for me to lift this box.\n　對我來說，搬起這個箱子很難。\n　for me 點出誰來做；difficult 評價「搬箱子」這件事。\n\n② of you：評價做出這個行為的人\n　It was kind of you to lend me your notes.\n　你把筆記借給我，真是太好了。\n　kind 是在評價「你」這個人很友善。\n\n③ 疑問詞 + to do：把具體問題說出來\n　I don\'t know what to write.（寫什麼？）\n　She showed me how to use the printer.（怎麼用？）\n　We haven\'t decided whether to go.（要不要去？）\n　同類還有：where to go、when to start、who to ask',
        front: 'It was kind ___ you to help me.\n要用 for 還是 of？',
        back: 'of\nkind 是在評價「人」，用 of',
        quiz: { q: 'It was kind ___ you to help me.', options: ['for', 'of', 'to', 'with'], answer: 1 }
      },
      {
        id: 'to-for-me',
        front: 'It is difficult ___ me to lift this box.\n要用 for 還是 of？',
        back: 'for\ndifficult 是在評價「事情」，用 for 點出誰來做',
        quiz: { q: 'It is difficult ___ me to lift this box.', options: ['for', 'of', 'to', 'at'], answer: 0 }
      },
      {
        id: 'to-wh',
        front: 'She showed me ___ to use the printer.\n（她教我怎麼用印表機）',
        back: 'how\n疑問詞 + to do：how to use',
        quiz: { q: 'I don\'t know ___ to write.（不知道要寫什麼）', options: ['what', 'how', 'who', 'where'], answer: 0 }
      },
      {
        id: 'to-forms',
        title: 'to 後面，為什麼還有 be、have 和分詞？',
        note: '不定詞裡，to 後面第一個動詞用原形，後面再繼續補資訊。\n\n① to do：說明當下的情況\n　He seems to know the answer. 他看起來知道答案。\n\n② to be doing：動作正在發生\n　He seems to be working upstairs. 他看起來正在樓上工作。\n\n③ to have done：動作比句子的時間更早\n　He seems to have left. 他好像已經走了。\n\n④ to be done：被動（承受動作）\n　I hope to be invited. 我希望受到邀請。\n\n⑤ to have been done：之前就已經被…\n　He is said to have been invited. 據說他已經受到邀請了。\n\n⑥ not to do：否定後面的動作\n　She decided not to reply. 她決定不回覆。\n\n⑦ to have been doing：之前一直在做\n　He seems to have been working all night. 他看起來已經工作了一整夜。',
        front: 'He seems to have left.\nto have done 表示什麼？',
        back: '動作比較早發生\n他「好像已經」走了',
        quiz: { q: 'I hope ___.（我希望被邀請）', options: ['to invite', 'to be invited', 'inviting', 'to have invite'], answer: 1 }
      },
      {
        id: 'to-not-to',
        front: '「她決定不回覆」英文怎麼說？\nnot 要放哪裡？',
        back: 'She decided not to reply.\nnot 放在 to 前面',
        quiz: { q: 'She decided ___ reply.（決定不回覆）', options: ['to not', 'not to', 'don\'t to', 'no to'], answer: 1 }
      },
      {
        id: 'to-plus-doing',
        title: '這些片語裡的 to，後面接 doing',
        note: '這一組的 to 是介係詞，後面的動詞要用 doing。\n\n① object to：反對\n　I object to working on Sundays. 我反對週日工作。\n② stick to：堅持\n　She sticks to practicing every morning. 她堅持每天早上練習。\n③ devote… to：把時間、精力投入\n　He devotes his time to helping older people. 他把時間投入幫助老人。\n④ contribute to：有助於、促成\n　Practice contributes to improving your skills. 練習有助於提高技能。\n⑤ pay attention to：注意\n　Pay attention to spelling these words correctly. 注意把這些單字拼對。\n⑥ the key to：…的關鍵\n　Practice is the key to improving pronunciation. 練習是改善發音的關鍵。\n\n（前面學過的 look forward to、be used to 也是這一類）',
        front: '哪些片語的 to 後面要接 doing？',
        back: 'object to、stick to、devote… to\ncontribute to、pay attention to、the key to\nlook forward to、be used to',
        quiz: { q: 'Practice is the key to ___ your English.', options: ['improve', 'improving', 'improved', 'improves'], answer: 1 }
      },
      {
        id: 'to-object-to',
        front: 'I object to ___ (work) on Sundays.',
        back: 'working\nobject to 的 to 是介係詞，接 doing',
        quiz: { q: 'I object to ___ on Sundays.', options: ['work', 'working', 'worked', 'works'], answer: 1 }
      },
      {
        id: 'used-to',
        title: 'used to 的三種意思',
        note: '過去的習慣、已經習慣、被用來做，要連著整組結構看。\n\n① used to do：過去常常做（現在不做了）\n　I used to work at night. 我以前常在晚上工作。\n\n② be used to doing：已經習慣\n　I\'m used to working at night. 我已經習慣晚上工作。\n　這裡的 to 是介係詞，所以接 doing。\n\n③ be used to do：被用來做\n　This room is used to store old books. 這個房間被用來放舊書。\n　used 來自 use（使用）；to store 交代用途。\n\n💡 get used to doing：漸漸習慣（變得習慣的過程）\n　I\'m getting used to working at night.\n💡 過去習慣的否定：didn\'t use to do',
        front: 'used to do 和 be used to doing\n差在哪裡？',
        back: 'used to do ＝ 以前常常做（現在不做了）\nbe used to doing ＝ 已經習慣做'
      },
      {
        id: 'used-to-habit',
        front: 'I ___ work at night.（我以前常在晚上工作，現在不會了）',
        back: 'used to\nused to do ＝ 過去的習慣',
        quiz: { q: 'I ___ work at night.（以前常常，現在不會了）', options: ['used to', 'am used to', 'was used to', 'get used to'], answer: 0 }
      },
      {
        id: 'used-to-accustomed',
        front: 'I\'m used to ___ (work) at night.\n（我已經習慣晚上工作）',
        back: 'working\nbe used to 的 to 是介係詞，接 doing',
        quiz: { q: 'I\'m used to ___ at night.（已經習慣）', options: ['work', 'working', 'worked', 'works'], answer: 1 }
      },
      {
        id: 'used-to-purpose',
        front: 'This room is used to store old books.\n意思是？',
        back: '這個房間被用來放舊書\nbe used to do ＝ 被用來做'
      },
      {
        id: 'no-to',
        title: '有些結構裡，動詞前面不加 to',
        note: '能不能加 to，要看它跟前面的字組成什麼結構。\n\n① can、must、should 後面直接接原形\n　She can swim. 她會游泳。\n　You must wait here. 你必須在這裡等。\n\n② let／make + 人 + 原形\n　They let us leave early. 他們讓我們提早走。\n　They made us wait outside. 他們讓我們在外面等。\n\n③ help：加 to、不加 to 都可以\n　She helped me carry the boxes.\n　She helped me to carry the boxes.\n　都是「她幫我搬箱子」。\n\n④ 感官動詞後：用原形說聽到、看到的動作\n　I heard him close the door. 我聽見他關上了門。\n\n⚠️ make 變成被動後，要加 to：\n　They made us wait. → We were made to wait.',
        front: 'They let us ___ (leave) early.\n要不要加 to？',
        back: 'leave（不加 to）\nlet／make + 人 + 原形',
        quiz: { q: 'They made us ___ outside.', options: ['wait', 'to wait', 'waiting', 'waited'], answer: 0 }
      },
      {
        id: 'no-to-passive-make',
        front: 'They made us wait.\n改成被動句要怎麼說？',
        back: 'We were made to wait.\nmake 變成被動後要加 to',
        quiz: { q: 'We were made ___.（我們被要求等待）', options: ['wait', 'to wait', 'waiting', 'waited'], answer: 1 }
      },
      {
        id: 'no-to-modal',
        front: 'She can ___ (swim).\ncan 後面要不要加 to？',
        back: 'swim（不加 to）\ncan、must、should 後面直接接原形',
        quiz: { q: 'You must ___ here.', options: ['wait', 'to wait', 'waiting', 'waits'], answer: 0 }
      },
      {
        id: 'to-vs-for',
        title: '都能翻成「給、為了」，to 和 for 怎麼分？',
        note: '從情境理解「接收者」、「受益對象」和「用途」。\n\n① to：東西交給誰？（接收者）\n　I gave a notebook to May.\n　我把筆記本給了梅。梅是收到筆記本的人。\n\n② for：買東西是為了誰？（受益對象）\n　I bought a notebook for May.\n　我買了筆記本給梅。這次購買是為了她。\n\n③ to do：這次出去做什麼？（目的）\n　I went out to buy bread. 我出去買麵包。\n\n④ for doing：這東西有什麼用途？\n　This knife is for cutting bread. 這把刀是用來切麵包的。\n　＝ This knife is used to cut bread.\n\n💡 for 也可以表示去向：leave for Beijing（出發去北京）',
        front: 'I gave a notebook ___ May.\nI bought a notebook ___ May.\n各用 to 還是 for？',
        back: 'gave … to May（交給誰：接收者）\nbought … for May（為了誰：受益對象）',
        quiz: { q: 'I bought a gift ___ my mom.（為了媽媽買禮物）', options: ['to', 'for', 'at', 'of'], answer: 1 }
      },
      {
        id: 'to-vs-for-give',
        front: 'I gave a notebook ___ May.',
        back: 'to\ngive 是把東西交給人，用 to',
        quiz: { q: 'I gave a notebook ___ May.', options: ['to', 'for', 'at', 'of'], answer: 0 }
      },
      {
        id: 'for-doing-use',
        front: 'This knife is for ___ (cut) bread.',
        back: 'cutting\nfor doing 表示用途',
        quiz: { q: 'This knife is for ___ bread.', options: ['cut', 'cutting', 'to cut', 'cuts'], answer: 1 }
      },
      {
        id: 'to-phrases',
        title: '常見的 to 片語',
        note: '整組片語有自己的意思，其中的 to 要連著前後看。\n\n① have to do：需要、不得不\n　Visitors have to wear helmets. 訪客必須戴安全帽。\n\n② be going to do：打算；有根據的預測\n　I\'m going to call her tonight. 我打算今晚打給她。\n\n③ be about to do：馬上就要\n　The film is about to start. 電影馬上開始。\n\n④ be to do：安排或要求\n　All visitors are to sign in. 所有訪客都必須登記。\n\n⑤ to be honest：說實話\n　To be honest, I don\'t agree. 說實話，我不同意。\n\n⑥ come to：恢復意識（這裡的 to 是副詞）\n　He came to a few minutes later. 幾分鐘後他醒過來了。\n\n💡 其他：two to one ＝ 二比一；to your health ＝ 祝你健康\n　be able to（能）、be likely to（可能）、ought to（應該）',
        front: 'The film is about to start.\nbe about to 是什麼意思？',
        back: '馬上就要\n電影馬上開始'
      },
      {
        id: 'to-phrase-have-to',
        front: 'have to do 是什麼意思？',
        back: '需要、不得不\nVisitors have to wear helmets.'
      },
      {
        id: 'to-phrase-going-to',
        front: 'be going to do 是什麼意思？',
        back: '打算；有根據的預測\nI\'m going to call her tonight.'
      },
      {
        id: 'to-phrase-honest',
        front: 'To be honest, I don\'t agree.\nTo be honest 是什麼意思？',
        back: '說實話\n說實話，我不同意'
      },
      {
        id: 'to-phrase-come-to',
        front: 'He came to a few minutes later.\ncame to 是什麼意思？',
        back: '恢復意識、醒過來\n這裡的 to 是副詞'
      }
    ]
  },

  // ===================== 16 大時態 =====================
  {
    id: 'tenses',
    name: '16 大時態',
    icon: '⏰', color: '#7d8a3c', desc: '結構、定義和例句',
    items: [
      {
        id: 'tense-table',
        title: '時態總表（4 種狀態 × 4 種時間）',
        note: '【一般】\n現在：do / does\n過去：did\n將來：will / shall do\n過去將來：would / should do\n\n【進行】\n現在：am / is / are doing\n過去：was / were doing\n將來：will / shall be doing\n過去將來：would / should be doing\n\n【完成】\n現在：have / has done\n過去：had done\n將來：will / shall have done\n過去將來：would / should have done\n\n【完成進行】\n現在：have / has been doing\n過去：had been doing\n將來：will / shall have been doing\n過去將來：would / should have been doing\n\n💡 台灣課本的叫法：「一般現在時」＝現在簡單式，「現在完成時」＝現在完成式，依此類推。'
      },
      {
        id: 'passive-table',
        title: '被動語態（be ＋ done）',
        note: '【一般】\n現在：am / is / are done\n過去：was / were done\n將來：will / shall be done\n過去將來：would / should be done\n\n【進行】\n現在：am / is / are being done\n過去：was / were being done\n將來、過去將來：沒有\n\n【完成】\n現在：have / has been done\n過去：had been done\n將來：will / shall have been done（很少用）\n過去將來：很少用\n\n【完成進行】都沒有被動語態',
        front: '一般過去時的被動語態是？',
        back: 'was / were done\n例：The cake was eaten.',
        quiz: { q: 'The window ___ yesterday.（窗戶昨天被打破了）', options: ['broke', 'was broken', 'is broken', 'has broke'], answer: 1 }
      },
      {
        id: 't-usage',
        title: '常用時態的不同用法（更多例句）',
        note: '同一個時態，常常不只一種用法。\n\n【一般現在時　do / does、am / is / are】\n用法一：現在的情況、狀態\nI am a student. 我是學生。\n用法二：習慣、常常做的事\nHe always helps others. 他總是幫助別人。\n用法三：事實、普遍真理\nThe sun rises in the east. 太陽從東方升起。\n\n【一般過去時　did、was / were】\n用法一：過去某個時間發生的事\nI went to the park with my friends yesterday. 我昨天和朋友去了公園。\n用法二：過去的習慣\nWhen I was a boy, I often swam in that river. 我小時候常在那條河游泳。\n\n【一般將來時　will / be going to + 原形】\n用法一：將來的動作或狀態\nI will be ten years old next year. 我明年就十歲了。\n用法二：計畫、打算\nI am going to do my homework tomorrow. 我打算明天寫作業。\n用法三：看到跡象，推測快要發生\nLook at the dark clouds. It\'s going to rain. 看那些烏雲，要下雨了。\n\n【現在進行時　am / is / are + doing】\n用法一：此時此刻正在做\nHe is listening to music now. 他現在正在聽音樂。\n用法二：最近一段時間一直在做（不一定是這一秒）\nI am studying computer science this week. 我這週一直在讀電腦科學。\n\n【過去進行時　was / were + doing】\n用法一：過去某個時間點正在做\nTom was listening to music ten minutes ago. 十分鐘前湯姆正在聽音樂。\n用法二：過去某段時間一直在做\nI was traveling in Shanghai last summer. 去年暑假我正在上海旅行。\n\n【將來進行時　will be + doing】\nI will be doing my homework at 9 a.m. tomorrow. 明天早上九點我會正在寫作業。\n\n【現在完成時　have / has + done】\nI have already finished my homework, so I can watch TV. 我已經寫完作業，所以可以看電視了。\n\n【過去完成時　had + done】\nI had done my homework before my mom came back. 媽媽回來之前，我已經寫完作業了。\n\n💡 be going to 有兩種意思：「打算」和「看跡象推測」\n⚠️ 收集的筆記寫 rises from the east，英文習慣說 rises in the east（太陽從東方升起）',
        front: 'Look at the dark clouds. It\'s going to rain.\nbe going to 在這裡是什麼意思？',
        back: '看到跡象推測：快要下雨了\nbe going to 也可以表示「打算」',
        quiz: { q: 'I ___ computer science this week.（這週一直在讀）', options: ['study', 'am studying', 'studied', 'have study'], answer: 1 }
      },
      {
        id: 't-usage-habit',
        front: 'When I was a boy, I often swam in that river.\n這裡的過去式表示什麼？',
        back: '過去的習慣\n小時候「常常」在那條河游泳',
        quiz: { q: 'He always ___ others.（他總是幫助別人）', options: ['help', 'helps', 'helping', 'is help'], answer: 1 }
      },
      {
        id: 't-8-active-passive',
        title: '8 大常用時態（主動和被動對照）',
        note: '最常考的 8 個時態，主動和被動放在一起看。\n\n【對照表】\n時態　主動　被動\n一般現在時　do / does　am / is / are done\n一般過去時　did　was / were done\n一般將來時　will do　will be done\n過去將來時　would do　would be done\n現在進行時　am / is / are doing　am / is / are being done\n過去進行時　was / were doing　was / were being done\n現在完成時　have / has done　have / has been done\n過去完成時　had done　had been done\n\n① 被動語態的公式\n公式：be 動詞（跟著時態變）＋ 過去分詞（done）\nThe room [is cleaned] every day. 房間每天被打掃。\nThe room [is being cleaned] now. 房間現在正在被打掃。\n\n⚠️ 收集的筆記「英語語法體系」這部分有 3 個錯誤，這裡已經改正：\n一般現在時的被動是 am / is / are done（原本只寫 am / is / are）\n現在進行時的被動是 being done（原本寫成 being doing）\n過去進行時的主動是 was / were doing（原本寫成 be doing）',
        front: '現在進行時的被動語態是？',
        back: 'am / is / are being done\nThe room is being cleaned.（房間正在被打掃）',
        quiz: { q: 'The house ___ now.（房子正在被粉刷）', options: ['is painting', 'is being painted', 'was painted', 'has painted'], answer: 1 }
      },
      {
        id: 't-simple-present',
        title: '⭐ 一般現在時　do / does',
        note: '定義：表示現實或普遍真理、規律\n例：I love pears. 我喜歡梨。',
        front: '一般現在時的結構？',
        back: 'do / does\nI love pears. 我喜歡梨。'
      },
      {
        id: 't-simple-past',
        title: '⭐ 一般過去時　did',
        note: '定義：動作發生在過去，而且已經結束\n例：I ate pears yesterday. 我昨天吃了梨。',
        front: '一般過去時的結構？',
        back: 'did\nI ate pears yesterday. 我昨天吃了梨。',
        quiz: { q: 'I ___ pears yesterday.', options: ['eat', 'ate', 'will eat', 'have eaten'], answer: 1 }
      },
      {
        id: 't-simple-future',
        title: '⭐ 一般將來時　will do / be going to',
        note: '定義：動作發生在將來\n例：I will eat pears. 我將會吃梨。',
        front: '一般將來時的結構？',
        back: 'will do / be going to do\nI will eat pears. 我將會吃梨。'
      },
      {
        id: 't-past-future',
        title: '過去將來時　would do',
        note: '定義：站在過去，預測將來要發生的動作\n例：I said I would eat pears. 我說過我要吃梨。',
        front: '過去將來時的結構？',
        back: 'would do\nI said I would eat pears. 我說過我要吃梨。'
      },
      {
        id: 't-past-cont',
        title: '過去進行時　was / were doing',
        note: '定義：過去某個時刻正在發生的動作\n例：I was eating pears at that time. 那時我正在吃梨。',
        front: '過去進行時的結構？',
        back: 'was / were doing\nI was eating pears at that time. 那時我正在吃梨。',
        quiz: { q: 'I ___ pears at that time.（那時我正在吃梨）', options: ['am eating', 'was eating', 'ate', 'have eaten'], answer: 1 }
      },
      {
        id: 't-present-cont',
        title: '⭐ 現在進行時　am / is / are doing',
        note: '定義：動作現在正在進行\n例：I am eating pears. 我正在吃梨。',
        front: '現在進行時的結構？',
        back: 'am / is / are doing\nI am eating pears. 我正在吃梨。'
      },
      {
        id: 't-future-cont',
        title: '將來進行時　will be doing',
        note: '定義：將來某個時刻正在發生的動作\n例：I will be eating pears at 8:00. 8 點我將會在吃梨。',
        front: '將來進行時的結構？',
        back: 'will be doing\nI will be eating pears at 8:00.\n8 點我將會在吃梨。'
      },
      {
        id: 't-past-future-cont',
        title: '過去將來進行時　would be doing',
        note: '定義：站在過去，預測將來某個時刻正在發生的動作\n例：I said I would be eating pears at 8:00 tomorrow.\n我說過明天八點，我會正在吃梨。',
        front: '過去將來進行時的結構？',
        back: 'would be doing\nI said I would be eating pears at 8:00 tomorrow.'
      },
      {
        id: 't-past-perfect',
        title: '過去完成時　had done',
        note: '定義：過去某個時間「之前」就完成的動作（過去的過去）\n例：I had eaten pears by the end of last night.\n昨晚結束前，我就吃完梨了。',
        front: '過去完成時的結構？',
        back: 'had done\nI had eaten pears by the end of last night.',
        quiz: { q: 'I ___ pears by the end of last night.（昨晚結束前就吃完了）', options: ['have eaten', 'had eaten', 'ate', 'was eating'], answer: 1 }
      },
      {
        id: 't-present-perfect',
        title: '⭐ 現在完成時　have / has done',
        note: '定義：動作發生在過去，但對現在有影響\n例：I have already eaten the pears. 我已經把梨吃完了。',
        front: '現在完成時的結構？',
        back: 'have / has done\nI have already eaten the pears. 我已經把梨吃完了。',
        quiz: { q: 'I ___ my homework already.（已經寫完了）', options: ['have finished', 'had finish', 'finish', 'am finishing'], answer: 0 }
      },
      {
        id: 't-future-perfect',
        title: '將來完成時　will have done',
        note: '定義：將來某個時刻之前會完成的動作\n例：I will have eaten my pears by the end of tomorrow.\n到明天結束時，我就吃完我的梨了。',
        front: '將來完成時的結構？',
        back: 'will have done\nI will have eaten my pears by the end of tomorrow.'
      },
      {
        id: 't-past-future-perfect',
        title: '過去將來完成時　would have done',
        note: '定義：站在過去，預測將來某個時刻前能夠完成的動作\n例：I said I would have eaten pears before you came back.\n我當時說，在你回來之前我就能吃完梨。',
        front: '過去將來完成時的結構？',
        back: 'would have done\nI said I would have eaten pears before you came back.'
      },
      {
        id: 't-past-perfect-cont',
        title: '過去完成進行時　had been doing',
        note: '定義：過去某時刻之前開始的動作，一直持續到那個時刻，可能還會繼續\n例：I had been eating pears until last night.\n在昨晚之前，我一直在吃梨。',
        front: '過去完成進行時的結構？',
        back: 'had been doing\nI had been eating pears until last night.'
      },
      {
        id: 't-present-perfect-cont',
        title: '現在完成進行時　have / has been doing',
        note: '定義：動作從過去開始，持續到現在，而且還會繼續下去\n例：I have been eating pears for two hours.\n我已經吃了兩個小時的梨了。',
        front: '現在完成進行時的結構？',
        back: 'have / has been doing\nI have been eating pears for two hours.',
        quiz: { q: 'I ___ English for two hours.（已經連續讀了兩小時，還在讀）', options: ['study', 'studied', 'have been studying', 'will study'], answer: 2 }
      },
      {
        id: 't-future-perfect-cont',
        title: '將來完成進行時　will have been doing',
        note: '定義：動作從過去開始，持續到將來某個時刻，並且還會繼續\n例：Tomorrow we will have been using Xinjiang cotton for ten years.\n到明天，我們使用新疆棉花就滿十年了。',
        front: '將來完成進行時的結構？',
        back: 'will have been doing\nBy next year, I will have been learning English for ten years.'
      },
      {
        id: 't-past-future-perfect-cont',
        title: '過去將來完成進行時　would have been doing',
        note: '定義：站在過去，預測某動作會持續到將來，並且還會繼續\n例：They said tomorrow they would have been using Xinjiang cotton for ten years.\n他們當時說，到明天，他們使用新疆棉花就滿十年了。',
        front: '過去將來完成進行時的結構？',
        back: 'would have been doing\nShe said that by June she would have been working there for five years.'
      }
    ]
  },

  // ===================== 時間標誌詞 =====================
  {
    id: 'signals',
    name: '時間標誌詞',
    icon: '🗓️', color: '#8b5cf6', desc: '看到哪些字，用哪個時態',
    items: [
      {
        id: 's-simple-present',
        title: '一般現在時（主詞 + does）',
        note: '① on / at / in 系列\n　on Sundays 在週日、on weekends 在週末\n　in the morning 早上、at night 在晚上\n② every 系列\n　every day 每天、every time 每次、every Sunday 每個週日\n③ once / twice 系列\n　once a week 每週一次、three times a week 每週三次、twice a month 每月兩次\n④ 頻率副詞\n　always 總是、sometimes 有時、never 從不\n　hardly ever 幾乎不、usually 通常、often 經常',
        front: '看到 every day、always、once a week\n要用什麼時態？',
        back: '一般現在時\n主詞 + do / does',
        quiz: { q: 'She ___ to work every day.', options: ['goes', 'went', 'is going', 'has gone'], answer: 0 }
      },
      {
        id: 's-simple-past',
        title: '一般過去時（主詞 + did）',
        note: '① ago 系列\n　3 days ago 三天前、a moment ago 剛剛\n② last 系列\n　last time 上次、last night 昨晚、last year 去年\n　last term 上學期、last Monday 上週一\n③ yesterday 系列\n　yesterday 昨天、yesterday morning 昨天早上\n　the day before yesterday 前天\n④ in / on + 過去的時間\n　in the early days 在早期、in 1998 在 1998 年\n⑤ 片語\n　just now 剛才、once upon a time 從前\n　long long ago 很久很久以前、at the age of… 在…歲時\n　one day 有一天、in the past 過去',
        front: '看到 ago、last night、yesterday、just now\n要用什麼時態？',
        back: '一般過去時\n主詞 + did',
        quiz: { q: 'I ___ him three days ago.', options: ['see', 'saw', 'have seen', 'will see'], answer: 1 }
      },
      {
        id: 's-simple-future',
        title: '一般將來時（主詞 + will do）',
        note: '① tomorrow 系列\n　tomorrow 明天、the day after tomorrow 後天、tomorrow night 明晚\n② this 系列\n　this afternoon 這個下午、this evening = tonight 今晚\n③ next 系列\n　next time 下次、next Friday 下週五、next month 下個月、next term 下學期\n④ in + 將來的時間\n　in a year / week…（一年／一週後）\n⑤ 片語\n　by the end of + 將來時間\n　soon 很快、sooner or later 遲早\n　at once / right now 立刻',
        front: '看到 tomorrow、next week、soon、in a year\n要用什麼時態？',
        back: '一般將來時\n主詞 + will do',
        quiz: { q: 'We ___ a meeting next Friday.', options: ['had', 'have had', 'will have', 'were having'], answer: 2 }
      },
      {
        id: 's-present-cont',
        title: '現在進行時（主詞 + be doing）',
        note: '① 時間標誌詞\n　now 現在、right now 現在、at the moment 此刻\n　nowadays 如今、at present 目前\n② 情境標誌詞（放句首）\n　Look! 看、Listen! 聽、Look out! 小心\n③ 其他\n　at this time 此時、at this moment 此時',
        front: '看到 now、Look!、Listen!、at the moment\n要用什麼時態？',
        back: '現在進行時\n主詞 + am / is / are doing',
        quiz: { q: 'Look! The baby ___.', options: ['sleeps', 'slept', 'is sleeping', 'has slept'], answer: 2 }
      },
      {
        id: 's-past-cont',
        title: '過去進行時（主詞 + was / were doing）',
        note: '① at + 具體時間 + 過去時間\n　at 9 o\'clock last night 昨晚九點\n② at this time / moment + 過去時間\n　at that time yesterday morning 昨天早上的那時候\n③ when、while 帶出的時間子句\n④ 其他\n　then 那時、the whole morning 整個上午',
        front: '看到 at 9 o\'clock last night、at that time yesterday\n要用什麼時態？',
        back: '過去進行時\n主詞 + was / were doing',
        quiz: { q: 'At 9 o\'clock last night, I ___ TV.', options: ['watch', 'am watching', 'was watching', 'have watched'], answer: 2 }
      },
      {
        id: 's-present-perfect',
        title: '現在完成時（主詞 + have / has done）',
        note: '① 過去的動作對現在的影響\n　肯定句：already 已經、just 剛才\n　否定句：yet 還、never 從不\n　疑問句：ever 曾經、yet 還\n② 過去的動作持續到現在\n　up to now 目前為止、so far 目前為止\n　for + 一段時間、since + 過去某一時間\n　lately 最近、till now 到現在為止\n③ 描述過去的經歷\n　before 以前、once 曾經、twice 兩次、since 自從',
        front: '看到 already、yet、so far、for + 一段時間、since\n要用什麼時態？',
        back: '現在完成時\n主詞 + have / has done',
        quiz: { q: 'I ___ here since 2020.', options: ['live', 'lived', 'have lived', 'will live'], answer: 2 }
      },
      {
        id: 's-past-perfect',
        title: '過去完成時（主詞 + had done）',
        note: '① when、before、after + 過去時間\n② by + 過去的時間\n　by the time 到…的時候為止\n　by then 到那時候\n　by last Friday 到上週五為止\n　by the end of last week 到上週末\n③ up till + 過去的時間\n　up until then 直到那時\n　up until last year 直到去年',
        front: '看到 by the end of last week、by then\n要用什麼時態？',
        back: '過去完成時\n主詞 + had done',
        quiz: { q: 'By the end of last week, I ___ the book.', options: ['finish', 'have finished', 'had finished', 'will finish'], answer: 2 }
      },
      {
        id: 's-past-future',
        title: '過去將來時（主詞 + would do）',
        note: 'the next day / morning / year… 第二天／第二天早上／第二年\nthe following month / week… 下個月／下週（站在過去說）',
        front: '看到 the next day、the following week（站在過去說）\n要用什麼時態？',
        back: '過去將來時\n主詞 + would do'
      }
    ]
  },

  // ===================== 發音規則 =====================
  {
    id: 'pron',
    name: '發音規則',
    icon: '🔊', color: '#14a37f', desc: '不發音規則、字母組合',
    items: [
      {
        id: 'silent-rules',
        title: '英語七大不發音規則',
        note: '1. kn 開頭，k 不發音：know、knife\n2. wr 開頭，w 不發音：wrap、write\n3. mb 結尾，b 不發音：climb、bomb\n4. mn 結尾，n 不發音：autumn、column\n5. bt 結尾，b 不發音：doubt、debt\n6. wh 在 o 前面，w 不發音：who、whose\n7. stle 結尾，t 不發音：castle、whistle\n\n加油，每天進步一點點！'
      },
      { id: 'silent-kn', front: 'kn 開頭時，哪個字母不發音？', back: 'k 不發音\nknow、knife' },
      { id: 'silent-wr', front: 'wr 開頭時，哪個字母不發音？', back: 'w 不發音\nwrap、write' },
      { id: 'silent-mb', front: 'mb 結尾時，哪個字母不發音？', back: 'b 不發音\nclimb、bomb' },
      { id: 'silent-mn', front: 'mn 結尾時，哪個字母不發音？', back: 'n 不發音\nautumn、column' },
      { id: 'silent-bt', front: 'bt 結尾時，哪個字母不發音？', back: 'b 不發音\ndoubt、debt' },
      { id: 'silent-wh', front: 'wh 在 o 前面時，哪個字母不發音？', back: 'w 不發音\nwho、whose' },
      { id: 'silent-stle', front: 'stle 結尾時，哪個字母不發音？', back: 't 不發音\ncastle、whistle' },
      {
        id: 'letter-combos',
        title: '只有一種發音的 12 組字母組合',
        note: '1. ture [tʃər]：nature 自然、culture 文化、picture 圖片\n2. qu [kw]：quick 快的、queen 女王、quiet 安靜的\n3. ph [f]：photo 照片、phone 電話、phrase 片語\n4. ck [k]：black 黑色、pick 撿起、clock 鬧鐘\n5. kn [n]：know 知道、knight 騎士、knife 小刀\n6. wr [r]：write 寫、wrap 包裹、wreck 殘骸\n7. tch [tʃ]：pitch 音高、match 比賽、watch 觀看\n8. sh [ʃ]：cash 現金、fish 魚、bush 灌木\n9. ee [iː]：beef 牛肉、sheep 綿羊、sleep 睡覺\n10. oi / oy [ɔɪ]：oil 油、coin 硬幣、boy 男孩\n11. mb [m]：climb 爬、comb 梳子、tomb 墳墓\n12. dge [dʒ]：bridge 橋、judge 法官、fridge 冰箱'
      },
      { id: 'combo-ture', front: 'ture 怎麼念？', back: '[tʃər]\nnature 自然、culture 文化、picture 圖片' },
      { id: 'combo-qu', front: 'qu 怎麼念？', back: '[kw]\nquick 快的、queen 女王、quiet 安靜的' },
      { id: 'combo-ph', front: 'ph 怎麼念？', back: '[f]\nphoto 照片、phone 電話、phrase 片語' },
      { id: 'combo-ck', front: 'ck 怎麼念？', back: '[k]\nblack 黑色、pick 撿起、clock 鬧鐘' },
      { id: 'combo-kn', front: 'kn 怎麼念？', back: '[n]\nknow 知道、knight 騎士、knife 小刀' },
      { id: 'combo-wr', front: 'wr 怎麼念？', back: '[r]\nwrite 寫、wrap 包裹、wreck 殘骸' },
      { id: 'combo-tch', front: 'tch 怎麼念？', back: '[tʃ]\npitch 音高、match 比賽、watch 觀看' },
      { id: 'combo-sh', front: 'sh 怎麼念？', back: '[ʃ]\ncash 現金、fish 魚、bush 灌木' },
      { id: 'combo-ee', front: 'ee 怎麼念？', back: '[iː]\nbeef 牛肉、sheep 綿羊、sleep 睡覺' },
      { id: 'combo-oi', front: 'oi / oy 怎麼念？', back: '[ɔɪ]\noil 油、coin 硬幣、boy 男孩' },
      { id: 'combo-mb', front: 'mb 怎麼念？', back: '[m]\nclimb 爬、comb 梳子、tomb 墳墓' },
      { id: 'combo-dge', front: 'dge 怎麼念？', back: '[dʒ]\nbridge 橋、judge 法官、fridge 冰箱' }
    ]
  }
];

// ===================== 單字（512 個高頻詞） =====================
// 格式：「中文=英文」，用 | 隔開。App 會自動變成筆記和卡片（正面中文、背面英文）
const VOCAB = [
  ['month', '月份', '一月=January|二月=February|三月=March|四月=April|五月=May|六月=June|七月=July|八月=August|九月=September|十月=October|十一月=November|十二月=December'],
  ['season', '季節', '春天=spring|夏天=summer|秋天（美式）=fall|秋天（英式）=autumn|冬天=winter'],
  // 原本截圖把這些放在「季節」裡，拆出來；high noon（正午）很少用，換成 noon，另外補上 evening、night
  ['time', '時間和日子', '早上=morning|中午=noon|下午=afternoon|傍晚=evening|晚上=night|上午（寫在時間後面）=A.M.|下午（寫在時間後面）=P.M.|昨天=yesterday|今天=today|明天=tomorrow'],
  ['color', '顏色', '藍色；藍色的=blue|紅色；紅色的=red|紫色的=purple|粉紅色的=pink|褐色，棕色=brown|綠色的=green|白色的=white|灰色；灰色的=gray|黃色=yellow|金色=golden|橘色的=orange|銀白色=silver'],
  // 主食：換成使用者插畫上的 12 個（原本截圖的「主食」大多是點心，搬到下面的「麵包點心」）
  ['staple', '主食', '米飯=rice|麵包=bread|麵條=noodles|義大利麵=pasta|馬鈴薯=potato|地瓜=sweet potato|玉米=corn|燕麥粥、燕麥片=oatmeal|水餃=dumpling|饅頭=steamed bun|墨西哥餅皮=tortilla|藜麥=quinoa'],
  ['bakery', '麵包點心', '一條（整條的）麵包=loaf|餅乾=biscuit|披薩=pizza|三明治=sandwich|麵包皮=crust|蛋糕=cake|甜餅乾=cookie|月餅=moon cake|餡餅、派=pie'],
  ['week', '星期', '週一=Monday|週二=Tuesday|週三=Wednesday|週四=Thursday|週五=Friday|週六=Saturday|星期天=Sunday|週末=weekend'],
  // 餐具：插畫上的 12 個 + 原本的 bottle、table（插畫裡沒有，用 Emoji）
  ['tableware', '餐具', '盤子=plate|碗=bowl|筷子=chopsticks|湯匙=spoon|叉子=fork|刀子=knife|杯子=cup|玻璃杯=glass|馬克杯=mug|湯碗=soup bowl|醬料碟=sauce dish|托盤=tray|瓶子=bottle|餐桌=table'],
  // 飲料：插畫上的 12 個 + 原本的 wine、beverage、drink、cider（插畫裡沒有，用 Emoji）
  ['drink', '飲料', '水=water|牛奶=milk|果汁=juice|茶=tea|咖啡=coffee|熱巧克力=hot chocolate|汽水=soda|檸檬水=lemonade|果昔=smoothie|珍珠奶茶=bubble tea|奶昔=shake|啤酒=beer|葡萄酒=wine|飲料（正式）=beverage|飲料、喝=drink|蘋果酒=cider'],
  // 鮮花：插畫上的 12 個 + 原本的 narcissus、peony、violet（插畫裡沒有）
  ['flower', '鮮花', '玫瑰=rose|鬱金香=tulip|向日葵=sunflower|百合花=lily|櫻花=cherry blossom|繡球花=hydrangea|雛菊=daisy|康乃馨=carnation|蘭花=orchid|薰衣草=lavender|荷花、蓮花=lotus|山茶花=camellia|水仙花=narcissus|牡丹花=peony|紫羅蘭=violet'],
  // 水果、蔬菜：有插畫的 12 個排前面，後面是原本筆記的其他字
  ['fruit', '水果', '蘋果=apple|香蕉=banana|橘子，柳橙=orange|葡萄=grape|草莓=strawberry|西瓜=watermelon|鳳梨=pineapple|芒果=mango|桃子，水蜜桃=peach|櫻桃=cherry|檸檬=lemon|奇異果=kiwi|梨子=pear|杏子=apricot|李子=plum|枇杷=loquat|桑椹=mulberry|無花果=fig|柿子=persimmon|核桃=walnut|榛子=hazelnut|花生=peanut|棗子=date|栗子=chestnut|椰子=coconut|甘蔗=sugarcane'],
  ['vegetable', '蔬菜', '紅蘿蔔=carrot|番茄=tomato|馬鈴薯=potato|洋蔥=onion|大蒜=garlic|高麗菜=cabbage|綠花椰菜（青花菜）=broccoli|萵苣／生菜=lettuce|菠菜=spinach|小黃瓜=cucumber|茄子=eggplant|甜椒=bell pepper|甜椒（英式）=capsicum|白花椰菜=cauliflower|蘆筍=asparagus|豆，菜豆=bean|甜菜根=beetroot|南瓜=pumpkin|紅辣椒=chilli|茴香=fennel|香瓜，甜瓜=melon|芹菜=celery|韭蔥（像大蔥）=leek|蘿蔔（小紅蘿蔔）=radish|蘑菇=mushroom|豌豆=pea'],
  // 肉類、交通工具：有插畫的排前面，後面是原本筆記的其他字
  ['meat', '肉類', '牛肉=beef|豬肉=pork|雞肉=chicken|羔羊肉（小羊）=lamb|培根=bacon|火腿=ham|香腸=sausage|義大利臘腸=salami|肉=meat|小牛肉=veal|羊肉（成羊）=mutton|沙朗（牛腰肉）=sirloin|牛排=steak|豬排、帶骨肉排=chop|肉排=cutlet|燉；燉肉=stew|烤肉=roast|火雞=turkey|鴨=duck|魚=fish|肉湯=broth|兔肉=rabbit|鵝=goose|肝臟=liver|鹿肉=venison'],
  ['transport', '交通工具', '汽車=car|公車=bus|火車=train|地鐵、捷運=subway|腳踏車=bicycle|摩托車、重機=motorcycle|計程車=taxi|卡車=truck|飛機=airplane|船=ship|小船=boat|直升機=helicopter|機車、速克達=scooter|廂型車=van|救護車=ambulance|消防車=fire engine|警車=police car|拖拉機=tractor|推土機=bulldozer|堆高機=forklift|郵輪=cruise ship|熱氣球=hot air balloon|纜車=cable car|人力車=rickshaw|腳踏車（口語）=bike|飛機（口語）=plane|四輪馬車=carriage|吉普車=jeep|卡車（英式）=lorry|長途客運=coach|鐵路=railway|快車=express|遊艇=yacht|大船=vessel'],
  // 工具：有插畫的 24 個排前面，後面是原本筆記的其他字
  ['tool', '工具', '鎚子=hammer|螺絲起子=screwdriver|扳手=wrench|鉗子=pliers|剪刀=scissors|美工刀=utility knife|鋸子=saw|電鑽，鑽頭=drill|捲尺=tape measure|尺=ruler|水平儀=level|梯子=ladder|釘子=nail|螺絲釘=screw|螺母，螺帽=nut|螺栓=bolt|膠帶=tape|膠水=glue|油漆刷=paintbrush|滾筒刷=roller|水桶=bucket|水管鉗=pipe wrench|工具箱=toolbox|手套=gloves|工作台=bench|老虎鉗=vice|刨子=plane|銼刀=file|直角尺=square|平頭釘=brad|砂紙=sandpaper|扳手（英式）=spanner|大頭針，別針=pin|鐵鍬，鏟子=spade|叉子（農具）=fork|鐵鍬，鏟=shovel|耙子=rake|鐮刀=sickle|刷子，毛筆=brush|丁字鎬=pickaxe|斧頭=axe|槓桿=lever|曲柄，曲軸=crank|車床=lathe|迴紋針；夾子=clip|指南針=compass'],
  // 天氣、公共設施：有插畫的 24 個排前面，後面是原本筆記的其他字
  ['weather', '天氣', '晴朗的=sunny|多雲的=cloudy|下雨的=rainy|下雪的=snowy|颳風的=windy|暴風雨的=stormy|有霧的=foggy|炎熱的=hot|寒冷的=cold|溫暖的=warm|涼爽的=cool|潮濕的=humid|乾燥的=dry|彩虹=rainbow|雷=thunder|閃電=lightning|冰雹=hail|雨夾雪=sleet|颱風=typhoon|龍捲風=tornado|颶風=hurricane|暴風雪=blizzard|陰天的=overcast|局部多雲=partly cloudy|天氣=weather|氣候=climate|大氣=atmosphere|晴天=fine|陰沉的=dull|雨=rain|雪=snow|風=wind|雲=cloud|濃霧=fog|薄霧=mist|陰霾=haze|陣雨=shower|暴風雨=storm|氣旋（熱帶風暴）=cyclone|大風=gale|微風=breeze|陽光=sunshine|霜=frost|露水=dew|濕度=humidity|結冰=freeze|乾旱=drought|洪水=flood|潮汐，潮水=tide|地震=earthquake'],
  ['place', '公共設施', '醫院=hospital|診所=clinic|藥局=pharmacy|警察局=police station|消防局=fire station|郵局=post office|銀行=bank|圖書館=library|學校=school|大學=university|公園=park|兒童遊樂場=playground|體育場=stadium|游泳池=swimming pool|健身房=gym|博物館=museum|美術館=art gallery|劇院=theater|電影院=cinema|餐廳=restaurant|咖啡館=cafe|購物中心=shopping mall|超市=supermarket|便利商店=convenience store|停車場=parking lot|學院=college|酒吧=bar|法院=court|港口=port|商店（英）=shop|商店（美）=store|車站=station|俱樂部=club|動物園=zoo|教堂=church|機場=airport|書店（英）=bookshop|書店（美）=bookstore|學院、研究機構=institute|市場=market|旅館，飯店=hotel|幼兒園=kindergarten|電梯=elevator|收銀員=cashier|試衣間=fitting room'],
  // 家庭：有插畫的 23 個排前面（cousin 男女兩張圖合成一個字），後面是原本筆記的其他字
  ['family', '家庭', '爺爺，外公=grandfather|奶奶，外婆=grandmother|爸爸=father|媽媽=mother|兒子=son|女兒=daughter|兄弟=brother|姊妹=sister|雙胞胎兄弟=twin brothers|雙胞胎姊妹=twin sisters|叔叔，伯伯，舅舅=uncle|阿姨，姑姑，嬸嬸=aunt|堂／表兄弟姊妹=cousin|姪子，外甥=nephew|姪女，外甥女=niece|丈夫=husband|妻子=wife|孫子=grandson|孫女=granddaughter|岳父，公公=father-in-law|岳母，婆婆=mother-in-law|女婿=son-in-law|媳婦=daughter-in-law|家庭，家人=family|父母=parent|孩子，兒童=child|雙胞胎（的）=twin|爺爺（口語）=grandpa|奶奶（口語）=grandma|爺爺（英式口語）=grandad|奶奶（英式口語）=granny|夫婦，情侶=couple|婚姻，結婚=marriage|單身的=single|男性=male|女性=female|寄養的=foster|繼承人=heir|繼父=stepfather|繼母=stepmother|血統=descent'],
  // 居家：使用者的插畫原本標題寫「家庭」，但內容是房子和家具，所以另外做一類
  ['home', '居家', '房子=house|公寓=apartment|客廳=living room|臥室=bedroom|廚房=kitchen|浴室=bathroom|餐廳（家裡的）=dining room|書房=study|陽台=balcony|花園=garden|車庫=garage|屋頂=roof|門=door|窗戶=window|樓梯=stairs|電梯=elevator|地板=floor|牆壁=wall|天花板=ceiling|檯燈=lamp|沙發=sofa|桌子=table|椅子=chair|櫃子=cabinet|床=bed|冰箱=refrigerator|電視=TV|衣櫃=closet|書架=bookshelf|鏡子=mirror|窗簾=curtain|地毯=carpet|枕頭=pillow|毛毯=blanket|時鐘=clock|垃圾桶=trash can'],
  // 職業：有插畫的排前面（waiter / waitress 共用一張圖），後面是原本筆記的其他字
  ['job', '職業', '醫生=doctor|護理師，護士=nurse|老師=teacher|學生=student|警察=police officer|消防員=firefighter|飛行員=pilot|空服員=flight attendant|廚師=chef|服務生（男）=waiter|服務生（女）=waitress|農夫=farmer|漁夫=fisherman|司機=driver|建築工人=construction worker|工程師=engineer|科學家=scientist|藝術家=artist|音樂家=musician|律師=lawyer|商人，生意人=businessperson|店員=shop assistant|美髮師=hairdresser|記者=reporter|士兵，軍人=soldier|男演員=actor|女演員=actress|歌手=singer|舞者=dancer|鋼琴家=pianist|畫家=painter|教授=professor|模特兒=model|裁縫師=tailor|校長（英式）=headteacher|導演=director|編輯=editor|作家=writer|播音員=announcer|新聞工作者=journalist|工人=worker|化學家=chemist|探險家=explorer|研究員=researcher|外科醫生=surgeon|水手，海員=sailor|船員=seaman|太空人=astronaut|運動員=athlete|警察（男）=policeman|偵探=detective|法官=judge|律師（美式）=attorney|廚師（一般）=cook|麵包師傅=baker|屠夫=butcher|店員，職員=clerk|打字員=typist|秘書=secretary|業務員=salesman'],
  // 服飾、體育：有插畫的排前面，後面是原本筆記的其他字
  ['clothes', '服飾', '襯衫=shirt|T恤=T-shirt|女用襯衫=blouse|毛衣=sweater|夾克=jacket|外套，大衣=coat|連帽上衣=hoodie|洋裝=dress|裙子=skirt|長褲=pants|短褲=shorts|牛仔褲=jeans|西裝=suit|制服=uniform|睡衣=pajamas|內衣褲=underwear|襪子=socks|褲襪=tights|帽子（鴨舌帽）=cap|圍巾=scarf|手套=gloves|皮帶=belt|鞋子=shoes|靴子=boots|帽子（有邊）=hat|衣服=clothes|服裝（總稱）=clothing|褲子（英式）=trousers|口袋=pocket|袖子=sleeve|鞋底=sole|鞋跟=heel|領帶=tie|棉花=cotton|戒指=ring|項鍊=necklace|香水=perfume|錢包（女用）=purse|圍巾（厚）=muffler|涼鞋=sandal|背心=vest|運動鞋=sneaker|長筒襪=stocking|圍裙=apron|拖鞋=slipper|耳環=earring|口紅=lipstick|雨衣=raincoat|鈕扣=button|衣領=collar|皮夾=wallet|披肩=shawl'],
  ['sport', '體育', '足球（美式說法）=soccer|籃球=basketball|網球=tennis|羽毛球=badminton|排球=volleyball|桌球=table tennis|棒球=baseball|高爾夫球=golf|游泳=swimming|跑步=running|騎自行車=cycling|健行，爬山=hiking|滑雪=skiing|滑板=skateboarding|溜冰，滑冰=ice skating|拳擊=boxing|武術=martial arts|體操=gymnastics|舉重=weightlifting|瑜伽=yoga|跳舞=dancing|衝浪=surfing|釣魚=fishing|射箭=archery|足球（英式說法）=football|游泳（動詞）=swim|跳水=diving|賽跑=race|短跑=dash|競走=walk|跳高=high jump|跳遠=long jump|投擲=throwing|吊環=rings|摔角=wrestling|西洋棋=chess|橋牌=bridge|馬拉松=marathon|撐竿跳=pole vault|推鉛球=shot put|鐵餅=discus|鏈球=hammer|標槍=javelin|柔道=judo|擊劍=fencing|滑冰（總稱）=skating|雪橇=bobsleigh|手球=handball|曲棍球=hockey|板球=cricket|獨木舟=canoe|自由式=freestyle|冰上曲棍球=ice hockey|馬球=polo|水球=water polo|帆船運動=sailing|汽車拉力賽=rally|單槓=horizontal bar|雙槓=parallel bars|花式滑冰=figure skating|划船=rowing'],
  // 身體：有插畫的 14 個排前面，後面是原本筆記的其他字
  ['body', '身體', '頭=head|臉=face|眼睛=eye|耳朵=ear|鼻子=nose|嘴巴=mouth|脖子=neck|肩膀=shoulder|手臂=arm|手=hand|手指=finger|腿=leg|膝蓋=knee|腳=foot|頭髮=hair|臉頰=cheek|眼皮=lid|嘴唇=lip|扁桃腺=tonsil|牙齒=tooth|假牙=denture|牙齦=gum|舌頭=tongue|腦=brain|下巴=chin|手肘=elbow|腋下=armpit|大腿=thigh|小腿=shank|小腿肚=calf|腳背=instep|手掌=palm|指甲=nail|拳頭=fist|禿頭的=bald|皺紋=wrinkle|痣=mole|胸部=chest|肚臍=navel|臀部=hip|屁股=buttock|雀斑=freckle|酒窩=dimple|額頭=forehead|太陽穴=temple|小鬍子=mustache|鬍鬚（臉頰兩邊、貓的鬍鬚）=whisker|鬢角=sideburns|粉刺，痘痘=pimple|腹部=abdomen|腰=waist|大拇指=thumb'],
  // ↓ 10/23 第六批：使用者的單字表（第 2、4 頁）。已經有的字不重複放；mountain、sky、sea、tree、star、music、art、history、geography 是 Claude 補的
  ['animal', '動物', '貓=cat|狗=dog|豬=pig|兔子=rabbit|鴨子=duck|老虎=tiger|狐狸=fox|斑馬=zebra|鹿=deer|馬=horse|大象=elephant|螞蟻=ant|魚=fish|鳥=bird|老鷹=eagle|河狸=beaver|蛇=snake|老鼠=mouse|松鼠=squirrel|袋鼠=kangaroo|猴子=monkey|熊貓=panda|熊=bear|獅子=lion|長頸鹿=giraffe|鵝=goose|綿羊=sheep|山羊=goat|母牛，乳牛=cow|驢子=donkey|魷魚=squid|龍蝦=lobster|母雞=hen|火雞=turkey|小羊=lamb|鯊魚=shark|海豹=seal'],
  ['nature', '自然景物', '河流=river|湖=lake|小溪=stream|森林=forest|小路=path|馬路，公路=road|建築物=building|空氣=air|月亮=moon|太陽=sun|山=mountain|天空=sky|海=sea|樹=tree|星星=star'],
  ['room', '教室、房間用品', '書桌，課桌=desk|電腦=computer|黑板，白板=board|電風扇=fan|燈=light|講桌=teacher\'s desk|圖畫，照片=picture|照片=photo|圖表=chart|垃圾桶=trash bin|床頭櫃=nightstand|沙發旁的小桌=end table|鑰匙=key|鎖=lock'],
  ['meal', '三餐和速食', '早餐=breakfast|午餐=lunch|晚餐=dinner|晚餐（較少用）=supper|一餐=meal|蛋=egg|豆腐=tofu|冰=ice|冰淇淋=ice cream|可樂=Coke|熱狗=hot dog|漢堡=hamburger|薯條=French fries|果醬=jam|沙拉=salad|湯=soup'],
  ['subject', '學校科目', '國文（中文）=Chinese|英文=English|數學=math|體育課=PE|自然科學=science|社會課=social studies|音樂=music|美術=art|歷史=history|地理=geography'],
];
VOCAB.find(v => v[0] === 'job')[2] += '|會計師=accountant|業務員，銷售員=salesperson';

// ===================== 單字的圖 =====================
// 每一類單字的代表圖示（找不到圖的單字會顯示淡淡的分類圖示）
const VOCAB_ICON = {
  month: '📅', season: '🌸', time: '🕐', color: '🎨', staple: '🍚', bakery: '🍰', week: '📆', tableware: '🍽️', drink: '🥤', flower: '💐',
  fruit: '🍎', vegetable: '🥦', meat: '🍖', transport: '🚗', tool: '🔧', weather: '⛅', place: '🏙️',
  family: '👨‍👩‍👧', home: '🏠', job: '💼', clothes: '👕', sport: '🏅', body: '🧍',
  animal: '🐾', nature: '🏞️', room: '🏫', meal: '🍔', subject: '📖'
};
// 每個單字的圖：「英文=圖」，用 | 隔開。
// 圖可以是 Emoji，也可以是圖片檔路徑（例如 pear=img/pear.png）——以後有插畫就改這裡。
const PICS = {
  // 季節、時間：使用者給的插畫（原始素材/插畫/四季與時間詞彙圖鑑.png 切出來的）
  season: 'spring=img/time/spring.jpg|summer=img/time/summer.jpg|fall=img/time/fall.jpg|autumn=img/time/fall.jpg|winter=img/time/winter.jpg',
  time: 'morning=img/time/morning.jpg|noon=img/time/noon.jpg|afternoon=img/time/afternoon.jpg|evening=img/time/evening.jpg|night=img/time/night.jpg|A.M.=img/time/am.jpg|P.M.=img/time/pm.jpg|yesterday=img/time/yesterday.jpg|today=img/time/today.jpg|tomorrow=img/time/tomorrow.jpg',
  // 顏色：使用者給的色票插畫（原始素材/插畫/顏色學習圖卡：12色彩繽紛色票.png）
  color: ['blue', 'red', 'purple', 'pink', 'brown', 'green', 'white', 'gray', 'yellow', 'golden', 'orange', 'silver'].map(c => `${c}=img/color/${c}.jpg`).join('|'),
  // 主食：使用者給的插畫（原始素材/插畫/主食單字圖鑑：12種美食.png），檔名的空白換成 -
  staple: ['rice', 'bread', 'noodles', 'pasta', 'potato', 'sweet potato', 'corn', 'oatmeal', 'dumpling', 'steamed bun', 'tortilla', 'quinoa']
    .map(w => `${w}=img/staple/${w.replace(' ', '-')}.jpg`).join('|'),
  // 麵包點心、星期：使用者給的插畫（原始素材/插畫/時間麵包星期飲料_混合.png，這張也有 evening、night 和 4 個飲料）
  bakery: ['loaf', 'biscuit', 'pizza', 'sandwich', 'crust', 'cake', 'cookie', 'moon cake', 'pie'].map(w => `${w}=img/bakery/${w.replace(' ', '-')}.jpg`).join('|'),
  week: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'weekend'].map(w => `${w}=img/week/${w.toLowerCase()}.jpg`).join('|'),
  // 餐具：使用者給的插畫（原始素材/插畫/餐具英中對照圖鑑.png）
  tableware: ['plate', 'bowl', 'chopsticks', 'spoon', 'fork', 'knife', 'cup', 'glass', 'mug', 'soup bowl', 'sauce dish', 'tray']
    .map(w => `${w}=img/tableware/${w.replace(' ', '-')}.jpg`).join('|') + '|bottle=img/drink/bottle.jpg|table=img/drink/table.jpg',
  // 飲料：使用者給的插畫（原始素材/插畫/飲料單字圖鑑：14項生活詞彙.png，最後兩格是餐具的 bottle、table）
  drink: ['water', 'milk', 'juice', 'tea', 'coffee', 'hot chocolate', 'soda', 'lemonade', 'smoothie', 'bubble tea', 'shake', 'beer']
    .map(w => `${w}=img/drink/${w.replace(' ', '-')}.jpg`).join('|') + '|wine=img/drink/wine.jpg|beverage=img/drink/beverage.jpg|drink=img/drink/drink.jpg|cider=img/drink/cider.jpg',
  // 鮮花：使用者給的插畫（原始素材/插畫/鮮花英中圖鑑海報.png）
  flower: ['rose', 'tulip', 'sunflower', 'lily', 'cherry blossom', 'hydrangea', 'daisy', 'carnation', 'orchid', 'lavender', 'lotus', 'camellia']
    .map(w => `${w}=img/flower/${w.replace(' ', '-')}.jpg`).join('|'),
  // 水果、蔬菜：使用者給的插畫（原始素材/插畫/水果與英文中文對照圖鑑.png、蔬菜圖鑑：12種雙語蔬菜 L.png）
  fruit: ['apple', 'banana', 'orange', 'grape', 'strawberry', 'watermelon', 'pineapple', 'mango', 'peach', 'cherry', 'lemon', 'kiwi']
    .map(w => `${w}=img/fruit/${w}.jpg`).join('|') + '|pear=🍐|peanut=🥜|chestnut=🌰|coconut=🥥',
  vegetable: ['carrot', 'tomato', 'potato', 'onion', 'garlic', 'cabbage', 'broccoli', 'lettuce', 'spinach', 'cucumber', 'eggplant', 'bell pepper']
    .map(w => `${w}=img/vegetable/${w.replace(' ', '-')}.jpg`).join('|') + '|capsicum=img/vegetable/bell-pepper.jpg|bean=🫘|pumpkin=🎃|chilli=🌶️|melon=🍈|mushroom=🍄|pea=🫛',
  // 肉類、交通工具：使用者給的插畫（原始素材/插畫/肉類英文圖解：8種肉品.png、交通工具詞彙圖鑑：24種運輸工具.png）
  meat: ['beef', 'pork', 'chicken', 'lamb', 'bacon', 'ham', 'sausage', 'salami'].map(w => `${w}=img/meat/${w}.jpg`).join('|') +
    '|meat=🍖|veal=🐮|mutton=🐏|sirloin=🥩|steak=🥩|chop=🍖|stew=🥘|turkey=🦃|duck=🦆|fish=🐟|broth=🍲|rabbit=🐇|goose=🪿|venison=🦌',
  transport: ['car', 'bus', 'train', 'subway', 'bicycle', 'motorcycle', 'taxi', 'truck', 'airplane', 'ship', 'boat', 'helicopter',
    'scooter', 'van', 'ambulance', 'fire engine', 'police car', 'tractor', 'bulldozer', 'forklift', 'cruise ship', 'hot air balloon', 'cable car', 'rickshaw']
    .map(w => `${w}=img/transport/${w.replace(/ /g, '-')}.jpg`).join('|') +
    '|bike=img/transport/bicycle.jpg|plane=img/transport/airplane.jpg|jeep=🚙|lorry=🚛|coach=🚍|railway=🛤️|express=🚄|yacht=⛵|vessel=🛳️',
  // 工具：使用者給的插畫（原始素材/插畫/工具圖鑑：24種實用工具.png）
  tool: ['hammer', 'screwdriver', 'wrench', 'pliers', 'scissors', 'utility knife', 'saw', 'drill', 'tape measure', 'ruler', 'level', 'ladder',
    'nail', 'screw', 'nut', 'bolt', 'tape', 'glue', 'paintbrush', 'roller', 'bucket', 'pipe wrench', 'toolbox', 'gloves']
    .map(w => `${w}=img/tool/${w.replace(' ', '-')}.jpg`).join('|') +
    '|spanner=img/tool/wrench.jpg|vice=🗜️|square=📐|pin=📌|brush=🖌️|pickaxe=⛏️|axe=🪓|clip=📎|compass=🧭',
  // 天氣、公共設施、居家：使用者給的插畫（原始素材/插畫/天氣詞彙24格插畫學習卡.png、公共設施英中詞彙圖表.png、家庭居家用品雙語圖解表.png）
  weather: ['sunny', 'cloudy', 'rainy', 'snowy', 'windy', 'stormy', 'foggy', 'hot', 'cold', 'warm', 'cool', 'humid', 'dry', 'rainbow',
    'thunder', 'lightning', 'hail', 'sleet', 'typhoon', 'tornado', 'hurricane', 'blizzard', 'overcast', 'partly cloudy']
    .map(w => `${w}=img/weather/${w.replace(' ', '-')}.jpg`).join('|') +
    '|weather=🌤️|climate=🌡️|atmosphere=🌍|fine=img/weather/sunny.jpg|dull=img/weather/overcast.jpg|rain=img/weather/rainy.jpg|snow=img/weather/snowy.jpg' +
    '|wind=img/weather/windy.jpg|cloud=img/weather/cloudy.jpg|fog=img/weather/foggy.jpg|mist=🌫️|haze=🌫️|shower=🌦️|storm=img/weather/stormy.jpg|cyclone=🌀' +
    '|gale=💨|breeze=🍃|sunshine=img/weather/sunny.jpg|frost=❄️|dew=💧|humidity=img/weather/humid.jpg|freeze=🥶|drought=img/weather/dry.jpg|flood=🌊|tide=🌊|earthquake=🫨',
  place: ['hospital', 'clinic', 'pharmacy', 'police station', 'fire station', 'post office', 'bank', 'library', 'school', 'university', 'park', 'playground',
    'stadium', 'swimming pool', 'gym', 'museum', 'art gallery', 'theater', 'cinema', 'restaurant', 'cafe', 'shopping mall', 'supermarket', 'convenience store']
    .map(w => `${w}=img/place/${w.replace(' ', '-')}.jpg`).join('|') +
    '|parking lot=🅿️|college=🎓|bar=🍸|court=⚖️|port=⚓|shop=🏪|store=🏬|station=🚉|zoo=🦁|church=⛪|airport=🛫|bookshop=📖|bookstore=📖|market=🧺|hotel=🏨|kindergarten=🧒|elevator=img/home/elevator.jpg|cashier=🧾|fitting room=👗',
  home: ['house', 'apartment', 'living room', 'bedroom', 'kitchen', 'bathroom', 'dining room', 'study', 'balcony', 'garden', 'garage', 'roof',
    'door', 'window', 'stairs', 'elevator', 'floor', 'wall', 'ceiling', 'lamp', 'sofa', 'table', 'chair', 'cabinet']
    .map(w => `${w}=img/home/${w.replace(' ', '-')}.jpg`).join('|') +
    '|bed=🛏️|refrigerator=🧊|TV=📺|closet=🚪|bookshelf=📚|mirror=🪞|curtain=🪟|carpet=🟫|pillow=🛌|blanket=🛌|clock=🕰️|trash can=🗑️',
  // 家庭：使用者給的插畫（原始素材/插畫/家庭成員英中插畫詞彙圖.png）
  family: ['grandfather', 'grandmother', 'father', 'mother', 'son', 'daughter', 'brother', 'sister', 'twin brothers', 'twin sisters', 'uncle', 'aunt',
    'nephew', 'niece', 'husband', 'wife', 'grandson', 'granddaughter', 'father-in-law', 'mother-in-law', 'son-in-law', 'daughter-in-law']
    .map(w => `${w}=img/family/${w.replace(' ', '-')}.jpg`).join('|') +
    '|cousin=img/family/cousin-male.jpg|grandpa=img/family/grandfather.jpg|grandad=img/family/grandfather.jpg|grandma=img/family/grandmother.jpg|granny=img/family/grandmother.jpg' +
    '|twin=img/family/twin-brothers.jpg|family=👨‍👩‍👧|parent=👪|child=🧒|couple=💑|marriage=💒|male=♂️|female=♀️',
  // 職業：使用者給的插畫（原始素材/插畫/24種職業插畫圖鑑.png）
  job: ['doctor', 'nurse', 'teacher', 'student', 'police officer', 'firefighter', 'pilot', 'flight attendant', 'chef', 'waiter', 'farmer', 'fisherman',
    'driver', 'construction worker', 'engineer', 'scientist', 'artist', 'musician', 'lawyer', 'businessperson', 'shop assistant', 'hairdresser', 'reporter', 'soldier']
    .map(w => `${w}=img/job/${w.replace(' ', '-')}.jpg`).join('|') +
    '|waitress=img/job/waiter.jpg|policeman=img/job/police-officer.jpg|journalist=img/job/reporter.jpg|cook=img/job/chef.jpg|attorney=img/job/lawyer.jpg|worker=img/job/construction-worker.jpg' +
    '|actor=🎭|actress=🎭|singer=🎤|dancer=💃|pianist=🎹|painter=🎨|professor=👨‍🏫|tailor=🧵|director=🎬|editor=📝|writer=✍️|announcer=📢|chemist=🧪|explorer=🗺️' +
    '|researcher=🔬|sailor=⚓|astronaut=🧑‍🚀|athlete=🏃|detective=🕵️|judge=🧑‍⚖️|baker=🥐|typist=⌨️|secretary=📋|salesman=🛍️',
  // 服飾、體育：使用者給的插畫（原始素材/插畫/服飾英文圖解海報.png、體育運動英語圖解 24 項.png）
  clothes: ['shirt', 'T-shirt', 'blouse', 'sweater', 'jacket', 'coat', 'hoodie', 'dress', 'skirt', 'pants', 'shorts', 'jeans', 'suit', 'uniform', 'pajamas', 'underwear', 'socks', 'tights', 'cap', 'scarf', 'gloves', 'belt', 'shoes', 'boots'].map(w => `${w}=img/clothes/${w.toLowerCase().replace(/ /g, '-')}.jpg`).join('|') +
    '|hat=img/clothes/cap.jpg|clothes=👚|clothing=👚|trousers=img/clothes/pants.jpg|sneaker=img/clothes/shoes.jpg|tie=👔|ring=💍|necklace=📿|purse=👛|sandal=🩴|vest=🎽|stocking=🧦|lipstick=💄|button=🔘|wallet=👝|muffler=img/clothes/scarf.jpg',
  sport: ['soccer', 'basketball', 'tennis', 'badminton', 'volleyball', 'table tennis', 'baseball', 'golf', 'swimming', 'running', 'cycling', 'hiking', 'skiing', 'skateboarding', 'ice skating', 'boxing', 'martial arts', 'gymnastics', 'weightlifting', 'yoga', 'dancing', 'surfing', 'fishing', 'archery'].map(w => `${w}=img/sport/${w.toLowerCase().replace(/ /g, '-')}.jpg`).join('|') +
    '|football=img/sport/soccer.jpg|swim=img/sport/swimming.jpg|skating=img/sport/ice-skating.jpg|figure skating=img/sport/ice-skating.jpg|race=🏁|walk=🚶|wrestling=🤼|chess=♟️|bridge=🃏|marathon=🏃|discus=🥏|judo=🥋|fencing=🤺|bobsleigh=🛷|handball=🤾|hockey=🏑|cricket=🏏|diving=🤿|canoe=🛶|ice hockey=🏒|polo=🏇|water polo=🤽|sailing=⛵|rally=🏎️|rowing=🚣',
  // 身體：使用者給的插畫（原始素材/插畫/可愛身體部位英文圖解.png）
  body: ['head', 'face', 'eye', 'ear', 'nose', 'mouth', 'neck', 'shoulder', 'arm', 'hand', 'finger', 'leg', 'knee', 'foot'].map(w => `${w}=img/body/${w}.jpg`).join('|') +
    '|hair=💇|lip=💋|tooth=🦷|tongue=👅|brain=🧠|thigh=🦵|palm=img/body/hand.jpg|nail=💅|fist=✊|bald=👨‍🦲|whisker=🧔|thumb=👍',
};
// 單字的小提醒：顯示在單字表最下面，第一行也會出現在那個字的卡片背面
// key 是英文單字的話，第一行也會出現在那個字的卡片背面；_ 開頭的只顯示在單字表下面
const VOCAB_TIPS = {
  tableware: {
    cup: '💡 cup、glass、mug 都是「杯子」，差在材質和形狀\ncup：有把手的小杯子（咖啡杯、茶杯）\nglass：玻璃杯\nmug：比較大、比較厚的馬克杯',
    'soup bowl': '💡 湯碗就叫 soup bowl\n插畫上寫成「bowl (soup bowl)」，跟上面的 bowl 重複了，正確是 soup bowl',
    _table: '💡 table（餐桌）是家具，不算餐具，因為原本的筆記放在這裡，所以先留著'
  },
  weather: {
    typhoon: '💡 typhoon（颱風）和 hurricane（颶風）是同一種風暴，只是地區不同\n亞洲（台灣、日本）叫 typhoon，美洲叫 hurricane',
    thunder: '💡 thunder 是「雷聲」（聽到的），lightning 是「閃電」（看到的）',
    _y: '💡 天氣名詞加 y 就變形容詞：sun → sunny、cloud → cloudy、rain → rainy、wind → windy、fog → foggy\nIt\'s rainy today. 今天下雨。'
  },
  place: {
    shop: '💡 shop 和 store 都是商店：英國常說 shop，美國常說 store\nbookshop／bookstore 也一樣',
    _version: '💡 這一類後面 20 個是第二批插畫；GPT 做了兩種版本，選了「法院內部、旅館房間」比較好認的那一版',
    park: '💡 原本筆記寫 park「公園，停車場」：park 當名詞是「公園」，停車場要說 parking lot\n（park 當動詞是「停車」：Park your car here. 把車停這裡）',
    gym: '💡 原本筆記寫 gym「體育館／健身房」，插畫是健身房；學校的體育館也叫 gym',
    theater: '💡 theater 是美式拼法，英式寫 theatre；cinema 也可以說 movie theater'
  },
  month: {
    _cap: '💡 月份一定大寫開頭；「在幾月」用 in：in January\n縮寫：Jan、Feb、Mar、Apr、Aug、Sep(t)、Oct、Nov、Dec（May、June、July 通常不縮）'
  },
  week: {
    _abbr: '💡 星期的縮寫：Mon、Tue、Wed、Thu、Fri、Sat、Sun（插畫日曆上寫的就是縮寫）\n星期一定大寫開頭；「在星期一」用 on：on Monday',
    Wednesday: '💡 Wednesday 的 d 不發音，念起來像 Wens-day'
  },
  bakery: {
    biscuit: '💡 biscuit：英國指「餅乾」；美國的 biscuit 是一種鬆軟的小圓麵包，美國的餅乾叫 cookie'
  },
  body: {
    foot: '💡 不規則複數：foot → feet（腳）、tooth → teeth（牙齒）\nmy feet 我的雙腳',
    hand: '💡 hand 是整隻手；arm 是手臂（肩膀到手腕）；finger 是手指，大拇指叫 thumb',
    leg: '💡 leg 是整條腿；foot 是腳掌（腳踝以下）'
  },
  clothes: {
    cap: '💡 插畫上寫 hat，但圖是鴨舌帽（棒球帽），英文是 cap\nhat 是有一圈帽緣的帽子（遮陽帽、紳士帽）',
    pants: '💡 pants（長褲）、jeans、shorts、pajamas、tights 永遠用複數，因為有兩條褲管\na pair of jeans 一條牛仔褲\n英國人說長褲是 trousers；英式的 pants 是「內褲」',
    'T-shirt': '💡 T-shirt 的 T 要大寫，因為衣服攤平就像字母 T',
    socks: '💡 socks、gloves、shoes、boots 通常成對，所以用複數：a pair of socks 一雙襪子'
  },
  sport: {
    soccer: '💡 足球：美國叫 soccer，英國和大部分國家叫 football\n（美國的 football 是「美式足球」，是另一種運動）',
    skateboarding: '💡 插畫上這格的英文字印壞了（變成亂碼），正確是 skateboarding（滑板運動）；滑板本身叫 skateboard',
    _play: '💡 運動要搭配的動詞不一樣：\n球類用 play：play soccer、play tennis\n-ing 結尾用 go：go swimming、go hiking、go fishing\n武術、瑜伽用 do：do yoga、do martial arts'
  },
  job: {
    student: '💡 student（學生）嚴格說不算職業，但很常用，所以插畫也放進來了',
    waiter: '💡 插畫上寫 waiter / waitress：waiter 是男服務生，waitress 是女服務生\n現在也常說 server，不分男女',
    'police officer': '💡 police officer 不分男女；policeman 是男警察、policewoman 是女警察\n現在比較常用 police officer、firefighter、businessperson 這種不分男女的說法',
    chef: '💡 chef 是餐廳的「專業主廚」；cook 是「會做飯的人」，在家煮飯的人也可以叫 cook\ncook 也是動詞「煮」：I cook dinner. 我煮晚餐。',
    reporter: '💡 reporter 是到現場採訪的記者；journalist 範圍比較大，寫新聞的人都算'
  },
  family: {
    foster: '💡 原本筆記寫 foster「領養的」不太對：foster 是「寄養」（暫時照顧，不是正式的家人）\n正式領養是 adopt：an adopted child 被領養的孩子；a foster family 寄養家庭',
    parent: '💡 parent 是「爸爸或媽媽其中一個」；爸媽兩個人要用複數 parents\nMy parents live in Taipei. 我爸媽住在台北。',
    child: '💡 child 的複數是 children（不是 childs）',
    cousin: '💡 cousin 不分男女，也不分堂、表：堂哥、表姊、堂妹……全部都叫 cousin\n插畫上分成 cousin (male)、cousin (female) 兩張，英文其實是同一個字',
    grandfather: '💡 英文不分爸爸那邊或媽媽那邊：爺爺、外公都是 grandfather；奶奶、外婆都是 grandmother',
    uncle: '💡 uncle 包含叔叔、伯伯、舅舅、姑丈、姨丈；aunt 包含阿姨、姑姑、嬸嬸、舅媽\n插畫只寫「叔叔」「阿姨」，網站把其他意思也補上了',
    'father-in-law': '💡 插畫寫 father-in-law「岳父」、mother-in-law「岳母」，這是太太的爸媽\n先生的爸媽（公公、婆婆）英文也一樣是 father-in-law、mother-in-law',
    brother: '💡 英文不分哥哥、弟弟，都是 brother；要特別說可以用 older brother（哥哥）、younger brother（弟弟）\nsister 也一樣：older sister（姊姊）、younger sister（妹妹）'
  },
  home: {
    _title: '💡 這一類是插畫原本標題寫「家庭 Home / Household」的那張，內容是房子和家具，所以另外放在「居家」\n爸爸、媽媽這類家人的單字在「家庭」那一類',
    study: '💡 study 當名詞是「書房」，當動詞是「讀書」\nI study in my study. 我在書房讀書。',
    _extra: '💡 最後 12 個（bed 之後）是插畫裡沒有、額外補充的居家常用字'
  },
  tool: {
    spade: '💡 spade 和 shovel 都是鏟子：spade 比較平、用來挖土；shovel 比較彎、用來鏟起東西\n插畫上兩個畫得很像',
    pin: '💡 pin 是大頭針、別針；插畫裡的迴紋針叫 paper clip',
    'utility knife': '💡 插畫上美工刀寫成 knife，knife 只是一般的「刀子」\n美工刀的英文是 utility knife（也可以說 box cutter）',
    'pipe wrench': '💡 插畫上水管鉗寫成 pliers，跟第 4 個 pliers（鉗子）重複了\n圖上那種紅色的大鉗子，英文是 pipe wrench',
    pliers: '💡 pliers（鉗子）、scissors（剪刀）、gloves（手套）永遠用複數，因為它們有「兩邊」\na pair of scissors 一把剪刀',
    _plural: '💡 插畫上寫 nails、screws（複數），網站寫成單數 nail、screw，意思一樣'
  },
  meat: {
    lamb: '💡 lamb 是「小羊」的肉（羔羊肉），比較嫩；mutton 是「成年羊」的肉\n插畫上 lamb 寫「羊肉」，網站改成比較精準的「羔羊肉」',
    _animal: '💡 很多肉和動物的英文不一樣：cow（牛）→ beef，pig（豬）→ pork\n但 chicken、fish、duck 動物和肉是同一個字'
  },
  transport: {
    subway: '💡 台灣的「捷運」英文是 MRT；subway 是美國說法，英國說 underground 或 tube',
    scooter: '💡 插畫寫「電動機車」，但 scooter 不一定是電動的，台灣一般的機車（速克達）就叫 scooter\n電動的可以說 electric scooter',
    motorcycle: '💡 motorcycle 通常指「打檔的重機、摩托車」；台灣常見的機車是 scooter',
    ship: '💡 ship 是「大船」，boat 是「小船」；插畫上 ship 和 cruise ship（郵輪）用了很像的圖',
    'fire engine': '💡 消防車也可以說 fire truck（美國比較常用）'
  },
  fruit: {
    date: '💡 date 有兩個意思：「棗子」和「日期、約會」\nWhat\'s the date today? 今天幾號？',
    kiwi: '💡 奇異果完整叫 kiwifruit，平常說 kiwi 就可以（kiwi 也是紐西蘭的一種鳥）'
  },
  vegetable: {
    radish: '💡 插畫上的白蘿蔔，英文更精準的說法是 daikon；radish 通常指小小的紅皮蘿蔔',
    broccoli: '💡 broccoli 是「綠色」的花椰菜，cauliflower 是「白色」的花椰菜\n插畫上 broccoli 寫「花椰菜」，台灣說的花椰菜通常是白的，所以網站改成「綠花椰菜（青花菜）」',
    'bell pepper': '💡 甜椒：美國說 bell pepper，英國、澳洲說 capsicum，是同一種東西',
    _potato: '💡 potato（馬鈴薯）在「主食」也有，兩邊都會出現'
  },
  flower: {
    lavender: '💡 lavender 也是顏色「淡紫色」\nShe has a lavender dress. 她有一件淡紫色的洋裝。',
    carnation: '💡 母親節送的花就是 carnation（康乃馨）'
  },
  drink: {
    shake: '💡 奶昔也常說 milkshake；smoothie（果昔）是水果打的，比較少放冰淇淋',
    soda: '💡 汽水：美國說 soda，英國常說 fizzy drink 或 soft drink',
    drink: '💡 drink 當名詞是「飲料」，當動詞是「喝」\nI drink water every day. 我每天喝水。'
  },
  staple: {
    oatmeal: '💡 oatmeal 是煮好的「燕麥粥」或燕麥片；生的燕麥粒叫 oats\nI eat oatmeal for breakfast. 我早餐吃燕麥粥。',
    _moved: '💡 原本筆記的「主食」裡有 pizza、cake、cookie、月餅、派，這些其實是點心，已經搬到「🍰 麵包點心」'
  },
  season: {
    fall: '💡 「秋天」美國人說 fall，英國人說 autumn，兩個都對'
  },
  time: {
    noon: '💡 原本筆記寫 high noon（正午），平常很少用，日常說 noon 就好',
    'A.M.': '💡 A.M.、P.M. 要寫在時間後面\n7 A.M. 早上 7 點　3 P.M. 下午 3 點',
    yesterday: '💡 昨天、今天、明天的插畫是「撕日曆」：撕掉的 9 號是昨天，10 號是今天，11 號是明天'
  },
  color: {
    golden: '💡 金色當「顏色名稱」時，比較常說 gold\nThe ring is gold. 這個戒指是金色的。\ngolden 比較常放在名詞前面：golden hair 金色的頭髮'
  },
  animal: {
    mouse: '💡 複數是 mice（不是 mouses）',
    sheep: '💡 單複數一樣：one sheep、two sheep',
    deer: '💡 單複數一樣：one deer、two deer',
    goose: '💡 複數是 geese',
    cow: '💡 cow 是母牛；公牛是 bull',
    lamb: '💡 lamb 是小羊，也是「小羊肉」'
  },
  nature: {
    stream: '💡 river 是大河，stream 是小溪',
    path: '💡 path 是走路的小路，road 是車子開的馬路'
  },
  room: {
    board: '💡 黑板 blackboard、白板 whiteboard，都可以簡單說 board',
    'trash bin': '💡 美式也常說 trash can，英式說 rubbish bin',
    'end table': '💡 end table 是放在沙發旁邊的小桌子；床頭櫃是 nightstand（或 bedside table）',
    light: '💡 開燈 turn on the light、關燈 turn off the light'
  },
  meal: {
    'ice cream': '💡 一般寫成 ice cream，中間空一格',
    Coke: '💡 Coke 是品牌名，要大寫；一般的汽水叫 soda',
    'French fries': '💡 French 要大寫；英式英文叫 chips',
    supper: '💡 dinner 最常用；supper 是比較簡單、比較晚吃的晚餐',
    breakfast: '💡 三餐前面不加 a / the：have breakfast（吃早餐）'
  },
  subject: {
    PE: '💡 PE ＝ Physical Education（體育）',
    math: '💡 英式英文說 maths',
    _all: '💡 科目名稱前面不加 the：I like math.（不是 the math）'
  }
};
// 第六批的新單字先用 Emoji，以後有插畫再換
Object.assign(PICS, {
  animal: 'cat=🐱|dog=🐶|pig=🐷|rabbit=🐰|duck=🦆|tiger=🐯|fox=🦊|zebra=🦓|deer=🦌|horse=🐴|elephant=🐘|ant=🐜|fish=🐟|bird=🐦|eagle=🦅|beaver=🦫|snake=🐍|mouse=🐭|squirrel=🐿️|kangaroo=🦘|monkey=🐵|panda=🐼|bear=🐻|lion=🦁|giraffe=🦒|goose=🪿|sheep=🐑|goat=🐐|cow=🐄|donkey=🫏|squid=🦑|lobster=🦞|hen=🐔|turkey=🦃|lamb=🐑|shark=🦈|seal=🦭',
  nature: 'river=🏞️|lake=🛶|stream=💧|forest=🌲|path=🥾|road=🛣️|building=🏢|air=🌬️|moon=🌙|sun=☀️|mountain=⛰️|sky=🌤️|sea=🌊|tree=🌳|star=⭐',
  room: 'desk=📝|computer=💻|board=🟩|fan=🌀|light=💡|teacher\'s desk=🧑‍🏫|picture=🖼️|photo=📷|chart=📊|trash bin=🗑️|nightstand=🛏️|end table=🛋️|key=🔑|lock=🔒',
  meal: 'breakfast=🍳|lunch=🍱|dinner=🍽️|supper=🌙|meal=🍛|egg=🥚|tofu=🥢|ice=🧊|ice cream=🍦|Coke=🥤|hot dog=🌭|hamburger=🍔|French fries=🍟|jam=🍓|salad=🥗|soup=🍲',
  subject: 'Chinese=📜|English=🔤|math=➗|PE=🏃|science=🔬|social studies=🌏|music=🎵|art=🎨|history=🏛️|geography=🗺️'
});
PICS.job += '|accountant=🧮|salesperson=🛍️';

// 第二批插畫（補齊原本用 Emoji 的字）：加在後面，會蓋過前面的 Emoji
// 原圖在 原始素材/插畫/：水果堅果英中圖鑑卡片、蔬菜英文中文圖鑑13種、17種肉類英中圖解海報、21款工具英中圖鑑、天氣與氣候詞彙卡圖表、英中場景詞彙學習海報-2
for (const [key, words] of [
  ['fruit', 'pear,apricot,plum,loquat,mulberry,fig,persimmon,walnut,hazelnut,peanut,date,chestnut,coconut,sugarcane'],
  ['vegetable', 'cauliflower,asparagus,bean,beetroot,pumpkin,chilli,fennel,melon,celery,leek,radish,mushroom,pea'],
  ['meat', 'meat,veal,mutton,sirloin,steak,chop,cutlet,stew,roast,turkey,duck,fish,broth,rabbit,goose,liver,venison'],
  ['tool', 'bench,vice,plane,file,square,brad,sandpaper,pin,spade,fork,shovel,rake,sickle,brush,pickaxe,axe,lever,crank,lathe,clip,compass'],
  ['weather', 'weather,climate,atmosphere,mist,haze,shower,cyclone,gale,breeze,frost,dew,freeze,flood,tide,earthquake'],
  ['family', 'family,parent,child,couple,marriage,single,male,female,foster,heir,stepfather,stepmother,descent'],
  ['home', 'bed,refrigerator,TV,closet,bookshelf,mirror,curtain,carpet,pillow,blanket,clock,trash can'],
  ['month', 'January,February,March,April,May,June,July,August,September,October,November,December'],
  ['flower', 'narcissus,peony,violet'],
  ['transport', 'carriage,jeep,lorry,coach,railway,express,yacht,vessel'],
  ['job', 'actor,actress,singer,dancer,pianist,painter,professor,model,tailor,headteacher,director,editor,writer,announcer,chemist,explorer,researcher,surgeon,sailor,seaman,astronaut,athlete,detective,judge,baker,butcher,clerk,typist,secretary,salesman'],
  ['clothes', 'clothes,clothing,pocket,sleeve,sole,heel,tie,cotton,ring,necklace,perfume,purse,sandal,vest,stocking,apron,slipper,earring,lipstick,raincoat,button,collar,wallet,shawl'],
  ['sport', 'diving,race,dash,walk,high jump,long jump,throwing,rings,wrestling,chess,bridge,marathon,pole vault,shot put,discus,hammer,javelin,judo,fencing,bobsleigh,handball,hockey,cricket,canoe,freestyle,ice hockey,polo,water polo,sailing,rally,horizontal bar,parallel bars,rowing'],
  ['body', 'hair,cheek,lid,lip,tonsil,tooth,denture,gum,tongue,brain,chin,elbow,armpit,thigh,shank,calf,instep,nail,fist,bald,wrinkle,mole,chest,navel,hip,buttock,freckle,dimple,forehead,temple,mustache,whisker,sideburns,pimple,abdomen,waist,thumb'],
  ['place', 'parking lot,college,bar,court,port,shop,store,station,club,zoo,church,airport,bookshop,bookstore,institute,market,hotel,kindergarten,cashier,fitting room']
]) PICS[key] = (PICS[key] || '') + '|' + words.split(',').map(w => `${w}=img/${key}/${w.toLowerCase().replace(/ /g, '-')}.jpg`).join('|');

// ===================== 10/23 新增 10 類生活單字（使用者選：日常生活、自己和身體、出門和旅行；Claude 補的，沒有插畫，用 Emoji） =====================
// 格式：[代號, 名稱, 分類圖示, '中文=英文=Emoji|…']（Emoji 可以空著，會顯示淡淡的分類圖示）
const MORE_VOCAB = [
  ['bath', '浴室和日用品', '🧴', '牙刷=toothbrush=🪥|牙膏=toothpaste=🦷|毛巾=towel=|肥皂=soap=🧼|洗髮精=shampoo=🧴|潤髮乳=conditioner=|沐浴乳=body wash=|衛生紙=toilet paper=🧻|面紙=tissue=|梳子=comb=|吹風機=hair dryer=|刮鬍刀=razor=🪒|洗手台=sink=|馬桶=toilet=🚽|淋浴=shower=🚿|浴缸=bathtub=🛁|海綿=sponge=🧽'],
  ['chore', '家事', '🧹', '洗衣服=do the laundry=🧺|洗碗=do the dishes=🍽️|掃地=sweep the floor=🧹|拖地=mop the floor=|吸地板=vacuum=|倒垃圾=take out the trash=🗑️|整理床鋪=make the bed=🛏️|煮晚餐=cook dinner=🍳|燙衣服=iron the clothes=|晾衣服=hang out the laundry=|摺衣服=fold the clothes=👕|擦桌子=wipe the table=|澆花=water the plants=🪴|餵寵物=feed the pet=🐶|洗衣機=washing machine=|掃把=broom=🧹|拖把=mop=|吸塵器=vacuum cleaner='],
  ['cook', '廚房和煮飯', '🍳', '鍋子=pot=🍲|平底鍋=pan=🍳|水壺=kettle=🫖|砧板=cutting board=|烤箱=oven=|微波爐=microwave=|爐子=stove=|電鍋=rice cooker=🍚|煮（飯菜）=cook=🧑‍🍳|水煮=boil=|煎、炸=fry=🍳|炒=stir-fry=🥘|烤（麵包、蛋糕）=bake=🍞|烤（肉）=grill=🍖|蒸=steam=🥟|切=cut=🔪|削皮=peel=🥔|攪拌=mix=🥣'],
  ['taste', '調味料和味道', '🧂', '鹽=salt=🧂|糖=sugar=🍬|醬油=soy sauce=|醋=vinegar=|胡椒=pepper=|番茄醬=ketchup=🍅|油=oil=🫗|蜂蜜=honey=🍯|奶油=butter=🧈|甜的=sweet=🍭|酸的=sour=🍋|苦的=bitter=☕|辣的=spicy=🌶️|鹹的=salty=🧂|好吃的=delicious=😋|沒味道的、清淡的=bland='],
  ['feel', '情緒和感受', '😊', '開心的=happy=😊|難過的=sad=😢|生氣的=angry=😠|累的=tired=😫|無聊的=bored=😑|興奮的=excited=🤩|緊張的=nervous=😰|害怕的=scared=😨|驚訝的=surprised=😮|擔心的=worried=😟|寂寞的=lonely=😔|尷尬的=embarrassed=😳|驕傲的=proud=😤|放鬆的=relaxed=😌|困惑的=confused=😕|忌妒的=jealous=😒|餓的=hungry=🤤|渴的=thirsty=🥤|想睡的=sleepy=😴'],
  ['sick', '生病和症狀', '🤒', '頭痛=headache=🤕|肚子痛=stomachache=|牙痛=toothache=🦷|發燒=fever=🤒|感冒=cold=🤧|咳嗽=cough=😷|喉嚨痛=sore throat=|流鼻水=runny nose=🤧|打噴嚏=sneeze=🤧|頭暈的=dizzy=😵|過敏=allergy=|疹子=rash=|瘀青=bruise=|藥=medicine=💊|看醫生=see a doctor=🩺|受傷的=hurt=🩹'],
  ['travel', '機場和旅行', '✈️', '護照=passport=🛂|簽證=visa=|登機證=boarding pass=🎫|票=ticket=🎟️|行李=luggage=🧳|行李箱=suitcase=🧳|背包=backpack=🎒|班機=flight=✈️|登機門=gate=|座位=seat=💺|報到、入住=check in=|轉機的班機=connecting flight=|延誤=delay=⏰|海關=customs=🛂|出發=departure=🛫|抵達=arrival=🛬|紀念品=souvenir=🎁|導遊=tour guide=🚩|地圖=map=🗺️'],
  ['road', '馬路和交通', '🚦', '紅綠燈=traffic light=🚦|斑馬線=crosswalk=🚸|十字路口=intersection=|轉角=corner=|人行道=sidewalk=|橋=bridge=🌉|隧道=tunnel=|公車站=bus stop=🚏|塞車=traffic jam=🚗|加油站=gas station=⛽|高速公路=highway=🛣️|標誌、招牌=sign=🪧|左轉=turn left=⬅️|右轉=turn right=➡️|直走=go straight=⬆️'],
  ['money', '購物和錢', '🛒', '錢=money=💰|現金=cash=💵|信用卡=credit card=💳|硬幣=coin=🪙|價錢=price=🏷️|收據=receipt=🧾|折扣=discount=|特價中=on sale=🏷️|找的零錢=change=🪙|便宜的=cheap=|貴的=expensive=💸|購物車=shopping cart=🛒|袋子=bag=🛍️|退款=refund=|退貨=return=|尺寸=size=|試穿=try on=👗'],
  ['country', '國家和語言', '🌍', '台灣=Taiwan=🇹🇼|台灣人；台語=Taiwanese=|日本=Japan=🇯🇵|日本人；日文=Japanese=|韓國=Korea=🇰🇷|韓國人；韓文=Korean=|美國=the US=🇺🇸|美國人；美國的=American=|英國=the UK=🇬🇧|英國人；英國的=British=|法國=France=🇫🇷|法國人；法文=French=|德國=Germany=🇩🇪|德國人；德文=German=|泰國=Thailand=🇹🇭|泰國人；泰文=Thai=|越南=Vietnam=🇻🇳|越南人；越南文=Vietnamese='],
  // 10/23 使用者選的：3C 電子產品、節日（最常用到的兩類）
  ['tech', '3C 電子產品', '📱', '手機=cell phone=📱|智慧型手機=smartphone=📱|筆電=laptop=💻|平板=tablet=|相機=camera=📷|耳機=earphones=🎧|藍牙耳機=wireless earbuds=|滑鼠=mouse=🖱️|鍵盤=keyboard=⌨️|螢幕=screen=🖥️|充電器=charger=🔌|充電線=charging cable=|行動電源=power bank=🔋|插座=outlet=🔌|電池=battery=🔋|網路=internet=🌐|無線網路=Wi-Fi=📶|訊號=signal=📶|帳號=account=|密碼=password=🔑|應用程式=app=📲|下載=download=⬇️|更新=update=🔄|截圖=screenshot='],
  ['festival', '節日', '🎉', `春節、農曆新年=Chinese New Year=🧨|除夕=New Year's Eve=🌙|紅包=red envelope=🧧|元宵節=Lantern Festival=🏮|清明節=Tomb-Sweeping Day=|端午節=Dragon Boat Festival=🐉|粽子=rice dumpling=|中秋節=Moon Festival=🥮|聖誕節=Christmas=🎄|聖誕老人=Santa Claus=🎅|萬聖節=Halloween=🎃|感恩節=Thanksgiving=🦃|情人節=Valentine's Day=💝|母親節=Mother's Day=💐|父親節=Father's Day=👔|元旦=New Year's Day=🎆|生日=birthday=🎂|煙火=fireworks=🎆|國定假日、假期=holiday=🏖️`]
];
for (const [key, name, icon, list] of MORE_VOCAB) {
  const rows = list.split('|').map(s => s.split('='));
  VOCAB.push([key, name, rows.map(([zh, en]) => zh + '=' + en).join('|')]);
  VOCAB_ICON[key] = icon;
  PICS[key] = (PICS[key] || '') + '|' + rows.filter(r => r[2]).map(([, en, p]) => en + '=' + p).join('|');
}
Object.assign(VOCAB_TIPS, {
  bath: { tissue: '💡 tissue 是擦臉、擤鼻涕的面紙；toilet paper 是上廁所用的衛生紙', shower: '💡 shower 也是動詞「淋浴」：I take a shower every night. 我每天晚上洗澡' },
  chore: { 'hang out the laundry': '💡 晾衣服是 hang out the laundry；hang up the clothes 是「把衣服掛起來」（掛到衣架、衣櫃裡）', _do: '💡 家事常用 do：do the laundry、do the dishes、do housework（做家事）\n💡 問家事：Who does the dishes at your home? 你家誰洗碗？', vacuum: '💡 vacuum 當動詞是「用吸塵器吸」，吸塵器是 vacuum cleaner' },
  cook: { cook: '💡 cook 是動詞「煮」，也是名詞「廚師」；cooker 是「鍋具」，不是人！', bake: '💡 bake 用烤箱烤麵包、蛋糕；grill 是用火直接烤肉；roast 是大塊的肉放烤箱烤' },
  taste: { _taste: '💡 問味道：How does it taste? 味道怎麼樣？\n💡 回答：It tastes sweet. 吃起來甜甜的（taste 後面接形容詞）', spicy: '💡 spicy 是「辣」；hot 也可以說辣，但 hot 也有「燙」的意思', pepper: '💡 pepper 是胡椒；bell pepper 才是甜椒（在「蔬菜」那類）' },
  feel: { bored: '⚠️ bored（覺得無聊）和 boring（令人無聊）不一樣：\nI am bored. 我好無聊 ✓\nI am boring. 我是個無聊的人 ✗（意思差很多）', excited: '💡 一樣的規則：excited 我很興奮／exciting 這件事很刺激', _feel: '💡 說心情：I feel happy. 或 I am happy.\n💡 問心情：How do you feel? 你覺得怎麼樣？' },
  sick: { _have: '💡 生病大多用 have：I have a headache. 我頭痛。I have a fever. 我發燒\n💡 去藥局說：I don\'t feel well. 我不太舒服', cold: '💡 cold 有兩個意思：「冷的」和「感冒」：I have a cold. 我感冒了', sneeze: '💡 別人打噴嚏時，要說 Bless you!（保佑你），對方會說 Thank you.' },
  travel: { luggage: '⚠️ luggage 是不可數名詞，不能說 two luggages，要說 two pieces of luggage 或 two bags', 'check in': '💡 機場報到、飯店入住都用 check in；退房是 check out' },
  road: { bridge: '💡 bridge 另一個意思是紙牌遊戲「橋牌」（在「體育」那類）', _ask: '💡 問路：How do I get to the station? 我要怎麼去車站？\n💡 可以搭配「💬 情境對話」的「🗺️ 問路」一起練', sidewalk: '💡 sidewalk 是美式；英式說 pavement' },
  money: { change: '💡 change 當名詞是「找的零錢」：Keep the change. 不用找了', _pay: '💡 結帳：Can I pay by card? 可以刷卡嗎？\n💡 問價錢：How much is it? 這個多少錢？' },
  country: { _rule: '💡 國家、國籍、語言的第一個字母都要大寫：Japan、Japanese\n💡 說自己：I\'m from Taiwan. 我來自台灣。I speak Chinese. 我會說中文', 'the US': '💡 美國也可以說 the USA 或 America，前面記得加 the（the US、the UK）' }
});
// 10/23 全站內容檢查補的提醒：中文翻譯容易誤會、英美說法不同的字
for (const [key, en, tip] of [
  ['vegetable', 'leek', '💡 leek 是韭蔥（長得像大蔥）；台灣的韭菜是 Chinese chives'],
  ['vegetable', 'radish', '💡 radish 常指小顆的紅皮蘿蔔；台灣的白蘿蔔叫 daikon 或 white radish'],
  ['vegetable', 'chilli', '💡 chilli 是英式拼法，美式寫 chili'],
  ['meat', 'sirloin', '💡 sirloin 是「沙朗」；最嫩的「里脊」是 tenderloin'],
  ['meat', 'chop', '💡 pork chop 是帶骨的豬排，台灣的「排骨飯」就是 pork chop rice；一整排的肋排叫 spare ribs'],
  ['bakery', 'loaf', '💡 a loaf of bread 是「一條麵包」，切下來的一片是 a slice of bread'],
  ['place', 'cashier', '💡 cashier 是「收銀員」（人）；收銀台是 checkout 或 cash register'],
  ['weather', 'cyclone', '💡 cyclone、typhoon、hurricane 都是熱帶風暴，只是地方不同：印度洋、澳洲叫 cyclone'],
  ['job', 'chemist', '💡 英國的 chemist 也指「藥劑師、藥局」（美國叫 pharmacist、pharmacy）'],
  ['clothes', 'purse', '💡 美國的 purse 是女生的「手提包」；英國的 purse 才是小錢包'],
  ['clothes', 'muffler', '💡 美國的 muffler 也是汽車的「消音器」；圍巾一般說 scarf'],
  ['body', 'whisker', '💡 whiskers 是臉頰兩邊的鬍鬚、貓的鬍鬚；絡腮鬍、下巴的鬍子是 beard'],
  // 📱 3C 電子產品
  ['tech', '_3c', '💡「3C」是台灣的說法，英文說 electronics（電子產品）或 gadgets（小裝置）'],
  ['tech', 'cell phone', '💡 美國說 cell phone，英國說 mobile phone；平常直接說 phone 就可以'],
  ['tech', 'laptop', '⚠️ notebook 在英文通常是「筆記本」，筆電要說 laptop'],
  ['tech', 'outlet', '💡 插座：美國說 outlet，英國說 socket；插頭是 plug'],
  ['tech', 'power bank', '💡 行動電源也可以說 portable charger'],
  ['tech', 'mouse', '💡 電腦的滑鼠，複數 mice 或 mouses 都有人用'],
  ['tech', 'wireless earbuds', '💡 earbuds 是塞進耳朵的小耳機；headphones 是戴在頭上的大耳機'],
  ['tech', 'app', '💡 app 是 application（應用程式）的簡稱，念 /æp/'],
  ['tech', 'screenshot', '💡 截圖是 take a screenshot：I took a screenshot. 我截圖了'],
  ['tech', '_phone', '💡 手機沒電：My phone is dead. 手機快沒電：My battery is low.\n💡 「上網」是 go online，不是 go internet'],
  // 🎉 節日
  ['festival', '_cap', '💡 節日名稱的每個字開頭都要大寫：Chinese New Year、Mother\'s Day\n💡 祝福：Happy New Year!、Merry Christmas!、Happy Mother\'s Day!'],
  ['festival', 'Chinese New Year', '💡 也常說 Lunar New Year（農曆新年）；過年快樂：Happy Chinese New Year!'],
  ['festival', 'red envelope', '💡 也叫 red packet；給紅包：give someone a red envelope'],
  ['festival', 'Tomb-Sweeping Day', '💡 也叫 Qingming Festival'],
  ['festival', 'Moon Festival', '💡 也叫 Mid-Autumn Festival（中秋節）'],
  ['festival', 'rice dumpling', '💡 粽子是 rice dumpling；水餃是 dumpling，不要搞混'],
  ['festival', 'holiday', '💡 美國的 holiday 是「國定假日」，去度假說 vacation；英國的 holiday 兩個意思都有\n💡 在節日當天用 on：on Christmas Day、on Mother\'s Day']
]) {
  VOCAB_TIPS[key] = VOCAB_TIPS[key] || {};
  VOCAB_TIPS[key][en] = VOCAB_TIPS[key][en] ? VOCAB_TIPS[key][en] + '\n' + tip : tip;
}
// ===================== 🎵 諧音字放進單字庫（10/24 使用者：不要另外一個分類，諧音放在單字下面當提示） =====================
// 格式：[分類, 中文, 英文, 諧音口訣]；單字庫已經有的字只加提示
for (const [key, zh, en, hint] of [
  ['home', '沙發', 'sofa', '中文「沙發」就是照英文發音翻的'],
  ['meal', '沙拉', 'salad', '中文「沙拉」就是照英文發音翻的'],
  ['meal', '起司', 'cheese', '中文「起司」就是照英文發音翻的'],
  ['bakery', '布丁', 'pudding', '中文「布丁」就是照英文發音翻的'],
  ['bakery', '吐司', 'toast', '中文「吐司」就是照英文發音翻的'],
  ['bakery', '巧克力', 'chocolate', '中文「巧克力」就是照英文發音翻的'],
  ['fruit', '檸檬', 'lemon', '中文「檸檬」就是照英文發音翻的'],
  ['fruit', '芒果', 'mango', '中文「芒果」就是照英文發音翻的'],
  ['taste', '蜂蜜', 'honey', '哈尼 → 甜得像蜂蜜的哈尼（honey 也是「親愛的」）'],
  ['taste', '酸的', 'sour', '餿 → 餿掉的東西是酸的'],
  ['transport', '救護車', 'ambulance', '俺不能死 → 快叫救護車'],
  ['transport', '引擎', 'engine', '中文「引擎」就是照英文發音翻的'],
  ['transport', '雷達', 'radar', '中文「雷達」就是照英文發音翻的'],
  ['tech', '麥克風', 'microphone', '中文「麥克風」就是照英文發音翻的；簡稱 mic'],
  ['tech', '駭客', 'hacker', '中文「駭客」就是照英文發音翻的'],
  ['tech', '卡通', 'cartoon', '中文「卡通」就是照英文發音翻的'],
  ['sport', '高爾夫球', 'golf', '中文「高爾夫」就是照英文發音翻的'],
  ['sport', '瑜伽', 'yoga', '中文「瑜伽」就是照英文發音翻的'],
  ['sport', '馬拉松', 'marathon', '中文「馬拉松」就是照英文發音翻的'],
  ['sport', '撲克牌', 'poker', '中文「撲克」就是照英文發音翻的'],
  ['subject', '邏輯', 'logic', '中文「邏輯」就是照英文發音翻的'],
  ['subject', '吉他', 'guitar', '中文「吉他」就是照英文發音翻的'],
  ['animal', '害蟲', 'pest', '拍死它 → 看到害蟲就拍死它'],
  ['animal', '螫、刺', 'sting', '死盯 → 蜜蜂死盯著你，然後螫你'],
  ['animal', '咬', 'bite', '拜 → 拜託不要咬我'],
  ['body', '強壯的', 'strong', '死壯 → 壯到不行'],
  ['body', '汗', 'sweat', '水的 → 流汗流得都是水'],
  ['feel', '幽默', 'humor', '中文「幽默」就是照英文發音翻的'],
  ['feel', '膽小鬼', 'coward', '靠我的 → 什麼都要靠我'],
  ['feel', '懶惰的', 'lazy', '累死 → 懶人一動就喊累死'],
  ['feel', '害羞的', 'shy', '帥 → 長太帥被大家看，好害羞'],
  ['feel', '心情', 'mood', '木的 → 心情不好，整個人木木的'],
  ['feel', '取笑、捉弄', 'tease', '踢死 → 再取笑我就踢死你'],
  ['feel', '嘆氣', 'sigh', '賽 → 今天好賽，嘆一口氣'],
  ['feel', '懷疑', 'doubt', '到底 → 到底是不是真的？好懷疑（b 不發音）'],
  ['feel', '欽佩、欣賞', 'admire', '愛的媽 → 最欣賞愛我的媽媽'],
  ['feel', '忙的', 'busy', '逼死 → 忙到快被逼死'],
  ['feel', '哭', 'cry', '快 → 快哭了'],
  ['feel', '說謊', 'lie', '賴 → 說謊又賴皮'],
  ['sick', '極大的痛苦', 'agony', '愛過你 → 愛過才知道有多痛'],
  ['sick', '咳嗽', 'cough', '咳夫 → 一直咳（gh 念 /f/）'],
  ['money', '錢', 'money', '媽你 → 媽，你可以給我錢嗎？'],
  ['money', '便宜的', 'cheap', '氣噗 → 賣這麼便宜，老闆氣噗噗'],
  ['money', '小費', 'tip', '貼 → 貼一點小費給服務生'],
  ['money', '經濟', 'economy', '依靠農民 → 經濟要靠農民'],
  ['travel', '匆忙', 'hurry', '哈利 → 哈利快點，要遲到了！'],
  ['travel', '逃走', 'flee', '飛離 → 飛快地離開'],
  ['family', '單身漢', 'bachelor', '白吃了 → 單身漢常常白吃白喝'],
  ['job', '候選人', 'candidate', '看的累 → 候選人那麼多，看得好累']
]) {
  const v = VOCAB.find(x => x[0] === key);
  if (!v[2].split('|').some(s => s.split('=')[1] === en)) v[2] += `|${zh}=${en}`;
  VOCAB_TIPS[key] = VOCAB_TIPS[key] || {};
  const t = '🎵 諧音：' + hint;
  VOCAB_TIPS[key][en] = VOCAB_TIPS[key][en] ? VOCAB_TIPS[key][en] + '\n' + t : t;
}
VOCAB_TIPS.feel._sound = '⚠️ 🎵 諧音只用來記「意思」！真正的發音一定要按 🔊 聽，照中文念會念錯';
// 🔀 一字多義：單字庫裡已經有的字，加「另一個意思」提示（10/24）
for (const [key, en, tip] of [
  ['room', 'light', '🔀 另一個意思：輕的 This bag is very light. 這個包包很輕'],
  ['room', 'fan', '🔀 另一個意思：粉絲、迷 I\'m a big fan of this singer. 我是這位歌手的大粉絲'],
  ['place', 'bank', '🔀 另一個意思：河岸 the river bank 河岸'],
  ['tableware', 'glass', '🔀 glass 也是「玻璃」；加 es 的 glasses 是「眼鏡」'],
  ['place', 'park', '🔀 park 也是動詞「停車」（詳細在「背單字妙招 → 一字多義」）'],
  ['tech', 'mouse', '🔀 mouse 也是動物「老鼠」'],
  ['month', 'May', '🔀 小寫 may 是「可以、可能」：May I come in? 我可以進來嗎？'],
  ['transport', 'train', '🔀 另一個意思：訓練 I train at the gym every day. 我每天在健身房訓練'],
  ['clothes', 'ring', '🔀 另一個意思：（鈴聲）響 The phone is ringing. 電話在響'],
  ['season', 'spring', '🔀 另一個意思：泉水 hot spring 溫泉'],
  ['season', 'fall', "🔀 另一個意思：跌倒、掉下來 Be careful! Don't fall. 小心！別跌倒"],
  ['road', 'sign', '🔀 另一個意思：簽名 Please sign here. 請在這裡簽名'],
  ['feel', 'sleepy', '🔁 sleepy 是「想睡」（眼睛快閉上）；tired 是「累」（身體沒力）。詳細在「背單字妙招 → 中文一樣、英文要分開用」'],
  ['feel', 'tired', "🔁 tired 是「累」（身體沒力）；sleepy 是「想睡」。I'm tired after work. 我下班後很累"],
  ['sick', 'hurt', '🔁 hurt 也是動詞「痛」：My leg hurts. 我的腿好痛；pain 是名詞「疼痛」：I have back pain.']
]) {
  VOCAB_TIPS[key] = VOCAB_TIPS[key] || {};
  if (!(VOCAB_TIPS[key][en] || '').includes(tip.slice(0, 8))) VOCAB_TIPS[key][en] = VOCAB_TIPS[key][en] ? VOCAB_TIPS[key][en] + '\n' + tip : tip;
}
// 📝 單字的中文不只一種（10/24 使用者要的）：「主要意思；其他常見意思」，只加初學者真的會遇到的
// 卡片 id 是用英文做的，改中文不會影響練習紀錄
for (const [key, list] of Object.entries({
  month: 'May=可以、可能（小寫 may）',
  season: 'spring=泉水、彈簧|fall=跌倒、掉下來',
  color: 'orange=柳橙|silver=銀',
  staple: '',
  bakery: 'toast=乾杯、敬酒',
  tableware: 'glass=玻璃|table=表格',
  drink: 'shake=搖',
  fruit: 'orange=橘色的|date=日期；約會',
  meat: 'chop=剁、切|roast=烤（動詞）|turkey=土耳其（大寫 T）|fish=釣魚',
  transport: 'train=訓練|coach=教練|express=表達|plane=刨子（工具）',
  tool: 'saw=看到（see 的過去式）|level=程度、等級|ruler=統治者|nail=指甲|nut=堅果|file=檔案|square=正方形；廣場|brush=刷（牙）|plane=飛機|bench=長椅|spade=黑桃（撲克牌）',
  weather: 'hot=燙的；辣的|cold=感冒|cool=很酷|dry=擦乾、弄乾|fine=很好；罰款|dull=無聊的|rain=下雨|snow=下雪|shower=淋浴|freeze=（電腦）當機；不准動',
  place: 'bank=河岸|park=停車|court=球場|club=社團|store=儲存|shop=買東西|bar=條、棒（a bar of chocolate）',
  family: 'single=單一的；單人的|couple=兩個、幾個（a couple of）',
  home: 'study=讀書|floor=樓層|table=表格',
  job: 'cook=煮|judge=判斷|model=模型|director=主管、主任|chemist=藥劑師（英式）',
  clothes: 'suit=適合|tie=綁、打結|ring=（鈴聲）響|dress=穿衣服|heel=腳跟',
  sport: 'race=種族|walk=走路、散步|bridge=橋|hammer=鎚子|cricket=蟋蟀|football=美式足球（美國）',
  body: 'hand=遞給|palm=棕櫚樹|nail=釘子|temple=寺廟|calf=小牛|lid=蓋子|gum=口香糖|chest=箱子|face=面對|mole=鼴鼠',
  animal: 'seal=封住、蓋章|bear=忍受（can\'t bear）|turkey=土耳其（大寫 T）|fish=釣魚|mouse=滑鼠',
  nature: 'star=明星',
  room: 'board=登（機、船）|fan=粉絲|light=輕的；點（火）|key=關鍵|lock=鎖上',
  meal: 'jam=塞車（traffic jam）',
  subject: 'Chinese=中國人；中國的',
  bath: 'sink=下沉|shower=陣雨',
  chore: 'mop=拖（地）',
  cook: 'cook=廚師|steam=蒸氣|cut=傷口|peel=果皮',
  taste: 'sweet=貼心的|pepper=甜椒（bell pepper）',
  feel: 'lie=躺|cry=大叫|busy=（電話）忙線中',
  sick: 'cold=冷的|hurt=痛（動詞）|medicine=醫學',
  travel: 'flight=飛行|gate=大門|ticket=罰單',
  road: 'sign=簽名|bridge=橋牌',
  money: 'change=改變|tip=小撇步|return=回來；歸還',
  tech: 'tablet=藥片|account=（銀行）帳戶'
})) {
  if (!list) continue;
  const v = VOCAB.find(x => x[0] === key);
  for (const [en, more] of list.split('|').map(s => s.split('='))) {
    v[2] = v[2].split('|').map(s => { const [zh, e] = s.split('='); return e === en && !zh.includes(more) ? `${zh}；${more}=${e}` : s; }).join('|');
  }
}
const picOf = (key, en) => {
  const hit = (PICS[key] || '').split('|').reverse().find(p => p.split('=')[0] === en);   // 後面的優先
  return hit ? hit.split('=')[1] : '';
};

NOTES.push({
  id: 'vocab',
  name: '單字',
  icon: '📚', color: '#d64578',
  desc: `${VOCAB.reduce((n, v) => n + v[2].split('|').length, 0)} 個常用單字，分 ${VOCAB.length} 類，點 🔊 聽發音`,
  items: VOCAB.flatMap(([key, name, list]) => {
    const words = list.split('|').map(s => s.split('='));
    const rowPic = en => `{{pic:${picOf(key, en) || 'faded:' + VOCAB_ICON[key]}}}`;
    return [
      {
        id: 'vocab-' + key, title: `${VOCAB_ICON[key]} ${name}（${words.length} 個）`,
        // 屬於某個單字的小提醒，直接放在那個單字下面；_ 開頭的總體提醒才放在最下面
        note: words.map(([zh, en]) => {
          // 拿掉「更正」的句子（插畫／原本筆記哪裡寫錯），只留教學內容
          const tip = ((VOCAB_TIPS[key] || {})[en] || '').split('\n')
            .filter(l => !/收集的筆記|原本筆記|原本的筆記|原本寫|插畫上|插畫寫|網站改成/.test(l)).join('\n');
          const t = tip ? `{{tip:${tip.replace(/^💡\s*/, '').replace(/\n/g, '¶').replace(/　/g, ' ').replace(/[{}]/g, '')}}}` : '';
          return `${rowPic(en)} ${en} {{say:${en}}}　${zh}${t}`;
        }).join('\n') +
          (() => {
            const general = Object.entries(VOCAB_TIPS[key] || {}).filter(([k]) => k.startsWith('_')).map(([, v]) => v);
            return general.length ? '\n\n' + general.join('\n\n') : '';
          })()
      },
      ...words.map(([zh, en]) => ({
        id: 'w-' + key + '-' + en.toLowerCase().replace(/[^a-z]+/g, '-'),
        front: zh, back: en + (() => {
          const first = ((VOCAB_TIPS[key] || {})[en] || '').replace(/^💡\s*/, '').split('\n')
            .find(l => l && !/收集的筆記|原本筆記|原本的筆記|原本寫|插畫上|插畫寫|網站改成/.test(l));
          return first ? '\n' + first : '';
        })(), group: key, say: en,
        pic: picOf(key, en), groupIcon: VOCAB_ICON[key]
      }))
    ];
  })
});

// ===================== 📍 方位介係詞（使用者提供的插畫圖卡，切成 img/prep/*.jpg） =====================
// 「圖檔名=英文=中文=例句=例句中文=不能當錯誤選項的字」
// 每張圖有兩個檔案：xxx.jpg（完整圖卡）、xxx-pic.jpg（只有插畫，卡片和測驗用，才不會先看到答案）
const PREP = [
  'front=front=前面=The girl is in front of the cat.=女孩在貓的前面。=in front of',
  'behind=behind=後面=The cat is behind the girl.=貓在女孩的後面。=',
  'next-to=next to=在……旁邊=The cat is next to the girl.=貓在女孩的旁邊。=beside,near',
  'between=between=在……之間=The girl is between the cat and the dog.=女孩在貓和狗之間。=',
  'under=under=在……下面=The cat is under the table.=貓在桌子下面。=',
  'on=on=在……上面=The cat is on the table.=貓在桌子上面。=onto,over',
  'in=in=在……裡面=The cat is in the box.=貓在箱子裡面。=inside,into',
  'out-of=out of=從……出來=The cat is out of the box.=貓從箱子裡出來了。=outside,off',
  'over=over=在……正上方（越過）=The cat jumps over the fence.=貓跳過籬笆。=on,across',
  'across=across=穿過、橫越=She walks across the street.=她穿過馬路。=through,over,along',
  'into=into=進入……裡面=She goes into the room.=她進入房間。=in,inside',
  'onto=onto=到……上面（移動）=She gets onto the bed.=她上床。=on,up',
  'off=off=離開……（從上面下來）=She gets off the bed.=她下床。=down,out of',
  'up=up=向上=She goes up the stairs.=她走上樓。=onto',
  'down=down=向下=She goes down the stairs.=她走下樓。=off',
  'in-front-of=in front of=在……的前面=She is in front of the bookstore.=她在書店的前面。=front',
  'behind-tree=behind=在……的後面（遮住）=She hides behind the tree.=她躲在樹的後面。=',
  'beside=beside=在……旁邊（坐在旁邊）=She sits beside the cat.=她坐在貓的旁邊。=next to,near',
  'near=near=在……附近=Her house is near the school.=她的家在學校附近。=next to,beside',
  'far-from=far from=離……很遠=Her house is far from the school.=她的家離學校很遠。=',
  'inside=inside=在……內部=She is inside the cup.=她在杯子裡面。=in,into',
  'outside=outside=在……外面=She is outside the cup.=她在杯子外面。=out of',
  'through=through=穿過（從一端到另一端）=She goes through the tunnel.=她穿過隧道。=across',
  'along=along=沿著……（一邊走一邊）=She walks along the river.=她沿著河邊走。=across'
].map(s => {
  const [file, en, zh, ex, exZh, avoid] = s.split('=');
  return { file, en, zh, ex, exZh, avoid: avoid ? avoid.split(',') : [] };
});

NOTES.splice(2, 0, {   // 放在「基礎文法」後面
  id: 'place-prep',
  name: '方位介係詞',
  icon: '📍', color: '#e0678f', desc: '24 張插畫圖卡：在上面、下面、旁邊…',
  items: [
    {
      id: 'pp-all',
      title: '24 個方位介係詞（插畫圖卡）',
      note: '看圖記最快！點圖片可以放大。\n\n' + PREP.map(p => `{{card:img/prep/${p.file}.jpg}}`).join('\n') +
        '\n\n💡 這一類的卡片和測驗會只顯示插畫，請你猜是哪個介係詞。'
    },
    {
      id: 'pp-compare',
      title: '容易搞混的方位介係詞',
      note: '① in 和 into：有沒有在移動？\nThe cat is [in] the box.\n貓在箱子裡（待著不動）\nShe goes [into] the room.\n她走進房間（從外面移動到裡面）\n\n② on 和 onto：有沒有在移動？\nThe cat is [on] the table.\n貓在桌子上（待著不動）\nShe gets [onto] the bed.\n她爬上床（移動到上面）\n\n③ on 和 over：有沒有碰到？\nThe cat is [on] the table.\n有碰到桌子\nThe cat jumps [over] the fence.\n在正上方越過，沒碰到\n\n④ across 和 through：從表面還是從裡面？\nShe walks [across] the street.\n從馬路的一邊走到另一邊（在表面上）\nShe goes [through] the tunnel.\n從隧道裡面穿過去\n\n⑤ next to、beside、near：多近？\nnext to、beside　緊貼在旁邊\nnear　在附近，不一定貼著\n\n⑥ off 和 out of：從哪裡離開？\nShe gets [off] the bed.\n從「上面」下來\nThe cat is [out of] the box.\n從「裡面」出來\n\n👉 有移動 → into、onto、out of、off；待著不動 → in、on、under',
      front: 'in 和 into 差在哪？',
      back: 'in：在裡面（不動）\ninto：進入裡面（有移動）',
      quiz: { q: 'She walks ___ the room.（她走進房間）', options: ['in', 'into', 'on', 'over'], answer: 1 }
    },
    {
      id: 'pp-across-through',
      front: 'across 和 through 差在哪？',
      back: 'across：從表面的一邊到另一邊（過馬路）\nthrough：從裡面穿過去（穿過隧道）',
      quiz: { q: 'The train goes ___ the tunnel.', options: ['across', 'through', 'over', 'along'], answer: 1 }
    },
    ...PREP.map(p => ({
      id: 'pp-' + p.file, group: 'place-prep',
      front: p.zh, back: `${p.en}\n${p.ex}\n${p.exZh}`, say: `${p.en}. ${p.ex}`,
      pic: `img/prep/${p.file}-pic.jpg`, avoid: p.avoid,
      // 測驗：看圖填空，例如 The cat is ___ the table.
      blank: p.ex.replace(' ' + p.en + ' ', ' ___ ') + `\n（${p.zh}）`
    }))
  ]
});

// ===================== 發音規則：每個例字都加上 🔊 =====================
// 筆記裡「：」後面的英文單字加上發音按鈕；卡片背面念例字（例如 know, knife）
for (const it of NOTES.find(c => c.id === 'pron').items) {
  if (it.id === 'letter-combos') {
    // 一組一格：【ture　念 /tʃər/】，下面每個例字一列「nature 🔊　自然」
    it.note = '{{grid}}\n這 12 組字母，不管出現在哪個單字裡，念法都一樣。點 🔊 聽聽看。\n\n' +
      it.note.split('\n').map(l => {
        const [, combo, ipa, words] = l.match(/^\d+\.\s*(.+?)\s*\[(.+?)\]：(.*)$/);
        return `【${combo}　念 /${ipa}/】\n` +
          words.split('、').map(w => w.replace(/^([A-Za-z]+)\s*(.*)$/, '$1 {{say:$1}}　$2')).join('\n');
      }).join('\n\n');
    continue;
  }
  if (it.note) {
    it.note = it.note.split('\n').map(l => l.replace(/：(.*)$/, (_, rest) =>
      '：' + rest.replace(/[A-Za-z]+/g, w => `${w} {{say:${w}}}`))).join('\n');
  }
  const words = it.back && (it.back.split('\n')[1] || '').match(/[A-Za-z]+/g);
  if (words) it.say = words.join(', ');
}

// ===================== 🔗 動詞片語（使用者 10/22 的筆記本截圖：第四組～第十一組） =====================
// 格式跟單字一樣：「片語=中文」用 | 隔開；第三格是這組的說明，第四格是小提醒（可省略）
const PHRASES = [
  ['bare', '後面接原形動詞（感官、使役動詞）', '這些動詞後面是「人 + 動詞原形」，中間不加 to。',
    'see sb. do sth.=看見某人做某事|watch sb. do sth.=看著某人做某事|look at sb. do sth.=看著某人做某事|hear sb. do sth.=聽見某人做某事|feel sb. do sth.=感覺到某人做某事|notice sb. do sth.=注意到某人做某事|observe sb. do sth.=觀察到某人做某事|make sb. do sth.=使某人做某事|have sb. do sth.=讓某人做某事|let sb. do sth.=讓某人做某事',
    '💡 sb. ＝ somebody（某人），sth. ＝ something（某事）\nI saw him leave. 我看見他離開。\nMy mom made me clean my room. 媽媽叫我打掃房間。'],
  ['be', 'be 動詞片語（be + 形容詞 + 介係詞）', '後面的介係詞要一起背，例如 be afraid of、be good for。',
    'be interested in=對…有興趣|be surprised at=對…感到驚訝|be ready for=為…做好準備|be afraid of=害怕…|be afraid to do=害怕去做|be glad to do=很高興去做|be good for=對…有益|be angry with=對（某人）生氣|be mad at=對…生氣|be pleased with=對…感到滿意、高興|be satisfied with=對…很滿意|be famous for=因…而有名|be famous as=以（某身分）而有名|be strict with=對（某人）嚴格|be strict in=在（某方面）嚴格|be careful of=小心…|be late for=…遲到|be in trouble=有麻煩|be free=有空|stay at home=待在家',
    '💡 be famous for 後面接「原因」：Taiwan is famous for bubble tea.\nbe famous as 後面接「身分」：He is famous as a singer.\n💡 be strict with 後面接「人」，be strict in 後面接「事情」\n⚠️ 收集的筆記有錯：be in trouble 寫「看麻煩」→ 正確是「有麻煩」\n⚠️ be mad at 寫「瘋狂於」→ 正確是「對…生氣」（瘋狂喜歡是 be mad about）\n💡 stay at home 不是 be 動詞片語，原本就放在這組，所以留著'],
  ['up', '動詞 + up', 'up 常有「向上」「完全、做完」的意思。',
    'get up=起床、站起來|sit up=熬夜、坐起來|stay up=熬夜|grow up=長大|give up=放棄|pick up=撿起、接（人）、學會|set up=建立、架設|make up=組成、編造、化妝|bring up=撫養、提出|take up=開始從事|turn up=出現、（音量）調大|look up=查（字典）、抬頭看|use up=用完|end up=最後（變成）|hurry up=趕快|speed up=加速|keep up=保持、跟上|build up=建立、增強|put up=搭起、張貼|do up=扣上、整修|cut up=切碎|burn up=燒光|clear up=收拾、（天氣）放晴|open up=打開、開發|tear up=撕碎|go up=上升、上漲|fix up=修理、安排|hold up=舉起、耽擱|ring up=打電話給|divide up=分配|send up=發射|come up=出現、長出來|lay up=儲存|fill up=裝滿、加滿（油）|dress up=打扮|wake up=醒來、叫醒|cheer up=振作起來、使開心|show up=出現、露面|stand up=站起來|mix up=混合、搞混|call up=打電話給|clean up=打掃乾淨',
    '💡 很多「動詞 + up」的 up 是「完全」：use up 全部用完、eat up 全部吃完、tear up 撕成碎片\n⚠️ 收集的筆記把 slow down、put down（down 組）和 keep out of（out 組）也放在 up 這組，已經搬到正確的組\n💡 look up 是補充的常用片語（原本筆記沒有）'],
  ['down', '動詞 + down', 'down 常有「向下」「減少」「停下來」的意思。',
    'sit down=坐下|slow down=慢下來|calm down=冷靜下來|settle down=安頓下來|turn down=拒絕、（音量）調小|break down=故障、崩潰|put down=放下、寫下|write down=寫下|cut down=砍倒、減少|burn down=燒毀|take down=拆下、記下|tear down=拆除|pass down=傳下來',
    '💡 turn up（調大聲）↔ turn down（調小聲）\n⚠️ 收集的筆記標題寫「動詞 + down（20 個）」，但裡面一半是 out 的片語，已經分開放\n💡 sit down、write down 是補充的常用片語'],
  ['out', '動詞 + out', 'out 常有「向外」「出來」「完全、徹底」的意思。',
    'find out=查出、發現|figure out=想出、弄懂|point out=指出|carry out=執行|try out=試用|work out=想出、運動健身|turn out=結果是|run out=用完|look out=小心|hand out=分發|give out=分發、用完|send out=發出|put out=撲滅|speak out=說出來|let out=放出、洩露|break out=（戰爭、火災）爆發|burst out=突然…起來|pick out=挑選|make out=看清、理解|hold out=堅持、伸出|bring out=推出、使顯現|wear out=穿破、用壞、累壞|keep out of=不進入、避開|go out=出去、（燈、火）熄滅|come out=出版、（花）開、出來|run out of=用完（後面接東西）|sell out=賣光|set out=出發、著手|take out=拿出、取出|leave out=遺漏、省略|die out=滅絕|clean out=清理乾淨',
    '💡 run out 後面不接東西：Time is running out.（時間快用完了）\nrun out of 後面接東西：We ran out of milk.（我們的牛奶喝完了）\n💡 Look out! 是「小心！」的意思，不是「往外看」\n⚠️ 收集的筆記：keep out of 寫「擋住」→ 比較正確是「不進入、避開」（Keep out! ＝ 禁止進入）\n⚠️ bring out 寫「闡明」→ 常用意思是「推出（新產品）、使顯現」\n💡 work out 是補充的常用片語'],
  ['off', '動詞 + off', 'off 常有「離開」「脫離」「關掉」的意思。',
    'turn off=關掉|switch off=關掉|take off=脫下、（飛機）起飛|get off=下車、脫下|put off=延期|set off=出發|start off=出發、開始|see off=送行|show off=炫耀|cut off=切斷|leave off=停止|come off=脫落|ring off=掛電話|knock off=撞掉、下班|keep off=遠離、勿靠近',
    '💡 turn on（打開）↔ turn off（關掉）；get on（上車）↔ get off（下車）\n💡 原本筆記 get off 出現兩次（下車、脫下衣服），合成一個\n⚠️ come off 寫「脫掉」→ 比較正確是「脫落、掉下來」（The button came off. 鈕扣掉了）'],
  // ↓ 10/23 第六批截圖新增；depend on、put on、believe in、check in 是 Claude 補的
  ['on', '動詞 + on', 'on 常有「繼續」「專注在…上」「依靠」的意思。',
    'try on=試穿、試戴|put on=穿上、戴上|pass on=傳遞、轉告|hold on=稍等、抓緊|decide on=決定（選）…|concentrate on=專心於|live on=靠…生活|spend on=在…上花（錢、時間）|depend on=依靠、取決於',
    '💡 try on 是「試穿看看」，put on 是「穿上」：Can I try it on? 我可以試穿嗎？\n💡 Hold on, please. 請稍等（講電話很常用）\n💡 spend 的句型：spend ＋ 錢／時間 ＋ on ＋ 東西：I spent $500 on this bag. 我花 500 元買這個包包。\n💡 live on 後面接「靠什麼生活」：Pandas live on bamboo. 熊貓靠竹子為生。'],
  ['in', '動詞 + in', 'in 常有「進去」「在…方面」的意思。',
    'hand in=繳交|major in=主修|arrive in=到達（大地方）|do well in=在…方面表現好|be weak in=在…方面很差|believe in=相信（…存在、…是好的）|check in=辦理入住、報到',
    '💡 arrive in ＋ 大地方（城市、國家）：arrive in Tokyo\narrive at ＋ 小地方（車站、機場）：arrive at the airport\n💡 be weak in ↔ be good at（擅長）\n💡 hand in your homework 交作業'],
  ['give', 'give 片語', '',
    'give up=放棄|give back=歸還|give away=送掉、洩露|give out=分發|give in=屈服、讓步|give off=發出（氣味、光）|give way to=讓路給、讓步|give sb. some advice=給某人建議|give a talk=做報告|give a lecture=演講|give lessons to=給…上課|give thanks=感謝|give chase=追趕|give ear to=傾聽|give oneself up=自首|give over=停止',
    '⚠️ 收集的筆記有錯：give back 出現了兩次（第 2 和第 13），已經合併\n⚠️ give care「留意」不是正確的說法，正確是 take care（小心、照顧）：Take care! 保重！\n💡 give ear to、give over、give chase 比較少用，認得就好'],
  ['go', 'go 片語', '',
    'go on=繼續|go ahead=開始做、請便|go over=複習、仔細檢查|go through=經歷、仔細查看|go by=（時間）過去、經過|go up=上升|go down=下降|go wrong=出錯|go after=追求|go against=違反、反對|go in for=愛好、參加|go at=著手做、攻擊',
    '💡 Go ahead. 常用在「請便、你先說」：Can I sit here? — Go ahead.\n💡 Time goes by. 時間過去了\n⚠️ 收集的筆記：go over 寫「走過去」→ 最常用的意思是「複習、仔細檢查」\n💡 原本筆記這組寫 16 個，截圖只拍到 12 個；有下半部的話可以再補'],
];
// ↓ 10/24 使用者給的「背了它，你的完型穩了」片語表（簡體改繁體、錯的改正）。網站已經有的不重複加
// 格式：'英文=中文=例句 例句中文'，例句顯示在片語下面，卡片背面也看得到
PHRASES.find(p => p[0] === 'up')[3] += '|think up=想出（點子、藉口）=He thought up a good excuse. 他想出一個好藉口。';
PHRASES.find(p => p[0] === 'out')[3] += '|help sb. out=幫某人解決困難=Can you help me out? 你可以幫我一下嗎？|get out=出去、離開=Let\'s get out of here. 我們離開這裡吧。';
PHRASES.find(p => p[0] === 'off')[3] += '|go off=（鬧鐘）響；（食物）壞掉=My alarm went off at six. 我的鬧鐘六點響了。|break off=突然中斷=She broke off in the middle of a sentence. 她話說到一半突然停住。|run off=跑掉=The dog ran off with my shoe. 狗叼著我的鞋子跑掉了。|be off=出發、離開=I\'m off to work. 我出門上班了。|fall off=從…掉下來=He fell off his bike. 他從腳踏車上摔下來。';
PHRASES.push(
  ['for', 'for 片語', 'for 常有「為了」「給」「對…來說」的意思。',
    `wait for=等待=I'm waiting for the bus. 我在等公車。|pay for=付…的錢=I'll pay for dinner. 晚餐我付。|care for=照顧；喜歡=She cares for her sick mother. 她照顧生病的媽媽。|stand for=代表、是…的縮寫=UN stands for the United Nations. UN 代表聯合國。|leave for=出發前往=We leave for Japan tomorrow. 我們明天出發去日本。|be bad for=對…有害=Sugar is bad for your teeth. 糖對牙齒不好。|be used for=被用來做…=This knife is used for cutting bread. 這把刀是用來切麵包的。|ask for=要求、請求=Don't be afraid to ask for help. 不要怕開口求助。|prepare for=為…做準備=I'm preparing for the test. 我在準備考試。|thanks for=謝謝你的…=Thanks for your help. 謝謝你的幫忙。|provide sth. for sb.=為某人提供某物=The school provides lunch for the students. 學校提供學生午餐。`,
    '💡 leave for 後面接「要去的地方」：leave for Japan 出發去日本；leave Japan 是「離開日本」\n\n💡 be used for ＋ V-ing：be used for cutting（用來切）\n\n💡 look for、be good for、be famous for、be late for、get ready for 在別組'],
  ['with', 'with 片語', 'with 常有「和…一起」「用…」「帶著…」的意思。',
    `agree with=同意（某人、某個意見）=I agree with you. 我同意你。|play with=和…玩=The kids are playing with the dog. 小孩在跟狗玩。|share with=和…分享、共用=I share a room with my sister. 我和姊姊住同一間房間。|end up with=最後落得、最後得到=I ended up with a bad cold. 我最後得了重感冒。|fight with=和…打架=He often fights with his brother. 他常跟弟弟打架。|catch up with=趕上=Walk slower so I can catch up with you. 走慢一點，我才跟得上你。|be filled with=裝滿=The box is filled with toys. 箱子裝滿了玩具。|deal with=處理=Don't worry. I can deal with it. 別擔心，我可以處理。|do with=處理、處置=What did you do with my keys? 你把我的鑰匙放到哪裡去了？|begin with / start with=以…開始=Let's start with the easy questions. 我們從簡單的題目開始。|argue with=和…爭吵=Don't argue with your mom. 不要跟媽媽頂嘴。|quarrel with=和…吵架=She quarreled with her boyfriend. 她跟男朋友吵架了。|help sb. with sth.=幫某人做某事=Can you help me with my homework? 你可以幫我寫作業嗎？|be busy with=忙於=I'm busy with work. 我在忙工作。|be popular with=受…歡迎=This game is popular with kids. 這個遊戲很受小孩歡迎。|fall in love with=愛上=He fell in love with her. 他愛上她了。|provide sb. with sth.=提供某人某物=The hotel provides us with towels. 飯店提供我們毛巾。|with one's help=在某人的幫助下=With your help, I passed the test. 有你的幫忙，我考過了。|with the light on=開著燈=He sleeps with the light on. 他開著燈睡覺。`,
    '💡 begin with 和 start with 意思一樣，選一個用就好\n\n💡 provide 兩種寫法：provide sb. with sth.＝provide sth. for sb.\n\n💡 come up with、get along well with 在 come、get 那兩組；be angry with、be strict with 在 be 那組'],
  ['about', 'about 片語', 'about 是「關於」，常接在說、想、擔心後面。',
    `talk about=談論=What are you talking about? 你們在聊什麼？|worry about=擔心=Don't worry about it. 別擔心。|care about=在乎、關心=I care about you. 我在乎你。|learn about=了解、學到關於…=We learn about animals in class. 我們上課學動物的知識。|think about=考慮、想著=I'm thinking about it. 我在考慮。|be excited about=對…感到興奮=The kids are excited about the trip. 小孩對旅行很興奮。|be nervous about=對…緊張=I'm nervous about the interview. 我對面試很緊張。|complain about=抱怨=He always complains about the food. 他總是抱怨食物。|be serious about=對…是認真的=Are you serious about it? 你是認真的嗎？`,
    '💡 worry about（擔心，動作）＝ be worried about（很擔心，狀態）：Don\'t worry. ＝ Don\'t be worried.'],
  ['at', 'at 片語', 'at 常用在「時間點」「小地點」和「對著…」。',
    `at once=立刻=Come here at once! 馬上過來！|at least=至少=It takes at least an hour. 至少要一個小時。|at most=最多=I can wait ten minutes at most. 我最多等十分鐘。|at last=終於=At last, we're home! 我們終於到家了！|at home=在家=I'm at home now. 我現在在家。|at noon=在中午=We eat lunch at noon. 我們中午吃午餐。|at times=有時候=At times, I feel lonely. 有時候我會覺得寂寞。|at school=在學校=My son is at school. 我兒子在學校。|at present=目前=At present, I live in Taipei. 我目前住在台北。|at work=在上班=My dad is at work. 我爸爸在上班。|at all=（否定句）一點也…=I don't like it at all. 我一點也不喜歡。|at table=在吃飯（比較老的說法）=We don't use phones at table. 我們吃飯時不滑手機。|aim at=瞄準；目標是=This class is aimed at beginners. 這堂課是給初學者的。|knock at=敲（門）=Someone is knocking at the door. 有人在敲門。|shout at=對…大吼=Don't shout at me! 不要對我大吼！|point at=指著=It's rude to point at people. 用手指人很沒禮貌。|arrive at=到達（小地方）=We arrived at the station. 我們到車站了。|be good at=擅長=She is good at math. 她數學很好。|be angry at=對…生氣=I was angry at myself. 我在生自己的氣。|laugh at=嘲笑=Don't laugh at me! 不要笑我！|at the age of=在…歲時=He started school at the age of six. 他六歲開始上學。|at the end of=在…的盡頭、最後=Turn left at the end of the street. 在這條街的盡頭左轉。|at the moment=此刻、現在=She's busy at the moment. 她現在在忙。|at the same time=同時=We arrived at the same time. 我們同時到。`,
    '💡 at table（在吃飯）是比較老的英式說法，現在一般說 at the table 或 during meals\n\n💡 at all 用在否定句：Not at all. 一點也不。\n\n💡 look at 在 look 那組；be surprised at 在 be 那組'],
  ['in2', 'in 片語（介系詞片語）', '這些是「in ＋ 名詞」的固定說法，整組一起背。',
    `in all=總共=There are 30 students in all. 總共有 30 個學生。|in class=在課堂上=No phones in class! 上課不能用手機！|in English=用英文=How do you say it in English? 這個用英文怎麼說？|in short=總之、簡單來說=In short, I don't like him. 總之，我不喜歡他。|in a hurry=匆忙、趕時間=I'm in a hurry. 我在趕時間。|in the end=最後、終於=In the end, we won the game. 最後我們贏了比賽。|in the future=在未來=I want to live in Japan in the future. 我以後想住在日本。|in time=及時=We got there just in time. 我們剛好及時趕到。|in fact=事實上=In fact, I've never been there. 事實上，我從來沒去過那裡。|in bed=在床上=He is still in bed. 他還在床上。|in hospital=住院=My grandpa is in the hospital. 我爺爺住院了。|in the way=擋路、礙事=Your bag is in the way. 你的包包擋到路了。|in this way=用這個方法=In this way, you can learn faster. 用這個方法，你可以學得更快。|in red=穿紅衣服=The girl in red is my sister. 穿紅衣服的女孩是我姊姊。|in danger=處於危險中=These animals are in danger. 這些動物處於危險中。|in a minute=馬上、一會兒=I'll be back in a minute. 我馬上回來。|in surprise=驚訝地=She looked at me in surprise. 她驚訝地看著我。|in public=在公共場所、公開地=Don't shout in public. 不要在公共場所大叫。|in general=一般來說=In general, cats are quiet. 一般來說，貓很安靜。|in common=共同的=We have a lot in common. 我們有很多共同點。|in style=時髦、流行=Long skirts are in style. 長裙很流行。|in good health=身體健康=My grandma is in good health. 我奶奶身體很好。|in front of=在…前面=There is a tree in front of my house. 我家前面有一棵樹。`,
    '💡 in hospital 是英式；美式說 in the hospital\n\n💡 in the way（擋路）≠ on the way（在路上）：I\'m on the way. 我在路上了\n\n💡 in time（及時，沒遲到）≠ on time（準時）\n\n💡 in trouble 在 be 那組（be in trouble）'],
  ['look', 'look 片語', 'look 是「看」，後面接不同的字，意思就變了。',
    `look at=看…=Look at me. 看著我。|look for=尋找=I'm looking for my keys. 我在找鑰匙。|look over=仔細檢查=Please look over my homework. 請幫我檢查作業。|look forward to=期待=I'm looking forward to seeing you. 我很期待見到你。|look like=看起來像=You look like your mom. 你長得像你媽媽。|look through=瀏覽、快速翻閱=I looked through the magazine. 我快速翻了一下雜誌。|look into=調查；往裡面看=The police are looking into it. 警察正在調查這件事。|look around=四處看看=We looked around the shop. 我們在店裡逛了逛。|look ahead=向前看、為未來打算=Stop worrying and look ahead. 別再擔心了，往前看。|look after=照顧=Can you look after my cat? 你可以幫我照顧貓嗎？`,
    '💡 look into 最常用的意思是「調查」，「往裡面看」反而比較少用\n\n💡 look forward to 的 to 是介系詞，後面接 V-ing：look forward to seeing you ✓\n\n💡 look up、look out 在 up、out 那兩組'],
  ['get', 'get 片語', 'get 是萬用動詞：得到、變成、到達，搭配不同的字意思很多。',
    `get on=上（公車、火車）；相處=Get on the bus. 上公車。|get over=克服；（病）好起來=I finally got over my cold. 我感冒終於好了。|get back=回來；拿回=When did you get back? 你什麼時候回來的？|get in the way=擋路、礙事=Don't get in the way. 別擋路。|get into=進入；陷入（麻煩）=He got into trouble at school. 他在學校惹上麻煩。|get together=聚會=Let's get together this weekend. 這週末聚一聚吧。|get ready for=為…做準備=Get ready for school! 準備上學了！|get married=結婚=They got married last year. 他們去年結婚了。|get to=到達=How do I get to the station? 我要怎麼去車站？|get along with=和…相處融洽=I get along well with my coworkers. 我跟同事處得很好。|get in=進入（車子）；到達=Get in the car. 上車。|get across=讓人理解=He couldn't get his idea across. 他沒辦法讓別人懂他的想法。|get behind=落後=I got behind with my work. 我的工作進度落後了。|get rid of=擺脫、丟掉=I want to get rid of these old clothes. 我想把這些舊衣服丟掉。|get through=通過；（電話）打通=I called, but I couldn't get through. 我打了電話，但打不通。|get down=下來；使沮喪=Rainy days get me down. 下雨天讓我心情低落。|get used to=習慣=I'm getting used to the cold. 我漸漸習慣冷天了。|get home=到家=I get home at seven. 我七點到家。|get out of=從…出來；逃避=She got out of the taxi. 她下了計程車。|get about=四處走動；（消息）傳開=My grandpa can't get about easily. 我爺爺走路不太方便。`,
    '⚠️ get used to 後面接名詞或 V-ing：get used to living alone 習慣一個人住（不是接原形）\n\n💡 get across 最常用的意思是「讓人理解」：get my idea across\n\n💡 搭公車、火車：get on／get off；坐計程車、汽車：get in／get out of\n\n💡 get about 是英式說法，美式比較常說 get around\n\n💡 get up、get off 在 up、off 那兩組'],
  ['take', 'take 片語', 'take 是「拿、帶、花」，很多日常動作都用 take。',
    `take after=（長相、個性）像（爸媽）=She takes after her mother. 她長得像媽媽。|take place=發生、舉行=The party will take place on Friday. 派對在星期五舉行。|take care=小心、保重=Take care! 保重！|take care of=照顧=I take care of my little brother. 我照顧弟弟。|take away=拿走、帶走=Please take the plates away. 請把盤子收走。|take it easy=放輕鬆、別急=Take it easy. Everything will be OK. 放輕鬆，一切都會沒事的。|take a rest=休息一下=Let's take a rest. 我們休息一下吧。|take a shower=洗澡（淋浴）=I take a shower every night. 我每天晚上洗澡。|take part in=參加=I took part in the race. 我參加了賽跑。|take pride in=以…為傲=He takes pride in his work. 他對自己的工作很自豪。|take a photo=拍照=Can you take a photo of us? 你可以幫我們拍張照嗎？|take turns=輪流=Let's take turns. 我們輪流吧。|take an interest in=對…感興趣=She takes an interest in art. 她對藝術有興趣。|take a vacation=去度假=We take a vacation every summer. 我們每年夏天去度假。|take action=採取行動=We need to take action now. 我們現在就要採取行動。|take one's advice=接受某人的建議=I took my doctor's advice. 我聽了醫生的建議。`,
    '⚠️ take action 的 action 前面不加 an：take an action ✗\n\n💡 take care（保重）≠ take care of（照顧＋人或東西）\n\n💡 take up、take off、take out、take down 在 up、off、out、down 那幾組'],
  ['come', 'come 片語', 'come 是「來」，後面接不同的字，意思就變了。',
    `come over=過來（拜訪）=Come over to my house this weekend. 這週末來我家玩。|come true=實現=I hope your dream comes true. 希望你的夢想成真。|come on=加油；快點=Come on! You can do it! 加油！你做得到！|come back=回來=I'll come back soon. 我很快就回來。|come up with=想出（點子、辦法）=She came up with a great idea. 她想出了一個好點子。|come in=進來=Please come in. 請進。|come along=一起來；進展=Do you want to come along? 你要一起來嗎？|come from=來自=Where do you come from? 你從哪裡來？|come across=偶然遇到、發現=I came across an old photo. 我偶然翻到一張老照片。|come into=進入=Come into the room. 進到房間裡來。|come about=發生=How did this come about? 這是怎麼發生的？`,
    '💡 come along 最常用的意思是「一起來」\n\n💡 come up with 跟 think up 一樣是「想出」\n\n💡 come out、come up 在 out、up 那兩組'],
  ['keep', 'keep 片語', 'keep 是「保持、一直」。',
    `keep on=繼續=Keep on trying! 繼續努力！|keep away from=遠離=Keep away from the fire. 離火遠一點。|keep healthy / keep fit=保持健康=I swim to keep fit. 我游泳來保持健康。|keep from=忍住不做=I couldn't keep from laughing. 我忍不住笑了出來。|keep doing sth.=一直做某事=He kept talking. 他一直講話。|keep sb. doing sth.=讓某人一直做某事=Sorry to keep you waiting. 抱歉讓你久等了。|keep sb. from doing sth.=阻止某人做某事=The rain kept us from going out. 下雨讓我們沒辦法出門。|keep in touch with=和…保持聯絡=Let's keep in touch! 保持聯絡喔！|keep down=壓低、控制=Please keep your voice down. 請小聲一點。`,
    '⚠️「隱瞞」要說 keep sth. from sb.：Don\'t keep secrets from me. 不要瞞著我\n\n💡 keep up、keep out、keep off 在 up、out、off 那幾組'],
  ['put', 'put 和 turn 片語', 'put 是「放」，turn 是「轉」。',
    `put away=收好=Put away your toys. 把玩具收好。|put into=放進；翻譯成=Put this sentence into English. 把這句翻成英文。|put forward=提出（意見、計畫）=She put forward a new plan. 她提出了一個新計畫。|put one's heart into=全心投入=He puts his heart into his work. 他全心投入工作。|turn on=打開（電器）=Turn on the TV. 打開電視。|turn over=翻過來=Turn over the paper. 把紙翻過來。`,
    '💡 put up、put on、put off、put down、put out 在 up、on、off、down、out 那幾組\n\n💡 turn on（打開）↔ turn off（關掉）；turn left、turn right 在單字的「馬路」那類']
);

NOTES.splice(NOTES.findIndex(c => c.id === 'tenses'), 0, {   // 放在「16 大時態」前面
  id: 'phrase',
  name: '動詞片語',
  icon: '🔗', color: '#6b8f71', desc: '動詞 + up / down / out / off…',
  items: PHRASES.flatMap(([key, name, intro, list, tip]) => {
    const words = list.split('|').map(s => s.split('='));
    return [
      {
        id: 'ph-' + key, title: `${name}（${words.length} 個）`,
        note: (intro ? intro + '\n\n' : '') + words.map(([en, zh, ex]) => `${en}　${zh}` + (ex ? `{{ex:${ex}}}` : '')).join('\n') + (tip ? '\n\n' + tip : '')
      },
      ...words.map(([en, zh, ex]) => ({
        id: 'ph-' + key + '-' + en.toLowerCase().replace(/[^a-z]+/g, '-').replace(/-$/, ''),
        front: en, back: zh + (ex ? '\n' + ex : ''), group: 'ph-' + key, say: en.replace(/sb\./g, 'somebody').replace(/sth\./g, 'something')
      }))
    ];
  })
});

// ===================== 🎵 記憶口訣（使用者 10/22 第五批截圖，原文簡體，已改繁體） =====================
NOTES.splice(NOTES.findIndex(c => c.id === 'basics') + 1, 0, {   // 放在「基礎文法」後面
  id: 'mnemonic',
  name: '記憶口訣',
  icon: '🎵', color: '#d9822b', desc: '用順口溜背文法規則',
  items: [
    {
      id: 'mn-be',
      title: 'be 動詞的用法口訣',
      note: '【口訣】\n我用 [am]，你用 [are]，[is] 連著他、她、它；\n單數名詞用 [is]，複數名詞全用 [are]；\n變疑問，往前提，句末問號莫丟棄；\n變否定，更容易，be 後 [not] 莫忘記；\n疑問否定任你變，句首大寫莫遲疑。\n\n① 意思\nI am、you are、he / she / it is\n單數用 is：The cat is cute.\n複數用 are：The cats are cute.\n問句把 be 搬到前面：Are you tired?\n否定在 be 後面加 not：I am not tired.\n\n💡 句首大寫莫遲疑：句子第一個字的字母一定要大寫',
      front: 'be 動詞口訣：\n「我用 ___，你用 ___，___ 連著他、她、它」',
      back: 'am、are、is\nI am、you are、he / she / it is',
      quiz: { q: 'My brothers ___ at home.（複數名詞）', options: ['am', 'is', 'are', 'be'], answer: 2 }
    },
    {
      id: 'mn-time-prep',
      title: '時間介係詞速記歌（in、on、at）',
      note: '【口訣】\n年月週前要用 [in]，日子前面卻不行；\n遇到幾號要用 [on]，上午下午又是 [in]；\n要說某日上下午，用 [on] 換 [in] 才能行；\n午夜黃昏須用 [at]，黎明用它也不錯；\n幾點前面也用 [at]，說「差」可要用上 [to]，\n說「過」只可使用 [past]，多說多練牢牢記。\n\n① 例子\nin 2025、in May、in the morning\non May 5th、on Monday\non Monday morning（某一天的上午，用 on）\nat midnight（午夜）、at dusk（黃昏）、at dawn（黎明）\nat 7 o\'clock\n\n② 說時間的 to 和 past\nten to nine ＝ 差十分九點 ＝ 8:50\nten past nine ＝ 九點過十分 ＝ 9:10\n\n💡 「年月週前要用 in」的「週」是指 in the week（在這一週裡）；但 last week、next week 前面不加介係詞',
      front: '___ Monday morning\n用 in 還是 on？',
      back: 'on Monday morning\n某一天的上午下午，用 on 不用 in',
      quiz: { q: 'ten past nine 是幾點？', options: ['8:50', '9:10', '10:09', '9:00'], answer: 1 }
    },
    {
      id: 'mn-time-past',
      front: 'ten to nine 和 ten past nine\n各是幾點？',
      back: 'ten to nine ＝ 8:50（差十分九點）\nten past nine ＝ 9:10（九點過十分）',
      quiz: { q: 'It\'s ___ midnight.（在午夜）', options: ['in', 'on', 'at', 'to'], answer: 2 }
    },
    {
      id: 'mn-plural',
      title: '名詞複數的規律口訣',
      note: '【口訣】\n名詞複數有規律，一般詞尾加 [s]；\n子音字母 + y 型，變 y 為 i，加 [es]；\nch、sh 真有趣，s、x，加 [es]；\nf、fe 真小氣，字母 v 來把它替，es 在後別忘記；\n字母 o 來真神奇，有生命來 [es]，沒有生命加 [s]。\n\n① 例子\nbook → books\nbaby → babies\nwatch → watches、dish → dishes、bus → buses、box → boxes\nknife → knives、leaf → leaves\nhero → heroes（英雄，有生命）、photo → photos（照片，沒有生命）\n\n💡 o 結尾的口訣有例外：potato → potatoes、tomato → tomatoes 沒有生命，也是加 es（我們在「名詞單複數」那則筆記也這樣教）\n💡 子音 + y 才變 ies；母音 + y 直接加 s：boy → boys、key → keys',
      front: 'baby、boy 的複數？',
      back: 'babies、boys\n子音 + y 變 ies；母音 + y 直接加 s',
      quiz: { q: 'tomato 的複數是？', options: ['tomatos', 'tomatoes', 'tomatoies', 'tomato'], answer: 1 }
    },
    {
      id: 'mn-plural-special',
      title: '特殊複數口訣（中日好友來聚會…）',
      note: '【口訣】\n中日好友來聚會，綿羊、鹿、魚把家回。\n男士、女士 a 變 e，牙（齒）、腳雙 o 變雙 e。\n孩子們想去天安門，原形後面 r、e、n。\n老鼠本來愛大米，mice，ice 和 rice。\n\n① 單複數一樣\nChinese 中國人、Japanese 日本人、sheep 綿羊、deer 鹿、fish 魚\n\n② a 變 e\nman → men、woman → women\n\n③ oo 變 ee\ntooth → teeth、foot → feet\n\n④ 加 ren\nchild → children\n\n⑤ mouse → mice（跟 ice、rice 押韻）\n\n⚠️ 口訣把「好友 people」也算進單複數一樣，不太對：people（人們）本身就是 person 的複數；peoples 是另一個意思「民族」',
      front: 'man、foot、child、mouse 的複數？',
      back: 'men、feet、children、mice',
      quiz: { q: 'There are three ___ in the field.（三隻綿羊）', options: ['sheeps', 'sheep', 'sheepes', 'sheepen'], answer: 1 }
    },
    {
      id: 'mn-fe',
      title: 'f / fe 結尾的名詞複數口訣',
      note: '【口訣】\n妻子持刀去宰狼，小偷嚇得發了慌；\n躲在架後保己命，半片樹葉遮目光。\n\n① 口訣裡的 9 個字（f / fe 變 ves）\nwife　wives　妻子\nknife　knives　刀子\nwolf　wolves　狼\nthief　thieves　小偷\nshelf　shelves　架子\nself　selves　自己\nlife　lives　生命\nhalf　halves　一半\nleaf　leaves　樹葉\n\n② 例外：直接加 s\nchief → chiefs（首領）\nbelief → beliefs（信念）\nsafe → safes（保險箱）\ngulf → gulfs（海灣）\nroof → roofs（屋頂）\n\n💡 -self 結尾的反身代名詞也一樣：myself → ourselves、yourself → yourselves\n💡 handkerchief（手帕）兩種都可以：handkerchiefs、handkerchieves',
      front: 'wife、wolf、leaf 的複數？',
      back: 'wives、wolves、leaves\nf / fe 變 v，再加 es',
      quiz: { q: 'roof（屋頂）的複數是？', options: ['rooves', 'roofs', 'roofes', 'roof'], answer: 1 }
    },
    {
      id: 'mn-present-1',
      title: '一般現在時口訣（一）：I、we、you、they',
      note: '【口訣】\nI、we、you、they 作主語，動詞原形後面跟；\n否定句，更容易，動詞前面加 [don\'t]；\n疑問句，別著急，句首 [Do] 來幫你，後面問號別忘記；\n肯定回答用 Yes，I、we、you、they 加上 do；\n否定回答要用 No，I、we、you、they 加 don\'t。\n\n① 例子\nI like apples.\nI don\'t like apples.\nDo you like apples?\nYes, I do. ／ No, I don\'t.',
      front: 'Do you like apples?\n怎麼回答？',
      back: 'Yes, I do. ／ No, I don\'t.',
      quiz: { q: 'They ___ like coffee.（不喜歡）', options: ['don\'t', 'doesn\'t', 'aren\'t', 'not'], answer: 0 }
    },
    {
      id: 'mn-present-2',
      title: '一般現在時口訣（二）：he、she、it',
      note: '【口訣】\n主語三單他、她、它，動三形式後面壓；\n詞尾一般 s 加；子音字母 + y 型，變 y 為 i，es；\nch、sh 真有趣，s、x，es；\n三個特殊哪裡去？[has]、[goes] 和 [does]；\n否定句，記住它，動詞前面 [doesn\'t]；\n疑問句，別著急，句首 [Does] 來幫你；\n肯定回答用 Yes，he、she、it 加 does；\n否定回答要用 No，he、she、it、doesn\'t；\nDoes、doesn\'t 來幫你，後面動詞定注意，恢復原形要切記。\n\n① 例子\nShe plays. He studies. It watches.\n三個特殊：have → has、go → goes、do → does\nShe doesn\'t like apples.\nDoes she like apples? — Yes, she does. ／ No, she doesn\'t.\n\n⚠️ 最後一句最重要：用了 does / doesn\'t，後面的動詞要變回原形\nDoes she likes? ✗ → Does she like? ✓',
      front: 'have、go、do 的第三人稱單數？',
      back: 'has、goes、does\n口訣：三個特殊哪裡去？has、goes 和 does',
      quiz: { q: 'Does she ___ apples?', options: ['like', 'likes', 'liking', 'liked'], answer: 0 }
    }
  ]
});

// ===================== 第五批：音標、及物／不及物動詞 =====================
NOTES.find(c => c.id === 'pron').items.unshift({
  id: 'ipa-48',
  title: '48 個國際音標',
  note: '字典上單字旁邊的符號就是音標（網站用 / / 包起來），看得懂就能自己念出新單字。英文有 20 個母音、28 個子音。\n\n【長母音（念長一點）】\n/ɑː/　像「啊～」　car\n/ɔː/　像「喔～」　door\n/ɜː/　像「餓～」　bird\n/iː/　像「依～」　see\n/uː/　像「烏～」　food\n\n【短母音（念短一點）】\n/ʌ/　像「啊」　cup\n/ɒ/　像「喔」　hot\n/ə/　像「餓」（輕聲）　about\n/ɪ/　像「依」　sit\n/ʊ/　像「烏」　book\n/e/　像「欸」（嘴小）　bed\n/æ/　像「欸」（嘴大）　cat\n\n【雙母音（兩個音滑過去）】\n/eɪ/　欸依　day\n/aɪ/　愛　my\n/ɔɪ/　喔依　boy\n/ɪə/　依餓　ear\n/eə/　欸餓　hair\n/ʊə/　烏餓　tour\n/əʊ/　歐　go\n/aʊ/　啊烏　now\n\n【爆破音】\n/p/　波　pen\n/b/　播　bag\n/t/　特　ten\n/d/　的　dog\n/k/　科　cat\n/g/　歌　go\n\n【摩擦音】\n/f/　夫　fish\n/v/　（咬下唇）　very\n/s/　思　sun\n/z/　滋　zoo\n/θ/　（舌頭夾在牙齒中間，無聲）　think\n/ð/　（舌頭夾在牙齒中間，有聲）　this\n/ʃ/　噓　she\n/ʒ/　（像日）　television\n/h/　喝　hat\n/r/　（捲舌）　red\n\n【破擦音】\n/tʃ/　吃　chair\n/dʒ/　知　job\n/tr/　戳　tree\n/dr/　捉　dream\n/ts/　刺　cats\n/dz/　自　beds\n\n【鼻音、邊音、半母音】\n/m/　木　man\n/n/　呢　no\n/ŋ/　嗯（鼻音）　sing\n/l/　了　leg\n/w/　握　we\n/j/　耶　yes\n\n💡 中文注音只是「大概的音」，像 /θ/、/ð/、/v/、/r/ 中文沒有，一定要點例字的 🔊 聽真正的發音\n💡 這是英式音標（DJ 音標）；台灣課本常用 KK 音標，有些符號不一樣，例如 /əʊ/ 在 KK 寫 /o/\n💡 例字是補充的，原本筆記只有符號和中文',
  front: '/θ/ 和 /ð/ 怎麼發音？',
  back: '舌頭輕輕夾在上下牙齒中間\n/θ/ 不出聲：think；/ð/ 出聲：this',
  say: 'think, this'
});
// 例字加上 🔊
{
  const n = NOTES.find(c => c.id === 'pron').items[0];
  n.note = n.note.split('\n').map(l => l.replace(/^(\/[^\/]+\/　[^　]+　)([A-Za-z]+)$/, '$1$2 {{say:$2}}')).join('\n');
}

{
  const terms = NOTES.find(c => c.id === 'terms').items;
  terms.splice(terms.findIndex(i => i.id === 'g-verb-kinds') + 1, 0, {
    id: 'g-transitive',
    title: '及物動詞、不及物動詞、連綴動詞',
    note: '動詞還可以看「後面能不能直接接受詞」來分。\n\n① 及物動詞：後面可以直接接受詞\nI like [apples]. 我喜歡蘋果。\nShe reads [a book]. 她讀一本書。\n\n② 不及物動詞：後面不能直接接受詞，要先加介係詞\nI listen [to] music. ✓（不能說 listen music）\nHe looks [at] me. ✓（不能說 look me）\nShe arrived. 她到了。（後面不用接東西）\n\n③ 連綴動詞（系動詞）：後面接形容詞，說明主詞的狀態\n狀態：be　She is happy.\n持續：keep、stay　Keep quiet. 保持安靜。\n看起來像：look、seem　You look tired. 你看起來很累。\n感官：feel、smell、taste、sound　It smells good. 聞起來很香。\n變化：become、get、turn　It gets dark. 天黑了。\n\n⚠️ 收集的筆記「英語筆記整理」有幾個錯：\n「雙物動詞可直接跟賓語」→ 應該是「及物動詞」\n「不及物動詞…必須加上某個代詞」→ 應該是加上「介詞（介係詞）」\n「二位數數詞要在百位和十位之間加 and」→ 應該是「三位數」\n💡 連綴動詞後面接形容詞，不接副詞：It smells good. ✓（不是 smells well）',
    front: 'I listen ___ music.\n要不要加介係詞？',
    back: 'I listen to music.\nlisten 是不及物動詞，要先加 to',
    quiz: { q: 'You look ___.（你看起來很累）', options: ['tired', 'tiredly', 'tire', 'tiring'], answer: 0 }
  });
}
