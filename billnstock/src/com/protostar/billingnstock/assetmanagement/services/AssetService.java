package com.protostar.billingnstock.assetmanagement.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.protostar.billingnstock.assetmanagement.entities.Asset;
import com.protostar.billingnstock.assetmanagement.entities.AssetAssign;

@Api(name = "assetService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.assetmanagement.services", ownerName = "com.protostar.billingnstock.assetmanagement.services", packagePath = ""))
public class AssetService {

	@ApiMethod(name = "addAsset")
	public void addAsset(Asset aseet) {
		/*
		 * Asset tempasset=new Asset(); tempasset.setExpirydate(expirydate);
		 */
		String DATE_FORMAT = "dd/MM/yyyy";
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);

		/*
		 * aseet.setExpirydate(aseet.getExpirydate());
		 * aseet.setPurchasedate(aseet.getPurchasedate());
		 */

		ofy().save().entity(aseet).now();

	}

	@ApiMethod(name = "getallAsset")
	public List<Asset> getallAsset(@Named("id") Long assetid) {
		List<Asset> asset = ofy().load().type(Asset.class).list();

		List<Asset> filteredasset = new ArrayList<Asset>();

		for (int i = 0; i < asset.size(); i++) {
			if (asset.get(i).getLoggedInUser().getBusiness().getId()
					.equals(assetid)) {
				filteredasset.add(asset.get(i));
			} else {

				System.out.println("Recored No found:");
			}
		}
		return filteredasset;
	}

	@ApiMethod(name = "getselectedasset")
	public Asset getselectedasset(@Named("id") Long aseet) {
		return ofy().load().type(Asset.class).id(aseet).now();

	}

	@ApiMethod(name = "addAssignAsset")
	public void addAssignAsset(AssetAssign assignaseet) {
		Date date = new Date();
		String DATE_FORMAT = "dd/MM/yyyy";
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);

		assignaseet.setAssignDate(sdf.format(date));

		ofy().save().entity(assignaseet).now();

	}

	@ApiMethod(name = "getselectedassetdetail")
	public List<AssetAssign> getselectedassetdetail(@Named("id") Long assetid) {

		List<AssetAssign> asset = ofy().load().type(AssetAssign.class).list();

		List<AssetAssign> filteredasset = new ArrayList<AssetAssign>();

		for (int i = 0; i < asset.size(); i++) {
			if (asset.get(i).getAssetEntity().getId().equals(assetid)) {

				filteredasset.add(asset.get(i));
			} else {

				System.out.println("Recored No found:");
			}
		}
		return filteredasset;
	}

	@ApiMethod(name = "releaseAsset")
	public void releaseAsset(@Named("id") Long assetid) {

		AssetAssign assignasset = ofy().load().type(AssetAssign.class)
				.id(assetid).now();
		Date date = new Date();
		String DATE_FORMAT = "dd/MM/yyyy";
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
		assignasset.setReleaseDate(sdf.format(date));
		assignasset.setStatus("inactive");

		ofy().save().entity(assignasset).now();
	}

}// end of InternetService
