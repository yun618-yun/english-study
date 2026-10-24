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
    ['下面這些常用動詞是不規則的', '下面已經照「變化的規律」分好組了：同一框的字，變的方式一樣。一次背一框，不要 50 個一起背。'],
    ['過去分詞：用在完成式', '先把第二個（過去式）背熟，日常說話最常用；第三個等學到完成式再加強。'],
    ['go → went → gone', '背的方法：背成一句話。I go to work. → I [went] to work yesterday.\n每天挑 5 個，說「今天做的事」和「昨天做的事」。']
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
  ],

  // ===================== ⏰ 16 大時態 =====================
  'tense-table': [
    ['{{grid}}【一般】', '一般 ＝ 單純發生這件事，沒有強調「正在」或「已經」。'],
    ['【進行】', '進行 ＝ 正在做。公式裡一定有 be 動詞 + ing。'],
    ['【完成】', '完成 ＝ 在某個時間點「之前」已經做了。公式裡一定有 have + 過去分詞。'],
    ['【完成進行】', '完成進行 ＝ 從之前一直做到某個時間點，而且還在做：have been + ing。'],
    ['過去將來：would / should do', '過去將來 ＝ 站在過去說「之後會做」，最常出現在 I said、He told me 後面，will 變成 would。'],
    ['💡 台灣課本的叫法', '看表的方法：上面的【一般、進行…】是「狀態」，每一行的「現在、過去…」是「時間」，兩個組合起來就是一個時態。先學有 ⭐ 的就好。']
  ],
  'passive-table': [
    ['現在：am / is / are done', '被動 ＝ 東西「被」怎麼了。公式永遠是 be 動詞 + 過去分詞，時間只要改 be 動詞：is cleaned、was cleaned、will be cleaned。'],
    ['例：The room is cleaned every day', '房間不會自己打掃，是「被」人打掃。不知道是誰做的，或是誰做的不重要，就用被動。'],
    ['現在：am / is / are being done', 'being 是「正在」，cleaned 是「被」：正在被打掃。'],
    ['現在：have / has been done', 'has been cleaned ＝ 已經被打掃好了。'],
    ['【完成進行】都沒有被動語態', '這幾種太長了，連英文母語的人都幾乎不用，不用背。']
  ],
  't-usage': [
    ['同一個時態，常常不只一種用法', '不用一次全記，先看每個時態的「用法一」，那是最常用的。'],
    ['用法二：過去的習慣', '以前常常做、現在不做了，也可以說 used to：I [used to] swim in that river.'],
    ['用法三：看到跡象', 'will 和 be going to：\n看到烏雲（有證據）→ It\'s going to rain.\n只是猜猜看 → Maybe it will rain.'],
    ['用法二：最近一段時間一直在做', '「正在」不一定是這一秒，這陣子都在做也可以：I\'m reading a good book these days.'],
    ['I have already finished my homework', '寫完作業是過去的事，但重點是「現在」可以看電視了，所以用現在完成式。'],
    ['I had done my homework before my mom came back', '兩件過去的事，比較早發生的那件用 had done：寫作業比媽媽回來早。']
  ],
  't-8-active-passive': [
    ['最常考的 8 個時態', '主動：誰做了什麼。被動：東西被怎麼了。同一件事，兩種說法。'],
    ['例：This letter was written by him', '主動變被動三步驟：\n① 把東西（this letter）搬到前面\n② 動詞變成 be 動詞 + 過去分詞（wrote → was written）\n③ 做的人放到最後，前面加 by'],
    ['公式：be 動詞（跟著時態變）', 'be 動詞負責「時間」，過去分詞負責「被」，兩個分工合作。']
  ],
  't-group-simple': [
    ['定義：表示現實或普遍真理', '就是「平常都這樣」：喜好、習慣、事實。'],
    ['例：She drinks coffee every morning', 'she 是第三人稱單數，所以 drink 要加 s。'],
    ['例：She was tired yesterday', 'be 動詞的過去式 was / were 也算一般過去時。'],
    ['例：I\'m going to visit my grandma', '已經計畫好的事常用 be going to；說話的當下才決定的用 will：\n（有人敲門）I\'ll get it! 我去開門！'],
    ['定義：站在過去，預測將來要發生的動作', '最常出現在「他說、我說」後面：\nHe says he will call. → He [said] he [would] call.\n前面變成過去，will 也跟著變成 would。']
  ],
  't-group-cont': [
    ['定義：動作現在正在進行', '進行式一定要有兩個部分：be 動詞 + ing，少一個都不行：\nI eating ✗、I am eat ✗、I am eating ✓'],
    ['例：I was cooking when you called', '比較長的動作（煮飯）用進行式，中間突然插進來的短動作（電話）用過去式。'],
    ['例：Don\'t call me at 9', '將來進行：到那個時間，我會「正在」做某件事。'],
    ['定義：站在過去，預測將來某個時刻正在發生的動作', '這個很少用，看得懂就好。']
  ],
  't-group-perfect': [
    ['定義：動作發生在過去，但對現在有影響', '重點在「現在」：I have eaten. 我吃過了（所以現在不餓）。'],
    ['例：I have been to Japan twice', 'have been to ＝ 去過（已經回來了）\nhave gone to ＝ 去了（人還在那裡）'],
    ['例：Have you eaten yet', 'yet 用在問句和否定句，already 用在肯定句。'],
    ['定義：過去某個時間「之前」', '兩件過去的事，先發生的用 had done：\n我到車站（後發生）→ 火車已經開走（先發生，用 had left）。'],
    ['例：I will have finished the report by Friday', 'by Friday ＝ 最晚星期五之前。將來完成式常常跟 by 一起出現。'],
    ['定義：站在過去，預測將來某個時刻前', '這個很少用，看得懂就好。']
  ],
  't-group-perfect-cont': [
    ['定義：動作從過去開始，持續到現在，而且還會繼續下去', '跟現在完成式很像，但更強調「一直在做、還沒停」：\nI have read the book.（讀完了）\nI have been reading the book.（一直在讀，還沒讀完）'],
    ['例：It has been raining all day', 'for + 一段時間：for two hours\nsince + 開始的時間點：since 2020'],
    ['定義：過去某時刻之前開始的動作', '把「現在完成進行」整個搬到過去：到公車來的那一刻，她已經等了一小時。'],
    ['定義：動作從過去開始，持續到將來某個時刻', '這個很少用，看得懂就好。']
  ],
  's-group-present': [
    ['▍一般現在時（主詞 + does）', '看到這些字，代表「常常、習慣」，動詞用現在簡單式。'],
    ['always 總是、sometimes 有時', '這些字放在一般動詞前面、be 動詞後面：\nI [always] get up early.\nShe is [always] late.'],
    ['▍現在進行時（主詞 + be doing）', '看到這些字，代表「現在這時候正在做」。'],
    ['肯定句：already 已經、just 剛才', 'just、already 放在 have 和過去分詞中間：I have [just] eaten. 我剛吃過。'],
    ['for + 一段時間、since', 'for two years：兩年（一段時間）\nsince 2020：從 2020 年開始（一個時間點）']
  ],
  's-group-past-future': [
    ['3 days ago 三天前', 'ago 放在時間後面：three days ago ✓、ago three days ✗'],
    ['last time 上次、last night 昨晚', 'last、next、this 前面不加 in / on：last night ✓、in last night ✗'],
    ['▍過去進行時（主詞 + was / were doing）', '問自己：那個時間點，我「正在」做什麼？'],
    ['① when、before、after + 過去時間', '兩件過去的事，先發生的用 had done：After I [had eaten], I went out.'],
    ['in a year / week', 'in + 一段時間 ＝「…之後」：I\'ll be back [in] ten minutes. 我十分鐘後回來。'],
    ['▍過去將來時（主詞 + would do）', '站在過去說「之後」：今天說 tomorrow，站在過去就說 the next day。']
  ],

  // ===================== ➡️ to 的用法 =====================
  'to-group-overview': [
    ['to 有兩種身分', '判斷方法：看 to 後面接什麼。\n接東西、地方、人（school、me）→ 介係詞 to\n接動作原形（learn、go）→ 不定詞 to'],
    ['例：look forward to learning', '這幾個要特別背，因為 to 後面看起來應該接原形，其實要接 ing：look forward to [seeing] you。'],
    ['去向、接收者、交流對象', '想成一支箭頭：誰 → 去哪裡、東西 → 給誰。'],
    ['on the way to the station', '箭頭只說「往哪裡」，人還在路上也可以用 to。']
  ],
  'to-do-roles': [
    ['「做某件事」可以被討論', 'to + 動詞原形，就是把一個動作包成「一件事」，然後放進句子的不同位置。'],
    ['獨自旅行需要勇氣', '口語更常把長長的主詞搬到後面，前面用 it 代替：\n[It] takes courage [to travel alone].'],
    ['I have two emails [to answer]', '放在名詞後面，意思是「要…的」：two emails to answer ＝ 兩封要回的信。'],
    ['I opened the window [to let some air in]', '最常用的就是這個「為了…」：問「為什麼？」，回答 to + 動作。']
  ],
  'to-group-reach': [
    ['地方、時間、數字、狀態', 'to 就是「到」：到一個地方、到一個時間、到一個數字。'],
    ['The shop is open from 9 a.m. to 6 p.m.', 'from … to … 是一組：從…到…。'],
    ['It\'s ten to nine', '想成「再十分鐘就到九點」，所以是 8:50。過幾分是 past：ten past nine ＝ 9:10。'],
    ['This bag is similar to mine', '比較的對象前面用 to：similar to（跟…很像）、different from（跟…不一樣）。'],
    ['I prefer tea to coffee', 'prefer A to B ＝ 比起 B，更喜歡 A。喜歡的放前面。']
  ],
  'to-purpose-reason-result': [
    ['She called me to ask for help', '最常用的是「目的」：問「為什麼？」，to 後面就是答案。'],
    ['I was relieved to hear the news', '心情的字（happy、sad、surprised）+ to do：因為…而開心、難過。\nI\'m happy [to see] you. 見到你很開心。'],
    ['He returned to the office, only to find it locked', 'only to 是比較正式的寫法，看得懂就好。']
  ],
  'to-too-enough': [
    ['兩個都在說「程度」', 'too 不是「也」的那個 too，在這裡是「太」，而且是「太…所以不行」的意思。'],
    ['He is too tired to walk', 'too 本身就有「不能」：He is too tired to walk.（不用加 not）'],
    ['She is old enough to drive', 'enough ＝ 足夠，夠了就「可以」。']
  ],
  'to-group-who': [
    ['只多一個人，做動作的人就變了', '先問：要做這件事的是誰？\n自己做 → I want [to go].\n別人做 → I want [you to go].'],
    ['I want you to leave', '中文會說「我想要你走」，英文不能說 I want you leave，中間的 to 不能少。'],
    ['I told Ben not to leave', 'not 放在誰前面，就是否定誰。'],
    ['It is difficult for me to lift this box', '「對我來說很難」：It is [difficult for me] to…。\n不能說 I am difficult to…（意思會變成「我這個人很難搞」）。'],
    ['It was kind of you to lend me your notes', 'kind、nice 是在說「人」很好，所以用 of you；difficult、easy 是在說「事情」，所以用 for me。'],
    ['I don\'t know what to write', '中文「不知道要寫什麼」，英文直接 what to write，很好用。']
  ],
  'to-noun': [
    ['to do 放在名詞後面', '中文說「要讀的書」，形容的話放在前面；英文說 a book to read，放在後面。'],
    ['a chair to sit on', '先把原本的句子說出來：sit on a chair，介係詞 on 就不會忘記。']
  ],
  'to-forms': [
    ['不定詞裡，to 後面第一個動詞用原形', '這一則比較難，先記 ①、⑥ 兩個就好，其他看得懂就可以。'],
    ['He seems to have left', 'to have done ＝ 比現在更早就已經發生了：他（之前就）已經走了。'],
    ['She decided not to reply', 'not 放在 to 前面：決定「不」回覆。']
  ],
  'to-plus-doing': [
    ['這一組的 to 是介係詞', '介係詞後面要接名詞，動作要變成名詞就加 ing，所以這些 to 後面接 doing。\n小測試：to 後面可以放 it 或名詞的，就是介係詞：I object to [it].']
  ],
  'to-or-doing': [
    ['He stopped talking', 'stop + ing：停掉的就是這個動作。'],
    ['He stopped to talk', 'stop + to：停下來，是為了去做後面的事。'],
    ['Remember to lock the door', 'remember / forget + to：還沒做的事。\nDon\'t forget [to call] me. 別忘了打給我。'],
    ['I remember locking the door', 'remember + ing：已經做過，現在回想起來。']
  ],
  'used-to': [
    ['① used to do：過去常常做', '想成「以前是這樣，現在不是了」：I used to smoke.（我以前抽菸，現在不抽了）'],
    ['② be used to doing：已經習慣', '多了 be 動詞（I\'m），意思就變成「習慣」，to 後面接 ing。'],
    ['③ be used to do：被用來做', '這個就是 use（使用）的被動：被用來…。']
  ],
  'to-group-no': [
    ['① can、must、should 後面直接接原形', 'can、must 本身就是小幫手，後面直接接動詞，不加 to：can to swim ✗'],
    ['② let／make + 人 + 原形', 'let、make 都是「讓」，後面的人直接接原形：let me [go]、make him [laugh]。'],
    ['You had better go', 'had better 雖然有 had，意思是「現在最好」，口語常縮成 You\'d better go.'],
    ['I would rather stay', '口語常縮成 I\'d rather stay.']
  ],
  'to-vs-for': [
    ['從情境理解「接收者」', '問自己：東西是「交到」他手上（to），還是「為了」他去做這件事（for）？'],
    ['I gave a notebook to May', 'give、send、show、tell 用 to：東西傳過去。'],
    ['I bought a notebook for May', 'buy、make、cook 用 for：為了某人做這件事。']
  ],
  'to-phrases': [
    ['① have to do：需要、不得不', '口語常用 have to，比 must 更常聽到。'],
    ['③ be about to do：馬上就要', 'be about to ＝ 下一秒就要發生，比 be going to 更近。'],
    ['⑤ to be honest：說實話', '很好用的開頭，想說真心話、不同意見時先說 To be honest…']
  ],

  // ===================== 🧩 動詞片語 =====================
  'ph-bare': [
    ['這些動詞後面是「人 + 動詞原形」', '分兩種記：\n眼睛、耳朵、感覺（see、watch、hear、feel）\n叫人做事（make、have、let）\n後面都直接接原形，不加 to。'],
    ['make sb. do sth.', 'make 是「逼、使」，有一點強迫：My boss made me [work] late.'],
    ['let sb. do sth.', 'let 是「允許、讓」，對方想做，你同意：Let me [help] you.']
  ],
  'ph-be': [
    ['後面的介係詞要一起背', '背法：整組當成一個字念熟，像 be-interested-in，不要只背 interested。'],
    ['be interested in', '後面接動作要加 ing：I\'m interested in [learning] English.'],
    ['be afraid of　害怕', 'be afraid of + 東西：I\'m afraid of dogs.\nbe afraid to + 動作：I\'m afraid to ask.'],
    ['be angry with', '生「人」的氣用 with，生「事情」的氣用 about：I\'m angry about the noise.']
  ],
  'ph-up': [
    ['up 常有「向上」', '先記 up 的感覺：往上，或是「做到完、做到底」。不認識的片語，用這個感覺猜猜看。'],
    ['pick up　撿起', '東西放在中間或後面都可以：pick up the phone、pick the phone up。\n但是 it、them 一定要放中間：pick [it] up ✓、pick up it ✗'],
    ['give up　放棄', '後面接動作要加 ing：I gave up [smoking]. 我戒菸了。'],
    ['wake up　醒來', 'wake up 是「醒來」，get up 是「起床（離開床）」。']
  ],
  'ph-out': [
    ['out 常有「向外」', 'out 的感覺：出去、拿出來、用光、弄清楚。\nfind out 找出來（答案）、run out 用光、work out 想出辦法、運動。']
  ],
  'ph-group-give-go': [
    ['▍give 片語（16 個）', 'give 的感覺：給出去。give up 給出去不要了 → 放棄；give back 給回去 → 還。'],
    ['▍go 片語（12 個）', 'go 的感覺：往某個方向走。go on 繼續走 → 繼續；go back 往回走 → 回去。']
  ],
  'ph-group-prep': [
    ['▍for 片語（11 個）', 'for 的感覺：為了、朝向一個目標。wait for 等「為了」某人、look for 找「為了」某東西。'],
    ['▍with 片語（19 個）', 'with 的感覺：跟…在一起、用…。'],
    ['▍about 片語（9 個）', 'about 的感覺：關於某件事。talk about、think about、worry about。']
  ],
  // 10/24 at、in 拆成各自一則（ph-at、ph-in2）
  'ph-at': [
    ['at 常用在「時間點」', 'at 的感覺：對準一個點。look at 看著那一點、be good at 擅長那一點。']
  ],
  'ph-in2': [
    ['這些是「in ＋ 名詞」的固定說法', 'in 的感覺：在某個狀態裡面。in danger 在危險中、in a hurry 很急。']
  ],
  'ph-group-verb2': [
    ['▍look 片語（10 個）', '同一個動詞配不同的小字，意思差很多。先記最常用的：look for 找、look after 照顧、look forward to 期待。'],
    ['▍get 片語（20 個）', 'get 的感覺：變成、到達。get up 變成起來 → 起床；get to 到達。']
  ],
  'ph-group-verb3': [
    ['▍take 片語（16 個）', 'take 的感覺：拿、帶走、花（時間）。It takes ten minutes. 要花十分鐘。'],
    ['▍come 片語（11 個）', 'come 的感覺：往說話的人這邊來。come back 回來、come in 進來。']
  ],
  'ph-group-verb4': [
    ['▍keep 片語（9 個）', 'keep 的感覺：一直維持。keep going 繼續走、keep quiet 保持安靜。'],
    ['▍put 和 turn 片語（6 個）', 'put 的感覺：放。turn 的感覺：轉。turn on 以前是轉開關，所以是打開電器。']
  ],

  // ===================== 💪 常用動詞和形容詞 =====================
  'cw-group-verb': [
    ['▍每天都會用的動詞（20 個）', '背動詞的方法：每個字都說一句自己今天做的事，比只背中文記得牢。'],
    ['▍最常用的萬用動詞（20 個）', 'make、take、get、have 這幾個字，跟不同的字搭配就有不同意思，要整組記：take a shower、have lunch、make a mistake。'],
    ['▍常用動詞（生活）（21 個）', '記得加上過去式一起背，例如 buy → bought、pay → paid。']
  ],
  'cw-adj-pair': [
    ['成對背最有效', '一次記兩個，看到一個就想到另一個：hot ↔ cold、easy ↔ difficult。']
  ],
  'cw-adj-feel': [
    ['bored　覺得無聊的', '想成：-ed 是「我被弄得…」，-ing 是「它讓人覺得…」。\nI\'m [bored]. 我覺得好無聊。\nThe movie is [boring]. 這部電影很無聊。'],
    ['interested　感興趣的', 'I\'m [interested] in music.（我有興趣）\nMusic is [interesting].（音樂很有趣）']
  ],
  'cw-freq': [
    ['說自己的習慣一定會用', '放的位置最重要：一般動詞前面、be 動詞後面。\nI [usually] walk to work.\nI am [never] late.'],
    ['never　從不', 'never 本身就是否定，不用再加 not：I don\'t never… ✗、I never… ✓']
  ],
  'cw-people': [
    ['介紹朋友、描述一個人', '個性用 is：She is kind.\n外表的頭髮、眼睛用 has：She has long hair.']
  ],

  // ===================== 📚 文法用語 =====================
  'g-overview': [
    ['英文句子就像組合積木', '為什麼要學這些名稱？因為很多規則是用詞性說的，像「介係詞後面接名詞」。知道名稱，就看得懂規則。'],
    ['① 最重要的是這兩個', '一個句子最少要有「誰」（名詞）和「做什麼」（動詞），其他都是加上去讓意思更清楚的。'],
    ['副詞：形容動詞', '分不清楚的時候問自己：它在形容「東西」還是「動作」？東西 → 形容詞；動作 → 副詞。']
  ],
  'g-pos-abbr': [
    ['【10 種詞性】', '查字典時，單字後面的 n.、v.、adj. 就是在告訴你這個字的詞性，知道詞性就知道它可以放在句子哪裡。']
  ],
  'g-group-pos': [
    ['① 怎麼認', '小測試：前面能不能放 a、the、my？可以的話，通常是名詞。'],
    ['② 英文比較麻煩的地方', '中文「我」不管放哪裡都一樣，英文放動詞前面用 I，後面用 me。'],
    ['② be 動詞：「是、在」', 'be 動詞沒有動作，像一個等號：She is happy. → 她 ＝ 開心的。'],
    ['② 放在 be 動詞後面', 'be 動詞後面放形容詞，說主詞「怎麼樣」：I am [tired].'],
    ['③ 怎麼認', '很多副詞是形容詞加 ly：quick → quickly、slow → slowly。'],
    ['③ 中文沒有冠詞', '每次說到單數的東西，先停一下想：a？the？還是 my？'],
    ['① 連接兩個字', 'and、but、or、so 就像膠水，把兩個字或兩個句子黏在一起。']
  ],
  'g-group-verb': [
    ['① 及物動詞：後面可以直接接受詞', '「及物」就是「動作可以直接碰到東西」：like 什麼？eat 什麼？後面直接放東西。'],
    ['② 不及物動詞：後面不能直接接受詞', '這些動詞像隔了一層，要用介係詞當橋：listen [to] music、look [at] me。'],
    ['③ 連綴動詞（系動詞）', '連綴動詞像等號，後面放形容詞說主詞的樣子：You look [tired].（你 ＝ 累的樣子）'],
    ['① 原形：最原本的樣子', '字典查到的就是原形。can、will、to、do 後面都用原形。'],
    ['④ 過去分詞：用在完成式', '規則動詞的過去式和過去分詞一樣，都是加 ed；不規則的要背（看「不規則動詞表」）。']
  ],
  'g-group-parts': [
    ['① 主詞：做動作的人或東西', '問「誰？」的答案就是主詞，通常在句子最前面。'],
    ['② 受詞：接受動作的人或東西', '問「什麼？」「對誰？」的答案就是受詞，放在動詞後面。'],
    ['③ 補語：補充說明主詞是什麼', '補語通常在 be 動詞後面：She is [a nurse].（說明她是什麼）'],
    ['① 一句話看懂', '中國大陸的課本用「主語、謂語、賓語」，台灣叫「主詞、動詞、受詞」，是一樣的東西。'],
    ['① S + V（主 + 動）', 'S ＝ 主詞、V ＝ 動詞、O ＝ 受詞、C ＝ 補語。5 個句型就是這幾塊的排列方式。']
  ],
  'g-group-kinds': [
    ['③ 祈使句：命令、請求、勸告、禁止', '祈使句是對「你」說的，所以 you 省略了：(You) Sit down. → Sit down.\n加 please 比較客氣：Please sit down.'],
    ['④ 感嘆句：表達強烈的感覺', '最常用的兩種：\nWhat a nice day! 天氣真好！（後面有名詞用 what）\nHow beautiful! 好漂亮！（只有形容詞用 how）'],
    ['【從句】一個句子裡面包著另一個小句子', '這部分先認識名字就好，等基礎文法熟了再學。']
  ],
  'g-numbers': [
    ['② 序數詞：第幾', '序數詞大部分是加 th：four → fourth、six → sixth。\n前三個特別：first、second、third。'],
    ['③ 分數：分子用基數、分母用序數', '1/3 ＝ one third\n2/3 ＝ two thirds（分子大於一，分母加 s）\n1/2 ＝ a half、1/4 ＝ a quarter']
  ],
  'g-person': [
    ['② 為什麼「第三人稱單數」很重要？', '因為現在式的時候，只有它的動詞要加 s：I like → He [likes]。英文初學者最常忘記這個。']
  ],
  'g-tense': [
    ['① 中文 vs 英文', '中文靠「加字」（了、在、會），英文靠「改動詞的樣子」。所以說英文時，每個動詞都要想一下時間。'],
    ['② 時態 ＝ 時間 + 狀態', '時間有 4 種（現在、過去、將來、過去將來），狀態有 4 種（一般、進行、完成、完成進行），4 × 4 ＝ 16 大時態。']
  ]
};

// ===================== 第二批（10/24 使用者：用語、文法、動詞片語都要加）=====================
// 同一則筆記已經有講解的，接在後面
const TEACH_MORE = {
  // ---------- ⭐ 基礎文法：之前沒做的 ----------
  'pp-all': [
    ['看圖記最快', '看圖的時候，嘴巴念出英文：「The cat is under the table.」一邊看一邊說，比只背中文記得牢。']
  ],
  'b-group-order': [
    ['台灣人很常搞錯的地方', '中文換個位置意思常常差不多，英文不行。這一則每一項都是「位置」或「一個小字」決定意思。'],
    ['👉 only 放在它要限制的字前面', '想成 only 是一個「只」字貼紙，貼在誰前面，就只限制誰。'],
    ['This room is big enough.', '記法：enough 像一個小尾巴，跟在形容詞後面（big enough），但走在名詞前面（enough time）。'],
    ['I want to eat something sweet.', 'something、anything、nothing 已經是一個完整的字了，形容詞只能從後面補充。'],
    ['👉 few、a few 接可數', '有 a 的是「有一點，還不錯」；沒有 a 的是「幾乎沒有，很少」。'],
    ['He likes coffee, doesn\'t he?', '做法：看前面用什麼小幫手（are、can、does），後面就用同一個，正負反過來。'],
    ['No, I don\'t.　對，我不喜歡。', '英文的 Yes / No 只看「事實」：喜歡就說 Yes, I do.，不喜歡就說 No, I don\'t.，不管問題怎麼問。'],
    ['How fast he runs!', '後面有名詞用 What（What a day!），只有形容詞用 How（How beautiful!）。'],
    ['a coffee cup　咖啡杯', '兩個名詞放一起，前面的像形容詞，說是哪一種：coffee cup 是「咖啡的杯子」。'],
    ['turn it on　把它打開', 'it、them 很短，要夾在中間；the light 比較長，放中間或後面都可以。'],
    ['a big red car', '口語其實很少一次用三個以上形容詞，記住「大小在顏色前面」就夠用了。'],
    ['Let\'s not argue.', 'Let\'s 的否定直接加 not：Let\'s not…（我們不要…吧）。'],
    ['the first two pages', '中文說「前兩頁」，英文也是先說 first，再說 two。'],
    ['I don\'t think he is right.', '英文習慣先把「不」說出來，語氣比較委婉。'],
    ['No, not at all.　不介意，請坐。', 'mind ＝ 介意，所以 No（我不介意）才是「可以」。'],
    ['I don\'t like it either.', 'too 用在肯定句，either 用在否定句，兩個都放在句子最後。'],
    ['She is such a kind person.', '後面有名詞，就用 such；只有形容詞，就用 so。'],
    ['Twice a week.　一週兩次。', '回答方式不同：How long → for…；How often → once a week；How many times → three times。']
  ],
  'mk-grammar': [
    ['① very 不能放在動詞前面', 'very 只能形容「形容詞」（very good），不能形容動詞。想說「很喜歡」就用 really like 或 like … very much。'],
    ['② agree 是動詞，前面不加 am', '中文「我同意」就是「我 + 同意」，英文一樣：I + agree，不用 be 動詞。'],
    ['③ be 動詞和一般動詞不能放一起', '一句話只能有一個主要動詞，go 已經是動詞，就不要 am。'],
    ['④ he / she / it 動詞要加 s', '現在式、主詞是一個人或一樣東西，動詞就要加 s。'],
    ['⑤ although 和 but 只能用一個', '中文「雖然…但是…」是一組，英文只要一個連接詞就夠了：Although it rained, we went out.'],
    ['⑥ because 和 so 只能用一個', '選一個：Because I was tired, I slept.\n或 I was tired, so I slept.'],
    ['⑦ 中文「有…要…」不能直接翻', '一句話只能有一個主要動詞，have 和 want 擠在一起就錯了。也可以說 Can I ask you a question?'],
    ['⑧ people 是複數', 'people 本身就是「很多人」，不加 s，動詞用 are。一個人是 a person。'],
    ['⑨ How to… 不能自己當一句問句', 'How to… 只是一個片語，沒有主詞和動詞，要放進句子裡：I don\'t know how to say it.'],
    ['⑩ 「不知道該怎麼辦」用 what to do', '中文「怎麼辦」其實是問「要做什麼」，所以用 what。']
  ],
  'mk-word': [
    ['① 開燈、開電視用 turn on', '以前的燈和電視要「轉」開關，所以是 turn on / turn off。open 是打開門、窗、箱子。'],
    ['③ play 後面接遊戲、運動、樂器', '「玩電腦」其實是「用電腦」或「玩電腦遊戲」，要說清楚。'],
    ['④ 吃藥用 take', '藥不是食物，英文用 take（拿進去）。'],
    ['⑦ discuss 後面直接接東西', 'discuss 本身就有「討論關於…」的意思，about 就多了。talk 才要加 about：talk about it。'],
    ['⑧ marry 後面直接接人', '也可以說 get married：They got married last year.'],
    ['⑩ I\'m boring. 是「我是個無聊的人」', '-ed 是「我覺得」，-ing 是「讓別人覺得」。I\'m bored. 我覺得好無聊。']
  ],

  // ---------- 📚 文法用語：補充 ----------
  'study-routine': [
    ['每天大約 25～30 分鐘', '時間不夠的話，至少做 ① 卡片複習。每天都碰一下英文，比一次做很多更重要。'],
    ['⑥ ⌨️ 看中文打英文', '這一步最難，因為要自己想出句子。打錯沒關係，看答案、念一次，下次就會了。']
  ],
  'study-think-en': [
    ['初學的時候腦中先想中文', '不用逼自己馬上不想中文。常用的句子練到很熟，就會自然跳出來，不用再翻譯。'],
    ['I want to ＿＿.', '換字練習：I want to eat. → I want to sleep. → I want to go home.\n骨架不變，只換最後幾個字。'],
    ['It\'s cold today.', '小技巧：做家事、走路的時候，用英文說出自己在做什麼。']
  ],
  'g-pos-abbr': [
    ['n.　名詞', '最常用的是 n.、v.、adj.、adv. 這四個，先記這四個就好。'],
    ['① 比較少提到的兩個', '同一個字可以有好幾個詞性：play 可以是動詞（玩），也可以是名詞（戲劇）。']
  ],
  'g-group-tips': [
    ['做填空題時，先看空格的「位置」', '做法：先看空格前後一個字是什麼詞性，再決定要填名詞、動詞還是形容詞。'],
    ['What about [going] swimming?', '介係詞後面要接名詞，動詞變成名詞的方法就是加 ing。'],
    ['He is [very] clever.', '形容詞前面通常是 very、really、so 這種「程度」的副詞。'],
    ['They [happily] went fishing.', '很多副詞是形容詞加 ly：happy → happily（y 變 i）。'],
    ['He is [tall].', 'be、look、feel、seem 後面放形容詞，不放副詞：You look [happy]. ✓'],
    ['填空題分兩種', '先看空格旁邊有沒有括號給字：有的話就是要把那個字變形（加 s、ed、ing…）。'],
    ['第二次提到的名詞', 'the 的意思是「你知道我說的是哪一個」。']
  ],
  'g-group-pos': [
    ['② 名詞分兩種', '可數：能一個一個數，可以加 s。不可數：水、錢、空氣，不加 s。'],
    ['① 一般動詞：看得到的動作', '問自己：可以「做」出來嗎？可以就是一般動詞（eat、run），也包括心裡的動作（like、think）。'],
    ['③ 助動詞：放在動詞前面幫忙的', '助動詞像小幫手：問句跑到最前面，否定加 not，後面的動詞用原形。'],
    ['① 放在名詞前面', '形容詞放在名詞前面，跟中文一樣：a red car 一台紅色的車。'],
    ['① 形容動詞（怎麼做）', '副詞通常放在動作後面：He runs [fast].（跑得快）'],
    ['① a / an：不特定的「一個」', 'a、an 只能用在「一個」可以數的東西，水、錢不能用 a。'],
    ['① 介係詞 + 名詞', '介係詞後面一定要有名詞或代名詞：with me、in the box。']
  ],
  'g-group-verb': [
    ['③ 過去式：已經發生的事', '規則動詞加 ed：play → played。不規則的要背：go → went。'],
    ['⑤ 現在分詞（ing）：正在做', '前面要有 be 動詞才是進行式：I [am] eating.']
  ],
  'g-group-parts': [
    ['▍句子的 8 種成分', '這是大陸課本的說法，名字很多，但只要先會「主詞、動詞、受詞」三個就夠用。'],
    ['⑤ S + V + O + C', 'C（補語）是補充說明受詞：They call him Tom. 他們叫他 Tom（Tom 在說明 him）。']
  ],
  'g-group-kinds': [
    ['① 陳述句：說明一件事', '平常說的話大部分都是陳述句，最後是句號。'],
    ['② 疑問句：問問題，分成四種', '最常用的兩種：Yes / No 問句（Do you…?）和疑問詞問句（What…?）。']
  ],
  'g-numbers': [
    ['① 基數詞：幾個', 'one、two、three 是「幾個」；first、second、third 是「第幾」。日期要用第幾：May [5th]（念 fifth）。']
  ],
  'g-person': [
    ['【三種人稱】', '第一人稱：說話的人（我、我們）\n第二人稱：聽的人（你、你們）\n第三人稱：其他所有人和東西（他、她、它、他們）']
  ],
  'g-tense': [
    ['【最常用的 5 個】', '先把這 5 個學熟，日常生活大部分的句子都夠用了。']
  ],

  // ---------- 🧩 動詞片語：補充 ----------
  'ph-bare': [
    ['see sb. do sth.', 'see 後面接原形是「看到整個動作」；接 ing 是「看到正在做」：I saw him [crossing] the street.'],
    ['have sb. do sth.', 'have 是「請人做」，通常是對方的工作：I had the waiter [bring] some water.']
  ],
  'ph-be': [
    ['be good for　對', 'be good for 是「對…有好處」；be good at 是「擅長」：Milk is good for you. / She is good at math.'],
    ['be late for', 'be late for + 事情：I was late for work. 我上班遲到了。'],
    ['be ready for', 'be ready for + 東西；be ready to + 動作：I\'m ready to go.']
  ],
  'ph-up': [
    ['turn up　出現', 'turn up 有兩個意思：「出現」（He didn\'t turn up.）和「調大聲」（Turn up the volume.），看後面有沒有東西。'],
    ['look up　查（字典）', '查單字：look up the word；也可以 look it up（it 放中間）。'],
    ['end up　最後（變成）', 'end up + ing：We ended up [staying] home. 我們最後待在家。'],
    ['show up　出現', 'show up 和 turn up 都是「出現、到場」，口語很常用。']
  ],
  'ph-group-small': [
    ['turn down　拒絕', '同一個片語可以有好幾個意思，看後面接什麼：turn down the music（調小聲）、turn down the job（拒絕工作）。'],
    ['break down　故障', 'My car broke down. 我的車拋錨了。'],
    ['take off　脫下', '脫衣服：take off your shoes；飛機起飛：The plane took off.'],
    ['put off　延期', 'put off + ing：Don\'t put off [doing] your homework. 不要拖延寫作業。'],
    ['depend on　依靠', '回答「看情況」：It depends.'],
    ['hand in　繳交', '交作業、交報告：Please hand in your homework.']
  ],
  'ph-out': [
    ['find out　查出', 'find 是「找到東西」，find out 是「查出、發現（答案、真相）」：I found out the truth.'],
    ['work out　想出', 'work out 兩個意思：想出辦法（work out a plan）、去運動（I work out every day.）。']
  ],
  'ph-group-give-go': [
    ['go on　繼續', 'go on + ing：Go on [talking]. 繼續說。'],
    ['go over　複習', '考試前常說：Let\'s go over the notes. 我們來複習筆記。']
  ],
  'ph-group-prep': [
    ['wait for　等待', '等「人或東西」一定要加 for：wait for you ✓、wait you ✗'],
    ['agree with　同意', 'agree with + 人：I agree with you.\nagree to + 提議：I agree to the plan.'],
    ['deal with　處理', '工作上很常用：I\'ll deal with it. 我來處理。']
  ],
  'ph-at': [
    ['at least　至少', 'at least 相反是 at most（最多）。'],
    ['at last　終於', 'at last 是等了很久「終於」；in the end 是「最後的結果」。']
  ],
  'ph-group-verb2': [
    ['look for　尋找', 'look for 是「找的過程」；find 是「找到了」：I looked for my keys, but I didn\'t find them.'],
    ['look after　照顧', 'look after ＝ take care of，兩個都是「照顧」。'],
    ['get to　到達', 'get to + 地方，但 home 前面不加 to：get home ✓、get to home ✗']
  ],
  'ph-group-verb3': [
    ['take after　（長相、個性）像', 'take after 只能用在家人之間，像爸媽或長輩。'],
    ['take part in　參加', 'take part in 是「參加、參與活動」；join 是「加入（團體、人）」：join a club。'],
    ['come up with　想出', '想出一個點子：come up with an idea。']
  ],
  'ph-group-verb4': [
    ['keep in touch with　和…保持聯絡', '道別時很常說：Keep in touch! 保持聯絡！']
  ]
};
for (const [k, v] of Object.entries(TEACH_MORE)) TEACH[k] = (TEACH[k] || []).concat(v);

// 筆記拆成好幾則以後，講解照錨點搬到對的那一則（10/24 b-group-order 拆成三則）
(() => {
  const all = NOTES.flatMap(c => c.items);
  const note = id => (all.find(i => i.id === id) || {}).note || '';
  for (const [from, to] of [['b-group-order', ['b-group-order2', 'b-group-order3']]]) {
    const keep = [];
    for (const e of TEACH[from] || []) {
      const dest = to.find(id => !note(from).includes(e[0]) && note(id).includes(e[0]));
      if (dest) (TEACH[dest] = TEACH[dest] || []).push(e); else keep.push(e);
    }
    TEACH[from] = keep;
  }
  // 10/24 照 ▍小段拆開的筆記（data-more.js 的 SPLIT_MOVES）：錨點是小段標題的換成新的那一則；其他錨點照內容找
  if (typeof SPLIT_MOVES === 'undefined') return;
  const pairs = {};
  Object.keys(SPLIT_MOVES).filter(k => k.startsWith('@')).forEach(k => { const [f, t] = k.slice(1).split('>'); (pairs[f] = pairs[f] || []).push(t); });
  for (const [from, to] of Object.entries(pairs)) {
    const keep = [];
    for (const e of TEACH[from] || []) {
      const mv = SPLIT_MOVES[e[0]];
      if (mv) { if (mv[0] === from) keep.push([mv[1], e[1]]); else (TEACH[mv[0]] = TEACH[mv[0]] || []).push([mv[1], e[1]]); continue; }
      const dest = to.find(id => id !== from && !note(from).includes(e[0]) && note(id).includes(e[0]));
      if (dest) (TEACH[dest] = TEACH[dest] || []).push(e); else keep.push(e);
    }
    TEACH[from] = keep;
  }
})();
