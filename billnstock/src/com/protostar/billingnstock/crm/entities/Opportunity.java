package com.protostar.billingnstock.crm.entities;

import java.util.List;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class Opportunity {

	@Id
	private Long id;

	public Long getLeadid() {
		return id;
	}

	public void setLeadid(Long id) {
		this.id = id;
	}
	@Index
	private String oid;
	private String name;
	private String from;
	private String date;
	private String description;
	private List<OTask> tasks;
	
	

	public List<OTask> getTasks() {
		return tasks;
	}

	public void setTasks(List<OTask> tasks) {
		this.tasks = tasks;
	}
	public String getOid() {
		return oid;
	}

	public void setOid(String oid) {
		this.oid = oid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}


}
