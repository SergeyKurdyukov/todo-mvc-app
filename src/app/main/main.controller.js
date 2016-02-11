(function() {
  'use strict';

  angular
    .module('mvcTodoAngularApp')
    .controller('MainController', ['todoAPI', MainController]);

  function MainController (todoAPI) {

    var vm = this;
    vm.todos = []; // The array of objects {description: 'input field value', done: true, _id: 0}

    function setNewList (todos) {
      return vm.todos = todos;
    }

    vm.onEnterPress = function (ev) {
      if (ev.charCode === 13) { // Enter key
        var input = ev.currentTarget;

        todoAPI.create(input.value).then(function () {
          return todoAPI.getList(setNewList);
        });

        input.value = '';
      }
    }

    vm.onDeletePress = function (todo) {

      todoAPI.delete(todo).then(function () {
        return todoAPI.getList(setNewList);
      })
      .catch(console.log.bind(console));
    }

    vm.deleteCompleted = function () {

      var completedTodoPromises = vm.todos.map(function (todo) {
        return todo.done ? todoAPI.delete(todo) : null;
      });

      Promise.all(completedTodoPromises).then(function () {
        return todoAPI.getList(setNewList);
      })
      .catch(console.log.bind(console));
    }

    vm.changeAllTodoStates = function (ev) {

      var checked = ev.currentTarget.checked;
      angular.forEach(vm.todos, function (todo) {
        todo.done = checked;
      });
    }

    vm.editTodo = function (todo) {

      todoAPI.update(todo).then(function () {
        return todoAPI.getList(setNewList);
      })
      .catch(console.log.bind(console));
    }

    // Get the full todo list at the first time
    todoAPI.getList(setNewList);
  }
})();
