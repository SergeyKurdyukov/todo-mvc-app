/**
 * Created by MegaCasper on 03.02.2016.
 */
(function () {
  'use strict';

  angular
    .module('mvcTodoAngularApp')
    .factory('todoAPI', ['$resource', function ($resource) {

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


      var todoObj = {

        // Get todo list from the server.
        getList: function () {
          return TodoAPI.query({},
            function (todos) {},
            function (errObj) { alert('Cannot get the todo list. Reason: ' + (errObj.statusText || 'unknown')); }
          );
        },

        // Add a new todo item.
        create: function (description) {
          return TodoAPI.save({},
            // The description just used for creation
            {description: description, done: false},
            function () {},
            function (errObj) { alert('Cannot add a new todo item. Reason: ' + (errObj.statusText || 'unknown')); }
          );
        },

        // Delete the todo by id.
        delete: function (id) {
          return TodoAPI.delete(
            {id: id},
            function () {},
            function (errObj) { alert('Cannot delete the todo item. Reason: ' + (errObj.statusText || 'unknown')); }
          );
        },

        // Update the existing todo
        update: function (todo) {
          return TodoAPI.update(
            {id: todo._id},
            todo,
            function () {},
            function (errObj) { alert('Cannot edit the todo item. Reason: ' + (errObj.statusText || 'unknown')); }
          );
        }


      }
      return todoObj;
    }]);
})();
