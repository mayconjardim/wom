package com.wom.api.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wom.api.dto.WorkOrderDTO;
import com.wom.api.entities.WorkOrder;
import com.wom.api.repositories.WorkOrderRepository;
import com.wom.api.services.exceptions.ResourceNotFoundException;

@Service
public class WorkOrderService {

	@Autowired
	private WorkOrderRepository orderRepository;
	
	@Transactional(readOnly = true)
	public Page<WorkOrderDTO> findAllPaged(Pageable pageable) {
		Page<WorkOrder> page = orderRepository.findAll(pageable); 
		return page.map(order -> new WorkOrderDTO(order)); 

	}
	
	@Transactional(readOnly = true)
	public WorkOrderDTO findById(Long id) {
		Optional<WorkOrder> obj = orderRepository.findById(id); 
		WorkOrder entity = obj.orElseThrow(() -> new ResourceNotFoundException(" Id não existe")); 
		return new WorkOrderDTO(entity); 
	}
	
	@Transactional
	public WorkOrderDTO insert(WorkOrderDTO dto) {
		WorkOrder entity = new WorkOrder(); 
		copyDtoEntity(dto, entity);
		entity = orderRepository.save(entity); 
		return new WorkOrderDTO(entity); 
	}
	
	
	private void copyDtoEntity(WorkOrderDTO dto, WorkOrder entity) {
		entity.setStartDate(dto.getStartDate());
		entity.setExpectDate(dto.getExpectDate());
		entity.setDeliveryDate(dto.getDeliveryDate());
		entity.setOrderStatus(dto.getOrderStatus());
		entity.setOrderPriority(dto.getOrderPriority());
		entity.setGeneralContractor(dto.getGeneralContractor());
		entity.setJobSite(dto.getJobSite());
		entity.setAddress(dto.getAddress());
		entity.setCity(dto.getCity());
		entity.setDescription(dto.getDescription());	
	}
	
}
