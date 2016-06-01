package com.protostar.prostudy.gf.entity;

import java.util.Date;
import java.util.List;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.protostar.prostudy.entity.BookEntity;

@Entity
public class GFBookTransactionEntity {

	@Id
	private Long id;
	private GFBookEntity book;
	private String transactionType;
	private String medium;
	private Date transactionDate;
	@Index
	private long instituteID;
	private int bookQty;
	
	
	public int getBookQty() {
		return bookQty;
	}
	public void setBookQty(int bookQty) {
		this.bookQty = bookQty;
	}
	
	public String getMedium() {
		return medium;
	}
	public void setMedium(String medium) {
		this.medium = medium;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	
	public GFBookEntity getBook() {
		return book;
	}
	public void setBook(GFBookEntity book) {
		this.book = book;
	}
	public String getTransactionType() {
		return transactionType;
	}
	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}
	public Date getTransactionDate() {
		return transactionDate;
	}
	public void setTransactionDate(Date transactionDate) {
		this.transactionDate = transactionDate;
	}
	public long getInstituteID() {
		return instituteID;
	}
	public void setInstituteID(long instituteID) {
		this.instituteID = instituteID;
	}
	
}
