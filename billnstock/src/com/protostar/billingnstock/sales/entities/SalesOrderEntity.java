package com.protostar.billingnstock.sales.entities;

import java.util.Date;
import java.util.List;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.protostar.billingnstock.cust.entities.Customer;
import com.protostar.billingnstock.invoice.entities.ServiceLineItemList;
import com.protostar.billingnstock.tax.entities.TaxEntity;
import com.protostar.billnstock.entity.BaseEntity;

@Entity
public class SalesOrderEntity extends BaseEntity {

	private String customerRefId ;
	private Date quotationDate ;
	private Date salesOrderDate ;
	private String to;
	private String shipTo;
	private String salesPerson;
	private String shippedVia;
	private String shippingTerms;
	private Date deliveryDate;
	private String paymentTerms;
	private Date dueDate;


	private double finalTotal;
	
	private float productTaxTotal;
	private float serviceTaxTotal;
	private float productTotal;
	private float serviceTotal;
	private float productSubTotal;
	private float serviceSubTotal;
	
	
	private List<ServiceLineItemList> serviceLineItemList;
	private List<LineStockItem> sOLineItemList;
	
	Ref<Customer> customer;	
	Ref<TaxEntity> selectedTaxItem;
	Ref<TaxEntity> selectedServiceTax;
	
	
	public TaxEntity getSelectedServiceTax() {
		return selectedServiceTax == null? null:selectedServiceTax.get();
	}
	public void setSelectedServiceTax(TaxEntity selectedServiceTax) {
		this.selectedServiceTax = Ref.create(selectedServiceTax);
	}
	
	public List<LineStockItem> getsOLineItemList() {
		return sOLineItemList;
	}
	public void setsOLineItemList(List<LineStockItem> sOLineItemList) {
		this.sOLineItemList = sOLineItemList;
	}

	
	public Customer getCustomer() {
		return customer.get();
	}
	public void setCustomer(Customer customer) {
		this.customer = Ref.create(customer);
	}
	
	public TaxEntity getSelectedTaxItem() {
		return selectedTaxItem == null ? null:selectedTaxItem.get();
	}
	public void setSelectedTaxItem(TaxEntity selectedTaxItem) {
		this.selectedTaxItem = Ref.create(selectedTaxItem);
	}	
	public String getCustomerRefId() {
		return customerRefId;
	}
	public void setCustomerRefId(String customerRefId) {
		this.customerRefId = customerRefId;
	}
	public Date getQuotationDate() {
		return quotationDate;
	}
	public void setQuotationDate(Date quotationDate) {
		this.quotationDate = quotationDate;
	}
	public Date getSalesOrderDate() {
		return salesOrderDate;
	}
	public void setSalesOrderDate(Date salesOrderDate) {
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
	public Date getDeliveryDate() {
		return deliveryDate;
	}
	public void setDeliveryDate(Date deliveryDate) {
		this.deliveryDate = deliveryDate;
	}
	public String getPaymentTerms() {
		return paymentTerms;
	}
	public void setPaymentTerms(String paymentTerms) {
		this.paymentTerms = paymentTerms;
	}
	public Date getDueDate() {
		return dueDate;
	}
	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}
	
	public double getFinalTotal() {
		return finalTotal;
	}
	public void setFinalTotal(double finalTotal) {
		this.finalTotal = finalTotal;
	}
	
	public float getServiceSubTotal() {
		return serviceSubTotal;
	}
	public void setServiceSubTotal(float serviceSubTotal) {
		this.serviceSubTotal = serviceSubTotal;
	}
	
	public List<ServiceLineItemList> getServiceLineItemList() {
		return serviceLineItemList;
	}
	public void setServiceLineItemList(List<ServiceLineItemList> serviceLineItemList) {
		this.serviceLineItemList = serviceLineItemList;
	}
	
	public float getProductTaxTotal() {
		return productTaxTotal;
	}
	public void setProductTaxTotal(float productTaxTotal) {
		this.productTaxTotal = productTaxTotal;
	}
	public float getServiceTaxTotal() {
		return serviceTaxTotal;
	}
	public void setServiceTaxTotal(float serviceTaxTotal) {
		this.serviceTaxTotal = serviceTaxTotal;
	}
	public float getProductTotal() {
		return productTotal;
	}
	public void setProductTotal(float productTotal) {
		this.productTotal = productTotal;
	}
	public float getServiceTotal() {
		return serviceTotal;
	}
	public void setServiceTotal(float serviceTotal) {
		this.serviceTotal = serviceTotal;
	}
	public float getProductSubTotal() {
		return productSubTotal;
	}
	public void setProductSubTotal(float productSubTotal) {
		this.productSubTotal = productSubTotal;
	}
}
