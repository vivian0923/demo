let img_box = document.querySelector('.img_box');
let imgs = document.querySelectorAll('img');
let sel_box = document.querySelector('.sel_box')
let lis = sel_box.querySelectorAll('li');
let left_btn = document.querySelector('.left_btn');
let right_btn = document.querySelector('.right_btn');
// 記錄第幾張圖片
let index = 0;
let timer = null; // 定時器

// 設定圖片容器大小
// imgContainerW：img_box本身寬度，為400
let imgContainerW = img_box.offsetWidth
img_box.style.width = imgContainerW * imgs.length + 'px'
// 設定容器位置
img_box.style.left = 0 + 'px';

// 設定第一個小圖片作為當前按鈕
lis[0].className = 'cur'

function swapImg() {
    // 修改img_box的定位，往左偏移 index * imgContainerW
    img_box.style.left = -index * imgContainerW + 'px';
    // 排他演演算法
    for (let i = 0; i < lis.length; i++) {
        lis[i].className = '';
    }
    // 修改小圖示的樣式
    lis[index].className = 'cur'
}

function swapFormat() {
    index++; // 進入下一張圖片
    // 如果是在最後一張圖片
    if (index >= 3) {
        // 此處是為了防止頻繁點選按鈕，index++，導致index超過4，變成5、6、7...
        // 當index>=4，我們強行讓其等於6,類似防抖
        index = 3;
        img_box.style.transition = 'all, linear, 1s';
        img_box.style.left = -index * imgContainerW + 'px';
        for (let i = 0; i < lis.length; i++) {
            lis[i].className = '';
        }
        // 修改小圖示的樣式
        lis[0].className = 'cur'

        // 此處就是我們為實現無縫輪播，做的手腳 
        // 通過延時定時器，當圖片過渡完，立刻馬上切換到第一張圖片
        setTimeout(function () {
            index = 0; // 第一張圖片
            img_box.style.transition = ''; // 無過度
            swapImg();
        }, 1500)

        // 如果是其它圖片，正常過渡切換
    } else {
        img_box.style.transition = 'all, linear, 1.5s';
        swapImg();
    }
}

// 新增定時器，呼叫函數
timer = setInterval(swapFormat, 3000)

// 點選右箭頭，圖片移動方式與自動播放一樣
right_btn.addEventListener('click', function () {
    swapFormat();
})


// 點選左箭頭
left_btn.addEventListener('click', function () {
    index--;
    // 如果要切換到第四章
    if (index < 0) {
        index = -1
        img_box.style.transition = 'all, linear, 1.5s';
        img_box.style.left = -index * imgContainerW + 'px';
        for (let i = 0; i < lis.length; i++) {
            lis[i].className = '';
        }
        // 修改小圖示的樣式
        lis[3].className = 'cur'

        // "出老千",迅速切換
        setTimeout(function () {
            index = 3
            img_box.style.transition = '';
            swapImg();
        }, 1000)

    } else {
        img_box.style.transition = 'all, linear, 1.5s';
        swapImg();
    }
})

// 當滑鼠在圖片上、左箭頭、右箭頭時清除定時器，即圖片不輪播
img_box.addEventListener('mouseover', function () {
    clearInterval(timer)
})

right_btn.addEventListener('mouseover', function () {
    clearInterval(timer)
})

left_btn.addEventListener('mouseover', function () {
    clearInterval(timer)
})

// 當滑鼠離開圖片、左箭頭、右箭頭時開啟定時器，即圖片繼續輪播
img_box.addEventListener('mouseout', function () {
    timer = setInterval(swapFormat, 3000)
})

left_btn.addEventListener('mouseout', function () {
    timer = setInterval(swapFormat, 3000)
})

right_btn.addEventListener('mouseout', function () {
    timer = setInterval(swapFormat, 3000)
})