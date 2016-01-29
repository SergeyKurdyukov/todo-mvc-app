(function() {
  'use strict';

  angular
    .module('mvcTodoAngularApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
