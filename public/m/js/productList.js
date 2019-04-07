$(function(){
    var letao=new Letao();
    letao.getSearchData();
    letao.mySearch();
    letao.sorting()
})

var Letao=function(){}
    /* 
        1.获取URL中的参数即搜索的内容;
        2.发送请求得到商品的详细信息
    
    
    */
Letao.prototype={
    //页面开始就加载数据
    getSearchData:function(){
        let that=this;
        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURI(r[2]);
            }
            return null;
        }
        let search= getQueryString('search');
        that.queryProduct({
            search:search,
        });
    },
    //ajax请求
    queryProduct:function({search,page,pageSize,price,num}){
        $.ajax({
            url:'/product/queryProduct',
            data:{
                page:page || 1,
                pageSize:pageSize || 2,
                proName:search||'鞋',
                price:price|| '',
                num:num||'',
        },
        type:'get',
        success:function(res){
            console.log(res);
            var html=template('product',res)//返回的数据是对象中的对象
            $('.p1').html(html)
        }
        })
    },
    //本页面的搜索功能
    mySearch:function(){
        let that=this;
        $('#btn').on('tap',function(){
            that.queryProduct({
                search:$('#search').val(),
                pageSize:4,
            });
            $('#search').val("")
        });
    },
    //标题功能的实现
    sorting:function(){
        let that=this;
        /* 
            思路:要想实现排序功能需要拿到相应的数据,那么结合接口需求
            1.给相应元素添加点击事件
            2.方便区分及结合接口的要求价格和数量的排序1为升序2为降序,那么为元素添加自定义属性,
            3.获取元素的自定义属性及属性值,为满足数据接口的要求,当点击的时候切换相应的属性值,细节之一利用addClass和removeClass
                不能使用toggle,toggle属性是有的时候遍删除属性,无则添加.切换字体图标
                细节2.切换值时,需要在最后保存,否则还是会还原
            4.储存属性和属性值到需要发请求的data对象中 即发送接口的函数中的data
            5.调用接口
        */
        $('.title a').on('tap',function(){
            var type=$(this).data('type');
            var sort=$(this).data('sort');
            if(sort==1){
                sort=2
                $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up')
            }else{
                sort=1
                $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down')
            }
            $(this).data('sort',sort);
            console.log(sort);
            console.log(type);
            var obj={
            }
            obj[type]=sort;
            console.log(obj);
            that.queryProduct({
                price:obj.price,
                num:obj.num,
            })
        })
    }
    
}