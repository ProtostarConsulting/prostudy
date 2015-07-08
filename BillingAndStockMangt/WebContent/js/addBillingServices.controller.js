function init() {
	//alert("Inside init");
	window.initGAPI(); // Calls the init function defined on the window

}

angular
		.module("myapp", [])
		.controller(
				"MyController",
				[
						'$scope',
						'$window',
						function($scope, $window) {
							$scope.fname = "Default Name"
							$scope.serMsg = "";
							$scope.vechileToEdit= {};
							$scope.vechileslist = {};
							//alert("Inside Controller");

							            $scope.alldata = {};
										$scope.clickDiv = {};
										$scope.saveVechile = {id:"",vechile_No:"",owner_Name:"",date_Time_Recevied:"",notes:""};
										
										$scope.clickDiv.addVechile = function() {
											
											$scope.saveVechile.id = document.getElementById("id").value;
											$scope.saveVechile.vechile_No = document.getElementById("vechile_No").value;
											$scope.saveVechile.owner_Name = document.getElementById("owner_Name").value;
											$scope.saveVechile.date_Time_Recevied = document.getElementById("date_Time_Recevied").value;
											$scope.saveVechile.notes = document.getElementById("notes").value;
											
											gapi.client.vechileServices.addVechile($scope.saveVechile).execute(function(resp) {
												//alert(resp.token);
												console.log(resp);
												if(resp.token=="R")
													{
													$("#updateForm").hide();
													$("#actionMsgDiv").show();
													}
												else
												{
													$("#updateForm").hide();
													$("#actionMsgDiv1").show();
												}
												
												
											});
										};
										
										
										$scope.addNewUser = function() {
											
											$scope.saveVechile="";
											$("#updateForm").show();
											$("#listofuser").hide();
											$("#actionMsgDiv").hide();
										
										}
										
										
										
										
										
										$scope.seletctUser2 = function(vechileId) {
											alert(vechileId);
											$("#updateForm").show();
											$("#listofuser").hide();
											$scope.saveVechile = i;
											$scope.vechileToEdit=getVehicleByID(vechileId);
											}
										
										
										$scope.getAllVechile = function() {
										 gapi.client.vechileServices.getAllVechile().execute(function(resp) 
													{
														console.log(resp);
														var table = $('#example').DataTable();
														alert(resp.items.length);
														
														$scope.vechileslist=resp.items;
														$('#example').dataTable().fnClearTable();
														for(var i=0;i<resp.items.length;i++)
															{
															
															 var Id = resp.items[i].id;
												    		  var owner_Name = "'"+resp.items[i].owner_Name+"'";
										
												    		  var vechile_No = "'"+resp.items[i].vechile_No+"'";
												    		  var date_Time_Recevied = "'"+resp.items[i].date_Time_Recevied+"'";
												    		  var notes = "'"+resp.items[i].notes+"'";
												    		  
												    		  var seq = +i + +1;
															
															
														table.row.add( [seq,'<a href="#" onclick="seletctUser('+Id+','+owner_Name+','+vechile_No+','+date_Time_Recevied+','+notes+')">'+resp.items[i].owner_Name+'</a>',
														                resp.items[i].vechile_No,resp.items[i].date_Time_Recevied,resp.items[i].notes] ).draw();
															}
														$("#listofuser").show();
														$("#updateForm").hide();
														$("#actionMsgDiv").hide();
														$("#actionMsgDiv1").hide();
														$scope.$apply();
													});
										}
							
							// New code in ctler

							$window.initGAPI = function() {
								// $scope.$apply($scope.initgapi);
								$scope.$apply($scope.loadCustomServices);
								//alert("Inside window.initGAPI");

							};

							$scope.loadCustomServices = function() {
								var apiRoot = '//' + window.location.host
										+ '/_ah/api';

								// Loads the OAuth and helloworld APIs
								// asynchronously, and
								// triggers login
								// when they have completed.
								var apisToLoad;

								apisToLoad = 1; // must match number of calls to
								// gapi.client.load()
								gapi.client.load('vechileServices', 'v0.1',
										function() {
											$scope.is_backend_ready = true;
											$scope.getAllVechile();
										}, apiRoot);
								
							};

						} ]);
