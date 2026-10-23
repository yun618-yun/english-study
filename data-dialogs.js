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
藥師|It's eight dollars.|八元。`]
].map(([id, title, scene, other, text]) => ({
  id, title, scene, other,
  lines: text.trim().split('\n').map(l => { const [who, en, zh] = l.split('|'); return { me: who === '你', who, en, zh }; })
}));
