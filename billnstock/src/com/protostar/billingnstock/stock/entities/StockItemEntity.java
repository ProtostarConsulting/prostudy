package com.protostar.billingnstock.stock.entities;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.protostar.billingnstock.user.entities.BusinessEntity;
import com.protostar.billingnstock.user.entities.UserEntity;
import com.protostar.billingnstock.warehouse.entities.WarehouseEntity;

@Entity
public class StockItemEntity {
	@Id
	private Long id;
	@Index
	private String itemName;
	private String category;
	private int qty;
	private double price;
	private String notes;
	private int thresholdValue;

	Ref<WarehouseEntity> warehouse;

	public WarehouseEntity getWarehouse() {
		return warehouse.get();
	}

	public void setWarehouse(WarehouseEntity warehouse) {
		this.warehouse = Ref.create(warehouse);
	}

	@Index
	Ref<BusinessEntity> userBusiness;
	
	public BusinessEntity getUserBusiness() {
		return userBusiness.get();
	}

	public void setUserBusiness(BusinessEntity userBusiness) {
		this.userBusiness = Ref.create(userBusiness);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCategory() {
		return category;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public int getQty() {
		return qty;
	}

	public void setQty(int qty) {
		this.qty = qty;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getThresholdValue() {
		return thresholdValue;
	}

	public void setThresholdValue(int thresholdValue) {
		this.thresholdValue = thresholdValue;
	}

	public void setCategory(String category) {
		this.category = category;
	}
	
	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}
}// end of StockServicesEntity
