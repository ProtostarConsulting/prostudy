package com.protostar.prostudy.entity;


import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class UserEntity {

	@Id
	private Long id;	
	private String userId;
	private String userName;
	private String firstName;
	private String lastName;
	
	@Index
	private String email_id;
	private String address;
	private String contact;
	private String gender;
	private String pwd;
	private String role;
	
	//private List<QuestionEntity> books;

	private String book;
	private String exam;

	public void setId(Long id) {
		this.id = id;
	}
	public void setUserId(String userId) {
		this.userId = userId;
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
	public String getUserId() {
		return userId;
	}
	public String getFirstName() {
		return firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public String getUserName() {
		return userName;
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
	public String getPwd() {
		return pwd;
	}
	public String getRole() {
		return role;
	}
	public String getBook() {
		return book;
	}
	public String getExam() {
		return exam;
	}
/*	public List<QuestionEntity> getBooks() {
		return books;
	}*/
	public void setUserName(String userName) {
		this.userName = userName;
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
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public void setBook(String book) {
		this.book = book;
	}
	public void setExam(String exam) {
		this.exam = exam;
	}
/*	public void setBooks(List<QuestionEntity> books) {
		this.books = books;
	}*/


}
