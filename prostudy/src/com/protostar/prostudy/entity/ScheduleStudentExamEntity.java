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
//	ArrayList<UserEntity> selectedStudents;
//	Ref<ScheduledExamEntity> selectedExams;
	
	private long selectedExam;
	
	private List<SelectedStudents> selectedStudents;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
/*	public ArrayList<UserEntity> getSelectedStudents() {
		return selectedStudents;
	}
	public void setSelectedStudents(ArrayList<UserEntity> selectedStudents) {
		this.selectedStudents = selectedStudents;
	}*/
/*	public ScheduledExamEntity getSelectedExams() {
		return selectedExams.get();
	}
	public void setSelectedExams(ScheduledExamEntity selectedExams) {
		this.selectedExams = Ref.create(selectedExams);
	}
*/
	public long getSelectedExam() {
		return selectedExam;
	}
	public void setSelectedExam(long selectedExam) {
		this.selectedExam = selectedExam;
	}
	public List<SelectedStudents> getSelectedStudents() {
		return selectedStudents;
	}
	public void setSelectedStudents(List<SelectedStudents> selectedStudents) {
		this.selectedStudents = selectedStudents;
	}

	
}
