package com.protostar.billingnstock.invoice.entities;

import java.util.List;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.protostar.billingnstock.cust.entities.Customer;
import com.protostar.billingnstock.purchase.entities.PurchaseOrderEntity;
import com.protostar.billingnstock.sales.entities.SalesOrderEntity;
import com.protostar.billingnstock.stock.entities.StockItemEntity;
import com.protostar.billingnstock.tax.entities.TaxEntity;

@Entity
public class InvoiceEntity {
	@Id
	private Long id;
	@Index
	private Long invoiceId;
	private String invoiceDate;
	private String itemName;
	private String rate;
	private String qty;
	private String subTotal;
	private String taxTotal;
	private String finalTotal;
	private String note;
	
	private List<StockItemEntity> invoiceLineItemList;
	private Customer customer;
	private PurchaseOrderEntity purchaseOrderNo;
	private SalesOrderEntity salesOrderId;
    private TaxEntity selectedTaxItem;
  
    
    public TaxEntity getSelectedTaxItem() {
		return selectedTaxItem;
	}

	public void setSelectedTaxItem(TaxEntity selectedTaxItem) {
		this.selectedTaxItem = selectedTaxItem;
	}
	
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public String getInvoiceDate() {
		return invoiceDate;
	}

	public void setInvoiceDate(String invoiceDate) {
		this.invoiceDate = invoiceDate;
	}

	public Long getInvoiceId() {
		return invoiceId;
	}

	public void setInvoiceId(Long invoiceId) {
		this.invoiceId = invoiceId;
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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public PurchaseOrderEntity getPurchaseOrderNo() {
		return purchaseOrderNo;
	}

	public void setPurchaseOrderNo(PurchaseOrderEntity purchaseOrderNo) {
		this.purchaseOrderNo = purchaseOrderNo;
	}

	public SalesOrderEntity getSalesOrderId() {
		return salesOrderId;
	}

	public void setSalesOrderId(SalesOrderEntity salesOrderId) {
		this.salesOrderId = salesOrderId;
	}

	public List<StockItemEntity> getInvoiceLineItemList() {
		return invoiceLineItemList;
	}

	public void setInvoiceLineItemList(List<StockItemEntity> invoiceLineItemList) {
		this.invoiceLineItemList = invoiceLineItemList;
	}

	public Customer getCustomer() {
		return customer;
	}
	
	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}
	
}// end of InvoiceEntity
