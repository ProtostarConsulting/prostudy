var app = angular.module("templateWebsite", [ 'ngMaterial', 'ngMdIcons',
		'ngMessages', "ui.bootstrap" ]);

app.controller("indexCtr", function($scope, $window, $log) {

	$log.debug("Inside indexCtr");
	$scope.currentNavItem = 'page1';
	var defaultTheme = 'default';
	$scope.theme = defaultTheme

	$scope.themeList = [ 'default', 'red', 'pink', 'purple', 'deep-purple',
			'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green',
			'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange',
			'brown', 'grey', 'blue-grey' ];

	$scope.changeTheme = function(themeName) {
		$scope.theme = themeName
	}

});