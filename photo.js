const setupLane = (laneId, speed) => {
  const lane = document.getElementById(laneId);
  const inner = lane.querySelector('.lane-inner');
  
  let isUserActive = false;
  let resumeTimer = null;
  let currentX = lane.scrollLeft;

  // 全ての画像が読み込まれた後に幅を計算する必要がある
  const init = () => {
    const animate = () => {
      if (!isUserActive) {
        currentX += speed;

        // 全体の幅の半分をループの境目にする
        const half = inner.scrollWidth / 2;
        if (currentX >= half && speed > 0) {
          currentX = 0;
        } else if (currentX <= 0 && speed < 0) {
          currentX = half;
        }

        lane.scrollLeft = Math.floor(currentX);
      }
      requestAnimationFrame(animate);
    };

    const stopAuto = () => {
      isUserActive = true;
      clearTimeout(resumeTimer);
    };

    const startAuto = () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        currentX = lane.scrollLeft;
        isUserActive = false;
      }, 100);
    };

    lane.addEventListener('pointerdown', stopAuto);
    lane.addEventListener('touchstart', stopAuto, { passive: true });
    window.addEventListener('pointerup', startAuto);
    window.addEventListener('touchend', startAuto);
    lane.addEventListener('wheel', () => { stopAuto(); startAuto(); }, { passive: true });

    requestAnimationFrame(animate);
  };

  // 画像の読み込み完了を待ってから開始（プリロード対応）
  const imgs = inner.querySelectorAll('img');
  let loadedCount = 0;
  if (imgs.length === 0) {
    init();
  } else {
    imgs.forEach(img => {
      if (img.complete) {
        loadedCount++;
        if (loadedCount === imgs.length) init();
      } else {
        img.addEventListener('load', () => {
          loadedCount++;
          if (loadedCount === imgs.length) init();
        });
        // 読み込みエラー時もカウントを進めて停止を防ぐ
        img.addEventListener('error', () => {
          loadedCount++;
          if (loadedCount === imgs.length) init();
        });
      }
    });
  }
};

window.addEventListener('load', () => {
  setupLane('lane-1', 0.13); 
  
  const lane2 = document.getElementById('lane-2');
  // 右へ流れる方は、画像読み込み完了を待つ必要があるので、少し遅らせて初期位置調整
  setTimeout(() => {
    lane2.scrollLeft = lane2.scrollWidth / 2;
    setupLane('lane-2', -0.13);
  }, 100);
});