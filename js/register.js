/**
 * Created by Administrator on 2016/5/9.
 */
$(window).load(function () {
    $('#btnRegister').click(function () {
            var username = $('#new_account').val();
            var password = $('#reg_password').val();
            if(!register(username, password)){
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

function register(arg0, arg1) {
    if (arg0) {
        return true;
    } else if (arg1) {
        return true;
    } else {
        return false;
    }
}
/*
 function register(){
 $("#RegisterForm").validate({
 rules: {
 new_account: "required",
 reg_password: {
 required: true,
 minlength: 5
 }
 },
 messages: {
 new_account: "请输入用户名",
 reg_password: "请输入密码"
 }
 });
 }*/
