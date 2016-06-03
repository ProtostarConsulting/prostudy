package com.protostar.prostudy.gf.entity;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.protostar.prostudy.entity.Address;

@Entity
public class PartnerSchoolEntity {

	@Id 
	@Index     
	private Long id;  
	@Index  
	private ExamDetail examDetail;
	@Index  
	private ContactDetail contactDetail;
	@Index
	private BookSummary bookSummary;
	@Index  
	private Address address;
	@Index  
	private Long instituteID ;
	
	private String schoolName;
	private String desc;
	private String formNumber;
	private String category;
	private String primaryContact ;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getInstituteID() {
		return instituteID;
	}
	public void setInstituteID(Long instituteID) {
		this.instituteID = instituteID;
	}
	
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public String getFormNumber() {
		return formNumber;
	}
	public void setFormNumber(String formNumber) {
		this.formNumber = formNumber;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getPrimaryContact() {
		return primaryContact;
	}
	public void setPrimaryContact(String primaryContact) {
		this.primaryContact = primaryContact;
	}
	
	public String getSchoolName() {
		return schoolName;
	}
	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}
	public ExamDetail getExamDetail() {
		return examDetail;
	}
	public void setExamDetail(ExamDetail examDetail) {
		this.examDetail = examDetail;
	}
	public ContactDetail getContactDetail() {
		return contactDetail;
	}
	public void setContactDetail(ContactDetail contactDetail) {
		this.contactDetail = contactDetail;
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	public BookSummary getBookSummary() {
		return bookSummary;
	}
	public void setBookSummary(BookSummary bookSummary) {
		this.bookSummary = bookSummary;
	}


}// end of PartnerSchoolEntity