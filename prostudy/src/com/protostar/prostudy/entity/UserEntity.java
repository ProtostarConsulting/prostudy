package com.protostar.prostudy.entity;

import java.util.List;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class UserEntity {

	@Id
	private Long id;

	@Index
	private Long instituteID;
	private String institute;
	private String firstName;
	private String lastName;
	@Index
	private String email_id;
	private String address;
	private String contact;
	private String role;

	private List<PracticeExamEntity> exam;

	public Long getInstituteID() {
		return instituteID;
	}

	public void setInstituteID(Long instituteID) {
		this.instituteID = instituteID;
	}

	public String getInstitute() {
		return institute;
	}

	public void setInstitute(String institute) {
		this.institute = institute;
	}

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

	public String getRole() {
		return role;
	}

	public List<PracticeExamEntity> getExam() {
		return exam;
	}

	public void setExam(List<PracticeExamEntity> exam) {
		this.exam = exam;
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

	public void setRole(String role) {
		this.role = role;
	}

}
