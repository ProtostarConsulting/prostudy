package com.protostar.billingnstock.tax.entities;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class TaxEntity {
	@Id
	private Long id;
	@Index
	private String taxId;
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

}// end of TaxEntity
