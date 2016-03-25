angular
		.module("stockApp")
		.controller(
				"setup.viewuser",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,
						appEndpointSF) {
					
					$scope.showSimpleToast = function(msgBean) {
						$mdToast.show($mdToast.simple().content(msgBean)
								.position("top").hideDelay(3000));
					};

					$scope.selecteduserNo = $stateParams.selecteduserNo;
					$scope.id;

					$scope.items = [ "stock", "sales", "hr", "crm", "customer",
							"invoice", "purchase", "employee", "admin" ];
					$scope.selection = [];

					$scope.curuser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();



					//set toggled value onclick on check box and push in selection array only tru or false value
					$scope.toggleSelection = function toggleSelection(index) {
						$scope.selection[index] = !$scope.selection[index];
					};

					$scope.condition = function() {
						if ($scope.user.isGoogleUser == false) {
							return true;
						} else {
							return false
						}
					}
			
//----------------------view user separate the controller----------------
					$scope.getuserById = function() {
						$log.debug("Inside Ctr $scope.getuserById");
						var setupService = appEndpointSF.getsetupService();
						if (typeof $scope.selecteduserNo != "undefined") {
							setupService
									.getuserById($scope.selecteduserNo)
									.then(
											function(userList) {
												$log.debug("Inside Ctr getAllleads");
												$scope.userL = userList.result;
												//push the authoried item index in true in selection array 
												for ( var i in $scope.items) {
						$scope.selection.push($scope.userL.authority.indexOf($scope.items[i]) > -1);
												}

											});
						}
					}

					$scope.userL = {};
					$scope.getuserById();

					$scope.updateuser = function() {
						$scope.userL.authority = [];
						for (var i = 0; i < $scope.selection.length; i++) {
							if ($scope.selection[i])
								$scope.userL.authority.push($scope.items[i]);
						}
						var UserService = appEndpointSF.getUserService();
						UserService.updateUser($scope.userL).then(
								function(msgBean) {
									$scope.showSimpleToast(msgBean.msg);
								});
					}
//------------------------------------------------------------
			

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
