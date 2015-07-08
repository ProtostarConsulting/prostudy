package com.protostar.billingnstock.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.google.appengine.api.datastore.Key;

@Entity

public class StockServicesEntity 
{   
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Key id;
	
	private String sr_No;
	private String item_Name;
	private String categories;
	private String qty;
	private String price;
	private String notes;
	
	
	public Key getId() {
		return id;
	}
	public void setId(Key id) {
		this.id = id;
	}

	public String getSr_No() 
	{
		return sr_No;
	}
	public void setSr_No(String sr_No)
	{
		this.sr_No = sr_No;
	}
	public String getItem_Name() 
	{
		return item_Name;
	}
	public void setItem_Name(String item_Name) 
	{
		this.item_Name = item_Name;
	}
	public String getCategories()
	{
		return categories;
	}
	public void setCategories(String categories)
	{
		this.categories = categories;
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
