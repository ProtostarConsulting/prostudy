package com.protostar.prostudy.until.data;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.protostar.prostudy.entity.Address;
import com.protostar.prostudy.entity.Car;

public class GjsonGenerator {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
//		Gson gson = new Gson();
		Gson gson = new GsonBuilder().serializeNulls().create();
		String jsonStr = gson.toJson(new Address());
		System.out.println(jsonStr);
		
		//System.out.println(gson.toJson(new Car()));
	}

}
