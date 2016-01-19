package com.protostar.billingnstock.hr.entities;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;



@Entity
public class SalStruct {

	@Id
	private Long id;

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	//	private String cust_id;
	private String empName; 
	private String grosssal; 
	private String monthly ;
	private String byearly ;
	private String bmonthly ;
	private String hrayearly ;
	private String hramonthly ;
	private String ccayearly ;
	private String ccamonthly ;
	private String ec12Byearly ;
	private String convyearly ;
	private String convmonthly ;
	private String sayearly ;
	private String grandtotal; 
	private String samonthly ;
	private String bgrandtotal; 
	private String ptaxyearly ;
	private Long pf1 ;

	public Long getPf1() {
		return pf1;
	}
	public void setPf1(Long pf1) {
		this.pf1 = pf1;
	}
	public Long getPf2() {
		return pf2;
	}
	public void setPf2(Long pf2) {
		this.pf2 = pf2;
	}
	private Long pf2 ;
	private String ptaxgrandtotal ;
	private String netsalgrandtotalmonthly; 
	private String netsalgrandtotal ;
	private Long addprobonus ;
	public Long getAddprobonus() {
		return addprobonus;
	}
	public void setAddprobonus(Long addprobonus) {
		this.addprobonus = addprobonus;
	}
	private String ctc ;
	private String mctc ;
	private String ldother1dis;
	private String ldother2dis;
	private String ldother1amt;
	private String ldother2amt;
	@Index
	private String empid; 
	
	
	
	public String getEmpid() {
		return empid;
	}
	public void setEmpid(String empid) {
		this.empid = empid;
	}
	public String getEmpName() {
		return empName;
	}
	public void setEmpName(String empName) {
		this.empName = empName;
	}
	public String getGrosssal() {
		return grosssal;
	}
	public void setGrosssal(String grosssal) {
		this.grosssal = grosssal;
	}
	public String getMonthly() {
		return monthly;
	}
	public void setMonthly(String monthly) {
		this.monthly = monthly;
	}
	public String getByearly() {
		return byearly;
	}
	public void setByearly(String byearly) {
		this.byearly = byearly;
	}
	public String getBmonthly() {
		return bmonthly;
	}
	public void setBmonthly(String bmonthly) {
		this.bmonthly = bmonthly;
	}
	public String getHRAyearly() {
		return hrayearly;
	}
	public void setHRAyearly(String hRAyearly) {
		hrayearly = hRAyearly;
	}
	public String getHRAmonthly() {
		return hramonthly;
	}
	public void setHRAmonthly(String hRAmonthly) {
		hramonthly = hRAmonthly;
	}
	public String getCCAyearly() {
		return ccayearly;
	}
	public void setCCAyearly(String cCAyearly) {
		ccayearly = cCAyearly;
	}
	public String getCCAmonthly() {
		return ccamonthly;
	}
	public void setCCAmonthly(String cCAmonthly) {
		ccamonthly = cCAmonthly;
	}
	public String getEC12Byearly() {
		return ec12Byearly;
	}
	public void setEC12Byearly(String eC12Byearly) {
		ec12Byearly = eC12Byearly;
	}
	public String getConvyearly() {
		return convyearly;
	}
	public void setConvyearly(String convyearly) {
		this.convyearly = convyearly;
	}
	public String getConvmonthly() {
		return convmonthly;
	}
	public void setConvmonthly(String convmonthly) {
		this.convmonthly = convmonthly;
	}
	public String getSAyearly() {
		return sayearly;
	}
	public void setSAyearly(String sAyearly) {
		sayearly = sAyearly;
	}
	public String getGrandtotal() {
		return grandtotal;
	}
	public void setGrandtotal(String grandtotal) {
		this.grandtotal = grandtotal;
	}
	public String getSAmonthly() {
		return samonthly;
	}
	public void setSAmonthly(String sAmonthly) {
		samonthly = sAmonthly;
	}
	public String getBgrandtotal() {
		return bgrandtotal;
	}
	public void setBgrandtotal(String bgrandtotal) {
		this.bgrandtotal = bgrandtotal;
	}
	public String getPtaxyearly() {
		return ptaxyearly;
	}
	public void setPtaxyearly(String ptaxyearly) {
		this.ptaxyearly = ptaxyearly;
	}
	
	public String getPtaxgrandtotal() {
		return ptaxgrandtotal;
	}
	public void setPtaxgrandtotal(String ptaxgrandtotal) {
		this.ptaxgrandtotal = ptaxgrandtotal;
	}
	public String getNetsalgrandtotalmonthly() {
		return netsalgrandtotalmonthly;
	}
	public void setNetsalgrandtotalmonthly(String netsalgrandtotalmonthly) {
		this.netsalgrandtotalmonthly = netsalgrandtotalmonthly;
	}
	public String getNetsalgrandtotal() {
		return netsalgrandtotal;
	}
	public void setNetsalgrandtotal(String netsalgrandtotal) {
		this.netsalgrandtotal = netsalgrandtotal;
	}

	public String getCTC() {
		return ctc;
	}
	public void setCTC(String cTC) {
		ctc = cTC;
	}
	public String getMCTC() {
		return mctc;
	}
	public void setMCTC(String mCTC) {
		mctc = mCTC;
	}
	public String getLDOther1dis() {
		return ldother1dis;
	}
	public void setLDOther1dis(String lDOther1dis) {
		ldother1dis = lDOther1dis;
	}
	public String getLDOther2dis() {
		return ldother2dis;
	}
	public void setLDOther2dis(String lDOther2dis) {
		ldother2dis = lDOther2dis;
	}
	public String getLDOther1amt() {
		return ldother1amt;
	}
	public void setLDOther1amt(String lDOther1amt) {
		ldother1amt = lDOther1amt;
	}
	public String getLDOther2amt() {
		return ldother2amt;
	}
	public void setLDOther2amt(String lDOther2amt) {
		ldother2amt = lDOther2amt;
	}

}

