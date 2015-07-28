function init() {
	console.log("Inside init");
	window.initGAPI(); // Calls the init function defined on the window

}

app = angular.module("taxApp", ['ngMaterial', 'ngMessages']);
app.run(function(editableOptions, editableThemes) {
	editableThemes.bs3.inputClass = 'input-sm';
	editableThemes.bs3.buttonsClass = 'btn-sm';
	editableOptions.theme = 'bs3';
});

app.controller("stockCtr", [
		'$scope',
		'$window',
		function($scope, $window) {
			$scope.addTax = function() {
				return {
					id : '',
					sr_No : '',
					item_Name : '',
					categories : '',
					qty : '',
					price : '',
					notes : '',
					
					}
				};
			
		
				
				
				$scope.addstockServices = function() {
					console.log("in side addstockServices");
					gapi.client.stockServices.addStockServices($scope.addstock)
							.execute(function(resp) {
								console.log("Add Stock Response: " + resp.msg);
								

							})
				};// end of call to addStockServices

			$scope.loadGetStockList = function() {
				console.log("In loadStockList");
				gapi.client.stockServices.getAllstockServices().execute(
						function(resp) {
							console.log(resp);
						
							$scope.items=resp.items;
							$scope.$apply();
						});
				
				//$("#taxForm").hide();
				//$("#tableTax").show();
			};// end of loadGetTaxList
			
			/*$scope.taxDetails = function()
			{
				console.log("Inside Tax details");
				
				$("#taxForm").hide();
				$("#tableTax").show();
		
				
				
			};//end of taxDetails
			
			$scope.addNewTax = function()
			{
				console.log("Inside addNewTax");
				$scope.addTax.code_Name = "";
				$scope.addTax.tax_Rate = "";
				
				$("#taxForm").show();
				$("#tableTax").hide();
				$("#actionMsgDivR").hide();
				$("#actionMsgDivU").hide();
				
				
			};//end of addNewTax
*/			
			

		
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

				gapi.client.load('stockServices', 'v0.1', function() {
					console.log("Inside gapi.client.load");
					$scope.is_backend_ready = true;
					$scope.loadGetStockList();

				}, apiRoot);

			};
} ]);
