package com.citi.investSys.service;

import com.citi.investSys.exception.InvestmentNotFoundException;
import com.citi.investSys.model.Customer;
import com.citi.investSys.repository.CustomerSysRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RealCustomerService implements CustomerService{

    CustomerSysRepository customerSysRepository;

    public RealCustomerService(CustomerSysRepository customerSysRepository) {
        this.customerSysRepository = customerSysRepository;
    }

    @Override
    public String addCustomer(Customer customer) {
        customerSysRepository.save(customer);
        return "Customer Saved";
    }

    @Override
    public String removeCustomer(String customerID) {
        if(customerSysRepository.existsById(customerID)){
            customerSysRepository.deleteById(customerID);
            return "Customer Removed";
        }
        else{
            throw new InvestmentNotFoundException("Requested Customer does not exist");
        }
    }

    @Override
    public Customer getCustomer(String customerID) {
        if(customerSysRepository.findById(customerID).isEmpty()){
            throw new InvestmentNotFoundException("Requested Customer does not exist");
        }
        else{
            return customerSysRepository.findById(customerID).get();
        }
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerSysRepository.findAll();
    }
}
