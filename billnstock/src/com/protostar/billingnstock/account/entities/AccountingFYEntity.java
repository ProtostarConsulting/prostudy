package com.protostar.billingnstock.account.entities;

import java.util.Date;

import com.googlecode.objectify.annotation.Entity;
import com.protostar.billnstock.entity.BaseEntity;

@Entity
public class AccountingFYEntity extends BaseEntity {

	private Date startsFrom;
	private Date till;
	private Boolean currentFY;
	
	public Date getStartsFrom() {
		return startsFrom;
	}
	public void setStartsFrom(Date startsFrom) {
		this.startsFrom = startsFrom;
	}
	public Date getTill() {
		return till;
	}
	public void setTill(Date till) {
		this.till = till;
	}
	public Boolean getCurrentFY() {
		return currentFY;
	}
	public void setCurrentFY(Boolean currentFY) {
		this.currentFY = currentFY;
	}
}
