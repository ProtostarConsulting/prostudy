angular.module("prostudyApp")
		.controller(
				"chapterViewCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log,appEndpointSF,$state,$sce) {
					console.log("Inside chapterViewCtr");
				
					$scope.tempChapter = {chapterId :"",chapter_name : "",chapter_content: "", board:"", student_class:"",subject:""};
				
			
					$scope.getChapters = function()
					{
						
						var ChapterService = appEndpointSF.getChapterService();					
												
						ChapterService.getChapters()
						.then(function(chapterList) {
									$log.debug("Inside Ctr getChapters");
									
									$scope.chapters = chapterList;
									$log.debug("$scope.chapters :"+$scope.chapters);
									$scope.chapters.chapter_content = $sce.trustAsHtml($scope.chapters.chapter_content);
									$log.debug("$scope.chapters.chapter_content: " + $scope.chapters.chapter_content);
								});
					}//end of getChapters
					
					$scope.chapters = [];
					
					$scope.cancelButton = function()
					{
						//$log.debug("inside cancelButton");
						$state.go('^', {});
					};//end of cancelButton
					
					$scope.getChapters();

				});// end of chapterViewCtr 
