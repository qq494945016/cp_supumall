/**
 * Created by Administrator on 2016/5/9.
 */
$(window).load(function () {
    menu();
})
function menu() {
    var menu = $('#headnav_left_menu');
    var nav_down = $('#headnav_left_down');
    console.log(menu)
    console.log(nav_down)
    menu.hover(function(){
        nav_down.show();
    },function(){
        nav_down.hover(function () {
            $('.headnav_left_down ul li').each(function () {
                $(this).hover(function () {
                    //console.log($(this).index());
                    //console.log($(this).height());
                    $(this).children().children().eq(3).show().css({"top": -$(this).index() * $(this).height()});

                }, function () {
                    $(this).children().children().eq(3).hide();
                });
            });
        }, function () {
            nav_down.hide();
        })
    })
}


/* $(document).mousemove(function (e) {
 //$("span").text(e.pageX + ", " + e.pageY);
 console.log(e.pageX + ", " + e.pageY)
 console.log(nav_down.offset().left+"++++"+nav_down.offset().top)
 console.log(nav_down.width() + "----" + nav_down.height())
 if ((e.pageX >= nav_down.offset().left && e.pageX <= nav_down.offset().left + nav_down.width()) ||
 (e.pageY >= nav_down.offset().top && e.pageY <= nav_down.offset().top + nav_down.height())) {
 nav_down.hover(function () {
 $('.headnav_left_down ul li').each(function () {
 $(this).hover(function () {
 //console.log($(this).index());
 //console.log($(this).height());
 $(this).children().children().eq(3).show().css({"top": -$(this).index() * $(this).height()});

 }, function () {
 $(this).children().children().eq(3).hide();
 });
 });
 }, function () {
 nav_down.hide();
 })
 } else {
 nav_down.hide();
 }
 });*/