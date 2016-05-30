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
					$scope.max = 2;
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
							PartnerSchoolService.getPSchoolByPSID(
									$scope.selectedPSchoolId).then(
									function(pSchool) {
										$scope.partnerSchool = pSchool;
										$scope.partnerSchool.formNumber=Number($scope.partnerSchool.formNumber);
										$scope.examDetail=$scope.partnerSchool.examDetail;
										$scope.contactDetail=$scope.partnerSchool.contactDetail;
										$scope.Address=$scope.partnerSchool.Address;
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

				});
