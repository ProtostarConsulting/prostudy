package com.protostar.billingnstock.cust.entities;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.protostar.billingnstock.user.entities.BusinessEntity;
import com.protostar.billingnstock.user.entities.UserEntity;

@Entity
public class AccountEntity {

	@Id
	private Long id;
	private String accountName;
	private String description;
	

	@Index
	Ref<UserEntity> loggedInUser;
	public UserEntity getLoggedInUser() {
		return loggedInUser.get();
	}

	public void setLoggedInUser(UserEntity loggedInUser) {
		this.loggedInUser = Ref.create(loggedInUser);
	}

	public Long getId() {
		return id;
	}
	
	public void setId(Long Id) {
		this.id = Id;
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
