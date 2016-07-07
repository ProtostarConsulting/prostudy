angular.module("prostudyApp").controller(
		"homeCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $location, objectFactory, appEndpointSF,
				tableTestDataFactory, $timeout, $interval, Upload) {
			$scope.loginCheck();
			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('Customer Saved!')
						.position("top").hideDelay(3000));
			};

			$scope.loadCustomerList = function() {
				console.log("loadCustomerList");
				gapi.client.customerservice.getAllCustomers().execute(
						function(resp) {
							console.log(resp);
						});
			};

			$scope.addCustomer = function() {
				console.log("in side addCustomer");
				gapi.client.customerservice.addCustomer($scope.cust).execute(
						function(resp) {
							console.log("Add Customer Response: " + resp.msg);
							$scope.showSimpleToast();
							$scope.cust = $scope.newCustomer();

						})
			};// end of call to addCustomer

			$scope.newCustomer = function() {
				return {
					firstName : '',
					lastName : '',
					mobileNo : '',
					email : '',
					address : {
						line1 : '',
						line2 : '',
						city : '',
						state : '',
						pin : '',
					}
				};
			}

			$scope.cust = $scope.newCustomer();

			// initialize local objects
			$scope.customer = $scope.newCustomer();
			$scope.customerList = {};

			$scope.myDate = new Date();

			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('X Saved!').position(
						"top").hideDelay(3000));
			};

			$scope.showDateValue = function() {
				console.log("in side showDateValue");
				$log.debug("$scope.myDate:" + $scope.myDate);

			};// end of call to addCustomer

			$scope.submit = function() {
				if ($scope.form.file.$valid && $scope.file) {
					$scope.upload($scope.file);
				}
			};
			
			
			//Test upload file code
			$scope.username = "testuser220";

			// upload on file select or drop
			$scope.upload = function(file) {
				Upload.upload({
					url : 'uploadtestngfile',
					data : {
						file : file,
						'username' : $scope.username
					}
				}).then(
						function(resp) {
							console.log('Success ' + resp.config.data.file.name
									+ 'uploaded. Response from Servlet: ' + angular.toJson(resp.data));
							$mdToast.show($mdToast.simple().content(
							'Students Data Uploaded Sucessfully.').position("top")
							.hideDelay(3000));
						},
						function(resp) {
							console.log('Error status: ' + resp.status);
						},
						function(evt) {
							var progressPercentage = parseInt(100.0
									* evt.loaded / evt.total);
							console.log('progress: ' + progressPercentage
									+ '% ' + evt.config.data.file.name);
						});
			};
			
			//END Test upload file code

		});
