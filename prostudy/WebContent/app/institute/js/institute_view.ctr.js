angular.module("prostudyApp").controller(
		"instituteViewCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, tableTestDataFactory) {

			$scope.loadInstituteList = function() {
				console.log("inside loadInstituteList")
				$scope.institutes = [];
				$scope.selected = [];
				tableTestDataFactory.getInstituteList().then(
						function(data) {
							$scope.institutes = data;
							$log.debug("inside ctr then $scope.institutes"
									+ $scope.institutes);
							console.log("inside institute")
						});

				$scope.editingData = [];

			}// end of loadInstituteList load

			$scope.loadInstituteList();

		});
