package com.selfhostedsecurity.backend.Controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.selfhostedsecurity.backend.Model.EmailConfig;
import com.selfhostedsecurity.backend.Model.EmailConfigRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class SystemController {

    @Autowired
    EmailConfigRepository emailConfigRepository;

	@CrossOrigin
    @PostMapping("/setEmailConfig")
	public ResponseEntity<?> setEmailConfig(@Valid @RequestBody EmailConfig inputConfig) {

        emailConfigRepository.deleteAll(); //removes previous config

        EmailConfig emailConfig = emailConfigRepository.save(inputConfig); //saves new config

		return ResponseEntity.status(HttpStatus.OK).body(emailConfig);
		
	}

    @CrossOrigin
    @GetMapping("/getEmailConfig")
	public ResponseEntity<?> getEmailConfig() {

        if(emailConfigRepository.count() == 0) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No email configuration found");
		else return ResponseEntity.status(HttpStatus.OK).body(emailConfigRepository.findAll().iterator().next());
		
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
	public ResponseEntity<?> getRecordingsNumber() throws IOException {

        Files.createDirectories(Paths.get("../recordings"));
		return ResponseEntity.status(HttpStatus.OK).body(new File("../recordings").list().length);
		
	}

    @CrossOrigin
    @PostMapping("/uploadAlarmFile")
	public ResponseEntity<?> uploadAlarmFile(@RequestParam("file") MultipartFile file) {

        try {
            String filename = "alarmSound.mp3"; // Give a random filename here.
            byte[] bytes = file.getBytes();
            String insPath = "./" + filename; // Directory path where you want to save ;
            Files.write(Paths.get(insPath), bytes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		
	}

}
