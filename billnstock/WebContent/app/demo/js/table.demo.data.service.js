angular.module("stockApp").factory('tableTestDataFactory',
		tableTestDataFactoryFn);

function tableTestDataFactoryFn($log, $q, $http) {
	return {
		getStudentList : function() {
			// var items;
			var deferred = $q.defer();

			$http.get("/app/demo/table_demo_data2.json").success(function(data) {
				// items = data.items;
				deferred.resolve(data.items);
				$log.debug("inside service data.items:" + data.items);

			});
			// return items;
			return deferred.promise;
		},

		getDessertList : function() {
			var deferred = $q.defer();
			$http.get("/app/demo/table_demo_data1.json").success(function(data) {
				deferred.resolve(data.data);
				$log.debug("inside service data.data:" + data.data);
			});
			return deferred.promise;
		},
	}
}