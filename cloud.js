// ===================== ☁️ 雲端自動存檔（Firebase：Email＋密碼登入，每個人的紀錄存在 users/{uid}） =====================
// 10/23 使用者選 Email＋密碼（iPhone 加到主畫面的 App 也能穩定登入）。
// CLOUD_CONFIG 是 Firebase 專案的「網頁應用程式設定」，不是密碼，可以放在公開的網站上；
// 安全靠 Firestore 規則：每個人只能讀寫自己的 users/{uid}。
// 還沒填 CLOUD_CONFIG 之前，設定頁會顯示「還沒開通」，網站其他功能照常。
const CLOUD_CONFIG = null;

const CLOUD_KEY = 'english-study-cloud';   // 這台裝置的同步狀態：{ uid, synced（上次同步的時間）, mtime（本機最後修改時間） }
let cloudUser = null, cloudReady = false, cloudMsg = '', cloudTimer = null;
const cloudState = () => { try { return JSON.parse(localStorage.getItem(CLOUD_KEY)) || {}; } catch (e) { return {}; } };
const setCloudState = o => { try { origSetItem.call(localStorage, CLOUD_KEY, JSON.stringify({ ...cloudState(), ...o })); } catch (e) {} };
// 不用上傳的：同步狀態本身、上次看到哪一頁
const CLOUD_SKIP = k => k === CLOUD_KEY || k === 'english-study-last';

// 本機紀錄一有變動就記下時間，登入的話 3 秒後自動上傳
const origSetItem = Storage.prototype.setItem;
Storage.prototype.setItem = function (k, v) {
  origSetItem.call(this, k, v);
  if (this === window.localStorage && String(k).startsWith('english-study-') && !CLOUD_SKIP(k)) {
    setCloudState({ mtime: Date.now() });
    if (cloudUser) { clearTimeout(cloudTimer); cloudTimer = setTimeout(cloudUpload, 3000); }
  }
};

function cloudData() {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.startsWith('english-study-') && !CLOUD_SKIP(k)) data[k] = localStorage.getItem(k); }
  return data;
}
const cloudDoc = () => firebase.firestore().collection('users').doc(cloudUser.uid);

async function cloudUpload() {
  if (!cloudUser) return;
  try {
    const now = Date.now();
    await cloudDoc().set({ data: JSON.stringify(cloudData()), updatedAt: now, device: navigator.userAgent.slice(0, 80) });
    setCloudState({ uid: cloudUser.uid, synced: now });
    cloudMsg = '';
  } catch (e) { cloudMsg = '⚠️ 上傳失敗（可能沒有網路），等一下會再試'; }
  cloudRefresh();
}
function cloudApply(json, when) {
  const data = JSON.parse(json);
  Object.entries(data).forEach(([k, v]) => origSetItem.call(localStorage, k, v));
  setCloudState({ uid: cloudUser.uid, synced: when, mtime: when });
  location.reload();
}
// 比較雲端和這台裝置，決定要下載還是上傳
async function cloudSync(first) {
  if (!cloudUser) return;
  try {
    const snap = await cloudDoc().get();
    const st = cloudState(), mine = st.uid === cloudUser.uid;
    if (!snap.exists) return cloudUpload();   // 雲端還沒有 → 把這台的上傳
    const { data, updatedAt } = snap.data();
    const localChanged = (st.mtime || 0) > (st.synced || 0);
    if (mine && updatedAt <= (st.synced || 0)) { if (localChanged) cloudUpload(); return; }   // 雲端沒有比較新
    if (mine && !localChanged) return cloudApply(data, updatedAt);   // 別台裝置更新過，這台沒動 → 直接下載
    // 第一次在這台登入，或兩邊都改過：問使用者
    const d = new Date(updatedAt).toLocaleString('zh-TW', { hour12: false });
    if (confirm(`雲端有 ${d} 的練習紀錄。\n\n按「確定」：用雲端的紀錄（這台的紀錄會被取代）\n按「取消」：保留這台的紀錄，並上傳到雲端`)) cloudApply(data, updatedAt);
    else cloudUpload();
  } catch (e) { cloudMsg = '⚠️ 同步失敗（可能沒有網路）'; cloudRefresh(); }
}

// 中文錯誤訊息
const cloudErr = e => ({
  'auth/invalid-email': 'Email 格式不對',
  'auth/missing-password': '請輸入密碼',
  'auth/weak-password': '密碼至少要 6 個字',
  'auth/email-already-in-use': '這個 Email 已經註冊過了，請直接按「登入」',
  'auth/invalid-credential': 'Email 或密碼不對',
  'auth/wrong-password': 'Email 或密碼不對',
  'auth/user-not-found': '找不到這個帳號，第一次用請按「註冊」',
  'auth/too-many-requests': '試太多次了，請等幾分鐘再試',
  'auth/network-request-failed': '沒有網路，請連上網路再試'
}[e && e.code] || '發生錯誤，請再試一次');

// 設定頁裡的「☁️ 雲端自動存檔」框框
function cloudBoxHtml() {
  if (!CLOUD_CONFIG) return `<div class="box"><h3>☁️ 雲端自動存檔</h3><p class="muted">還沒開通。開通後，換手機或清除網站資料，練習紀錄都不會不見。</p></div>`;
  if (!cloudReady) return `<div class="box" id="cloud-box"><h3>☁️ 雲端自動存檔</h3><p class="muted">連線中…</p></div>`;
  const msg = cloudMsg ? `<p class="cloud-msg">${esc(cloudMsg)}</p>` : '';
  if (cloudUser) {
    const st = cloudState();
    const last = st.synced ? new Date(st.synced).toLocaleString('zh-TW', { hour12: false }) : '還沒同步';
    return `<div class="box" id="cloud-box"><h3>☁️ 雲端自動存檔</h3>
      <p>✅ 已登入：<b>${esc(cloudUser.email)}</b></p>
      <p class="muted">練習紀錄會自動存到雲端。上次同步：${esc(last)}</p>${msg}
      <div class="row-btns"><button class="btn ghost" data-act="cloud-sync">🔄 現在同步</button><button class="btn ghost" data-act="cloud-out">登出</button></div></div>`;
  }
  return `<div class="box" id="cloud-box"><h3>☁️ 雲端自動存檔</h3>
    <p class="muted">登入後練習紀錄會自動存到雲端，換手機登入同一個帳號就能接著用。第一次用請按「註冊」。</p>
    <input id="cloud-email" class="search" type="email" placeholder="Email" autocomplete="email">
    <input id="cloud-pw" class="search" type="password" placeholder="密碼（至少 6 個字）" autocomplete="current-password">
    ${msg}
    <div class="row-btns"><button class="btn" data-act="cloud-in">登入</button><button class="btn ghost" data-act="cloud-up">註冊</button></div>
    <button class="small-link" data-act="cloud-forgot">忘記密碼？</button></div>`;
}
function cloudRefresh() { const b = document.getElementById('cloud-box'); if (b) b.outerHTML = cloudBoxHtml(); }

document.addEventListener('click', async e => {
  const el = e.target.closest('[data-act^="cloud-"]'); if (!el) return;
  const act = el.dataset.act;
  const email = (document.getElementById('cloud-email') || {}).value, pw = (document.getElementById('cloud-pw') || {}).value;
  const auth = firebase.auth();
  try {
    if (act === 'cloud-in') await auth.signInWithEmailAndPassword((email || '').trim(), pw || '');
    if (act === 'cloud-up') await auth.createUserWithEmailAndPassword((email || '').trim(), pw || '');
    if (act === 'cloud-forgot') {
      if (!email) { cloudMsg = '請先在上面填你的 Email'; return cloudRefresh(); }
      await auth.sendPasswordResetEmail(email.trim());
      cloudMsg = '📧 已寄出重設密碼的信，請到信箱收信';
      return cloudRefresh();
    }
    if (act === 'cloud-sync') { cloudMsg = ''; await cloudSync(); cloudMsg = cloudMsg || '✅ 同步好了'; cloudRefresh(); }
    if (act === 'cloud-out' && confirm('要登出嗎？這台裝置的紀錄會留著，但不會再自動存到雲端。')) await auth.signOut();
  } catch (err) { cloudMsg = '❌ ' + cloudErr(err); cloudRefresh(); }
});

// 載入 Firebase（只有開通後才載入，沒網路也不影響網站）
if (CLOUD_CONFIG) {
  const V = '10.12.5', load = n => new Promise((ok, no) => { const s = document.createElement('script'); s.src = `https://www.gstatic.com/firebasejs/${V}/firebase-${n}-compat.js`; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
  load('app').then(() => Promise.all([load('auth'), load('firestore')])).then(() => {
    firebase.initializeApp(CLOUD_CONFIG);
    firebase.auth().onAuthStateChanged(u => {
      cloudUser = u; cloudReady = true; cloudMsg = '';
      cloudRefresh();
      if (u) cloudSync(true);
    });
    // 回到 App 的時候，看看別台裝置有沒有更新
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') cloudSync(); else if (cloudUser) cloudUpload(); });
  }).catch(() => { cloudReady = true; cloudMsg = '⚠️ 現在沒有網路，連上網路後重新打開就會同步'; cloudRefresh(); });
}
