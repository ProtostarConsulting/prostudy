package com.protostar.billingnstock.purchase.entities;

import java.util.Date;
import java.util.List;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.protostar.billingnstock.cust.entities.Customer;
import com.protostar.billingnstock.tax.entities.TaxEntity;
import com.protostar.billingnstock.user.entities.UserEntity;

@Entity
public class PurchaseOrderEntity {

	@Id
	@Index
	private Long id;
	@Index
	private Long purchaseOrderNo;	
	private String to;
	private String shipTo;
	private String poDate;
	private String requisitioner;
	private String shippedVia;
	private String fOBPoint;
	private String terms;
	private String subTotal;
	private double finalTotal ;
	
	Ref<Customer> customer;	
	public Customer getCustomer() {
		return customer.get();
	}
	public void setCustomer(Customer customer) {
		this.customer = Ref.create(customer);
	}
	
	private List<LineItemEntity> pOLineItemList;
	
	public List<LineItemEntity> getpOLineItemList() {
		return pOLineItemList;
	}
	public void setpOLineItemList(List<LineItemEntity> pOLineItemList) {
		this.pOLineItemList = pOLineItemList;
	}

	Ref<TaxEntity> selectedTaxItem;
	public TaxEntity getSelectedTaxItem() {
		return selectedTaxItem.get();
	}
	public void setSelectedTaxItem(TaxEntity selectedTaxItem) {
		this.selectedTaxItem = Ref.create(selectedTaxItem);
	}
	
	@Index
	Ref<UserEntity> loggedInUser;
	public UserEntity getLoggedInUser() {
		return loggedInUser.get();
	}

	public void setLoggedInUser(UserEntity loggedInUser) {
		this.loggedInUser = Ref.create(loggedInUser);
	}
	
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

	
/*	public String getTaxCodeName() {
		return taxCodeName;
	}
	public void setTaxCodeName(String taxCodeName) {
		this.taxCodeName = taxCodeName;
	}
*/	
	public String getSubTotal() {
		return subTotal;
	}
	public void setSubTotal(String subTotal) {
		this.subTotal = subTotal;
	}
/*	public String getTaxPercenatge() {
		return taxPercenatge;
	}
	public void setTaxPercenatge(String taxPercenatge) {
		this.taxPercenatge = taxPercenatge;
	}
	public double getTaxTotal() {
		return taxTotal;
	}
	public void setTaxTotal(double taxTotal) {
		this.taxTotal = taxTotal;
	}
*/	public double getFinalTotal() {
		return finalTotal;
	}
	public void setFinalTotal(double finalTotal) {
		this.finalTotal = finalTotal;
	}
	public String getPoDate() {
		return poDate;
	}
	public void setPoDate(String poDate) {
		this.poDate = poDate;
	}

	
	
}
