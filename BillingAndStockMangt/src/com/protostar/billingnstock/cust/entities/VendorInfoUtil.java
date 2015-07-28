package com.protostar.billingnstock.cust.entities;

public class VendorInfoUtil {

	public static VendorInfo toVendorInfo(Vendor v) {
		VendorInfo vendorInfo = new VendorInfo();
		vendorInfo.setId(v.getId());
		vendorInfo.setVendorName(v.getVendorName());
		vendorInfo.setEmail(v.getEmail());
		vendorInfo.setMobileNo(v.getMobileNo());
		vendorInfo.setCity(v.getCity());
		vendorInfo.setPin(v.getPin());

		return vendorInfo;

	}

	public static Vendor toVendor(VendorInfo vi) {
		Vendor vendor = new Vendor();
		vendor.setId(vi.getId());
		vendor.setVendorName(vi.getVendorName());
		vendor.setMobileNo(vi.getMobileNo());
		vendor.setEmail(vi.getEmail());
		vendor.setCity(vi.getCity());
		vendor.setPin(vi.getPin());

		return vendor;
	}
}
