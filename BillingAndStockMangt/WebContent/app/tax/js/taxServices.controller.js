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

app.controller("taxCtr", [
		'$scope',
		'$window',
		function($scope, $window) {
			
			$scope.addTax = function() {
				return {
					code_Name : '',
					tax_Rate : '',
					
					}
				};
				
				
				$scope.addTaxServices = function() {
					console.log("in side addTaxServices");
					gapi.client.taxServices.addTaxServices($scope.addTax)
							.execute(function(resp) {
								console.log("Add Tax Response: " + resp.msg);
								//alert($scope.addTax);

							})
				};// end of call to addTaxServices

			$scope.loadGetTaxList = function() {
				console.log("In loadTaxList");
				gapi.client.taxServices.getAllTaxServices().execute(
						function(resp) {
							console.log(resp);
						
							$scope.items=resp.items;
							$scope.$apply();
						});
				
				$("#taxForm").hide();
				$("#tableTax").show();
			};// end of loadGetTaxList
			
			$scope.taxDetails = function()
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
				/*$("#actionMsgDivR").hide();
				$("#actionMsgDivU").hide();*/
				
				
			};//end of addNewTax
			 
		
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

				gapi.client.load('taxServices', 'v0.1', function() {
					console.log("Inside gapi.client.load");
					$scope.is_backend_ready = true;
					$scope.loadGetTaxList();

				}, apiRoot);

			};
} ]);


app.controller('editTaxTableController', function($scope, $filter, $http, $q) {
	$scope.taxes = [ {
		id : 1,
		code_Name : 'service tax',
		tax_Rate : 2,
		
	}, {
		id : 2,
		code_Name : 'LBT tax',
		tax_Rate : 11.2,
	
	}];
	
	// filter users to show
	$scope.filterUser = function(user) {
		return addTax.isDeleted !== true;
	};

	// mark user as deleted
	$scope.deleteUser = function(id) {
		var filtered = $filter('filter')($scope.taxes, {
			id : id
		});
		if (filtered.length) {
			filtered[0].isDeleted = true;
		}
	};



	// add user
	$scope.addUser = function() {
		$scope.taxes.push({
			id : $scope.addTax.length + 1,
			code_Name : '',
			tax_Rate : null,
			
			isNew : true
		});
	};

	// cancel all changes
	$scope.cancel = function() {
		for (var i = $scope.taxes.length; i--;) {
			var user = $scope.taxes[i];
			// undelete
			if (user.isDeleted) {
				delete user.isDeleted;
			}
			// remove new
			if (user.isNew) {
				$scope.taxes.splice(i, 1);
			}
		}
		;
	};

	// save edits
	$scope.saveTable = function() {
		var results = [];
		for (var i = $scope.taxes.length; i--;) {
			var user = $scope.taxes[i];
			// actually delete user
			if (user.isDeleted) {
				$scope.taxes.splice(i, 1);
			}
			// mark as not new
			if (user.isNew) {
				user.isNew = false;
			}

			// send on server
			// results.push($http.post('/saveUser', user));
		}

		return $q.all(results);
	};
});

