package com.protostar.billingnstock.sales.entities;

public class SelectedTaxEntity {

	private String 	taxCodeName;
	private double taxPercenatge;
	
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
}
