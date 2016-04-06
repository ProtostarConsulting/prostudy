package com.protostar.prostudy.entity;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class StudSubEntity {

	@Id
	private Long id;
	@Index
	Ref<UserEntity> studID;
	@Index
	Ref<SubjectEntity> subID;
	
	@Index
	private boolean active;

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public UserEntity getStudID() {
		return studID.get();
	}

	public void setStudID(UserEntity studID) {
		this.studID = Ref.create(studID);		
	}

	public SubjectEntity getSubID() {
		return subID.get();
	}

	public void setSubID(SubjectEntity subID) {
		this.subID = Ref.create(subID);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
