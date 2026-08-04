package com.apex.model;

public class Investor {
    private Long id;
    private String name;
    private String email;
    private String firm;
    private String type;
    private String investedAmount;
    private String joinedDate;

    public Investor() {}

    public Investor(Long id, String name, String email, String firm,
                    String type, String investedAmount) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.firm = firm;
        this.type = type;
        this.investedAmount = investedAmount;
        this.joinedDate = java.time.Instant.now().toString();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getFirm() { return firm; }
    public void setFirm(String firm) { this.firm = firm; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getInvestedAmount() { return investedAmount; }
    public void setInvestedAmount(String investedAmount) { this.investedAmount = investedAmount; }
    public String getJoinedDate() { return joinedDate; }
    public void setJoinedDate(String joinedDate) { this.joinedDate = joinedDate; }
}
