window.addEventListener("load", () => {
  const body = document.body;
  const loading = document.getElementById("loading-screen");
  const main = document.getElementById("main-content");

  const c3 = document.getElementById("count-3");
  const c2 = document.getElementById("count-2");
  const c1 = document.getElementById("count-1");

  const observePoint = document.getElementById("observe-point");
  const profileBtn = document.getElementById("profile-btn");
  const greeting = document.getElementById("greeting");

  // 指定時間待機する関数
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // カウントダウンの数字を表示→非表示にする関数
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
    // 3, 2, 1 を順番に表示
    await showAndHide(c3);
    await showAndHide(c2);
    await showAndHide(c1, 360, 80);

    // ロード画面をフェードアウトし、メインコンテンツを表示
    loading.classList.add("fade-out");
    main.classList.remove("main-hidden");
    main.classList.add("main-visible");

    await sleep(1000);
    loading.style.display = "none";
    body.classList.remove("no-scroll");

    // スクロール検知の設定
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // 指定ポイントを通過したら、ごあいさつとボタンを表示
        if (entry.isIntersecting) {
          profileBtn.classList.add("show");
          greeting.classList.add("show");
        }
      });
    }, { threshold: 0.12 });

    io.observe(observePoint);
  })();
});