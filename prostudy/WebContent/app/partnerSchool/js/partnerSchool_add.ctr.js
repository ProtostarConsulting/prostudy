angular
		.module("prostudyApp")
		.controller(
				"partnerSchoolAddCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, tableTestDataFactory, $state,
						$stateParams, appEndpointSF, partnerSchoolLevels) {

					console.log("Inside partnerSchoolAddCtr");
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.partnerSchoolLevels = partnerSchoolLevels;

					// ----------tab control-------
					$scope.max = 3;
					$scope.selectedIndex = 0;
					$scope.tabNext = function() {
						var index = ($scope.selectedIndex == $scope.max) ? 0
								: $scope.selectedIndex + 1;
						$scope.selectedIndex = index;

					}
					// ----------------------------

					// -------------language-------
					$scope.languages = [ "Hindi", "Marathi", "English" ];
					$scope.selected = [];
					$scope.toggle = function(item, list) {
						var idx = list.indexOf(item);
						if (idx > -1) {
							list.splice(idx, 1);
						} else {
							list.push(item);
						}
						/* $log.debug("=="+$scope.selected); //work fine */
					};
					$scope.exists = function(item, list) {
						return list.indexOf(item) > -1;

					};
					// ----------------------------
					// -----------online ofline------
					/*
					 * $scope.data = { $scope.modeOfExam = 'OffLine';
					 * $scope.bookRequired = 'OffLine'; };
					 */
					// ----------------------------
					$scope.partnerSchool = {
						address : $scope.Address,
						examDetail : "",
						contactDetail : "",
						bookSummary : "",
						instituteID : '',
						schoolName : "",
						desc : "",
						formNumber : "",
						category : "",
						primaryContact : ""

					};
					$scope.examDetail = {
						totalStudent : "",
						male : "",
						female : "",
						total : "",
						examMedium : $scope.selected,
						yearOfExam : "",
						bookRequired : 'OffLine',
						modeOfExam : 'OffLine',
					}
					$scope.contactDetail = {
						headMasterName : "",
						headMasterMobile : "",
						headMasterEmailId : "",
						coordinatorName : "",
						coordinatorPhoneNum : "",
						coordinatorEmailId : "",

					}
					$scope.Address = {
						line1 : "",
						line2 : "",
						city : "",
						state : "",
						country : "",
						pin : ""
					}

					$scope.bookSummary = {
						bookDetail : "",
						total : 0,
						amtForInst20per : 0,
						amtForGRF80per : 0
					}

					// attached the bookdetail to book summery entity
					$scope.bookDetail = {
						bookName : "",
						bookPrise : "",
						hindinum : "",
						marathinum : "",
						englishnum : "",
						totalStud : "",
						totalFees : ""
					}
					// get last next 4 year to show academic year
					$scope.getNextYears = function() {
						var date = new Date();
						for (var i = 0; i < 4; i++) {
							var year = date.getFullYear();
							year = year.toString().substr(2, 2);

							$scope.Years.push(date.getFullYear() + "-"
									+ (Number(year) + 1));
							date.setYear(date.getFullYear() + 1);
						}
					}

					$scope.Years = [];
					$scope.getNextYears();

					$scope.calculateTotal = function() {
						$scope.examDetail.total = Number($scope.examDetail.male)
								+ Number($scope.examDetail.female);
					}

					$scope.selectedPSchoolId = $stateParams.selectedPSchoolId;
					$log.debug("$scope.selectedPSchoolId :"
							+ $scope.selectedPSchoolId);

					$scope.schoolid;
					$scope.addPartnerSchool = function() {
						$scope.tabNext();
						if ($scope.schoolid != undefined
								&& $scope.selectedPSchoolId == "") {
							$scope.partnerSchool.id = $scope.schoolid.id;
						}
						$scope.partnerSchool.instituteID = $scope.curUser.instituteID;
						// $scope.partnerSchool.address = $scope.Address;
						$scope.partnerSchool.examDetail = $scope.examDetail;
						$scope.partnerSchool.contactDetail = $scope.contactDetail;
						$scope.partnerSchool.bookSummary.bookDetail = $scope.books;
						$scope.partnerSchool.bookSummary = $scope.bookSummary;

						var PartnerSchoolService = appEndpointSF
								.getPartnerSchoolService();

						PartnerSchoolService.addPartnerSchool(
								$scope.partnerSchool).then(function(schoolid) {
							$scope.schoolid = schoolid;
							if ($scope.selectedPSchoolId != undefined) {
								$scope.showUpdateToast();
							} else {
								$scope.showAddToast();
							}

						});

					}
					$scope.resetState = function() {
						$state.reload();
					}

					$scope.getPSchoolByPSID = function() {
						var PartnerSchoolService = appEndpointSF
								.getPartnerSchoolService();
						if ($scope.selectedPSchoolId != "") {
							PartnerSchoolService
									.getPSchoolByPSID($scope.selectedPSchoolId)
									.then(
											function(pSchool) {
												$scope.partnerSchool = pSchool;
												$scope.partnerSchool.formNumber = Number($scope.partnerSchool.formNumber);
												$scope.examDetail = $scope.partnerSchool.examDetail;
												$scope.contactDetail = $scope.partnerSchool.contactDetail;
												$scope.Address = $scope.partnerSchool.Address;
												$scope.selected = $scope.partnerSchool.examDetail.examMedium;
												if ($scope.partnerSchool.bookSummary.bookDetail != undefined) {
													$scope.books = $scope.partnerSchool.bookSummary.bookDetail;
													$scope.bookSummary = $scope.partnerSchool.bookSummary;
												} else {
													$scope
															.getGFBookStockByInstituteId();
												}

											});
						}
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							if ($scope.selectedPSchoolId != undefined) {
								$scope.getPSchoolByPSID();
							}

						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();
					$scope.cancelButton = function() {

						$state.go('^', {});
					};

					$scope.back = function() {
						window.history.back();
						// $state.go("^", {});
					};

					$scope.getGFBookStockByInstituteId = function() {

						var gfBookStockService = appEndpointSF
								.getGFBookStockService();
						gfBookStockService
								.getGFBookStockByInstituteId(
										$scope.curUser.instituteID)
								.then(
										function(tempBooks) {

											$scope.bookStocks = tempBooks;
											for (i = 0; i < $scope.bookStocks.length; i++) {
												$scope.bookDetail = {};
												$scope.bookDetail.bookName = $scope.bookStocks[i].book.bookName;
												$scope.bookDetail.bookPrise = $scope.bookStocks[i].book.bookPrice;
												$scope.bookDetail.hindinum = 0;
												$scope.bookDetail.marathinum = 0;
												$scope.bookDetail.englishnum = 0;
												$scope.bookDetail.totalStud = 0;
												$scope.bookDetail.totalFees = 0;
												$scope.books[i] = $scope.bookDetail;
												// $log.debug("$scope.books===="+
												// $scope.books);

											}

										});
					}

					$scope.bookStocks = [];
					$scope.books = [];

					// -----------------calculate book detail---------------

					$scope.calculate = function(index, val, name) {

						// book array use to save

						$log.debug("index=" + index + "val=" + val + "name"
								+ name);
						if (name == "hindi") {
							$scope.books[index].hindinum = val;

						}
						if (name == "marathi") {
							$scope.books[index].marathinum = val;
						}
						if (name == "english") {
							$scope.books[index].englishnum = val;
						}
						$scope.books[index].totalStud = $scope.books[index].hindinum
								+ $scope.books[index].marathinum
								+ $scope.books[index].englishnum;
						$scope.books[index].totalFees = $scope.books[index].totalStud
								* $scope.books[index].bookPrise;

						$scope.bookSummary.total = 0;
						for (count = 0; count < $scope.books.length; count++) {
							$scope.bookSummary.total += $scope.books[count].totalFees;
							$scope.bookSummary.amtForInst20per = Math
									.round(($scope.bookSummary.total / 100) * 20);
							$scope.bookSummary.amtForGRF80per = Math
									.round(($scope.bookSummary.total / 100) * 80);
						}
					}

					$scope.waitForServiceLoad1 = function() {
						if (appEndpointSF.is_service_ready) {
							if ($scope.selectedPSchoolId == "") {
								$scope.getGFBookStockByInstituteId();
							}
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad1, 1000);
						}
					}

					$scope.waitForServiceLoad1();

				});
