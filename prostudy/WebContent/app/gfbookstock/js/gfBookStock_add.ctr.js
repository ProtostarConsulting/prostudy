angular.module("prostudyApp").controller(
		"gfBookStockAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state, $stateParams, $mdDialog,
				objectFactory) {
			
			
			$scope.answerOfMediumList = [ "Marathi", "Hindi", "English", ];
			$scope.tempBook = {
					book : '',
					medium : '',
					bookQty : '',
					feedStockDate : new Date(),
			}

			$scope.selectedGFBookStockID = $stateParams.selectedGFBookStockID;

			$scope.addGFBookStock = function() {
				$scope.tempBook.instituteID = $scope.curUser.instituteID;

				var gfBookStockService = appEndpointSF.getGFBookStockService();

				gfBookStockService.addGFBookStock($scope.tempBook).then(
						function() {

							$scope.gfBookStockForm.$setPristine();
							$scope.gfBookStockForm.$setValidity();
							$scope.gfBookStockForm.$setUntouched();
							

						});
				if ($scope.selectedGFStudID == "") {
					$scope.showAddToast();
				} else {
					$scope.showUpdateToast();
				}
				$scope.tempBook = {};
			}

			$scope.getGFBookByInstituteId = function() {

				var gfBookStockService = appEndpointSF.getGFBookStockService();
				gfBookStockService.getGFBookByInstituteId($scope.curUser.instituteID)
						.then(function(tempBooks) {
							
							$scope.tempBooks = tempBooks;
						
						});
			}

			$scope.getPartnerSchoolByInstitute = function() {

				var PartnerSchoolService = appEndpointSF
						.getPartnerSchoolService();
				PartnerSchoolService.getPartnerSchoolByInstitute(
						$scope.curUser.instituteID).then(function(pSchoolList) {
					$scope.pSchoolList = pSchoolList;

				});
			}

			$scope.cancel = function() {
				$state.go('gandhifoundation');
			}

			$scope.waitForServiceLoad = function() {
				if (appEndpointSF.is_service_ready) {

					if ($scope.selectedGFBookStockID != "") {
						$scope.getGFBookStockById();
					}
					$scope.getPartnerSchoolByInstitute();
					$scope.getGFBookByInstituteId();
				} else {
					$log.debug("Services Not Loaded, watiting...");
					$timeout($scope.waitForServiceLoad, 1000);
				}
			}

			$scope.waitForServiceLoad();

			$scope.query = {
				order : 'description',
				limit : 5,
				page : 1
			};

		});
