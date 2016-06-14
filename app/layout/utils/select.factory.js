(function () {
  'use strict';

  angular
    .module('app.layout.utils')
    .factory('Select', SelectFactory);

  /**
   * Select Factory
   *
   * @ngInject
   */
  function SelectFactory (Api, EventEmitter, _) {
    return function (path) {
        return new Select(Api.all(path), EventEmitter(), _);
    };
  }

  function Select ($api, event, _) {
    // Private variables
    var select = this;
    var filter = {};

    // Public variables
    select.items = [];
    select.selected = null;
    select.isMulti = false;

    // Public methods
    select.load = _.debounce(load, 10);
    select.notSelected = notSelected;
    select.multi = multi;
    select.filter = setFilter;
    select.clearFilter = clearFilter;
    select.fireChangeEvent = fireChangeEvent;
    select.getSelected = getSelected;
    event.bindTo(select);

    //////////

    function load(search) {
      return $api
        .getList(_.assign({}, filter, { q: search }))
        .then(store)
        ;
    }

    function getSelected(attr) {
      return (select.selected || {})[attr] || null;
    }

    function setFilter(newFilters) {
      _.assign(filter, newFilters);

      return select;
    }

    function fireChangeEvent() {
      select.fire('change', select.selected);
    }

    function clearFilter(key) {
      delete filter[key];

      return select;
    }

    function multi() {
      select.isMulti = true;
      select.selected = [];

      return select;
    }

    function store(items) {
      _.setContents(select.items, items);
    }

    function notSelected(item) {
      return select.isMulti ?
        !_.some(select.selected, {id: item.id}) :
        select.selected != item
        ;
    }
  }
})();
