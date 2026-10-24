// ===================== 💬 情境對話（聽說分頁：你扮演「你」，對方的話會自動念） =====================
// 格式：[代號, 標題, 情境說明, 對方是誰, '說話的人|英文|中文' 一行一句]，說話的人寫「你」就是使用者要說的
const DIALOGS = [
  ['cafe', '☕ 咖啡店點餐', '你走進咖啡店，想點一杯熱拿鐵帶走。', '店員', `
店員|Hi! What can I get for you?|嗨！要點什麼？
你|Can I have a latte, please?|可以給我一杯拿鐵嗎？
店員|Sure. Hot or iced?|好的。熱的還是冰的？
你|Hot, please.|熱的，謝謝。
店員|What size would you like?|要什麼尺寸？
你|Medium, please.|中杯，謝謝。
店員|For here or to go?|內用還是外帶？
你|To go, please.|外帶，謝謝。
店員|That's four fifty.|一共四塊五。
你|Can I pay by card?|可以刷卡嗎？
店員|Of course. Here you go.|當然。給你。
你|Thank you!|謝謝！`],
  ['restaurant', '🍝 餐廳點餐', '你在西餐廳，服務生來幫你點餐。', '服務生', `
服務生|Are you ready to order?|可以點餐了嗎？
你|Yes. I'd like the steak, please.|好了。我要牛排。
服務生|How would you like your steak?|牛排要幾分熟？
你|Medium, please.|五分熟，謝謝。
服務生|Anything to drink?|要喝點什麼嗎？
你|Just water, please.|白開水就好，謝謝。
服務生|Is everything OK?|餐點還可以嗎？
你|Yes, it's delicious.|可以，很好吃。
服務生|Would you like some dessert?|要來點甜點嗎？
你|No, thanks. Can I have the check, please?|不用了，謝謝。可以幫我結帳嗎？`],
  ['way', '🗺️ 問路', '你在國外找不到捷運站，問路上的人。', '路人', `
你|Excuse me. Where is the subway station?|不好意思，請問捷運站在哪裡？
路人|Go straight and turn left at the corner.|直走，在轉角左轉。
你|Is it far from here?|離這裡遠嗎？
路人|No, it's about five minutes on foot.|不遠，走路大約五分鐘。
你|Turn left at the corner?|在轉角左轉嗎？
路人|Yes. It's next to the bank.|對，就在銀行旁邊。
你|Thank you so much.|非常謝謝你。
路人|You're welcome. Have a nice day!|不客氣，祝你有美好的一天！`],
  ['checkin', '🛫 機場報到', '你在機場櫃台報到，要搭飛機回台灣。', '櫃台人員', `
櫃台人員|Good morning. Can I see your passport, please?|早安，可以看一下您的護照嗎？
你|Here you are.|在這裡。
櫃台人員|Where are you flying today?|您今天要飛去哪裡？
你|I'm flying to Taipei.|我要飛去台北。
櫃台人員|Do you have any bags to check in?|有要托運的行李嗎？
你|Yes, one suitcase.|有，一個行李箱。
櫃台人員|Would you like a window or an aisle seat?|您想要靠窗還是靠走道的位子？
你|A window seat, please.|靠窗的位子，謝謝。
櫃台人員|Here is your boarding pass. Boarding is at gate 12.|這是您的登機證，在 12 號登機門登機。
你|Thank you. What time is boarding?|謝謝。幾點開始登機？
櫃台人員|At ten thirty.|十點半。`],
  ['immigration', '🛂 入境審查', '你到了國外的機場，海關人員問你問題。', '海關人員', `
海關人員|What's the purpose of your visit?|你來的目的是什麼？
你|I'm here on vacation.|我是來度假的。
海關人員|How long will you stay?|你會待多久？
你|I will stay for one week.|我會待一個禮拜。
海關人員|Where are you staying?|你住在哪裡？
你|I'm staying at a hotel downtown.|我住在市中心的飯店。
海關人員|Are you traveling alone?|你一個人旅行嗎？
你|No, I'm traveling with my friend.|不是，我跟朋友一起。
海關人員|OK. Enjoy your trip.|好的，旅途愉快。
你|Thank you.|謝謝。`],
  ['hotel', '🏨 飯店入住', '你到了飯店櫃台，要辦理入住。', '櫃台人員', `
你|Hi, I have a reservation. My name is Amy Lin.|你好，我有訂房，我叫林艾咪。
櫃台人員|Welcome! Can I see your passport?|歡迎！可以看一下您的護照嗎？
你|Sure. Here you are.|好的，在這裡。
櫃台人員|You're in room 508. Here is your key card.|您的房間是 508，這是您的房卡。
你|What time is breakfast?|早餐是幾點？
櫃台人員|From seven to ten, on the second floor.|七點到十點，在二樓。
你|What's the Wi-Fi password?|Wi-Fi 密碼是什麼？
櫃台人員|It's on the back of your key card.|寫在房卡的背面。
你|Great. Thank you.|太好了，謝謝。`],
  ['shop', '🛍️ 買衣服', '你在服飾店看到一件喜歡的外套。', '店員', `
店員|Hi! Can I help you?|嗨！需要幫忙嗎？
你|I'm just looking, thanks.|我只是看看，謝謝。
你|Excuse me. Do you have this in a medium?|不好意思，這件有 M 號嗎？
店員|Let me check. Yes, here you go.|我看一下。有，給你。
你|Can I try it on?|我可以試穿嗎？
店員|Sure. The fitting room is over there.|可以，試衣間在那邊。
你|How much is it?|這件多少錢？
店員|It's forty dollars. It's on sale today.|四十元，今天有打折。
你|OK, I'll take it.|好，我要買這件。`],
  ['friend', '🙋 認識新朋友', '你在聚會上認識一個新朋友。', '新朋友', `
新朋友|Hi! I'm Tom. What's your name?|嗨！我是湯姆。你叫什麼名字？
你|Hi, Tom. I'm Amy. Nice to meet you.|嗨，湯姆。我是艾咪，很高興認識你。
新朋友|Nice to meet you too. Where are you from?|我也很高興認識你。你是哪裡人？
你|I'm from Taiwan. How about you?|我來自台灣。你呢？
新朋友|I'm from Canada. What do you do?|我來自加拿大。你做什麼工作？
你|I'm a nurse. What about you?|我是護理師。你呢？
新朋友|I'm a teacher. What do you like to do for fun?|我是老師。你平常喜歡做什麼？
你|I like hiking and watching movies.|我喜歡爬山和看電影。
新朋友|Me too! Let's go hiking sometime.|我也是！改天一起去爬山吧。
你|Sounds great!|聽起來很棒！`],
  ['doctor', '💊 藥局買藥', '你在國外感冒了，到藥局買藥。', '藥師', `
藥師|Hi. How can I help you?|你好，有什麼需要嗎？
你|I have a cold. I have a sore throat.|我感冒了，喉嚨痛。
藥師|Do you have a fever?|有發燒嗎？
你|No, but I have a runny nose.|沒有，但是我流鼻水。
藥師|Try this medicine. Take it three times a day.|試試這個藥，一天吃三次。
你|Before or after meals?|飯前還是飯後吃？
藥師|After meals.|飯後吃。
你|Thank you. How much is it?|謝謝。多少錢？
藥師|It's eight dollars.|八元。`],
  // ↓ 10/24 新增 12 個（第 6 欄是等級：1 日常入門、2 進階、3 高階）
  ['convenience', '🏪 便利商店結帳', '你在便利商店買東西，到櫃台結帳。', '店員', `
店員|Hi. Is that everything?|嗨，這樣就好了嗎？
你|Yes. Can I have a bag, please?|對。可以給我一個袋子嗎？
店員|Sure. That's two dollars for the bag.|好的，袋子要兩塊錢。
你|OK. How much is it in total?|好。全部多少錢？
店員|It's twelve dollars.|十二塊。
你|Can I pay with my phone?|可以用手機付嗎？
店員|Yes. Please scan the code here.|可以，請掃這裡的條碼。
你|Done. Thank you.|好了，謝謝。
店員|Do you need a receipt?|需要收據嗎？
你|No, thanks.|不用，謝謝。`, 1],
  ['bubbletea', '🧋 點手搖飲', '你在飲料店點一杯珍珠奶茶。', '店員', `
店員|Hi! What would you like?|嗨！你要點什麼？
你|One bubble milk tea, please.|一杯珍珠奶茶，謝謝。
店員|What size?|要什麼尺寸？
你|Large, please.|大杯，謝謝。
店員|How much sugar?|甜度要多少？
你|Half sugar, please.|半糖，謝謝。
店員|And ice?|冰塊呢？
你|Less ice, please.|少冰，謝謝。
店員|OK. That's sixty dollars.|好的，六十元。
你|Here you are.|給你。`, 1],
  ['neighbor', '👋 跟鄰居打招呼', '早上出門上班，在電梯口遇到鄰居。', '鄰居', `
鄰居|Good morning! How are you?|早安！你好嗎？
你|I'm fine, thanks. And you?|我很好，謝謝。你呢？
鄰居|Pretty good. Are you going to work?|還不錯。你要去上班嗎？
你|Yes. I'm a little late today.|對，我今天有點晚了。
鄰居|It might rain later. Do you have an umbrella?|等一下可能會下雨。你有帶傘嗎？
你|Oh, no. I forgot it.|喔，糟了，我忘了帶。
鄰居|You can borrow mine.|你可以借我的。
你|Thank you so much!|非常謝謝你！
鄰居|No problem. Have a nice day!|不客氣，祝你有美好的一天！
你|You too!|你也是！`, 1],
  ['taxi', '🚕 搭計程車', '你坐上計程車，要去台北車站。', '司機', `
司機|Hi. Where to?|嗨，要去哪裡？
你|To Taipei Main Station, please.|請到台北車站。
司機|Sure.|好的。
你|How long will it take?|要多久？
司機|About twenty minutes.|大約二十分鐘。
你|Can you go a little faster? I'm in a hurry.|可以開快一點嗎？我在趕時間。
司機|I'll try. The traffic is bad today.|我盡量，今天塞車。
你|Can you stop here, please?|可以在這裡停嗎？
司機|Sure. That's two hundred and ten dollars.|好的，兩百一十元。
你|Here's two hundred and twenty. Keep the change.|這是兩百二十元，不用找了。`, 1],
  ['clinic', '🩺 看醫生', '你感冒了，去診所看醫生。', '醫生', `
醫生|Hello. What seems to be the problem?|你好，哪裡不舒服？
你|I have a sore throat and a fever.|我喉嚨痛，還有發燒。
醫生|When did it start?|什麼時候開始的？
你|Two days ago.|兩天前。
醫生|Do you have a cough?|有咳嗽嗎？
你|Yes, a little.|有，一點點。
醫生|Let me check. Open your mouth, please. It's a cold.|我看看，請張開嘴巴。是感冒。
醫生|Take this medicine three times a day.|這個藥一天吃三次。
你|Should I take it after meals?|要飯後吃嗎？
醫生|Yes. And drink a lot of water and get some rest.|對，還有多喝水、多休息。
你|OK. Thank you, doctor.|好的，謝謝醫生。`, 2],
  ['callfriend', '📞 打電話約朋友', '你打電話給朋友 Amy，約她週六看電影。', '朋友', `
朋友|Hello?|喂？
你|Hi, Amy. It's me. Are you free this Saturday?|嗨，Amy，是我。你這週六有空嗎？
朋友|I think so. What's up?|應該有。怎麼了？
你|Do you want to see a movie?|要不要去看電影？
朋友|Sure! What time?|好啊！幾點？
你|How about seven p.m.?|晚上七點怎麼樣？
朋友|Sounds good. Where should we meet?|聽起來不錯。我們要在哪裡見面？
你|Let's meet at the station.|我們在車站見。
朋友|OK. See you then!|好，到時候見！
你|See you!|掰掰！`, 2],
  ['return', '📦 退貨換貨', '你昨天買的襯衫太小了，回店裡換。', '店員', `
店員|Hi. How can I help you?|你好，有什麼需要幫忙的嗎？
你|I bought this shirt yesterday, but it's too small.|我昨天買了這件襯衫，但是太小了。
店員|Do you have the receipt?|有收據嗎？
你|Yes, here it is.|有，在這裡。
店員|Would you like to exchange it or get a refund?|你要換貨還是退款？
你|Can I exchange it for a bigger size?|可以換大一號的嗎？
店員|Sure. Here's a large.|當然，這是大號的。
你|Can I try it on?|我可以試穿嗎？
店員|Of course. The fitting room is over there.|當然，試衣間在那邊。
你|Thanks. This one fits well.|謝謝，這件很合身。`, 2],
  ['firstday', '💼 第一天上班', '今天是你新工作的第一天，同事來跟你打招呼。', '同事', `
同事|Hi! You must be new here. I'm Tom.|嗨！你一定是新來的。我是 Tom。
你|Yes, it's my first day. I'm Amy. Nice to meet you.|對，今天是我第一天上班。我是 Amy，很高興認識你。
同事|Nice to meet you, too. Do you need any help?|我也很高興認識你。需要幫忙嗎？
你|Yes. Where is the meeting room?|需要。會議室在哪裡？
同事|It's on the third floor, next to the elevator.|在三樓，電梯旁邊。
你|Thanks. What time is lunch?|謝謝。幾點吃午餐？
同事|Usually at twelve. Do you want to have lunch together?|通常是十二點。要不要一起吃午餐？
你|Sure, I'd love to.|好啊，我很樂意。
同事|Great. I'll come and get you at twelve.|太好了，我十二點來找你。
你|Thank you so much.|非常謝謝你。`, 2],
  ['rent', '🏠 看房子租房', '你去看一間要出租的公寓，房東帶你參觀。', '房東', `
房東|This is the living room, and the bedroom is over there.|這裡是客廳，臥室在那邊。
你|It's nice. How much is the rent?|很不錯。房租多少？
房東|It's fifteen thousand dollars a month.|一個月一萬五千元。
你|Does that include water and electricity?|有包含水電嗎？
房東|Water is included, but electricity isn't.|有包水，但不包電。
你|Can I have pets here?|這裡可以養寵物嗎？
房東|Sorry, no pets.|抱歉，不能養寵物。
你|When can I move in?|我什麼時候可以搬進來？
房東|Next Monday.|下週一。
你|OK. I'll think about it and call you tomorrow.|好，我考慮一下，明天打給你。`, 2],
  ['meeting', '📊 開會報告', '主管在開會時問你負責的專案進度。', '主管', `
主管|Let's start the meeting. How's the project going?|我們開始開會吧。專案進行得怎麼樣？
你|It's going well. We finished the first part last week.|進行得很順利。我們上週完成了第一部分。
主管|Great. Are there any problems?|很好。有遇到什麼問題嗎？
你|Yes, one. We need more time for testing.|有一個。我們需要多一點時間測試。
主管|How much more time do you need?|你們還需要多少時間？
你|About one more week.|大約再一個禮拜。
主管|Can you finish it by the end of the month?|月底前可以完成嗎？
你|I think so, if one more person can help us.|如果能多一個人幫忙，我想可以。
主管|OK. I'll ask Tom to join your team.|好，我會請 Tom 加入你們這組。
你|Thank you. I'll send you an update on Friday.|謝謝。我週五會寄最新進度給你。`, 3],
  ['complaint', '😤 飯店客訴', '你的飯店房間冷氣壞了，你到櫃台反映。', '櫃台人員', `
你|Excuse me. There's a problem with my room.|不好意思，我的房間有問題。
櫃台人員|I'm sorry to hear that. What's wrong?|很抱歉，怎麼了呢？
你|The air conditioner doesn't work, and it's very hot.|冷氣不會動，房間很熱。
櫃台人員|I'm so sorry. I'll send someone to fix it right away.|非常抱歉，我馬上派人去修。
你|How long will it take?|要多久？
櫃台人員|About thirty minutes.|大約三十分鐘。
你|I'm really tired. Could I change to another room instead?|我真的很累。可以直接換一間房間嗎？
櫃台人員|Of course. We'll give you a bigger room for the same price.|當然可以。我們用同樣的價錢，幫您換一間比較大的房間。
你|That would be great. Thank you.|那太好了，謝謝。
櫃台人員|Here's your new key card. Sorry again for the trouble.|這是新的房卡。再次抱歉造成您的不便。`, 3],
  ['interview', '🤝 工作面試', '你去醫院面試護理師的工作。', '面試官', `
面試官|Thank you for coming. Please tell me about yourself.|謝謝你來。請介紹一下你自己。
你|I'm Amy. I've worked as a nurse for five years.|我是 Amy，我當護理師五年了。
面試官|Why do you want to work here?|你為什麼想在這裡工作？
你|Your hospital is famous for good care, and I want to keep learning.|你們醫院以用心照顧病人出名，而且我想繼續學習。
面試官|What are your strengths?|你的優點是什麼？
你|I'm patient, and I work well with others.|我很有耐心，也很會和別人合作。
面試官|What about your weaknesses?|那你的缺點呢？
你|Sometimes I worry too much, but I'm working on it.|我有時候太容易擔心，但我正在改進。
面試官|Do you have any questions for us?|你有什麼問題想問我們嗎？
你|Yes. What does a normal day look like in this job?|有。這份工作平常的一天是怎麼樣的？
面試官|Good question. Let me tell you.|好問題，我來說明一下。`, 3]
].map(([id, title, scene, other, text, level]) => ({
  id, title, scene, other,
  // 原本的 9 個：日常的放第 1 級，出國、看病的放第 2 級
  level: level || ({ cafe: 1, restaurant: 1, way: 1, shop: 1, friend: 1 }[id] || 2),
  lines: text.trim().split('\n').map(l => { const [who, en, zh] = l.split('|'); return { me: who === '你', who, en, zh }; })
}));

// 💬 怎麼回答？（10/24 使用者的朋友建議：題目「Hi, how are you?」→ 選出「I'm good.」這種回答）
// 每一行：對方說的話|中文|正確回答|回答的中文|錯的回答1|錯的回答2|錯的回答3|為什麼
// 錯的回答故意放「文法對、但答非所問」或台灣人常犯的錯
const REPLIES = `
打招呼|Hi, how are you?|嗨，你好嗎？|I'm good, thanks. And you?|我很好，謝謝。你呢？|I'm 30 years old.|Yes, I am.|I'm from Taiwan.|How are you? 是問「你好嗎」，回答 I'm good / I'm fine / Not bad 就好，可以再問回去 And you?
打招呼|Nice to meet you.|很高興認識你。|Nice to meet you, too.|我也很高興認識你。|Yes, I meet you.|Thank you very much.|You're welcome.|對方說 Nice to meet you，回答加一個 too（也）就好
打招呼|What's up?|最近怎樣？（很口語）|Not much. How about you?|沒什麼特別的，你呢？|The sky is up.|Yes, it is.|I'm up.|What's up? 是朋友之間的「最近怎樣」，常回答 Not much.（沒什麼）
打招呼|Long time no see!|好久不見！|Yeah! How have you been?|對啊！你最近好嗎？|No, I can see you.|See you later.|Yes, I don't see.|Long time no see 是「好久不見」，回答時可以問 How have you been?（最近好嗎）
打招呼|See you tomorrow!|明天見！|See you!|明天見！|Yes, I see.|Tomorrow is Friday.|I can't see you.|道別時對方說 See you…，回一句 See you! 或 Bye! 就好
打招呼|Have a nice weekend!|週末愉快！|Thanks, you too!|謝謝，你也是！|Yes, I have.|No, I don't have.|It's Saturday.|別人祝福你，回答 Thanks, you too!（謝謝，你也是）
自我介紹|Where are you from?|你是哪裡人？|I'm from Taiwan.|我來自台灣。|I'm fine, thank you.|I'm a nurse.|I live from Taipei.|Where are you from? 問你是哪裡人，用 I'm from + 地方
自我介紹|What do you do?|你是做什麼工作的？|I'm a nurse.|我是護理師。|I'm watching TV.|I do my homework.|I'm good.|What do you do? 是問「職業」，不是問你現在在做什麼
自我介紹|How old are you?|你幾歲？|I'm 30.|我三十歲。|I'm 30 years.|I have 30 years.|I'm fine.|年紀用 I'm + 數字（years old 可以省略），不能說 I have 30 years
自我介紹|What's your name?|你叫什麼名字？|I'm Amy.|我是艾咪。|My name Amy.|Yes, my name.|I'm from Amy.|說名字用 I'm… 或 My name is…，is 不能少
自我介紹|Do you like music?|你喜歡音樂嗎？|Yes, I do.|喜歡。|Yes, I like.|Yes, I am.|Yes, I music.|Do you…? 的問句，回答用 Yes, I do. / No, I don't.（不是 I am）
自我介紹|Are you a student?|你是學生嗎？|No, I'm not. I work.|不是，我在上班。|No, I don't.|No, I'm not student.|Yes, I do.|Are you…? 的問句，回答用 Yes, I am. / No, I'm not.
餐廳|Are you ready to order?|準備好點餐了嗎？|Yes, I'd like the chicken, please.|好了，我要雞肉，謝謝。|Yes, I'm order.|I'm ready, thank you.|No, I'm full.|點餐用 I'd like…（我想要…），比 I want 有禮貌
餐廳|For here or to go?|內用還是外帶？|To go, please.|外帶，謝謝。|Yes, please.|I go.|Here you are.|這題是二選一，直接回答 For here 或 To go，不能只說 Yes
餐廳|Anything to drink?|要喝點什麼嗎？|Just water, please.|白開水就好，謝謝。|Yes, I drink.|I'm drinking.|No, I don't drink water.|點飲料：Just water, please. 或 A coke, please.
餐廳|How is everything?|餐點還可以嗎？|Everything is great, thanks.|都很好，謝謝。|Everything is 500 dollars.|I'm everything.|Yes, it is.|服務生來問餐點好不好吃，回答 It's great / It's delicious
餐廳|Would you like some dessert?|要來點甜點嗎？|No, thanks. I'm full.|不用了，謝謝，我吃飽了。|No, I don't like you.|Yes, I would like.|I'm dessert.|Would you like…? 拒絕時說 No, thanks.，很有禮貌
餐廳|Hot or iced?|要熱的還是冰的？|Iced, please.|冰的，謝謝。|Yes, please.|It's hot today.|I'm hot.|二選一的問題，直接說選哪一個，後面加 please
購物|Can I help you?|需要幫忙嗎？|I'm just looking, thanks.|我只是看看，謝謝。|No, you can't.|Yes, you can help.|Yes, I can help you.|店員問你，只想自己逛就說 I'm just looking, thanks.
購物|What size do you need?|你要什麼尺寸？|Medium, please.|中號，謝謝。|I need big.|Yes, I need.|I'm medium.|尺寸：small、medium、large，直接說尺寸就好
購物|Cash or card?|付現還是刷卡？|Card, please.|刷卡，謝謝。|Yes, I have.|I'm cash.|No, thank you.|二選一，直接回答 Cash 或 Card
購物|Do you need a bag?|需要袋子嗎？|No, thanks. I have one.|不用了，我有帶。|No, I don't need it bag.|Yes, I need bag please.|I'm a bag.|不需要就說 No, thanks.，要的話說 Yes, please.
問路|Excuse me, where is the station?|不好意思，車站在哪裡？|Go straight and turn left.|直走然後左轉。|Yes, it is.|I'm the station.|No, thank you.|問路的回答：Go straight（直走）、turn left / right（左轉／右轉）
問路|Is it far from here?|離這裡遠嗎？|No, it's about five minutes on foot.|不遠，走路大概五分鐘。|No, it isn't here.|Yes, I'm far.|It's from here.|回答遠不遠，可以說要走多久：It's about … minutes on foot.
問路|Can you show me on the map?|可以在地圖上指給我看嗎？|Sure. We're here, and it's here.|當然。我們在這裡，它在這裡。|Sure, I can map.|No, you can't show.|Yes, I am.|Can you…? 答應別人用 Sure. 或 Of course.
道謝道歉|Thank you so much!|非常謝謝你！|You're welcome.|不客氣。|Thank you too much.|Yes, I am.|Me too.|別人道謝，回答 You're welcome. / No problem. / My pleasure.
道謝道歉|I'm sorry I'm late.|抱歉我遲到了。|That's OK. Don't worry.|沒關係，別擔心。|You're welcome.|Yes, you are late.|Me too.|別人道歉，回答 That's OK. / No problem. / Don't worry.（不是 You're welcome）
道謝道歉|Sorry, I broke your cup.|抱歉，我打破你的杯子了。|It's OK. Are you hurt?|沒關係，你有沒有受傷？|You're welcome.|Yes, please.|Good job!|You're welcome 只用在別人「謝謝」你的時候，道歉不能用
道謝道歉|Excuse me, can I sit here?|不好意思，我可以坐這裡嗎？|Sure, go ahead.|可以，請坐。|Yes, you sit.|No, I'm sitting.|You're welcome.|答應別人用 Sure, go ahead.（請便）
邀約|Do you want to get coffee?|要不要去喝杯咖啡？|Sure, I'd love to!|好啊，我很想去！|Yes, I want coffee you.|I'm coffee.|No, I don't drink coffee you.|答應邀約：Sure! / I'd love to! 拒絕：Sorry, I'm busy.
邀約|Are you free on Saturday?|你星期六有空嗎？|Sorry, I'm busy that day.|抱歉，我那天有事。|Yes, I'm free money.|No, Saturday is not free.|I'm Saturday.|有空 Yes, I'm free.；沒空 Sorry, I'm busy. 或 I have plans.
邀約|How about 7 p.m.?|晚上七點怎麼樣？|Sounds good!|聽起來不錯！|It's 7 p.m. now.|I'm 7 p.m.|Yes, I about.|How about…? 是提議，同意就說 Sounds good! / OK!
邀約|Would you like to come to my party?|你要來我的派對嗎？|I'd love to. Thanks!|我很想去，謝謝！|Yes, I like party.|No, I'm not party.|Yes, I would like.|Would you like to…? 答應的時候說 I'd love to.
聊天|What did you do last weekend?|你上週末做了什麼？|I went hiking with my friends.|我跟朋友去爬山。|I go hiking with my friends.|I will go hiking.|Yes, I did.|問題用 did（過去），回答也要用過去式：went
聊天|What are you doing?|你在做什麼？|I'm cooking dinner.|我在煮晚餐。|I'm a cook.|I cook dinner every day.|I'm fine.|What are you doing? 問「現在正在做什麼」，用 I'm + V-ing 回答
聊天|Have you ever been to Japan?|你去過日本嗎？|Yes, I have. I went there last year.|有，我去年去過。|Yes, I do.|Yes, I am.|Yes, I go to Japan.|Have you…? 的問句，回答用 Yes, I have. / No, I haven't.
聊天|What do you think of this movie?|你覺得這部電影怎麼樣？|I think it's really good.|我覺得很好看。|I think about the movie.|Yes, I think.|I'm a movie.|問你的看法，用 I think it's… 回答
聊天|I'm so tired today.|我今天好累。|Oh no. You should get some rest.|喔不，你該好好休息。|You're welcome.|Thank you very much.|Good job!|別人說累，可以關心他：You should get some rest.（你該休息一下）
聊天|I passed my driving test!|我駕照考過了！|Congratulations! That's great!|恭喜！太棒了！|That's too bad.|I'm sorry.|You're welcome.|好消息要說 Congratulations!；That's too bad 是聽到壞消息時用的
聊天|I lost my wallet.|我的錢包掉了。|Oh no! That's too bad.|喔不！真糟糕。|Congratulations!|Good for you!|That's great!|壞消息要說 That's too bad. / I'm sorry to hear that.
電話|Hello, may I speak to Tom?|喂，請問湯姆在嗎？|Sorry, he's not here right now.|抱歉，他現在不在。|Yes, you may speak.|I'm not Tom speak.|No, I don't.|電話裡找的人不在，說 Sorry, he's not here right now.
電話|Can I leave a message?|我可以留言嗎？|Sure. What's your message?|當然，請說。|Yes, you can leave.|No, I'm a message.|Leave now.|答應幫忙留言：Sure. 再請對方說內容
`.trim().split('\n').map((l, i) => {
  const [group, q, qz, a, az, w1, w2, w3, why] = l.split('|');
  return { id: 'reply-' + i, group, q, qz, a, az, wrong: [w1, w2, w3], why, en: q };
});
