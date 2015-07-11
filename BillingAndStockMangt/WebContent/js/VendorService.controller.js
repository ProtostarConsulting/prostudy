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
					$scope.vendor={id:"",vendorName:"",mobileNo:"",email:"",city:"",pin:""};
								
					$scope.vendorList={};
					
					$scope.clickDiv.saveVendor = function() {
						$scope.vendor.id=document.getElementById("id").value;
						$scope.vendor.vendorName=document.getElementById("vendorName").value;
						$scope.vendor.mobileNo=document.getElementById("mobileNo").value;
						$scope.vendor.email=document.getElementById("emailid").value;
						$scope.vendor.city=document.getElementById("city").value;
						$scope.vendor.pin=document.getElementById("pin").value;
						
					//	console.log(resp.vendor);
						gapi.client.vendorservice.saveVendor($scope.vendor).execute(function(resp) {
							alert(resp.token);
//					//		$scope.serMsg = resp.data;
							
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
					
					$scope.getAllVendors = function() {
						gapi.client.vendorservice.getAllVendors()
								.execute(function(resp) {
								//	 alert(resp.items[0].medicineName);
//									console.log(resp.items);
									// $scope.serMsg = resp.items;
//									$scope.items = resp.items;
									
									console.log(resp);
									var table = $('#vendorssDataTable').DataTable();
									alert(resp.items.length);
									
									$scope.vendorList=resp.items;
									$('#vendorssDataTable').dataTable().fnClearTable();
									for(var i=0;i<resp.items.length;i++)
										{
									
										 var Id = resp.items[i].id;
							    		  var vendorName = "'"+resp.items[i].vendorName+"'";
							    		  var mobileNo = "'"+resp.items[i].mobileNo+"'";
							    		  var email = "'"+resp.items[i].email+"'";
							    		  var city = "'"+resp.items[i].city+"'";
							    		  var pin = "'"+resp.items[i].pin+"'";
							    		  
							    		  var seq = +i + +1;
										
									table.row.add( [seq,'<a href="#" onclick="seletctUser('+Id+','+vendorName+','+mobileNo+','+email+','+city+','+pin+')">'+resp.items[i].vendorName+'</a>',
									                resp.items[i].mobileNo,resp.items[i].email,resp.items[i].city,resp.items[i].pin] ).draw();
										}

									$scope.$apply();
								});
					}
/*
					$scope.seletctUser = function(i) {
//						alert("Hi" + i.customerName);
						$scope.customer = i;
					}
*/					
					$scope.clickDiv.addvendor = function() {
						$scope.vendor.vendorName = "";
						$scope.vendor.mobileNo = "";
						$scope.vendor.email = "";
						$scope.vendor.city = "";
						$scope.vendor.pin = "";
						
						$("#formDiv").removeClass('hidden');
						$("#actionMsgDivR").addClass('hidden');
						$("#actionMsgDivU").addClass('hidden');
						$("#main").addClass('hidden');
						
					//	$("#formDiv").removeClass('hidden');
					//	$("#actionMsgDiv").addClass('hidden');
						
						$scope.getAllVendors();
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

						gapi.client.load('vendorservice', 'v0.1', function() {
							$scope.is_backend_ready = true;
							$scope.getAllVendors();
						}, apiRoot);

					};

				} ]);
