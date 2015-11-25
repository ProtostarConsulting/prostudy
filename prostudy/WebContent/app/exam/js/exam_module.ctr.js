angular.module("prostudyApp").controller(
		"examModuleCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, objectFactory, appEndpointSF) {

			$log.debug("Inside examModuleCtr");

			$scope.testGAPICall = function() {
				console.log("in side testGAPICall");
				var q = appEndpointSF.getQuestionService().getQuestions()
						.execute(function(resp) {
							$log.debug("debug resp:" + resp);
							$log.info("info resp:" + resp);
							$log.warn("warn resp:" + resp);
							
							var items = resp.items;
							$log.debug("q:" + resp.items);

						});

			};

			/* Setup page menu */
			$scope.toggleRight = buildToggler('right');
			/**
			 * Build handler to open/close a SideNav; when animation finishes
			 * report completion in console
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
				/*$mdSidenav('right').close().then(function() {
					$log.debug("close RIGHT is done");
				});*/
			};
			
			
			/*$scope.cancelButton = function()
			{
				$log.debug("inside cancelButton");
				$state.go('exam', {});
			};//end of cancelButton
*/
		});