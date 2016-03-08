package com.protostar.billingnstock.assetmanagement.entities;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.protostar.billingnstock.user.entities.UserEntity;

@Entity
public class AssetAssign {

	private Ref<UserEntity> userEntity;
	private Ref<Asset> assetEntity ;
	
	@Id
	private Long id;
	
	private Integer qty;

	

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

	public Integer getQty() {
		return qty;
	}

	public void setQty(Integer qty) {
		this.qty = qty;
	}
	

}
