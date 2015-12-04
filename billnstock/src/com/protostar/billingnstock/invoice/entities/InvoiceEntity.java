package com.protostar.billingnstock.invoice.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.google.appengine.api.datastore.Key;

@Entity

public class InvoiceEntity 
{   
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)

	private Long invoiceId;
	private String customerName;
	private String customerAddress;
	private String  invoiceDate;
	private String itemName;
	private String rate;
	private String qty;
	private String subTotal;
	private String taxCodeName;
	private String taxPercenatge;
	private String taxTotal;
	private String finalTotal;
	
	public Long getInvoiceId() {
		return invoiceId;
	}
	public void setInvoiceId(Long invoiceId) {
		this.invoiceId = invoiceId;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getCustomerAddress() {
		return customerAddress;
	}
	public void setCustomerAddress(String customerAddress) {
		this.customerAddress = customerAddress;
	}
	public String getInvoiceDate() {
		return invoiceDate;
	}
	public void setInvoiceDate(String invoiceDate) {
		this.invoiceDate = invoiceDate;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
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
	public String getSubTotal() {
		return subTotal;
	}
	public void setSubTotal(String subTotal) {
		this.subTotal = subTotal;
	}
	public String getTaxCodeName() {
		return taxCodeName;
	}
	public void setTaxCodeName(String taxCodeName) {
		this.taxCodeName = taxCodeName;
	}
	public String getTaxPercenatge() {
		return taxPercenatge;
	}
	public void setTaxPercenatge(String taxPercenatge) {
		this.taxPercenatge = taxPercenatge;
	}
	public String getTaxTotal() {
		return taxTotal;
	}
	public void setTaxTotal(String taxTotal) {
		this.taxTotal = taxTotal;
	}
	public String getFinalTotal() {
		return finalTotal;
	}
	public void setFinalTotal(String finalTotal) {
		this.finalTotal = finalTotal;
	}
		
	
	
	
		
}//end of StockServicesEntity
