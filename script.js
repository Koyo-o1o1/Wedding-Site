// ページが読み込まれた時に実行
window.onload = function() {
    const body = document.body;
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    // 2.5秒後（2500ミリ秒）に実行
    setTimeout(function() {
        // ローディング画面をフェードアウト
        loadingScreen.classList.add('hidden');
        
        // 背景画像を設定するクラスをbodyに付与
        body.classList.add('loaded');
        
        // メインコンテンツ（#heroや#greetingを含む）をフェードイン
        mainContent.classList.add('loaded');

        // スクロールを許可
        body.classList.remove('no-scroll');

    }, 2500); 
};

// 監視対象となる要素（ごあいさつ本体）
const greetingSection = document.getElementById('greeting');
// 監視の目印となるゾーン
const greetingZone = document.getElementById('greeting-zone');

// 監視センサーのオプション設定
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0 // ゾーンが1ピクセルでも画面に入ったら/出たら反応
};

// 監視センサーを作成
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        // isIntersectingプロパティで画面内に入ったか（true）出たか（false）を判断
        if (entry.isIntersecting) {
            // ゾーンが画面内に入った -> 表示クラスを追加
            greetingSection.classList.add('is-visible');
        } else {
            // ゾーンが画面外に出た -> 表示クラスを削除
            greetingSection.classList.remove('is-visible');
        }
    });
}, options);

// ゾーンの監視を開始
observer.observe(greetingZone);