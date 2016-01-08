package com.protostar.billingnstock.stock.entities;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class StockItemEntity {
	@Id
	private Long id;
	@Index
	private Long itemId;
	@Index
	private String itemName;
	private String category;
	private String qty;
	private String price;
	private String notes;
	private String threshold_value;

	public String getThreshold_value() {
		return threshold_value;
	}

	public void setThreshold_value(String threshold_value) {
		this.threshold_value = threshold_value;
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

	public Long getItemId() {
		return itemId;
	}

	public void setItemId(Long itemId) {
		this.itemId = itemId;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getQty() {
		return qty;
	}

	public void setQty(String qty) {
		this.qty = qty;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

}// end of StockServicesEntity
