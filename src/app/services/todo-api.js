/**
 * Created by MegaCasper on 03.02.2016.
 */
(function () {
  'use strict';

  angular
    .module('mvcTodoAngularApp')
    .factory('todoAPI', ['Restangular', function (Restangular) {

      var externalUrl = 'http://192.168.52.202:3000';
      Restangular.setBaseUrl(externalUrl);
      Restangular.setDefaultHeaders({'Content-Type': 'application/json'});
      Restangular.setRestangularFields({id: "_id"});
      var todoApi = Restangular.all('todos');

      var todoObj = {

        // Get todo list from the server.
        getList: function (successCbk) {
          successCbk = successCbk || function (todos) { return todos; };
          return todoApi.getList().then(
            successCbk,
            function (errObj) { alert('Cannot get the todo list. Reason: ' + (errObj.statusText || 'unknown')); }
          )
          .catch(console.log.bind(console));
        },

        // Add a new todo item.
        create: function (description) {

          return todoApi.post({description: description, done: false}).then(
            function (resp)   { return resp; },
            function (errObj) { alert('Cannot add a new todo item. Reason: ' + (errObj.statusText || 'unknown')); }
          )
          .catch(console.log.bind(console));
        },

        // Delete the specified todo.
        delete: function (todo) {

          return todo.remove().then(
            function (resp)   { return resp; },
            function (errObj) { alert('Cannot delete the todo item. Reason: ' + (errObj.statusText || 'unknown')); }
          )
          .catch(console.log.bind(console));
        },

        // Update the existing todo
        update: function (todo) {

          return todo.put().then(
            function (resp)   { return resp; },
            function (errObj) { alert('Cannot edit the todo item. Reason: ' + (errObj.statusText || 'unknown')); }
          )
          .catch(console.log.bind(console));
        }

      }
      return todoObj;
    }]);
})();
