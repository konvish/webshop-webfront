/**
 * Created by Administrator on 2015/12/5.
 */
var vm = avalon.define({
    $id: 'todos',
    txt: '',
    todoList: [],
    add: function (e) {
        e.preventDefault();
        !!vm.txt.trim() && vm.todoList.push(vm.txt);
        vm.txt = '';
    }
});