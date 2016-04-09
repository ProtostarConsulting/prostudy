angular.module("prostudyApp").controller(
		"instituteAddStudCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state, $stateParams) {
			
			$scope.showStudentSavedToast = function() {
				$mdToast.show($mdToast.simple().content(
						'Institute Student Added!').position("top").hideDelay(
						3000));
			};
			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();			
			$scope.isGoogleUser = false;
			$scope.flag3 = true;	
			$scope.checkUserAlreadyExist = appEndpointSF.getUtilityService().checkUserAlreadyExist;
			$scope.checkConfirmPassword = appEndpointSF.getUtilityService().checkConfirmPassword;
			
			$scope.currentInstID = $scope.curUser.instituteID;
					
			if($stateParams.currentInstID)
			{
				$scope.currentInstID = $stateParams.currentInstID;
				
			}
			
			$scope.tempStudent = {
					'instituteID' : $scope.currentInstID,
					'institute' : "",
					'firstName' : "",
					'lastName' :"" ,
					'email_id' :"" ,
					'address' :"",
					'contact' :"",
					'role' : "Student",
					'standard' : "" ,
					'division' : "",
					'subject' : "",
					'password' :"",
					'isGoogleUser' : $scope.isGoogleUser					
				};
			
			$scope.currentStdID = $stateParams.currentStdID;
			$scope.currentDivID = $stateParams.currentDivID;

			$scope.isDisabled = false;
			$scope.disableButton = function() {
				$scope.isDisabled = true;
			}
			
				
			$scope.standard= {
					
					instituteID : $scope.currentInstID,
					name : ""
			};
			
			$scope.division= {
					
					standardID : $scope.currentStdID,
					name : ""
			};
		
			
			$scope.subjectList = [];
			$scope.addSubjects = function() {
				$scope.subjectList.push({
					'divisionID' : $scope.currentDivID,
					'name' : $scope.name,
					
				});
				$scope.name = '';
				
			};
			
			$scope.query = {
				order : 'description',
				limit : 5,
				page : 1
			};

			$scope.onpagechange = function(page, limit) {
				var deferred = $q.defer();

				$timeout(function() {
					deferred.resolve();
				}, 2000);

				return deferred.promise;
			};

			$scope.onorderchange = function(order) {
				var deferred = $q.defer();

				$timeout(function() {
					deferred.resolve();
				}, 2000);

				return deferred.promise;
			};			
			
			$scope.addInstituteStudents = function() {
				var UserService = appEndpointSF.getUserService();
				
					UserService.addUser($scope.tempStudent).then(function(msgBean) {
						$scope.email_id=msgBean.email_id;
					$log.debug("$scope.email_id"+$scope.email_id);
						$state.go("institute.studFillbasics", {currstud:$scope.email_id,currentInstID:$scope.currentInstID});
				});
				$scope.showStudentSavedToast();				

			}		

			
		});
