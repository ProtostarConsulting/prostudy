package com.protostar.prostudy.entity;

import java.util.List;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;


@Entity
public class PracticeExamResultEntity {
	
	@Id
	private Long id;
	private String examTitle;
	@Index
	private String userId;
	@Index
	private String email_id;
	
	private String firstName;

	private String lastName;
	private String startTime;
	private String endTime;
	private String score;
	private List<userAnsEntity> userAns;   
	private List<QuestionEntity> test;
	
	public String getEmail_id() {
		return email_id;
	}
	public void setEmail_id(String email_id) {
		this.email_id = email_id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public List<QuestionEntity> getTest() {
		return test;
	}
	public void setTest(List<QuestionEntity> test) {
		this.test = test;
	}
	public List<userAnsEntity> getUserAns() {
		return userAns;
	}
	public void setUserAns(List<userAnsEntity> userAns) {
		this.userAns = userAns;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getExamTitle() {
		return examTitle;
	}
	public void setExamTitle(String examTitle) {
		this.examTitle = examTitle;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public String getScore() {
		return score;
	}
	public void setScore(String score) {
		this.score = score;
	}

	
	
}



