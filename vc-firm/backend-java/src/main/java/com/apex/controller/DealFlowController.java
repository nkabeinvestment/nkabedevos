package com.apex.controller;

import com.apex.model.Deal;
import com.apex.service.DealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/deals")
@CrossOrigin(origins = "*")
public class DealFlowController {

    @Autowired
    private DealService dealService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllDeals() {
        List<Deal> deals = dealService.getAllDeals();
        return ResponseEntity.ok(Map.of(
            "data", deals,
            "total", deals.size()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDealById(@PathVariable Long id) {
        return dealService.getDealById(id)
            .<ResponseEntity<?>>map(deal -> ResponseEntity.ok(Map.of("data", deal)))
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createDeal(@RequestBody Deal deal) {
        Deal created = dealService.createDeal(deal);
        return ResponseEntity.ok(Map.of(
            "message", "Deal submitted successfully",
            "data", created
        ));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateDealStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        return dealService.updateDealStatus(id, status)
            .<ResponseEntity<?>>map(deal -> ResponseEntity.ok(Map.of(
                "message", "Status updated",
                "data", deal
            )))
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(Map.of(
            "total", dealService.getAllDeals().size(),
            "submitted", dealService.countByStatus("submitted"),
            "under_review", dealService.countByStatus("under_review"),
            "in_due_diligence", dealService.countByStatus("in_due_diligence"),
            "approved", dealService.countByStatus("approved"),
            "rejected", dealService.countByStatus("rejected")
        ));
    }
}
