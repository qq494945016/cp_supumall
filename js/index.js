/**
 * Created by Administrator on 2016/5/3.
 */
$(window).load(function () {
    //console.log($(window).width())
    guangGaoClose();
    topMenu();
    lunbo();
    //left_menu();
    headNavRightShow();
    zhengDianQiangGouJinDu();
    play2();
});
//function left_menu(){
//    $('.headnav_left_down ul li').each(function(i){
//        $(this).mouseover(function(){
//            $(this).siblings().children().removeClass().addClass('list_item');
//            $(this).children().removeClass().addClass('list_item_active');
//        });
//        $(this).mouseout(function(){
//            $(this).children().removeClass().addClass('list_item');
//        });
//    })
//}
//整点抢购进度条定时器
function zhengDianQiangGouJinDu(){
    //var oList = $('#zhengdian_list ul');
    var aLi = $('#zhengdian_list ul li');
    console.log(aLi.children().children().eq(0));
    var fengqiang = null;
    var jindu_point = null;
    var jindu_date = null;
    var jindu_runtime = null;
    setInterval(function(){
        var objLi = retObj(aLi);
        ctrlObj(objLi);
    },1000);

    //返回与时间对应的oLi
    function retObj(aLi){

        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        var oLi = null;
        //假的 begin
        if(second<8){
            oLi = aLi.eq(0);
        }
        if(second>=8&&second<16){
            oLi = aLi.eq(1);
        }
        if(second>=16&&second<24){
            oLi = aLi.eq(2);
        }
        if(second>=24&&second<32){
            oLi = aLi.eq(3);
        }
        if(second>=32&&second<40){
            oLi = aLi.eq(4);
        }
        if(second>=40&&second<48){
            oLi = aLi.eq(5);
        }
        if(second>=48&&second<56){
            oLi = aLi.eq(6);
        }
        if(second>=56){
            oLi = aLi.eq(7);
        }
        /*
        if(hour==8){
            oLi = aLi.eq(0);
        }
        if(hour==10){
            oLi = aLi.eq(1);
        }
        if(hour==12){
            oLi = aLi.eq(2);
        }
        if(hour==14){
            oLi = aLi.eq(3);
        }
        if(hour==16){
            oLi = aLi.eq(4);
        }
        if(hour==18){
            oLi = aLi.eq(5);
        }
        if(hour==20){
            oLi = aLi.eq(6);
        }
        if(hour==22){
            oLi = aLi.eq(7);
        }*/
        aLi.each(function(){
            $(this).children().children().eq(0).children().hide();
            //$(this).children().children().eq(1).hide();
            //$(this).children().children().eq(2).children().text(hour+':00');
            $(this).children().children().eq(3).children().hide();
        });
        return oLi;
    }
    function ctrlObj(oLi){
        //所有组件全部显示
        oLi.children().children().each(function(){
            $(this).eq(0).children().show();
            //$(this).eq(1).hide();
            $(this).eq(2).show();
            $(this).eq(3).show();
        });
        fengqiang = oLi.children().children().eq(0).children();
        jindu_point = oLi.children().children().eq(1).eq(1);
        jindu_date = oLi.children().children().eq(2).children();
        jindu_runtime = oLi.children().children().eq(3).children();
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        if(hour<10){
            hour = '0' + hour;
        }
        if(minute<10){
            minute = '0' + minute;
        }
        if(second<10){
            second = '0' + second;
        }
        jindu_runtime.text(hour+':'+minute+':'+second);
        runJinDu(oLi,fengqiang,jindu_point,jindu_date,jindu_runtime);
    }

    function runJinDu(obj,arg0,arg1,arg2,arg3){
        clearInterval(obj.timer)
        obj.timer = setInterval(function(){
            var date = new Date();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();
            if(hour<10){
                hour = '0' + hour;
            }
            if(minute<10){
                minute = '0' + minute;
            }
            if(second<10){
                second = '0' + second;
            }
            //console.log(typeof hour);
            //console.log(hour+':'+minute+':'+second);
            //arg2.text('距结束');
            arg3.text(hour+':'+minute+':'+second);
        },1000);
    }
}
function headNavRightShow(){
    $('.headnav_left_down ul li').each(function(){
        $(this).hover(function(){
            //console.log($(this).index());
            //console.log($(this).height());
            $(this).children().children().eq(3).show().css({"top":-$(this).index()*$(this).height()});

        },function(){
            $(this).children().children().eq(3).hide().css({"top":-$(this).index()*$(this).height()});
        });
    });
}
function lunbo() {
    $('#lunbo').hover(function () {
            $('#lunbo_leftbtn').show();
            $('#lunbo_rightbtn').show();
        },
        function () {
            $('#lunbo_leftbtn').hide();
            $('#lunbo_rightbtn').hide();
        })
    play();
}
function play() {
    var oWrap = $('#lunbo');
    var oList = $('#lunbo_list');
    var aList = $('#lunbo_list li');

    var aBtn = $('#lunbo_bottom_btn li');
    //var oContext = $('#context');
    //var aContext = $('#context li');
    var oPrev = $('#lunbo_leftbtn');
    var oNext = $('#lunbo_rightbtn');
    var timer = null;

    var iNow = 0;
    var len = aBtn.size();
    var iW = aList.width();

    //var cW = aContext.width();
    //console.log(cW);
    var aImg = $('#lunbo_list li a img');
    var mW = aImg.width();
    var viewWidth = document.documentElement.clientWidth||document.body.clientWidth;
    if (viewWidth < 1920) {
        for (var i = 0; i < len; i++) {
            //aImg[i].style.marginLeft = -((mW - viewWidth)/2+960) + "px";
            $(aImg[i]).css("marginLeft",-((mW - viewWidth)/2+960));
        }
    }
    oList.width(iW * len * 2);
    oList.html(oList.html() + oList.html());
    //oContext.width(cW * len * 2);
    //oContext.html(oContext.html() + oContext.html());
    //console.log(oContext.width() * 2);
    //console.log(oContext.html());
    oWrap.mouseover(function () {
        clearInterval(timer);
    })
    oWrap.mouseout(function () {
        autoPlay();
    })
    aBtn.click(function () {
        iNow = $(this).index();
        onChange();
    })

    oPrev.click(function () {
        iNow--;
        if (iNow == -1) {
            //oContext.css({"left": -cW * len})
            oList.css({"left": -iW * len})
            iNow = len - 1;
        }
        onChange();
    })

    oNext.click(function () {
        iNow++;
        //iNow = iNow % len;
        if (iNow == len * 2) {
            oList.css({"left": -iW * (len - 1)})
            //oContext.css({"left": -cW * (len - 1)})
            iNow = len;
        }
        onChange();
    })

    function onChange() {
        aBtn.removeClass('bottom_btn_active').eq(iNow % len).addClass('bottom_btn_active');
        //oContext.stop().animate({"left": -cW * iNow}, 400);
        oList.stop().animate({"left": -iW * iNow}, 400);
    }

    function autoPlay() {
        timer = setInterval(function () {
            iNow++;
            if (iNow == len * 2) {
                oList.css({"left": -iW * (len - 1)})
                //oContext.css({"left": -cW * (len - 1)})
                iNow = len;
            }
            onChange();
        }, 2000);
    }

    autoPlay();
}

function play2(){
    var oWrap = $('#home_box_lunbo_wrap');
    var oList = $('#home_box_lunbo_list');
    var aList = $('#home_box_lunbo_list li');
    var oPrev = $('#home_box_lunbo_prev');
    var oNext = $('#home_box_lunbo_next');
    var timer = null;

    var iNow = 0;
    //var len = aList.size();
    var len = 3;
    //var iW = aList.width();
    var iW = 200;
    oList.width(iW * len * 2);
    oList.html(oList.html() + oList.html());
    oWrap.mouseover(function () {
        clearInterval(timer);
    })
    oWrap.mouseout(function () {
        autoPlay();
    })

    oPrev.click(function () {
        iNow--;
        if (iNow == -1) {
            oList.css({"left": -iW * len})
            iNow = len - 1;
        }
        onChange();
    })

    oNext.click(function () {
        iNow++;
        if (iNow == len * 2) {
            oList.css({"left": -iW * (len - 1)})
            iNow = len;
        }
        onChange();
    })

    function onChange() {
        oList.stop().animate({"left": -iW * iNow}, 400);
    }

    function autoPlay() {
        timer = setInterval(function () {
            iNow++;
            if (iNow == len * 2) {
                oList.css({"left": -iW * (len - 1)})
                iNow = len;
            }
            onChange();
        }, 2000);
    }

    autoPlay();
}
function guangGaoClose() {
    $('.pop-close').click(function () {
        $(this).parent().height(0);
    })
}
function topMenu() {
    var arr = $('.top_nav_menu');
    $(arr[2]).hover(function () {
        $('.down_menu').show();
    }, function () {
        $('.down_menu').hide();
    });
    $(arr[3]).hover(function () {
        $('.erweima').show();
    }, function () {
        $('.erweima').hide();
    });
}