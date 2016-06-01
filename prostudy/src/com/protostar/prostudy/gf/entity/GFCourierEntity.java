package com.protostar.prostudy.gf.entity;

import java.util.Date;
import java.util.List;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.protostar.prostudy.entity.BookEntity;

@Entity
public class GFCourierEntity {

	@Id
	private Long id;
	private String courierType;
	private String logistics;
	private String registrationID;
	private String weight;
	private String courierFrom;
	private String courierTo;
	private String status = "Dispathch";
	private Date courierDispatchDate;
	private Date courierReceivedDate;
	private long instituteID;
	
	Ref<PartnerSchoolEntity> schoolName;
	List<GFBookEntity> bookLineItemList;
	public List<GFBookEntity> getBookLineItemList() {
		return bookLineItemList;
	}

	public void setBookLineItemList(List<GFBookEntity> bookLineItemList) {
		this.bookLineItemList = bookLineItemList;
	}
	
	public Date getCourierReceivedDate() {
		return courierReceivedDate;
	}
	public void setCourierReceivedDate(Date courierReceivedDate) {
		this.courierReceivedDate = courierReceivedDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getCourierDispatchDate() {
		return courierDispatchDate;
	}
	public void setCourierDispatchDate(Date courierDispatchDate) {
		this.courierDispatchDate = courierDispatchDate;
	}
	public long getInstituteID() {
		return instituteID;
	}
	public void setInstituteID(long instituteID) {
		this.instituteID = instituteID;
	}
	public PartnerSchoolEntity getSchoolName() {
		return schoolName.get();
	}
	public void setSchoolName(PartnerSchoolEntity schoolName) {
		this.schoolName = Ref.create(schoolName);
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCourierType() {
		return courierType;
	}
	public void setCourierType(String courierType) {
		this.courierType = courierType;
	}
	public String getLogistics() {
		return logistics;
	}
	public void setLogistics(String logistics) {
		this.logistics = logistics;
	}
	public String getRegistrationID() {
		return registrationID;
	}
	public void setRegistrationID(String registrationID) {
		this.registrationID = registrationID;
	}
	public String getWeight() {
		return weight;
	}
	public void setWeight(String weight) {
		this.weight = weight;
	}
	public String getCourierFrom() {
		return courierFrom;
	}
	public void setCourierFrom(String courierFrom) {
		this.courierFrom = courierFrom;
	}
	public String getCourierTo() {
		return courierTo;
	}
	public void setCourierTo(String courierTo) {
		this.courierTo = courierTo;
	}	
}
