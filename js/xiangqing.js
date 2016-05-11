/**
 * Created by Administrator on 2016/5/9.
 */
$(window).load(function () {
    menu();
    //购物车数量显示
    //放大镜部分
    fangdajing();
    //轮播图 小图部分
    lunbo();
    initShowGouWuCheNum();
    upNumBtn();
    downNumBtn();
    liJiGouMaiBtn();
})
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
    var aUpnum = $('.good_d_upbtn');
    aUpnum.each(function () {
        $(this).click(function () {
            var iVal = $(this).siblings('input').val();
            $(this).siblings('input').val(++iVal);
        })
    })
}
function downNumBtn() {
    var aDownnum = $('.good_d_downbtn');
    aDownnum.each(function () {
        $(this).click(function () {
            var iVal = $(this).siblings('input').val();
            if (iVal <= 1) {
                $(this).siblings('input').val(1);
            } else {
                $(this).siblings('input').val(--iVal);
            }
        })
    })
}

function liJiGouMaiBtn() {
    $('.good_d_addcart').click(function () {
        var goodId = $('#g_id').val();
        var goodName = $.trim($('.good_d_des').text().replace($('.goods_ac').text(),''));
        var goodPrice = parseInt($.trim($('.good_d_pricenew').text()).replace('￥',''));
        var img = $('.items ul li').eq(0).find('img').prop('src');
        var num = parseInt($('#good_d_sum').val());
        console.log(goodId)
        console.log(goodName)
        console.log(goodPrice)
        console.log(img)
        console.log(num)
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
                num: 1
            }
        }
        $.cookie("carts", JSON.stringify(goods), {expires: 7, path: '/'});
        //刷新购物车总数量
        var oldNum = parseInt($('.gouwunum span').text());
        $('.gouwunum span').text(oldNum+num);
    });
}
function lunbo(){
    $('.spec-scroll .items ul li img').mouseover(function(){
        var bimg = $(this).attr('bimg');
        $('.jqzoom img').prop('src',bimg);
    })
}
function fangdajing(){
    //计算大图与小图宽高比例
    var bigImg = $('.spec-preview').width()/$('.jqZoomPup').width();
    $('.spec-preview').hover(function(){
        console.log("move")
        $('.bigimg').prop("src",$('.jqzoom img').prop('src'));
        $(this).mousemove(function(evt){
            var e = evt||window.event;
            var disX = e.clientX - $('.spec-preview').offset().left-$('.jqZoomPup').width()/2;
            var disY = e.clientY - ($('.spec-preview').offset().top-$(window).scrollTop())-$('.jqZoomPup').height()/2;
            var leftTopX = disX;//左上角X位置
            var leftTopY = disY;//左上角Y位置
            var rightBottomX =disX+$('.jqZoomPup').width();//右下角X位置
            var rightBottomY = disY+$('.jqZoomPup').height();//右下角Y位置
            if(leftTopX<0){//鼠标碰撞壳子左边时，左边坐标为0
                disX=0;
            }
            if(leftTopY<0){//鼠标碰撞壳子左边时，Y坐标为0
                disY=0;
            }
            if(rightBottomX>$('.spec-preview').width()){
                disX=$('.spec-preview').width()-$('.jqZoomPup').width();
            }//碰撞到右边时，让其等于右下角减去阴影的面积；x方向
            if(rightBottomY>$('.spec-preview').height()){
                disY=$('.spec-preview').height()-$('.jqZoomPup').height();
            }
            $('.jqZoomPup').css({"left":disX,top:disY});
            //小框的位移距离乘以比例就是大图的位移距离
            $('.zoomdiv img').stop().animate({"left":-disX*bigImg,"top":-disY*bigImg},10);
        });
        $('.jqZoomPup').show();
        $('.zoomdiv').show();
    },function(){
        $('.jqZoomPup').hide();
        $('.zoomdiv').hide();
    })
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


/*$(".alls").hover(function () {

 $(".all_menu").show();
 $("#menu_list").show();
 $("#menu_list li").each(function () {

 $(this).hover(function () {
 $(".all_menu").show();
 $(".all_1").eq($(this).index()).show().css({"top": -$(this).index() * $(this).height()});
 }, function () {
 $(".all_menu").hide();
 $(".all_1").eq($(this).index()).hide();
 });

 });
 }, function () {
 $("#menu_list").hide();
 });*/





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