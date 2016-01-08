package com.protostar.billingnstock.sales.entities;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class SalesOrderEntity {

	@Id
	private Long id;
	@Index
	private String salesOrderId;
	@Index
	private String customerName ;
	private String customerRefId ;
	private String quotationDate ;
	private String salesOrderDate ;
	private String to;
	private String shipTo;
	private String salesPerson;
	private String shippedVia;
	private String shippingTerms;
	private String deliveryDate;
	private String paymentTerms;
	private String dueDate;
	private String sOLineItemList;
	private double subTotal ;
	private String taxCodeName ;
	private double taxPercenatge ;
	private double taxTotal ;
	private double finalTotal;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getSalesOrderId() {
		return salesOrderId;
	}
	public void setSalesOrderId(String salesOrderId) {
		this.salesOrderId = salesOrderId;
	}

	public String getCustomerRefId() {
		return customerRefId;
	}
	public void setCustomerRefId(String customerRefId) {
		this.customerRefId = customerRefId;
	}
	public String getQuotationDate() {
		return quotationDate;
	}
	public void setQuotationDate(String quotationDate) {
		this.quotationDate = quotationDate;
	}
	public String getSalesOrderDate() {
		return salesOrderDate;
	}
	public void setSalesOrderDate(String salesOrderDate) {
		this.salesOrderDate = salesOrderDate;
	}
	public String getTo() {
		return to;
	}
	public void setTo(String to) {
		this.to = to;
	}
	public String getShipTo() {
		return shipTo;
	}
	public void setShipTo(String shipTo) {
		this.shipTo = shipTo;
	}
	public String getSalesPerson() {
		return salesPerson;
	}
	public void setSalesPerson(String salesPerson) {
		this.salesPerson = salesPerson;
	}
	public String getShippedVia() {
		return shippedVia;
	}
	public void setShippedVia(String shippedVia) {
		this.shippedVia = shippedVia;
	}
	public String getShippingTerms() {
		return shippingTerms;
	}
	public void setShippingTerms(String shippingTerms) {
		this.shippingTerms = shippingTerms;
	}
	public String getDeliveryDate() {
		return deliveryDate;
	}
	public void setDeliveryDate(String deliveryDate) {
		this.deliveryDate = deliveryDate;
	}
	public String getPaymentTerms() {
		return paymentTerms;
	}
	public void setPaymentTerms(String paymentTerms) {
		this.paymentTerms = paymentTerms;
	}
	public String getDueDate() {
		return dueDate;
	}
	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}
	public String getsOLineItemList() {
		return sOLineItemList;
	}
	public void setsOLineItemList(String sOLineItemList) {
		this.sOLineItemList = sOLineItemList;
	}
	public double getSubTotal() {
		return subTotal;
	}
	public void setSubTotal(double subTotal) {
		this.subTotal = subTotal;
	}
	public String getTaxCodeName() {
		return taxCodeName;
	}
	public void setTaxCodeName(String taxCodeName) {
		this.taxCodeName = taxCodeName;
	}
	public double getTaxPercenatge() {
		return taxPercenatge;
	}
	public void setTaxPercenatge(double taxPercenatge) {
		this.taxPercenatge = taxPercenatge;
	}
	public double getTaxTotal() {
		return taxTotal;
	}
	public void setTaxTotal(double taxTotal) {
		this.taxTotal = taxTotal;
	}
	public double getFinalTotal() {
		return finalTotal;
	}
	public void setFinalTotal(double finalTotal) {
		this.finalTotal = finalTotal;
	}
	
	
	
}
