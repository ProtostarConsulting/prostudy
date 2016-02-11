angular.module("stockApp").controller(
		"needBusinessAccountCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $location, objectFactory, appEndpointSF,
				tableTestDataFactory, $state) {

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content(
						'New Student Registered!').position("top").hideDelay(
						3000));
			};

			// ////////////////////////////////////////////////////////////////////////////////

			$scope.curuser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
		
			$scope.business = {
					businessName : "",
					adminGmailId : $scope.curuser.email_id,
					adminFirstName : $scope.curuser.firstName,
					adminLastName : $scope.curuser.lastName
			}

			$scope.addBusiness = function() {
				var UserService = appEndpointSF.getUserService();
				UserService.addBusiness($scope.business).then(
						function(msgBean) {
							$scope.showSavedToast();
							//hide current section
							//show next section
						$state.go("login_module.html");
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