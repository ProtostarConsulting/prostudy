function init() {
//	alert("Inside init");
	window.initGAPI(); // Calls the init function defined on the window

}

angular.module("amclinapp", []).controller(
		"MyController",
		[
				'$scope',
				'$window',
				function($scope, $window) {
					$scope.items = {};
					$scope.clickDiv = {};
					$scope.serMsg={};
					$scope.medicine={id:"",mname:"",qty:"",baserate:"",rate:""};
					
/*					$scope.medicine.id="";
					$scope.medicine.mname="";
					$scope.medicine.qty="";
					$scope.medicine.baserate="";
					$scope.medicine.rate="";				
*/					
					$scope.medicineList={};
					
					$scope.clickDiv.saveMedicine = function() {
						$scope.medicine.id=document.getElementById("id").value;
						$scope.medicine.mname=document.getElementById("mname").value;
						$scope.medicine.qty=document.getElementById("qty").value;
						$scope.medicine.baserate=document.getElementById("baserate").value;
						$scope.medicine.rate=document.getElementById("rate").value;
						
					//	console.log(resp.medicine);
						gapi.client.medicinestockservice.saveMedicineStock($scope.medicine
							/*{"medicineName" : $scope.mname,
							"quantity" : $scope.qty,
							"baseRate" : $scope.baserate,
							"rate" : $scope.rate}*/
						).execute(function(resp) {
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
					
					$scope.getAllMedicine = function() {
						gapi.client.medicinestockservice.getAllMedicine()
								.execute(function(resp) {
								//	 alert(resp.items[0].medicineName);
//									console.log(resp.items);
									// $scope.serMsg = resp.items;
//									$scope.items = resp.items;
									
									console.log(resp);
									var table = $('#medicineDataTable').DataTable();
									alert(resp.items.length);
									
									$scope.medicineList=resp.items;
									$('#medicineDataTable').dataTable().fnClearTable();
									for(var i=0;i<resp.items.length;i++)
										{
										
										 var Id = resp.items[i].id;
							    		  var mname = "'"+resp.items[i].mname+"'";
							    		  var qty = "'"+resp.items[i].qty+"'";
							    		  var baserate = "'"+resp.items[i].baserate+"'";
							    		  var rate = "'"+resp.items[i].rate+"'";
							    		  
							    		  var seq = +i + +1;
										
									table.row.add( ['<a href="#" onclick="seletctUser('+Id+','+mname+','+qty+','+baserate+','+rate+')">'+resp.items[i].mname+'</a>',
									                resp.items[i].qty,resp.items[i].baserate,resp.items[i].rate] ).draw();
										}

									$scope.$apply();
								});
					}
/*
					$scope.seletctUser = function(i) {
//						alert("Hi" + i.medicineName);
						$scope.medicine = i;
					}
*/					
					$scope.clickDiv.addMedicine = function() {
						$scope.medicine.mname = "";
						$scope.medicine.qty = "";
						$scope.medicine.baserate = "";
						$scope.medicine.rate = "";
						
						$("#formDiv").removeClass('hidden');
						$("#actionMsgDivR").addClass('hidden');
						$("#actionMsgDivU").addClass('hidden');
						$("#main").addClass('hidden');
						
					//	$("#formDiv").removeClass('hidden');
					//	$("#actionMsgDiv").addClass('hidden');
						
						$scope.getAllMedicine();
					}

					$scope.clickDiv.cancelBtn = function() {
						document.location = '/index.html';
					}
				
					// New code in ctler

					$window.initGAPI = function() {
						// $scope.$apply($scope.initgapi);
						$scope.$apply($scope.loadCustomServices);
					//	alert("Inside window.initGAPI");

					};

					$scope.loadCustomServices = function() {
					//	alert("Inside loadCustomServices");

						var apiRoot = '//' + window.location.host + '/_ah/api';
						// Loads the OAuth and helloworld APIs
						// asynchronously, and
						// triggers login
						// when they have completed.
						var apisToLoad;

						apisToLoad = 1; // must match number of calls to

						gapi.client.load('medicinestockservice', 'v0.1', function() {
							$scope.is_backend_ready = true;
							$scope.getAllMedicine();
						}, apiRoot);

					};

				} ]);
