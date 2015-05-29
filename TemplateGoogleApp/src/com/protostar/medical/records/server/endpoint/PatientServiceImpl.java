package com.protostar.medical.records.server.endpoint;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.medical.records.server.data.EMF;
import com.protostar.medical.records.server.data.Patient;
import com.protostar.medical.records.server.data.PatientInfo;

/**
 * The server-side implementation of the RPC service.
 */

@Api(name = "patientservice", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.medical.records.server.endpoint", ownerName = "com.protostar.medical.records.server.endpoint", packagePath = ""))

public class PatientServiceImpl{

	
	/**
	 * Escape an html string. Escaping data received from the client helps to
	 * prevent cross-site script vulnerabilities.
	 * 
	 * @param html
	 *            the html string to escape
	 * @return the escaped string
	 */
	private String escapeHtml(String html) {
		if (html == null) {
			return null;
		}
		return html.replaceAll("&", "&amp;").replaceAll("<", "&lt;")
				.replaceAll(">", "&gt;");
	}

	public String savePatient(PatientInfo patient)
			throws IllegalArgumentException {
		// Store it in Google datastore
		EntityManager em = null;

		Patient patientEntity = PatientInfo.toPatient(patient);
		try {
			em = EMF.get().createEntityManager();
			em.persist(patientEntity);
		} finally {
			em.close();
		}
		return "Patient Record Added Successfully. " + patientEntity.toString() + ", ID:" + patientEntity.getId();
	}

//	@Override
	public List<PatientInfo> getAllPatients()  {

		List<PatientInfo> resultList = new ArrayList<PatientInfo>();
		EntityManager em = null;

		
		try {
			em = EMF.get().createEntityManager();
//			Query q = em.createQuery("select * from " + Patient.class.getName());
			Query q = em.createQuery("select p from Patient p");
			List<Patient> resultList2 = q.getResultList();
			for (Patient p: resultList2)
				resultList.add(PatientInfo.toPatientInfo(p));

		} finally {
			em.close();
		}
		return resultList;
	}

	@ApiMethod(name = "getPatientByID")
	public PatientInfo getPatientByID(@Named("id")Long id) {
		PatientInfo patientInfo = null;
		EntityManager em = null;
		try {
			em = EMF.get().createEntityManager();
			Query q = em
					.createQuery("select p from Patient p where p.id ="
							+ id);
			List<Patient> resultList = q.getResultList();
			if (resultList.size() > 0) {
				Patient	patient = resultList.get(0);
				patientInfo = PatientInfo.toPatientInfo(patient);
			}

		} finally {
			em.close();
		}
		
		return patientInfo;
	}
}
