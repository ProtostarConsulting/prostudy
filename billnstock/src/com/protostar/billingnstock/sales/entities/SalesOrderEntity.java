package com.protostar.billingnstock.sales.entities;

import java.util.List;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.protostar.billingnstock.cust.entities.Customer;
import com.protostar.billingnstock.tax.entities.TaxEntity;
import com.protostar.billingnstock.user.entities.UserEntity;

@Entity
public class SalesOrderEntity {

	@Id
	@Index
	private Long id;
	@Index
	private Long salesOrderId;
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
	private String taxCodeName;
	private double taxPercenatge ;
	private double taxTotal;
	private double subTotal ;
	private double finalTotal;
	private List<LineStockItem> sOLineItemList;
	Ref<TaxEntity> selectedTaxItem;
	
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


	public List<LineStockItem> getsOLineItemList() {
		return sOLineItemList;
	}
	public void setsOLineItemList(List<LineStockItem> sOLineItemList) {
		this.sOLineItemList = sOLineItemList;
	}

	Ref<Customer> customer;	
	public Customer getCustomer() {
		return customer.get();
	}
	public void setCustomer(Customer customer) {
		this.customer = Ref.create(customer);
	}
	

	
	public TaxEntity getSelectedTaxItem() {
		return selectedTaxItem.get();
	}
	public void setSelectedTaxItem(TaxEntity selectedTaxItem) {
		this.selectedTaxItem = Ref.create(selectedTaxItem);
	}

	
	
/*	private List<SelectedTaxEntity> selectedTaxItem;
		
	public List<SelectedTaxEntity> getSelectedTaxItem() {
		return selectedTaxItem;
	}
	public void setSelectedTaxItem(List<SelectedTaxEntity> selectedTaxItem) {
		this.selectedTaxItem = selectedTaxItem;
	}
*/
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
	


	public Long getSalesOrderId() {
		return salesOrderId;
	}
	public void setSalesOrderId(Long salesOrderId) {
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
	public double getSubTotal() {
		return subTotal;
	}
	public void setSubTotal(double subTotal) {
		this.subTotal = subTotal;
	}
/*	public String getTaxCodeName() {
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
*/	public double getFinalTotal() {
		return finalTotal;
	}
	public void setFinalTotal(double finalTotal) {
		this.finalTotal = finalTotal;
	}
	
	
	
}
