angular.module("prostudyApp").controller(
		"studentPageCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, objectFactory, appEndpointSF, tableTestDataFactory,
				appEndpointSF, standardList) {

			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('Student Data Saved!')
						.position("top").hideDelay(3000));
			};

			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();

			$log.debug("Inside studentPageCtr");
			$scope.instiID;
			$scope.selectedInstitute;
			$scope.institutes = [];
			$scope.institute1 = {};
			$scope.standards = [ {} ];
			$scope.standards = standardList;

			$scope.tempStudent = {
				ID : "",
				instituteID : $scope.curUser.instituteID,
				firstName : "",
				lastName : "",
				email_id : "",
				address : "",
				contact : "",
				role : "Student",
			};
			$scope.students = [];

			$scope.addStudent = function() {
				$log.debug("No1");
				var UserService = appEndpointSF.getUserService();

				UserService.addUser($scope.tempStudent).then(function(msgBean) {

					$log.debug("Inside Ctr addStudent");
					$scope.showSimpleToast();
					$scope.tempStudent = {
							firstName : "",
							lastName : "",
							email_id : "",
							address : "",
							contact : "",
							
						};

				});

			}


		});