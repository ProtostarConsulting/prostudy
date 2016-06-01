package com.protostar.prostudy.gf.service;

import java.util.logging.Logger;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.protostar.prostudy.protostarAdmin.services.UploadURLService;
import com.protostar.prostudy.until.data.ServerMsg;


	@Api(name = "uploadBulkBookService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.gf.services", ownerName = "com.protostar.prostudy.gf.services", packagePath = ""))
	public class UploadBulkBookService {

		private static final Logger log = Logger.getLogger(UploadURLService.class
				.getName());

		@ApiMethod(name = "getBulkBookUploadURL", path="getBulkBookUploadURL")
		public ServerMsg getBulkBookUploadURL() {
			 BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
			 String createUploadUrl = blobstoreService.createUploadUrl("/UploadBulkBookServlet");
			 ServerMsg serverMsg = new ServerMsg();
			 serverMsg.setMsg(createUploadUrl);		 
			return serverMsg;
		}

	}// end of UploadBulkBookService


