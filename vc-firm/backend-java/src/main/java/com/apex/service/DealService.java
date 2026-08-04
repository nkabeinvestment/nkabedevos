package com.apex.service;

import com.apex.model.Deal;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class DealService {
    private final List<Deal> deals = new ArrayList<>();
    private final AtomicLong idCounter = new AtomicLong(1);

    public DealService() {
        deals.add(new Deal(idCounter.getAndIncrement(), "NeuralForge AI", "James Chen",
            "james@neuralforge.com", "AI", "Series B", "$12M",
            "Enterprise AI workflow automation", "https://neuralforge.ai"));
        deals.add(new Deal(idCounter.getAndIncrement(), "PayStream", "Sarah Kim",
            "sarah@paystream.io", "FinTech", "Series A", "$8M",
            "Cross-border B2B payment infrastructure", "https://paystream.io"));
        deals.get(0).setStatus("approved");
        deals.get(1).setStatus("in_due_diligence");
    }

    public List<Deal> getAllDeals() {
        return deals;
    }

    public Optional<Deal> getDealById(Long id) {
        return deals.stream().filter(d -> d.getId().equals(id)).findFirst();
    }

    public Deal createDeal(Deal deal) {
        deal.setId(idCounter.getAndIncrement());
        deal.setStatus("submitted");
        deals.add(deal);
        return deal;
    }

    public Optional<Deal> updateDealStatus(Long id, String status) {
        Optional<Deal> deal = getDealById(id);
        deal.ifPresent(d -> d.setStatus(status));
        return deal;
    }

    public long countByStatus(String status) {
        return deals.stream().filter(d -> status.equals(d.getStatus())).count();
    }
}
