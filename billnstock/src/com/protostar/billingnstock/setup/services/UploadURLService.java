package com.protostar.billingnstock.setup.services;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.protostar.billnstock.until.data.ServerMsg;

//import com.protostar.prostudy.entity.BookEntity;

@Api(name = "uploadUrlService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.setup.services", ownerName = "com.protostar.billingnstock.setup.services", packagePath = ""))
public class UploadURLService {

	
	@ApiMethod(name = "getLogUploadURL")
	public ServerMsg getLogUploadURL() {
		 BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
		 String createUploadUrl = blobstoreService.createUploadUrl("/UploadServlet");
		 ServerMsg serverMsg = new ServerMsg();
		 serverMsg.setMsg(createUploadUrl);		 
		return serverMsg;
	}
	
	@ApiMethod(name = "getLogUploadFooterURL",path="getLogUploadFooterURL")
	public ServerMsg getLogUploadFooterURL() {
		 BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
		 String createUploadUrl = blobstoreService.createUploadUrl("/UplodeFooter");
		 ServerMsg serverMsg = new ServerMsg();
		 serverMsg.setMsg(createUploadUrl);		 
		return serverMsg;
	}

}