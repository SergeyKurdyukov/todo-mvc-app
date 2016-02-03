(function() {
  'use strict';

  angular
    .module('mvcTodoAngularApp')
    .controller('MainController', ['$resource', MainController]);

  function MainController ($resource) {

    var vm = this;
    vm.todos = []; // The array of objects {description: 'input field value', done: true, _id: 0}
    var externalUrl = 'http://192.168.52.202:3000/todos';
    var TodoAPI = $resource(externalUrl + '/:id', {}, {
      save: {
        method: 'POST',
        headers: {
          "Content-Type": "application/json" // Set Content-Type explicitly to prevent troubles with the server
        }
      },
      update: {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json" // Set Content-Type explicitly to prevent troubles with the server
        }
      }
    });

    var id = 0;
    vm.onEnterPress = function (ev) {
      id += 1;
      // Add a new list item by Enter key
      if (ev.charCode === 13) {
        var input = ev.currentTarget;
        createTodo(input.value);
        input.value = '';
      }
    }

    vm.onDeletePress = function (id) {
      deleteTodo(id, true);
    }

    vm.deleteCompleted = function () {
      var completedTodos = vm.todos.filter(function (todo) {
        return todo.done;
      });

      angular.forEach(completedTodos, function (todo, key) {
        deleteTodo(todo._id, completedTodos.length - 1 === key);
      });
    }

    vm.changeAllTodoStates = function (ev) {
      var checked = ev.currentTarget.checked;
      angular.forEach(vm.todos, function (todo) {
        todo.done = checked;
      });
    }

    vm.editTodo = function (todo) {
      updateTodo(todo);
    }


    // API functions
    function updateTodo (todo) {
      TodoAPI.update({id: todo._id}, todo, function () {
          refreshTodoList();
        }, function (errObj) {
          alert('Cannot edit the todo item. Reason: ' + (errObj.statusText || 'unknown'));
        }
      );
    }

    function deleteTodo (id, needUpdate) {
      TodoAPI.delete({id: id}, function () {
          if (needUpdate) {
            refreshTodoList();
          }
        }, function (errObj) {
          alert('Cannot delete the todo item. Reason: ' + (errObj.statusText || 'unknown'));
        }
      );
    }

    function createTodo (description) {
      TodoAPI.save({}, {description: description, done: false}, function () {
          refreshTodoList();
        },
        function (errObj) {
          alert('Cannot add a new todo item. Reason: ' + (errObj.statusText || 'unknown'));
        }
      );
    }

    function refreshTodoList () {
      // Get todo list from the server
      TodoAPI.query({}, function (todos) {
          vm.todos = todos;
        },
        function (errObj) {
          alert('Cannot get the todo list. Reason: ' + (errObj.statusText || 'unknown'));
        }
      );
    }
    refreshTodoList();
  }
})();
