angular.module("prostudyApp").controller(
		"instituteAddStudCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state, $stateParams) {
			
			$scope.showStudentSavedToast = function() {
				$mdToast.show($mdToast.simple().content(
						'Institute Student Added!').position("top").hideDelay(
						3000));
			};
			
			
			
			$scope.selectedStandard;
			$scope.selectedDivision;
			$scope.selectedSubject;

			$scope.isGoogleUser = false;
		
			$scope.selectedStandards = [];
			$scope.selectedDivisions = [];
			$scope.selectedSubjects = [];
			
			$scope.standards = [];
			$scope.divisions = [];
			$scope.subjects = [];

			$scope.selectedStdID;
			$scope.stdList;
			$scope.divList;
			$scope.subList;
			
			
			 $scope.isGoogleUser;			
			
			$scope.currentInstID = $stateParams.currentInstID;

			$log.debug("$scope.currentInstIDStud:" + $scope.currentInstID);

			$scope.currentStdID = $stateParams.currentStdID;
			$scope.currentDivID = $stateParams.currentDivID;

			$scope.isDisabled = false;
			$scope.disableButton = function() {
				$scope.isDisabled = true;
			}
	
			
			$scope.tempStudent = {
					'instituteID' : $scope.currentInstID,
					'institute' : $scope.name,
					'firstName' : $scope.firstName,
					'lastName' : $scope.lastName,
					'email_id' : $scope.email_id,
					'address' : $scope.address,
					'contact' : $scope.contact,
					'role' : "Student",
					'standard' : "" ,
					'division' : "",
					'subject' : "",
					'password' : $scope.password,
					'isGoogleUser' : $scope.isGoogleUser
				};
				
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
			
			$scope.showMsg = function() {
				alert('INSTITUTE DETAILS SAVED SUCCESSFULLLY...');
			};

			$scope.addInstituteStudents = function() {
				var UserService = appEndpointSF.getUserService();
				
					UserService.addUser($scope.tempStudent).then(function(msgBean) {
					
				});
				$scope.showStudentSavedToast();
				$scope.showMsg();
				$state.go("institute");

			}
			

			$scope.getStandardByInstitute = function() {

				var StandardService = appEndpointSF
						.getStandardService();
				StandardService.getStandardByInstitute($scope.currentInstID).then(
						function(standardList) {
							for(var i=0; i< standardList.length; i++)
								{
									$scope.standards.push(standardList[i].name);
									
								}
							$scope.stdList = standardList;
							
						});
			}
			
			$scope.getStandardByInstitute();
			
			$scope.getDivisionByStandard = function() {
			
				for(var i=0;i< $scope.stdList.length;i++)
				{
					if($scope.tempStudent.standard == $scope.stdList[i].name)
					{
						$scope.selectedStdID = $scope.stdList[i].id;
					}
				}
				var DivisionService = appEndpointSF
						.getDivisionService();
				DivisionService.getDivisionByStandard($scope.selectedStdID).then(
						function(divisionList) {
							for(var i=0; i< divisionList.length; i++)
							{
								$scope.divisions.push(divisionList[i].name);
							}
							$scope.divList = divisionList;
						});
			}
			
			$scope.getSubjectByDivision = function() {
				
				for(var i=0;i<$scope.divList.length;i++)
				{
					if($scope.tempStudent.division == $scope.divList[i].name)
					{
						$scope.selectedDivID = $scope.divList[i].id;
					}
				}
				var SubjectService = appEndpointSF.getSubjectService();
				SubjectService.getSubjectByDivision($scope.selectedDivID).then(
						function(subjectList) {
							for(var i=0; i< subjectList.length; i++)
							{
								$scope.subjects.push(subjectList[i].name);
							}

						});
				$scope.subjects.splice(0,$scope.subjects.length);
			}
			
			 $scope.selected = [];
		      $scope.toggle = function (subject, list) {
		        var idx = list.indexOf(subject);
		        if (idx > -1) list.splice(idx, 1);
		        else list.push(subject);
		      };
		      $scope.exists = function (subject, list) {
		        return list.indexOf(subject) > -1;
		      };
			
		});
