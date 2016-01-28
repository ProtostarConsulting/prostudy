angular.module("prostudyApp").controller(
		"myBooksModuleCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $location, objectFactory, appEndpointSF,
				tableTestDataFactory, $state) {

			$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();
			
	
			$scope.getMyBookList = function() {

				var UserService = appEndpointSF.getUserService();
			
				UserService.getMyBookList($scope.curUser.email_id).then(
						function(bookList) {

							$scope.books = bookList;

						});
			}

			$scope.books = [];
			$scope.getMyBookList();

			/* Setup page menu */
			$scope.toggleRight = buildToggler('right');

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

			// $scope.getMyBooksbyID();
		});