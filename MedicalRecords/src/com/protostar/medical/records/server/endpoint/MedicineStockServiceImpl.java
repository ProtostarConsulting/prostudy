package com.protostar.medical.records.server.endpoint;

import java.util.ArrayList;
import java.util.List;

import javax.mail.Store;
import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.medical.records.server.data.EMF;
import com.protostar.medical.records.server.data.MedicineStock;
import com.protostar.medical.records.server.data.MedicineStockInfo;
import com.protostar.medical.records.server.data.MedicineStockInfoUtil;
import com.protostar.medical.records.server.data.MyBean;

@Api(name = "medicinestockservice", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.medical.records.server.endpoint", ownerName = "com.protostar.medical.records.server.endpoint", packagePath = ""))
public class MedicineStockServiceImpl {

	private String escapeHtml(String html) {
		if (html == null) {
			return null;
		}
		return html.replaceAll("&", "&amp;").replaceAll("<", "&lt;")
				.replaceAll(">", "&gt;");
	}

	@ApiMethod(name = "saveMedicineStock")
	public MyBean saveMedicineStock(MedicineStockInfo medicine)
			throws IllegalArgumentException {
		// Store it in Google datastore
		MyBean mybean = new MyBean();

		EntityManager em = null;

		MedicineStock medicineEntity = MedicineStockInfoUtil
				.toMedicineStock(medicine);
		try {
			em = EMF.get().createEntityManager();
			em.persist(medicineEntity);
		} finally {
			em.close();
		}
		mybean.setData("Medicine Record Added Successfully with ID:"
				+ medicineEntity.getId() + ""
				+ medicineEntity.getMedicineName());
		return mybean;
	}

	@ApiMethod(name = "getAllMedicine")
	public List<MedicineStockInfo> getAllMedicine()
			throws IllegalArgumentException
	{
		// TODO Auto-generated method stub

		List<MedicineStockInfo> resultList = new ArrayList<MedicineStockInfo>();
		MyBean myBean = new MyBean();
		EntityManager em = null;

		try {
			em = EMF.get().createEntityManager();
			Query q = em.createQuery("select ms from MedicineStock ms");
			List<MedicineStock> resultList2 = q.getResultList();
			for (MedicineStock ms : resultList2)
				resultList.add(MedicineStockInfoUtil.toMedicineStockInfo(ms));
		}

		catch (Exception e) {
			e.printStackTrace();
		}

		finally {
			em.close();
		}
		return resultList;
	}

	/*
	 * @Override public MedicineStockInfo getMedicineById(Long id) throws
	 * IllegalArgumentException { MedicineStockInfo medicineStockInfo = null;
	 * EntityManager em = null; try { em = EMF.get().createEntityManager();
	 * Query q = em .createQuery("select ms from MedicineStock ms where ms.id ="
	 * + id); List<MedicineStock> resultList = q.getResultList(); if
	 * (resultList.size() > 0) { MedicineStock medicineStock =
	 * resultList.get(0); medicineStockInfo =
	 * MedicineStockInfo.toMedicineStockInfo(medicineStock); } }
	 * 
	 * finally { em.close(); } return medicineStockInfo; }
	 * 
	 * // @Override public String updateMedicine(MedicineStockInfo medicine)
	 * throws IllegalArgumentException { // TODO Auto-generated method stub //
	 * Store it in Google datastore EntityManager em = null;
	 * 
	 * MedicineStock medicineEntity =
	 * MedicineStockInfo.toMedicineStock(medicine); try { em =
	 * EMF.get().createEntityManager(); em.persist(medicineEntity); } finally {
	 * em.close(); } return "Medicine Record Updated Successfully. " +
	 * medicineEntity.toString() + ", ID:" + medicineEntity.getId()+ ", Name:" +
	 * medicineEntity.getMedicineName(); }
	 */
}
