package com.citi.investSys.controller;

import com.citi.investSys.model.Investment;
import com.citi.investSys.response.ResponseHandler;
import com.citi.investSys.service.RealInvestmentService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/investsys")
public class InvestmentController {

    RealInvestmentService realInvestmentService;

    public InvestmentController(RealInvestmentService realInvestmentService) {
        this.realInvestmentService = realInvestmentService;
    }


    @GetMapping("{investmentID}")
    @Operation(summary="Fetch Investment", description = "Fetches an Investment based on investmentID")
    public ResponseEntity<Object> getInvestment(@PathVariable("investmentID") String investmentID){
        return ResponseHandler.responseBuilder(
                "Requested Investment Details are given here",
                HttpStatus.OK,
                realInvestmentService.getInvestment(investmentID));
    }

    @GetMapping()
    @Operation(summary="Fetch Investment", description = "Fetches all Investments")
    public ResponseEntity<Object> getAllInvestment(){
//        return realInvestmentService.getAllInvestments();
        return ResponseHandler.responseBuilder(
                "Requested Investments Details are given here",
                HttpStatus.OK,
                realInvestmentService.getAllInvestments());
    }

    @GetMapping("/customer/{customerID}")
    @Operation(summary="Fetch Investment", description = "Fetches all Investments of a Customer")
    public ResponseEntity<Object> getAllInvestmentsOfCustomer(@PathVariable("customerID") String customerID){
//        return realInvestmentService.getAllInvestmentsOfCustomers(customerID);
        return ResponseHandler.responseBuilder(
                "Requested Investments Details of the Customer are given here",
                HttpStatus.OK,
                realInvestmentService.getAllInvestmentsOfCustomers(customerID));
    }

    @PostMapping
    @Operation(summary="Add Investment", description = "Adds an Investment to the DB")
    public String createInvestment(@RequestBody Investment investment){
        System.out.println(investment.getInvestmentID());
        realInvestmentService.addInvestment(investment);
        return "Investment Added";
    }

    @PutMapping
    @Operation(summary="Update Investment", description = "Updates an Investment. Can also be used to create new investment")
    public String updateInvestment(@RequestBody Investment investment){
        realInvestmentService.updateInvestment(investment);
        return "Investment Updated Successfully";
    }

    @DeleteMapping("{investmentID}")
    @Operation(summary="Delete Investment", description = "Deletes an Investment based on investmentID")
    public String deleteInvestment(@PathVariable("investmentID") String investmentID){
//        System.out.println(investmentID);
        realInvestmentService.removeInvestment(investmentID);
        return "Investment Deleted Successfully";
    }
}
