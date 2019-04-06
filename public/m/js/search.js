/* 
    思路:
        搜索功能.点击搜索发请求查询数据库中你要的内容并跳转到商品详情页面;
        1.搜素页面
        2.商品详细页面
*/

/* 
    搜索页面的搜索历史查询显示等功能
        1.给搜素按钮注册事件.获取输入框内的值,存入一个数组中并添加到本地中.
        2.将搜索记录内容展示在下面的列表中并排序,且添加区域滑动事件;
        3.利用模板引擎给添加的搜素内容的右侧的删除键添加点击事件,并实现删除功能并且删除对应的本地记录
        4.点击清空记录能够实现删除所有的历史记录,并且删除本地记录
*/

//由于所有的功能都是在这一个页面中.且调用的功能函数可能有相互使用的关联;创建构造函数.将方法写在原型中

$(function () {
    var leTao = new LeTao()
    leTao.searchHistory();
    leTao.addHistory();
})

var LeTao = function () {}

LeTao.prototype = {
    //1
    searchHistory: function () {
        var arr = [];
        $('#btn').on('tap', function () {

            if ($('#search').val().trim() == '') {
                return
            }
            //将搜索的记录按顺序添加到数组中
            arr.unshift($('#search').val().trim())
            //数组的去重
            function uniq(arr) {
                //声明一个新的空数组,用于保存新的没有重复项的数组
                var temp = [];
                for (var i = 0; i < arr.length; i++) {
                    if (!temp.includes(arr[i])) {
                        temp.push(arr[i]);
                    }
                }
                return temp;
            }
            //将去重过的数组重新赋值给arr;
            arr = uniq(arr)
            console.log(arr);
            //存入到本地中
            localStorage.setItem('arr', JSON.stringify(arr))
            //清空输入框下次内容
            $('#search').val('');
        })
        //发现问题.当页面刷新时 重新点击搜索的内容会覆盖之前储存在本地的内容
        //因为从新点击之后arr已经又重置为空数组了;所以解决办法.每次事件之后取去来然后再从新赋值给数组arr 那么他就不会是空了
        arr = JSON.parse(localStorage.getItem('arr'));
    },
    //2.
    addHistory:function(){

    }

}