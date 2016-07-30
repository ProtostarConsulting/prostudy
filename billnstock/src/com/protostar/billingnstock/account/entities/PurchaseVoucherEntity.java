package com.protostar.billingnstock.account.entities;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.protostar.billingnstock.invoice.entities.InvoiceEntity;

@Entity
public class PurchaseVoucherEntity extends VoucherEntity {

	private Ref<InvoiceEntity> invoiceEntity;

	public InvoiceEntity getInvoiceEntity() {
		return invoiceEntity == null ? null : invoiceEntity.get();
	}

	public void setInvoiceEntity(InvoiceEntity invoiceEntity) {
		this.invoiceEntity = Ref.create(invoiceEntity);
	}

}
