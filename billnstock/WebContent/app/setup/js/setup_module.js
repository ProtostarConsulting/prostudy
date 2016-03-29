angular.module("stockApp").controller(
		"setup",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$stateParams, $log, objectFactory, appEndpointSF) {
		
			$scope.showSimpleToast = function(msgBean) {
				$mdToast.show($mdToast.simple().content(msgBean)
						.position("top").hideDelay(3000));
			};
			$scope.selecteduserNo = $stateParams.selecteduserNo;
			$scope.id;

	
			
			/*$scope.business = {
					businessName : "",
					accounttype:"",
						address1:"",
						address2:"",
						registerDate:""
				}
				$scope.userEntity={
						businessAccount:"",
						email_id : "",
						firstName : "",
						lastName : "",	
						authority:[],
						isGoogleUser:true
				}	
*/
			$scope.curuser = appEndpointSF.getLocalUserService().getLoggedinUser();

			$scope.updateBusiness = function() {
				var setupService = appEndpointSF.getsetupService();
				var UserService = appEndpointSF.getUserService();
				setupService.updateBusiness($scope.curuser.businessAccount).then(
						function(respbusiness) {
							UserService.addUser($scope.curuser).then(function(msg){
						    $scope.showSimpleToast("Business updated Sucessfully");
							
							});
							
							
						});
			}

			$scope.getAllUserOfOrg = function() {
				var setupService = appEndpointSF.getsetupService();
				if (typeof $scope.curuser.businessAccount.id != 'undefined') {
				setupService.getAllUserOfOrg($scope.curuser.businessAccount.id).then(function(users) {
					$scope.userslist = users.items;
					
					for(var i=0; i<$scope.userslist.length;i++){
						if($scope.userslist[i].status == "active"){
							$scope.activeUsers.push($scope.userslist[i]);
							console.log("Active Users"+angular.toJson($scope.activeUsers));
						}else if($scope.userslist[i].status == "inactive"){
							$scope.inActiveUsers.push($scope.userslist[i]);
							console.log("In-Active Users"+angular.toJson($scope.inActiveUsers));
						}if($scope.userslist[i].status == "suspend"){
							$scope.suspendedUsers.push($scope.userslist[i]);
							console.log("Suspended Users"+angular.toJson($scope.suspendedUsers));
						}
					}

				});
				}
			}
			
			$scope.activeUsers = [];
			$scope.inActiveUsers = [];
			$scope.suspendedUsers = [];
			
			$scope.userslist = [];
			$scope.getAllUserOfOrg();

			
			// ----------hide and show ---------------------------

			$scope.IsHidden = true;
			$scope.ShowHide = function() {
				$scope.IsHidden = $scope.IsHidden ? false : true;
			}
			// -----------------------------------------------------
			
			$scope.showAdvanced = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog
						.show(
								{
									controller : DialogController,
									templateUrl : '/app/profile/changepassword.html',
									parent : angular.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen,
									locals: {
										curuser: $scope.curuser
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
				$scope.updatepass=function(){
					$log.debug("change pass");
				}
			};

			function DialogController($scope, $mdDialog, curuser) {
				
				alert(angular.toJson(curuser));
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
				$scope.changepass=function(){
					
					if ($scope.password == $scope.confirmpassword) {
						$scope.savemsg=true;
						$scope.checkpass=false;
					} else {
						$scope.checkpass=true;
						$scope.savemsg=false;
					}
					
					if($scope.savemsg==true){
						//$scope.updatepass();
			/*		$scope.userL.password=$scope.password;	
					var UserService = appEndpointSF.getUserService();
					UserService.updateUser($scope.userL).then(function(msgBean) {
						$scope.showSimpleToast(msgBean.msg);
													
					});*/ 
					}
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
			
			
			$scope.selected = [];

			$scope.updateUserStatus = function(selected,stateValue) {
				
				$scope.selected[0].status = stateValue;
				
				var setupService = appEndpointSF.getsetupService();

				setupService.updateUserStatus($scope.selected[0]).then(
						function(msgBean) {
							$scope.showSimpleToast(msgBean.msg);

						});

			}
			

		});
