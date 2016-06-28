(function () {
  'use strict';

  angular
    .module('nstp.ui.tree')
    .service('nstp_ui_treeService', nstp_ui_treeService);

  /** @ngInject */
  function nstp_ui_treeService($http, dataLoad) {
    /* jshint validthis: true */
    var service = this;

    service.loadData = loadData;
    service.loadRandomData = loadRandomData;

    function loadData() {
      return dataLoad.load([{
        label: 'phone',
        value: '02',
        children: []
      }, {
        label: 'Animal',
        value: '01',
        children: [{
          label: 'Dog',
          data: {
            description: "man's best friend"
          }
        }, {
          label: 'Cat',
          data: {
            description: "Felis catus"
          }
        }, {
          label: 'Hippopotamus',
          data: {
            description: "hungry, hungry"
          }
        }, {
          label: 'Chicken',
          children: ['White Leghorn', 'Rhode Island Red', 'Jersey Giant']
        }]
      }, {
        label: 'Vegetable',
        data: {
          definition: "A plant or part of a plant used as food, typically as accompaniment to meat or fish, such as a cabbage, potato, carrot, or bean.",
          data_can_contain_anything: true
        },
        children: [{
          label: 'Oranges'
        }, {
          label: 'Apples',
          children: [{
            label: 'Granny Smith'
          }, {
            label: 'Red Delicous'
          }, {
            label: 'Fuji'
          }]
        }]
      }, {
        label: 'Mineral',
        children: [{
          label: 'Rock',
          children: ['Igneous', 'Sedimentary', 'Metamorphic']
        }, {
          label: 'Metal',
          children: ['Aluminum', 'Steel', 'Copper']
        }, {
          label: 'Plastic',
          children: [{
            label: 'Thermoplastic',
            children: ['polyethylene', 'polypropylene', 'polystyrene', ' polyvinyl chloride']
          }, {
            label: 'Thermosetting Polymer',
            children: ['polyester', 'polyurethane', 'vulcanized rubber', 'bakelite', 'urea-formaldehyde']
          }]
        }]
      }]);
    }

    function loadRandomData() {
      return dataLoad.load([{
        label: 'North America',
        children: [{
          label: 'Canada',
          children: ['Toronto', 'Vancouver']
        }, {
          label: 'USA',
          children: ['New York', 'Los Angeles']
        }, {
          label: 'Mexico',
          children: ['Mexico City', 'Guadalajara']
        }]
      }, {
        label: 'South America',
        children: [{
          label: 'Venezuela',
          children: ['Caracas', 'Maracaibo']
        }, {
          label: 'Brazil',
          children: ['Sao Paulo', 'Rio de Janeiro']
        }, {
          label: 'Argentina',
          children: ['Buenos Aires', 'Cordoba']
        }]
      }]);
    }

  }

})();