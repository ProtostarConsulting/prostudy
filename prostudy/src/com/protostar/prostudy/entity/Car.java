package com.protostar.prostudy.entity;

import static com.googlecode.objectify.ObjectifyService.ofy;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Ignore;

@Entity
public class Car {
	@Id Long id;
    String vin;
    int color;
    byte[] rawData;
    @Ignore int irrelevant;

    private Car() {}

    public Car(String vin, int color) {
        this.vin = vin;
        this.color = color;        
    }
    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getVin() {
		return vin;
	}

	public void setVin(String vin) {
		this.vin = vin;
	}

	public int getColor() {
		return color;
	}

	public void setColor(int color) {
		this.color = color;
	}

	public byte[] getRawData() {
		return rawData;
	}

	public void setRawData(byte[] rawData) {
		this.rawData = rawData;
	}

	public int getIrrelevant() {
		return irrelevant;
	}

	public void setIrrelevant(int irrelevant) {
		this.irrelevant = irrelevant;
	}

	
}