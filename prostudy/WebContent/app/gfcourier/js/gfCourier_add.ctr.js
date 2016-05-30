angular.module("prostudyApp").controller(
		"gfCourierAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state, $stateParams, $mdDialog,
				objectFactory) {

			$scope.courierTypelist = [ "Book", "Certificate",
					"Error Certificate", "Error books", "Prize Certificate" ];
			$scope.logisticsList = [ "By Post", "By Hand", "ST Postal",
					"Tej Courier" ];
			$scope.registrationIDList = [ "MH100001", "MH100002", "MH100003",
					"MH100004","KA100001","KA100002" ];
			
			$scope.tempCourier = {
				courierType : '',
				logistics : '',
				registrationID : '',
				weight : '',
				courierFrom : '',
				courierTo : '',
				schoolName : '',
				courierDispatchDate : new Date(),
			}

			$scope.selectedGFCourierID = $stateParams.selectedGFCourierID;

			$scope.addGFCourier = function() {
				$scope.tempCourier.instituteID = $scope.curUser.instituteID;

				var gfCourierService = appEndpointSF.getGFCourierService();

				gfCourierService.addGFCourier($scope.tempCourier).then(
						function() {

							$scope.gfCourierForm.$setPristine();
							$scope.gfCourierForm.$setValidity();
							$scope.gfCourierForm.$setUntouched();
							

						});
				if ($scope.selectedGFStudID == "") {
					$scope.showAddToast();
				} else {
					$scope.showUpdateToast();
				}
				$scope.tempCourier = {};
			}

			$scope.getGFCourierById = function() {

				var gfCourierService = appEndpointSF.getGFCourierService();
				gfCourierService.getGFCourierById($scope.selectedGFCourierID)
						.then(function(tempCourier) {
							
							$scope.tempCourier = tempCourier;
							$scope.tempCourier.courierDispatchDate = new Date($scope.tempCourier.courierDispatchDate);
						//	$scope.tempCourier.schoolName = new Date($scope.tempCourier.courierDispatchDate);
							$scope.tempCourier.schoolName = $scope.tempCourier.schoolName.schoolName;

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

					if ($scope.selectedGFCourierID != "") {
						$scope.getGFCourierById();
					}
					$scope.getPartnerSchoolByInstitute();

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
