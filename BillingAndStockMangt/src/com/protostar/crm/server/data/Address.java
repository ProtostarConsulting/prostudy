package com.protostar.crm.server.data;

import java.io.Serializable;

import javax.jdo.annotations.Column;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ADDRESS")
public class Address implements Serializable {

	private static final Long serialVersionUID = 1L;

	 @Id
	 @GeneratedValue(strategy = GenerationType.AUTO)

//	@PrimaryKey
//	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private int add_id;

	// @GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "PERMANENT_ADDRESS")
	private String permanent_Address;

	@Column(name = "TEMP_ADDRESS")
	private String temp_Address;

	public int getAdd_id() {
		return add_id;
	}

	public void setAdd_id(int add_id) {
		this.add_id = add_id;
	}

	public String getPermanent_Address() {
		return permanent_Address;
	}

	public void setPermanent_Address(String permanent_Address) {
		this.permanent_Address = permanent_Address;
	}

	public String getTemp_Address() {
		return temp_Address;
	}

	public void setTemp_Address(String temp_Address) {
		this.temp_Address = temp_Address;
	}

	public static Long getSerialversionuid() {
		return serialVersionUID;
	}

}
