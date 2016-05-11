/**
 * Created by Administrator on 2016/5/11.
 */
$(document).ready(function(){
    menu();
    getLoginState();
    initShowGouWuCheNum();

})
function getLoginState(){
    var user = $.cookie('user');
    if(user){
        var aInfo = user.split("&");
        $('.login_box').html('Hi![<a id="my" href="javascript:;">'+aInfo[0]+'</a>]&nbsp;欢迎来到速普商城！&nbsp;[<a id="loginout" href="javascript:;">退出</a>]')
        loginout();
    }
}
function loginout(){
    $('#loginout').click(function(){
        //$.cookie("user", null, {expires: -1, path: '/'});
        //$.cookie("carts", null, {expires: -1, path: '/'});
        $('.login_box').html('欢迎来到速普商城！ 请 [<a href="login.html" target="_blank"> 登录 </a>] [<a href="register.html"'+
            'target="_blank"> 免费注册 </a>]');
    })
}
function initShowGouWuCheNum(){
    $('.gouwunum span').text(getGouWuCheNum());
}
function getGouWuCheNum() {
    //从cookie获取
    var carts =  $.cookie('carts') ? $.cookie('carts'):"{}";
    var goods = JSON.parse(carts);
    var num = 0;
    for (var i in goods) {
        num += goods[i].num;
    }
    return num;
}
function menu() {
    var menu = $('#headnav_left_menu');
    var nav_down = $('#headnav_left_down');
    //console.log(menu)
    //console.log(nav_down)
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