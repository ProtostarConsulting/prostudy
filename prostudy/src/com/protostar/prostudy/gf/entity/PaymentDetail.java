package com.protostar.prostudy.gf.entity;

public class PaymentDetail {

	
	private String payReceivedBy;
	private String paymentDate;
	private Integer payAmount;
	private Integer tPaid;
	private Integer pAmount;
	
	
	public String getPayReceivedBy() {
		return payReceivedBy;
	}
	public void setPayReceivedBy(String payReceivedBy) {
		this.payReceivedBy = payReceivedBy;
	}
	public String getPaymentDate() {
		return paymentDate;
	}
	public void setPaymentDate(String paymentDate) {
		this.paymentDate = paymentDate;
	}
	public Integer getPayAmount() {
		return payAmount;
	}
	public void setPayAmount(Integer payAmount) {
		this.payAmount = payAmount;
	}
	public Integer gettPaid() {
		return tPaid;
	}
	public void settPaid(Integer tPaid) {
		this.tPaid = tPaid;
	}
	public Integer getpAmount() {
		return pAmount;
	}
	public void setpAmount(Integer pAmount) {
		this.pAmount = pAmount;
	}
}
