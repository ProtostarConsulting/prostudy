function init() {
	alert("Inside init");
	window.initGAPI(); // Calls the init function defined on the window

}

angular.module("myapp", []).controller(
		"MyController",
		[
				'$scope',
				'$window',
				function($scope, $window) {
					alert("inside ctr");
					$scope.no1 = 1;
					$scope.no2 = 1;
					$scope.result = {
						data : "oops"
					};
					$scope.mathServ = MathService();

					$scope.mult = function() {
						alert("inside mult()");
						$scope.result = $scope.mathServ.multiply($scope.no1,
								$scope.no2);
						$scope.$apply();
					};

					$scope.add = function() {
						$scope.result = $scope.mathServ.add($scope.no1,
								$scope.no2);
						$scope.$apply();
					};

				} ]);
