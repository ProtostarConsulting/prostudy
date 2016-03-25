package com.protostar.prostudy.entity;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
@Entity
public class StudSubEntity {
	
	@Id
	private Long id;
	@Index
	private Long studID;

	@Index
	private Long subID;
	

	public Long getSubID() {
		return subID;
	}
	public void setSubID(Long subID) {
		this.subID = subID;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getStudID() {
		return studID;
	}
	public void setStudID(Long studID) {
		this.studID = studID;
	}

	
}
