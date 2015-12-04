package com.protostar.billingnstock.stock.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.google.appengine.api.datastore.Key;

@Entity

public class StockTableItemEntity 
{   
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long bill_No;
	
	private String sr_No;
//	private String cust_Name;
	private String item_Name;
	private String rate;
	private String qty;
	private String discount;
//	private String total;
	
	
	public String getDiscount() {
		return discount;
	}
	public void setDiscount(String discount) {
		this.discount = discount;
	}

	
	
/*	public String getCust_Name() {
		return cust_Name;
	}
	public void setCust_Name(String cust_Name) {
		this.cust_Name = cust_Name;
	}
*/	
	public Long getBill_No() {
		return bill_No;
	}
	public void setBill_No(Long bill_No) {
		this.bill_No = bill_No;
	}
	public String getSr_No() {
		return sr_No;
	}
	public void setSr_No(String sr_No) {
		this.sr_No = sr_No;
	}
	public String getItem_Name() {
		return item_Name;
	}
	public void setItem_Name(String item_Name) {
		this.item_Name = item_Name;
	}
	public String getRate() {
		return rate;
	}
	public void setRate(String rate) {
		this.rate = rate;
	}
	public String getQty() {
		return qty;
	}
	public void setQty(String qty) {
		this.qty = qty;
	}
/*	public String getTotal() {
		return total;
	}
	public void setTotal(String total) {
		this.total = total;
	}
*/	
	
		
}//end of StockServicesEntity
