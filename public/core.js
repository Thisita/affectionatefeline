global.jQuery = require('jquery');
var bootstrap = require('bootstrap');
var angular = require('angular');

var app = angular.module('affectionatefeline', []);

app.controller('cardCtrl', function($scope, $http) {
	$http.get('cards.json').then(function(response) {
		$scope.card = response.data[$scope.cardIndex];
	});
});
