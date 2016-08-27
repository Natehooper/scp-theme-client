(function () {
  'use strict';

  angular
    .module('app.pxe.profile')
    .factory('PxeProfileList', PxeProfileListFactory);

  /**
   * PxeProfileList Factory
   *
   * @ngInject
   */
  function PxeProfileListFactory (List, ListConfirm) {
    return function () {
      var list = List('pxe/profile');
      var confirm = ListConfirm(list, 'pxe.profile.modal.delete');

      list.bulk.add('Delete', confirm.delete);

      return list;
    };
  }
})();