package com.apex.controller;

import com.apex.model.Investor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/investors")
@CrossOrigin(origins = "*")
public class InvestorController {

    private final List<Investor> investors = new ArrayList<>();
    private final AtomicLong idCounter = new AtomicLong(1);

    public InvestorController() {
        investors.add(new Investor(idCounter.getAndIncrement(), "Apex Capital Partners",
            "contact@apexcap.com", "Apex Capital Partners", "institutional", "$50M"));
        investors.add(new Investor(idCounter.getAndIncrement(), "John Smith",
            "john@smithventures.com", "Smith Ventures", "family_office", "$15M"));
        investors.add(new Investor(idCounter.getAndIncrement(), "Maria Garcia",
            "maria@garcia.co", "Garcia & Associates", "individual", "$5M"));
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllInvestors() {
        return ResponseEntity.ok(Map.of(
            "data", investors,
            "total", investors.size()
        ));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> addInvestor(@RequestBody Investor investor) {
        investor.setId(idCounter.getAndIncrement());
        investors.add(investor);
        return ResponseEntity.ok(Map.of(
            "message", "Investor added successfully",
            "data", investor
        ));
    }
}
