angular.module("stockApp").controller(
		"setup.changeplan",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$stateParams, $log, objectFactory, $mdDialog, $mdMedia,$state,
				appEndpointSF) {

			$scope.showSimpleToast = function(msgBean) {
				$mdToast.show($mdToast.simple().content(msgBean)
						.position("top").hideDelay(3000));
			};

			$scope.businessNo = $stateParams.businessNo;
			
			$scope.curuser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();

			$scope.getBusinessById=function(){
				if(typeof $scope.businessNo == "undefined"){
					$scope.Bid=$scope.curuser.business.id;
				}else{
					$scope.Bid=$scope.businessNo;
				}
				var UserService = appEndpointSF	.getUserService();
					UserService.getbusinessById($scope.Bid).then(function(Business) {
								$scope.business=Business;
					});
				
			}
			$scope.getBusinessById();
			$scope.business={};
			
			/* get Account Type */
			
			$scope.getallAccountType = function() {
				var proadminService = appEndpointSF.getproadminService();
				proadminService.getallAccountType().then(function(assetList) {
					$scope.accountlist = assetList.items;
				});
			}
			$scope.accountlist = [];
			$scope.getallAccountType();

			
			$scope.updatePlan = function() {
				
				var proadminService = appEndpointSF.getproadminService();
				proadminService.getAccountTypeById($scope.accounttype).then(
						function(accountType) {
							$scope.business.accounttype= accountType.result;
							var UserService = appEndpointSF.getUserService();
							//addbusiness use in number of place don't update service method
							UserService.addBusiness($scope.business).then(
									function(business) {
										$scope.showSimpleToast("Account Plan Updated Sucessfully");
									});
						});

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

		});
