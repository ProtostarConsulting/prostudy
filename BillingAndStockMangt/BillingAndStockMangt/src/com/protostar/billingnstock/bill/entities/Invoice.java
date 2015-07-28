package com.protostar.billingnstock.bill.entities;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.google.appengine.api.datastore.Key;
import com.protostar.billingnstock.cust.entities.Customer;

@Entity
public class Invoice implements Serializable {
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Key invoice_id;
	 
	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Invoice_Items invoice_Items;
	
	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	    private Customer customer;
	
	private String date;
	 
	public Invoice_Items getInvoice_Items() {
		return invoice_Items;
	}


	public void setInvoice_Items(Invoice_Items invoice_Items) {
		this.invoice_Items = invoice_Items;
	}

	


	public Key getInvoice_id() {
		return invoice_id;
	}


	public void setInvoice_id(Key invoice_id) {
		this.invoice_id = invoice_id;
	}

	public Customer getCustomer() {
		return customer;
	}


	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	
	
	public String getDate() {
		return date;
	}


	public void setDate(String date) {
		this.date = date;
	}


	
}
