angular.module("prostudyApp").controller(
		"gfBookAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state, $stateParams, $mdDialog,
				objectFactory) {
			$scope.answerOfMediumList = [ "Marathi", "Hindi", "English", ];
			
			$scope.tempBookStock = {
					bookName : '',
					bookAuther : '',
					weight : '',
					bookPrice : '',
					bookPublication : '',
					bookFeedDate : new Date(),
			}

			$scope.selectedGFBookID = $stateParams.selectedGFBookID;

			$scope.addGFBook = function() {
				$scope.tempBookStock.instituteID = $scope.curUser.instituteID;

				var gfBookStockService = appEndpointSF.getGFBookStockService();

				gfBookStockService.addGFBook($scope.tempBookStock).then(
						function() {

							$scope.gfBookStockForm.$setPristine();
							$scope.gfBookStockForm.$setValidity();
							$scope.gfBookStockForm.$setUntouched();
							

						});
				if ($scope.selectedGFStudID == "") {
					$scope.showAddToast();
					$state.reload();
				} else {
					$scope.showUpdateToast();
				}
				$scope.tempBookStock  = {};
				
			}

			$scope.getGFBookById = function() {

				var gfBookStockService = appEndpointSF.getGFBookStockService();
				
				gfBookStockService.getGFBookById($scope.selectedGFBookID)
						.then(function(tempBookStock) {
							
							$scope.tempBookStock = tempBookStock;
						
						});
			}

			$scope.getPartnerByInstitute = function() {

				var PartnerSchoolService = appEndpointSF
						.getPartnerSchoolService();
				PartnerSchoolService.getPartnerByInstitute(
						$scope.curUser.instituteID).then(function(pSchoolList) {
					$scope.pSchoolList = pSchoolList;

				});
			}

			$scope.cancel = function() {
				$state.go('gandhifoundation');
			}

			$scope.waitForServiceLoad = function() {
				if (appEndpointSF.is_service_ready) {

					if ($scope.selectedGFBookID != "") {
						$scope.getGFBookById();
					}
					$scope.getPartnerByInstitute();

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
