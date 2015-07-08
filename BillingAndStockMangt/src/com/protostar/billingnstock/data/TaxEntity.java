package com.protostar.billingnstock.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class TaxEntity 
{
	@Id
	@GeneratedValue
	private Long id;
	private String code_Name;
	private double tax_Rate;
	
	
	public Long getId()
	{
		return id;
	}
	public void setId(Long id)
	{
		this.id = id;
	}
	public String getCode_Name()
	{
		return code_Name;
	}
	public void setCode_Name(String code_Name)
	{
		this.code_Name = code_Name;
	}
	public  double getTax_Rate() 
	{
		return tax_Rate;
	}
	public  void setTax_Rate(  double tax_Rate) 
	{
		this.tax_Rate = tax_Rate;
	}
	
	
	

}//end of TaxEntity
