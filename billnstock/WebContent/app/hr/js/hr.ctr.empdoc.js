angular
		.module("stockApp")
		.controller(
				"hrCtr.empdoc",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,
						appEndpointSF) {
		
					$scope.getAllemps = function() {
						$log.debug("Inside Ctr $scope.getAllemps");
						var hrService = appEndpointSF.gethrService();

						hrService.getAllemp().then(function(empList) {
							$log.debug("Inside Ctr getAllemps");
							$scope.emps = empList;
							});
					}

					$scope.emps = [];
					$scope.getAllemps();
					
					$scope.documentempname = function(empid) {

						for (i = 0; i < $scope.emps.length; i++) {
							if (empid == $scope.emps[i].empid) {
								$scope.document.empName = $scope.emps[i].empName;

							}

						}

					}

					$scope.adddoc = function() {

						// var path = document.getElementById("filenm").value;
						// $log.debug("path="+path);
						// File file = new File(path);
						// InputStream inputStream = new
						// FileInputStream(""+path);
						/*
						 * if ( $scope.document.docfile) { $log.debug("Inside
						 * Ctr adddoc############################");
						 * $scope.upload($scope.document.docfile); } // upload
						 * on file select or drop $scope.upload = function
						 * (file) { Upload.upload({ url: 'upload/url', data:
						 * {file: file, 'username': $scope.username}
						 * }).then(function (resp) { console.log('Success ' +
						 * resp.config.data.file.name + 'uploaded. Response: ' +
						 * resp.data); }, function (resp) { console.log('Error
						 * status: ' + resp.status); }, function (evt) { var
						 * progressPercentage = parseInt(100.0 * evt.loaded /
						 * evt.total); console.log('progress: ' +
						 * progressPercentage + '% ' +
						 * evt.config.data.file.name); }); };
						 * 
						 */
						var hrService = appEndpointSF.gethrService();

						hrService.adddoc($scope.document).then(
								function(msgBean) {

									$log.debug("Inside Ctr adddoc");
									$log.debug("msgBean.msg:" + msgBean.msg);
									$scope.showSimpleToast(msgBean.msg);
									// $scope.getAllemps();
								});

						$scope.document = {};
					}
					

				});
