
	// create the module and name it reaccionApp
	var reaccionApp = angular
						.module('reaccionApp', ['ngRoute', 'firebase'])
						.service('webConfig', webConfig)
						.service('lugares', lugares)
						.config(reaccionAppConfig);


	function reaccionAppConfig ($routeProvider) {
		$routeProvider

			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the home page
			.when('/home', {
				templateUrl : 'pages/home.html',
				controller  : 'homeController'
			})

			// route for the favorites page
			.when('/favorites', {
				templateUrl : 'pages/favorites.html',
				controller  : 'favoritesController'
			})

			// route for the maps page
			.when('/maps', {
				templateUrl : 'pages/maps.html',
				controller  : 'mapsController'
			});

	}

	function webConfig ($firebaseObject){
		var webConfigRef = firebase.database().ref().child('webConfig');
		this.getView = function getView(key){
			return $firebaseObject(webConfigRef.child('views').child(key));
		}
	}

	function lugares ($firebaseObject){
		var webConfigRef = firebase.database().ref().child('lugares');
		this.getAll = function getAll(){
			return $firebaseObject(webConfigRef);
		}
	}


	// create the controller and inject Angular's $scope
	reaccionApp.controller('mainController', function($scope, webConfig, lugares) {
		$scope.$on('$viewContentLoaded', function() {
					$scope.data = webConfig.getView('home');
					$scope.lugares = lugares.getAll();
				});
	});

	reaccionApp.controller('homeController', function($scope, webConfig, lugares) {
       $scope.$on('$viewContentLoaded', function() {
                $scope.data = webConfig.getView('home');
				$scope.lugares = lugares.getAll();
            });
	});

	reaccionApp.controller('favoritesController', function($scope, webConfig) {
		$scope.$on('$viewContentLoaded', function() {
                $scope.data = webConfig.getView('favorites');
            });
	});

	reaccionApp.controller('mapsController', function($scope, webConfig) {
		$scope.$on('$viewContentLoaded', function() {
                $scope.data = webConfig.getView('maps');
            });
	});
