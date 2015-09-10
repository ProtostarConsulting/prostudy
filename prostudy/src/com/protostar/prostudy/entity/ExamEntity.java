package com.protostar.prostudy.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.google.appengine.api.datastore.Key;

@Entity
public class ExamEntity 
{   
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Key id;	
	private String name;
	
	private String register_No;
	private String branch;
	private String correctAns;
	
	
	public Key getId() 
	{
		return id;
	}
	public void setId(Key id)
	{
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
	
	public String getRegister_No() 
	{
		return register_No;
	}
	public void setRegister_No(String register_No) 
	{
		this.register_No = register_No;
	}
	public String getBranch()
	{
		return branch;
	}
	public void setBranch(String branch)
	{
		this.branch = branch;
	}
	public String getCorrectAns() 
	{
		return correctAns;
	}
	public void setCorrectAns(String correctAns) 
	{
		this.correctAns = correctAns;
	}
	
	
	
	
}//end of QuestionServicesEntity
