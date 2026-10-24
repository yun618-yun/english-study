// ===================== 導師補充：日常最常用的內容（Claude 寫的，不是截圖） =====================
// 放在獨立的檔案，不動原本的 data.js。index.html 在 data.js 後面、app.js 前面載入。
// 格式：[代號, 標題, 說明, '英文=中文|英文=中文…', 小提醒（可省略）]

// 把一組「英文=中文」變成：一則筆記（表格）＋每一條一張卡片
function buildGroups(prefix, groups, opts = {}) {
  return groups.flatMap(([key, name, intro, list, tip]) => {
    const rows = list.split('|').map(s => s.split('='));
    return [
      {
        id: `${prefix}-${key}`, title: `${name}（${rows.length} 個）`,
        note: (intro ? intro + '\n\n' : '') + rows.map(r => r.join('　')).join('\n') + (tip ? '\n\n' + tip : '')
      },
      ...rows.map(r => opts.card(r, key, prefix))
    ];
  });
}
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);

// ---------- 💬 生活常用句 ----------
const SENTENCES = [
  ['greet', '打招呼、寒暄', '見面、道別、感謝、道歉最常用的句子。',
    "Hi! How are you?=嗨！你好嗎？|I'm fine, thanks. And you?=我很好，謝謝。你呢？|Nice to meet you.=很高興認識你。|Long time no see.=好久不見。|See you later.=待會見。|See you tomorrow.=明天見。|Have a nice day!=祝你有美好的一天！|Thank you so much.=非常謝謝你。|You're welcome.=不客氣。|I'm sorry.=對不起。|That's OK. / No problem.=沒關係。|Excuse me.=不好意思（打擾一下）。",
    '💡 How are you? 通常回答 I\'m fine / I\'m good / Not bad，不用真的說很多\n💡 Excuse me 是「打擾一下、借過」；I\'m sorry 是「做錯事的道歉」'],
  ['intro', '自我介紹', '',
    "My name is Amy.=我的名字是艾咪。|I'm from Taiwan.=我來自台灣。|I live in Taipei.=我住在台北。|I'm 30 years old.=我 30 歲。|I work at a hospital.=我在醫院工作。|I'm a nurse.=我是護理師。|I like listening to music.=我喜歡聽音樂。|In my free time, I watch movies.=有空的時候我會看電影。|I'm learning English.=我正在學英文。|My English is not very good.=我的英文不是很好。",
    '💡 「我 30 歲」不要說 I\'m 30 years，要加 old：I\'m 30 years old.（或直接 I\'m 30.）'],
  ['work', '上班常用', '',
    "Good morning, everyone.=大家早安。|I'll be there in five minutes.=我五分鐘後到。|Sorry, I'm late.=抱歉，我遲到了。|Can you help me with this?=你可以幫我處理這個嗎？|Could you say that again, please?=可以請你再說一次嗎？|Could you speak more slowly?=可以請你說慢一點嗎？|I'll send you an email.=我會寄 email 給你。|Let me check.=我確認一下。|I'm busy right now.=我現在很忙。|I'm going to take a break.=我要休息一下。|I'm leaving now. See you tomorrow.=我先走了，明天見。|What time is the meeting?=會議幾點？",
    '💡 聽不懂的時候，說 Could you say that again, please? 或 Could you speak more slowly? 都很有禮貌'],
  ['food', '餐廳點餐', '',
    "A table for two, please.=兩位，謝謝。|Can I see the menu, please?=可以給我菜單嗎？|What do you recommend?=你推薦什麼？|I'd like a coffee, please.=我想要一杯咖啡。|For here or to go?=內用還是外帶？|To go, please.=外帶，謝謝。|Can I have some water?=可以給我一些水嗎？|It's delicious!=好好吃！|Can I have the bill, please?=可以幫我結帳嗎？|Can I pay by card?=可以刷卡嗎？",
    '💡 I\'d like… ＝ I would like…，比 I want… 更有禮貌\n💡 「結帳」美國常說 check：Check, please.'],
  ['shop', '購物', '',
    "How much is this?=這個多少錢？|How much are these?=這些多少錢？|It's too expensive.=太貴了。|Do you have a smaller size?=有小一點的尺寸嗎？|Can I try it on?=我可以試穿嗎？|I'm just looking, thanks.=我只是看看，謝謝。|I'll take it.=我要買這個。|Do you have this in black?=這個有黑色的嗎？|Can I get a bag?=可以給我一個袋子嗎？|Is there a discount?=有打折嗎？",
    '💡 一個東西用 How much is…，兩個以上用 How much are…'],
  ['way', '問路、交通', '',
    "Excuse me, where is the station?=不好意思，車站在哪裡？|How can I get to the airport?=我要怎麼去機場？|Is it far from here?=離這裡遠嗎？|Go straight.=直走。|Turn left.=左轉。|Turn right.=右轉。|It's on your left.=在你的左手邊。|It's next to the bank.=在銀行旁邊。|Which bus goes to the airport?=哪一班公車到機場？|How long does it take?=要花多久時間？",
    '💡 get to ＝ 到達某地；get home、get here 不加 to'],
  ['airport', '出國：機場、出入境', '出國旅遊一定會用到。海關問的問題通常很固定。',
    "Can I see your passport, please?=請給我看你的護照。|Here you are.=在這裡（給你）。|What's the purpose of your visit?=你來這裡的目的是什麼？|I'm here on vacation.=我是來度假的。|I'm here for sightseeing.=我是來觀光的。|How long will you stay?=你會待多久？|I'll stay for seven days.=我會待七天。|Where will you stay?=你會住在哪裡？|I'll stay at the Hilton Hotel.=我會住在希爾頓飯店。|Where can I get my baggage?=我要去哪裡領行李？|I'd like a window seat, please.=我想要靠窗的座位。|Where is the gate?=登機門在哪裡？",
    '💡 Here you are. 是把東西遞給別人時說的「給你」\n💡 海關問題回答簡短就好，不用講很多'],
  ['hotel', '出國：飯店', '',
    "I have a reservation.=我有訂房。|My name is Amy Chen.=我的名字是陳艾咪。|I'd like to check in, please.=我要入住。|I'd like to check out, please.=我要退房。|What time is breakfast?=早餐幾點？|Is there Wi-Fi?=有 Wi-Fi 嗎？|What's the Wi-Fi password?=Wi-Fi 密碼是什麼？|The air conditioner doesn't work.=冷氣壞了。|Can I leave my bags here?=我可以把行李寄放在這裡嗎？|Could you call a taxi for me?=可以幫我叫計程車嗎？",
    '💡 東西壞了可以說 … doesn\'t work（不能用）'],
  ['help', '出國：求助、突發狀況', '',
    "Can you help me, please?=可以請你幫我嗎？|I'm lost.=我迷路了。|I lost my wallet.=我的錢包掉了。|Can you take a photo for us?=可以幫我們拍照嗎？|Where is the restroom?=洗手間在哪裡？|Do you speak Chinese?=你會說中文嗎？|Can you write it down?=可以寫下來嗎？|I don't feel well.=我不太舒服。|Please call a doctor.=請幫我叫醫生。|Call the police!=快叫警察！",
    '💡 「洗手間」在外面說 restroom（美）或 toilet（英），比 bathroom 自然'],
  ['social', '認識新朋友、約會', '交朋友、約會時自然又有禮貌的說法。',
    "Hi, I'm Amy. What's your name?=嗨，我是艾咪，你叫什麼名字？|Where are you from?=你是哪裡人？|What do you do?=你是做什麼工作的？|What do you like to do for fun?=你平常喜歡做什麼？|Do you come here often?=你常來這裡嗎？|You have a nice smile.=你的笑容很好看。|It was really nice talking to you.=跟你聊天真的很開心。|Can I have your number?=可以給我你的電話嗎？|Do you have Instagram / LINE?=你有 IG／LINE 嗎？|Would you like to get coffee sometime?=改天要不要一起喝咖啡？|Are you free this weekend?=你這週末有空嗎？|I had a great time today.=我今天很開心。|Text me when you get home.=到家傳訊息給我。|I like you.=我喜歡你。",
    '💡 What do you do? 是問「你做什麼工作」，不是問「你在做什麼」（那是 What are you doing?）\n💡 Would you like to…? 比 Do you want to…? 更有禮貌，邀約很好用\n⚠️ 出國交友要注意安全：第一次見面約在人多的公共場所，不要給住址'],
  ['phone', '打電話、約時間', '',
    "Hello, this is Amy.=喂，我是艾咪。|May I speak to Tom?=請問湯姆在嗎？|Hold on, please.=請稍等。|He's not here right now.=他現在不在。|Can I leave a message?=我可以留言嗎？|I'll call you back.=我再回電給你。|Are you free tomorrow?=你明天有空嗎？|What time is good for you?=你幾點方便？|How about 3 o'clock?=三點如何？|See you then.=到時見。",
    '💡 電話裡說「我是…」用 This is…，不說 I am…'],
  ['feel', '表達感受、意見', '',
    "I'm tired.=我很累。|I'm hungry.=我餓了。|I'm so happy!=我好開心！|I'm worried about it.=我很擔心這件事。|I think so.=我想是的。|I don't think so.=我不這麼認為。|I agree.=我同意。|I don't agree.=我不同意。|That sounds good.=聽起來不錯。|I'm not sure.=我不確定。|Me too.=我也是。|Me neither.=我也不（是）。",
    '💡 「我也是」：對方說肯定句回 Me too；對方說否定句（I don\'t like it）要回 Me neither'],
];

// ---------- ⚡ 常用動詞、相反詞 ----------
const CORE = [
  ['verb-daily', '每天都會用的動詞', '',
    'wake up=醒來|get up=起床|wash=洗|brush=刷（牙）|eat=吃|drink=喝|cook=煮|go=去|come=來|walk=走路|run=跑|drive=開車|take=拿、搭（車）|work=工作|study=讀書|read=閱讀|write=寫|listen=聽|watch=看（電視）|sleep=睡覺',
    '💡 look、see、watch 都是「看」：look 是「去看」（Look at me.）、see 是「看到」（I see a cat.）、watch 是「盯著看一段時間」（watch TV）'],
  ['verb-common', '最常用的萬用動詞', '這些動詞可以搭配很多東西，一定要熟。',
    'have=有、吃|make=做、製作|do=做|get=得到、變得|give=給|take=拿、花（時間）|put=放|keep=保持|let=讓|help=幫忙|want=想要|need=需要|like=喜歡|love=愛|know=知道|think=想、認為|say=說|tell=告訴|ask=問|use=使用',
    '💡 make 和 do：make 是「做出東西」（make a cake、make money）；do 是「做事情、做工作」（do homework、do the dishes）\n💡 say 和 tell：say 後面接話（say hello）；tell 後面接人（tell me）'],
  ['verb-more', '常用動詞（生活）', '',
    'buy=買|sell=賣|pay=付錢|open=打開|close=關上|start=開始|finish=完成|stop=停止|wait=等|meet=遇見、見面|call=打電話|send=寄、送|bring=帶來|find=找到|lose=遺失|forget=忘記|remember=記得|try=嘗試|learn=學習|teach=教|suffer=遭受、忍受（痛苦）',
    '💡 suffer from ＋ 病痛：She suffers from headaches. 她常常頭痛。\n💡 borrow 和 lend：borrow 是「借入」（Can I borrow a pen?）、lend 是「借出」（Can you lend me a pen?）'],
  ['adj-pair', '常用形容詞（相反詞）', '成對背最有效。',
    'big ↔ small=大 ↔ 小|long ↔ short=長 ↔ 短|tall ↔ short=高 ↔ 矮|hot ↔ cold=熱 ↔ 冷|new ↔ old=新 ↔ 舊|young ↔ old=年輕 ↔ 老|fast ↔ slow=快 ↔ 慢|easy ↔ difficult=簡單 ↔ 難|cheap ↔ expensive=便宜 ↔ 貴|clean ↔ dirty=乾淨 ↔ 髒|full ↔ hungry=飽 ↔ 餓|happy ↔ sad=開心 ↔ 難過|busy ↔ free=忙 ↔ 有空|early ↔ late=早 ↔ 晚|right ↔ wrong=對 ↔ 錯|near ↔ far=近 ↔ 遠|heavy ↔ light=重 ↔ 輕|good ↔ bad=好 ↔ 壞',
    '💡 short 有兩個相反詞：長短的 long ↔ short、高矮的 tall ↔ short\n💡 old 也有兩個：新舊的 new ↔ old、老少的 young ↔ old'],
  ['adj-feel', '形容心情、感覺', '',
    'tired=累的|sleepy=想睡的|hungry=餓的|thirsty=渴的|bored=覺得無聊的|boring=（事情）無聊的|excited=覺得興奮的|exciting=（事情）令人興奮的|interested=感興趣的|interesting=（事情）有趣的|worried=擔心的|nervous=緊張的|angry=生氣的|sick=生病的',
    '⚠️ -ed 和 -ing 很容易搞錯：-ed 說「人的感覺」，-ing 說「事情的樣子」\nI am bored. 我覺得很無聊。（✓）\nI am boring. 我是個無聊的人。（意思完全不同！）\nThe movie is boring. 這部電影很無聊。'],
];

// ---------- 🔢 數字、時間、日期、價錢 ----------
const NUMBERS = [
  ['num', '數字', '',
    '0 zero=零|11 eleven=十一|12 twelve=十二|13 thirteen=十三|15 fifteen=十五|20 twenty=二十|30 thirty=三十|40 forty=四十|50 fifty=五十|100 one hundred=一百|1,000 one thousand=一千|10,000 ten thousand=一萬|100,000 one hundred thousand=十萬|1,000,000 one million=一百萬',
    '⚠️ 40 是 forty，沒有 u（不是 fourty）\n💡 13～19 重音在後面（thir-TEEN），30～90 重音在前面（THIR-ty），聽的時候要注意\n💡 英文沒有「萬」：一萬 ＝ ten thousand（十個千）'],
  ['time', '說時間', '',
    "What time is it?=現在幾點？|It's seven o'clock.=七點整。|It's seven thirty.=七點三十分。|It's half past seven.=七點半。|It's a quarter past seven.=七點十五分。|It's a quarter to eight.=七點四十五分（差十五分八點）。|It's 7:05 (seven oh five).=七點零五分。|at 9 a.m.=早上九點|at noon=中午十二點|at midnight=半夜十二點",
    '💡 a quarter ＝ 十五分鐘；half ＝ 三十分鐘\n💡 past ＝ 過了幾分；to ＝ 差幾分到下一個整點'],
  ['date', '日期', '',
    "What's the date today?=今天幾月幾號？|It's May 5th.=五月五日。|on May 5th=在五月五日|in 2025=在 2025 年|2025 (twenty twenty-five)=2025 年的念法|1998 (nineteen ninety-eight)=1998 年的念法|What day is it today?=今天星期幾？|It's Monday.=星期一。|My birthday is on July 20th.=我的生日是七月二十日。",
    '💡 日期用序數念：May 5th 念 May fifth\n💡 年份兩個兩個念：1998 ＝ nineteen / ninety-eight'],
  ['price', '價錢、電話', '',
    "How much is it?=多少錢？|It's 100 dollars.=一百元。|It's 50 NT dollars.=新台幣五十元。|$9.99 (nine ninety-nine)=九塊九毛九|What's your phone number?=你的電話號碼是幾號？|It's 0912-345-678.=是 0912-345-678。",
    '💡 電話號碼一個數字一個數字念，0 可以念 oh：0912 ＝ oh nine one two\n💡 兩個一樣的數字可以說 double：0911 ＝ oh nine double one'],
];

// ---------- 🚫 台灣人常犯的錯 ----------
// 格式：'錯誤的說法=正確的說法=說明'
const MISTAKES = [
  ['grammar', '文法上常見的錯', '這些都是中文直接翻成英文造成的錯，課本很少教，但很常聽到。',
    "I very like it.=I like it very much. / I really like it.=very 不能放在動詞前面|I am agree.=I agree.=agree 是動詞，前面不加 am|I am go to school.=I go to school.=be 動詞和一般動詞不能放一起|He go to work.=He goes to work.=he / she / it 動詞要加 s|Although…, but…=Although…, …（不加 but）=although 和 but 只能用一個|Because…, so…=Because…, …（不加 so）=because 和 so 只能用一個|I have a question want to ask you.=I have a question for you.=中文「有…要…」不能直接翻|People is…=People are…=people 是複數|How to say?=How do you say it in English?=How to… 不能自己當一句問句|I don't know how to do.=I don't know what to do.=「不知道該怎麼辦」用 what to do"],
  ['word', '用字上常見的錯', '',
    "open the light=turn on the light=開燈、開電視用 turn on|close the light=turn off the light=關燈用 turn off|play computer=use the computer / play computer games=play 後面接遊戲、運動、樂器|eat medicine=take medicine=吃藥用 take|see a book=read a book=看書用 read|learn knowledge=gain knowledge / learn things=learn knowledge 不自然|discuss about it=discuss it=discuss 後面直接接東西|marry with him=marry him=marry 後面直接接人|my English is poor=my English isn't very good=poor 聽起來很負面|I'm boring.=I'm bored.=I'm boring. 是「我是個無聊的人」|I'm so hot.=It's so hot today. / I feel hot.=說「天氣好熱」主詞用 it；I'm so hot. 可能被聽成「我很性感」"],
];

// 放進網站：排在「單字」前面
{
  const at = NOTES.findIndex(c => c.id === 'vocab');
  NOTES.splice(at, 0,
    {
      id: 'daily', name: '生活常用句', icon: '💬', color: '#3f8fc4', desc: '打招呼、上班、點餐、問路…',
      items: buildGroups('dl', SENTENCES, {
        // 卡片正面是中文，練習「說得出來」
        card: ([en, zh], key, p) => ({ id: `${p}-${key}-${slug(en)}`, front: zh, back: en, say: en.replace(/ \/ /g, ', '), group: `${p}-${key}` })
      })
    },
    {
      id: 'core', name: '常用動詞和形容詞', icon: '⚡', color: '#d9822b', desc: '湊出句子必備的動詞、相反詞',
      items: buildGroups('cw', CORE, {
        card: ([en, zh], key, p) => ({ id: `${p}-${key}-${slug(en)}`, front: zh, back: en, say: en.replace(' ↔ ', ', '), group: `${p}-${key}` })
      })
    },
    {
      id: 'numbers', name: '數字、時間、日期', icon: '🔢', color: '#7d8a3c', desc: '幾點幾分、日期、價錢、電話',
      items: buildGroups('nm', NUMBERS, {
        card: ([en, zh], key, p) => ({ id: `${p}-${key}-${slug(en)}`, front: zh, back: en,
          say: en.replace(/^[\d,:$.]+\s*/, '').replace(/[()]/g, ''), group: `${p}-${key}` })
      })
    },
    {
      id: 'mistakes', name: '台灣人常犯的錯', icon: '🚫', color: '#c0485a', desc: 'I very like it ✗ → I really like it ✓',
      items: MISTAKES.flatMap(([key, name, intro, list]) => {
        const rows = list.split('|').map(s => s.split('='));
        return [
          {
            id: `mk-${key}`, title: `${name}（${rows.length} 個）`,
            note: (intro ? intro + '\n\n' : '') + rows.map(([bad, good, why], i) =>
              // ✓ 放在句子後面，網站才會加 🔊；錯誤的句子 ✗ 放前面，不念（免得記錯）
              `${'①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮'[i] || '・'} ${why}\n✗ ${bad}\n${good} ✓`).join('\n\n')
          },
          ...rows.map(([bad, good, why]) => ({
            id: `mk-${key}-${slug(bad)}`, front: `這句哪裡錯？\n✗ ${bad}`, back: `${good}\n${why}`,
            say: good.replace(/（.*?）/g, '').replace(/ \/ .*$/, ''), group: `mk-${key}`
          }))
        ];
      })
    }
  );
}
