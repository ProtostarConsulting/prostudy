angular.module("stockApp").controller(
		"probusinessCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$stateParams, $log, objectFactory, appEndpointSF) {

			$scope.businessNo = $stateParams.businessNo;
			$scope.userid = $stateParams.userid;
			$scope.businessName = $stateParams.businessName;
			$scope.BNo = $stateParams.BNo;
			$scope.selecteduserNo = $stateParams.selecteduserNo;
			
			$scope.showSimpleToast = function(msgBean) {
				$mdToast.show($mdToast.simple().content(msgBean)
						.position("top").hideDelay(3000));
			};
			
			$scope.getBusinessList = function() {
				$log.debug("Inside Ctr $scope.getuserById");
				var UserService = appEndpointSF.getUserService();
				UserService.getBusinessList().then(function(businessList) {
					$log.debug("Inside Ctr getAllleads");
					$scope.businesslist = businessList.items;

				});

			}

			$scope.businesslist = [];
			$scope.getBusinessList();

			$scope.getUsersByBusinessId = function() {
				$log.debug("Inside Ctr $scope.getuserById");
				var UserService = appEndpointSF.getUserService();
				UserService.getUsersByBusinessId($scope.businessNo).then(
						function(userList) {
							$log.debug("Inside Ctr getAllleads");
							$scope.userlist = userList.items;

						});

			}

			$scope.userlist = [];
			$scope.getUsersByBusinessId();

			// -------------------------------------------------------------------------------------
			$scope.user = {
				businessAccount : "",
				email_id : "",
				firstName : "",
				lastName : "",
				password : "",
				isGoogleUser : true,
				authority : []
			}
			$scope.items = [ "stock", "sales", "hr", "crm", "customer",
					"setup", "invoice", "purchase","basic","employee" ];
			$scope.selection = [];
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

			$scope.adduser = function() {
				var UserService = appEndpointSF.getUserService();
				UserService.getbusinessById($scope.BNo).then(function(busi) {
					$scope.user.businessAccount = busi.result;
					$scope.user.authority = $scope.selection;
					UserService.addUser($scope.user).then(function(msgBean) {
						$scope.showSimpleToast(msgBean.msg);

					});
				});
				
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
			//	$scope.userL.password= $scope.password;
				var UserService = appEndpointSF.getUserService();
				UserService.updateUser($scope.userL).then(function(msgBean) {
					$scope.showSimpleToast(msgBean.msg); 
				});
			}

			// -----------------------------------------------------------------------------------------------
			$scope.back = function() { 
			   window.history.back();
				// $state.go("^", {});  
			};
			//----------hide and show ---------------------------

			$scope.IsHidden = true;
			$scope.ShowHide = function() {
				$scope.IsHidden = $scope.IsHidden ? false : true;
			}
			//-----------------------------------------------------
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
