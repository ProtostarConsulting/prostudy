var app = angular.module("stockApp");

app.controller("accountPayableListCtr", function($scope, $window, $mdToast,
		$timeout, $mdSidenav, $mdUtil, $log, $stateParams, objectFactory,
		appEndpointSF,monthList) {

	$log.debug("Inside accountAddCtr");

	$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();
	$log.debug("$scope.curUser++++++++" + angular.toJson($scope.curUser));

	$scope.accountPayable = {
		customer:[],
		invoiceId : '',
		invoiceDate : '',
		finalTotal : '',
		invoiceDueDate : '',
		purchaseOrderId : '',
		purchaseOrderDate : '',
		loggedInUser : ''
	};

	$scope.getAllPayablesByBusiness = function() {
		var payableService = appEndpointSF.getAccountService();

		payableService.getAllPayablesByBusiness(
				$scope.curUser.businessAccount.id).then(
				function(accountList) {
					
					$scope.payables = accountList;
					$log.debug("Inside Ctr $scope.payables:"
							+ angular.toJson($scope.payables));
				});
	}

	$scope.payables = [];
	$scope.getAllPayablesByBusiness();
	
	
	$scope.payblesAtDate = {
			atDate : '',
			filteredByAtDate : []
		};
		$scope.showPayablesByDate = function() {
			for (var i = 0; i < $scope.payables.length; i++) {
				
				$scope.month = $scope.payblesAtDate.atDate.getMonth()

				if($scope.month <= 9 ){
					$scope.month1 = '0'+$scope.month;
				}
				
				
				$scope.tempDate = $scope.payblesAtDate.atDate.getDate()+"-"+$scope.month1+"-"+$scope.payblesAtDate.atDate.getFullYear();

				$log.debug("$scope.tempDate:"+$scope.tempDate);
						
				if($scope.payables[i].invoiceDueDate == $scope.tempDate)
					{
						$scope.payblesAtDate.filteredByAtDate.push($scope.payables[i]);
					}
				$log.debug("$scope.payblesAtDate.filteredByAtDate:"
								+ $scope.payblesAtDate.filteredByAtDate);

			}
		}

	
		
	/*	$scope.months = [ "January", "February", "March", "April",
				"May", "June", "July", "Augast", "September",
				"October", "November", "December" ];
	*/	

		// monthList taken from common.app.js
		$scope.months = monthList;
		
		$scope.MonthsddlChange = function(index, selectedMonth) {
			$log.debug("##Came to MonthsddlChange...");
			$scope.countMonth = 0;
			for (var i = 0; i < $scope.months.length; i++) {
				if ($scope.months[i] == selectedMonth) {
					$scope.countIndex = $scope.months.indexOf($scope.months[i]) + 1;
					$log.debug("##$scope.indexOf..."+$scope.countIndex);
				} 
			}
		};
		
		$scope.showReceivablesByMonth = function(month) {
			$scope.month = month;
			$scope.month
			for (var i = 0; i < $scope.payblesAtDate.length; i++) {

			}
		}
		
		
	$scope.toggleRight = buildToggler('right');

	function buildToggler(navID) {
		var debounceFn = $mdUtil.debounce(function() {
			$mdSidenav(navID).toggle().then(function() {
				$log.debug("toggle " + navID + " is done");
			});
		}, 200);
		return debounceFn;
	}

	$scope.close = function() {
		$mdSidenav('right').close().then(function() {
			$log.debug("close RIGHT is done");
		});
	};

	$scope.showSimpleToast = function() {
		$mdToast.show($mdToast.simple().content('Account Data Saved!')
				.position("top").hideDelay(3000));
	};	
});
