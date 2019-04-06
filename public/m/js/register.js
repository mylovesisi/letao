/* 
    注册的逻辑处理
    思路:
        1.给注册按钮点击事件
        2.判断手机号是否合法,用户名是否存在,密码是否一致,验证码是否正确
        3.点击注册时上面不能有一项为空,
        4:点击验证码发送请求获取验证码
        5.点击注册并提示是否成功,成功即跳转到登录页面
*/

//获取验证码
$(function () {
    var letao = new Letao();
    // letao.vCode();
    letao.register()
})
var Letao = function () {

}
Letao.prototype = {
    register: function () {
        var vCodes;
        /* 获取验证码 */
        $('#get-Vcode').on('tap', function () {
            $.ajax({
                url: '/user/vCode',
                type: 'get',
                success: function (data) {
                    // console.log(data.vCode);
                    $('.input-vcode').val(data.vCode)
                    vCodes = data.vCode;
                    console.log(vCodes);
                }
            })
        })
        /* 获取用户名 */

        $('#btn').on('tap', function (e) {
            console.log(vCodes);
            //阻止默认跳转
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            e.preventDefault()
            if ($('#mobile').val() == "") {
                alert('手机号码不能为空');
                return;
            }
            /* 判断手机号码格式 */
            if (!myreg.test($('#mobile').val())) {
                alert('手机号码格式不正确')
                return;
            }
            if ($('#username').val() == "") {
                alert('用户名不能为空');
                return;
            }
            /* 用户名不能重复,跟数据库可以对比 */

            if ($('#password').val() == "") {
                alert('密码不能为空');
                return;
            }
            if ($('#confirm').val() == "") {
                alert('请确认密码');
                return;
            }
            if ($('#password').val() != $('#confirm').val()) {
                alert('密码不一致');
                return;
            }
            if ($('.input-vcode').val() == "") {
                alert('请输入验证码');
                return;
            }
            if ($('.input-vcode').val() != vCodes) {
                alert('验证码不正确');
                return;
            }
            $.ajax({
                url: '/user/register',
                type: 'post',
                dataType: 'json',
                data: {
                    username: $('#username').val(),
                    password: $('#password').val(),
                    mobile: $('#mobile').val(),
                    vCode: $('.input-vcode').val()
                },
                success: function (data) {
                    console.log(data);
                    if (data.success == true) {
                        alert('注册成功');
                        location = 'login.html';
                    } else if(data.error==403){
                        alert('手机号已注册过!!!')
                    }else if(data.error==401){
                        alert('验证码错误!!!')
                    }
                }
            })

        })
    }
}