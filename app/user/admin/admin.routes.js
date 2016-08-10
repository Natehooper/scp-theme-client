(function () {
  angular.module('app.user.admin')
    .config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.user.admin', {
        url: '/admin',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.user.admin.list', {
        url: '',
        title: 'Administrators',
        controller: 'AdminListCtrl as vm',
        templateUrl: helper.basepath('user/admin/admin.index.html'),
      })
      .state('app.user.admin.view', {
        url: '/:id',
        title: 'View Administrator',
        controller: 'AdminViewCtrl as vm',
        templateUrl: helper.basepath('user/admin/admin.view.html'),
      })
      ;
  }
})();