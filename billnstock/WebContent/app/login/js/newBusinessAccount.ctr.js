angular.module("stockApp").controller(
		"newBusinessAccountCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $location, objectFactory, appEndpointSF,
				tableTestDataFactory, $state) {

			
			$scope.showSimpleToast = function(msgBean) {
				$mdToast.show($mdToast.simple().content(msgBean)
						.position("top").hideDelay(3000));
			};

			// ////////////////////////////////////////////////////////////////////////////////

			$scope.curuser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
		
			$scope.business = {
					businessName : "",
					adminGmailId : "",
					adminFirstName :"",
					adminLastName : "",
						password:""
			}

			$scope.addBusiness = function() {
				var UserService = appEndpointSF.getUserService();
				UserService.addBusiness($scope.business).then(
						function(msgBean) {
							$scope.showSimpleToast(msgBean);
							$state.go("login");
						
						});
			}
	



			// //////////////////////////////////////////////////////////////////////////////

			
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