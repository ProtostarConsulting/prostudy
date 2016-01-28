package com.protostar.prostudy.entity;


import java.util.List;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class UserEntity {

	@Id
	private Long id;	
	private String firstName;
	private String lastName;
	
	@Index
	private String email_id;    
	private String address;
	private String contact;
	private String role;
	private String gender;
	private List<PracticeExamEntity> myExams;
	
	private List<BookEntity> myBooks;

	public void setId(Long id) {
		this.id = id;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public Long getId() {
		return id;
	}	
	public String getFirstName() {
		return firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public String getEmail_id() {
		return email_id;
	}
	public String getAddress() {
		return address;
	}
	public String getContact() {
		return contact;
	}
	public String getGender() {
		return gender;
	}
	public String getRole() {
		return role;
	}
		
	public List<BookEntity> getMyBooks() {
		return myBooks;
	}

	public void setMyBooks(List<BookEntity> myBooks) {
		this.myBooks = myBooks;
	}
	public List<PracticeExamEntity> getMyExams() {
		return myExams;
	}
	public void setMyExams(List<PracticeExamEntity> myExams) {
		this.myExams = myExams;
	}
	
	public void setEmail_id(String email_id) {
		this.email_id = email_id;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	
	public void setRole(String role) {
		this.role = role;
	}
	

}
