// ページが読み込まれた時の処理
window.onload = function() {
    const body = document.body;
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    // カウントダウンする数字の要素を取得
    const count3 = document.querySelector('#countdown .size-s');
    const count2 = document.querySelector('#countdown .size-m');
    const count1 = document.querySelector('#countdown .size-l');

    // 0秒後: 「3」を表示
    setTimeout(function() {
        count3.classList.add('animate');
    }, 0);

    // 0.8秒後: 「2」を表示
    setTimeout(function() {
        count2.classList.add('animate');
    }, 800); // 800ミリ秒 = 0.8秒

    // 1.6秒後: 「1」を表示
    setTimeout(function() {
        count1.classList.add('animate');
    }, 1600); // 1600ミリ秒 = 1.6秒

    // 2.5秒後: ローディング画面を消してメインコンテンツを表示
    setTimeout(function() {
        loadingScreen.classList.add('hidden');
        body.classList.add('loaded');
        mainContent.classList.add('loaded');
        body.classList.remove('no-scroll');
    }, 2500); // 2500ミリ秒 = 2.5秒
};

/* ★★★ ここからがスクロール監視のコード ★★★ */

// 監視対象となる要素
const greetingSection = document.getElementById('greeting');
const profileBtn = document.getElementById('fixed-profile-btn');
// 監視の目印となるゾーン
const greetingZone = document.getElementById('greeting-zone');

// 監視センサーのオプション設定
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // ★★★ ここを 0 から 0.1 に変更 ★★★
};

// 監視センサーを作成
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // ゾーンが画面内に10%以上入った -> 表示クラスを追加
            greetingSection.classList.add('is-visible');
            profileBtn.classList.add('is-visible');
        } else {
            // ゾーンが画面内から10%未満になった -> 表示クラスを削除
            greetingSection.classList.remove('is-visible');
            profileBtn.classList.remove('is-visible');
        }
    });
}, options);

// ゾーンの監視を開始
observer.observe(greetingZone);