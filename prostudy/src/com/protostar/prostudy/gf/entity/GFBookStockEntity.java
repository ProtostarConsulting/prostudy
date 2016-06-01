package com.protostar.prostudy.gf.entity;

import java.util.Date;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class GFBookStockEntity {

	@Id
	private Long id;
	private GFBookEntity book;
	private int bookQty;
	private String medium;
	private Date feedStockDate;
	@Index
	private long instituteID;

//	Ref<PartnerSchoolEntity> schoolName;
	
	

	public long getInstituteID() {
		return instituteID;
	}
	public int getBookQty() {
		return bookQty;
	}
	public void setBookQty(int bookQty) {
		this.bookQty = bookQty;
	}
	public void setInstituteID(long instituteID) {
		this.instituteID = instituteID;
	}
/*	public PartnerSchoolEntity getSchoolName() {
		return schoolName.get();
	}
	public void setSchoolName(PartnerSchoolEntity schoolName) {
		this.schoolName = Ref.create(schoolName);
	}
*/	public Long getId() {
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
	public String getMedium() {
		return medium;
	}
	public void setMedium(String medium) {
		this.medium = medium;
	}
	public Date getFeedStockDate() {
		return feedStockDate;
	}
	public void setFeedStockDate(Date feedStockDate) {
		this.feedStockDate = feedStockDate;
	}
	
	
}
