function init() {
	console.log("Inside init");
	window.initGAPI(); 
}

app = angular.module("examResultApp", ['ngMaterial', 'ngMessages']);

app.controller("examResultCtr", [
		'$scope',
		'$window',
		'$mdToast',
		
		function($scope, $window,$mdToast) 
		{

			console.log("Inside examResultCtr");

			$scope.showSimpleToast = function() 
			{
				$mdToast.show($mdToast.simple().content('Result Saved!')
						.position("top").hideDelay(3000));
			};//end of showSimpleToast

			$scope.exams = {};

			$scope.loadGetExamList = function()
			{
				console.log("In loadGetExamList");
				gapi.client.examService.getAllExam().execute(
						function(resp) {
							console.log("getAllExam");
							$scope.exams = resp.items;
							console.log(resp);

							$scope.$apply();
						});

			};// end of loadGetExamList

			$scope.cancelButtonClick = function() 
			{
				console.log("in side cancelButtonClick");

			};// end of cancelButtonClick

			$window.initGAPI = function() 
			{
				console.log("Came to initGAPI");
				
				$scope.$apply($scope.loadCustomService);

			};

			
			$scope.loadCustomService = function() 
			{
				console.log("Inside window.loadCustomServices");
				var apiRoot = '//' + window.location.host + '/_ah/api';

				var apisToLoad;

				apisToLoad = 1; // must match number of calls to
				// gapi.client.load()

				gapi.client.load('examService', 'v0.1', function() 
				{
					console.log("Inside gapi.client.load");
					$scope.is_backend_ready = true;
					$scope.loadGetExamList();

				}, apiRoot);

			};

		} ]);


