angular.module("prostudyApp").controller(
		"instituteListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $sce, tableTestDataFactory, appEndpointSF, $state,
				$filter) {

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Institute Saved!')
						.position("top").hideDelay(3000));
			};
			
			$scope.curUser=appEndpointSF.getLocalUserService().getLoggedinUser();

			$scope.tempInstitute = {
				instituteId : "",
				name : "",
				desc : "",
				user_fname : "",
				user_lname : "",
				user_email_id : "",
				user_contact_no : "",
				books : [],
				students : [],
				teachers : [],
				practiceExams : [],
				admins : []
			};
			$scope.institutes = [];

			$scope.getInstituteById = function() {

				var InstituteService = appEndpointSF.getInstituteService();
				InstituteService.getInstituteById($scope.curUser.instituteID)
						.then(function(instituteList) {
							$scope.institutes.push(instituteList);
							$log.debug("$scope.institutes :"+angular.toJson($scope.institutes));

						});
			}

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
			
			
			$scope.getInstituteById();
			$scope.selected = [];

		});
