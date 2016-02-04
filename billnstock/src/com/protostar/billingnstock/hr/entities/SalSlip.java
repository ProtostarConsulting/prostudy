package com.protostar.billingnstock.hr.entities;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;



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
	private String salslip_id ;
	private SalStruct salarystruct;
	private Employee empdetail;
	@Index
	private String month;
	private String generateddate ;
	private String bank_name ;
	private String acno ;
	@Index
	private String year;
	
	
	public SalStruct getSalarystruct() {
		return salarystruct;
	}
	public void setSalarystruct(SalStruct salarystruct) {
		this.salarystruct = salarystruct;
	}
	public Employee getEmpdetail() {
		return empdetail;
	}
	public void setEmpdetail(Employee empdetail) {
		this.empdetail = empdetail;
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

