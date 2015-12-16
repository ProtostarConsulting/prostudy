package com.protostar.prostudy.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.google.appengine.api.datastore.Key;

@Entity
public class PracticeExamEntity
{
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Key examId;
	
	private String examtitle;
	private String  board;
	private String  standard;
	private String  subject;
	private String  date;
	//questions  [];
	
	public Key getExamId() {
		return examId;
	}
	public void setExamId(Key examId) {
		this.examId = examId;
	}
	public String getExamtitle() {
		return examtitle;
	}
	public void setExamtitle(String examtitle) {
		this.examtitle = examtitle;
	}
	public String getBoard() {
		return board;
	}
	public void setBoard(String board) {
		this.board = board;
	}
	public String getStandard() {
		return standard;
	}
	public void setStandard(String standard) {
		this.standard = standard;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}

	
	


}//end of UserEntity