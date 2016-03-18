angular.module("prostudyApp").controller(
		"myPracticeExamsModuleCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $location, objectFactory, appEndpointSF,
				tableTestDataFactory, $state) {

			$scope.exams = [];
			$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();
					
			$scope.getMyExamList = function() {

				var UserService = appEndpointSF.getUserService();
				UserService.getMyExamList($scope.curUser.email_id).then(
						function(examList) {
							$scope.exams = examList;
						});
			}		
			$scope.getMyExamList();

	
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
		});