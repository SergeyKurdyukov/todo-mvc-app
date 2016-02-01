(function() {
  'use strict';

  angular
    .module('mvcTodoAngularApp')
    .controller('MainController', ['$resource', MainController]);

  function MainController ($resource) {

    var vm = this;
    vm.todos = []; // The array of objects {description: 'input field value', done: true, _id: 0}

    var id = 0;
    vm.onEnterPress = function (ev) {
      id += 1;
      // Add a new list item by Enter key
      if (ev.charCode === 13) {
        var input = ev.currentTarget;
        vm.todos.push({description: input.value, done: false, _id: id});
        input.value = '';
      }
    }

    vm.onDeletePress = function (ev) {
      var index = findById(ev).index;
      vm.todos.splice(index, 1);
    }

    var findById = function (ev) {
      var li = ev.currentTarget.parentElement.parentElement;
      var id = li.attributes['data-id'].value;
      var todos = vm.todos;
      // Find the list item
      for(var i = 0; i < todos.length; i++) {
        if (todos[i]._id === Number(id)) {
          return {item: todos[i], index: i};
        }
      }
      return {};
    }

    vm.deleteCompleted = function () {
      // Filters out completed items
      var uncompletedTodos = vm.todos.filter(function (todo) {
        return !todo.done;
      });
      vm.todos = uncompletedTodos;
    }

    vm.changeAllTodoStates = function (ev) {
      var checked = ev.currentTarget.checked;
      angular.forEach(vm.todos, function (todo) {
        todo.done = checked;
      });
    }

    vm.saveValue = function (ev) {
      if (ev.charCode === 13) { // Enter key
        ev.currentTarget.blur();
      }
    }

  }
})();
