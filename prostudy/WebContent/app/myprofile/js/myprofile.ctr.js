angular.module("prostudyApp").controller(
		"myProfileCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q,tableTestDataFactory,appEndpointSF,$state) {
			
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('login Saved!')
						.position("top").hideDelay(3000));
			};
			
			$scope.curUser = appEndpointSF.getUserService().getLoggedinUser();
			

			$scope.tempUser = {
					userId : "",
					name : "",
					userName : "",
					email_id : "",
					address : "",
					contact : "",
					pwd : "",	
					role : ""
					
				};
			
			$scope.addUser = function() {
				$log.debug("No1");
				var UserService = appEndpointSF.getUserService();
				UserService.addUser($scope.tempUser).then(function(msgBean) {
					$log.debug("No6");
					$log.debug("Inside Ctr addLogin");
					$log.debug("msgBean.msg:" + msgBean.msg);
					$scope.showSavedToast();
					
					$scope.tempUser = {
							userId : "",
							name : "",
							userName : "",
							email_id : "",
							address : "",
							contact : "",
							pwd : "",
							role : ""
							
						};
				});
				$log.debug("No4");
			}

			$scope.getUser = function() {
				var UserService = appEndpointSF.getUserService();

				UserService.getUsers().then(function(userList) {
					$log.debug("Inside Ctr getLogin");
					$scope.users = userList;
				});
			}

			
		
			$scope.update = function() {
				var UserService = appEndpointSF.getUserService();
				
				UserService.updateProfile($scope.curUser).then(
						function(msgBean) {
							$log.debug("No6");
							$log.debug("Inside Ctr updateSyllabus");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSavedToast();
					});
				$log.debug("Select profile updated");
				
				$log.debug("updated value :"+$scope.tempUser.role);
				//$scope.isShowTable = true;
				//$scope.isShowRecord = false;
				
			}
			
			$scope.getUser();

		});// end of myprofile ctr

