package com.protostar.prostudy.gf.entity;

import java.util.Date;
import java.util.List;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.protostar.prostudy.entity.BookEntity;

@Entity
public class GFBookEntity {

	@Id
	private Long id;
	private String bookName;
	private String bookAuther;
	private double weight;
	private int bookPrice;
	private int bookQty;
	private String bookPublication;
	private Date bookFeedDate;
	private long instituteID;
	private String medium;
	private Date stockFeedDate;

	// Ref<PartnerSchoolEntity> schoolName;

	
	
	public long getInstituteID() {
		return instituteID;
	}
	

	public Date getBookFeedDate() {
		return bookFeedDate;
	}


	public void setBookFeedDate(Date bookFeedDate) {
		this.bookFeedDate = bookFeedDate;
	}


	public String getMedium() {
		return medium;
	}


	public void setMedium(String medium) {
		this.medium = medium;
	}


	public Date getStockFeedDate() {
		return stockFeedDate;
	}


	public void setStockFeedDate(Date stockFeedDate) {
		this.stockFeedDate = stockFeedDate;
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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public String getBookAuther() {
		return bookAuther;
	}

	public void setBookAuther(String bookAuther) {
		this.bookAuther = bookAuther;
	}

	public double getWeight() {
		return weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

	public int getBookPrice() {
		return bookPrice;
	}

	public void setBookPrice(int bookPrice) {
		this.bookPrice = bookPrice;
	}

	public String getBookPublication() {
		return bookPublication;
	}

	public void setBookPublication(String bookPublication) {
		this.bookPublication = bookPublication;
	}

}
