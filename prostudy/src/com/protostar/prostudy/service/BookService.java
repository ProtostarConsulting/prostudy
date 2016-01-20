package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.prostudy.entity.BookEntity;

@Api(name = "bookService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class BookService {

	@ApiMethod(name="addBook")
	public void addBook(BookEntity bookEntity)
	{
		System.out.println("addBook ");
		 Key<BookEntity> now = ofy().save().entity(bookEntity).now();
		 System.out.println("addBook "+now);
	}//end of addBook
	
	
	@ApiMethod(name="getBooks")
	public List<BookEntity>getBooks()
	{
		System.out.println("Inside getBooks ");
		return ofy().load().type(BookEntity.class).list();
		
	}//end of getBooks
	
	 @ApiMethod(name="getBookbyID") 
	 public BookEntity getBookbyID(@Named("bookId") String bookId)
	 {
		 System.out.println("Inside getBookbyID ");
		 BookEntity bookById = ofy().load().type(BookEntity.class).filter("bookId ", bookId).first().now();
		 
		 return bookById;	
	 }//end of getBookbyID
	 
	 @ApiMethod(name="getBookByStandard") 
	 public List<BookEntity> getBookByStandard(@Named("standard") String standard)
	 {
		 System.out.println("Inside getBookByStandard ");
		 List<BookEntity>  standardBookById=ofy().load().type(BookEntity.class).filter("standard", standard).list();
		 System.out.println("standardBookById :"+standardBookById);
		 
		 return standardBookById; 
	 }//end of getBookByStandard
	 

	 
	
}// end of BookService




