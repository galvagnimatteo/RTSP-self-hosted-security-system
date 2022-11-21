package com.selfhostedsecurity.backend.Model;

import java.io.File;
import java.io.IOException;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.DataLine.Info;
import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.SourceDataLine;
import javax.sound.sampled.UnsupportedAudioFileException;

import static javax.sound.sampled.AudioSystem.getAudioInputStream;
import static javax.sound.sampled.AudioFormat.Encoding.PCM_SIGNED;

public class AudioPlayerThread extends Thread{  

    private String filePath;
    private boolean isStopped;

    public AudioPlayerThread(String filePath){
        this.filePath = filePath;
        this.isStopped = true;
    }

    public void setStopped(boolean value){
        this.isStopped = value;
    }

    public boolean isStopped(){
        return this.isStopped;
    }

    public void run() {
            
        final File file = new File(filePath);

        while(!this.isStopped){

            try (final AudioInputStream in = getAudioInputStream(file)) {
                
                final AudioFormat outFormat = getOutFormat(in.getFormat());
                final Info info = new Info(SourceDataLine.class, outFormat);

                try (final SourceDataLine line =
                        (SourceDataLine) AudioSystem.getLine(info)) {

                    if (line != null) {
                        line.open(outFormat);
                        line.start();
                        stream(getAudioInputStream(outFormat, in), line);
                        line.drain();
                        line.stop();
                    }
                }

            } catch (UnsupportedAudioFileException 
                | LineUnavailableException 
                | IOException e) {
                throw new IllegalStateException(e);
            }

        }

    }

    private AudioFormat getOutFormat(AudioFormat inFormat) {
        final int ch = inFormat.getChannels();

        final float rate = inFormat.getSampleRate();
        return new AudioFormat(PCM_SIGNED, rate, 16, ch, ch * 2, rate, false);
    }
 
    private void stream(AudioInputStream in, SourceDataLine line) 
        throws IOException {
        final byte[] buffer = new byte[4096];
        for (int n = 0; n != -1; n = in.read(buffer, 0, buffer.length)) {
            if(this.isStopped) break;
            line.write(buffer, 0, n);
        }
    }
    
}  
