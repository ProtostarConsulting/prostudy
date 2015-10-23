angular.module("prostudyApp")
		.controller(
				"studentListPageCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, tableTestDataFactory,appEndpointSF) {
					console.log("Inside studentListPageCtr");
					// console.log("Via Serice:" +
					// customerservice.addCustomer());
					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content('Institute Saved!')
								.position("top").hideDelay(3000));
					};

					$scope.selected = [];

					$scope.addStudent = function() {
						var StudentService = appEndpointSF.getStudentService();
						$scope.Students = StudentService
								.addInstitute($scope.tempStudents);
						$scope.tempStudents = {
							name : "",
							address : "",
							phone : ""
						};
						$scope.showSavedToast();
					}

					$scope.getStudents = function() {
						$scope.Students = appEndpointSF.getStudentService()
								.getStudents();
						$log.debug("Inside getStudentService...");
						$log.debug("$scope.Students:" + $scope.Students);
					}

					$scope.tempStudents = {
						name : "",
						address : "",
						phone : ""
					};
					
					$scope.getStudents();

					
					$log.debug("inside ctr before service get $scope.items:"
							+ $scope.items);
					// $scope.items =
					// tableTestDataFactory.getStudentList();
					$scope.items = tableTestDataFactory.getStudentList().then(
							function(data) {
								$scope.items = data;
								$log.debug("inside ctr then $scope.items:"
										+ $scope.items);
							});

					$log.debug("inside ctr after service get $scope.items:"
							+ $scope.items);

					$scope.selected = [];

					$scope.query = {
						order : 'name',
						limit : 5,
						page : 1
					};


					$scope.onorderchange = function(order) {
						var deferred = $q.defer();

						$timeout(function() {
							deferred.resolve();
						}, 2000);

						return deferred.promise;
					};
					
					
				

					/* Setup menu */
					$scope.toggleRight = buildToggler('rightListPage');
					/**
					 * Build handler to open/close a SideNav; when animation
					 * finishes report completion in console
					 */
					function buildToggler(navID) {
						var debounceFn = $mdUtil.debounce(function() {
							$mdSidenav(navID).toggle().then(function() {
								$log.debug("toggle " + navID + " is done");
							});
						}, 200);
						return debounceFn;
					}

					$scope.close = function() {
						$mdSidenav('right').close().then(function() {
							$log.debug("close RIGHT is done");
						});
					};

				});