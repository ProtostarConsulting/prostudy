package com.protostar.prostudy.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.protostar.prostudy.entity.BookEntity;
import com.protostar.prostudy.until.data.EMF;
import com.protostar.prostudy.until.data.ServerMsg;

@Api(name = "bookService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class BookService {

	@ApiMethod(name = "addBook")
	public ServerMsg addBook(BookEntity bookEntity) {
		System.out.println("bookEntity:" + bookEntity);
		ServerMsg msgBean = new ServerMsg();

		EntityManager em = null;

		try {
			em = EMF.get().createEntityManager();
			em.persist(bookEntity);
			msgBean.setMsg("Book Records Added successfully" + " "
					+ bookEntity.getBook_name());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			em.close();
		}

		return msgBean;

	}// end of addBook

	@SuppressWarnings("unchecked")
	@ApiMethod(name = "getAllBook")
	public List<BookEntity> getAllBook() {
		System.out.println("In side getAllBook ");
		List<BookEntity> bookList = new ArrayList<BookEntity>();
		EntityManager em = null;
		try {

			em = EMF.get().createEntityManager();

			Query q = em.createQuery("select c from BookEntity c");
			bookList = q.getResultList();
			System.out.println("Got AllBook: " + bookList.size());

		} catch (Exception e)

		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			em.close();
		}

		return bookList;

	}// end of getAllChapter
	
	@SuppressWarnings("unchecked")
	@ApiMethod(name="getBookById")
	public BookEntity  getBookById(@Named("Id") String Id)
	{
		System.out.println("In side getBookById ");
		@SuppressWarnings("unused")
		ServerMsg msgBean=new ServerMsg();
		List<BookEntity> bookList = new ArrayList<BookEntity>();
		EntityManager em=null;
		
		try 
		{
			em = EMF.get().createEntityManager();
			Query q = em.createQuery("select c from BookEntity c where c.id =" + Id);
			bookList = q.getResultList();
			System.out.println("Got AllBookList: " + bookList.size());		
			
		} 
		catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			em.close();
		}
		if(bookList.size() > 0)		
		  return bookList.get(0);
		else
			return null;	
		
	}//end of getBookById
	

/*	@ApiMethod(name = "updateBook")
	public ServerMsg updateChapter(BookEntity bookEntity)
	{
		
		System.out.println("In side updateBook ");
		System.out.println("bookEntity:" + bookEntity);
		ServerMsg msgBean = new ServerMsg();

		EntityManager em = null;

		try {
			
			BookEntity bookEntity2 = new BookEntity();
			
			bookEntity2.setBook_name(bookEntity.getBook_name());
			bookEntity2.setAuthor(bookEntity.getAuthor());
            bookEntity2.setBoard(bookEntity.getBoard());
            bookEntity2.setStandard(bookEntity.getStandard());
			
			em = EMF.get().createEntityManager();
			em.persist(bookEntity2 );
			msgBean.setMsg("Chapter Records Updated successfully" + " "
					+ bookEntity2 .getBook_name());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			em.close();
		}

		return msgBean;

	}// end of updateBook
*/
}// end of BookService
