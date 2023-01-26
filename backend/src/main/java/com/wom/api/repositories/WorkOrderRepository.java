package com.wom.api.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wom.api.entities.WorkOrder;

public interface WorkOrderRepository extends JpaRepository<WorkOrder, Long> {

	@Query("SELECT obj FROM WorkOrder obj JOIN FETCH obj.users WHERE obj IN :orders")
	List<WorkOrder> findWorkOrdersUsers(List<WorkOrder> orders);
	
	Page<WorkOrder> findByOrderStatus(Integer status, Pageable pageable);
	
}
