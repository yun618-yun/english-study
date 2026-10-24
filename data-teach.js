// 👩‍🏫 老師說：筆記看不懂的地方，用口語再講一次（10/24 使用者要的）
// key = 筆記 id；每一項是 [筆記裡那一行的一段字, 講解]，講解會插在那一行下面（app.js addTeach）
// 講解裡可以用 [ ] 標重點、\n 換行；不要用全形空白和大括號
const TEACH = {
  // ===================== ⭐ 基礎文法 =====================
  'b-structure': [
    ['英文句子的骨架', '中文的順序很自由，英文的順序是固定的，就像排隊，每個位置只能站特定的人。'],
    ['我跑步。誰（I）', '中文常常省略「我」，英文一定要補回來。\n（我）好累 → [I] am tired.，不能只說 Am tired.'],
    ['我吃一顆蘋果。受詞', '主詞和動詞要黏在一起：I [eat]…，中間不要塞「每天」「在家」這種字。'],
    ['她是老師。be 動詞', 'be 動詞就像等號：She ＝ a teacher。後面接身分、樣子或地點。'],
    ['順序：誰', '一起拆一句：我昨天在公園看到 Tom。\n誰 I → 做什麼 saw → 對象 Tom → 在哪 in the park → 什麼時候 yesterday\n[I saw Tom in the park yesterday.]'],
    ['地點、時間」通常放在', '練習方法：看到中文，先問自己「誰？做什麼？什麼東西？在哪？什麼時候？」，照順序一格一格放進去。']
  ],
  'b-be': [
    ['be 動詞的意思是', 'be 動詞沒有動作，它像一個等號：I am a student. → 我 ＝ 學生。'],
    ['he / she / it　is', '一個人或一樣東西都用 is：Tom is…、my phone is…'],
    ['you / we / they　are', '兩個以上也用 are：Tom and Amy [are] my friends.'],
    ['I / he / she / it　was', '很好記：am 和 is 變 was，are 變 were。'],
    ['She is at home.', '中文說「我很累」沒有「是」，但英文一定要有動詞，tired 不是動詞，所以要補 am：I [am] tired.（「很」只是中文習慣，不用翻成 very）'],
    ['I am like coffee. ✗', '一句話只能有一個主要動詞。like 已經是動詞，就不用 am。\n後面是動作（like、go、eat）→ 不用 be\n後面是身分、樣子、地點 → 要用 be']
  ],
  'b-subject-verb': [
    ['主詞換了，動詞也要跟著變', '這就是「第三人稱單數」：不是我、也不是你，而且只有一個。\n一個別人（he、she、Tom、my mom）或一樣東西（it、the dog、my phone）。'],
    ['he / she / it　does', 'do 和 go 是 o 結尾，加 es：does、goes。'],
    ['he / she / it　has', 'have 是特別的，不是 haves，要變成 has。'],
    ['he / she / it　likes', '分不清楚的時候，用「他、她、它」代代看：\nTom → he → likes\nTom and Amy → they → like（兩個人，不加 s）'],
    ['一個人名（Grace、Tom）', '這些時候不用加 s：\n過去式：He [went] home.\n前面有 does、can、will：Does he [like] it?、He can [swim].\ns 只要出現一次，已經在 does 身上了。']
  ],
  'b-group-pronoun': [
    ['同一個「我」，放在句子不同位置', '中文不管放哪裡都是「我」，英文要看它站在動詞前面還是後面。'],
    ['She] loves cats', '動詞前面、做動作的人 → I、he、she、they'],
    ['Come with [me]', '動詞或 with、to、for 後面 → me、him、her、them\nGive it to [him].'],
    ['This is [my] book', 'my 像一隻手，後面一定要抓著一個東西：my book、my phone。'],
    ['This book is [mine]', 'mine 已經把「東西」包在裡面了，後面不能再接：This is mine phone. ✗'],
    ['I made it [myself]', '常見的錯：Me and Tom are friends. ✗\n動詞前面要用 I，而且別人放前面：[Tom and I] are friends.'],
    ['I can\'t find [it]', '問自己：是不是「同一個」？\n同一把雨傘 → it；隨便再買一把 → one'],
    ['Can I have [another]', 'another 就是 an + other：「再一個」，後面還可能有很多個。'],
    ['the other] is black', '先數總共幾個：只有兩個，說完一個，剩下的那個就是 the other。']
  ],
  'b-group-sentence': [
    ['要先看句子裡有沒有 be 動詞', '祕密只有一個：英文需要一個「小幫手」。\nbe 動詞、can、will 都可以當小幫手：問句跳到最前面，否定後面加 not。'],
    ['問句：[Is] she a student', '同樣的方法：He [can] swim. → [Can] he swim? → He [can\'t] swim.'],
    ['② 一般動詞：借 do / does / did 來幫忙', 'I like coffee. 只有 like，沒有小幫手，就請 do 來。do 本身沒有意思，只是來幫忙的。'],
    ['問句：[Does] he like coffee', 'likes 的 s 跳到小幫手身上，變成 does，所以 like 就不用 s 了。'],
    ['問句：[Did] you go to Taipei', 'went 的「過去」也跳到 did 身上，所以 go 變回原形。'],
    ['Did you went? ✗', '一步一步改：Tom watches TV.\n沒有小幫手 → 請 do；Tom 是一個人 → does；s 跳走 → watch\n[Does Tom watch TV?]\n[Tom doesn\'t watch TV.]'],
    ['What can I do?', '疑問詞放最前面，後面就照問句的順序：Where [do you] live?'],
    ['Do you know where he is? ✓', '問句放進句子裡，就不是問句了，所以照一般順序：where [he is]。'],
    ['[Don\'t] park your car here.', 'Don\'t 是 do not，後面一樣用動詞原形，不加 s、不加 ing。']
  ],
  'b-contractions': [
    ['口語和考試很常見', '聊天、傳訊息幾乎都用縮寫；正式的文章可以寫完整的 I am、do not，不縮寫也不會錯。'],
    ['he is　he\'s', 'he\'s 也可能是 he has：He\'s finished. ＝ He has finished.（他做完了），看後面接什麼就知道。'],
    ['it\'s（it is）和 its', 'It\'s a dog. Its name is Lucky. 這是一隻狗，牠的名字是 Lucky。\n小技巧：能換成 it is 的才有那一撇。']
  ],
  'b-group-noun': [
    ['① a 和 an', '中文說「我有書」不用管幾本，英文一定要交代清楚：一本？那一本？很多本？'],
    ['a university（u 念 you）', '看的是「聲音」：university 念 you-ni…，開頭是 y 的音，所以用 a。'],
    ['第一次提到用 a', '想成：對方知不知道是哪一個？\n不知道 → a；我們都知道 → the\nClose [the] door. 房間裡那扇門，大家都知道是哪扇。'],
    ['複數泛指：I like cats', '說「喜歡某種東西」用複數：I like cats. ✓\nI like cat. ✗（聽起來像在說貓肉）'],
    ['一個用 a / an：a cat', '單數名詞不能光溜溜出現，前面要有 a、the、my 這種字，不然就變複數：\nI have book. ✗\nI have [a] book. ✓'],
    ['不可數名詞：不能直接數', '像水、錢這種，沒辦法一個一個拿起來數。要數的時候，數「容器」：two [bottles] of water。']
  ],
  'b-in-on-at': [
    ['範圍：in 最大', '想成三個畫面：in 是被包在裡面，on 是貼在表面上，at 是地圖上的一個點。'],
    ['in　月、年、季節', '比一天長（月、年、季節）用 in。'],
    ['on　星期幾', '剛好一天用 on，日子就像一張一張的日曆紙。'],
    ['at　幾點', '比一天短、很精準的時間點用 at。'],
    ['in the morning', '但指定哪一天的早上，要用 on：[on] Monday morning。'],
    ['in the box、in Taipei', '箱子把東西包住、城市把人包住，所以用 in。'],
    ['at the door、at the bus stop', '前面有 this、next、last、every，就不用 in、on、at：\nsee you next Monday ✓\nsee you on next Monday ✗']
  ],
  'pp-compare': [
    ['① in 和 into', '問自己兩個問題：有沒有在移動？有沒有碰到？'],
    ['She goes [into] the room', '另一個例子：I put the keys [into] my bag. 我把鑰匙放進包包。'],
    ['The cat jumps [over] the fence', 'over 也可以是「在上空」：The plane flew [over] the city.'],
    ['She walks [across] the street', 'across 想成平面（馬路、河）；through 想成隧道（隧道、森林、人群）。'],
    ['She gets [off] the bed', '小技巧：公車、火車可以站在上面走動，用 on / off：get off the bus\n計程車、小客車要彎腰進去，用 in / out of：get out of the car']
  ],
  'b-wh': [
    ['要問「具體的東西」時', '做法：先做出一般問句，再把想問的那個東西換成疑問詞，放到最前面。\nDo you live in Taipei? → [Where] do you live?'],
    ['how much　多少錢', 'how + 形容詞可以問很多東西：How [old] are you?、How [tall] is he?'],
    ['Where [do you live]', '疑問詞問句要回答內容，不能用 Yes / No 回答。'],
    ['Why are you late? → Because', '要問「是誰做的」時，who 自己就是主詞，不用 do：\n[Who] called you? 誰打給你？\n[What] happened? 發生什麼事？']
  ],
  'b-tenses5': [
    ['日常生活最常用的只有這 5 個', '時態就是用動詞的樣子，告訴別人這件事「什麼時候」發生。說話前先想：什麼時候？'],
    ['習慣、事實、每天都做的事', '不是「現在這一秒」，是「平常都這樣」：The sun [rises] in the east.'],
    ['現在正在做的事', '比一比：I drink coffee.（平常會喝）\nI am drinking coffee.（現在正在喝）'],
    ['過去發生、已經結束的事', '通常會有一個過去的時間：yesterday、last week、in 2020。'],
    ['過去做了，跟現在有關係', 'I [have lost] my key. 鑰匙弄丟了（現在還進不了家門）\nI [lost] my key yesterday. 只是說昨天發生的事\n有說清楚過去的時間，就用過去式，不能用完成式。']
  ],
  'b-irregular': [
    ['下面這些常用動詞是不規則的', '一組一組背比較快：\n三個一樣：cut cut cut、put put put\n後兩個一樣：buy bought bought、make made made\n三個不一樣：go went gone、eat ate eaten'],
    ['過去分詞：用在完成式', '先把第二個（過去式）背熟，日常說話最常用；第三個等學到完成式再加強。'],
    ['go　went　gone', '背的方法：背成一句話。I go to work. → I [went] to work yesterday.\n每天挑 5 個，說「今天做的事」和「昨天做的事」。']
  ],
  'b-modal': [
    ['助動詞放在動詞前面', '加上你的「態度」：\nI swim. 我游泳（事實）\nI [can] swim. 我會游泳\nI [should] swim. 我應該去游泳\nI [must] swim. 我一定要游泳\nI [may] swim. 我可能會去游泳'],
    ['She can swims. ✗', '助動詞自己也不加 s：She cans ✗'],
    ['[Can] you help me', '請別人幫忙時，could 比 can 客氣：[Could] you help me?'],
    ['You mustn\'t smoke here', 'mustn\'t 是「不可以」，don\'t have to 是「不用、可以不要」，意思差很多。']
  ],
  'b-there-is': [
    ['要說「某個地方有某樣東西」', '中文的「有」有兩個意思：\n擁有（是誰的）→ have：I [have] a car.\n某個地方存在 → there is：[There is] a cat in the garden.'],
    ['There [is] a cat on the sofa', '看 there is 後面的第一個東西：一個用 is，兩個以上用 are。'],
    ['[Is there] a bank near here', '問句：is / are 搬到 there 前面。'],
    ['The table has a book. ✗', '判斷方法：問自己「這是誰的？」書不是桌子的，所以不用 have。']
  ],
  'b-comparison': [
    ['比較兩個用「比較級」', '先數要比幾個：兩個 → taller than；三個以上選「最」→ the tallest。'],
    ['① 短的形容詞：加 er / est', '短的字念起來只有一拍：tall、big、fast。'],
    ['② 長的形容詞（兩個音節以上）', '長的字念起來兩拍以上：beau-ti-ful、ex-pen-sive。\n加了 er 就不用 more：more taller ✗\ntaller ✓'],
    ['Tom is [taller than] me', '口語常說 than me；正式一點是 than I am。'],
    ['I am [as tall as] you', 'as … as 中間用原本的樣子，不變形。\n不一樣就加 not：This phone is [not as] expensive [as] that one.']
  ],
  'b-if': [
    ['表示「如果／除非／只要', 'if 的句子分兩半：條件（如果下雨）和結果（我們就待在家）。'],
    ['主要句子用未來式（will）', 'if 那半句說的是「假設這樣」，用現在式就好，未來的意思交給另一半的 will。'],
    ['If it will rain tomorrow', '雖然有 tomorrow，if 後面還是用 rains。'],
    ['We will stay at home if it rains', 'if 在前面或後面都可以，意思一樣。']
  ]
};
