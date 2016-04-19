package com.protostar.billingnstock.invoice.entities;

import com.googlecode.objectify.annotation.Entity;
import com.protostar.billnstock.entity.BaseEntity;

@Entity
public class InvoiceSettingsEntity extends BaseEntity{

	private String noteToCustomer;

	public String getNoteToCustomer() {
		return noteToCustomer;
	}

	public void setNoteToCustomer(String noteToCustomer) {
		this.noteToCustomer = noteToCustomer;
	}
}
