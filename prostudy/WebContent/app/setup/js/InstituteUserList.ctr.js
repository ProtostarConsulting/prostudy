angular.module("prostudyApp").controller(
		"instituteUserListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state, $stateParams, $mdDialog, objectFactory) {

					
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Institute User Saved!')
						.position("top").hideDelay(3000));
			};
	
		
	
		//	$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();

			$scope.getInstituteUsers = function() {

				var InstituteService = appEndpointSF.getInstituteService();
				InstituteService.getInstituteUsers($scope.curUser.instituteID).then(function(instituteUsersList) {
					$scope.instituteUsersList = instituteUsersList;
					
					$scope.activeUsers = [];
					$scope.inActiveUsers = [];
					$scope.suspendedUsers = [];
					for (var i = 0; i < $scope.instituteUsersList.length; i++) {
						if ($scope.instituteUsersList[i].status == "active") {
							$scope.activeUsers.push($scope.instituteUsersList[i]);
							
						} else if ($scope.instituteUsersList[i].status == "inactive") {
							$scope.inActiveUsers.push($scope.instituteUsersList[i]);
			
						}
						if ($scope.instituteUsersList[i].status == "suspended") {
							$scope.suspendedUsers.push($scope.instituteUsersList[i]);
			
						}
					}
				});
			}

			$scope.instituteUsersList = [];
			$scope.activeselected=[];	
			
			
			$scope.inactiveUserStatus = function(res) {
				var inactive = "inactive";
				var userService = appEndpointSF.getUserService();
				if(res=='active'){
				$scope.activeselected[0].status = inactive;
				userService.updateUserStatus($scope.activeselected[0]).then(
						function(msgBean) {
							$scope.showSimpleToast(msgBean.msg);
							$scope.getInstituteUsers();
							$state.go("setup.instituteUsersList", {reload: true});
						});
				}else{
					$scope.suspendselected[0].status = inactive;
					userService.updateUserStatus($scope.suspendselected[0]).then(
							function(msgBean) {
								$scope.showSimpleToast(msgBean.msg);
								$scope.getInstituteUsers();
								$state.go("setup.instituteUsersList", {reload: true});
							});
				}
			}
			$scope.suspendUserStatus = function(res) {
				var suspended = "suspended";
				var userService = appEndpointSF.getUserService();
				if(res=='active'){
				$scope.activeselected[0].status = suspended;
				userService.updateUserStatus($scope.activeselected[0]).then(
						function(msgBean) {
							$scope.showSimpleToast(msgBean.msg);
							$scope.getInstituteUsers();
							$state.go("setup.instituteUsersList", {reload: true});
						});
				}else{
					$scope.inactiveselected[0].status = suspended;
					userService.updateUserStatus($scope.inactiveselected[0]).then(
							function(msgBean) {
								$scope.showSimpleToast(msgBean.msg);
								$scope.getInstituteUsers();
								$state.go("setup.instituteUsersList", {reload: true});
							});
				}
			}
			$scope.activeUserStatus = function(res) {
				var active = "active";
				var userService = appEndpointSF.getUserService();		
				if(res=='inactive'){		
				$scope.inactiveselected[0].status = active;
				userService.updateUserStatus($scope.inactiveselected[0]).then(
						function(msgBean) {
							$scope.showSimpleToast(msgBean.msg);
							$scope.getInstituteUsers();
							$state.go("setup.instituteUsersList", {reload: true});
						});
				}else{
				$scope.suspendselected[0].status = active;
				userService.updateUserStatus($scope.suspendselected[0]).then(
						function(msgBean) {
							$scope.getInstituteUsers();
							$state.go("setup.instituteUsersList", {reload: true});
						});
				}
			}
/*			
			$scope.changePassword = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog
						.show(
								{
									controller : DialogController,
									templateUrl : '/app/profile/changepassword.html',
									parent : angular
											.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen,
									locals : {
										curuser : $scope.curuser,
										user:$scope.activeselected[0]
						
									}
								})
						.then(
								function(answer) {
									$scope.status = 'You said the information was "'
											+ answer + '".';
								},
								function() {
									$scope.status = 'You cancelled the dialog.';
								});
				$scope.updatepass = function() {
					$log.debug("change pass");
				}
				//window.history.back();

			}

			function DialogController($scope, $mdDialog, curuser,user) {

				//alert(angular.toJson(curuser));
				alert(angular.toJson(user));
				$scope.hide = function() {
					$mdDialog.hide();
				};
				$scope.cancel = function() {
					$mdDialog.cancel();
				};
				$scope.answer = function(answer) {
					$mdDialog.hide(answer);
				};

				$scope.inputType1 = 'password';
				$scope.inputType2 = 'password';

				$scope.showpass1 = function() {
					if ($scope.inputType1 == 'password') {
						$scope.inputType1 = 'text';
					} else {
						$scope.inputType1 = 'password';
					}

				}
				$scope.showpass2 = function() {
					if ($scope.inputType2 == 'password') {
						$scope.inputType2 = 'text';
					} else {
						$scope.inputType2 = 'password';
					}
				}
				$scope.setpassinput1 = function() {
					$scope.inputType1 = 'password';
				}
				$scope.setpassinput2 = function() {
					$scope.inputType2 = 'password';
				}
				$scope.changepass = function() {

					if ($scope.password == $scope.confirmpassword) {
						$scope.savemsg = true;
						$scope.checkpass = false;
					} else {
						$scope.checkpass = true;
						$scope.savemsg = false;
					}

					if ($scope.savemsg == true) {								
					   	$scope.userL=user;
					   	$scope.userL.modifiedBy=user.email_id;
						  $scope.userL.password=$scope.password; 
						  var UserService = appEndpointSF.getUserService();
						 UserService.updateUser($scope.userL).then(function(msgBean) {
						 $scope.showSimpleToast(msgBean.msg);
						  
						  });
						 
					}
				}
			}
*/			
			$scope.query = {
					order : 'description',
					limit : 5,
					page : 1
				};
			
				
			$scope.cancelButton = function() {
				$state.go("^", {});
			}
			
			$scope.error="";	
		
			$scope.waitForServiceLoad = function() {
				  if (appEndpointSF.is_service_ready) {					  
					  $scope.getInstituteUsers();
				  } 
				  else {
				   $log.debug("Services Not Loaded, watiting...");
				   $timeout($scope.waitForServiceLoad, 1000);
				  }
				 }
				  
				 $scope.waitForServiceLoad();
		});
