angular.module("prostudyApp").controller(
		"updateMyProfileCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q,tableTestDataFactory,appEndpointSF,$state) {
			
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Profile Updated!')
						.position("top").hideDelay(3000));
			};
			$scope.curUser=appEndpointSF.getLocalUserService().getLoggedinUser();
			$log.debug("$scope.curUser : "+angular.toJson($scope.curUser));

			$scope.tempUser =$scope.curuser;
			
			$scope.getInstitutes = function(){
				var InstituteService = appEndpointSF.getInstituteService();					
				InstituteService.getInstitutes()
				.then(
						function(instituteList) {
							$log.debug("Inside Ctr getInstitutes");
							$scope.institutes = instituteList;
							$log.debug("$scope.institutes :"+$scope.institutes);
						});
			}
			$scope.getInstitutes();
		

			//$scope.tempUser =$scope.curUser;
			$scope.tempUser = {
					id: $scope.curUser.id,
					firstName : $scope.curUser.firstName,
					lastName : $scope.curUser.lastName,
					email_id : $scope.curUser.email_id,
					address : $scope.curUser.address,
					contact : $scope.curUser.contact,
					role : $scope.curUser.role,
					gender : "",	
					myExams : [],	
					myBooks : [],	
					
				};

			$scope.updateUser = function() {
				$log.debug("No1");
				var UserService = appEndpointSF.getUserService();
				UserService.updateUser($scope.tempUser).then(function(msgBean) {
					$log.debug("No6");
					$log.debug("Inside Ctr updateUser");
					
					$scope.showSavedToast();
					$scope.tempUser = {
						
						};
					$state.go("home");
				});
				$log.debug("No4");
			}

			$scope.skip = function() {
				
				$state.go("home");

			}
		
		});
