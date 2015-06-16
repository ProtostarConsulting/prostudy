package com.protostar.medical.records.server.data;


public class PatientInfoUtil {


	

	public static PatientInfo toPatientInfo(Patient p) {

		PatientInfo patientInfo = new PatientInfo();
		patientInfo.setId(p.getId());
		patientInfo.setFirstName(p.getFirstName());
		patientInfo.setLastName(p.getLastName());
		patientInfo.setAge(p.getAge());
		patientInfo.setOccupation(p.getOccupation());
		patientInfo.setPhone(p.getPhone());

		patientInfo.setSex(p.getSex());
		patientInfo.setAddr1(p.getAddr1());
		patientInfo.setAddr2(p.getAddr2());
		patientInfo.setCity(p.getCity());
		patientInfo.setPin(p.getPin());

		patientInfo.setFirstvisit(p.getFirstvisit());
		patientInfo.setClinicalnote(p.getClinicalnote());
		patientInfo.setInvestigationreport(p.getInvestigationreport());
		patientInfo.setProvdig(p.getProvdig());
		// patientInfo.setInvestigation_report(p.getInvestigation_report());

		patientInfo.setDignoafterinvestigation(p.getDignoafterinvestigation());
		patientInfo.setAdvice(p.getAdvice());
		patientInfo.setFollowup(p.getFollowup());
		patientInfo.setObservation(p.getObservation());
		patientInfo.setDate(p.getDate());
		return patientInfo;

	}

	public static Patient toPatient(PatientInfo p) {

		Patient patient = new Patient();
		patient.setId(p.getId());
		patient.setFirstName(p.getFirstName());
		patient.setLastName(p.getLastName());
		patient.setAge(p.getAge());
		patient.setOccupation(p.getOccupation());
		patient.setPhone(p.getPhone());
		patient.setSex(p.getSex());
		patient.setAddr1(p.getAddr1());
		patient.setAddr2(p.getAddr2());
		patient.setCity(p.getCity());
		patient.setPin(p.getPin());

		patient.setFirstvisit(p.getFirstvisit());
		patient.setClinicalnote(p.getClinicalnote());
		patient.setInvestigationreport(p.getInvestigationreport());
		patient.setProvdig(p.getProvdig());
		// patient.setInvestigation_report(p.getInvestigation_report());

		patient.setDignoafterinvestigation(p.getDignoafterinvestigation());
		patient.setAdvice(p.getAdvice());
		patient.setFollowup(p.getFollowup());
		patient.setObservation(p.getObservation());
		patient.setDate(p.getDate());
		return patient;

	}

}
