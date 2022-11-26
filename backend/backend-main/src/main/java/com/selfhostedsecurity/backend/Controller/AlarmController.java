package com.selfhostedsecurity.backend.Controller;

import java.io.IOException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import com.selfhostedsecurity.backend.Model.Camera;
import com.selfhostedsecurity.backend.Model.CameraRepository;
import com.selfhostedsecurity.backend.Model.EmailConfig;
import com.selfhostedsecurity.backend.Model.EmailConfigRepository;
import com.selfhostedsecurity.backend.Utils.EventManager;

import reactor.core.publisher.Mono;

@RestController
public class AlarmController {

	@Autowired
 	CameraRepository cameraRepository;

    @Autowired
    EmailConfigRepository emailConfigRepository;

    @Autowired
    private Environment environment;

    public AlarmController() throws IOException{ }

    @CrossOrigin
    @GetMapping("/getBackendPythonPort")
    public ResponseEntity<?> getBackendPythonPort(){
        return ResponseEntity.status(HttpStatus.OK).body("port: "+environment.getProperty("backendPython"));
    }

	@CrossOrigin
    @PostMapping("/activateAlarm") //updates alarmActivated to true saving to repository, starts motiondetection service for the camera
	public ResponseEntity<?> activateAlarm(@Valid @RequestBody Camera inputCamera) {

        if(!cameraRepository.findById(inputCamera.getId()).isPresent()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Camera not found");

        try{

            WebClient wc = WebClient.create("http://127.0.0.1:" + environment.getProperty("backendPython") + "/");
            Camera cameraToUpdate = cameraRepository.findById(inputCamera.getId()).get();

            if(!cameraToUpdate.getAlarmStatus().equals("DEACTIVATED")) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Alarm must be deactivated to be activated");

            wc
                .post()
                .uri("/startMotionDetection")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .body(Mono.just(cameraToUpdate), Camera.class)
                .retrieve().bodyToMono(String.class).subscribe();

            cameraToUpdate.setAlarmStatus("ACTIVATED");
            cameraRepository.save(cameraToUpdate);
			
            EventManager.sendSseEventsToUI("UPDATE");
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

		}catch(Exception e){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}

	}

    @CrossOrigin
    @PostMapping("/deactivateAlarm") //deactivates the alarm if active or triggered
	public ResponseEntity<?> deactivateAlarm(@Valid @RequestBody Camera inputCamera) {

        boolean wasTriggered = false;

        if(!cameraRepository.findById(inputCamera.getId()).isPresent()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Camera not found");

        try{

            WebClient wc = WebClient.create("http://127.0.0.1:" + environment.getProperty("backendPython") + "/");
            Camera cameraToUpdate = cameraRepository.findById(inputCamera.getId()).get();

            if(cameraToUpdate.getAlarmStatus().equals("DEACTIVATED")) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Alarm is already disactivated");

            if(cameraToUpdate.getAlarmStatus().equals("TRIGGERED")){
                //also stop recording and alarm sound
                wasTriggered = true;

                wc
                    .post()
                    .uri("/stopRecording")
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .body(Mono.just(cameraToUpdate), Camera.class)
                    .retrieve().bodyToMono(String.class).subscribe();

            }

            //stop motion detection
            wc
                .post()
                .uri("/stopMotionDetection")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .body(Mono.just(cameraToUpdate), Camera.class)
                .retrieve().bodyToMono(String.class).subscribe();

            cameraToUpdate.setAlarmStatus("DEACTIVATED");
			cameraRepository.save(cameraToUpdate);

            if(wasTriggered){
                boolean existTriggeredCamera = false;
                for (Camera cam : cameraRepository.findAll()) {
                    if(cam.getAlarmStatus().equals("TRIGGERED")){
                        existTriggeredCamera = true;
                    }
                }

                if(!existTriggeredCamera){
                    wc
                        .post()
                        .uri("/stopAlarm")
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .retrieve().bodyToMono(String.class).subscribe();
                }
            }
			
            EventManager.sendSseEventsToUI("UPDATE");
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

		}catch(Exception e){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}

	}

    /* The following are endpoints reserved to be called by the python service */

    @CrossOrigin
    @PostMapping("/onMovementDetected")
	public ResponseEntity<?> onMovementDetected(@Valid @RequestBody Camera triggeredCamera) {

        if(!cameraRepository.findById(triggeredCamera.getId()).isPresent()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Camera not found");

        //change camera status to triggered
        Camera cameraToUpdate = cameraRepository.findById(triggeredCamera.getId()).get();

        if(!cameraToUpdate.getAlarmStatus().equals("ACTIVATED")) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Alarm must be activated to be triggered");

        cameraToUpdate.setAlarmStatus("TRIGGERED");
        cameraRepository.save(cameraToUpdate);

        //send mail
        WebClient wc = WebClient.create("http://127.0.0.1:" + environment.getProperty("backendPython") + "/");

        if(emailConfigRepository.count() != 0){ //sendmail only if emailconfig is set, otherwise the security system works fine but without the email notification

            EmailConfig data = emailConfigRepository.findAll().iterator().next();

            wc
                .post()
                .uri("/sendMail")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .body(Mono.just(data), EmailConfig.class)
                .retrieve().bodyToMono(String.class).subscribe();

        }

        wc
            .post()
            .uri("/startRecording")
            .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .body(Mono.just(cameraToUpdate), Camera.class)
            .retrieve().bodyToMono(String.class).subscribe();

        wc
            .post()
            .uri("/startAlarm")
            .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .retrieve().bodyToMono(String.class).subscribe();

        EventManager.sendSseEventsToUI("UPDATE");
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

	}

    @CrossOrigin
    @PostMapping("/onMovementStopped")
	public ResponseEntity<?> onMovementStopped(@Valid @RequestBody Camera stoppedCamera) {

        if(!cameraRepository.findById(stoppedCamera.getId()).isPresent()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Camera not found");

        //change camera status to activated (the motion detection process is still working because user didn't disactivated the alarm)
        Camera cameraToUpdate = cameraRepository.findById(stoppedCamera.getId()).get();

        if(!cameraToUpdate.getAlarmStatus().equals("TRIGGERED")) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Alarm must be triggered");

        cameraToUpdate.setAlarmStatus("ACTIVATED"); 
        cameraRepository.save(cameraToUpdate);

        WebClient wc = WebClient.create("http://127.0.0.1:" + environment.getProperty("backendPython") + "/");

        wc
            .post()
            .uri("/stopRecording")
            .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .body(Mono.just(cameraToUpdate), Camera.class)
            .retrieve().bodyToMono(String.class).subscribe();

        //stop alarm sound

        boolean existTriggeredCamera = false;
        for (Camera cam : cameraRepository.findAll()) {
            if(cam.getAlarmStatus().equals("TRIGGERED")){
                existTriggeredCamera = true;
            }
        }

        if(!existTriggeredCamera){
            wc
                .post()
                .uri("/stopAlarm")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .retrieve().bodyToMono(String.class).subscribe();
        }

        EventManager.sendSseEventsToUI("UPDATE");
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

	}

}
