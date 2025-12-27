// 表示・非表示を切り替えるセクションと、トリガーとなるゾーンを取得
const zones = document.querySelectorAll('.scroll-zone');
const contents = document.querySelectorAll('.content-section');

const updateSection = () => {
  const vCenter = window.innerHeight / 2;
  let activeContent = null;

  zones.forEach(zone => {
    const rect = zone.getBoundingClientRect();
    const zoneCenter = rect.top + rect.height / 2;
    
    // ゾーンの中央が画面中央に近いとき、そのセクションをアクティブにする
    if (Math.abs(zoneCenter - vCenter) < window.innerHeight * 0.4) {
      const targetId = zone.id.replace('-zone', '-content');
      activeContent = document.getElementById(targetId);
    }
  });

  // すべてのコンテンツの .active を一旦外す
  contents.forEach(c => c.classList.remove('active'));
  
  // 該当するコンテンツがあれば .active を追加
  if (activeContent) {
    activeContent.classList.add('active');
  }
};

window.addEventListener('scroll', updateSection);
window.addEventListener('load', updateSection);

// メッセージ表示の制御
const finalBtn = document.getElementById('final-button');
const overlay = document.getElementById('final-message-overlay');
const closeBtn = document.getElementById('close-overlay');

finalBtn?.addEventListener('click', () => {
  overlay.classList.add('show');
});

closeBtn?.addEventListener('click', () => {
  overlay.classList.remove('show');
});

// 背景クリックでも閉じる
overlay?.addEventListener('click', (e) => {
  if (e.target === overlay) overlay.classList.remove('show');
});

// Photoボタンの表示（IntersectionObserverを使用）
const photoZone = document.getElementById('photo-btn-zone');
const photoBtn = document.getElementById('fixed-photo-btn');

if (photoZone && photoBtn) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        photoBtn.classList.add('show');
      } else {
        photoBtn.classList.remove('show');
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(photoZone);
}