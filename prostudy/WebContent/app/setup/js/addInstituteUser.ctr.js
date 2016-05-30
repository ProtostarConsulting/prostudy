angular.module("prostudyApp").controller(
		"addInstituteUserCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state, $stateParams, $mdDialog, objectFactory) {

			
			$scope.checkConfirmPassword = appEndpointSF.getUtilityService().checkConfirmPassword;
			
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Institute User Saved!')
						.position("top").hideDelay(3000));
			};
	


		//	$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();
			$scope.instRoles = ["Admin","Teacher","Student"];
			$scope.tempUser = {isGoogleUser : false};
			
			$scope.addInstituteUsers = function() {
				var UserService = appEndpointSF.getUserService();
				
				$scope.tempUser.instituteID = $scope.curUser.instituteID;
				
				UserService.addUser($scope.tempUser).then(function(msgBean) {

				});
				$scope.instituteAddUserForm.$setPristine();
				$scope.instituteAddUserForm.$setValidity();
				$scope.instituteAddUserForm.$setUntouched();
				$scope.tempUser = {};
				$scope.showSavedToast();

			}	
			
			$scope.query = {
					order : 'description',
					limit : 5,
					page : 1
				};
			
				
			$scope.cancelButton = function() {
				$state.go("^", {});
			}
			
			$scope.error="";	
			
			$scope.checkUserAlreadyExist = function(email_id) 
			{
				if(email_id)
					{
				var UserService = appEndpointSF.getUserService();			
				UserService.checkUserAlreadyExist(email_id).then(
						function(response) {
							if(response.bool==true)
							{
								$scope.error="User Already Exists";	
								angular.element(document.getElementById('firstName'))[0].disabled = true;
								angular.element(document.getElementById('lastName'))[0].disabled = true;
								angular.element(document.getElementById('address'))[0].disabled = true;
								angular.element(document.getElementById('contact'))[0].disabled = true;
								angular.element(document.getElementById('password'))[0].disabled = true;
								angular.element(document.getElementById('Confirmpassword'))[0].disabled = true;
								angular.element(document.getElementById('addButton'))[0].disabled = true;
							}
							else
								{$scope.error="";
								angular.element(document.getElementById('firstName'))[0].disabled = false;
								angular.element(document.getElementById('lastName'))[0].disabled = false;
								angular.element(document.getElementById('address'))[0].disabled = false;
								angular.element(document.getElementById('contact'))[0].disabled = false;
								angular.element(document.getElementById('password'))[0].disabled = false;
								angular.element(document.getElementById('Confirmpassword'))[0].disabled = false;
								angular.element(document.getElementById('addButton'))[0].disabled = false;
								
								}
						});		}	
			}
			
		
			$scope.waitForServiceLoad = function() {
				  if (appEndpointSF.is_service_ready) {					  
					//  $scope.getInstitutes();	
				  } 
				  else {
				   $log.debug("Services Not Loaded, watiting...");
				   $timeout($scope.waitForServiceLoad, 1000);
				  }
				 }
				  
				 $scope.waitForServiceLoad();
		});
