/**
 * Created by Administrator on 2015/12/5.
 */
(function () {
    var $todoForm = $('#todoForm');
    var $todoInput = $('#todoInput');
    var $todoList = $('#todoList');
    var $todoCount = $('#todoCount');

    //统计项目
    function count() {
        var len = $todoList.children().length;
        $todoCount.html(len > 0 ? '现有' + len + '项todo list' : '');
    }

    $todoForm.submit(function (e) {
        e.preventDefault();
        var input_value = $todoInput.val();
        $todoList.append('<li>' + input_value + '&nbsp;<a href="#" class="todoDelete">x</a></li>');
        $todoInput.val('');
        count();
    });

    //绑定click事件
    $todoList.on('click', '.todoDelete', function (e) {
        $(this).parent().remove();
        count();
    });
})();