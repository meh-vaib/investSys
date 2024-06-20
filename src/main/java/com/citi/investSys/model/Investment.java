package com.citi.investSys.model;

import jakarta.persistence.*;

@Entity
@Table(name="invest_sys_info")
public class Investment {
    @Id
    private String investmentID;
    private String typeOfInvestment;
    private double amount;
    private String dateOfInvestment;
    private String customerID;

    @ManyToOne
    private Customer customerDetails;

    public Customer getCustomerDetails() {
        return customerDetails;
    }

    public void setCustomerDetails(Customer customerDetails) {
        this.customerDetails = customerDetails;
    }

    public String getCustomerID() {
        return customerID;
    }

    public void setCustomerID(String customerID) {
        this.customerID = customerID;
    }

    public String getInvestmentID() {
        return investmentID;
    }

    public void setInvestmentID(String investmentID) {
        this.investmentID = investmentID;
    }

    public String getTypeOfInvestment() {
        return typeOfInvestment;
    }

    public void setTypeOfInvestment(String typeOfInvestment) {
        this.typeOfInvestment = typeOfInvestment;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getDateOfInvestment() {
        return dateOfInvestment;
    }

    public void setDateOfInvestment(String dateOfInvestment) {
        this.dateOfInvestment = dateOfInvestment;
    }

}
