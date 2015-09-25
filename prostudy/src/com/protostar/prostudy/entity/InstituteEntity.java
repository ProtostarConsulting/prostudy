package com.protostar.prostudy.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.google.appengine.api.datastore.Key;

@Entity

public class InstituteEntity 
{   
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Key id;
	
	private String name;
	private String email_id;
	private String phone_no;
	private String address;
	
	
	public Key getId() {
		return id;
	}
	public void setId(Key id) {
		this.id = id;
	}
	public String getName()
	{
		return name;
	}
	public void setName(String name) 
	{
		this.name = name;
	}
	public String getEmail_id() 
	{
		return email_id;
	}
	public void setEmail_id(String email_id) 
	{
		this.email_id = email_id;
	}
	public String getPhone_no()
	{
		return phone_no;
	}
	public void setPhone_no(String phone_no) {
		this.phone_no = phone_no;
	}

	public String getAddress() 
	{
		return address;
	}
	public void setAddress(String address) 
	{
		this.address = address;
	}
	
}//end of TeacherEntity
