package com.protostar.billingnstock.invoice.entities;

import java.util.Date;
import java.util.List;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.protostar.billingnstock.account.entities.AccountEntity;
import com.protostar.billingnstock.cust.entities.Customer;
import com.protostar.billingnstock.sales.entities.SalesOrderEntity;
import com.protostar.billingnstock.tax.entities.TaxEntity;
import com.protostar.billingnstock.user.entities.BusinessEntity;
import com.protostar.billingnstock.user.entities.UserEntity;
import com.protostar.billnstock.entity.BaseEntity;

@Entity
public class InvoiceEntity extends BaseEntity{
	@Index
	private Date invoiceDate;
	@Index
	private Date invoiceDueDate;
	private String subTotal;
	private String taxTotal;
	private String finalTotal;
	private String noteToCustomer;
	private String status = "NotPaid";
	
	private String discount;
	private float discAmount;
	private Long pOrder;
	private float serviceSubTotal;
	
	private List<InvoiceLineItem> invoiceLineItemList;
	private List<InvoiceServiceLineItemList> invoiceServiceLineItemList;
	
	Ref<SalesOrderEntity> salesOrderId;
	Ref<AccountEntity> account;
	Ref<TaxEntity> selectedTaxItem;
	
	@Index
	Ref<Customer> customer;

	public Customer getCustomer() {
		return customer.get();
	}

	public void setCustomer(Customer customer) {
		this.customer = Ref.create(customer);
	}
	
	public TaxEntity getSelectedTaxItem() {
		return selectedTaxItem==null?null:selectedTaxItem.get();
	}
	public void setSelectedTaxItem(TaxEntity selectedTaxItem) {
		this.selectedTaxItem = Ref.create(selectedTaxItem);
	}
	
	public SalesOrderEntity getSalesOrderId() {
		return salesOrderId==null?null:salesOrderId.get();
	}

	public void setSalesOrderId(SalesOrderEntity salesOrderId) {
		this.salesOrderId = Ref.create(salesOrderId);
	}

	public AccountEntity getAccount() {
		return account==null?null:account.get();
	}

	public void setAccount(AccountEntity account) {
		this.account = Ref.create(account);
	}
	
	public List<InvoiceLineItem> getInvoiceLineItemList() {
		return invoiceLineItemList;
	}

	public void setInvoiceLineItemList(
			List<InvoiceLineItem> invoiceLineItemList) {
		this.invoiceLineItemList = invoiceLineItemList;
	}
	
	public List<InvoiceServiceLineItemList> getInvoiceServiceLineItemList() {
		return invoiceServiceLineItemList;
	}

	public void setInvoiceServiceLineItemList(
			List<InvoiceServiceLineItemList> invoiceServiceLineItemList) {
		this.invoiceServiceLineItemList = invoiceServiceLineItemList;
	}
	

	public String getSubTotal() {
		return subTotal;
	}

	public void setSubTotal(String subTotal) {
		this.subTotal = subTotal;
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

	public String getNoteToCustomer() {
		return noteToCustomer;
	}

	public void setNoteToCustomer(String noteToCustomer) {
		this.noteToCustomer = noteToCustomer;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getInvoiceDate() {
		return invoiceDate;
	}

	public void setInvoiceDate(Date invoiceDate) {
		this.invoiceDate = invoiceDate;
	}

	public Date getInvoiceDueDate() {
		return invoiceDueDate;
	}

	public void setInvoiceDueDate(Date invoiceDueDate) {
		this.invoiceDueDate = invoiceDueDate;
	}

	public String getDiscount() {
		return discount;
	}

	public void setDiscount(String discount) {
		this.discount = discount;
	}

	public float getDiscAmount() {
		return discAmount;
	}

	public void setDiscAmount(float discAmount) {
		this.discAmount = discAmount;
	}

	public Long getpOrder() {
		return pOrder;
	}

	public void setpOrder(Long pOrder) {
		this.pOrder = pOrder;
	}

	public float getServiceSubTotal() {
		return serviceSubTotal;
	}

	public void setServiceSubTotal(float serviceSubTotal) {
		this.serviceSubTotal = serviceSubTotal;
	}
	



}// end of InvoiceEntity
