package com.apex.model;

public class Deal {
    private Long id;
    private String companyName;
    private String founderName;
    private String email;
    private String sector;
    private String stage;
    private String fundingAmount;
    private String description;
    private String website;
    private String status;
    private String submittedAt;

    public Deal() {}

    public Deal(Long id, String companyName, String founderName, String email,
                String sector, String stage, String fundingAmount,
                String description, String website) {
        this.id = id;
        this.companyName = companyName;
        this.founderName = founderName;
        this.email = email;
        this.sector = sector;
        this.stage = stage;
        this.fundingAmount = fundingAmount;
        this.description = description;
        this.website = website;
        this.status = "under_review";
        this.submittedAt = java.time.Instant.now().toString();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getFounderName() { return founderName; }
    public void setFounderName(String founderName) { this.founderName = founderName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSector() { return sector; }
    public void setSector(String sector) { this.sector = sector; }
    public String getStage() { return stage; }
    public void setStage(String stage) { this.stage = stage; }
    public String getFundingAmount() { return fundingAmount; }
    public void setFundingAmount(String fundingAmount) { this.fundingAmount = fundingAmount; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(String submittedAt) { this.submittedAt = submittedAt; }
}
