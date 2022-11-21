package com.selfhostedsecurity.backend.Controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.selfhostedsecurity.backend.Model.Camera;
import com.selfhostedsecurity.backend.Model.CameraRepository;
import com.selfhostedsecurity.backend.Utils.EventManager;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class CameraCrudController {

	@Autowired
 	CameraRepository cameraRepository;

	@CrossOrigin
    @PostMapping("/createCamera")
	public ResponseEntity<?> createCamera(@Valid @RequestBody Camera inputCamera) {

		try{

			if(!inputCamera.getAlarmStatus().equals("DEACTIVATED")) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
				"Alarm must be off on camera creation, use /activateAlarm to activate it");

			Camera createdCamera = cameraRepository.save(inputCamera);

			EventManager.sendSseEventsToUI("UPDATE");
			return ResponseEntity.status(HttpStatus.CREATED).body(createdCamera);

		}catch(Exception e){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
		
	}

	@CrossOrigin
    @DeleteMapping("/deleteCamera")
	public ResponseEntity<?> deleteCamera(@RequestParam Integer id) {

		if(!cameraRepository.findById(id).isPresent()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Camera not found");

		Camera cam = cameraRepository.findById(id).get();
		if(!cam.getAlarmStatus().equals("DEACTIVATED")) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
				"Alarm must be off on camera delete");

		try{

			cameraRepository.deleteById(id);

			EventManager.sendSseEventsToUI("UPDATE");
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

		}catch(Exception e){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
		
	}

	@CrossOrigin
    @PutMapping("/updateCamera")
	public ResponseEntity<?> updateCamera(@Valid @RequestBody Camera inputCamera) {

		if(!cameraRepository.findById(inputCamera.getId()).isPresent()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Camera not found");

		try{

			Camera cameraToUpdate = cameraRepository.findById(inputCamera.getId()).get();

			cameraToUpdate.setLocation(inputCamera.getZone());
			cameraToUpdate.setName(inputCamera.getName());
			//can't change rtspUrl from here, create a new camera and delete this one to restart the motion detection service
			//can't change alarmStatus from here, use the corresponding methods activate/deactivateAlarm inside alarmcontroller

			cameraRepository.save(cameraToUpdate);
			
			EventManager.sendSseEventsToUI("UPDATE");
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

		}catch(Exception e){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
		
	}

	@CrossOrigin
    @GetMapping("/getCamera")
	public ResponseEntity<?> getCamera(@RequestParam Integer id) {

		if(!cameraRepository.findById(id).isPresent()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Camera not found");

		try{

			Camera foundCamera = cameraRepository.findById(id).get();
			return ResponseEntity.status(HttpStatus.OK).body(foundCamera);

		}catch(Exception e){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
		
	}

	@CrossOrigin
    @GetMapping("/getAllCameras")
	public ResponseEntity<?> getAllCameras() {

		return ResponseEntity.status(HttpStatus.OK).body(cameraRepository.findAll());
		
	}

}
