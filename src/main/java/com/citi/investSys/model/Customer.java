package com.citi.investSys.model;

import jakarta.persistence.*;
import org.springframework.context.annotation.DependsOn;

@Entity
@Table(name="customer_info")
@DependsOn("invest_sys_info")
public class Customer {
    @Id
    private String customerID;
    private String name;
    private String accNumber;

    public String getCustomerID() {
        return customerID;
    }

    public void setCustomerID(String customerID) {
        this.customerID = customerID;
    }

    public String getAccNumber() {
        return accNumber;
    }

    public void setAccNumber(String accNumber) {
        this.accNumber = accNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
