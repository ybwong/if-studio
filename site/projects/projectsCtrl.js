(function() {

  'use strict';

  angular
    .module('devPortal')
    .controller('ProjectsCtrl', ProjectsCtrl);

  /* @ngInject */
  function ProjectsCtrl($state, $log, ProjectsService) {
    var vm = this;

    vm.myProjects = {};
    vm.formClass = '';

    vm.removeProject = removeProject;
    vm.loadAllProjects = loadAllProjects;
    vm.launchModal = launchModal;
    vm.setFormClass = setFormClass;

    //////////

    function removeProject(index) {
      $log.log("removing project", vm.myProjects[index].org_id);
      ProjectsService.deleteProject(index).then(function(data) {
        $log.log("removed project", data);
        vm.myProjects.splice(index, 1);
      }, function(error) {
        $log.log("Failed to removed project", error);
      });
    }

    function loadAllProjects() {
      vm.myProjects = [];
      ProjectsService.loadAllProjects().then(function(data) {
        vm.myProjects = data;
      });
    }

    function launchModal(projectI) {
      vm.formClass = 'side-form-80';
      if (projectI >= 0) {
        var orgId = vm.myProjects[projectI].org_id;
        ProjectsService.setCurrProjectOrgId(orgId);
      }

      $state.go("Landing.Projects.AddProject", {
        'projectI': projectI
      });
    }

    function setFormClass(classname) {
      vm.formClass = classname;
    }

    function init() {
      vm.loadAllProjects();
    }

    init();
  }
})();
