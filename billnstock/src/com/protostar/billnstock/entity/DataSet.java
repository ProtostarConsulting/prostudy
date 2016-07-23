package com.protostar.billnstock.entity;

import java.util.List;

public class DataSet {
	private List<BaseEntity> list;
	private PagingInfo pagingInfo;
	
	public List<BaseEntity> getList() {
		return list;
	}
	public void setList(List<BaseEntity> list) {
		this.list = list;
	}
	public PagingInfo getPagingInfo() {
		return pagingInfo;
	}
	public void setPagingInfo(PagingInfo pagingInfo) {
		this.pagingInfo = pagingInfo;
	}
}
