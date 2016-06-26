(function() {
	'use strict';

	angular
		.module('http.load')
		.provider('httpLoad', httpLoad);

	/** @ngInject */
	function httpLoad($http) {

		/* jshint validthis:true */
		this.serverUrl = '';
		this.tokenHeader = {};

		this.$get = function() {
			return {
				get: doGet,
				post: doPost,
				json: doJson,
				delete: doDelete
			}
		}

		function doGet(url, params) {
			return $http({
				method: 'GET',
				url: getUrl(url),
				params: !!params ? params : '',
				headers: angular.extend({}, tokenHeader)
			});
		}

		function doPost(url, params, headers) {
			return $http({
				method: 'POST',
				url: getUrl(url),
				data: $.param(!!params ? params : {}),
				headers: angular.extend({}, !!headers ? headers : tokenHeader, {
					'Content-Type': 'application/x-www-form-urlencoded'
				})
			});
		}

		function doJson(url, params, headers) {
			return $http({
				method: 'POST',
				url: getUrl(url),
				data: angular.toJson(!!params ? params : {}),
				headers: angular.extend({}, !!headers ? headers : tokenHeader, {
					'Content-Type': 'application/json'
				})
			});
		}

		function doDelete(url) {
			return $http({
				method: 'DELETE',
				url: getUrl(url),
				headers: angular.extend({}, tokenHeader)
			});
		}

		function getUrl(url) {
			return serverUrl + url;
		}

	}

})();