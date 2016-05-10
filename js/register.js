/**
 * Created by Administrator on 2016/5/9.
 */
$(window).load(function () {
    $('#btnRegister').click(function () {
            var username = $('#new_account').val();
            var password = $('#reg_password').val();
            //register();
            $.cookie('user', username + '&' + password,
                {
                    expires: 7,
                    path: '/'
                }
            );//新建一个cookie包括有效期、路径、域名等
        }
    )
})


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
}