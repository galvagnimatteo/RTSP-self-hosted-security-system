package com.selfhostedsecurity.backend.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class EmailConfig {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id; //need this to save jpa

    @NotNull
    private String mailFrom;

    @NotNull
    private String[] mailTo;

    @NotNull
    private String apiKey;
    
    @NotNull
    private String apiSecret;

    public EmailConfig() { }

    public EmailConfig(String mailFrom, String mailTo[], String apiKey, String apiSecret) {
        this.mailFrom = mailFrom;
        this.mailTo = mailTo;
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    public String getMailFrom() {
        return mailFrom;
    }

    public void setMailFrom(String mailFrom) {
        this.mailFrom = mailFrom;
    }
    
    public String[] getMailTo() {
        return mailTo;
    }
    
    public void setMailTo(String[] mailTo) {
        this.mailTo = mailTo;
    }
    
    public String getApiKey() {
        return apiKey;
    }
    
    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }
    
    public String getApiSecret() {
        return apiSecret;
    }
    
    public void setApiSecret(String apiSecret) {
        this.apiSecret = apiSecret;
    }
    
}
