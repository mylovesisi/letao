/* 这个页面是用来验证登录信息;注册账户并跳转到真正的个人中心的 */
//注意点: 登录需要记住 使用   sessionStorage存储数据：只要关掉页面，数据就删了
/* 
    思路:
        1.获取登录的值,给登录按钮添加点击事件并判断是否正确
        2.在判断的过程中如果用户没有输入密码或账户需要提示并且驳回登录请求
        3.判断登录成功与否并告诉用户原因或跳转到登录页面
*/

$('#btn').on('click', function () {

    if ($('.mui-input-clear').val() == '') {
        alert('用户名不能为空')
        return
    };
    if ($('.mui-input-password').val() == '') {
        alert('密码不能为空')
        return
    };
    $.ajax({
        url:'/user/login',
        type:'post',
        data:{username:$('.mui-input-clear').val(),password:$('.mui-input-password').val()},
        success:function(data){
            if(data.success==true){
                alert('登录成功');
                location='users.html';
            }else{
                alert('账户或密码错误')
            }
            console.log(data.success);
        }
    }
    )
    // sessionStorage.setItem('username',$('.mui-input-clear').val());
    // sessionStorage.setItem('password',$('.mui-input-password').val());
})
/* 
        注册账户:
            给注册按钮添加注册事件,并且储存到数据库中
*/
    $('#register').on('click',function(){
        location='register.html';
    })