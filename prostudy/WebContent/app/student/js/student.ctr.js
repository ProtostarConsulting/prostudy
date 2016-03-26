angular.module("prostudyApp")
/*.directive('validPasswordC', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != $scope.studentForm.password.$viewValue             
                ctrl.$setValidity('noMatch', !noMatch)
            })
        }
    }
})
*/
.controller(
		"studentPageCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, objectFactory, appEndpointSF, tableTestDataFactory,$state,
				appEndpointSF) {

			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Student Data Saved!')
						.position("top").hideDelay(3000));
			};
					  			
			$scope.standards = [];
			$scope.divisions = [];
			$scope.subjects = [];

			$scope.selectedStdID;
			$scope.stdList;
			$scope.divList;
			$scope.subList;
			
			$scope.checkConfirmPassword = appEndpointSF.getUtilityService().checkConfirmPassword;
			
			$scope.tempStudent = {
				instituteID :$scope.curUser.instituteID,
				firstName : "",
				lastName : "",
				isGoogleUser : false,
				email_id : "",
				password :"",
				standard : "",
				division : "",
				subject : "",
				address : "",
				contact : "",
				role : 'Student',
				myBooks :[],
				myExams : []
			};
			
			$scope.getStandardByInstitute = function() {

				var StandardService = appEndpointSF
						.getStandardService();
				StandardService.getStandardByInstitute($scope.curUser.instituteID).then(
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
			
			
			$scope.addStudent = function() {
				var UserService = appEndpointSF.getUserService();

				UserService.addUser($scope.tempStudent).then(function(msgBean) {
	 
						$scope.showSavedToast();
						$scope.tempStudent = {};
						$state.go("^", {});

				});
				
			}

			$scope.cancelButton = function() {
				$state.go("^", {});
			}

		});
