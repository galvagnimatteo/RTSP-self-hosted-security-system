package com.selfhostedsecurity.backend.Utils;

import java.io.IOException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
public class EventManager {

    private static SseEmitter emitter;

    @CrossOrigin
    @RequestMapping(path = "/notification", method = RequestMethod.GET)
    public SseEmitter notification() throws IOException {
        emitter = new SseEmitter(-1L);
        return emitter;
    }

    public static void sendSseEventsToUI(String notification) {
        Thread thread = new Thread(){
            public void run(){
                try {
                    emitter.send(notification);
                } catch(Exception e) {
                    emitter.completeWithError(e);
                    e.printStackTrace();
                }
            }
        };
        
        thread.start();
    }
    
}
