package com.protostar.prostudy.entity;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

@Entity
public class ScheduleStudentExamEntity {
	
	@Id 
	private Long id;
	Ref<UserEntity> studentID;
	Ref<ScheduledExamEntity> scheduledStudentExam;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public UserEntity getStudentID() {
		return studentID.get();
	}
	public void setStudentID(UserEntity studentID) {
		this.studentID = Ref.create(studentID);
	}
	public ScheduledExamEntity getScheduledStudentExam() {
		return scheduledStudentExam.get();
	}
	public void setScheduledStudentExam(ScheduledExamEntity scheduledStudentExam) {
		this.scheduledStudentExam = Ref.create(scheduledStudentExam);
	}
	
	
}
