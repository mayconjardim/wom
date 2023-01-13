package com.wom.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wom.api.dto.WorkOrderDTO;
import com.wom.api.entities.WorkOrder;
import com.wom.api.repositories.WorkOrderRepository;

@Service
public class WorkOrderService {

	@Autowired
	private WorkOrderRepository orderRepository;
	
	@Transactional(readOnly = true)
	public Page<WorkOrderDTO> findAllPaged(Pageable pageable) {
		Page<WorkOrder> page = orderRepository.findAll(pageable); 
		return page.map(order -> new WorkOrderDTO(order)); 

	}
	
}
