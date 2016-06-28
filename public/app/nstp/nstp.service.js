(function () {
  'use strict';

  angular
    .module('nstp')
    .service('nstpService', nstpService);

  /** @ngInject */
  function nstpService($http, dataLoad) {
    /* jshint validthis: true */
    var service = this;

    service.loadStates = loadStates;
    service.loadPermissions = loadPermissions;

    function loadStates() {
      return dataLoad.load([
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ]);

    }

    function loadPermissions() {
      return dataLoad.load([
        'nstp:navigation',
        'nstp:dashboard',
        'nstp:dashboard:v1', // menu
        'nstp:dashboard:v1:view', // function
        'nstp:dashboard:v2',
        'nstp:calendar',
        'nstp:email',
        'nstp:apps',
        'nstp:apps:note',
        'nstp:apps:contacts', // remove
        'nstp:apps:weather',
        'nstp:components',
        'nstp:layout',
        'nstp:layout:application',
        'nstp:layout:fullwidth',
        'nstp:layout:mobile',
        'nstp:ui',
        'nstp:ui:buttons',
        'nstp:ui:icons',
        'nstp:ui:grid',
        'nstp:ui:widgets',
        'nstp:ui:bootstrap',
        'nstp:ui:sortable',
        'nstp:ui:portlet',
        'nstp:ui:timeline',
        'nstp:ui:toaster',
        'nstp:ui:tree',
        'nstp:ui:jvectormap',
        'nstp:ui:googlemap',
        'nstp:table',
        'nstp:table:static',
        'nstp:table:datatable',
        'nstp:table:footable',
        'nstp:table:grid',
        'nstp:form',
        'nstp:form:elements',
        'nstp:form:validation',
        'nstp:form:wizard',
        'nstp:form:fileupload',
        'nstp:form:imagecrop',
        'nstp:form:select',
        'nstp:form:slider',
        'nstp:form:editor',
        'nstp:chart',
        'nstp:pages',
        'nstp:pages:profile',
        'nstp:pages:post',
        'nstp:pages:search',
        'nstp:pages:invoice',
        'nstp:pages:price',
        'nstp:your_stuff',
        'nstp:your_stuff:PROFILE',
        'nstp:your_stuff:DOCUMENTS',

      ]);
    }

  }

})();