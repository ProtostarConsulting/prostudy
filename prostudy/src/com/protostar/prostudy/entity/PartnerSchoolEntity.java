package com.protostar.prostudy.entity;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.protostar.prostudy.until.data.Address1;

@Entity
public class PartnerSchoolEntity {

	@Id 
	@Index     
	private Long id;    
	private String schoolName;
	private String pSLevel;
	private Address1 address;
	private String primaryContact;
//	Ref<InstituteEntity> instituteID;
	@Index   
	private Long instituteID;
		
/*	public InstituteEntity getInstituteID() {
		return instituteID.get();
	}
	public void setInstituteID(InstituteEntity instituteID) {
		this.instituteID = Ref.create(instituteID);
	}
*/	public Long getId() {
		return id;
	}
	public long getInstituteID() {
	return instituteID;
}
public void setInstituteID(long instituteID) {
	this.instituteID = instituteID;
}
	public void setId(Long id) {
		this.id = id;
	}
	public String getSchoolName() {
		return schoolName;
	}
	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}
	public String getLevel() {
		return pSLevel;
	}
	public void setLevel(String level) {
		this.pSLevel = level;
	}
	
	
	public String getpSLevel() {
		return pSLevel;
	}
	public void setpSLevel(String pSLevel) {
		this.pSLevel = pSLevel;
	}
	
	public Address1 getAddress() {
		return address;
	}
	public void setAddress(Address1 address) {
		this.address = address;
	}
	public String getPrimaryContact() {
		return primaryContact;
	}
	public void setPrimaryContact(String primaryContact) {
		this.primaryContact = primaryContact;
	}
	
	

}// end of PartnerSchoolEntity