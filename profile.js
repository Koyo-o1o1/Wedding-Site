// ▼▼▼ 既存のIntersectionObserverのコード ▼▼▼

// 対象となる要素を全て取得
const zones = document.querySelectorAll('.scroll-zone');
const contents = document.querySelectorAll('.content-section');

// 監視センサーのオプション設定
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4
};

// 監視センサーを作成
const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        const contentId = entry.target.id.replace('-zone', '-content');
        const content = document.getElementById(contentId);
        if(!content) return;

        if (entry.isIntersecting) {
            content.classList.add('is-visible');
        } else {
            content.classList.remove('is-visible');
        }
    });
}, options);

// 全てのゾーンの監視を開始
zones.forEach(zone => {
    observer.observe(zone);
});


// ▼▼▼ 「さいごに」メッセージ用のコード（修正版） ▼▼▼

// 要素を取得
const showMessageBtn = document.getElementById('show-final-message-btn');
const overlay = document.getElementById('final-message-overlay');
const messageScroller = document.querySelector('#final-message-overlay .message-scroller');
const scrollingMessage = messageScroller.querySelector('p');

// ボタンがクリックされた時の処理
showMessageBtn.addEventListener('click', function(event) {
    event.preventDefault();
    // ★★★ 変更点 ★★★
    // 表示する前に、メッセージの表示状態をリセットする
    messageScroller.style.visibility = 'visible';
    overlay.classList.add('is-active');
});

// オーバーレイ自体がクリックされた時に閉じる処理
overlay.addEventListener('click', function(event) {
    if (event.target === overlay) {
        overlay.classList.remove('is-active');
    }
});

// アニメーションが終了した時の処理
scrollingMessage.addEventListener('animationend', function() {
    // ★★★ 変更点 ★★★
    // まずメッセージを強制的に非表示にする
    messageScroller.style.visibility = 'hidden';
    // その後で、オーバーレイをフェードアウトさせる
    overlay.classList.remove('is-active');
});



// Photoボタン用のIntersectionObserver

// 要素を取得
const photoBtnZone = document.getElementById('photo-btn-zone');
const fixedPhotoBtn = document.getElementById('fixed-photo-btn');

// Photoボタン用の監視センサーを作成
const photoBtnObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // ゾーンが画面内に入った -> 表示クラスを追加
            fixedPhotoBtn.classList.add('is-visible');
        } else {
            // ゾーンが画面外に出た -> 表示クラスを削除
            fixedPhotoBtn.classList.remove('is-visible');
        }
    });
}, { threshold: 0.1 }); // ゾーンが10%見えたら反応

// Photoボタンゾーンの監視を開始
photoBtnObserver.observe(photoBtnZone);