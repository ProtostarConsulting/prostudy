angular.module("prostudyApp").controller(
		"gfBookStockAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state, $stateParams, $mdDialog,
				objectFactory) {
			
			
			$scope.answerOfMediumList = [ "Marathi", "Hindi", "English", ];
			$scope.tempBookStock = {
					book : '',
					bookQty : '',
					feedStockDate : new Date(),
					transactionType : 'Cr'
			}

			$scope.selectedGFBookStockID = $stateParams.selectedGFBookStockID;

			$scope.addGFBookStock = function() {
				$scope.tempBookStock.instituteID = parseInt($scope.curUser.instituteID);

				var gfBookStockService = appEndpointSF.getGFBookStockService();

				gfBookStockService.addGFBookStock($scope.tempBookStock).then(
						function(resp) {
							
							$scope.gfBookStockForm.$setPristine();
							$scope.gfBookStockForm.$setValidity();
							$scope.gfBookStockForm.$setUntouched();
							

						});
				if ($scope.selectedGFStudID == "") {
					$scope.showAddToast();
				} else {
					$scope.showUpdateToast();
				}
				$scope.tempBookStock = {};
				$state.reload();
			}

			$scope.getGFBookByInstituteId = function() {

				var gfBookStockService = appEndpointSF.getGFBookStockService();
				gfBookStockService.getGFBookByInstituteId($scope.curUser.instituteID)
						.then(function(tempBookStocks) {
							
							$scope.tempBookStocks = tempBookStocks;
						
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

					if ($scope.selectedGFBookStockID != "") {
						$scope.getGFBookStockById();
					}
					$scope.getPartnerByInstitute();
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
