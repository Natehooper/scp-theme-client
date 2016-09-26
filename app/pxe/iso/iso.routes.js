(function () {
  angular
    .module('app.pxe.iso')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe.iso', {
        url: '/iso',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.pxe.iso.view', {
        url: '/:id',
        title: 'View ISO',
        controller: 'IsoViewCtrl as vm',
        templateUrl: helper.basepath('pxe/iso/iso.view.html'),
      })
      ;

    helper.url('pxe/iso/?([0-9]*)', function (id) {
      return 'pxe/iso'+(id && '/'+id);
    });
  }
})();