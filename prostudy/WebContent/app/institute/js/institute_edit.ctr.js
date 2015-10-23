angular.module("prostudyApp").controller(
		"instituteEditCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF) {

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Institute Saved!')
						.position("top").hideDelay(3000));
			};

			$scope.selected = [];

			$scope.addInstitute = function() {
				var InstituteService = appEndpointSF.getInstituteService();
				$scope.institutes = InstituteService
						.addInstitute($scope.tempInstitute);
				$scope.tempInstitute = {
					name : "",
					city : "",
					state : ""
				};
				$scope.showSavedToast();
			}

			$scope.getInstitutes = function() {
				$scope.institutes = appEndpointSF.getInstituteService()
						.getInstitutes();
				$log.debug("Inside getInstitutes...");
				$log.debug("$scope.institutes:" + $scope.institutes);
			}

			$scope.tempInstitute = {
				name : "",
				city : "",
				state : ""
			};
			// $scope.institutes =[];

			$scope.getInstitutes();

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
			

		});
