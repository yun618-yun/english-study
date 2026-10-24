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
