(function() {
  /**
   * Created by MegaCasper on 26.01.2016.
   */
  'use strict';
// The directive needs to set focus on the field because of without that we'll not get onBlur event.
// i.e we'll have no ability to _hide_ the input field.
  angular
    .module('mvcTodoAngularApp')
    .directive('focusOn', ['$timeout', focusOn]);

  function focusOn($timeout) {
    return {
      link: function (scope, element, attrs) {

        // Keep track *ngShow* attribute change to set focus on the field
        scope.$watch(attrs.ngShow, function (newValue, oldValue) {
          if (newValue !== oldValue) {
            $timeout(function () {
              element[0].focus();
            }, 100);
          }
        });
      }
    }
  }

})();
