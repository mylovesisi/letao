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
    leTao.getHistoryData();
    leTao.scrollArea();
    leTao.deleteSingle();
    leTao.deleteAll();
})

var LeTao = function () {}

LeTao.prototype = {
    //1
    searchHistory: function () {
        var that = this;
        
        $('#btn').on('tap', function () {
            var search=$('#search').val().trim();
            if ($('#search').val().trim() == '') {
                return
            }
            //声明一个空数组存入本地中;判断是非为空
            var arr = JSON.parse(localStorage.getItem('arr')) || [];
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

            ///数据储存,存入到本地中
            localStorage.setItem('arr', JSON.stringify(arr))
            //清空输入框下次内容
            $('#search').val('');
            that.arrs = arr;
            that.getHistoryData(arr)
            that.addHistory();
            location='productList.html?search='+search+"&time="+new Date();
        })
        //发现问题.当页面刷新时 重新点击搜索的内容会覆盖之前储存在本地的内容
        //因为从新点击之后arr已经又重置为空数组了;所以解决办法.每次事件之后取去来然后再从新赋值给数组arr 那么他就不会是空了
        

    },
    //2.
    addHistory: function () {
        var that = this;
        that.getHistoryData();
        // console.log(that.historyData);
        var html = template('search-images',  { 'rows': that.historyData })
        $('#ul1').html(html);
      
    },

    //获取本地数据
    getHistoryData: function () {
        var that = this;
       that.historyData = JSON.parse(localStorage.getItem('arr'));
    },
    //区域滑动
    scrollArea:function(){
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    //3.单个删除
    deleteSingle:function(){
        var that=this;
        $('#ul1').on('tap','#delete',function(){
            // console.log($(this).data('id'));
            that.getHistoryData();
            console.log(that.historyData);
            (that.historyData).splice($(this).data('id'),1);
            //把每次删除过的数组存入本地中,覆盖原来的arr
            localStorage.setItem('arr', JSON.stringify(that.historyData))
            console.log(that.historyData);
            //重新渲染页面
            that.addHistory()
        })
    },
    //4.清空所有
    deleteAll:function(){
        /* 
            删除有全部删除和指定删除,这里使用指定删除
        */
       var that=this;
       $('#deleteAll').on('tap',function(){
            
            localStorage.removeItem('arr')
            that.addHistory()
       })
    }
}