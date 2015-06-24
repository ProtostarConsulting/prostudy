package com.protostar.medical.records.server.endpoint;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;
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
import com.protostar.medical.records.server.data.Patient;
import com.protostar.medical.records.server.data.PatientInfo;
import com.protostar.medical.records.server.data.PatientInfoUtil;

@Api(name = "medicinestockservice", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.medical.records.server.endpoint", ownerName = "com.protostar.medical.records.server.endpoint", packagePath = ""))
public class MedicineStockServiceImpl {

	@ApiMethod(name = "saveMedicineStock")
	public MyBean saveMedicineStock(MedicineStockInfo medicine)
			throws IllegalArgumentException {
		// Store it in Google datastore
		MyBean mybean = new MyBean();

		EntityManager em = null;

		if (medicine.getId() == null) {
			mybean.setToken("R");
		}

		else{
			mybean.setToken("U");
		}

		MedicineStock medicineEntity = MedicineStockInfoUtil
				.toMedicineStock(medicine);
		try {
			em = EMF.get().createEntityManager();
			em.persist(medicineEntity);
		} finally {
			em.close();
		}

		mybean.setMyData("Medicine Record Added Successfully with ID:"
				+ medicineEntity.getId() + ""
				+ medicineEntity.getMname());
		return mybean;
	}

	@ApiMethod(name = "getAllMedicine")
	public List<MedicineStockInfo> getAllMedicine()
			throws IllegalArgumentException {
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

	@ApiMethod(name = "getMedicineByID")
	public MedicineStockInfo getMedicineByID(@Named("id") Long id) {
		MedicineStockInfo medicineStockInfo = new MedicineStockInfo();
		MyBean myBean = new MyBean();
		EntityManager em = null;

		try {
			em = EMF.get().createEntityManager();
			Query q = em
					.createQuery("Select m from MedicineStock m where m.id="
							+ id);

			List<MedicineStock> resuList = q.getResultList();
			MedicineStock medicineStock = resuList.get(0);
			medicineStockInfo = MedicineStockInfoUtil
					.toMedicineStockInfo(medicineStock);
		} finally {
			em.close();
		}
		return medicineStockInfo;
	}
}
