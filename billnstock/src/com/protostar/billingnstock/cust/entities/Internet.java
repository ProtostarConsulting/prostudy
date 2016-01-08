package com.protostar.billingnstock.cust.entities;


import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class Internet {

	@Id
	private Long id;
	@Index
	private String internetName;
	@Index
	private String plan;
	@Index
	private String cost;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getInternetName() {
		return internetName;
	}
	public void setInternetName(String internetName) {
		this.internetName = internetName;
	}
	public String getPlan() {
		return plan;
	}
	public void setPlan(String plan) {
		this.plan = plan;
	}
	public String getCost() {
		return cost;
	}
	public void setCost(String cost) {
		this.cost = cost;
	}
}
