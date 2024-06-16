package com.citi.investSys.controller;

import com.citi.investSys.model.Investment;
import com.citi.investSys.service.RealInvestmentService;
import io.swagger.v3.oas.annotations.Operation;
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
    public Investment getInvestment(@PathVariable("investmentID") String investmentID){
        return realInvestmentService.getInvestment(investmentID);
    }

    @GetMapping()
    @Operation(summary="Fetch Investment", description = "Fetches all Investments")
    public List<Investment> getAllInvestment(){
        return realInvestmentService.getAllInvestments();
    }

    @GetMapping("/customer/{customerID}")
    @Operation(summary="Fetch Investment", description = "Fetches all Investments of a Customer")
    public List<Investment> getAllInvestmentsOfCustomer(@PathVariable("customerID") String customerID){
        return realInvestmentService.getAllInvestmentsOfCustomers(customerID);
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
