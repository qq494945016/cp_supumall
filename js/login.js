/**
 * Created by Administrator on 2016/5/11.
 */
$(window).load(function () {
    $('#btnRegister').click(function () {
            var username = $('#new_account').val();
            var password = $('#reg_password').val();
            var boo = login(username, password);
            if(!boo){
                $('#error_tips').show();
                return false;
            }else{
                $.cookie('user', username + '&' + password,
                    {
                        expires: 7,
                        path: '/'
                    }
                );//新建一个cookie包括有效期、路径、域名等
                window.location = "index.html";
            }
        }
    )
})

function login(arg0, arg1) {
    var user = $.cookie('user');
    if(!user){
        return false;
    }
    var aInfo = user.split("&");
    if(arg0!=aInfo[0]){
        return false;
    }else if(arg1!=aInfo[1]){
        return false;
    }
    else {
        return true;
    }
}