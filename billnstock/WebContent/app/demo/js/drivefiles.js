angular
		.module("stockApp")
		.controller(
				"driveFilesCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $stateParams, appEndpointSF) {
					console.log("Inside statesPageCtr");

					$log.debug("$stateParams:", $stateParams);
					$log.debug("$stateParams.someVal:", $stateParams.someVal);

					$scope.objectFromStateParam = [];
					$scope.objectFromStateParam = angular
							.fromJson($stateParams.someVal);

					var developerKey = 'AIzaSyB-3S55huF0S4uPjDiuZFKehSfSrvDtCZk';

					// The Client ID obtained from the Google Developers
					// Console. Replace with your own Client ID.
					var clientId = "871660457189-1ishasdcqph3an1eu26262htusofo6v2.apps.googleusercontent.com"

					// Scope to use to access user's photos.
					var scope = [ 'https://www.googleapis.com/auth/photos',
							'https://www.googleapis.com/auth/photos.upload',
							'https://www.googleapis.com/auth/drive' ];

					var pickerApiLoaded = false;
					var oauthToken;
					var viewId = google.picker.ViewId.PHOTOS;

					$scope.browseDrivePhotos = function() {
						pickerApiLoaded = true;
						viewId = google.picker.ViewId.PHOTOS;
						onAuthApiLoad();
					}

					$scope.uploadDrivePhotos = function() {
						// alert("under dev...");
						pickerApiLoaded = true;
						viewId = google.picker.ViewId.PHOTO_UPLOAD;
						onAuthApiLoad();
					}

					$scope.browseDriveDocs = function() {
						pickerApiLoaded = true;
						viewId = google.picker.ViewId.DOCS;
						onAuthApiLoad();
					}

					function onAuthApiLoad() {
						// alert("Inside: onAuthApiLoad");
						window.gapi.auth.authorize({
							'client_id' : clientId,
							'scope' : scope,
							'immediate' : false
						}, handleAuthResult);
					}

					// Create and render a Picker object for picking user
					// Photos.
					function createPicker() {
						if (pickerApiLoaded && oauthToken) {
							var picker = new google.picker.PickerBuilder()
									.addView(viewId).setOAuthToken(oauthToken)
									.setDeveloperKey(developerKey).setCallback(
											pickerCallback).build();
							picker.setVisible(true);
						}
					}

					function handleAuthResult(authResult) {
						if (authResult && !authResult.error) {
							oauthToken = authResult.access_token;
							createPicker();
						}
					}

					// A simple callback implementation.
					function pickerCallback(data) {
						var url = 'nothing';
						if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
							var doc = data[google.picker.Response.DOCUMENTS][0];
							url = doc[google.picker.Document.URL];
						}
						var message = 'You picked: ' + url;
						document.getElementById('result').innerHTML = message;
						if (data.action == google.picker.Action.PICKED) {
							var fileId = data.docs[0].id;
							alert('The user selected: ' + fileId);
						}

					}

				});