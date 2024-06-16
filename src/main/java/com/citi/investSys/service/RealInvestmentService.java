package com.citi.investSys.service;

import com.citi.investSys.model.Investment;
import com.citi.investSys.repository.InvestSysRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RealInvestmentService implements InvestmentService{

    InvestSysRepository investSysRepository;

    public RealInvestmentService(InvestSysRepository investSysRepository) {
        this.investSysRepository = investSysRepository;
    }

    @Override
    public String addInvestment(Investment investment) {
//        System.out.println(investment.getInvestment_id());
        investSysRepository.save(investment);
        return "Investment Saved";
    }

    @Override
    public String removeInvestment(String investmentID) {
        investSysRepository.deleteById(investmentID);
        return "Investment Removed";
    }

    @Override
    public String updateInvestment(Investment investment) {
        investSysRepository.save(investment);
        return "Investment Updated";
    }

    @Override
    public Investment getInvestment(String investmentID) {
        return investSysRepository.findById(investmentID).get();
    }

    @Override
    public List<Investment> getAllInvestmentsOfCustomers(String customerID) {
        return investSysRepository.findByCustomerID(customerID);
    }

    @Override
    public List<Investment> getAllInvestments() {
        return investSysRepository.findAll();
    }
}
