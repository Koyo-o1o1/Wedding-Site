const zones = document.querySelectorAll('.scroll-zone');
const contents = document.querySelectorAll('.content-section');

// --- 縦方向のセクション切り替え制御 ---
const updateSection = () => {
  const vCenter = window.innerHeight / 2;
  let activeContent = null;

  zones.forEach(zone => {
    const rect = zone.getBoundingClientRect();
    const zoneCenter = rect.top + rect.height / 2;
    if (Math.abs(zoneCenter - vCenter) < window.innerHeight * 0.4) {
      activeContent = document.getElementById(zone.id.replace('-zone', '-content'));
    }
  });

  contents.forEach(c => c.classList.remove('active'));
  if (activeContent) activeContent.classList.add('active');
};

window.addEventListener('scroll', updateSection);
window.addEventListener('load', updateSection);

// --- 横方向の自動スクロール + 指でのスライド対応 ---
const setupInteractiveLane = (laneId, speed) => {
  const lane = document.getElementById(laneId);
  const wrapper = lane?.parentElement;
  if (!lane || !wrapper) return;
  
  let x = 0;
  let isTouching = false;

  // 指で触れている間は自動再生を止める
  wrapper.addEventListener('touchstart', () => { isTouching = true; }, {passive: true});
  wrapper.addEventListener('touchend', () => { 
    isTouching = false; 
    x = wrapper.scrollLeft; // 離した位置から再生を再開
  }, {passive: true});

  const step = () => {
    if (!isTouching) {
      x += speed;
      // ループ処理：半分まで来たら最初に戻す（HTML側で画像を2セット並べている前提）
      if (x >= lane.scrollWidth / 2) x = 0;
      wrapper.scrollLeft = x;
    }
    requestAnimationFrame(step);
  };
  step();
};

// ★速度を 0.4 に落として、ゆったり動かします
setupInteractiveLane('groom-lane', 0.4);
setupInteractiveLane('bride-lane', 0.4);