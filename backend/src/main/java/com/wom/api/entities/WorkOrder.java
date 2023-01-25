package com.wom.api.entities;

import java.io.Serializable;
import java.time.Instant;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.wom.api.entities.enums.OrderPriority;
import com.wom.api.entities.enums.OrderStatus;

@Entity
public class WorkOrder implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Date startDate = Date.from(Instant.now());

	private Date expectedDate;

	private Date deliveryDate;

	private Integer orderStatus;

	private Integer orderPriority;

	private String generalContractor;

	private String jobSite;

	private String address;

	private String city;

	private String description;

	@JsonIgnoreProperties
	@ManyToMany
	@JoinTable(name = "order_user", joinColumns = @JoinColumn(name = "order_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
	private Set<User> users = new HashSet<>();

	public WorkOrder() {
	}

	public WorkOrder(Long id, Date expectedDate, Date deliveryDate, OrderStatus orderStatus,
			OrderPriority orderPriority, String generalContractor, String jobSite, String address, String city,
			String description) {
		super();
		this.id = id;
		this.expectedDate = expectedDate;
		this.deliveryDate = deliveryDate;
		setOrderStatus(orderStatus);
		setOrderPriority(orderPriority);
		this.generalContractor = generalContractor;
		this.jobSite = jobSite;
		this.address = address;
		this.city = city;
		this.description = description;
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

	public Set<User> getUsers() {
		return users;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		WorkOrder other = (WorkOrder) obj;
		return Objects.equals(id, other.id);
	}

}
