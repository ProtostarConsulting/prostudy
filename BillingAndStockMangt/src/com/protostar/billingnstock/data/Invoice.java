package com.protostar.billingnstock.data;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class Invoice implements Serializable {
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer invoice_id;
	 
	@OneToOne
	@JoinColumn(name="invoice_id")
	private Invoice_Items invoice_Items;
	
	 @OneToOne
	    @JoinColumn(name ="id")
	    private CustomerServicesEntity customerServicesEntity;
	
	 private String date;
	 
	public Invoice_Items getInvoice_Items() {
		return invoice_Items;
	}


	public void setInvoice_Items(Invoice_Items invoice_Items) {
		this.invoice_Items = invoice_Items;
	}


	
	
	



	public CustomerServicesEntity getCustomerServicesEntity() {
		return customerServicesEntity;
	}


	public void setCustomerServicesEntity(
			CustomerServicesEntity customerServicesEntity) {
		this.customerServicesEntity = customerServicesEntity;
	}


	
	public Integer getInvoice_id() {
		return invoice_id;
	}


	public void setInvoice_id(Integer invoice_id) {
		this.invoice_id = invoice_id;
	}


	public String getDate() {
		return date;
	}


	public void setDate(String date) {
		this.date = date;
	}


	
}
