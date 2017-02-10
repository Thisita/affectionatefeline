global.jQuery = require('jquery');
var bootstrap = require('bootstrap');
var angular = require('angular');

var app = angular.module('affectionatefeline', []);

app.controller('cardCtrl', function($scope, $http) {
	$scope.apparenteffect = false;
	$scope.loadCardset = function() {
		$http.get('/api/cardset/apparenteffect').then(function(response) {
			$scope.cardset = response.data;
			$scope.apparenteffect = true;
		});
	};
});
