angular
		.module("prostudyApp")
		.controller(
				"gfBookListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $mdDialog, $mdMedia,
						tableTestDataFactory, $state, Upload, appEndpointSF) {
					console.log("Inside studentListPageCtr");

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Scheduled Exam Assigned to Student!')
								.position("top").hideDelay(3000));
					};
					$scope.query = {
						order : 'description',
						limit : 10,
						page : 1
					};

					$scope.courierTypelist = [ "Book", "Certificate",
							"Error Certificate", "Error books",
							"Prize Certificate" ];

					$scope.getGFBookByInstituteId = function() {

						var gfBookStockService = appEndpointSF
								.getGFBookStockService();
						gfBookStockService.getGFBookByInstituteId(
								$scope.curUser.instituteID).then(
								function(tempBooks) {
									$scope.bookStocks = tempBooks;
									$log.debug ("Got books form Server...");

								});
					}

					$scope.UplodeExcel = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show(
										{
											controller : DialogController,
											templateUrl : '/app/gfbookstock/gfBulkBooksUpload.html',
											parent : angular
													.element(document.body),
											targetEvent : ev,
											clickOutsideToClose : true,
											fullscreen : useFullScreen,
											locals : {
												curUser : $scope.curUser,
												getFreshBooks: $scope.getGFBookByInstituteId
											}
										})
								.then(
										function(answer) {
											$scope.status = 'You said the information was "'
													+ answer + '".';
										},
										function() {
											$scope.status = 'You cancelled the dialog.';
										});

					};

					function DialogController($scope, $mdDialog, curUser, getFreshBooks) {

						$scope.csvFile;
						$scope.uploadProgressMsg = null;
						
						$scope.uploadBooksCSV = function() {
							var csvFile = $scope.csvFile;
							Upload
									.upload(
											{
												url : 'UploadBulkBookServlet',
												data : {
													file : csvFile,
													'username' : curUser.email_id,
													'instituteId' : curUser.instituteID
												}
											})
									.then(
											function(resp) {
												$log.debug('Successfully uploaded '
																+ resp.config.data.file.name
																+ '.'
																+ angular
																		.toJson(resp.data));
												$scope.uploadProgressMsg = 'Successfully uploaded '
														+ resp.config.data.file.name
														+ '.';
												$mdToast
														.show($mdToast
																.simple()
																.content(
																		'Books Data Uploaded Sucessfully.')
																.position("top")
																.hideDelay(3000));
												
												$scope.csvFile = null;
												
												//Load the books again in the end
												getFreshBooks();
											},
											function(resp) {
												$log.debug('Error Ouccured, Error status: '
																+ resp.status);
												$scope.uploadProgressMsg = 'Error: '
														+ resp.status;
											},
											function(evt) {
												var progressPercentage = parseInt(100.0
														* evt.loaded
														/ evt.total);
												$log.debug('Upload progress: '
																+ progressPercentage
																+ '% '
																+ evt.config.data.file.name);
												$scope.uploadProgressMsg = 'Upload progress: '
														+ progressPercentage
														+ '% '
														+ evt.config.data.file.name;
												+'...'
											});
						};

					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {

							$scope.getGFBookByInstituteId();

						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

					$scope.downloadData = function() {

						document.location.href = "DownloadGFBooks?InstituteId="
								+ $scope.curUser.instituteID;

					}

					$scope.threshold = false;
					$scope.bookStocks1 = [];
					$scope.showThresholdBooks = function(index, selected) {

						if ($scope.threshold == true) {
							for (var i = 0; i < $scope.bookStocks.length; i++) {

								if ($scope.bookStocks[i].bookQty < $scope.bookStocks[i].bookThreshold) {

									$scope.bookStocks1
											.push($scope.bookStocks[i]);

									$scope.bookStocks = $scope.bookStocks1;
								}
							}

						} else {
							$state.reload();
						}

					}

				});