package com.protostar.billingnstock.assetmanagement.entities;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.protostar.billingnstock.user.entities.UserEntity;

@Entity
public class AssetAssign {

	private Ref<UserEntity> userEntity;
	@Index
	private Ref<Asset> assetEntity ;
	
	@Id
	private Long id;
	
	private String status;
	private String assignDate;
	private String releaseDate;

	public String getAssignDate() {
		return assignDate;
	}

	public void setAssignDate(String assignDate) {
		this.assignDate = assignDate;
	}

	public String getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(String releaseDate) {
		this.releaseDate = releaseDate;
	}

	public String getStatus() {
		return status;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public UserEntity getuserEntity() {
		return userEntity.get();
	}

	public void setuserEntity(UserEntity userEntity) {
		this.userEntity = Ref.create(userEntity);
	}
	
	
	public Asset getAssetEntity() {
		return assetEntity.get();
	}

	public void setAssetEntity(Asset assetEntity) {
		this.assetEntity = Ref.create(assetEntity);
	}

	
	

}
