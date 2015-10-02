angular.module("stockApp").controller(
		"studentPageCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, objectFactory) {

			$log.debug("Inside studentPageCtr");

			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('Student Data Saved!').position(
						"top").hideDelay(3000));
			};

			$scope.addStudentToDB = function() {
				$log.debug("in side addStudent. added..."
						+ $scope.studentVM.firstName);
				$scope.showSimpleToast();
			};// end of call to addStudent

			$scope.studentVM = objectFactory.newStudent();

			/* Setup menu */
			$scope.toggleRight = buildToggler('right');
			/**
			 * Build handler to open/close a SideNav; when animation finishes
			 * report completion in console
			 */
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