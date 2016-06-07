angular.module("prostudyApp").controller(
		"gfBookAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state, $stateParams, $mdDialog,
				objectFactory,standardList) {
			$scope.answerOfMediumList = [ "Marathi", "Hindi", "English", ];

			$scope.tempBook = {
				bookName : '',
				bookAuther : '',
				weight : 0,
				bookPrice : 0,
				bookQty : 0,
				bookMedium : '',
				bookPublication : '',
				bookFeedDate : new Date(),
			}

			$scope.standardList = standardList;
			
			$scope.selectedGFBookID = $stateParams.selectedGFBookID;

			$scope.addGFBook = function() {
				$scope.tempBook.instituteID = $scope.curUser.instituteID;

				var gfBookStockService = appEndpointSF.getGFBookStockService();

				gfBookStockService.addGFBook($scope.tempBook).then(
						function(resp) {
							$scope.backObj = resp;
							$scope.addTranAfterAddBook();
							if (resp.id != undefined) {
								$scope.gfBookStockForm.$setPristine();
								$scope.gfBookStockForm.$setValidity();
								$scope.gfBookStockForm.$setUntouched();

								if ($scope.selectedGFStudID == "") {
									$scope.showAddToast();
									$state.reload();
								} else {
									$scope.showUpdateToast();
								}
								$scope.tempBook = {};
							} else {
								$scope.showFailToast();
								$state.reload();
							}
							
						});
				
				$state.reload();
			}

		
			$scope.addTranAfterAddBook = function(){
				var gfBookStockService = appEndpointSF.getGFBookStockService();

				gfBookStockService.addTranAfterAddBook($scope.backObj).then(
						function(resp) {
							
						});	
			}
			
			$scope.getGFBookById = function() {

				var gfBookStockService = appEndpointSF.getGFBookStockService();

				gfBookStockService.getGFBookById($scope.selectedGFBookID).then(
						function(tempBook) {

							$scope.tempBook = tempBook;

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

			$scope.showFailToast = function() {
				$mdToast.show($mdToast.simple().content(
						'This book is Already Added.').position("top")
						.hideDelay(3000));
			};
		});
