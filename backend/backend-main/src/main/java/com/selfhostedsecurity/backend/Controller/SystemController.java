package com.selfhostedsecurity.backend.Controller;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.selfhostedsecurity.backend.Model.EmailConfig;
import com.selfhostedsecurity.backend.Model.EmailConfigRepository;
import com.selfhostedsecurity.backend.Utils.EventManager;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class SystemController {

    @Autowired
    EmailConfigRepository emailConfigRepository;

	@CrossOrigin
    @PostMapping("/setEmailConfig")
	public ResponseEntity<?> setEmailConfig(@Valid @RequestBody EmailConfig inputConfig) {

        emailConfigRepository.deleteAll(); //removes previous config

        EmailConfig emailConfig = emailConfigRepository.save(inputConfig); //saves new config
        EventManager.sendSseEventsToUI("UPDATE");

		return ResponseEntity.status(HttpStatus.CREATED).body(emailConfig);
		
	}

    @CrossOrigin
    @GetMapping("/getEmailConfig")
	public ResponseEntity<?> getEmailConfig() {

        if(emailConfigRepository.count() == 0) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No email configuration found");
		else return ResponseEntity.status(HttpStatus.CREATED).body(emailConfigRepository.findAll().iterator().next());
		
	}

    @CrossOrigin
    @GetMapping("/getSpaceInfo")
	public ResponseEntity<?> getSpaceInfo() {

        File currDir = new File(".");

        Long totalSpace = currDir.getTotalSpace() / (1024 * 1024 * 1024);
        Long usableSpace = currDir.getUsableSpace() / (1024 * 1024 * 1024);
        Long occupiedSpace = totalSpace - usableSpace;

        Map<String, String> response = new HashMap<String, String>();
        response.put("totalSpace", totalSpace + "");
        response.put("occupiedSpace", occupiedSpace + "");

		return ResponseEntity.status(HttpStatus.OK).body(response);
		
	}

    @CrossOrigin
    @GetMapping("/getRecordingsNumber")
	public ResponseEntity<?> getRecordingsNumber() {

		return ResponseEntity.status(HttpStatus.OK).body(new File("../recordings").list().length);
		
	}

}
