const zones = document.querySelectorAll('.scroll-zone');
const contents = document.querySelectorAll('.content-section');
const navContainer = document.getElementById('fixed-nav');

// 現在アクティブなセクションのIDを保持
let currentActiveId = "";

const updateSection = () => {
  const vCenter = window.innerHeight / 2;
  let activeContent = null;

  zones.forEach(zone => {
    const rect = zone.getBoundingClientRect();
    const zoneCenter = rect.top + rect.height / 2;
    if (Math.abs(zoneCenter - vCenter) < window.innerHeight * 0.4) {
      const targetId = zone.id.replace('-zone', '-content');
      activeContent = document.getElementById(targetId);
    }
  });

  contents.forEach(c => c.classList.remove('active'));
  
  if (activeContent) {
    activeContent.classList.add('active');
    currentActiveId = activeContent.id; // IDを記録
    
    // さいごに（final-content）が表示された時だけナビボタンを出す
    if (currentActiveId === 'final-content') {
      navContainer?.classList.add('show');
    } else {
      navContainer?.classList.remove('show');
    }
  }
};

window.addEventListener('scroll', updateSection);
window.addEventListener('load', updateSection);

const finalBtn = document.getElementById('final-button');
const overlay = document.getElementById('final-message-overlay');
const closeBtn = document.getElementById('close-overlay');

finalBtn?.addEventListener('click', () => {
  // ★重要：「さいごに」がアクティブな時だけオーバーレイを表示
  if (currentActiveId === 'final-content') {
    overlay.classList.add('show');
  }
});

closeBtn?.addEventListener('click', () => overlay.classList.remove('show'));
overlay?.addEventListener('click', (e) => { 
  if(e.target === overlay) overlay.classList.remove('show'); 
});