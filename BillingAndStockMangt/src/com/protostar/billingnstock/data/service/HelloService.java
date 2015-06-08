package com.protostar.billingnstock.data.service;

import javax.inject.Named;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.billingnstock.data.MyBean;


@Api(name = "myhelloservice", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.data.service", ownerName = "com.protostar.billingnstock.data.service", packagePath = ""))
public class HelloService {
	
	@ApiMethod(name = "say2Hi")
	public MyBean sayHi(@Named("myName2") String myName) {
		MyBean bean = new MyBean(); 
		bean.setData("#Good Morning, " + myName);
		return bean;
	}
}
