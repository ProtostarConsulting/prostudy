package com.protostar.billingnstock.invoice.entities;

public class InvoiceServiceLineItemList {
	
	private String serviceName;
	private Integer sQty;
	private float sPrice;
	private float serviceSubTotal;
	
	
	public float getServiceSubTotal() {
		return serviceSubTotal;
	}
	public void setServiceSubTotal(float serviceSubTotal) {
		this.serviceSubTotal = serviceSubTotal;
	}
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public Integer getsQty() {
		return sQty;
	}
	public void setsQty(Integer sQty) {
		this.sQty = sQty;
	}
	public float getsPrice() {
		return sPrice;
	}
	public void setsPrice(float sPrice) {
		this.sPrice = sPrice;
	}
		

}
