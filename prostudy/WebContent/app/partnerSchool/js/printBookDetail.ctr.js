angular.module("prostudyApp").controller(
		"printBookDtailCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, appEndpointSF, $state, $sce, $stateParams, $q,$mdDialog,$mdMedia) {

			$scope.selectedPSchoolId = $stateParams.PSchoolId;
			
			var printDivCSS = new String(
					'<link href="/lib/base/css/angular-material.min.css"" rel="stylesheet" type="text/css">'
							+ '<link href="/lib/base/css/bootstrap.min.css"" rel="stylesheet" type="text/css">'
							+ '<link href="/lib/base/css/bootstrap.min.css"" rel="stylesheet" type="text/css">')

			$scope.printSalSlipDiv = function(bookDetailDiv) {
				
				/*document.getElementById('hidetr').style.display = 'block';*/
				window.frames["print_frame"].document.body.innerHTML = printDivCSS
						+ document.getElementById(bookDetailDiv).innerHTML;
				window.frames["print_frame"].window.focus();
				/*document.getElementById('hidetr').style.display = 'none';*/
				window.frames["print_frame"].window.print();
				
			}			
			
			$scope.getPSchoolByPSID = function() {
				var PartnerSchoolService = appEndpointSF
						.getPartnerSchoolService();
				if ($scope.selectedPSchoolId != "") {
					PartnerSchoolService
							.getPSchoolByPSID($scope.selectedPSchoolId)
							.then(
									function(pSchool) {
										$scope.BookDetail = pSchool.bookSummary.bookDetail;
										$scope.bookSummary=pSchool.bookSummary;
										$scope.examMedium = pSchool.examDetail.examMedium;
									});
				}
			}
			$scope.BookDetail=[];
			$scope.examMedium=[];
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
			
			
		});