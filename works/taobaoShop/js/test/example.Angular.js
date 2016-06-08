/**
 * Created by Administrator on 2015/12/5.
 */
angular.module('todoApp', []).controller('todos', ['$scope', function ($scope) {
    $scope.todoList = [];
    $scope.add = function () {
        $scope.todoList.push($scope.txt);
        $scope.txt = '';
    };
}]);