package com.protostar.billingnstock.account.entities;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.protostar.billnstock.entity.BaseEntity;

@Entity
public class AccountGroupEntity extends BaseEntity {

	private String groupName;
	private String description;
	private Ref<AccountEntity> accountList;
	private Integer displayOrderNo;
	private Ref<AccountGroupEntity> parent;

	
	public AccountGroupEntity() {

	}

	public AccountGroupEntity(String groupName, Ref<AccountGroupEntity> parent) {
		this.groupName = groupName;
		this.parent = parent;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Ref<AccountEntity> getAccountList() {
		return accountList;
	}

	public void setAccountList(Ref<AccountEntity> accountList) {
		this.accountList = accountList;
	}

	public Integer getDisplayOrderNo() {
		return displayOrderNo;
	}

	public void setDisplayOrderNo(Integer displayOrderNo) {
		this.displayOrderNo = displayOrderNo;
	}

	public AccountGroupEntity getParent() {
		return (parent == null) ? null : parent.get();
	}

	public void setParent(AccountGroupEntity parent) {
		this.parent = Ref.create(parent);
	}

}
