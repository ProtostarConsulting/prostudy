var app = angular.module("stockApp");

app.controller("accountlistCtr", function($scope, $window, $mdToast, $timeout,
		$mdSidenav, $mdUtil, $log, $stateParams, objectFactory, appEndpointSF,$mdDialog,$mdMedia, $state  ) {

	$scope.query = {
		order : 'name',
		limit : 5,
		page : 1
	};

	$scope.getaccountlist=function(){
		
	var getlist=appEndpointSF.getAccountService();
	getlist.getaccountlist().then(function(list){
		$scope.accounts=list;
	
			});
		}
	$scope.getaccountlist();
	
	
});
