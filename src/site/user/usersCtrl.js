(function() {

  'use strict';

  angular
    .module('devPortal')
    .controller('UsersCtrl', UsersCtrl);

  /* @ngInject */
  function UsersCtrl($state, $stateParams, ProjectsService, ProjectUsersMgmService) {
    var vm = this;

    vm.launchModal = launchModal;
    vm.deleteUserRole = deleteUserRole;

    //////////

    function launchModal(userI, role) {
      $state.go("Landing.Projects.Manage.EditUser", {
        'userI': userI,
        'role': role
      });
    }

    function deleteUserRole(index) {
      ProjectsService.deleteUserRole(index);
    }

    function init() {
      vm.projectModel = ProjectsService.getModel();
    }

    init();
  }

})();
