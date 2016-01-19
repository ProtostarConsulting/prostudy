angular
		.module("stockApp")
		.controller(
				"setup_headerfooter",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,
						appEndpointSF) {
					
				$scope.selecteduserNo = $stateParams.selecteduserNo;
			
				$scope.files={
						header:"",
						footer:""
				}
				
				
				$('input[type=file]').change(function () {
				    console.log(this.files[0].mozFullPath);
				});

				
				
				
				$scope.headerfooter=function(){
				
					var file = document.forms['fileform']['headerfile'].files[0].mozFullPath;
					//file.name == "photo.png"
					//file.type == "image/png"
					//file.size == 300821
					 $log.debug("*******************************headerfile=="+file);
					
					 var headerfile = document.getElementById("headerfile").value;
					 var footerfile = document.getElementById("footerfile").value;
					 $log.debug("headerfile=="+headerfile);
					 $log.debug("footerfile=="+footerfile);
					 $scope.files.header=headerfile;
					 $scope.files.footer=footerfile;
					 
					 $log.debug("$scope.:files ===="+ angular.toJson($scope.files));
					 
					 var setupService = appEndpointSF.getsetupService();
					 setupService.headerfooter($scope.files).then(function(msgBean) {

							$log.debug("Inside Ctr files");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSimpleToast(msgBean.msg);
							//$scope.getAllemps();
						});

						$scope.files = {};
					 
				}
				
				
				$scope.getfooter = function(){
					
					//$window.location.href = ('http://localhost:8888/img/images/erpag_document_footer.JPG');
					$scope.url ='http://localhost:8888/img/images/erpag_document_footer.JPG';
				}
				$scope.getheader = function(){
					
					//$window.location.href = ('http://localhost:8888/img/images/protostar_logo_pix_313_132.jpg');
					$scope.url ='http://localhost:8888/img/images/protostar_logo_pix_313_132.JPG';
				}
				
				
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
