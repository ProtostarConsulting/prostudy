angular.module("prostudyApp").controller(
		"updateMyProfileCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q,tableTestDataFactory,appEndpointSF,$state) {
			
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Profile Updated!')
						.position("top").hideDelay(3000));
			};
			$scope.curUser=appEndpointSF.getLocalUserService().getLoggedinUser();
			$log.debug("$scope.curUser : "+angular.toJson($scope.curUser));

			$scope.tempUser =$scope.curuser;
			
			$scope.getInstitutes = function(){
				var InstituteService = appEndpointSF.getInstituteService();					
				InstituteService.getInstitutes()
				.then(
						function(instituteList) {
							$log.debug("Inside Ctr getInstitutes");
							$scope.institutes = instituteList;
							$log.debug("$scope.institutes :"+$scope.institutes);
						});
			}
			$scope.getInstitutes();
			
			//$scope.tempUser =$scope.curUser;
			$scope.tempUser = {
					id: $scope.curUser.id,
					firstName : $scope.curUser.firstName,
					lastName : $scope.curUser.lastName,
					email_id : $scope.curUser.email_id,
					address : $scope.curUser.address,
					contact : $scope.curUser.contact,
					role : $scope.curUser.role,
					gender : "",	
					myExams : [],	
					myBooks : [],	
					
				};

			$scope.updateUser = function() {
				$log.debug("No1");
				var UserService = appEndpointSF.getUserService();
				UserService.updateUser($scope.tempUser).then(function(msgBean) {
					$log.debug("msgBean :"+angular.toJson(msgBean));
					$log.debug("Inside Ctr updateUser");
					
					$scope.showSavedToast();
					$scope.tempUser = {
						
						};
					$state.go("home");
				});
				$log.debug("No4");
			}

			$scope.generateXXert = function() {
				//alert("Inside generateXXert");
				callScriptFunction();
				
				
			}
			
			$scope.skip = function() {
				
				$state.go("home");

			}
			 var CLIENT_ID = '634862986526-uivr0qus58aecuol1a9m6uut2tm392pt.apps.googleusercontent.com';
		      var SCOPES = ['https://www.googleapis.com/auth/drive'];
		      

		      /**		       
		       ** 
		       * Handle response from authorization se .
		       *
		       * @param {Object} authResult Authorization result.
		       */
		      function handleAuthResult(authResult) {
		    	  alert("Inside handleAuthResult");
		    	    var authorizeDiv = document.getElementById('authorize-div');
		            if (authResult && !authResult.error) {
		              // Hide auth UI, then load client library.
		              authorizeDiv.style.display = 'none';
		              callScriptFunction();
		            } else {
		              // Show auth UI, allowing the user to initiate authorization by
		              // clicking authorize button.
		              authorizeDiv.style.display = 'inline';
		            }
		      }

		      /**
		       * Initiate auth flow in response to user clicking authorize button.
		       *
		       * @param {Event} event Button click event.
		       */
		    $scope.handleAuthClick =  function(event) {
		    	 alert("Inside handleAuthClick");
		    	 gapi.auth.authorize(
				          {
				            'client_id': CLIENT_ID,
				            'scope': SCOPES.join(' '),
				            'immediate': true
				          }, handleAuthResult);
		    	 
		        return false;
		      }
		    
		    
			/**
		       * Calls an Apps Script function to list the folders in the user's
		       * root Drive folder.
		       */
		      function callScriptFunction() {	
		    	  alert("Inside callScriptFunction");
		    	  
		        var scriptId = 'Mm3pwGpNme6shBSSmQgwVg5HTrNlfXpC1';
		        alert("scriptId"+scriptId);
		        // Create an execution request object.
		        var request = {
		            'function': 'readReplaceFieldsInDocument',
		            'parameters': {"fname" : "Protostar_Doc",
		            	           "date"  :"23/2/2016"
		                          }
		            };
		        
		   

		        // Make the API request.
		        var op = gapi.client.request({
		            'root': 'https://script.googleapis.com',
		            'path': 'v1/scripts/' + scriptId + ':run',
		            'method': 'POST',
		            'body': request
		        });

		        op.execute(function(resp) {
		          if (resp.error && resp.error.status) {
		            // The API encountered a problem before the script
		            // started executing.
		            appendPre('Error calling API:');
		            appendPre(JSON.stringify(resp, null, 2));
		          } else if (resp.error) {
		            // The API executed, but the script returned an error.

		            // Extract the first (and only) set of error details.
		            // The values of this object are the script's 'errorMessage' and
		            // 'errorType', and an array of stack trace elements.
		            var error = resp.error.details[0];
		            appendPre('Script error message: ' + error.errorMessage);
		            alert("error:" + JSON.stringify(error));
		            if (error.scriptStackTraceElements) {
		              // There may not be a stacktrace if the script didn't start
		              // executing.
		              appendPre('Script error stacktrace:');
		              for (var i = 0; i < error.scriptStackTraceElements.length; i++) {
		                var trace = error.scriptStackTraceElements[i];
		                //appendPre('\t' + trace.function + ':' + trace.lineNumber);
		              }
		            }
		          }
		        });
		        
		        
		        /**
		         * Append a pre element to the body containing the given message
		         * as its text node.
		         *
		         * @param {string} message Text to be placed in pre element.
		         */
		        function appendPre(message) {
		          var pre = document.getElementById('output');
		          var textContent = document.createTextNode(message + '\n');
		          pre.appendChild(textContent);
		        }
		      }
		
		});
