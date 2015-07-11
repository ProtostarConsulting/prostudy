function init() {
	alert("Inside init");
	window.initGAPI(); // Calls the init function defined on the window

}

angular.module("crmApp", []).controller(
		"MyController",
		[
				'$scope',
				'$window',
				function($scope, $window) {
					$scope.items = {};
					$scope.clickDiv = {};
					$scope.serMsg={};
					$scope.customer={id:"",firstName:"",lastName:"",mobileNo:"",email:"",address1:"",address2:"",city:"",pin:""};
								
					$scope.customerList={};
					
					$scope.clickDiv.saveCustomer = function() {
						$scope.customer.id=document.getElementById("id").value;
						$scope.customer.firstName=document.getElementById("firstName").value;
						$scope.customer.lastName=document.getElementById("lastName").value;
						$scope.customer.mobileNo=document.getElementById("mobileNo").value;
						$scope.customer.email=document.getElementById("email").value;
						$scope.customer.address1=document.getElementById("address1").value;
						$scope.customer.address2=document.getElementById("address2").value;
						$scope.customer.city=document.getElementById("city").value;
						$scope.customer.pin=document.getElementById("pin").value;
						
					//	console.log(resp.customer);
						gapi.client.newcustomerservice.saveCustomer($scope.customer).execute(function(resp) {
							alert(resp.token);
//							$scope.serMsg = resp.data;
							
							if (resp.token == "U") {
								
								$("#formDiv").addClass('hidden');
								$("#actionMsgDivU").removeClass('hidden');
								$("#main").removeClass('hidden');
							} 
							else {
								$("#formDiv").addClass('hidden');
								$("#actionMsgDivR").removeClass('hidden');
								$("#main").removeClass('hidden');
							}
							
						//	$("#formDiv").addClass('hidden');
						//	$("#actionMsgDiv").removeClass('hidden');
						});
					}					
					
					$scope.getAllCustomers = function() {
						gapi.client.newcustomerservice.getAllCustomers()
								.execute(function(resp) {
								//	 alert(resp.items[0].medicineName);
//									console.log(resp.items);
									// $scope.serMsg = resp.items;
//									$scope.items = resp.items;
									
									console.log(resp);
									var table = $('#customersDataTable').DataTable();
									alert(resp.items.length);
									
									$scope.customerList=resp.items;
									$('#customersDataTable').dataTable().fnClearTable();
									for(var i=0;i<resp.items.length;i++)
										{
									
										 var Id = resp.items[i].id;
							    		 var firstName = "'"+resp.items[i].firstName+"'";
							    		 var lastName = "'"+resp.items[i].lastName+"'";
							    		 var mobileNo = "'"+resp.items[i].mobileNo+"'";
							    		 var email = "'"+resp.items[i].email+"'";
							    		 var address1 = "'"+resp.items[i].address1+"'"+resp.items[i].address2+"'";
							    		 var address2 = "'"+resp.items[i].address2+"'";
							    		 var city = "'"+resp.items[i].city+"'";
							    		 var pin = "'"+resp.items[i].pin+"'";
							    		  
							    		  var seq = +i + +1;
										
									table.row.add( [seq,'<a href="#" onclick="seletctUser('+Id+','+firstName+','+lastName+','+mobileNo+','+email+','+address1+','+address2+','+city+','+email+')">'+resp.items[i].firstName+'</a>',
									                resp.items[i].lastName,resp.items[i].mobileNo,resp.items[i].email,resp.items[i].address1,resp.items[i].address2,resp.items[i].city,resp.items[i].pin] ).draw();
										}

									$scope.$apply();
								});
					}

					$scope.myFunction = function(i) {
						alert("Hi" + i.customerName);
						$scope.customer = i;
					}
					
					$scope.clickDiv.addcustomer = function() {
						$scope.customer.firstName = "";
						$scope.customer.lastName = "";
						$scope.customer.mobileNo = "";
						$scope.customer.email = "";
						$scope.customer.address1 = "";
						$scope.customer.address2 = "";
						$scope.customer.city = "";
						$scope.customer.pin = "";
						
						$("#formDiv").removeClass('hidden');
						$("#actionMsgDivR").addClass('hidden');
						$("#actionMsgDivU").addClass('hidden');
						$("#main").addClass('hidden');
						
					//	$("#formDiv").removeClass('hidden');
					//	$("#actionMsgDiv").addClass('hidden');
						
						$scope.getAllCustomers();
					}

					$scope.clickDiv.cancelBtn = function() {
						document.location = '/index.html';
					}
				
					// New code in ctler

					$window.initGAPI = function() {
						// $scope.$apply($scope.initgapi);
						$scope.$apply($scope.loadCustomServices);
						alert("Inside window.initGAPI");

					};

					$scope.loadCustomServices = function() {
						alert("Inside loadCustomServices");

						var apiRoot = '//' + window.location.host + '/_ah/api';
						// Loads the OAuth and helloworld APIs
						// asynchronously, and
						// triggers login
						// when they have completed.
						var apisToLoad;

						apisToLoad = 1; // must match number of calls to

						gapi.client.load('newcustomerservice', 'v0.1', function() {
							$scope.is_backend_ready = true;
							$scope.getAllCustomers();
						}, apiRoot);

					};

				} ]);
