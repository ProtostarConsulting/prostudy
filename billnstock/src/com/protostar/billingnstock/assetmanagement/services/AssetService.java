package com.protostar.billingnstock.assetmanagement.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.billingnstock.assetmanagement.entities.Asset;




@Api(name = "assetService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.assetmanagement.services", ownerName = "com.protostar.billingnstock.assetmanagement.services", packagePath = ""))
public class AssetService
{
	

	@ApiMethod(name="addAsset")
	public void addAsset(Asset aseet)
	{
	 ofy().save().entity(aseet).now();
	
	}

	
	
}//end of InternetService
