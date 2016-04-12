var app= angular.module("stockApp");

app.controller(
		"accountAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log,$stateParams, objectFactory, appEndpointSF) {

			 $scope.query = {
					    order: 'name',
					    limit: 5,
					    page: 1
					  };
			 
			$log.debug("Inside accountAddCtr");

			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();
			$log.debug("$scope.curUser++++++++"+angular.toJson($scope.curUser));
			
		    
			$scope.account = {
				accountName : "",
				description : "",
				createdDate :new Date(),
				modifiedBy :new Date(),
				business:""
			};
			
			$scope.addAccount = function() {
				$log.debug("No1");
				$scope.account.business =$scope.curUser.business;
				var accountService = appEndpointSF.getAccountService();
				accountService.addAccount($scope.account).then(
						function(msgBean) {
						});
				$scope.account = {};
			}
	
			$scope.getAllAccountsByBusiness = function() {
				var accountService = appEndpointSF.getAccountService();

				accountService.getAllAccountsByBusiness($scope.curUser.business.id).then(
						function(accountList) {
							$log.debug("Inside Ctr getAllAccountsByBusiness");
							$scope.accounts = accountList;							
							$log.debug("Inside Ctr $scope.accounts:"
									+ angular.toJson($scope.accounts));
						});
			}

			$scope.waitForServiceLoad = function() {
				if (appEndpointSF.is_service_ready) {
					$scope.getAllAccountsByBusiness();
				} else {
					$log.debug("Services Not Loaded, watiting...");
					$timeout($scope.waitForServiceLoad, 1000);
				}
			}

			$scope.accounts = [];
			$scope.waitForServiceLoad();
			
			
			
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
			
			$scope.back = function() {
				 window.history.back();
			}
		});
