package com.selfhostedsecurity.backend.Controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.selfhostedsecurity.backend.Utils.EventManager;

@RestController
public class RecordingsController {

    @CrossOrigin
    @GetMapping("/getRecording")
    public ResponseEntity<?> getRecording(@RequestParam String name){

        File file = new File("../recordings/" + name);
        byte[] bytes;
        try {
            bytes = Files.readAllBytes(file.toPath());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        ByteArrayResource videoArray = new ByteArrayResource(bytes);

        return ResponseEntity.ok().contentType(MediaType.APPLICATION_OCTET_STREAM).body(videoArray);
        
    }

    @CrossOrigin
    @GetMapping("/getAllRecordings")
    public ResponseEntity<?> getAllRecordings() throws IOException{

        ArrayList<String> fileNames = new ArrayList<>();

        File folder = new File("../recordings");
        ArrayList<File> allFiles = new ArrayList<>(Arrays.asList(folder.listFiles()));

        class CustomComparator implements Comparator<File> {
            @Override
            public int compare(File o1, File o2) {

                if(o1.lastModified() < o2.lastModified()){
                    return 1;
                }else if(o1.lastModified() > o2.lastModified()){
                    return -1;
                }else{
                    return 0;
                }

            }
        }

        allFiles.sort(new CustomComparator());
        
        for (final File fileEntry : allFiles) {
            if (!fileEntry.isDirectory()) {
                fileNames.add(fileEntry.getName());
            }
        }

        return ResponseEntity.status(HttpStatus.OK).body(fileNames);

    }

    @CrossOrigin
    @DeleteMapping("/deleteRecording")
	public ResponseEntity<?> deleteCamera(@RequestParam String name) {

        File fileToDelete = new File("../recordings/" + name);

        if(fileToDelete.delete()) {
            EventManager.sendSseEventsToUI("UPDATE");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
            else return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

		
	}
    
}
