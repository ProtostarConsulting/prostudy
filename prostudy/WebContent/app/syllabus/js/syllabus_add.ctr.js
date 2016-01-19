angular.module("prostudyApp").controller(
		"syllabusAddCtr",		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,	$log, $q, tableTestDataFactory, $state, appEndpointSF, $filter,
				$log) {
		
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Syllabus Data Saved!')
						.position("top").hideDelay(3000));
			};

			$scope.tempSyllabus = {
				syllabusId:"",
				board : "",
				standard : "",
				subject : "",
				chapterName : "",
				chapterContent : ""
			};
		
			$scope.addSyllabus = function() {
				$log.debug("No1");
				var SyllabusService = appEndpointSF.getSyllabusService();
				
				SyllabusService.addSyllabus($scope.tempSyllabus).then(
						function(msgBean) {
							$log.debug("No6");
							$log.debug("Inside Ctr addSyllabus");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSavedToast();
							$scope.tempSyllabus = {	};

					});
				$log.debug("No4");
				
			}

				});
