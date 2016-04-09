package com.protostar.prostudy.entity;

import java.util.List;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class UserEntity {

	@Id 
	@Index
	private Long id;
	private String firstName;
	private String lastName;
	private String address;
	private String contact;
	@Index
	private String role;
	@Index
	private String email_id;
	@Index
	private String PRN;
	private Boolean isGoogleUser;
	
	private String password;
	@Index
	private String standard;
	@Index
	private String division;
	
	@Index
	private Long instituteID;
	
	private List<PracticeExamEntity> myExams;
	private List<BookEntity> myBooks;

	public Boolean getIsGoogleUser() {
		return isGoogleUser;
	}

	public void setIsGoogleUser(Boolean isGoogleUser) {
		this.isGoogleUser = isGoogleUser;
	}
	public List<PracticeExamEntity> getMyExams() {
		return myExams;
	}

	public void setMyExams(List<PracticeExamEntity> myExams) {
		this.myExams = myExams;
	}

	public List<BookEntity> getMyBooks() {
		return myBooks;
	}

	public void setMyBooks(List<BookEntity> myBooks) {
		this.myBooks = myBooks;
	}

	
	public String getDivision() {
		return division;
	}

	public void setDivision(String division) {
		this.division = division;
	}

	public String getPRN() {
		return PRN;
	}

	public void setPRN(String pRN) {
		PRN = pRN;
	}

	public String getStandard() {
		return standard;
	}

	public void setStandard(String standard) {
		this.standard = standard;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail_id() {
		return email_id;
	}

	public void setEmail_id(String email_id) {
		this.email_id = email_id;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Long getInstituteID() {
		return instituteID;
	}

	public void setInstituteID(Long instituteID) {
		this.instituteID = instituteID;
	}

}
