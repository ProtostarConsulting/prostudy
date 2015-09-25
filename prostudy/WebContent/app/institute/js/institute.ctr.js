function init() {
	console.log("Inside init");
	window.initGAPI(); 
}

app = angular.module("instituteApp", ['ngMaterial', 'ngMessages']);

app.controller("instituteCtr", [
		'$scope',
		'$window',
		'$mdToast',
		
		function($scope, $window,$mdToast) {

			console.log("Inside instituteCtr");
			
			$scope.showSimpleToast = function() {
			    $mdToast.show(
			      $mdToast.simple()
			        .content('Institute Saved!')
			        .position("top")
			        .hideDelay(3000)
			    );
			  };//end of showSimpleToast
			
			$scope.newInstitute = function() {
				return {
					name : '',
					email_id : '',
					phone_no : '',
					address : '',
					}
				};//end of creating newInstitute-Object
				
			
				$scope.addInstituteToDB = function() {
					console.log("in side addInstituteToDB");
					gapi.client.instituteServices.addInstituteServices($scope.institute)
							.execute(function(resp) {
								console.log("Add Institute Response: " + resp.msg);
								
								$scope.showSimpleToast();
								console.log($scope.institute);
								$scope.institute = $scope.newInstitute();

							})
				};// end of addInstituteToDB
				
				$scope.cancelButtonClick = function() {
					console.log("in side cancelButtonClick");
					/*gapi.client.instituteServices.cancelButtonServices($scope.institute)
							.execute(function(resp) {
								console.log("cancel Institute Response: " + resp.msg);
							console.log($scope.institute);

							})*/
				};// end of cancelButtonClick
	 
		
           	$window.initGAPI = function() {
				console.log("Came to initGAPI");
				$scope.$apply($scope.loadCustomService);
			
			};

			$scope.loadCustomService = function() {
				console.log("Inside window.loadCustomServices");
				var apiRoot = '//' + window.location.host + '/_ah/api';

				// Loads the OAuth and helloworld APIs
				// asynchronously, and
				// triggers login
				// when they have completed.
				var apisToLoad;

				apisToLoad = 1; // must match number of calls to
				// gapi.client.load()

				gapi.client.load('instituteServices', 'v0.1', function() {
					console.log("Inside gapi.client.load");
					$scope.is_backend_ready = true;
				  //$scope.loadGetInstituteList();

				}, apiRoot);

			};
			
			$scope.institute = $scope.newInstitute();
} ]);


