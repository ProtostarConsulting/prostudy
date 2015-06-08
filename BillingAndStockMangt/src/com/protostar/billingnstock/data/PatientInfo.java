package com.protostar.billingnstock.data;


public class PatientInfo {


	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getP_ID() {
		return p_ID;
	}
	public void setP_ID(Long p_ID) {
		this.p_ID = p_ID;
	}
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
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	public String getOccupation() {
		return occupation;
	}
	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getAddressLine1() {
		return addressLine1;
	}
	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}
	public String getAddressLine2() {
		return addressLine2;
	}
	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
	}
	public String getCity() {
		return City;
	}
	public void setCity(String city) {
		City = city;
	}
	public Integer getPIN() {
		return PIN;
	}
	public void setPIN(Integer pIN) {
		PIN = pIN;
	}
	public String getDateofvisit() {
		return dateofvisit;
	}
	public void setDateofvisit(String dateofvisit) {
		this.dateofvisit = dateofvisit;
	}
	public String getClinical_note() {
		return clinical_note;
	}
	public void setClinical_note(String clinical_note) {
		this.clinical_note = clinical_note;
	}
	public String getProvisional_dignosis() {
		return provisional_dignosis;
	}
	public void setProvisional_dignosis(String provisional_dignosis) {
		this.provisional_dignosis = provisional_dignosis;
	}
	public String getInvestigation_report() {
		return investigation_report;
	}
	public void setInvestigation_report(String investigation_report) {
		this.investigation_report = investigation_report;
	}
	public String getDigno_after_investigation() {
		return Digno_after_investigation;
	}
	public void setDigno_after_investigation(String digno_after_investigation) {
		Digno_after_investigation = digno_after_investigation;
	}
	public String getAdvice() {
		return Advice;
	}
	public void setAdvice(String advice) {
		Advice = advice;
	}
	public String getFollo_up() {
		return follo_up;
	}
	public void setFollo_up(String follo_up) {
		this.follo_up = follo_up;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getObservation() {
		return observation;
	}
	public void setObservation(String observation) {
		this.observation = observation;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	private Long id;
	private Long p_ID;
	
	public String firstName;
	
	private String lastName;
	
	private Integer age;
	
	private String occupation;
	
	private String sex;

	private String addressLine1;

	private String addressLine2;
	
	private String City;
	

    private Integer PIN;
	
	private String dateofvisit;
	private String clinical_note;
	private String provisional_dignosis;
	private String investigation_report;
	private String Digno_after_investigation;
	private String Advice;
	private String follo_up;
	private String date;
	private String observation;
	private String phone;


}
