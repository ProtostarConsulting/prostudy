
var app = angular.module("stockApp");

app.controller("addAccountGeneralEntryCtr", function($scope, $window, $mdToast, $timeout,
		$mdSidenav, $mdUtil, $log, $stateParams, objectFactory, appEndpointSF,$mdDialog,$mdMedia ) {
	

	$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();
	

	$scope.tempAccountEntity = {
			accountName : "",
			accountType : "",
			accountNo : "",
			description : "",
			displayOrderNo : "",
			contra : ""

		};
	$scope.tempGeneralEntry = {
			date : "",
			narration : "",
			ammount : "",
			debitAccount : $scope.tempAccountEntity,
			creditAccount : $scope.tempAccountEntity		

		};
			
	$scope.getaccountlist=function(){
		
		var getlist=appEndpointSF.getAccountService();
		getlist.getaccountlist().then(function(list){
			$scope.accounts=list;
			$log.debug("$scope.accounts..."+angular.toJson($scope.accounts));
				});
			}
		
	
		$scope.waitForServiceLoad = function() {
			if (appEndpointSF.is_service_ready) {
				$scope.getaccountlist();
			} else {
				$log.debug("Services Not Loaded, watiting...");
				$timeout($scope.waitForServiceLoad, 1000);
			}
		}
		$scope.waitForServiceLoad();
		

	

	$scope.showSimpleToast = function() {
		$mdToast.show($mdToast.simple().content('General Account Entry Saved!')
				.position("top").hideDelay(3000));
	};

	$scope.back = function() {
		window.history.back();
	}
});
