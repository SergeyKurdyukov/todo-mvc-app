(function() {
  /**
   * Created by MegaCasper on 02.02.2016.
   */
  'use strict';

  angular
    .module('mvcTodoAngularApp')
    .directive('blurByEnter', blurByEnter);

  function blurByEnter() {
    return {
      link: function (scope, element, attrs) {

        element.on('keypress', function (ev) {
          if (ev.charCode === 13) { // Enter key
            ev.currentTarget.blur();
          }
        });

      }
    }
  }

})();
