package com.protostar.billingnstock.hr.entities;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Index;
import com.protostar.billnstock.entity.BaseEntity;



@Entity
public class SalSlip extends BaseEntity{

	
	private String ganeratedcode;
	@Index
	public String salslip_id ;
	@Index
	private Ref<SalStruct> salarystruct;
	@Index
	private String month;
	
	private String generateddate ;
	private String bank_name ;
	private String acno ;
	@Index
	private String year;
	
	private String empName; 
	private Float grosssal; 
	private Float monthly ;
	private Float byearly ;
	private Float bmonthly ;
	private Float hrayearly ;
	private Float hramonthly ;
	private Float ccayearly ;
	private Float ccamonthly ;
	private Float ec12Byearly ;
	private Float convyearly ;
	private Float convmonthly ;
	private Float sayearly ;
	private Float grandtotal; 
	private Float samonthly ;
	private Float bgrandtotal; 
	private Float ptaxyearly ;
	private Float pf1 ;
	private Float pf2 ;
	private Float ptaxgrandtotal ;
	private Float netsalgrandtotalmonthly; 
	private Float netsalgrandtotal ;
	private Float addprobonus ;
	private Float ctc ;
	private Float mctc ;
	private String ldother1dis;
	private String ldother2dis;
	private Float ldother1amt;
	private Float ldother2amt;
	
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
	public String getEmpName() {
		return empName;
	}
	public void setEmpName(String empName) {
		this.empName = empName;
	}
	public Float getGrosssal() {
		return grosssal;
	}
	public void setGrosssal(Float grosssal) {
		this.grosssal = grosssal;
	}
	public Float getMonthly() {
		return monthly;
	}
	public void setMonthly(Float monthly) {
		this.monthly = monthly;
	}
	public Float getByearly() {
		return byearly;
	}
	public void setByearly(Float byearly) {
		this.byearly = byearly;
	}
	public Float getBmonthly() {
		return bmonthly;
	}
	public void setBmonthly(Float bmonthly) {
		this.bmonthly = bmonthly;
	}
	public Float getHrayearly() {
		return hrayearly;
	}
	public void setHrayearly(Float hrayearly) {
		this.hrayearly = hrayearly;
	}
	public Float getHramonthly() {
		return hramonthly;
	}
	public void setHramonthly(Float hramonthly) {
		this.hramonthly = hramonthly;
	}
	public Float getCcayearly() {
		return ccayearly;
	}
	public void setCcayearly(Float ccayearly) {
		this.ccayearly = ccayearly;
	}
	public Float getCcamonthly() {
		return ccamonthly;
	}
	public void setCcamonthly(Float ccamonthly) {
		this.ccamonthly = ccamonthly;
	}
	public Float getEc12Byearly() {
		return ec12Byearly;
	}
	public void setEc12Byearly(Float ec12Byearly) {
		this.ec12Byearly = ec12Byearly;
	}
	public Float getConvyearly() {
		return convyearly;
	}
	public void setConvyearly(Float convyearly) {
		this.convyearly = convyearly;
	}
	public Float getConvmonthly() {
		return convmonthly;
	}
	public void setConvmonthly(Float convmonthly) {
		this.convmonthly = convmonthly;
	}
	public Float getSayearly() {
		return sayearly;
	}
	public void setSayearly(Float sayearly) {
		this.sayearly = sayearly;
	}
	public Float getGrandtotal() {
		return grandtotal;
	}
	public void setGrandtotal(Float grandtotal) {
		this.grandtotal = grandtotal;
	}
	public Float getSamonthly() {
		return samonthly;
	}
	public void setSamonthly(Float samonthly) {
		this.samonthly = samonthly;
	}
	public Float getBgrandtotal() {
		return bgrandtotal;
	}
	public void setBgrandtotal(Float bgrandtotal) {
		this.bgrandtotal = bgrandtotal;
	}
	public Float getPtaxyearly() {
		return ptaxyearly;
	}
	public void setPtaxyearly(Float ptaxyearly) {
		this.ptaxyearly = ptaxyearly;
	}
	public Float getPf1() {
		return pf1;
	}
	public void setPf1(Float pf1) {
		this.pf1 = pf1;
	}
	public Float getPf2() {
		return pf2;
	}
	public void setPf2(Float pf2) {
		this.pf2 = pf2;
	}
	public Float getPtaxgrandtotal() {
		return ptaxgrandtotal;
	}
	public void setPtaxgrandtotal(Float ptaxgrandtotal) {
		this.ptaxgrandtotal = ptaxgrandtotal;
	}
	public Float getNetsalgrandtotalmonthly() {
		return netsalgrandtotalmonthly;
	}
	public void setNetsalgrandtotalmonthly(Float netsalgrandtotalmonthly) {
		this.netsalgrandtotalmonthly = netsalgrandtotalmonthly;
	}
	public Float getNetsalgrandtotal() {
		return netsalgrandtotal;
	}
	public void setNetsalgrandtotal(Float netsalgrandtotal) {
		this.netsalgrandtotal = netsalgrandtotal;
	}
	public Float getAddprobonus() {
		return addprobonus;
	}
	public void setAddprobonus(Float addprobonus) {
		this.addprobonus = addprobonus;
	}
	public Float getCtc() {
		return ctc;
	}
	public void setCtc(Float ctc) {
		this.ctc = ctc;
	}
	public Float getMctc() {
		return mctc;
	}
	public void setMctc(Float mctc) {
		this.mctc = mctc;
	}
	public String getLdother1dis() {
		return ldother1dis;
	}
	public void setLdother1dis(String ldother1dis) {
		this.ldother1dis = ldother1dis;
	}
	public String getLdother2dis() {
		return ldother2dis;
	}
	public void setLdother2dis(String ldother2dis) {
		this.ldother2dis = ldother2dis;
	}
	public Float getLdother1amt() {
		return ldother1amt;
	}
	public void setLdother1amt(Float ldother1amt) {
		this.ldother1amt = ldother1amt;
	}
	public Float getLdother2amt() {
		return ldother2amt;
	}
	public void setLdother2amt(Float ldother2amt) {
		this.ldother2amt = ldother2amt;
	}
	

	


	
}

