package com.protostar.medical.records.server.data;



public class MedicineStockInfoUtil {


	

	public static MedicineStockInfo toMedicineStockInfo(MedicineStock ms) {

		MedicineStockInfo medicineSstockinfo = new MedicineStockInfo();
		medicineSstockinfo.setId(ms.getId());
		medicineSstockinfo.setMname(ms.getMname());
		medicineSstockinfo.setQty(ms.getQty());
		medicineSstockinfo.setBaserate(ms.getBaserate());
		medicineSstockinfo.setRate(ms.getRate());

		return medicineSstockinfo;
	}

	//For Save value in Database
	
	public static MedicineStock toMedicineStock(MedicineStockInfo msi) {
		MedicineStock medicinestock = new MedicineStock();
		medicinestock.setId(msi.getId());
		medicinestock.setMname(msi.getMname());
		medicinestock.setQty(msi.getQty());
		medicinestock.setBaserate(msi.getBaserate());
		medicinestock.setRate(msi.getRate());

		return medicinestock;

	}

}
