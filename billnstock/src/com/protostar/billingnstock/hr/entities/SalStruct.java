package com.protostar.billingnstock.hr.entities;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.protostar.billingnstock.user.entities.UserEntity;



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
	
	@Index
	private Ref<UserEntity> empAccount;
	
	public UserEntity getEmpAccount() {
		return empAccount.get();
	}
	
	public void setEmpAccount(UserEntity empAccount) {
			this.empAccount = Ref.create(empAccount);
	}
	
	
	//	private String cust_id;
	private String empName; 
	private Integer grosssal; 
	private Integer monthly ;
	private Integer byearly ;
	private Integer bmonthly ;
	private Integer hrayearly ;
	private Integer hramonthly ;
	private Integer ccayearly ;
	private Integer ccamonthly ;
	private Integer ec12Byearly ;
	private Integer convyearly ;
	private Integer convmonthly ;
	private Integer sayearly ;
	private Integer grandtotal; 
	private Integer samonthly ;
	private Integer bgrandtotal; 
	private Integer ptaxyearly ;
	private Integer pf1 ;
	private Integer pf2 ;
	private Integer ptaxgrandtotal ;
	private Integer netsalgrandtotalmonthly; 
	private Integer netsalgrandtotal ;
	private Integer addprobonus ;
	private Integer ctc ;
	private Integer mctc ;
	private String ldother1dis;
	private String ldother2dis;
	private Integer ldother1amt;
	private Integer ldother2amt;
	@Index
	private String empid; 

	public Integer getPf1() {
		return pf1;
	}
	public void setPf1(Integer pf1) {
		this.pf1 = pf1;
	}
	public Integer getPf2() {
		return pf2;
	}
	public void setPf2(Integer pf2) {
		this.pf2 = pf2;
	}
	public Integer getAddprobonus() {
		return addprobonus;
	}
	public void setAddprobonus(Integer addprobonus) {
		this.addprobonus = addprobonus;
	}
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
	public Integer getGrosssal() {
		return grosssal;
	}
	public void setGrosssal(Integer grosssal) {
		this.grosssal = grosssal;
	}
	public Integer getMonthly() {
		return monthly;
	}
	public void setMonthly(Integer monthly) {
		this.monthly = monthly;
	}
	public Integer getByearly() {
		return byearly;
	}
	public void setByearly(Integer byearly) {
		this.byearly = byearly;
	}
	public Integer getBmonthly() {
		return bmonthly;
	}
	public void setBmonthly(Integer bmonthly) {
		this.bmonthly = bmonthly;
	}
	public Integer getHRAyearly() {
		return hrayearly;
	}
	public void setHRAyearly(Integer hRAyearly) {
		hrayearly = hRAyearly;
	}
	public Integer getHRAmonthly() {
		return hramonthly;
	}
	public void setHRAmonthly(Integer hRAmonthly) {
		hramonthly = hRAmonthly;
	}
	public Integer getCCAyearly() {
		return ccayearly;
	}
	public void setCCAyearly(Integer cCAyearly) {
		ccayearly = cCAyearly;
	}
	public Integer getCCAmonthly() {
		return ccamonthly;
	}
	public void setCCAmonthly(Integer cCAmonthly) {
		ccamonthly = cCAmonthly;
	}
	public Integer getEC12Byearly() {
		return ec12Byearly;
	}
	public void setEC12Byearly(Integer eC12Byearly) {
		ec12Byearly = eC12Byearly;
	}
	public Integer getConvyearly() {
		return convyearly;
	}
	public void setConvyearly(Integer convyearly) {
		this.convyearly = convyearly;
	}
	public Integer getConvmonthly() {
		return convmonthly;
	}
	public void setConvmonthly(Integer convmonthly) {
		this.convmonthly = convmonthly;
	}
	public Integer getSAyearly() {
		return sayearly;
	}
	public void setSAyearly(Integer sAyearly) {
		sayearly = sAyearly;
	}
	public Integer getGrandtotal() {
		return grandtotal;
	}
	public void setGrandtotal(Integer grandtotal) {
		this.grandtotal = grandtotal;
	}
	public Integer getSAmonthly() {
		return samonthly;
	}
	public void setSAmonthly(Integer sAmonthly) {
		samonthly = sAmonthly;
	}
	public Integer getBgrandtotal() {
		return bgrandtotal;
	}
	public void setBgrandtotal(Integer bgrandtotal) {
		this.bgrandtotal = bgrandtotal;
	}
	public Integer getPtaxyearly() {
		return ptaxyearly;
	}
	public void setPtaxyearly(Integer ptaxyearly) {
		this.ptaxyearly = ptaxyearly;
	}
	
	public Integer getPtaxgrandtotal() {
		return ptaxgrandtotal;
	}
	public void setPtaxgrandtotal(Integer ptaxgrandtotal) {
		this.ptaxgrandtotal = ptaxgrandtotal;
	}
	public Integer getNetsalgrandtotalmonthly() {
		return netsalgrandtotalmonthly;
	}
	public void setNetsalgrandtotalmonthly(Integer netsalgrandtotalmonthly) {
		this.netsalgrandtotalmonthly = netsalgrandtotalmonthly;
	}
	public Integer getNetsalgrandtotal() {
		return netsalgrandtotal;
	}
	public void setNetsalgrandtotal(Integer netsalgrandtotal) {
		this.netsalgrandtotal = netsalgrandtotal;
	}

	public Integer getCTC() {
		return ctc;
	}
	public void setCTC(Integer cTC) {
		ctc = cTC;
	}
	public Integer getMCTC() {
		return mctc;
	}
	public void setMCTC(Integer mCTC) {
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
	public Integer getLDOther1amt() {
		return ldother1amt;
	}
	public void setLDOther1amt(Integer lDOther1amt) {
		ldother1amt = lDOther1amt;
	}
	public Integer getLDOther2amt() {
		return ldother2amt;
	}
	public void setLDOther2amt(Integer lDOther2amt) {
		ldother2amt = lDOther2amt;
	}

}

