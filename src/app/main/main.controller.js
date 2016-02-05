(function() {
  'use strict';

  angular
    .module('mvcTodoAngularApp')
    .controller('MainController', ['todoAPI', MainController]);

  function MainController (todoAPI) {

    var vm = this;
    vm.todos = []; // The array of objects {description: 'input field value', done: true, _id: 0}

    vm.onEnterPress = function (ev) {
      if (ev.charCode === 13) { // Enter key
        var input = ev.currentTarget;

        var newTodoResource = todoAPI.create(input.value);
        newTodoResource.$promise.then(function () {
          vm.todos = todoAPI.getList();
        });

        input.value = '';
      }
    }

    vm.onDeletePress = function (id) {
      var deleteTodoResource = todoAPI.delete(id);
      deleteTodoResource.$promise.then(function () {
        vm.todos = todoAPI.getList();
      });
    }

    vm.deleteCompleted = function () {

      var completedTodoPromises = vm.todos.filter(function (todo) {
        return todo.done ? todoAPI.delete(todo._id).$promise : null;
      });
      Promise.all(completedTodoPromises).then(function () {
        vm.todos = todoAPI.getList();
      });
    }

    vm.changeAllTodoStates = function (ev) {
      var checked = ev.currentTarget.checked;
      angular.forEach(vm.todos, function (todo) {
        todo.done = checked;
      });
    }

    vm.editTodo = function (todo) {
      var updateTodoResource = todoAPI.update(todo);
      updateTodoResource.$promise.then(function () {
        vm.todos = todoAPI.getList();
      });
    }

    vm.todos = todoAPI.getList();
  }
})();
