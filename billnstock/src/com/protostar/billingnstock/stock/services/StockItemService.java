package com.protostar.billingnstock.stock.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.billingnstock.stock.entities.StockItemEntity;

@Api(name = "stockService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.stock.services", ownerName = "com.protostar.billingnstock.stock.services", packagePath = ""))
public class StockItemService {

	@ApiMethod(name="addStock")
	public void addStock(StockItemEntity stockItemEntity){
		
		Key<StockItemEntity> now= ofy().save().entity(stockItemEntity).now();
	}
	
	@ApiMethod(name="getAllStock")
	public List<StockItemEntity> getAllStock(){
		
		return ofy().load().type(StockItemEntity.class).list();		
	}
	
	@ApiMethod(name="updateStock")
	public void updateStock(StockItemEntity stockItemEntity){
		
	Key<StockItemEntity> now= ofy().save().entity(stockItemEntity).now();
	}
	
/*	@ApiMethod(name = "addStock")
	public ServerMsg addStock(StockItemEntity stockItemEntity) {
		System.out.println("stockItemEntity:" + stockItemEntity);
		ServerMsg msgBean = new ServerMsg();

		StockItemEntity stockItemEntity2 = new StockItemEntity();

		if (stockItemEntity.getId() != null) {
			stockItemEntity2.setId(stockItemEntity.getId());
		}

		stockItemEntity2.setItemName(stockItemEntity.getItemName());
		stockItemEntity2.setCategory(stockItemEntity.getCategory());
		stockItemEntity2.setItemId(stockItemEntity.getItemId());
		stockItemEntity2.setQty(stockItemEntity.getQty());
		stockItemEntity2.setPrice(stockItemEntity.getPrice());
		stockItemEntity2.setThreshold_value(stockItemEntity
				.getThreshold_value());

		EntityManager em = null;

		try {
			em = EMF.get().createEntityManager();
			em.persist(stockItemEntity);
			msgBean.setMsg("Stock Records Added successfully" + " "
					+ stockItemEntity.getItemName());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			em.close();
		}

		return msgBean;

	}// end of addStockServices

	@SuppressWarnings("unchecked")
	@ApiMethod(name = "getAllStock")
	public List<StockItemEntity> getAllStock() {
		System.out.println("In side getAllStock ");
		List<StockItemEntity> stockList = new ArrayList<StockItemEntity>();
		EntityManager em = null;
		try {

			em = EMF.get().createEntityManager();

			Query q = em.createQuery("select s from StockItemEntity s");
			stockList = q.getResultList();
			System.out.println("Got AllList: " + stockList.size());

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			em.close();
		}

		return stockList;

	}// end of getAllStockServices

	@ApiMethod(name = "getStockByID")
	public StockItemEntity getStockByID(@Named("id") Long id) {
		StockItemEntity stockItemEntity = null;
		EntityManager em = null;

		try {
			em = EMF.get().createEntityManager();
			Query query = em
					.createNamedQuery("selct s from StockEntity s where s.id="
							+ id);
			List<StockItemEntity> resultList = query.getResultList();
			if (resultList.size() > 0) {
				StockItemEntity customer = resultList.get(0);
				// stockItemEntity = CustomerInfoUtil.toCustomerInfo(customer);
			}
		} 
		catch (Exception ex) {
			ex.getStackTrace();
		} finally {

		}
		return null;

	}*/
	/*
	 * @SuppressWarnings("unchecked")
	 * 
	 * @ApiMethod(name="reportByThreshold") public List<StockItemEntity>
	 * reportByThreshold() { System.out.println("In side reportByThreshold " );
	 * List<StockItemEntity> stockList= new ArrayList<StockItemEntity>();
	 * EntityManager em= null; try {
	 * 
	 * em = EMF.get().createEntityManager();
	 * 
	 * Query q=
	 * em.createQuery("select s from StockItemEntity where threshold = totalstock "
	 * ); stockList=q.getResultList(); System.out.println("Got AllList: " +
	 * stockList.size() );
	 * 
	 * } catch (Exception e) { // TODO Auto-generated catch block
	 * e.printStackTrace(); } finally { em.close(); }
	 * 
	 * return stockList;
	 * 
	 * }//end of getAllStockServices
	 */
}// end of StockServices
