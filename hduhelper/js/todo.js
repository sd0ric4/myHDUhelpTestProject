$(function () {
    //1.按下回车把完整的数据存储到本地数据里面
    // 存储的数据格式  var todolist = [{title: "xxx", done: false}]
    load();
    $("#title").on("keydown", function (e) {
        if (e.keyCode == 13) {
            if ($(this).val() == "") {
                alert('请输入你要的操作')
            } else {
                //先读取本地存储原来的数据
                var local = getData();
                // console.log(local);
                //把local数组进行更新数据 把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false });
                //把local数据存储到本地
                saveData(local);
                //本地存储数据渲染加载到页面
                load();
                $(this).val("");
            }
        }
    });
    //删除操作
    $("ol,ul").on("click", "a", function () {
        // alert(11)
        //先获取本地数据
        var data = getData();
        console.log(data);
        //修改数据  点击a就知道删除的哪个数据 获取了当前的索引号
        var index = $(this).attr("id");
        console.log(index);
        data.splice(index, 1); //aplice(从索引号为哪个的开始删，删除的个数)
        //保存到本地存储
        saveData(data);
        //重新渲染页面
        load();
    });
    //正在进行和已经完成选项的操作
    $("ol,ul").on("click", "input", function () {
        // alert(00)
        //先读取本地存储的数据
        var data = getData();
        //修改数据
        var index = $(this).siblings("a").attr("id");
        console.log(index);
        data[index].done = $(this).prop("checked");
        console.log(data);
        //保存到本地存储
        saveData(data);
        //重新渲染页面
        load();
    });

    //读取本地的数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data != null) {
            return JSON.parse(data); //字符串要转化为数组输出
        } else {
            return [];
        }
    }

    //存储本地数据
    function saveData(data) {  //data是形参 不要写成local
        //别忘了要先把对象转化为字符串
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    //渲染加载数据 
    function load() {
        //读取本地数据
        var data = getData();
        console.log(data);
        //遍历之前要先清空ol里面元素的内容
        $("ol,ul").empty();
        var todoCount = 0; //正在进行的个数
        var doneCount = 0; //已经完成的个数
        //遍历这个数据
        $.each(data, function (i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>")
                doneCount++;
                
            } else {
                $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>")
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
});

