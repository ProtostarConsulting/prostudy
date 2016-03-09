angular.module("prostudyApp").controller(
		"chapterAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, tableTestDataFactory, $state, appEndpointSF,
				boardList) {

			console.log("Inside chapterAddCtr");
			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();

			$scope.boards = [ {} ];
			$scope.boards = boardList;

			$scope.standards = [];
			$scope.divisions = [];
			$scope.subjects = [];

			$scope.selectedStdID;
			$scope.stdList;
			$scope.divList;
			$scope.subList;

			$scope.tempChapter = {
				id : "",
				instituteID :  $scope.curUser.instituteID,
				chapter_name : "",
				chapter_content : "",
				board : "",
				standard : "",
				division :"",
				subject : ""
			};

			$scope.chapters = [];

			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Chapter Saved!')
						.position("top").hideDelay(3000));

			};

			$scope.getStandardByInstitute = function() {

				var StandardService = appEndpointSF.getStandardService();
				StandardService.getStandardByInstitute(
						$scope.curUser.instituteID).then(
						function(standardList) {
							for (var i = 0; i < standardList.length; i++) {
								$scope.standards.push(standardList[i].name);

							}
							$scope.stdList = standardList;

						});
			}

			$scope.getStandardByInstitute();

			$scope.getDivisionByStandard = function() {

				for (var i = 0; i < $scope.stdList.length; i++) {
					if ($scope.tempChapter.standard == $scope.stdList[i].name) {
						$scope.selectedStdID = $scope.stdList[i].id;
					}
				}
				var DivisionService = appEndpointSF.getDivisionService();
				DivisionService.getDivisionByStandard($scope.selectedStdID)
						.then(function(divisionList) {
							for (var i = 0; i < divisionList.length; i++) {
								$scope.divisions.push(divisionList[i].name);
							}
							$scope.divList = divisionList;
						});
			}

			$scope.getSubjectByDivision = function() {

				for (var i = 0; i < $scope.divList.length; i++) {
					if ($scope.tempChapter.division == $scope.divList[i].name) {
						$scope.selectedDivID = $scope.divList[i].id;
					}
				}
				var SubjectService = appEndpointSF.getSubjectService();
				SubjectService.getSubjectByDivision($scope.selectedDivID).then(
						function(subjectList) {
							for (var i = 0; i < subjectList.length; i++) {
								$scope.subjects.push(subjectList[i].name);
							}

						});
				$scope.subjects.splice(0, $scope.subjects.length);
			}

			$scope.addChapter = function() {
				$log.debug("No1");

			};// end of showSavedToast

			$scope.addChapter = function() {
				$log.debug("No1");

				var ChapterService = appEndpointSF.getChapterService();

				ChapterService.addChapter($scope.tempChapter).then(
						function(msgBean) {
							$log.debug("No6");
							$log.debug("Inside Ctr addChapter");
							$log.debug("msgBean.msg:" + msgBean.msg);

							$scope.showSavedToast();

							$log.debug("tempChapter" + $scope.tempChapter);
							$scope.tempChapter = {

								id : "",
								chapter_name : "",
								chapter_content : "",
								board : "",

								standard : "",
								division : "",
								subject : "",

							};// After Click Submit button,htmlform to be set
							// as blank
						});
				$log.debug("No4");
			}// end of addChapter

			$scope.cancelButton = function() {
			
				$state.go('^', {});
			};// end of cancelButton

		});// end of chapterAddCtr

