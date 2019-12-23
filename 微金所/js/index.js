$(function () {
    $('[data-toggle="tooltip"]').tooltip();
   var items = $(".carousel-inner .item");
   $(window).on("resize", function () {
       var width = $(window).width();
       if (width >= 768) {
           $(items).each(function (index, value) {
               var item = $(this);
               var imgSrc = item.data("largeImage");
               item.html($('<a href="javascript:;" class="pcImg">').css("backgroundImage","url('"+imgSrc+"')"));
           });
       }
       else {
           $(items).each(function (index, value) {
               var item = $(this);
               var imgSrc = item.data("smallImage");
               item.html('<a href="javascript:;" class="mobileImg"><img src="'+imgSrc+'" alt="..."></a>');
           });
       }
   }).trigger("resize");

   // 轮播图
   var startX, endX;
   var carousel_inner = $(".carousel-inner")[0];
   var carousel = $(".carousel");
   carousel_inner.addEventListener("touchstart", function (e) {
       startX = e.targetTouches[0].clientX;
   });
    carousel_inner.addEventListener("touchend", function (e) {
        endX = e.targetTouches[0].clientX;
        if (endX-startX > 0) {
            carousel.carousel('prev');
        }
        else if(endX-startX < 0){
            /*下一张*/
            carousel.carousel('next');
        }
    });

   /* 产品块导航 */
   var ul = $(".product .nav-tabs");
   var lis = ul.find("li");
   var totalWith = 0;  // 总宽度
   lis.each(function (index, value) {
       totalWith = totalWith + $(value).innerWidth();
   });
   ul.width(totalWith);
   // 使用插件实现导航栏的滑动
   //  var myScroll = new IScroll('#scroll', {
   //      scrollX: true,
   //      scrollY: false
   //  });
});