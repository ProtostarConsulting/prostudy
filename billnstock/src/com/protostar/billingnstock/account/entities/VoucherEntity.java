package com.protostar.billingnstock.account.entities;

import java.util.List;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Ignore;
import com.protostar.billnstock.entity.BaseEntity;

@Entity
public class VoucherEntity extends BaseEntity {

	private String accountName;
	private Long accountNo;
	private String description;
	private Integer displayOrderNo;

	@Ignore
	private List<AccountEntryEntity> accountLedgerEntries;

	public Long getAccountNo() {
		return accountNo;
	}

	public void setAccountNo(Long accountNo) {
		this.accountNo = accountNo;
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}



	public Integer getDisplayOrderNo() {
		return displayOrderNo;
	}

	public void setDisplayOrderNo(Integer displayOrderNo) {
		this.displayOrderNo = displayOrderNo;
	}

	public List<AccountEntryEntity> getAccountLedgerEntries() {
		return accountLedgerEntries;
	}

	public void setAccountLedgerEntries(
			List<AccountEntryEntity> accountLedgerEntries) {
		this.accountLedgerEntries = accountLedgerEntries;
	}

}
