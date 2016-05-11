/**
 * Created by Administrator on 2016/5/10.
 */
$(document).ready(function () {
    //把购物车数量放入组件
    //cookie存入商品 ID 名 价格
    menu();
    initShowGouWuCheNum();
    getLoginState();
    upNumBtn();
    downNumBtn();
    liJiGouMaiBtn()
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
//初始获取cookie内数量 并显示
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

function upNumBtn() {
    var aUpnum = $('.list_good_upnum');
    aUpnum.each(function () {
        $(this).click(function () {
            var iVal = $(this).siblings('input').val();
            $(this).siblings('input').val(++iVal);
        })
    })
}
function downNumBtn() {
    var aDownnum = $('.list_good_downnum');
    aDownnum.each(function () {
        $(this).click(function () {
            var iVal = $(this).siblings('input').val();
            if (iVal == 0) {
                $(this).siblings('input').val(0);
            } else {
                $(this).siblings('input').val(--iVal);
            }
        })
    })
}

function liJiGouMaiBtn() {
    $('.list_good_addcart').click(function () {
        var goodId = $(this).siblings('.goodsid').val();
        var goodName = $.trim($(this).parent().siblings('.list_good_des').find('a').text());
        var goodPrice = parseInt($(this).parent().siblings('.list_good_price').find('.list_good_price_new span').text());
        var img = $(this).parent().siblings('.list_good_img').find('img').prop('src');
        var num = parseInt($(this).siblings('.list_good_sumbox').children('input').val());
        console.log(num);
        //判断购物车是否有商品
        var carts = $.cookie('carts') ? $.cookie('carts') : "{}";
        var goods = JSON.parse(carts);
        if (goodId in goods) {
            goods[goodId].num += num;
        } else {
            goods[goodId] = {
                id: goodId,
                name: goodName,
                price: goodPrice,
                img: img,
                num: num
            }
        }
        $.cookie("carts", JSON.stringify(goods), {expires: 7, path: '/'});
        //刷新购物车总数量
        var oldNum = parseInt($('.gouwunum span').text());
        $('.gouwunum span').text(oldNum+num);
    });
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




