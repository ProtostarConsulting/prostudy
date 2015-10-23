package com.protostar.billingnstock.stock.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.google.appengine.api.datastore.Key;

@Entity

public class StockItemEntity 
{   
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String item_Id;
	private String item_Name;
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
	
	public String getItem_Id() {
		return item_Id;
	}
	public void setItem_Id(String item_Id) {
		this.item_Id = item_Id;
	}
	public String getItem_Name() 
	{
		return item_Name;
	}
	public void setItem_Name(String item_Name) 
	{
		this.item_Name = item_Name;
	}
	
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getQty()
	{
		return qty;
	}
	public void setQty(String qty)
	{
		this.qty = qty;
	}
	public String getPrice()
	{
		return price;
	}
	public void setPrice(String price)
	{
		this.price = price;
	}
	public String getNotes() 
	{
		return notes;
	}
	public void setNotes(String notes)
	{
		this.notes = notes;
	}
	
}//end of StockServicesEntity
