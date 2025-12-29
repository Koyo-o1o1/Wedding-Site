const zones = document.querySelectorAll('.scroll-zone');
const contents = document.querySelectorAll('.content-section');
const navContainer = document.getElementById('fixed-nav');

// 現在アクティブなセクションのIDを保持する変数
let currentActiveId = "";

const updateSection = () => {
  const vCenter = window.innerHeight / 2;
  let activeContent = null;

  zones.forEach(zone => {
    const rect = zone.getBoundingClientRect();
    const zoneCenter = rect.top + rect.height / 2;
    
    // 画面の中央付近にきたゾーンを判定
    if (Math.abs(zoneCenter - vCenter) < window.innerHeight * 0.4) {
      const targetId = zone.id.replace('-zone', '-content');
      activeContent = document.getElementById(targetId);
    }
  });

  // すべてのコンテンツから一旦 active クラスを削除
  contents.forEach(c => c.classList.remove('active'));
  
  if (activeContent) {
    activeContent.classList.add('active');
    currentActiveId = activeContent.id; // 現在のセクションIDを更新
    
    // ★「さいごに」が表示された時だけナビゲーションボタンを表示し、それ以外では隠す
    if (currentActiveId === 'final-content') {
      navContainer?.classList.add('show');
    } else {
      navContainer?.classList.remove('show');
    }
  }
};

// スクロール時と読み込み時に実行
window.addEventListener('scroll', updateSection);
window.addEventListener('load', updateSection);

/* --- メッセージオーバーレイの制御 --- */
const finalBtn = document.getElementById('final-button');
const overlay = document.getElementById('final-message-overlay');
const closeBtn = document.getElementById('close-overlay');

finalBtn?.addEventListener('click', () => {
  // ★判定ガード：「さいごに」セクションがアクティブな時だけメッセージを開く
  if (currentActiveId === 'final-content') {
    overlay.classList.add('show');
  }
});

closeBtn?.addEventListener('click', () => {
  overlay.classList.remove('show');
});

// 背景クリックでも閉じる
overlay?.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.classList.remove('show');
  }
});