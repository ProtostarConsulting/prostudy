package com.protostar.billingnstock.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class VechileServicesEnitity {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String vechile_No;
	private String owner_Name;
	private String date_Time_Recevied;
	private String notes;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getVechile_No() {
		return vechile_No;
	}
	public void setVechile_No(String vechile_No) {
		this.vechile_No = vechile_No;
	}
	public String getOwner_Name() {
		return owner_Name;
	}
	public void setOwner_Name(String owner_Name) {
		this.owner_Name = owner_Name;
	}
	public String getDate_Time_Recevied() {
		return date_Time_Recevied;
	}
	public void setDate_Time_Recevied(String date_Time_Recevied) {
		this.date_Time_Recevied = date_Time_Recevied;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	
	
	
}
