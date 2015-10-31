angular
		.module("prostudyApp")
		.controller(
				"syllabusViewCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, objectFactory, $state, appEndpointSF,
						$sce) {

					$scope.showSimpleToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Syllabus Data Saved!').position("top")
								.hideDelay(3000));
					};

					$scope.tempSyllabus = {
						board : "",
						standard : "",
						subject : "",
						chapter : "",
						chapterContent : ""
					};
					$scope.syllabus = [];
					$scope.syllabus1 = {};
					$scope.syllabus2 = {};
					$scope.syllabus3 = {};
					$scope.syllabus4 = {};
					$scope.addSyllabus = function() {
						$log.debug("No1");
						var SyllabusService = appEndpointSF
								.getSyllabusService();
						SyllabusService.addSyllabus($scope.tempSyllabus).then(
								function(msgBean) {
									$log.debug("No6");
									$log.debug("Inside Ctr addSyllabus");
									$log.debug("msgBean.msg:" + msgBean.msg);
									$scope.showSimpleToast();
									$scope.tempSyllabus = {
										board : "",
										standard : "",
										subject : "",
										chapter : "",
										chapterContent : ""
									};
								});
						$log.debug("No4");
					}

					$scope.getSyllabus = function() {

						var SyllabusService = appEndpointSF
								.getSyllabusService();

						SyllabusService
								.getSyllabus()
								.then(
										function(syllabusList) {
											$log
													.debug("Inside Ctr getSyllabus");
											$scope.syllabus = syllabusList;
											$scope.syllabus.chapterContent = $sce
													.trustAsHtml($scope.syllabus.chapterContent);
										});
					}

					$scope.getSyllabus();

					// $log.debug("len:" +$scope.syllabus.length);

				});