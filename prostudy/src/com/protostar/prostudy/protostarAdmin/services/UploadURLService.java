package com.protostar.prostudy.protostarAdmin.services;

import java.util.logging.Logger;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.protostar.prostudy.until.data.ServerMsg;

@Api(name = "uploadPathService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.protostarAdmin.services", ownerName = "com.protostar.prostudy.protostarAdmin.services", packagePath = ""))
public class UploadURLService {

	private static final Logger log = Logger.getLogger(UploadURLService.class
			.getName());

	@ApiMethod(name = "getLogUploadURL", path="getLogUploadURL")
	public ServerMsg getLogUploadURL() {
		 BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
		 String createUploadUrl = blobstoreService.createUploadUrl("/UploadLogoServlet");
		 ServerMsg serverMsg = new ServerMsg();
		 serverMsg.setMsg(createUploadUrl);		 
		return serverMsg;
	}
	
	@ApiMethod(name = "getPartnerSchoolsUploadURL", path="getPartnerSchoolsUploadURL")
	public ServerMsg getPartnerSchoolsUploadURL() {
		 BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
		 String createUploadUrl = blobstoreService.createUploadUrl("/UplodePartnerSchoolsExcel");
		 ServerMsg serverMsg = new ServerMsg();
		 serverMsg.setMsg(createUploadUrl);		 
		return serverMsg;
	}
	
	
	@ApiMethod(name = "getPartnerSchoolsUploadURLForDownload", path="getPartnerSchoolsUploadURLForDownload")
	public ServerMsg getPartnerSchoolsUploadURLForDownload() {
		 BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
		 String createUploadUrl = blobstoreService.createUploadUrl("/DownloadPartnerSchools");
		 ServerMsg serverMsg = new ServerMsg();
		 serverMsg.setMsg(createUploadUrl);		 
		return serverMsg;
	}

}// end of uploadUrlService
