package com.protostar.billingnstock.hr.entities;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.protostar.billingnstock.user.entities.BusinessEntity;



@Entity
public class SalSlip {

	@Id
	private Long id;

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
	private String ganeratedcode;
	@Index
	public String salslip_id ;
	
	@Index
	private Ref<SalStruct> salarystruct;
	@Index
	private Ref<BusinessEntity> business;
	
	
	public BusinessEntity getBusiness() {
		return business.get();
	}
	public void setBusiness(BusinessEntity business) {
		this.business = Ref.create(business);
	}

	@Index
	private String month;
	private String generateddate ;
	private String bank_name ;
	private String acno ;
	
	@Index
	private String year;
	
	public SalStruct getSalarystruct() {
		return salarystruct.get();
	}
	public void setSalarystruct(SalStruct salarystruct) {
		this.salarystruct = Ref.create(salarystruct);
	}
	
	public String getGaneratedcode() {
		return ganeratedcode;
	}
	public void setGaneratedcode(String ganeratedcode) {
		this.ganeratedcode = ganeratedcode;
	}
	public String getSalslip_id() {
		return salslip_id;
	}
	public void setSalslip_id(String salslip_id) {
		this.salslip_id = salslip_id;
	}

	
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public String getGenerateddate() {
		return generateddate;
	}
	public void setGenerateddate(String generateddate) {
		this.generateddate = generateddate;
	}
	public String getBank_name() {
		return bank_name;
	}
	public void setBank_name(String bank_name) {
		this.bank_name = bank_name;
	}
	public String getAcno() {
		return acno;
	}
	public void setAcno(String acno) {
		this.acno = acno;
	}
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}

	


	
}

