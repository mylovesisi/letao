$(function () {
    var letao = new Letao();
    letao.categoriesLeft();
    letao.categoriesRight();
    letao.queryTtopCategory();
    letao.querySecondCategory(1);
    letao.categoriesLeftClcik();
})
/* 
    学会封装函数 以及原型的使用 公用类的方法写在原型中

*/
var Letao = function () {

}

Letao.prototype = {
    categoriesLeft: function () {
        mui('#categories-left .mui-scroll-wrapper').scroll({
            indicators: false,
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    categoriesRight: function () {
        mui('#categories-right .mui-scroll-wrapper').scroll({
            indicators: true,
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    queryTtopCategory: function () {
        $.ajax({
            /* /相当于前面的端口3000和协议头 */
            url: '/category/queryTopCategory',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                // console.log(data.rows);
                /* 因为之前不是一个对象 所以需要包起来 以前是数组 现在是对象 所以直接传入对象就能够直接遍历 */
                /* 模板引擎里面遍历的是一个对象里面的数组,是一个值不是固定的 所以之前要包起来 */
                // var html=template('query-top-category',{ list:data.rows })
                var html = template('query-top-category', data)
                $('#left').html(html)
            }
        })
    },
    /* 左侧点击事件 */

    categoriesLeftClcik: function () {
        console.log(this); //等于Leta这个构造函数 把this存入到that中 利用that.querySecondCategory()传入参数id来获取二级分类的数据渲染到页面中
        var that = this;
        /* 获取点击的元素 注意的是动态生成的元素不能直接获得点击事件 利用事件委托的方法 */
        $('#categories-left').on('tap', 'a', function () {

            $(this).parent().addClass('active').siblings().removeClass('active');
            var id = $(this).data('id');
            console.log(id);
            that.querySecondCategory(id)
        })
    },
    /* 
      二级分类需要点击之后渲染相对的内容,那么需要得到左边的一级分类相对应的点击事件,并且传入对应的id
      没有点击的时候默认是第一页
    */
    querySecondCategory: function (id) {
        $.ajax({
            url: '/category/querySecondCategory',
            dataType: 'json',
            data: {
                id: id
            },
            /* 下一步 在页面刷新的时候就请求接口渲染页面中的数据调用的时候默认为1 */
            type: 'get',
            success: function (data) {
                console.log(data);
                var html = template('query-second-category', data)
                $('#right').html(html)
            }

        })
    }
}