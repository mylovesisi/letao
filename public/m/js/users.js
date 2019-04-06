/* 
    展示个人中心的信息及查看购物车等信息
*/
$(function(){
    /* 展示个人中心信息 */
    /* 需要查询登录时的id 在登录页面记录中查询,登录时保存使用什么呢. localStorage?还是sessionStorage
        明显使用sessionStorage;
        获取sessionStorage.getItem('属性名')
    */
   
    //判断是否存在sessionStorage 不存在则不允许访问返回登录页面
    if(!sessionStorage.getItem('username')){
        location='login.html'
    }
    console.log(sessionStorage.getItem('username'));
    $.ajax({
        url:'/user/queryUserMessage',
        type:'get',
        // data:{id:id},
        success:function(data){
            console.log(data.mobile) ;
            console.log(data.username) ;
            $('.username span').html(data.username);
            $('.mobile span').html(data.mobile)
        }
    })
    $('#login-out').on('click',function(e){
        e.preventDefault();
        sessionStorage.removeItem('username')
        location='./login.html'

    })
})