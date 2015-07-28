function init() {
	// alert("Inside init");
	window.initGAPI(); // Calls the init function defined on the window

}

var app = angular.module("myapp", [ "xeditable", "ui.bootstrap", "datatables"]);

app.run(function(editableOptions, editableThemes) {
	editableThemes.bs3.inputClass = 'input-sm';
	editableThemes.bs3.buttonsClass = 'btn-sm';
	editableOptions.theme = 'bs3';
});

app.controller("editTaxTableController", [ '$scope', '$window',
		function($scope, $window)

		{
			$scope.msg = "Default Msg"

			$scope.testFn = function() {
				alert("Hi, dear!");

			};

			$window.initGAPI = function() {
				// $scope.$apply($scope.initgapi);
				$scope.$apply($scope.loadCustomServices);
				// alert("Inside window.initGAPI");

			};

			$scope.loadCustomServices = function() {
				var apiRoot = '//' + window.location.host + '/_ah/api';

				// Loads the OAuth and helloworld APIs
				// asynchronously, and
				// triggers login
				// when they have completed.
				var apisToLoad;

				apisToLoad = 1; // must match number of calls to
				// gapi.client.load()
				gapi.client.load('taxServices', 'v0.1', function() {
					$scope.is_backend_ready = true;
					//$scope.getAllTaxServices();

				}, apiRoot);

			};

		} ]);



app.controller('EditableTableCtrl', function($scope, $filter, $http, $q) {
	$scope.users = [ {
		id : 1,
		code_Name : 'awesome user1',
		
		tax_Rate : '11',
		
	} ];






	// add user
	$scope.addUser = function() {
		$scope.users.push({
			id : $scope.users.length + 1,
			code_Name : '',
			tax_Rate : null,
			
			isNew : true
		});
	};

	// cancel all changes
	$scope.cancel = function() {
		for (var i = $scope.users.length; i--;) {
			var user = $scope.users[i];
			// undelete
			if (user.isDeleted) {
				delete user.isDeleted;
			}
			// remove new
			if (user.isNew) {
				$scope.users.splice(i, 1);
			}
		}
		;
	};

	// save edits
	$scope.saveTable = function() {
		var results = [];
		for (var i = $scope.users.length; i--;) {
			var user = $scope.users[i];
			// actually delete user
			if (user.isDeleted) {
				$scope.users.splice(i, 1);
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

