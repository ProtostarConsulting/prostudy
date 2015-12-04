package com.protostar.billingnstock.tax.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class TaxEntity 
{
	@Id
	@GeneratedValue
	private Long id;
	private String taxCodeName;
	private double taxPercenatge;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTaxCodeName() {
		return taxCodeName;
	}
	public void setTaxCodeName(String taxCodeName) {
		this.taxCodeName = taxCodeName;
	}
	public double getTaxPercenatge() {
		return taxPercenatge;
	}
	public void setTaxPercenatge(double taxPercenatge) {
		this.taxPercenatge = taxPercenatge;
	}
		

}//end of TaxEntity
