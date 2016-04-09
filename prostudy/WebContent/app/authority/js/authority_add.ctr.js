angular.module("prostudyApp").controller(
		"authorityAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $location, objectFactory, appEndpointSF,
				tableTestDataFactory, $state) {

			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Saved Successfully!')
						.position("top").hideDelay(3000));
			};

			$scope.moduleList = [ "Home", "Authority", "Exam", "Student", "Syllabus",
					"Institute", "Attendance", "Book", "Favourite", "Report","Certificate Management","Admission Management"]

			$scope.toggleSelection = function toggleSelection(index) {
				$scope.selected[index] = !$scope.selected[index];
			};
			
			$scope.selected = [];
			
			$scope.RoleSecEntity = {
				role : "",
				modules : []
			}
		

			$scope.addOrUpdateRoleSec = function() {
				$scope.RoleSecEntity.modules = [];
				for (var i = 0; i < $scope.selected.length; i++) {
					if ($scope.selected[i])
						$scope.RoleSecEntity.modules.push($scope.moduleList[i]);
				}

				var UserService = appEndpointSF.getLocalUserService();

				UserService.addOrUpdateRoleSec($scope.RoleSecEntity).then(
						function(msgBean) {
							$scope.showSavedToast();
							$scope.RoleSecEntity = {};
						});
				
				$state.go("authority");

			}

		});
