package com.protostar.crm.server.data;

public class AddressInfo {

	private int id;
	private String permanent_Address;
	private String temp_Address;
	

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
}
