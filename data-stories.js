// ===================== 📖 分級小短文（10/24 使用者要的：從背單字進到看得懂一整段） =====================
// 格式：{ id, level（1 日常入門、2 進階、3 高階）, title, text: '英文|中文' 一行一句, qs: [[問題, 正確答案, 錯的, 錯的, 錯的]], words: '字=中文|…' }
// 點英文字查中文的順序：這篇的 words → 下面的 STORY_COMMON（常用小字）→ 網站單字庫
const STORIES = [
  { id: 'my-day', level: 1, title: '🌅 我的一天', text: `
I wake up at seven every morning.|我每天早上七點起床。
I brush my teeth and wash my face.|我刷牙、洗臉。
I eat bread and drink milk for breakfast.|我早餐吃麵包、喝牛奶。
I take the bus to work.|我搭公車去上班。
I work in a hospital. I am a nurse.|我在醫院工作，我是護理師。
I go home at six.|我六點回家。
I cook dinner and watch TV.|我煮晚餐、看電視。
I go to bed at eleven.|我十一點上床睡覺。`,
    qs: [['她早上幾點起床？', '七點', '六點', '八點', '十一點'], ['她做什麼工作？', '護理師', '老師', '醫生', '廚師']] },
  { id: 'my-family', level: 1, title: '👨‍👩‍👧 我的家人', text: `
There are four people in my family.|我家有四個人。
My father is a teacher.|我爸爸是老師。
My mother is a cook. She makes great food.|我媽媽是廚師，她做的菜很好吃。
I have a little brother. He is ten years old.|我有一個弟弟，他十歲。
He likes soccer and video games.|他喜歡足球和電玩。
We also have a cat. Her name is Mimi.|我們還有一隻貓，她叫咪咪。
On Sundays, we eat dinner together.|每個星期天，我們一起吃晚餐。
I love my family.|我愛我的家人。`,
    qs: [['爸爸做什麼工作？', '老師', '廚師', '醫生', '司機'], ['家裡的貓叫什麼名字？', 'Mimi', 'Amy', 'Tom', 'Lucky']] },
  { id: 'cafe-day', level: 1, title: '☕ 我在咖啡店', text: `
Today is Saturday.|今天是星期六。
I go to a cafe near my home.|我去家附近的一間咖啡店。
The cafe is small, but it is very nice.|咖啡店很小，但是很棒。
I order a hot latte and a piece of cake.|我點了一杯熱拿鐵和一塊蛋糕。
The cake is sweet and soft.|蛋糕又甜又軟。
I read a book and listen to music.|我看書、聽音樂。
I stay there for two hours.|我在那裡待了兩個小時。
It is a happy day.|今天是開心的一天。`,
    qs: [['她點了什麼？', '熱拿鐵和蛋糕', '冰咖啡和餅乾', '奶茶和麵包', '果汁和三明治'], ['她在咖啡店待了多久？', '兩個小時', '半小時', '一個小時', '一整天']] },
  { id: 'rainy-day', level: 1, title: '🌧️ 下雨天', text: `
It is raining today.|今天在下雨。
I forgot my umbrella at home.|我把雨傘忘在家裡了。
My shoes and pants are wet.|我的鞋子和褲子都濕了。
I buy an umbrella at a convenience store.|我在便利商店買了一把傘。
It is cheap, only one hundred dollars.|很便宜，只要一百元。
At night, the rain stops.|晚上，雨停了。
I can see the moon in the sky.|我可以看到天上的月亮。
Tomorrow will be sunny.|明天會是晴天。`,
    qs: [['她在哪裡買了雨傘？', '便利商店', '超市', '市場', '百貨公司'], ['雨傘多少錢？', '一百元', '五十元', '兩百元', '一千元']] },
  { id: 'market', level: 1, title: '🛒 週末去市場', text: `
On Sunday morning, I go to the market with my mom.|星期天早上，我和媽媽去市場。
The market is busy. There are many people.|市場很熱鬧，有很多人。
We buy apples, bananas, and some vegetables.|我們買了蘋果、香蕉和一些蔬菜。
My mom also buys fish and chicken.|媽媽也買了魚和雞肉。
The fruit is fresh and cheap.|水果新鮮又便宜。
The bags are heavy, so I carry them.|袋子很重，所以我來提。
At home, we make lunch together.|回到家，我們一起做午餐。
It is a busy but happy morning.|這是一個忙碌但開心的早上。`,
    qs: [['她和誰去市場？', '媽媽', '爸爸', '弟弟', '朋友'], ['為什麼她來提袋子？', '袋子很重', '媽媽在講電話', '她想運動', '袋子很小']] },
  { id: 'new-job', level: 2, title: '💼 新工作', text: `
Last month, I started a new job.|上個月，我開始了一份新工作。
I work at a big company in Taipei.|我在台北一間大公司上班。
At first, I was very nervous.|一開始，我很緊張。
I didn't know anyone, and the work was hard.|我誰都不認識，工作也很難。
But my coworkers are friendly and helpful.|但是我的同事很友善，也很願意幫忙。
Tom always answers my questions.|Tom 總是回答我的問題。
Now I feel more comfortable.|現在我覺得自在多了。
I'm glad I took this job.|我很高興接了這份工作。`,
    qs: [['一開始她覺得怎麼樣？', '很緊張', '很無聊', '很生氣', '很累'], ['誰總是回答她的問題？', 'Tom', '她的老闆', '她的家人', '沒有人']] },
  { id: 'japan-trip', level: 2, title: '✈️ 去日本旅行', text: `
Last summer, I traveled to Japan with my friends.|去年夏天，我和朋友去日本旅行。
We stayed in Tokyo for five days.|我們在東京待了五天。
The trains were fast and very clean.|電車很快，也很乾淨。
We ate sushi and ramen every day.|我們每天都吃壽司和拉麵。
One day, we got lost, but a kind man helped us.|有一天我們迷路了，但是一位好心的先生幫了我們。
He couldn't speak much English, but he showed us the way.|他不太會說英文，但是他帶我們找到路。
I bought a lot of souvenirs for my family.|我買了很多紀念品給家人。
I want to go back next year.|我明年還想再去。`,
    qs: [['他們在東京待了幾天？', '五天', '三天', '一個禮拜', '兩天'], ['迷路的時候，誰幫了他們？', '一位好心的先生', '警察', '飯店的人', '導遊']] },
  { id: 'sick-day', level: 2, title: '🤒 生病的一天', text: `
Yesterday, I woke up with a headache and a sore throat.|昨天我起床時頭痛、喉嚨痛。
I also had a fever, so I called my boss.|我還發燒了，所以我打電話給老闆。
I told him I couldn't come to work.|我跟他說我沒辦法去上班。
Then I went to see a doctor.|然後我去看醫生。
The doctor said it was just a cold.|醫生說只是感冒。
He told me to drink a lot of water and get some rest.|他叫我多喝水、多休息。
I slept for most of the day.|我那天大部分時間都在睡覺。
Today, I feel much better.|今天我覺得好多了。`,
    qs: [['她為什麼打電話給老闆？', '她生病了，不能去上班', '她要請假去旅行', '她遲到了', '她想換工作'], ['醫生說她怎麼了？', '只是感冒', '肚子痛', '過敏', '骨折']] },
  { id: 'new-hobby', level: 2, title: '🎨 新的興趣', text: `
I wanted to try something new this year.|今年我想嘗試新的東西。
So I joined a painting class on Saturday mornings.|所以我參加了星期六早上的畫畫課。
The teacher is patient, and the class is fun.|老師很有耐心，課也很好玩。
My first painting was not very good.|我的第一幅畫不太好。
But I kept practicing every week.|但是我每個禮拜都持續練習。
Now my paintings are getting better.|現在我的畫越來越好了。
Painting helps me relax after a busy week.|畫畫讓我在忙碌的一週後可以放鬆。
Next, maybe I will paint my cat.|下一次，也許我會畫我的貓。`,
    qs: [['她什麼時候上畫畫課？', '星期六早上', '星期天晚上', '每天晚上', '星期一下午'], ['畫畫對她有什麼幫助？', '讓她放鬆', '讓她賺錢', '讓她變瘦', '讓她認識老闆']] },
  { id: 'online-order', level: 3, title: '📦 網購的麻煩', text: `
Last week, I ordered a jacket online.|上週我在網路上訂了一件外套。
The website said it would arrive in three days.|網站說三天會到。
However, a whole week passed, and nothing came.|但是整整一個禮拜過去了，什麼都沒收到。
I emailed the store, but nobody replied.|我寫電子郵件給店家，但沒有人回覆。
Finally, I called their customer service.|最後，我打電話給他們的客服。
The woman on the phone apologized and checked my order.|電話裡的小姐向我道歉，並查了我的訂單。
It turned out that the jacket had been sent to the wrong address.|結果發現外套被寄到錯的地址了。
They sent me a new one, and it arrived the next day.|他們寄了一件新的給我，隔天就到了。`,
    qs: [['Why didn\'t the jacket arrive?', 'It was sent to the wrong address.', 'It was sold out.', 'The store was closed.', 'She canceled the order.'],
      ['How did she finally solve the problem?', 'She called customer service.', 'She emailed the store again.', 'She went to the store.', 'She asked a friend.']] },
  { id: 'learning-english', level: 3, title: '📚 我學英文的路', text: `
When I started learning English, I could only say hello and thank you.|我剛開始學英文時，只會說 hello 和 thank you。
I was afraid of making mistakes, so I never spoke in class.|我很怕犯錯，所以上課從來不說話。
Then a teacher told me that mistakes are part of learning.|後來一位老師告訴我，犯錯是學習的一部分。
I started practicing a little every day, even for just ten minutes.|我開始每天練習一點點，就算只有十分鐘也好。
I listened to English songs and repeated simple sentences.|我聽英文歌，跟著念簡單的句子。
Slowly, I could understand more and say more.|慢慢地，我聽得懂更多，也說得出更多。
Last month, I helped a tourist who was lost in my city.|上個月，我幫助了一位在我們城市迷路的觀光客。
It was the first time I felt proud of my English.|那是我第一次對自己的英文感到驕傲。`,
    qs: [['Why didn\'t she speak in class at first?', 'She was afraid of making mistakes.', 'She was sick.', 'She didn\'t like the teacher.', 'She was always late.'],
      ['What did she do last month?', 'She helped a lost tourist.', 'She took an English test.', 'She moved to a new city.', 'She sang an English song.']] },
  { id: 'new-city', level: 3, title: '🏡 搬到新城市', text: `
Two years ago, I moved to a new city for work.|兩年前，我為了工作搬到一個新城市。
Everything was different, and I didn't have any friends there.|一切都不一樣，我在那裡一個朋友也沒有。
On weekends, I often felt lonely.|週末的時候，我常常覺得寂寞。
To meet new people, I joined a hiking group.|為了認識新朋友，我加入了一個健行社團。
Every Sunday, we climbed a different mountain together.|每個星期天，我們一起爬不同的山。
We talked about our lives, and we soon became close friends.|我們聊彼此的生活，很快就變成好朋友。
Now this city feels like home.|現在這個城市感覺就像家一樣。
Moving was hard, but it changed my life for the better.|搬家很辛苦，但它讓我的生活變得更好。`,
    qs: [['Why did she join a hiking group?', 'To meet new people.', 'To lose weight.', 'For her job.', 'Her boss asked her to.'],
      ['How does she feel about the city now?', 'It feels like home.', 'She wants to leave.', 'It is too busy.', 'She still feels lonely.']] }
].map(s => ({ ...s, lines: s.text.trim().split('\n').map(l => { const [en, zh] = l.split('|'); return { en, zh }; }) }));

// 常用小字：小短文點字查中文用（單字庫裡沒有的代名詞、介系詞、be 動詞、不規則過去式…）
const STORY_COMMON = Object.fromEntries(`
i=我|me=我（受詞）|my=我的|you=你|your=你的|he=他|him=他（受詞）|his=他的|she=她|her=她；她的|it=它、這|its=它的|we=我們|us=我們（受詞）|our=我們的|they=他們|them=他們（受詞）|their=他們的
a=一個|an=一個（母音開頭前）|the=這個、那個（特定的）|this=這個|that=那個；（連接用）|these=這些|those=那些|some=一些|any=任何|many=很多（可數）|much=很多（不可數）|a lot of=很多|lot=很多（a lot of）|every=每一個|all=全部|one=一（個）|another=另一個
am=是（I am）|is=是|are=是|was=是（過去式）|were=是（過去式，複數）|be=是（原形）|been=是（過去分詞）|i'm=我是（I am）|it's=它是（it is）|didn't=沒有（did not）|couldn't=不能（could not）|don't=不（do not）|can't=不能（cannot）
and=和、而且|but=但是|so=所以；很|or=或者|because=因為|when=當…的時候|if=如果|then=然後|however=然而、但是|also=也|too=也；太|only=只有|just=只是、剛好|even=甚至、就算|very=很、非常|more=更多|most=大部分|not=不|soon=很快|now=現在|finally=最後、終於|slowly=慢慢地|maybe=也許|together=一起|ago=…以前|first=第一；一開始|next=下一個|last=上一個；最後的|always=總是|often=常常|never=從不|again=再一次
at=在（時間點、小地方）|in=在…裡面|on=在…上面；在（星期幾）|to=到、去|for=為了、給；（時間）長達|of=的|with=和…一起|from=從|about=關於|after=在…之後|near=在…附近|by=在…旁邊；搭（車）|out=出去|up=向上|back=回來|there=那裡|here=這裡
can=會、能夠|could=能（can 的過去式）|will=將會|would=將會（will 的過去式）|should=應該
go=去|went=去（過去式）|come=來|came=來（過去式）|get=得到、變得|got=得到；變得（過去式）|have=有|has=有（he/she）|had=有（過去式）|do=做|did=做（過去式）|make=做、製作|makes=做（he/she）|take=拿、搭、花|took=拿；接受（take 的過去式）|say=說|said=說（過去式）|tell=告訴|told=告訴（過去式）|see=看見|know=知道|think=想|feel=覺得|felt=覺得（過去式）|feels=感覺起來|buy=買|bought=買（過去式）|eat=吃|ate=吃（過去式）|sleep=睡|slept=睡（過去式）|wake up=醒來|woke=醒（wake 的過去式）|speak=說（語言）|spoke=說（過去式）|become=變成|became=變成（過去式）|send=寄|sent=寄（過去式、過去分詞）|keep=持續|kept=持續（過去式）|meet=認識、見面|lose=遺失|lost=迷路的；遺失（過去式）|forget=忘記|forgot=忘記（過去式）|stay=待、停留|order=點（餐）、訂購|ordered=訂購（過去式）
home=家|day=天|days=天（複數）|year=年|years=年（複數）|years old=…歲|month=月|week=週|time=次；時間|hour=小時|hours=小時（複數）|minute=分鐘|minutes=分鐘（複數）|people=人們|man=男人、先生|woman=女人、小姐|name=名字|food=食物|game=遊戲|games=遊戲（複數）|video games=電玩|way=路；方法|life=生活|lives=生活（life 的複數）|part=部分|thing=東西|something=某個東西|everything=每件事、一切|nothing=沒有東西|anyone=任何人|nobody=沒有人
two=二|three=三|four=四|five=五|six=六|seven=七|ten=十|eleven=十一|hundred=百|thousand=千
good=好的|great=很棒的|nice=好的、不錯的|new=新的|old=舊的、老的|big=大的|small=小的|little=小的|happy=開心的|busy=忙的；熱鬧的|fast=快的|clean=乾淨的|kind=好心的|fresh=新鮮的|heavy=重的|soft=軟的|sweet=甜的|wet=濕的|cheap=便宜的|hard=難的；辛苦的|fun=好玩的|friendly=友善的|helpful=樂於幫忙的|patient=有耐心的|nervous=緊張的|comfortable=自在的、舒服的|glad=高興的|lonely=寂寞的|afraid=害怕的|proud=驕傲的|simple=簡單的|different=不同的|wrong=錯的|whole=整個的|close=親近的|sore=痛的|better=更好的|much=很多；（比較）…得多|just=只是
`.trim().split(/[|\n]/).filter(Boolean).map(p => { const i = p.indexOf('='); return [p.slice(0, i), p.slice(i + 1)]; }));
// 小短文裡用到、單字庫沒有的字
Object.assign(STORY_COMMON, Object.fromEntries(`
wake=醒來（wake up）|teeth=牙齒（tooth 的複數）|latte=拿鐵|book=書|umbrella=雨傘|convenience=方便（convenience store 便利商店）|dollars=元|mom=媽媽|vegetables=蔬菜|fruit=水果|carry=提、搬
company=公司|coworkers=同事|answers=回答|questions=問題|stayed=待、停留（過去式）|showed=帶（路）、給…看（過去式）|throat=喉嚨|boss=老闆|rest=休息
joined=參加（過去式）|painting=畫畫；一幅畫|paintings=畫（複數）|class=課|practicing=練習|relax=放鬆|paint=畫（用顏料畫）
online=在網路上|website=網站|arrive=到達|arrived=到達（過去式）|passed=過去了（過去式）|emailed=寄了電子郵件|replied=回覆（過去式）|customer=顧客|service=服務（customer service 客服）|phone=電話|checked=查、檢查（過去式）|turned=（turned out）結果是|address=地址
hello=哈囉|thank=謝謝（thank you）|songs=歌|repeated=重複、跟著念（過去式）|sentences=句子|understand=懂|who=…的（那個人）；誰|city=城市|moved=搬家（過去式）|moving=搬家|group=團體、社團|climbed=爬（過去式）
mimi=咪咪（貓的名字）|tom=Tom（人名）|taipei=台北|tokyo=東京|sushi=壽司|ramen=拉麵
`.trim().split(/[|\n]/).filter(Boolean).map(p => { const i = p.indexOf('='); return [p.slice(0, i), p.slice(i + 1)]; })));
