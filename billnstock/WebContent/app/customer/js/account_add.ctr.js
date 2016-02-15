var app= angular.module("stockApp");

app.controller(
		"accountAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log,$stateParams, objectFactory, appEndpointSF) {

			$log.debug("Inside accountAddCtr");

			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();
			$log.debug("$scope.curUser++++++++"+angular.toJson($scope.curUser));
			
			
			var lastValue;

			$("#changer").bind("click", function(e){
			    lastValue = $(this).val();
			}).bind("change", function(e){
			    changeConfirmation = confirm("Really?");
			    if (changeConfirmation) {
			        // Proceed as planned
			    } else {
			        $(this).val(lastValue);
			    }
			});
		    
			$scope.account = {
				accountName : "",
				description : "",
				loggedInUser:""
			};
			
			$scope.addAccount = function() {
				$log.debug("No1");
				$scope.account.loggedInUser =$scope.curUser;
				var accountService = appEndpointSF.getAccountService();
				accountService.addAccount($scope.account).then(
						function(msgBean) {
							$log.debug("No6");
							$log.debug("Inside Ctr addAccount");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSimpleToast();

						});
				$log.debug("No4");
				$scope.account = {};
			}
	
			$scope.getAllAccountsByBusiness = function() {
				var accountService = appEndpointSF.getAccountService();

				accountService.getAllAccountsByBusiness($scope.curUser.businessAccount.id).then(
						function(accountList) {
							$log.debug("Inside Ctr getAllAccountsByBusiness");
							$scope.accounts = accountList;							
							$log.debug("Inside Ctr $scope.accounts:"
									+ angular.toJson($scope.accounts));
						});
			}

			$scope.accounts = [];
			$scope.getAllAccountsByBusiness();
			
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
