window.onload = function () {
    serachEffect();
    timeBack();
    bannerEffect();
};

// 头部js效果
function serachEffect() {
    var banner = document.querySelector(".js_banner");
    var bannerHeight = banner.offsetHeight;
    var serach = document.querySelector(".js_search");
    window.onscroll = function () {
        var offsetTop = document.documentElement.scrollTop;
        var opacity = 0;
        if(offsetTop < bannerHeight) {
            opacity = offsetTop/bannerHeight;
            serach.style.backgroundColor = "rgba(233,35,34,"+opacity+")";
        }
        else {
            serach.style.backgroundColor = "rgba(233,35,34,1)";
        }
    }
}

// 倒计时效果
function timeBack() {
    var spans = document.querySelector(".jd_time").querySelectorAll("span");
    var totalTime = 3700;
    var timeId = setInterval(function () {
        totalTime--;
        if (totalTime < 0) {
            clearInterval(timeId);
            return;
        }
        var hour = Math.floor(totalTime/3600);
        var minute = Math.floor(totalTime%3600/60);
        var second = Math.floor(totalTime%60);
        spans[0].innerHTML = Math.floor(hour/10);
        spans[1].innerHTML = Math.floor(hour%10);

        spans[3].innerHTML = Math.floor(minute/10);
        spans[4].innerHTML = Math.floor(minute%10);

        spans[6].innerHTML = Math.floor(second/10);
        spans[7].innerHTML = Math.floor(second%10);
    }, 1000);
}

// 轮播图
function bannerEffect() {
    var banner = document.querySelector(".js_banner");
    var imgBox = banner.querySelector("ul:first-of-type");
    var first = imgBox.querySelector("li:first-of-type");
    var last = imgBox.querySelector("li:last-of-type");
    imgBox.appendChild(first.cloneNode(true));
    imgBox.insertBefore(last.cloneNode(true), imgBox.firstChild);

    var lis = imgBox.querySelectorAll("li");
    var count = lis.length;
    var bannerWidth = banner.offsetWidth;
    imgBox.style.width = count*bannerWidth + "px";
    for(var i=0; i < lis.length; i++) {
        lis[i].style.width = bannerWidth + "px";
    }

    var index = 1;
    imgBox.style.left = -bannerWidth + "px";

    // 当屏幕发生变化时，重新计算宽度
    window.onresize = function () {
        bannerWidth = banner.offsetWidth;
        imgBox.style.width = count*bannerWidth + "px";
        for(var i=0; i < lis.length; i++) {
            lis[i].style.width = bannerWidth + "px";
        }
        imgBox.style.left = -index*bannerWidth + "px";
    };

    var timeId;
    // 实现轮播
    var startTime = function () {
        timeId = setInterval(function () {
            index++;
            imgBox.style.transition = "left 0.5s ease-in-out";
            imgBox.style.left = (-index*bannerWidth) + "px";
            setTimeout(function () {
                if(index === count-1) {
                    index=1;
                    imgBox.style.transition = "none";
                    imgBox.style.left = (-index*bannerWidth) + "px";
                }
            }, 500);
            setIndicator(index);
        }, 2000);
    };
    startTime();

    // 实现点标记
    var setIndicator = function (index) {
        var indicator = banner.querySelector("ul:last-of-type").querySelectorAll("li");
        for (var i=0; i< indicator.length; i++) {
            indicator[i].classList.remove("active");
        }
        if (index === 9) {
            indicator[0].classList.add("active");
        }else {
            indicator[index-1].classList.add("active");
        }
    };

}