package com.protostar.prostudy.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.google.appengine.api.datastore.Key;

@Entity
public class StudentEntity 
{   
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Key id;	

	private String firstName;
	private String lastName;
	
	
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
		
	
	public Key getId() 
	{
		return id;
	}
	public void setId(Key id)
	{
		this.id = id;
	}
	
	
	
	
	
}//end of QuestionServicesEntity
