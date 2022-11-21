package com.selfhostedsecurity.backend.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Camera {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    @NotNull
    private String name;

    private String zone;

    @NotNull
    private String rtspUrl;

    @NotNull
    private String alarmStatus; //can't use enum because fastapi returns 422 idk

    protected Camera() { }

    public Camera(String name, String zone, String rtspUrl){
        this.name = name;
        this.zone = zone;
        this.rtspUrl = rtspUrl;
        this.alarmStatus = "DEACTIVATED";
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getZone() {
        return zone;
    }

    public void setLocation(String zone) {
        this.zone = zone;
    }

    public String getRtspUrl() {
        return rtspUrl;
    }

    public void setRtspUrl(String rtspUrl) {
        this.rtspUrl = rtspUrl;
    }

    public String getAlarmStatus(){
        return this.alarmStatus;
    }

    public void setAlarmStatus(String alarmStatus){
        this.alarmStatus = alarmStatus;
    }
    
}
