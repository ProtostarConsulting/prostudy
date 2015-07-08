package com.protostar.billingnstock.data;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;

@Entity
public class Invoice_Items implements Serializable {

	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer invoice_Detail_id;
		
	@OneToMany
    @JoinTable( name="Invoice_Invoice_Items_Mapping", 
                joinColumns=@JoinColumn(name="invoice_Detail_id"), 
                inverseJoinColumns=@JoinColumn(name="id")) 
    private Set<StockServicesEntity> stockServicesEntity = new HashSet<StockServicesEntity>();
 
private int qty;

private int rate;

	public Integer getInvoice_Detail_id() {
		return invoice_Detail_id;
	}

	public void setInvoice_Detail_id(Integer invoice_Detail_id) {
		this.invoice_Detail_id = invoice_Detail_id;
	}

	public Set<StockServicesEntity> getStockServicesEntity() {
		return stockServicesEntity;
	}

	public void setStockServicesEntity(Set<StockServicesEntity> stockServicesEntity) {
		this.stockServicesEntity = stockServicesEntity;
	}

	public int getQty() {
		return qty;
	}

	public void setQty(int qty) {
		this.qty = qty;
	}

	public int getRate() {
		return rate;
	}

	public void setRate(int rate) {
		this.rate = rate;
	}

	
}
