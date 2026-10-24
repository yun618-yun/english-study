// 👩‍🏫 老師講解：基礎文法看不懂的時候，用比較口語、一步一步的方式再講一次（10/24 使用者要的）
// key = 筆記 id；格式和筆記一樣（① 是小標題、【】是表格、[ ] 是重點、空一行是新的一段）
const TEACH = {
  'b-structure': `先想一個問題：中文和英文最大的差別是什麼？
中文的順序很自由，英文的順序是固定的。英文句子就像排隊，每個位置只能站特定的人。

① 第一步：先找「誰」
英文句子幾乎都要有主詞。中文常常省略「我」，英文一定要補回來。
中文：（我）好累。
英文：[I] am tired.　不能只說 Am tired.

② 第二步：主詞後面馬上接「做什麼」
主詞和動詞要黏在一起，中間不要塞地點或時間。
中文：我每天在家吃早餐。（「每天、在家」夾在中間）
英文：I [eat] breakfast…（eat 緊跟在 I 後面）

③ 第三步：動作的對象（受詞）
吃什麼？breakfast。這個「對象」就叫受詞，放在動詞後面。
I eat [breakfast].

④ 最後：地點、時間掛在尾巴
中文夾在中間的「在家、每天」，英文要搬到最後面。
先說在哪裡，再說什麼時候。
I eat breakfast [at home] [every day].

【一起拆一句：我昨天在公園看到 Tom】
誰　I
做什麼　saw（昨天，所以用過去式）
對象　Tom
在哪裡　in the park
什麼時候　yesterday

合起來就是：
I saw Tom in the park yesterday.

👉 練習方法：看到中文，先問自己「誰？做什麼？什麼東西？在哪？什麼時候？」，照順序一格一格放進去。`,

  'b-be': `be 動詞是最特別的動詞，因為它「沒有動作」。

① be 動詞就像一個等號 ＝
I am a student.　我 ＝ 學生
She is happy.　她 ＝ 開心的
They are at home.　他們 ＝ 在家
所以 be 動詞後面接的是「身分、樣子、地點」，用來說明主詞。

② 中文常常不說「是」，英文一定要有 be 動詞
中文說「我很累」，沒有「是」。
但英文的句子一定要有動詞，tired 不是動詞，所以要補 am：
I [am] tired. ✓
I tired. ✗
這裡的「很」只是中文的說話習慣，不用翻成 very。

③ 為什麼不能說 I am like coffee？
一個句子裡只能有一個主要動詞。like 已經是動詞了，就不需要 am。
簡單判斷：
後面是動作（like、go、eat）→ 不用 be 動詞
後面是身分、樣子、地點 → 要用 be 動詞

④ am、is、are 怎麼選？看主詞
I 只配 am。
一個人或一樣東西（he、she、it、Tom、my phone）配 is。
你、我們、他們、兩個以上（you、we、they、Tom and Amy）配 are。

⑤ 過去發生的就用 was / were
am 和 is 變 was，are 變 were。
I [was] tired yesterday. 我昨天很累。
They [were] at home last night. 他們昨晚在家。`,

  'b-subject-verb': `這一則最重要的就是「第三人稱單數」，名字很長，其實很簡單。

① 第三人稱單數是什麼？
第一人稱 ＝ 我（I）
第二人稱 ＝ 你（you）
第三人稱 ＝ 不是我、也不是你，是「別人」或「東西」
單數 ＝ 只有一個
所以第三人稱單數就是：[一個別人]（he、she、Tom、my mom）或 [一樣東西]（it、the dog、my phone）。

② 規則只有一句
現在式的時候，主詞是第三人稱單數，動詞要加 s。
I like music. → He [likes] music.
They play games. → Tom [plays] games.

③ 怎麼判斷？用「他、她、它」代代看
Tom → he（可以代）→ 動詞加 s
my mom → she → 加 s
the bus → it → 加 s
Tom and Amy → they（不是 he）→ 不加 s
my friends → they → 不加 s

④ 什麼時候不用加 s？
過去式不用：He went home.（不是 wents）
前面有 does、doesn't、can、will 的時候，動詞要用原形：
Does he [like] it?　He can [swim].　He will [go].
s 只要出現一次就好，已經在 does 身上了，like 就不用再加。

⑤ 加 s 還是 es？
大部分直接加 s：like → likes
s、sh、ch、x、o 結尾加 es：watch → watches、go → goes
子音 + y 結尾，y 變 i 加 es：study → studies
特別的：have → has

👉 每次說話前想一下：主詞是不是「一個別人或一樣東西」？是的話，現在式動詞加 s。`,

  'b-group-pronoun': `代名詞會變形狀，因為英文是看「位置」決定要用哪一個。

① 在動詞前面（做動作的人）→ 用 I、he、she、they
[I] love you.
[She] likes cats.

② 在動詞、介係詞後面（被做動作的人）→ 用 me、him、her、them
You love [me].
Come with [us].
Give it to [him].
中文都是「我、他」，英文要看他站在哪裡。

③ my 和 mine 怎麼分？
my 像一隻手，後面一定要抓著一個東西（名詞）：
This is [my] phone. ✓
mine 已經把東西包在裡面了，後面不能再接東西：
This phone is [mine]. ✓
This is mine phone. ✗

④ 常見的錯：好幾個人一起當主詞
Me and Tom are friends. ✗（me 不能放在動詞前面）
[Tom and I] are friends. ✓（禮貌上別人放前面，自己放後面）

⑤ it 和 one：是不是「同一個」？
我的雨傘不見了，我找不到它（就是那把）→ it
I lost my umbrella. I can't find [it].
我要再買一把（隨便哪一把都可以）→ one
I need to buy a new [one].

⑥ the other 和 another：總共有幾個？
先想「總共幾個」：
只有兩個，說完一個，剩下那個就是 [the other]。
三個以上，再拿一個就是 [another]（an + other，所以是「另一個、再一個」）。

👉 位置決定形狀：前面用 I，後面用 me；my 後面要有東西，mine 後面什麼都不接。`,

  'b-group-sentence': `否定句和問句，其實只有一個祕密：英文需要一個「小幫手」。

① 小幫手是誰？
be 動詞（am、is、are）、can、will、should……這些都可以當小幫手。
改問句：小幫手跳到最前面。
改否定：小幫手後面加 not。
She [is] busy. → [Is] she busy? → She [isn't] busy.
He [can] swim. → [Can] he swim? → He [can't] swim.

② 句子裡沒有小幫手怎麼辦？請 do 來幫忙
I like coffee. 這句只有 like，沒有小幫手。
這時候就請 do 來：
[Do] you like coffee?
I [don't] like coffee.
do 本身沒有意思，只是來幫忙組成問句和否定的。

③ 為什麼 does / did 後面的動詞要變回原形？
He likes coffee.
請小幫手來的時候，likes 的 s 會「跳到」小幫手身上，變成 does：
He likes → [Does] he [like]…?
過去式也一樣，went 的「過去」跳到 did 身上：
I went → [Did] you [go]…?
所以 Does he likes? 和 Did you went? 是錯的，因為 s 和過去式被用了兩次。

④ 一步一步改：Tom watches TV every night.
找小幫手：沒有 → 請 do
主詞 Tom 是第三人稱單數 → 用 does
watches 的 s 跳走 → watch
問句：Does Tom watch TV every night?
否定：Tom doesn't watch TV every night.

⑤ 疑問詞放最前面，後面照問句的順序
Where [do you] live?
What [is] your name?

👉 先找小幫手；沒有就請 do、does、did，後面的動詞變回原形。`,

  'b-contractions': `縮寫就是把兩個字黏在一起，少掉的字母用一撇 ' 代替。說話的時候比較快、比較自然。

① 什麼時候用？
聊天、傳訊息、說話：幾乎都用縮寫，I'm、don't、can't。
正式的文章、考試的作文：可以寫完整的 I am、do not。
不用縮寫也不會錯，只是聽起來比較正式、硬一點。

② 's 有兩個可能
he's 可能是 he is，也可能是 he has。
He's tired. ＝ He is tired.（他很累）
He's finished. ＝ He has finished.（他做完了）
看後面接什麼就知道。

③ 最容易搞混的：it's 和 its
it's ＝ it is（它是）
its ＝ 它的（像 my、his 一樣）
It's a dog. Its name is Lucky.
這是一隻狗，牠的名字是 Lucky。
小技巧：能換成 it is 的，才有那一撇。

④ 特別的縮寫
will not → won't（不是 willn't）
can not → can't
let us → let's（只有「我們一起來…」才這樣縮）`,

  'b-group-noun': `中文說「我有書」，不用管幾本；英文一定要交代清楚：一本還是很多本、是哪一本。

① a 和 the 的差別：對方知不知道是哪一個？
a ＝ 隨便一個，或第一次提到。
the ＝ 我們兩個都知道是「那一個」。
I saw [a] dog. 我看到一隻狗。（第一次說，你不知道是哪隻）
[The] dog was very big. 那隻狗很大。（就是剛剛說的那隻）
Close [the] door, please. 請關門。（房間裡的那扇門，大家都知道）

② a 和 an 要聽「聲音」
後面的字念起來是 a、e、i、o、u 的音開頭，就用 an。
an apple、an hour（h 不念，所以是 our 的音）
a university（u 念 you，是 y 的音，所以用 a）

③ 英文名詞一定要「穿衣服」
單數的可數名詞不能光溜溜地出現，一定要有 a、the、my 之類的字在前面：
I have book. ✗
I have [a] book. ✓　I have [my] book. ✓
或是變成複數：I have [books]. ✓

④ 說「喜歡某種東西」用複數
I like cats. 我喜歡貓。（貓這種動物，泛指）
I like cat. ✗（聽起來像在說貓肉）

⑤ 可數和不可數怎麼想？
能一個一個拿起來數的 → 可數：an apple、two apples
像水、空氣、錢這種沒辦法一個一個數的 → 不可數：water、money
不可數要數的時候，數「容器」：a cup of coffee、two bottles of water

👉 名詞前面先想：一個（a / an）？那一個（the）？很多個（加 s）？還是不能數？`,

  'b-in-on-at': `in、on、at 可以想成三個不同的畫面。

① in ＝ 被包在裡面
in the box　在箱子裡
in Taipei　在台北（被城市包住）
in July　在七月（被一整個月包住）

② on ＝ 貼在表面上
on the table　在桌上
on the wall　在牆上
on Monday　在星期一（日子像一張一張的日曆紙）

③ at ＝ 地圖上的一個點
at the door　在門口
at the bus stop　在公車站
at 7:00　在七點（時間軸上的一個點）

④ 時間的簡單判斷法
比一天長（月、年、季節）→ in
剛好一天（星期幾、日期、生日）→ on
比一天短、很精準（幾點）→ at

⑤ 要特別記的
in the morning（早上），但星期一早上要說 [on] Monday morning（有指定哪一天，就用 on）
at night（晚上）
at home、at work、at school（在家、在上班、在學校）

⚠️ 前面有 this、next、last、every 的時候，不用 in / on / at：
I'll see you next Monday. ✓
I'll see you on next Monday. ✗

👉 包住用 in，貼著用 on，一個點用 at。`,

  'pp-compare': `這些介係詞都兩兩一組，只要問自己兩個問題，就能分得出來。

① 問題一：有沒有在移動？
沒在動，只是說位置 → in、on
有在移動，從外面到裡面、從下面到上面 → into、onto
The keys are [in] my bag. 鑰匙在我包包裡。
I put the keys [into] my bag. 我把鑰匙放進包包。

② 問題二：有沒有碰到？
on 有碰到：The cup is [on] the table.
over 沒碰到，在上面越過去：The plane flew [over] the city.

③ across 和 through 想成「平面」和「隧道」
across：在平面上，從一邊到另一邊，像過馬路、過河。
through：從東西的裡面穿過去，像穿過隧道、森林、人群。

④ off 和 out of：從哪裡離開？
從上面下來 → off：get [off] the bus
從裡面出來 → out of：get [out of] the car
小技巧：公車、火車可以站在上面走動，用 on / off；計程車、小客車要彎腰進去，用 in / out of。`,

  'b-wh': `疑問詞問句，就是在一般問句的最前面，加上你想問的「那個東西」。

① 先做出一般問句，再把疑問詞放最前面
Do you live in Taipei?（你住台北嗎？）
想問「哪裡」→ 把 in Taipei 換成 where，放到最前面：
[Where] do you live?

② 兩種問句回答不一樣
一般問句回答 Yes / No：
Do you like coffee? — Yes, I do.
疑問詞問句要回答內容：
What do you like? — I like coffee.
不能用 Yes 回答 What 的問題。

③ how + 形容詞，可以問很多東西
how old 幾歲、how tall 多高、how long 多長／多久
how much 多少錢、how many 多少個
How [old] are you? 你幾歲？
How [many] brothers do you have? 你有幾個兄弟？

④ 要問「是誰做的」，就不用 do
問「誰」做了這件事，who 本身就是主詞，直接接動詞：
[Who] called you? 誰打給你？　Who did call you? ✗
問「做了什麼事」也一樣：[What] happened? 發生什麼事？

👉 公式：疑問詞 + 一般問句（Where + do you live?）`,

  'b-tenses5': `時態就是用「動詞的樣子」告訴別人：這件事是什麼時候發生的。

① 現在簡單式：平常、習慣、不會變的事
不是「現在這一秒」，而是「平常都這樣」。
I [drink] coffee every morning. 我每天早上喝咖啡。
The sun [rises] in the east. 太陽從東邊升起。

② 現在進行式：就是現在、正在做
I [am drinking] coffee now. 我現在正在喝咖啡。
和 ① 比一比：
I drink coffee. 我（平常）喝咖啡。
I am drinking coffee. 我（現在）正在喝咖啡。

③ 過去簡單式：以前做的，已經結束了
常常會有一個過去的時間：yesterday、last week、in 2020。
I [drank] coffee yesterday.

④ 未來式：還沒發生，之後會做
I [will] call you tomorrow. 我明天會打給你。

⑤ 現在完成式：過去發生，但「跟現在有關係」
I [have lost] my key. 我把鑰匙弄丟了。（現在還找不到，進不了家門）
I lost my key yesterday. 我昨天把鑰匙弄丟了。（只是說昨天發生的事）
有說清楚過去的時間（yesterday、last year），就用過去式，不能用完成式。

【怎麼選？先問「什麼時候」】
平常都這樣　現在簡單式
現在正在做　現在進行式
過去，有說時間　過去簡單式
還沒發生　未來式
過去到現在、跟現在有關　現在完成式

👉 說話前先想「這件事是什麼時候？」，再決定動詞要長什麼樣子。`,

  'b-irregular': `大部分動詞變過去式只要加 ed，但最常用的動詞偏偏不規則，只能背。好消息是：它們有分類，一組一組背比較快。

① 三個都一樣（最好背）
cut　cut　cut
put　put　put
let　let　let

② 後面兩個一樣
buy　bought　bought
make　made　made
have　had　had

③ 三個都不一樣
go　went　gone
eat　ate　eaten
see　saw　seen

④ 背的方法
不要只背單字，要背成一句話：
I go to work. → I went to work yesterday.
每天選 5 個，說一句「今天做的事」和一句「昨天做的事」，用久了就自然記住。

💡 第二個（過去式）先背熟最重要，日常說話最常用；第三個（過去分詞）等學到完成式再加強。`,

  'b-modal': `助動詞（can、must、should…）是在動詞前面加上你的「態度」：會不會、要不要、該不該。

① 同一件事，加不同的字，意思不一樣
I swim.　我游泳。（事實）
I [can] swim.　我會游泳。（能力）
I [should] swim.　我應該去游泳。（建議）
I [must] swim.　我一定要游泳。（非做不可）
I [will] swim.　我會去游泳。（未來）
I [may] swim.　我可能會去游泳。（不確定）

② 後面一定是原形，而且不加 s
助動詞很「霸道」，後面的動詞一定要用原形：
She can [swim]. ✓
She can swims. ✗　She can to swim. ✗
助動詞自己也不加 s：She cans ✗

③ 客氣的說法
請別人幫忙時，could 比 can 客氣：
[Could] you help me? 可以請你幫我嗎？

④ must 和 have to 的「不」差很多
must not（mustn't）＝ 禁止，不可以
don't have to ＝ 不需要，可以不用
You [mustn't] park here. 你不可以停這裡。
You [don't have to] come. 你不用來（來也可以）。

👉 助動詞 + 動詞原形，否定直接加 not，問句把助動詞搬到最前面。`,

  'b-there-is': `中文的「有」其實有兩個意思，英文分成兩種說法。

① 「擁有」→ 用 have
這個東西是某個人的。
I [have] a car. 我有一台車。（車是我的）
She [has] two kids. 她有兩個小孩。

② 「某個地方存在」→ 用 there is / there are
只是說某個地方有東西，不是誰的。
[There is] a cat in the garden. 花園裡有一隻貓。
[There are] many people in the park. 公園裡有很多人。

③ 怎麼判斷？問自己「這是誰的？」
能說出「是誰的」→ have
只是說「哪裡有」→ there is / are
桌上有一本書 → 書不是桌子的 → There is a book on the table.

④ is 還是 are？看 there is 後面的第一個東西
There [is] a pen on the desk.（一支筆）
There [are] two pens on the desk.（兩支筆）
There [is] some milk in the fridge.（不可數，用 is）

⑤ 問句和否定
問句：is / are 搬到 there 前面
[Is there] a 7-Eleven near here? 這附近有 7-Eleven 嗎？
否定：加 not
There [isn't] any milk. 沒有牛奶了。

👉 說「哪裡有什麼」，開頭先說 There is / There are，地點放最後面。`,

  'b-comparison': `比較級和最高級，重點是「要比幾個」和「字有多長」。

① 先看比幾個
兩個比 → 比較級（taller），通常後面有 than：
Tom is [taller than] me. Tom 比我高。
三個以上，選出「最…」→ 最高級（the tallest），前面要加 the：
Tom is [the tallest] in my class. Tom 是我們班最高的。

② 再看字長還是短
短的字（念起來一拍，像 tall、big、fast）→ 加 er、est
長的字（念起來兩拍以上，像 beau-ti-ful、ex-pen-sive）→ 前面加 more、most
That bag is [more expensive] than this one.
那個包包比這個貴。

③ 不能兩個一起用
more taller ✗　→　taller ✓
the most biggest ✗　→　the biggest ✓
加了 er 就不用 more，有 more 就不用加 er。

④ 一樣：as … as
中間放形容詞原本的樣子，不變形：
I am [as tall as] my brother. 我跟我哥一樣高。
不一樣：not as … as
This phone is [not as] expensive [as] that one. 這支手機沒有那支貴。

⑤ 不規則的要背
good → better → the best
bad → worse → the worst
This is the best coffee in town. 這是這附近最好喝的咖啡。

👉 先數「比幾個」，再看「字多長」，就知道要用哪一種。`,

  'b-if': `if 的句子分成兩半：「條件」和「結果」。

① 兩半分別是什麼？
If it rains,（條件：如果下雨）
we will stay home.（結果：我們就待在家）

② 為什麼 if 那半句不用 will？
英文的規定是：if 那半句說的是「假設這樣」，用現在式就好，未來的意思交給另一半的 will。
If it [rains] tomorrow, we will stay home. ✓
If it will rain tomorrow, … ✗
雖然 tomorrow 是明天，if 後面還是用 rains。

③ 結果那半句可以有三種
會怎樣 → will：If you hurry, you [will] catch the bus.
可以怎樣 → can：If you finish, you [can] go home.
叫人做事 → 直接用動詞開頭：If you are tired, [take] a rest.
不管哪一種，if 那半句都用現在式。

④ 順序可以對調
If it rains, we will stay home.（if 在前面，中間加逗號）
We will stay home if it rains.（if 在後面，不用逗號）
意思一樣。

⑤ unless ＝ if not（除非）
[Unless] you hurry, you will be late.
＝ If you don't hurry, you will be late.
如果你不快一點，你會遲到。

👉 if 後面用現在式，另一半才放 will、can 或叫人做事。`
};
