package com.protostar.prostudy.gf.entity;

import java.util.Date;

public class PaymentDetail {

	
	private String payReceivedBy;
	private Date paymentDate;
	private Integer payAmount;
	private Integer tPaid;
	private Integer pAmount;
	private String note;
	
	
	public String getPayReceivedBy() {
		return payReceivedBy;
	}
	public void setPayReceivedBy(String payReceivedBy) {
		this.payReceivedBy = payReceivedBy;
	}
	public Date getPaymentDate() {
		return paymentDate;
	}
	public void setPaymentDate(Date paymentDate) {
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
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
}
