package com.protostar.billingnstock.assetmanagement.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.ArrayList;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.protostar.billingnstock.assetmanagement.entities.Asset;
import com.protostar.billingnstock.assetmanagement.entities.AssetAssign;
import com.protostar.billingnstock.crm.entities.Contact;




@Api(name = "assetService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.assetmanagement.services", ownerName = "com.protostar.billingnstock.assetmanagement.services", packagePath = ""))
public class AssetService
{
	

	@ApiMethod(name="addAsset")
	public void addAsset(Asset aseet)
	{
	 ofy().save().entity(aseet).now();
	
	}

	@ApiMethod(name="getallAsset") 
	 public List<Asset> getallAsset(@Named("id") Long assetid) {
		
		  List<Asset> asset =ofy().load().type(Asset.class).list();
		  
			List<Asset> filteredasset= new ArrayList<Asset>();

			for (int i = 0; i < asset.size(); i++) {
				if (asset.get(i).getLoggedInUser().getBusinessAccount().getId().equals(assetid)){
					
					filteredasset.add(asset.get(i));
				} else {
					
					System.out.println("Recored No found:");
				}
			}
			return filteredasset;
	   }
	
	
	@ApiMethod(name="getselectedasset")
	public Asset getselectedasset(@Named("id") Long aseet)
	{
		return ofy().load().type(Asset.class).id(aseet).now();
	
	}
	
	
	@ApiMethod(name="addAssignAsset")
	public void addAssignAsset(AssetAssign assignaseet)
	{
	 ofy().save().entity(assignaseet).now();
	
	}
	
	
}//end of InternetService
