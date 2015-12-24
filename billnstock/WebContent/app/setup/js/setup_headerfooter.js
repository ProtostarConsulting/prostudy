angular
		.module("stockApp")
		.controller(
				"setup_headerfooter",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,
						appEndpointSF) {
					
				$scope.selecteduserNo = $stateParams.selecteduserNo;
					
				/*$scope.getpath=function(){
				var path=document.getElementById("file-input");
				$log.debug("path=="+path);
					}*/
				
				/*$scope.showContent = function($fileContent){

				    $scope.content = $fileContent;
				    $log.debug("content=="+$scope.content);
				};
				*/
						
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

				});
