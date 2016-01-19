package com.protostar.prostudy.entity;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class SyllabusEntity 
{
	@Id
	private Long id;
	@Index
	private String board;
	private String standard;
	private String subject;
	private String chapterName;
	private String chapterContent;
	
	public void setId(Long id) {
		this.id = id;
	}
	public void setBoard(String board) {
		this.board = board;
	}
	public void setStandard(String standard) {
		this.standard = standard;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public Long getId() {
		return id;
	}
	public String getBoard() {
		return board;
	}
	public String getStandard() {
		return standard;
	}
	public String getSubject() {
		return subject;
	}
	public String getChapterName() {
		return chapterName;
	}
	public String getChapterContent() {
		return chapterContent;
	}
	public void setChapterName(String chapterName) {
		this.chapterName = chapterName;
	}
	public void setChapterContent(String chapterContent) {
		this.chapterContent = chapterContent;
	}
	
	
}
