package com.wom.api.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wom.api.dto.UserDTO;
import com.wom.api.dto.WorkOrderDTO;
import com.wom.api.entities.User;
import com.wom.api.entities.WorkOrder;
import com.wom.api.repositories.UserRepository;
import com.wom.api.repositories.WorkOrderRepository;
import com.wom.api.services.exceptions.DatabaseException;
import com.wom.api.services.exceptions.ResourceNotFoundException;

@Service
public class WorkOrderService {

	@Autowired
	private WorkOrderRepository orderRepository;

	@Autowired
	private UserRepository userRepository;

	@Transactional(readOnly = true)
	public Page<WorkOrderDTO> findAllPaged(Pageable pageable) {
		Page<WorkOrder> page = orderRepository.findAll(pageable);
		return page.map(order -> new WorkOrderDTO(order));

	}

	@Transactional(readOnly = true)
	public WorkOrderDTO findById(Long id) {
		Optional<WorkOrder> obj = orderRepository.findById(id);
		WorkOrder entity = obj.orElseThrow(() -> new ResourceNotFoundException(" Id not found: " + id));
		return new WorkOrderDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public Page<WorkOrderDTO> findByOrderStatus(Integer status, Pageable pageable) {
		Page<WorkOrder> page = orderRepository.findByOrderStatus(status, pageable);
		return page.map(order -> new WorkOrderDTO(order));

	}


	@Transactional
	public WorkOrderDTO insert(WorkOrderDTO dto) {
		WorkOrder entity = new WorkOrder();
		copyDtoEntity(dto, entity);
		entity = orderRepository.save(entity);
		return new WorkOrderDTO(entity);
	}

	@Transactional
	public WorkOrderDTO update(Long id, WorkOrderDTO dto) {

		try {
			WorkOrder entity = orderRepository.getReferenceById(id);
			copyDtoEntity(dto, entity);
			entity = orderRepository.save(entity);
			return new WorkOrderDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found: " + id);
		}
	}

	public void delete(Long id) {
		try {
			orderRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found: " + id);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Database integrity violation!");
		}
	}

	private void copyDtoEntity(WorkOrderDTO dto, WorkOrder entity) {
		entity.setStartDate(dto.getStartDate());
		entity.setExpectedDate(dto.getExpectedDate());
		entity.setDeliveryDate(dto.getDeliveryDate());
		entity.setOrderStatus(dto.getOrderStatus());
		entity.setOrderPriority(dto.getOrderPriority());
		entity.setGeneralContractor(dto.getGeneralContractor());
		entity.setJobSite(dto.getJobSite());
		entity.setAddress(dto.getAddress());
		entity.setCity(dto.getCity());
		entity.setDescription(dto.getDescription());

		entity.getUsers().clear();
		for (UserDTO userDto : dto.getUsers()) {
			User user = userRepository.getReferenceById(userDto.getId());
			entity.getUsers().add(user);
		}

	}

}
