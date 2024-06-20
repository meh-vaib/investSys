package com.citi.investSys.service;

import com.citi.investSys.model.Customer;

import java.util.List;

public interface CustomerService {
    String addCustomer(Customer customer);

    String removeCustomer(String customerID);

    Customer getCustomer(String customerID);

    List<Customer> getAllCustomers();
}
