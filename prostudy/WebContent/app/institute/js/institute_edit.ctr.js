angular.module("prostudyApp").controller(
		"instituteEditCtr",
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

				$scope.modify = function(selectedInstitute) {
					$scope.editingData[selectedInstitute.name] = true;
					$scope.institute = selectedInstitute;
				};

				$scope.update = function(institutes) {
					$scope.editingData[institutes.name] = false;
				};// end of update

				$scope.removeInstitute = function(index) {
					$scope.institutes.splice(index, 1);
				}; // end of remove

				$scope.selected = [];

			}// end of loadInstituteList load

			$scope.loadInstituteList();

		});
