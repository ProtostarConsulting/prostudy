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
		patientInfo.setAddressLine1(p.getAddressLine1());
		patientInfo.setAddressLine2(p.getAddressLine2());
		patientInfo.setCity(p.getCity());
		patientInfo.setPin(p.getPin());

		patientInfo.setDateofvisit(p.getDateofvisit());
		patientInfo.setClinical_note(p.getClinical_note());
		patientInfo.setInvestigation_report(p.getInvestigation_report());
		patientInfo.setProvisional_dignosis(p.getProvisional_dignosis());
		// patientInfo.setInvestigation_report(p.getInvestigation_report());

		patientInfo.setDigno_after_investigation(p
				.getDigno_after_investigation());
		patientInfo.setAdvice(p.getAdvice());
		patientInfo.setFollo_up(p.getFollo_up());
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
		patient.setAddressLine1(p.getAddressLine1());
		patient.setAddressLine2(p.getAddressLine2());
		patient.setCity(p.getCity());
		patient.setPin(p.getPin());

		patient.setDateofvisit(p.getDateofvisit());
		patient.setClinical_note(p.getClinical_note());
		patient.setInvestigation_report(p.getInvestigation_report());
		patient.setProvisional_dignosis(p.getProvisional_dignosis());
		// patient.setInvestigation_report(p.getInvestigation_report());

		patient.setDigno_after_investigation(p.getDigno_after_investigation());
		patient.setAdvice(p.getAdvice());
		patient.setFollo_up(p.getFollo_up());
		patient.setObservation(p.getObservation());
		patient.setDate(p.getDate());
		return patient;

	}

}
