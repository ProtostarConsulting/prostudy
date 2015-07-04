function PatientService(){
	
var savePatient = function(patientObj) {
	gapi.client.patientservice.savePatient(patientObj).execute(function(resp) {		
		console.log("Patient saved successfully!");
	});
	return true;
}



var getPatientList = function() {
	gapi.client.patientservice.getAllPatients().execute(function(resp) {
		$scope.items = resp.items;
		console.log("Got Patient list successfully!");
		
	});
	return $scope.items;
}

}