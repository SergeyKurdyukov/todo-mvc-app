(function() {
  'use strict';

  angular
    .module('mvcTodoAngularApp')
    .controller('MainController', MainController);

  function MainController () {

    var vm = this;
    vm.todos = []; // The array of objects {name: 'input field value', isCompleted: true, id: 0}

    var id = 0;
    vm.onEnterPress = function (ev) {
      id += 1;
      // Add a new list item by Enter key
      if (ev.charCode === 13) {
        var input = ev.currentTarget;
        vm.todos.push({name: input.value, isCompleted: false, id: id});
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
        if (todos[i].id === Number(id)) {
          return {item: todos[i], index: i};
        }
      }
      return {};
    }

    vm.deleteCompleted = function () {
      // Filters out completed items
      var uncompletedTodos = vm.todos.filter(function (todo) {
        return !todo.isCompleted;
      });
      vm.todos = uncompletedTodos;
    }

    vm.changeAllTodoStates = function (ev) {
      var checked = ev.currentTarget.checked;
      angular.forEach(vm.todos, function (todo) {
        todo.isCompleted = checked;
      });
    }

    vm.saveValue = function (ev) {
      if (ev.charCode === 13) { // Enter key
        ev.currentTarget.blur();
      }
    }
  }
})();
