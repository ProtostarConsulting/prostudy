package com.protostar.prostudy.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.google.appengine.api.datastore.Key;

@Entity
public class ChapterEntity
{
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Key id;
	private String chapter_name;
	private String chapter_content;
	private String board;
	private String student_class;
	private String subject;
	
	public Key getId() {
		return id;
	}
	public void setId(Key id) {
		this.id = id;
	}
	public String getChapter_name() {
		return chapter_name;
	}
	public void setChapter_name(String chapter_name) {
		this.chapter_name = chapter_name;
	}
	public String getChapter_content() {
		return chapter_content;
	}
	public void setChapter_content(String chapter_content) {
		this.chapter_content = chapter_content;
	}
	public String getBoard() {
		return board;
	}
	public void setBoard(String board) {
		this.board = board;
	}
	public String getStudent_class() {
		return student_class;
	}
	public void setStudent_class(String student_class) {
		this.student_class = student_class;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}

}//end of ChapterEntity