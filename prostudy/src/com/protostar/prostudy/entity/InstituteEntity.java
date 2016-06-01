package com.protostar.prostudy.entity;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.protostar.prostudy.protostarAdmin.entities.AccountType;

@Entity
public class InstituteEntity {

	@Id
	@Index
	private Long id;
	private String name;
	private String desc;
	private String address;
	private String phone_no;
	private String theme;
	private String registerDate;
	private Integer totalUser = 1;
	private String status="active" ;
	@Index
	private String LogBlobKey;
	private String bulkBookBlobKey;
	
	
	public String getBulkBookBlobKey() {
		return bulkBookBlobKey;
	}

	public void setBulkBookBlobKey(String bulkBookBlobKey) {
		this.bulkBookBlobKey = bulkBookBlobKey;
	}

	public String getLogBlobKey() {
		return LogBlobKey;
	}

	public void setLogBlobKey(String logBlobKey) {
		LogBlobKey = logBlobKey;
	}
	Ref<AccountType> accounttype;
		

	public AccountType getAccounttype() {
		return accounttype.get();
	}

	public void setAccounttype(AccountType accounttype) {
		this.accounttype = Ref.create(accounttype);
	}

	public String getRegisterDate() {
		return registerDate;
	}

	public void setRegisterDate(String registerDate) {
		this.registerDate = registerDate;
	}

	public Integer getTotalUser() {
		return totalUser;
	}

	public void setTotalUser(Integer totalUser) {
		this.totalUser = totalUser;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	
	public String getTheme() {
		return theme;
	}

	public void setTheme(String theme) {
		this.theme = theme;
	}

	public Long getID() {
		return id;
	}

	public void setID(Long iD) {
		id = iD;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone_no() {
		return phone_no;
	}

	public void setPhone_no(String phone_no) {
		this.phone_no = phone_no;
	}

}
