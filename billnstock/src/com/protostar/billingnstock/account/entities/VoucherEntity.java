package com.protostar.billingnstock.account.entities;

import java.util.Date;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Index;
import com.protostar.billnstock.entity.BaseEntity;

@Entity
public class VoucherEntity extends BaseEntity {

	private Date date;
	@Index
	private Long voucherNumber;
	private Ref<GeneralEntryEntity> generalEntry;

}
