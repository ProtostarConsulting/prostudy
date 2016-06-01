angular
		.module("prostudyApp")
		.controller(
				"gfCourierAddCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, appEndpointSF, $state, $stateParams,
						$mdDialog, objectFactory) {

					$scope.courierTypelist = [ "Book", "Certificate",
							"Error Certificate", "Error books",
							"Prize Certificate" ];
					$scope.logisticsList = [ "By Post", "By Hand", "ST Postal",
							"Tej Courier" ];
					$scope.registrationIDList = [ "MH100001", "MH100002",
							"MH100003", "MH100004", "KA100001", "KA100002" ];

					$scope.tempCourierObj = {
						courierType : '',
						logistics : '',
						registrationID : '',
						weight : '',
						courierFrom : '',
						courierTo : '',
						schoolName : '',
						courierDispatchDate : new Date(),
						bookQty : 0,
						bookLineItemList : [],
						otherLineItemList : []
					}

					$scope.selectedGFCourierID = $stateParams.selectedGFCourierID;

					$scope.addGFCourier = function() {
						$scope.tempCourierObj.instituteID = $scope.curUser.instituteID;

						var gfCourierService = appEndpointSF
								.getGFCourierService();

						gfCourierService.addGFCourier($scope.tempCourierObj)
							.then(function() {

									$scope.gfCourierForm.$setPristine();
									$scope.gfCourierForm.$setValidity();
									$scope.gfCourierForm.$setUntouched();

								});
						if ($scope.selectedGFStudID == "") {
							$scope.showAddToast();
						} else {
							$scope.showUpdateToast();
						}
						$scope.tempCourierObj = {};
					}

					$scope.getGFCourierById = function() {

						var gfCourierService = appEndpointSF
								.getGFCourierService();
						gfCourierService
								.getGFCourierById($scope.selectedGFCourierID)
								.then(
										function(tempCourier) {

											$scope.tempCourierObj = tempCourier;
											$scope.tempCourierObj.courierDispatchDate = new Date(
													$scope.tempCourierObj.courierDispatchDate);
											// $scope.tempCourier.schoolName =
											// new
											// Date($scope.tempCourier.courierDispatchDate);
											$scope.tempCourierObj.schoolName = $scope.tempCourierObj.schoolName.schoolName;

										});
					}

					$scope.getPartnerByInstitute = function() {

						var PartnerSchoolService = appEndpointSF
								.getPartnerSchoolService();
						PartnerSchoolService.getPartnerByInstitute(
								$scope.curUser.instituteID).then(
								function(pSchoolList) {
									$scope.pSchoolList = pSchoolList;

								});
					}

					$scope.getGFBookByInstituteId = function() {

						var gfBookStockService = appEndpointSF
								.getGFBookStockService();
						gfBookStockService.getGFBookByInstituteId(
								$scope.curUser.instituteID).then(
								function(bookList) {
									$scope.bookList = bookList;

								});
					}

					$scope.addBook = function() {
						var item = {
							srNo : $scope.tempCourierObj.bookLineItemList.length + 1,
							bookName : "",
							bookAuther : "",
							weight : "",
							bookPrice : "",
							bookQty : ""
						};

						$scope.tempCourierObj.bookLineItemList.push(item);
					};

					$scope.lineItemStockChange = function(index, stockItem) {

						var lineSelectedItem = $scope.tempCourierObj.bookLineItemList[index];
						lineSelectedItem.bookName = stockItem.bookName;
						lineSelectedItem.bookQty = stockItem.bookQty;
						lineSelectedItem.bookPrice = stockItem.bookPrice;
						lineSelectedItem.bookAuther = stockItem.bookAuther;
						lineSelectedItem.weight = stockItem.weight;
					};

					$scope.removeItem = function(index) {
						$scope.tempCourierObj.bookLineItemList.splice(index, 1);
					};

					$scope.cancel = function() {
						$state.go('gandhifoundation');
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {

							if ($scope.selectedGFCourierID != "") {
								$scope.getGFCourierById();
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
