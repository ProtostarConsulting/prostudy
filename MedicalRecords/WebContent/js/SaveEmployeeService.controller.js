function init() {
	alert("Inside init");
	window.initGAPI(); // Calls the init function defined on the window

}

angular.module("amclinapp", []).controller(
		"MyController",
		[
				'$scope',
				'$window',
				function($scope, $window) {

					alert("Inside Controller");
					// Initialize
					$scope.serMsg = {};
					$scope.items = {};
					$scope.clickDiv = {};

					$scope.employee = {id:"",firstName:"",lastName:"",addressLine1:"",addressLine2:"",city:"",pin:"",moboileNo:""};
/*					$scope.employee.id = "";
					$scope.employee.firstName = "";
					$scope.employee.lastName = "";
					$scope.employee.addressLine1 = "";
					$scope.employee.addressLine2 = "";
					$scope.employee.city = "";
					$scope.employee.pin = "";
					$scope.employee.moboileNo = "";
*/
					$scope.employeeList={};
					
					$scope.clickDiv.saveEmployee = function() {
						gapi.client.employeeservice.saveEmployee(
								$scope.employee).execute(
								function(resp) {
									alert(resp.token);
									// $scope.serMsg = resp.data;
									$scope.employee.id = document.getElementById("id").value;
									$scope.employee.firstName = document.getElementById("firstName");
									$scope.employee.lastName = document.getElementById("lastName");
									$scope.employee.addressLine1 = document.getElementById("addressLine1");
									$scope.employee.addressLine2 = document.getElementById("addressLine2");
									$scope.employee.city = document.getElementById("city");
									$scope.employee.pin = document.getElementById("pin");
									$scope.employee.moboileNo = document.getElementById("moboileNo");
									
									if (resp.token == "U") {
										$("#formDiv").addClass('hidden');
										$("#actionMsgDivU").removeClass(
												'hidden');
										$("#main").removeClass('hidden');
									} else {
										$("#formDiv").addClass('hidden');
										$("#actionMsgDivR").removeClass(
												'hidden');
										$("#main").removeClass('hidden');
									}
									/*
									 * $("#formDiv").addClass('hidden');
									 * $("#actionMsgDiv").removeClass('hidden');
									 */
								});
					}

					$scope.clickDiv.fetchAllEmployee = function() {
						gapi.client.employeeservice.getAllEmployee().execute(
								function(resp) {
								//	alert(resp.data);
								//	$scope.items = resp.items;
									
									console.log(resp);
									var table = $('#employeeDataTable').DataTable();
									alert(resp.items.length);
									
									$scope.employeeList=resp.items;
									$('#employeeDataTable').dataTable().fnClearTable();
									for(var i=0;i<resp.items.length;i++)
										{
										
										 var Id = resp.items[i].id;
							    		  var firstName = "'"+resp.items[i].firstName+"'";
							    		  var lastName = "'"+resp.items[i].lastName+"'";
							    		  var addressLine1 = "'"+resp.items[i].addressLine1+"'";
							    		  var addressLine2 = "'"+resp.items[i].addressLine2+"'";
							    		  var city = "'"+resp.items[i].city+"'";
							    		  var pin = "'"+resp.items[i].pin+"'";
							    		  var moboileNo = "'"+resp.items[i].moboileNo+"'";
							    		  
							    		  var seq = +i + +1;
										
									table.row.add( ['<a href="#" onclick="seletctUser('+Id+','+firstName+','+lastName+','+addressLine1+','+addressLine2+','+city+','+pin+','+moboileNo+')">'+resp.items[i].firstName+'</a>',resp.items[i].lastName,resp.items[i].addressLine1,resp.items[i].addressLine2,resp.items[i].city,resp.items[i].pin,resp.items[i].moboileNo] ).draw();
										}
									$scope.$apply();
								});
					}

					$scope.clickDiv.addEmployee = function() {
						$scope.employee.firstName = "";
						$scope.employee.lastName = "";
						$scope.employee.addressLine1 = "";
						$scope.employee.addressLine2 = "";
						$scope.employee.city = "";
						$scope.employee.pin = "";
						$scope.employee.moboileNo = "";

						$("#formDiv").removeClass('hidden');
						$("#actionMsgDivR").addClass('hidden');
						$("#actionMsgDivU").addClass('hidden');
						$("#main").addClass('hidden');

						/*
						 * $("#formDiv").removeClass('hidden');
						 * $("#actionMsgDiv").addClass('hidden');
						 */
					}

					$scope.clickDiv.clearall = function() {
						$scope.employee.firstName = "";
						$scope.employee.lastName = "";
						$scope.employee.addr1 = "";
						$scope.employee.addr2 = "";
						$scope.employee.city = "";
						$scope.employee.pin = "";
						$scope.employee.mobileNumber = "";
					}

					$scope.seletctUser = function(i) {
						alert("Hi" + i.firstName);
						$scope.employee = i;
					}

					$scope.clickDiv.cancelBtn = function() {
						document.location = '/index.html';
					}

					/*
					 * $scope.removeItem = function(index){
					 * $scope.items.splice(index,1); }
					 */

					/*
					 * $scope.removeItem = function($event) {
					 * $event.stopPropagation(); //keep the row from being
					 * selected $scope.data.selectAll(false); //remove all
					 * selections: necessary for issues with the selection array
					 * var index = $scope.data.indexOf(this.row.entity); //get
					 * the correct index to splice $scope.metrics.splice(index,
					 * 1); //remove the element };
					 */
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

						gapi.client.load('employeeservice', 'v0.1', function() {
							$scope.is_backend_ready = true;
							$scope.clickDiv.fetchAllEmployee();
						}, apiRoot);
					};
				} ]);
