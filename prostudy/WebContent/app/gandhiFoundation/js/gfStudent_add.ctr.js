angular.module("prostudyApp").controller(
		"gfStudentAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state, $stateParams, $mdDialog,
				objectFactory) {

			$scope.standardList = [ "5 th", "6 th", "7 th", "8 th", "9 th",
					"10 th", "11 th", "12 th", "FY", "SY", "TY", "PG-I",
					"PG-II", "course-1", "course-2", "Group I", "Group II",
					"Group III" ];

			$scope.answerOfMediumList = [ "Marathi", "Hindi", "English", ];

			$scope.tempStudent = {
				fName : '',
				mName : '',
				lName : '',
				standard : '',
				mediumOfAnswer : '',
				gender : '',
				schoolName : '',
				role : 'Student'
			}

			$scope.selectedGFStudID = $stateParams.selectedGFStudID;

			$scope.addGFStudent = function() {
				$scope.tempStudent.instituteID = $scope.curUser.instituteID;

				var gfStudentService = appEndpointSF.getGFStudentService();

				gfStudentService.addGFStudent($scope.tempStudent).then(
						function() {

							$scope.gfStudentForm.$setPristine();
							$scope.gfStudentForm.$setValidity();
							$scope.gfStudentForm.$setUntouched();
							$scope.tempStudent = {};

						});
				if ($scope.selectedGFStudID == "") {
					$scope.showAddToast();
				} else {
					$scope.showUpdateToast();
				}
			}

			$scope.getGFStudentById = function() {

				var gfStudentService = appEndpointSF.getGFStudentService();
				gfStudentService.getGFStudentById($scope.selectedGFStudID)
						.then(function(tempStudent) {
							$scope.tempStudent = tempStudent;

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

					if ($scope.selectedGFStudID != "") {
						$scope.getGFStudentById();
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
