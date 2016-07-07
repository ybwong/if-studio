(function() {

  'use strict';

  angular
    .module('devPortal')
    .controller('ApplicationCtrl', ApplicationCtrl);

  /* @ngInject */
  function ApplicationCtrl($state, ProjectsService) {
    var vm = this;
    vm.model = {
      appList: []
    };

    vm.launchApplicationModal = launchApplicationModal;
    vm.removeApp = removeApp;

    //////////

    function launchApplicationModal(appIndex) {
      $state.go("Landing.Projects.Manage.EditApplication", {
        'appIndex': appIndex
      });
    }

    function removeApp(appIndex) {
      ProjectsService.deleteApplication(appIndex);
    }

    function init() {
      vm.model = ProjectsService.getModel();
    }

    init();
  }

})();