package com.protostar.billingnstock.account.entities;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.protostar.billnstock.entity.BaseEntity;

@Entity
public class AccountEntity extends BaseEntity{


	private String accountName;
	private Long accountNo;
	private String description;
	
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

	/*
	 * @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL) private
	 * Address address;
	 * 
	 * @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL) private
	 * List<CreditCard> credits;
	 * 
	 * @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL) private
	 * List<Tag> tags;
	 */

}
