package com.wom.api.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.wom.api.entities.User;
import com.wom.api.entities.WorkOrder;
import com.wom.api.entities.enums.OrderPriority;
import com.wom.api.entities.enums.OrderStatus;

public class WorkOrderDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;

	private Date startDate = Date.from(Instant.now());

	private Date expectedDate;

	private Date deliveryDate;

	@NotNull
	private Integer orderStatus;

	@NotNull
	private Integer orderPriority;

	private String generalContractor;

	private String jobSite;

	private String address;

	private String city;

	private String description;

	private String managerName;

	private String yardName;

	@JsonIgnoreProperties(value = { "firstName", "lastName", "email", "phoneNumber", "roles" })
	private Set<UserDTO> users = new HashSet<>();

	public WorkOrderDTO() {
	}

	public WorkOrderDTO(Long id, Date startDate, Date expectedDate, Date deliveryDate, Integer orderStatus,
			Integer orderPriority, String generalContractor, String jobSite, String address, String city,
			String description, String managerName, String yardName) {
		super();
		this.id = id;
		this.startDate = startDate;
		this.expectedDate = expectedDate;
		this.deliveryDate = deliveryDate;
		this.orderStatus = orderStatus;
		this.orderPriority = orderPriority;
		this.generalContractor = generalContractor;
		this.jobSite = jobSite;
		this.address = address;
		this.city = city;
		this.description = description;
		this.managerName = managerName;
		this.yardName = yardName;
	}

	public WorkOrderDTO(WorkOrder entity) {
		id = entity.getId();
		startDate = entity.getStartDate();
		expectedDate = entity.getExpectedDate();
		deliveryDate = entity.getDeliveryDate();
		orderStatus = entity.getOrderStatus().getCode();
		orderPriority = entity.getOrderPriority().getCode();
		generalContractor = entity.getGeneralContractor();
		jobSite = entity.getJobSite();
		address = entity.getAddress();
		city = entity.getCity();
		description = entity.getDescription();
		entity.getUsers().forEach(user -> this.users.add(new UserDTO(user)));
		managerName = entity.getUsers().stream()
				.filter(user -> user.getRoles().stream().anyMatch(role -> role.getAuthority().equals("ROLE_MANAGER")))
				.map(User::getName).findFirst().orElse(null);

		yardName = entity.getUsers().stream()
				.filter(user -> user.getRoles().stream().anyMatch(role -> role.getAuthority().equals("ROLE_YARD")))
				.map(User::getName).findFirst().orElse(null);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getExpectedDate() {
		return expectedDate;
	}

	public void setExpectedDate(Date expectedDate) {
		this.expectedDate = expectedDate;
	}

	public Date getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(Date deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	public OrderStatus getOrderStatus() {
		return OrderStatus.valueOf(orderStatus);
	}

	public void setOrderStatus(OrderStatus orderStatus) {
		if (orderStatus != null) {
			this.orderStatus = orderStatus.getCode();
		}
	}

	public OrderPriority getOrderPriority() {
		return OrderPriority.valueOf(orderPriority);
	}

	public void setOrderPriority(OrderPriority orderPriority) {
		if (orderPriority != null) {
			this.orderPriority = orderPriority.getCode();
		}
	}

	public String getGeneralContractor() {
		return generalContractor;
	}

	public void setGeneralContractor(String generalContractor) {
		this.generalContractor = generalContractor;
	}

	public String getJobSite() {
		return jobSite;
	}

	public void setJobSite(String jobSite) {
		this.jobSite = jobSite;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getManagerName() {
		return managerName;
	}

	public String getYardName() {
		return yardName;
	}

	public Set<UserDTO> getUsers() {
		return users;
	}

}
