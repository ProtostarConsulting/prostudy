angular
		.module("prostudyApp")
		.controller(
				"partnerSchoolAddCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, tableTestDataFactory, $state,
						$stateParams, appEndpointSF, partnerSchoolLevels,
						standardList) {

					console.log("Inside partnerSchoolAddCtr");
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.partnerSchoolLevels = partnerSchoolLevels;
					$scope.standardList = standardList;
					// ----------tab control-------
					$scope.max = 4;
					$scope.selectedIndex = 0;
					$scope.tabNext = function() {
						var index = ($scope.selectedIndex == $scope.max) ? $scope.selectedIndex
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
					// ---auto ganereted number
					// ------------------------
					$scope.partnerSchool = {
						address : $scope.Address,
						examDetailList : [],
						contactDetail : "",
						autoGenerated : "",
						govRegisterno : "",
						instituteID : "",
						schoolName : "",
						instName : "",
						formNumber : "",
						category : "",
						primaryContact : ""

					};
					$scope.examDetail = {
						totalStudent : "",
						male : "",
						female : "",
						total : "",
						/* examMedium : $scope.selected, */
						yearOfExam : "",
						bookRequired : 'OffLine',
						modeOfExam : 'OffLine',
						bookSummary : "",
						paymentDetail : $scope.PaymentDetail,

					}
					$scope.contactDetail = {
						headMasterName : "",
						headMasterMobile : "",
						headMasterPhone : "",
						headMasterEmailId : "",
						coordinatorDetail : [ {
							srno : 1,
							coordinatorName : "",
							coordinatorPhoneNum : "",
							coordinatorMobileNum : "",
							coordinatorEmailId : "",
						} ]

					}

					$scope.Address = {
						line1 : "",
						dist : "",
						city : "",
						state : "",
						country : "",
						pin : "",
						tal : ""
					}

					$scope.bookSummary = {
						bookDetail : [ {
							standard : "",
							bookName : "",
							bookPrise : 0,
							totalStud : 0,
							totalFees : 0
						} ],
						total : 0,
						amtForInst20per : 0,
						amtForGRF80per : 0
					}

					// attached the bookdetail to book summery entity
					$scope.bookDetail = {
						standard : "",
						bookName : "",
						bookPrise : 0,
						totalStud : 0,
						totalFees : 0

					}

					$scope.PaymentDetail = {
						payReceivedBy : "",
						paymentDate : new Date(),
						payAmount : 0,
						note : "",
						tPaid : 0,
						pAmount : 0,
						nameOfBank:"",
						branchName:"",
						transactionNumber:"",
						depositDate:new Date(),
						
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
						
						$scope.waitForServiceLoad2();
						if ($scope.PaymentDetail.payReceivedBy != "") {
							$scope.PaymentDet.push($scope.PaymentDetail);
							$scope.examDetail.paymentDetail = $scope.PaymentDet;
							$scope.PaymentDetail = {
								payReceivedBy : "",
								paymentDate : new Date(),
								payAmount : 0,
								note : "",
								tPaid : 0,
								pAmount : 0
							}

						}
						$scope.examDetail.bookSummary = $scope.bookSummary;
						$scope.partnerSchool.instituteID = $scope.curUser.instituteID;
						$scope.partnerSchool.contactDetail = $scope.contactDetail;

						if ($scope.schoolid != undefined
								&& $scope.selectedPSchoolId != "") {
							$scope.partnerSchool.id = $scope.schoolid.id;
							$scope.partnerSchool.examDetailList = $scope.examlist;
						} else {
							$scope.partnerSchool.examDetailList[0] = $scope.examDetail;
						}

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
						$scope.waitForServiceLoad2();

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

												$scope.contactDetail = $scope.partnerSchool.contactDetail;
												$scope.Address = $scope.partnerSchool.Address;
												$scope.examlist = $scope.partnerSchool.examDetailList;
												$scope.getExamByYear();
												$scope.waitForServiceLoad2();
											});

						}

					}

					$scope.examlist = [];

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
					// -----------get Exam by Year------------
					$scope.getExamByYear = function(year1) {
						if (year1 == undefined) {
							var date1 = new Date();
							var year1 = date1.getFullYear();
							year1 = year1.toString().substr(2, 2);
							year1 = date1.getFullYear() + "-"
									+ (Number(year1) + 1);
						}
						var k = 0;
						for (q = 0; q < $scope.examlist.length; q++) {
							if ($scope.examlist[q].yearOfExam == year1) {
								$scope.examDetail = $scope.examlist[q];
								$scope.bookSummary = $scope.examlist[q].bookSummary;
								if ($scope.examlist[q].paymentDetail != undefined) {
									$scope.PaymentDet = $scope.examlist[q].paymentDetail;
								}
								k = 1;
							}

						}
						if (k == 0) {
							$scope.PaymentDet = [];
							$scope.bookSummary = {
								bookDetail : [ {
									standard : "",
									bookName : "",
									bookPrise : 0,
									totalStud : 0,
									totalFees : 0
								} ],
								total : 0,
								amtForInst20per : 0,
								amtForGRF80per : 0
							}
							$scope.examDetail = {
								totalStudent : "",
								male : "",
								female : "",
								total : "",
								/* examMedium : [], */
								yearOfExam : $scope.yearOfExam,
								bookRequired : 'OffLine',
								modeOfExam : 'OffLine',
								bookSummary : $scope.bookSummary,
								paymentDetail : $scope.PaymentDet,
							};

							$scope.examlist.push($scope.examDetail);
							$scope.examDetail = $scope.examlist[$scope.examlist.length - 1];
						}

					}
					$scope.PaymentDet = [];

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
						gfBookStockService.getGFBookByInstituteId(
								$scope.curUser.instituteID).then(
								function(tempBooks) {
									$scope.bookStocks = tempBooks;
								});
					}
					$scope.bookStocks = [];

					$scope.waitForServiceLoad1 = function() {
						if (appEndpointSF.is_service_ready) {

							$scope.getGFBookStockByInstituteId();

						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad1, 1000);
						}
					}

					$scope.waitForServiceLoad1();
					// -----------add book--------------
					$scope.addBook = function() {
						$scope.BookDetail = {
							standard : "",
							bookName : "",
							bookPrise : 0,
							totalStud : 0,
							totalFees : 0
						}
						$scope.bookSummary.bookDetail.push($scope.BookDetail);
					}

					$scope.removeBook = function(index) {
						$scope.calculate(index, 0);
						$scope.bookSummary.bookDetail.splice(index, 1);

					};

					$scope.books = [];

					// -----------------calculate book detail---------------

					$scope.calculate = function(index, val) {

						$scope.bookSummary.bookDetail[index].totalStud = val;

						$scope.bookSummary.bookDetail[index].totalFees = $scope.bookSummary.bookDetail[index].totalStud
								* $scope.bookSummary.bookDetail[index].bookPrise;

						$scope.bookSummary.total = 0;
						for (count = 0; count < $scope.bookSummary.bookDetail.length; count++) {
							$scope.bookSummary.total += $scope.bookSummary.bookDetail[count].totalFees;
						}
						$scope.bookSummary.amtForInst20per = Math
								.round(($scope.bookSummary.total / 100) * 20);
						$scope.bookSummary.amtForGRF80per = Math
								.round(($scope.bookSummary.total / 100) * 80);

						$scope.calculatepaidandpending();
					}

					// -----------add coordinator--------------
					$scope.addCoordinator = function() {
						$scope.CoordinatorDetail = {
							srno : $scope.contactDetail.coordinatorDetail.length + 1,
							coordinatorName : "",
							coordinatorPhoneNum : "",
							coordinatorEmailId : "",
						}
						$scope.contactDetail.coordinatorDetail
								.push($scope.CoordinatorDetail);
					}

					$scope.removeCoordinator = function(index) {
						$scope.contactDetail.coordinatorDetail.splice(index, 1);
					};

					// --------calculate pending & total paid amount----

					$scope.calculatepaidandpending = function() {
						// ---------calculate pending amount---------

						$scope.PaymentDetail.tPaid = 0;

						if ($scope.PaymentDet.length != 0) {

							for (i = 0; i < $scope.PaymentDet.length; i++) {

								$scope.PaymentDetail.tPaid += $scope.PaymentDet[i].payAmount;

							}
							$scope.PaymentDetail.tPaid += $scope.PaymentDetail.payAmount;
							$scope.PaymentDetail.pAmount = $scope.bookSummary.amtForGRF80per
									- $scope.PaymentDetail.tPaid;
						} else {

							$scope.PaymentDetail.tPaid = $scope.PaymentDetail.payAmount;
							$scope.PaymentDetail.pAmount = $scope.bookSummary.amtForGRF80per
									- $scope.PaymentDetail.tPaid;
						}

					}

					$scope.PaymentDetailArray = [];

					$scope.waitForServiceLoad2 = function() {
						if (appEndpointSF.is_service_ready) {

							$scope.calculatepaidandpending();

						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad2, 1000);
						}
					}

					$scope.waitForServiceLoad2();

					$scope.setfees = function(id, ind) {

						$log.debug("name=" + angular.toJson(id) + "index="
								+ ind);
						for (i = 0; i < $scope.bookStocks.length; i++) {
							if ($scope.bookStocks[i].id == id) {
								$scope.bookSummary.bookDetail[ind].bookPrise = $scope.bookStocks[i].bookPrice;
							}
						}
						$scope.calculate(ind, 0);
					}

				});
