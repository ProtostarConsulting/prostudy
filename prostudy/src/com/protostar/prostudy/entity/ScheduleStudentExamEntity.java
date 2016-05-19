package com.protostar.prostudy.entity;

import java.util.ArrayList;
import java.util.List;

import com.google.api.server.spi.auth.common.User;
import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

@Entity
public class ScheduleStudentExamEntity {
	
	@Id 
	private Long id;
//	Ref<UserEntity> studentID;
//	Ref<ScheduledExamEntity> scheduledStudentExam;
	ArrayList<User> selectedStudents;
	ArrayList<ScheduleStudentExamEntity> selectedExams;
	
	
	public ArrayList<User> getSelectedStudents() {
		return selectedStudents;
	}
	public void setSelectedStudents(ArrayList<User> selectedStudents) {
		this.selectedStudents = selectedStudents;
	}
	
	public ArrayList<ScheduleStudentExamEntity> getSelectedExams() {
		return selectedExams;
	}
	public void setSelectedExams(ArrayList<ScheduleStudentExamEntity> selectedExams) {
		this.selectedExams = selectedExams;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
/*	public UserEntity getStudentID() {
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
*/	
	
}
