package com.wom.api.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.wom.api.entities.User;
import com.wom.api.entities.WorkOrder;
import com.wom.api.entities.enums.OrderPriority;
import com.wom.api.entities.enums.OrderStatus;

public class WorkOrderDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;

	@JsonFormat(pattern = "MM-dd-yyyy")
	private LocalDate startDate = LocalDate.now();

	@JsonFormat(pattern = "MM-dd-yyyy")
	private LocalDate expectedDate;

	@JsonFormat(pattern = "MM-dd-yyyy")
	private LocalDate deliveryDate;

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

	public WorkOrderDTO(Long id, LocalDate startDate, LocalDate expectedDate, LocalDate deliveryDate, Integer orderStatus,
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

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getExpectedDate() {
		return expectedDate;
	}

	public void setExpectedDate(LocalDate expectedDate) {
		this.expectedDate = expectedDate;
	}

	public LocalDate getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(LocalDate deliveryDate) {
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
