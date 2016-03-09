angular
		.module("prostudyApp")
		.controller(
				"chapterViewCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, appEndpointSF, $state, $sce, $stateParams) {
					console.log("Inside chapterViewCtr");

					$scope.tempChapter = {
						id : "",
						chapterId : "",
						chapter_name : "",
						chapter_content : "",
						board : "",
						standard : "",
						subject : ""
					};
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					
					$scope.selectedChapterId = $stateParams.selectedChapterId;
					$log.debug("$scope.selectedChapterId :"+$scope.selectedChapterId);

					$scope.getChaptersByInstitute = function() {

						var ChapterService = appEndpointSF.getChapterService();
						ChapterService.getChaptersByInstitute($scope.curUser.instituteID)
								.then(
										function(chapterList) {
											$scope.chapters = chapterList;		
													
											
										});
					}
					$scope.getChaptersByInstitute();

					$scope.cancelButton = function() {
						
						$state.go('^', {});
					}; 

					

				});
