package com.citi.investSys.controller;

import com.citi.investSys.model.Customer;
import com.citi.investSys.response.ResponseHandler;
import com.citi.investSys.service.RealCustomerService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/investsys/customer")
public class CustomerController {

    RealCustomerService realCustomerService;

    public CustomerController(RealCustomerService realCustomerService) {
        this.realCustomerService = realCustomerService;
    }

    @GetMapping("{customerID}")
    @Operation(summary="Fetch Customer", description = "Fetches a Customer based on customerID")
    public ResponseEntity<Object> getCustomer(@PathVariable("customerID") String customerID){
        return ResponseHandler.responseBuilder(
                "Requested Investment Details are given here",
                HttpStatus.OK,
                realCustomerService.getCustomer(customerID));
    }

    @GetMapping()
    @Operation(summary="Fetch Customer", description = "Fetches all Customers")
    public ResponseEntity<Object> getAllCustomer(){
        return ResponseHandler.responseBuilder(
                "Requested Customer Details are given here",
                HttpStatus.OK,
                realCustomerService.getAllCustomers());
    }

    @PostMapping
    @Operation(summary="Add Customer", description = "Adds a Customer to the DB")
    public String createInvestment(@RequestBody Customer customer){
        System.out.println(customer.getCustomerID());
        realCustomerService.addCustomer(customer);
        return "Customer Added";
    }

    @DeleteMapping("{customerID}")
    @Operation(summary="Delete Customer", description = "Deletes a Customer based on customerID")
    public String deleteInvestment(@PathVariable("customerID") String customerID){
        realCustomerService.removeCustomer(customerID);
        return "Customer Deleted Successfully";
    }

}
