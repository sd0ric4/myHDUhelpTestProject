function addTodolist(e) {
    var obj_list = {
        todo: "",   //用于存储用户输入的数据
        done: false     //初始化用户输入的数据属性，以便对用户待办事项进行分类
    };
    document.getElementById("add_list").value = document.getElementById("add_list").value.trim();
    if (document.getElementById("add_list").value.length === 0){
        alert("不能为空");
        return;
    }
 
    obj_list.todo = document.getElementById("add_list").value;
    todolist.push(obj_list);
 
    saveData(todolist);
 
    document.getElementById("add_list").value = "";     //初始化输入框
    load();     //将用户输入的数据添加至dom节点
    document.getElementById("add_list").focus();
}