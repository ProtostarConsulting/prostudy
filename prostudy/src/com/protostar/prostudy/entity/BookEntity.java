package com.protostar.prostudy.entity;

import java.util.List;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;


@Entity
public class BookEntity 
{


	@Id Long id;
	
	@Index
	private String bookId;

	private String book_name;
	private String author;
	private String board;
	private String standard;
	
	private List<ChapterEntity> chapters;
	


	public List<ChapterEntity> getChapters() {
		return chapters;
	}

	public void setChapters(List<ChapterEntity> chapters) {
		this.chapters = chapters;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getBookId() {
		return bookId;
	}

	public void setBookId(String bookId) {
		this.bookId = bookId;
	}

	public String getBook_name() {
		return book_name;
	}

	public void setBook_name(String book_name) {
		this.book_name = book_name;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
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


}// end of BookEntity



