package com.selfhostedsecurity.backend.Utils;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.selfhostedsecurity.backend.Model.Camera;
import com.selfhostedsecurity.backend.Model.CameraRepository;

import reactor.core.publisher.Mono;

@Service
public class AlarmRestartingService {

    @Autowired
    CameraRepository cameraRepository;

    //in case of unexpected shutdown, if the alarm of some cameras was activated, restart motion detection
    @PostConstruct
    private void postConstruct() {
        
        for (Camera c : cameraRepository.findAll()) {

            if(c.getAlarmStatus().equals("ACTIVATED")){

                WebClient wc = WebClient.create("http://127.0.0.1:8000/");
    
                wc
                    .post()
                    .uri("/startMotionDetection")
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .body(Mono.just(c), Camera.class)
                    .retrieve().bodyToMono(String.class).subscribe();        

            }else if(c.getAlarmStatus().equals("TRIGGERED")){

                //if during alarm triggered an unexpected shutdown happens, on restarting the alarm will be reactivated but not triggered

                WebClient wc = WebClient.create("http://127.0.0.1:8000/");
                Camera cameraToUpdate = cameraRepository.findById(c.getId()).get();
    
                wc
                    .post()
                    .uri("/startMotionDetection")
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .body(Mono.just(cameraToUpdate), Camera.class)
                    .retrieve().bodyToMono(String.class).subscribe();

                cameraToUpdate.setAlarmStatus("ACTIVATED");
                cameraRepository.save(cameraToUpdate);
                    
            }
            
        }

    }
    
}
