angular.module("prostudyApp")
		.controller(
				"studentListPageCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, tableTestDataFactory) {
					console.log("Inside studentListPageCtr");
					// console.log("Via Serice:" +
					// customerservice.addCustomer());
					$scope.showSimpleToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Customer Saved!').position("top").hideDelay(
								3000));
					};

					
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