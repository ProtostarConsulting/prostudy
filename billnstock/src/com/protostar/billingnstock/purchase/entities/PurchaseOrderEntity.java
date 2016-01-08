package com.protostar.billingnstock.purchase.entities;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class PurchaseOrderEntity {

	@Id
	private Long id;
	@Index
	private Long purchaseOrderNo;
	@Index
	private String customerName;
	private String to;
	private String shipTo;
	private String PODate;
	private String requisitioner;
	private String shippedVia;
	private String fOBPoint;
	private String terms;
	private String pOLineItemList;
	private String doublesubTotal ;
	private String taxCodeName ;
	private Long taxPercenatge ;
	private double taxTotal; 
	private double finalTotal ;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getPurchaseOrderNo() {
		return purchaseOrderNo;
	}
	public void setPurchaseOrderNo(Long purchaseOrderNo) {
		this.purchaseOrderNo = purchaseOrderNo;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
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
	public String getPODate() {
		return PODate;
	}
	public void setPODate(String pODate) {
		PODate = pODate;
	}
	public String getRequisitioner() {
		return requisitioner;
	}
	public void setRequisitioner(String requisitioner) {
		this.requisitioner = requisitioner;
	}
	public String getShippedVia() {
		return shippedVia;
	}
	public void setShippedVia(String shippedVia) {
		this.shippedVia = shippedVia;
	}
	public String getfOBPoint() {
		return fOBPoint;
	}
	public void setfOBPoint(String fOBPoint) {
		this.fOBPoint = fOBPoint;
	}
	public String getTerms() {
		return terms;
	}
	public void setTerms(String terms) {
		this.terms = terms;
	}
	public String getpOLineItemList() {
		return pOLineItemList;
	}
	public void setpOLineItemList(String pOLineItemList) {
		this.pOLineItemList = pOLineItemList;
	}
	public String getDoublesubTotal() {
		return doublesubTotal;
	}
	public void setDoublesubTotal(String doublesubTotal) {
		this.doublesubTotal = doublesubTotal;
	}
	public String getTaxCodeName() {
		return taxCodeName;
	}
	public void setTaxCodeName(String taxCodeName) {
		this.taxCodeName = taxCodeName;
	}
	public Long getTaxPercenatge() {
		return taxPercenatge;
	}
	public void setTaxPercenatge(Long taxPercenatge) {
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
