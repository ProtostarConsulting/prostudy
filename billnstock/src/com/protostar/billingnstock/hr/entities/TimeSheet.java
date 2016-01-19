package com.protostar.billingnstock.hr.entities;

import java.util.List;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class TimeSheet {

	@Id
	private Long id;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	@Index
	private String week;

	private List<TimeSheetTask> task;
	private String toDate;
	private String fromDate;

	public String getToDate() {
		return toDate;
	}

	public void setToDate(String toDate) {
		this.toDate = toDate;
	}

	public String getFromDate() {
		return fromDate;
	}

	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	public List<TimeSheetTask> getTask() {
		return task;
	}

	public void setTask(List<TimeSheetTask> task) {
		this.task = task;
	}

	public String getWeek() {
		return week;
	}

	public void setWeek(String week) {
		this.week = week;
	}

}
