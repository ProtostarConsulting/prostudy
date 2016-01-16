package com.protostar.prostudy.entity;

import java.util.List;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class InstituteEntity {

	@Id
	private Long ID;
	@Index
	private String instituteId;

	private String name;
	private String desc;
	private String address;
	private String phone_no;
	private String user_fname;
	private String user_lname;
	private String user_email_id;
	private String user_contact_no;
	private List<BookEntity> books;
	private List<StudentEntity> students;
	private List<TeacherEntity> teachers;
	private List<PracticeExamEntity> practiceExams;
	private List<AdminEntity> admins;

	public String getInstituteId() {
		return instituteId;
	}

	public void setInstituteId(String instituteId) {
		this.instituteId = instituteId;
	}

	public Long getID() {
		return ID;
	}

	public void setID(Long iD) {
		ID = iD;
	}

	public List<BookEntity> getBooks() {
		return books;
	}

	public void setBooks(List<BookEntity> books) {
		this.books = books;
	}

	public List<StudentEntity> getStudents() {
		return students;
	}

	public void setStudents(List<StudentEntity> students) {
		this.students = students;
	}

	public List<TeacherEntity> getTeachers() {
		return teachers;
	}

	public void setTeachers(List<TeacherEntity> teachers) {
		this.teachers = teachers;
	}

	public List<PracticeExamEntity> getPracticeExams() {
		return practiceExams;
	}

	public void setPracticeExams(List<PracticeExamEntity> practiceExams) {
		this.practiceExams = practiceExams;
	}

	public List<AdminEntity> getAdmins() {
		return admins;
	}

	public void setAdmins(List<AdminEntity> admins) {
		this.admins = admins;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone_no() {
		return phone_no;
	}

	public void setPhone_no(String phone_no) {
		this.phone_no = phone_no;
	}

	public String getUser_fname() {
		return user_fname;
	}

	public void setUser_fname(String user_fname) {
		this.user_fname = user_fname;
	}

	public String getUser_lname() {
		return user_lname;
	}

	public void setUser_lname(String user_lname) {
		this.user_lname = user_lname;
	}

	public String getUser_email_id() {
		return user_email_id;
	}

	public void setUser_email_id(String user_email_id) {
		this.user_email_id = user_email_id;
	}

	public String getUser_contact_no() {
		return user_contact_no;
	}

	public void setUser_contact_no(String user_contact_no) {
		this.user_contact_no = user_contact_no;
	}

}
