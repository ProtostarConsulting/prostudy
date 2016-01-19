package com.protostar.billingnstock.crm.entities;

import java.util.List;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;



@Entity
public class Lead {

	@Id

	private Long leadid;


	public Long getLeadid() {
		return leadid;
	}
	public void setLeadid(Long leadid) {
		this.leadid = leadid;
	}
	@Index
	private String  id;
	

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	private String company;
	private String phone;
	private String email;
	private String designation;
	private String address;
	private List<Task> tasks;
	private String  name;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public List<Task> getTasks() {
		return tasks;
	}
	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}




}

