
package com.protostar.billingnstock.cust.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.billingnstock.cust.entities.Internet;




@Api(name = "internetService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.stock.cust.services", ownerName = "com.protostar.billingnstock.stock.cust.services", packagePath = ""))
public class InternetService
{
	
	@ApiMethod(name="addinternet")
	public void addinternet(Internet inter)
	{
		  Key<Internet> now = ofy().save().entity(inter).now();
	
	}
	
	@ApiMethod(name="getinternet") 
	 public List<Internet> getComputers() {
	  return ofy().load().type(Internet.class).list();
	 }
	
	
	@ApiMethod(name="findplan") 
	 public Internet findplan(@Named("rate") String rate) {
	  //return ofy().load().type(Internet.class).list();
		//Internet plan = ofy().load().type(Internet.class).id(Internet.cost).now();
		//Result<Internet> result = ofy().load().key(Key.create(Internet.class, rate));  // Result is async
		//Internet plan = result.now(); 
		Internet plan = ofy().load().type(Internet.class).filter("rate", rate).first().now();

		return plan;
	 }
/*	@ApiMethod(name="findplan") 
	 public List<Internet> findplan(@Named("rate") String rate) {
	  //return ofy().load().type(Internet.class).list();
		//Internet plan = ofy().load().type(Internet.class).id(Internet.cost).now();
		//Result<Internet> result = ofy().load().key(Key.create(Internet.class, rate));  // Result is async
		//Internet plan = result.now(); 
		//Internet plan = ofy().load().type(Internet.class).filter("rate", rate).first().now();
		
		List<Internet> data = ofy().load().type(Internet.class).filter("rate >", rate).list();
		return data;
	 }*/

}//end of InternetService

package com.protostar.billingnstock.cust.services;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;

import static com.googlecode.objectify.ObjectifyService.ofy;

import com.protostar.billingnstock.cust.entities.Internet;

@Api(name = "internetService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.stock.cust.services", ownerName = "com.protostar.billingnstock.stock.cust.services", packagePath = ""))
public class InternetService {

	@ApiMethod(name="addInternet") 
	 public void addInternet(Internet internet) {
	  Key<Internet> now = ofy().save().entity(internet).now();
	}

	  @ApiMethod(name="getAllInternet") 
	  public List<Internet> getAllInternet() {
	   return ofy().load().type(Internet.class).list();
	   
	 }
	  
	  
	  @ApiMethod(name="searchRecord")
	  public Internet searchRecord(@Named("plan") String plan){
		  Internet internet = ofy().load().type(Internet.class).filter("plan", plan).first().now();
				  
		  System.out.println("Searched Recored is:"+internet.getInternetName());
		  return internet;
		  
	  }
	  
	  @ApiMethod(name="searchByCost")
	  public List<Internet> searchByCost(@Named("cost") String cost){
		return ofy().load().type(Internet.class).filter("cost >=", cost).list();
	  }
}

// Internet internet = ofy().load().type(Internet.class).filter("cost >=", cost).first().now();

//	  System.out.println("searchByCost Recored is:"+internet);  

