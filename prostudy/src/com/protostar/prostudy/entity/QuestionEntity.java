package com.protostar.prostudy.entity;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;


@Entity
public class QuestionEntity {

	@Id
	private Long quesId;
	private String description;
	private String note;
	private String option1;
	private String option2;
	private String option3;
	private String option4;
	private String correctAns;
	public Long getQuesId() {
		return quesId;
	}
	public void setQuesId(Long quesId) {
		this.quesId = quesId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public String getOption1() {
		return option1;
	}
	public void setOption1(String option1) {
		this.option1 = option1;
	}
	public String getOption2() {
		return option2;
	}
	public void setOption2(String option2) {
		this.option2 = option2;
	}
	public String getOption3() {
		return option3;
	}
	public void setOption3(String option3) {
		this.option3 = option3;
	}
	public String getOption4() {
		return option4;
	}
	public void setOption4(String option4) {
		this.option4 = option4;
	}
	public String getCorrectAns() {
		return correctAns;
	}
	public void setCorrectAns(String correctAns) {
		this.correctAns = correctAns;
	}
	
	

}
