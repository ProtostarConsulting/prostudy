package com.protostar.crm.server.data;

public class AddressInfoUtil {

	public static AddressInfo toAddressInfo(Address a) {
	
		AddressInfo addressInfo = new AddressInfo();
		addressInfo.setId(a.getAdd_id());;
		addressInfo.setPermanent_Address(a.getPermanent_Address());
		addressInfo.setTemp_Address(a.getTemp_Address());
		
		return addressInfo;
	}

	public static Address toAddress(AddressInfo ai) {
	
		Address address = new Address();
		address.setAdd_id(ai.getId());
		address.setPermanent_Address(ai.getPermanent_Address());
		address.setTemp_Address(ai.getTemp_Address());
		
		return address;

	}

}
