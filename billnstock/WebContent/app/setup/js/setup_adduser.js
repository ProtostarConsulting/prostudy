angular.module("stockApp").controller(
		"setup.adduser",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$stateParams, $log, objectFactory, appEndpointSF) {
			// ////////////////////////////////////////////////////////////////////////////////////////////////
			$scope.showSimpleToast = function(msgBean) {
				$mdToast.show($mdToast.simple().content(msgBean)
						.position("top").hideDelay(3000));
			};
			
			$scope.selecteduserNo = $stateParams.selecteduserNo;
			$scope.id;

			$scope.items = [ "stock", "sales", "hr", "crm", "customer","setup","invoice", "purchase","employee","basic" ];
			$scope.selection = [];

			$scope.curuser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();

			$scope.getCurUserByEmailId = function() {
				var setupService = appEndpointSF.getsetupService();
				setupService.getCurUserByEmailId($scope.curuser.email_id).then(
						function(user) {
							$scope.business = user.items[0];
							$scope.id = $scope.business.id;
							$log.debug("$scope.business.id"
									+ $scope.business.id);
						});
			}
			$scope.business = [];
			$scope.getCurUserByEmailId();

			$scope.toggleSelection = function toggleSelection(itemName) {
				var idx = $scope.selection.indexOf(itemName);

				// is currently selected
				if (idx > -1) {
					$scope.selection.splice(idx, 1);
				}

				// is newly selected
				else {
					$scope.selection.push(itemName);
				}

				$log.debug("$scope.selection===" + $scope.selection);

			};

			$scope.condition = function() {
				if ($scope.user.isGoogleUser == false) {
					return true;
				} else {
					return false
				}
			}
			// -------------------------------------------------------------------------

			$scope.user = {
				businessAccount : "",
				email_id : "",
				firstName : "",
				lastName : "",
				password:"",
				isGoogleUser:true,
				authority : []
			}

			$scope.adduser = function(busi) {
				$scope.user.businessAccount = busi;
				//$scope.user.isGoogleUser = $scope.GoogleUser;
				$scope.user.authority = $scope.selection;
				var UserService = appEndpointSF.getUserService();
				UserService.addUser($scope.user).then(function(msgBean) {
					$scope.showSimpleToast(msgBean.msg);

				});

				$scope.user = {};
			}

			$scope.getuserById = function() {
				$log.debug("Inside Ctr $scope.getuserById");
				var setupService = appEndpointSF.getsetupService();
				if (typeof $scope.selecteduserNo != undefined) {
					setupService.getuserById($scope.selecteduserNo).then(
							function(userList) {
								$log.debug("Inside Ctr getAllleads");
								$scope.userL = userList.result;

							});
				}
			}

			$scope.userL = [];
			$scope.getuserById();

			$scope.updateuser = function() {
				$scope.userL.authority = $scope.selection;
				var UserService = appEndpointSF.getUserService();
				UserService.updateUser($scope.userL).then(function(msgBean) {
					$scope.showSimpleToast(msgBean.msg); 
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
