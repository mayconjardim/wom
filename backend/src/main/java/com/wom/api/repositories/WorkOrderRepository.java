package com.wom.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wom.api.entities.WorkOrder;

public interface WorkOrderRepository extends JpaRepository<WorkOrder, Long> {

}
