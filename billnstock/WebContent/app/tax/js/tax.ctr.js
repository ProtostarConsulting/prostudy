angular.module("stockApp").controller(
		"taxCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, objectFactory, appEndpointSF) {

			$log.debug("Inside taxCtr");

			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();
			$log.debug("$scope.curUser++++++++"+angular.toJson($scope.curUser));
			
			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('Tax Data Saved!')
						.position("top").hideDelay(3000));
			};

			$scope.tax = {
					taxCodeName:'',
					taxPercenatge:'',
					taxVisibility:true
			}
			
			$scope.addTax = function() {
				$log.debug("No1");
				$scope.tax.loggedInUser =$scope.curUser;
				
				var taxService = appEndpointSF.getTaxService();

				taxService.addTax($scope.tax).then(function(msgBean) {
					$log.debug("No6");
					$log.debug("Inside Ctr addTax");
					$log.debug("msgBean.msg:" + msgBean.msg);
					$scope.showSimpleToast();

				});
				$log.debug("No4");
				$scope.tax = {};
			}

			$scope.getAllTaxes = function() {
				$log.debug("Inside Ctr $scope.getAllTaxes");
				var taxService = appEndpointSF.getTaxService();

				taxService.getAllTaxes($scope.curUser.businessAccount.id).then(
						function(taxList) {
							$log.debug("Inside Ctr getAllTaxes");
							$scope.taxData = taxList;
							$log.debug("Inside Ctr $scope.taxData:"
									+ angular.toJson($scope.taxData));
						});
			}

			$scope.taxData = [];
			$scope.getAllTaxes();

			$scope.selected = [];

			$scope.updateTax = function() {
				$log.debug("Inside Ctr $scope.updateTax");
				var taxService = appEndpointSF.getTaxService();

				taxService.updateTax($scope.selected[0]).then(
						function(msgBean) {
							$log.debug("Inside Ctr updateTax");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSimpleToast();
							$scope.getAllTaxes();
						});
			}
			
/*			$scope.disableTax = function () {
				$log.debug("Inside Ctr $scope.updateTax");
				var taxService = appEndpointSF.getTaxService();
				
				taxService.disableTax($scope.tax.taxVisibility).then(
						function(msgBean){
							$log.debug("Inside Ctr disableTax");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSimpleToast();
						})
				
			}
*/			
			
			var lastValue;

			$("#changer").bind("click", function(e){
			    lastValue = $(this).val();
			}).bind("change", function(e){
			    changeConfirmation = confirm("Really?");
			    if (changeConfirmation) {
			        // Proceed as planned
			    } else {
			        $(this).val(lastValue);
			    }
			});
			
			// Setup menu
			$scope.toggleRight = buildToggler('right');

			function buildToggler(navID) {
				var debounceFn = $mdUtil.debounce(function() {
					$mdSidenav(navID).toggle().then(function() {
						$log.debug("toggle " + navID + " is done");
					});
				}, 200);
				return debounceFn;
			}

			$scope.close = function() {
				$mdSidenav('right').close().then(function() {
					$log.debug("close RIGHT is done");
				});
			};
			
			
			$(document).ready(function() {
			    $('#taxForm').formValidation({
			     /*   framework: 'bootstrap',
			        excluded: ':disabled',*/
			        icon: {
			        	 valid: 'material-icons',
			             invalid: 'material-icons',
			             validating: 'material-icons'
			        },
			        fields: {
			        	taxName: {
			                validators: {
			                    notEmpty: {
			                        message: 'The name is required'
			                    },
			                    stringLength: {
			                        min: 6,
			                        max: 30,
			                        message: 'The name must be more than 6 and less than 30 characters long'
			                    },
			                    regexp: {
			                        regexp: /^[a-zA-Z0-9_]+$/,
			                        message: 'The username can only consist of alphabetical, number and underscore'
			                    }
			                }
			            },
			            description: {
			                validators: {
			                    notEmpty: {
			                        message: 'The description is required'
			                    },
			                    stringLength: {
			                        min: 50,
			                        max: 1000,
			                        message: 'The description must be more than 50 and less than 1000 characters'
			                    }
			                }
			            },
			            price: {
			                validators: {
			                    notEmpty: {
			                        message: 'The price is required'
			                    },
			                    numeric: {
			                        message: 'The price must be a number'
			                    }
			                }
			            },
			            'size[]': {
			                row: '.col-xs-4',
			                validators: {
			                    notEmpty: {
			                        message: 'The size is required'
			                    }
			                }
			            },
			            'color[]': {
			                row: '.col-xs-4',
			                validators: {
			                    notEmpty: {
			                        message: 'The color is required'
			                    }
			                }
			            },
			            availability: {
			                row: '.col-xs-4',
			                validators: {
			                    notEmpty: {
			                        message: 'The availability option is required'
			                    }
			                }
			            }
			        }
			    });

			    // By calling Bootstrap Material Design after calling .formValidation()
			    // you don't need to adjust the position of feedback icons
			    $.material.init();
			});
		});
