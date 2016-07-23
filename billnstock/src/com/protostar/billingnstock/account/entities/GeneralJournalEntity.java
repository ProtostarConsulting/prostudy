package com.protostar.billingnstock.account.entities;

import java.util.List;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Ignore;
import com.protostar.billnstock.entity.BaseEntity;

@Entity
public class GeneralJournalEntity extends BaseEntity {

	private String accountName;
	private String description;
	
	@Ignore
	private List<GeneralEntryEntity> generalEntries; 
	

	
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

	public List<GeneralEntryEntity> getGeneralEntries() {
		return generalEntries;
	}

	public void setGeneralEntries(List<GeneralEntryEntity> generalEntries) {
		this.generalEntries = generalEntries;
	}
}
