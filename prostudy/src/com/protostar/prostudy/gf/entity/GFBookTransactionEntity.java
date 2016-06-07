package com.protostar.prostudy.gf.entity;

import java.util.Date;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class GFBookTransactionEntity {

	@Id
	private Long id;
//	private GFBookEntity book;
	private String transactionType;
//	private String bookMedium;
	private Date transactionDate;
	@Index
	private long instituteID;
	private int bookQty;
	@Index
	Ref<GFBookEntity> book;
	
	
	public int getBookQty() {
		return bookQty;
	}
	public void setBookQty(int bookQty) {
		this.bookQty = bookQty;
	}

	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	
	public GFBookEntity getBook() {
		return book.get();
	}
	public void setBook(GFBookEntity book) {
		this.book = Ref.create(book);
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
