package com.citi.investSys.service;

import com.citi.investSys.model.Investment;

import java.util.List;

public interface InvestmentService {
    String addInvestment(Investment investment);

    String removeInvestment(String investmentID );

    String updateInvestment(Investment investment);

    Investment getInvestment(String investmentID);

    List<Investment> getAllInvestmentsOfCustomers(String customerID);

    List<Investment> getAllInvestments();
}
