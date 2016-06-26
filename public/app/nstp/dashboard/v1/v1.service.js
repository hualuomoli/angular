(function() {
	'use strict';

	angular
		.module('nstp.dashboard.v1')
		.service('nstp_dashboard_v1Service', nstp_dashboard_v1Service);

	/** @ngInject */
	function nstp_dashboard_v1Service($http, dataLoad) {
		/* jshint validthis: true */
		var service = this;

		service.loadD = loadD;
		service.loadD01 = loadD01;
		service.loadD02 = loadD02;
		service.loadD11 = loadD11;
		service.loadD12 = loadD12;
		service.loadD13 = loadD13;
		service.loadD2 = loadD2;
		service.loadD3 = loadD3;
		service.loadD4 = loadD4;
		service.getRandomData = getRandomData;

		function loadD() {
			return dataLoad.load([
				[1, 6.5],
				[2, 6.5],
				[3, 7],
				[4, 8],
				[5, 7.5],
				[6, 7],
				[7, 6.8],
				[8, 7],
				[9, 7.2],
				[10, 7],
				[11, 6.8],
				[12, 7]
			]);

		}

		function loadD01() {
			return dataLoad.load([
				[0, 7],
				[1, 6.5],
				[2, 12.5],
				[3, 7],
				[4, 9],
				[5, 6],
				[6, 11],
				[7, 6.5],
				[8, 8],
				[9, 7]
			]);

		}

		function loadD02() {
			return dataLoad.load([
				[0, 4],
				[1, 4.5],
				[2, 7],
				[3, 4.5],
				[4, 3],
				[5, 3.5],
				[6, 6],
				[7, 3],
				[8, 4],
				[9, 3]
			]);

		}

		function loadD11() {
			return dataLoad.load([
				[10, 120],
				[20, 70],
				[30, 70],
				[40, 60]
			]);

		}

		function loadD12() {
			return dataLoad.load([
				[10, 50],
				[20, 60],
				[30, 90],
				[40, 35]
			]);

		}

		function loadD13() {
			return dataLoad.load([
				[10, 80],
				[20, 40],
				[30, 30],
				[40, 20]
			]);

		}

		function loadD2() {
			var d2 = [];
			for (var i = 0; i < 20; ++i) {
				d2.push([i, Math.sin(i)]);
			}

			return dataLoad.load(d2);

		}

		function loadD3() {
			return dataLoad.load([{
				label: "iPhone5S",
				data: 40
			}, {
				label: "iPad Mini",
				data: 10
			}, {
				label: "iPad Mini Retina",
				data: 20
			}, {
				label: "iPhone4S",
				data: 12
			}, {
				label: "iPad Air",
				data: 18
			}]);

		}

		function loadD4() {
			return dataLoad.load(getRandomData());

		}

		function getRandomData() {
			var data = [],
				totalPoints = 150;
			if (data.length > 0)
				data = data.slice(1);
			while (data.length < totalPoints) {
				var prev = data.length > 0 ? data[data.length - 1] : 50,
					y = prev + Math.random() * 10 - 5;
				if (y < 0) {
					y = 0;
				} else if (y > 100) {
					y = 100;
				}
				data.push(y);
			}
			// Zip the generated y values with the x values
			var res = [];
			for (var i = 0; i < data.length; ++i) {
				res.push([i, data[i]])
			}
			return res;
		}

	}

})();