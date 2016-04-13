package com.protostar.billnstock.service;

import java.util.ArrayList;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.billnstock.until.data.ServerMsg;



@Api(name = "testservice", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class TestService
{
	
	@ApiMethod(name="addTest")
	public ServerMsg addTest(ServerMsg value)
	{		
		value.setMsg(value.getMsg() + "...Server Added this");
		return value;
	}
	
	@ApiMethod(name="getTests")
	public List<ServerMsg> getTests(){		
		return new ArrayList<ServerMsg>();		
	}
	
	

}
