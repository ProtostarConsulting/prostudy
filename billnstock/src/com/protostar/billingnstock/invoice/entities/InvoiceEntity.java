package com.protostar.billingnstock.invoice.entities;

import java.util.List;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.protostar.billingnstock.cust.entities.Customer;
import com.protostar.billingnstock.purchase.entities.PurchaseOrderEntity;
import com.protostar.billingnstock.sales.entities.SalesOrderEntity;
import com.protostar.billingnstock.stock.entities.StockItemEntity;

@Entity
public class InvoiceEntity {
	@Id
	private Long id;
	@Index
	private Long invoiceId;

	private List<Customer> customer;
	private List<SalesOrderEntity> salesOrder;
	private List<PurchaseOrderEntity> purchaseOrder;
	private List<StockItemEntity> stockItem;

	// private String customerName;

	public List<StockItemEntity> getStockItem() {
		return stockItem;
	}

	public void setStockItem(List<StockItemEntity> stockItem) {
		this.stockItem = stockItem;
	}

	public String getInvoiceDate() {
		return invoiceDate;
	}

	public void setInvoiceDate(String invoiceDate) {
		this.invoiceDate = invoiceDate;
	}

	// private String customerAddress;
	private String invoiceDate;
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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<Customer> getCustomer() {
		return customer;
	}

	public void setCustomer(List<Customer> customer) {
		this.customer = customer;
	}

	public List<SalesOrderEntity> getSalesOrder() {
		return salesOrder;
	}

	public List<PurchaseOrderEntity> getPurchaseOrder() {
		return purchaseOrder;
	}

	public void setPurchaseOrder(List<PurchaseOrderEntity> purchaseOrder) {
		this.purchaseOrder = purchaseOrder;
	}

	public void setSalesOrder(List<SalesOrderEntity> salesOrder) {
		this.salesOrder = salesOrder;
	}

}// end of InvoiceEntity
