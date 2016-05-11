/**
 * Created by Administrator on 2016/5/10.
 */
$(document).ready(function () {
    showGoods();
    //设置所有增加、减少键
    upNumBtn();
    downNumBtn();
    //删除
    deleteGoods();
    getLoginState();
})
function upNumBtn() {
    var aUpnum = $('.cart_d_upbtn');
    aUpnum.each(function () {
        $(this).click(function () {
            var iVal = $(this).siblings('input').val();
            $(this).siblings('input').val(++iVal);
            //拿到当前id
            //console.log($(this).parentsUntil('.cart_d_fgd').find('.goodsid').val());
            var id = $(this).parentsUntil('.cart_d_fgd').find('.goodsid').val();
            var carts = $.cookie('carts');
            //console.log(carts)
            var goods = JSON.parse(carts);
            //console.log(goods);
            goods[id].num += 1;
            //console.log(goods[id].num);
            $.cookie("carts", JSON.stringify(goods), {expires: 7, path: '/'});
        })
    })
}
function downNumBtn() {
    var aDownnum = $('.cart_d_downbtn');
    aDownnum.each(function () {
        $(this).click(function () {
            var id = $(this).parentsUntil('.cart_d_fgd').find('.goodsid').val();
            var carts = $.cookie('carts');
            //console.log(carts)
            var goods = JSON.parse(carts);
            //console.log(goods);
            var iVal = $(this).siblings('input').val();
            if (iVal <= 1) {
                $(this).siblings('input').val(0);
                //减到0则删除当前id对象
                delete goods[id];
                $.cookie("carts", JSON.stringify(goods), {expires: 7, path: '/'});
                $(this).parentsUntil('li').empty();
            } else {
                $(this).siblings('input').val(--iVal);
                goods[id].num -= 1;
                $.cookie("carts", JSON.stringify(goods), {expires: 7, path: '/'});
            }
        })
    })
}
function getLoginState() {
    var user = $.cookie('user');
    if (user) {
        var aInfo = user.split("&");
        $('.login_box').html('Hi![<a id="my" href="javascript:;">' + aInfo[0] + '</a>]&nbsp;欢迎来到速普商城！&nbsp;[<a id="loginout" href="javascript:;">退出</a>]')
        loginout();
    }
}
function loginout() {
    $('#loginout').click(function () {
        //$.cookie("user", null, {expires: -1, path: '/'});
        //$.cookie("carts", null, {expires: -1, path: '/'});
        $('.login_box').html('欢迎来到速普商城！ 请 [<a href="login.html" target="_blank"> 登录 </a>] [<a href="register.html"' +
            'target="_blank"> 免费注册 </a>]');
    })
}
function showGoods() {
    var carts = $.cookie('carts') ? $.cookie('carts') : "{}";
    //console.log(carts)
    var goods = JSON.parse(carts);
    //console.log(goods)
    var nSum = 0;
    var cSum = 0;
    for (var i in goods) {
        //console.log(goods[i].num);
        var str = '<li><span class=".cart_d_fgd">' +
            '<span class="cart_iblock"><a href="javascript:;"><img src="' + goods[i].img + '" width="72" height="72"></a></span>' +
            '<span class="cart_iblock">' +
            '<span class="cart_d_gddes ellipsis">' +
            '<input type="hidden" class="goodsid" value="' + goods[i].id + '">' +
            '<a href="javascript:;" target="_blank">' +
            goods[i].name +
            '</a>' +
            '</span></span>' +
            '<span class="cart_d_item"></span>' +
            '<span class="cart_d_item">' +
            '<div style="margin: 0 auto;width: 70px;">' +
            '<a href="javascript:;" class="cart_d_downbtn fl" stock_num="138"></a>' +
            '<input type="text" value="' + goods[i].num + '" stock_num="3" class="cart_d_sum ellipsis fl txt_cart_goods_count" goods_id="14084" cart_id="0104021034">' +
            '<a href="javascript:;" class="cart_d_upbtn fl" stock_num="3"></a>' +
            '</div>' +
            '</span>' +
            '<span class="cart_d_item" style="font-weight: bold;"> ￥' + goods[i].price + '</span>' +
            '<span class="cart_d_item"> <a href="javascript:;" class="RemoveGoods">删除</a>' +
            '</span>' +
            '</span></li>';
        nSum += goods[i].num;
        cSum += goods[i].price * goods[i].num;
        $(str).appendTo($('.cart_d_goodul'));
    }
    //显示总数 总金额
    $('#DIVCartTotalAmount').text(nSum);
    $('#DIVCartSumAmount').text('￥' + cSum);
}
function deleteGoods() {
    $('.RemoveGoods').click(function () {
        //从cookie的对象中清除
        var id = $(this).parent().siblings().find('.goodsid').val();
        //console.log(id);
        var carts = $.cookie('carts');
        //console.log(carts)
        var goods = JSON.parse(carts);
        //console.log(goods);
        delete goods[id];
        //console.log(goods);
        $.cookie("carts", JSON.stringify(goods), {expires: 7, path: '/'});
        $(this).parentsUntil('li').empty();
    })
}