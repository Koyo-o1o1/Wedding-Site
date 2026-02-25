window.addEventListener("load", () => {
  const body = document.body;
  const loading = document.getElementById("loading-screen");
  const main = document.getElementById("main-content");
  const introScreen = document.getElementById("intro-screen");

  const c3 = document.getElementById("count-3");
  const c2 = document.getElementById("count-2");
  const c1 = document.getElementById("count-1");

  const observePoint = document.getElementById("observe-point");
  const profileBtn = document.getElementById("profile-btn");
  const greeting = document.getElementById("greeting");

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const showAndHide = async (el, showMs = 320, gapMs = 120) => {
    el.style.display = "block";
    el.classList.add("is-show");
    el.setAttribute("aria-hidden", "false");

    await sleep(showMs);

    el.classList.remove("is-show");
    el.classList.add("is-hide");
    el.setAttribute("aria-hidden", "true");

    await sleep(220);
    el.classList.remove("is-hide");
    el.style.display = "none";

    await sleep(gapMs);
  };

  (async () => {
    // 3, 2, 1 のカウントダウン
    await showAndHide(c3);
    await showAndHide(c2);
    await showAndHide(c1, 360, 80);

    // ロード画面をフェードアウト開始
    loading.classList.add("fade-out");
    
    // 背景イラストとメインコンテンツをフェードイン開始
    if (introScreen) {
      introScreen.classList.remove("main-hidden");
      introScreen.classList.add("main-visible");
    }
    main.classList.remove("main-hidden");
    main.classList.add("main-visible");

    // ★修正：イラストが見え始めた「この瞬間」からキッチリ3秒(3000ms)カウントする
    setTimeout(() => {
      const introHint = document.getElementById("intro-scroll-hint");
      if (introHint) {
        introHint.classList.add("show");
      }
    }, 3000);

    // ロード画面が完全に消えるのを待つ（裏側の処理）
    await sleep(1000);
    loading.style.display = "none";
    body.classList.remove("no-scroll");

    // スクロール検知
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          profileBtn.classList.add("show");
          greeting.classList.add("show");
        }
      });
    }, { threshold: 0.12 });

    io.observe(observePoint);
  })();
});