angular.module("prostudyApp").controller(
		"partnerSchoolListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, appEndpointSF, $state, $sce, $stateParams, $q) {

			$scope.selectedChapterId = $stateParams.selectedChapterId;
			$scope.chapter = [];
			
			$scope.query = {
			         order: 'name',
			         limit: 5,
			         page: 1
			       };
			
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content(
						'Chapter Updated!').position("top").hideDelay(
						3000));
			};
			
			$scope.getPartnerSchoolByInstitute = function() {

				var PartnerService = appEndpointSF.getPartnerSchoolService();
				PartnerService.getPartnerByInstitute(
						$scope.curUser.instituteID).then(function(pSchoolList) {
					$scope.pSchoolList = pSchoolList;

				});
			}

		$scope.cancel = function() {
				$state.go('partnerSchool.listPartnerSchool');
			}
			
			$scope.waitForServiceLoad = function() {
				if (appEndpointSF.is_service_ready) {
					
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

				$scope.onpagechange = function(page, limit) {
					var deferred = $q.defer();

					$timeout(function() {
						deferred.resolve();
					}, 2000);

					return deferred.promise;
				};

				$scope.onorderchange = function(order) {
					var deferred = $q.defer();

					$timeout(function() {
						deferred.resolve();
					}, 2000);

					return deferred.promise;
				};
		});