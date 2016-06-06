package com.protostar.prostudy.gf.entity;

public class CoordinatorDetail {

	private Integer srno;
	private String coordinatorName;
	private String coordinatorPhoneNum;
	private String coordinatorEmailId;
	public String getCoordinatorName() {
		return coordinatorName;
	}
	public void setCoordinatorName(String coordinatorName) {
		this.coordinatorName = coordinatorName;
	}
	public String getCoordinatorPhoneNum() {
		return coordinatorPhoneNum;
	}
	public void setCoordinatorPhoneNum(String coordinatorPhoneNum) {
		this.coordinatorPhoneNum = coordinatorPhoneNum;
	}
	public String getCoordinatorEmailId() {
		return coordinatorEmailId;
	}
	public void setCoordinatorEmailId(String coordinatorEmailId) {
		this.coordinatorEmailId = coordinatorEmailId;
	}
	public Integer getSrno() {
		return srno;
	}
	public void setSrno(Integer srno) {
		this.srno = srno;
	}
}
