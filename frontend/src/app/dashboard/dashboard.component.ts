import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, Testability, ViewChild } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Camera } from 'app/camera';
import { CameraDialogComponent } from 'app/camera-dialog/camera-dialog.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { RecordingsComponent } from 'app/recordings/recordings.component';
import { resourceLimits } from 'worker_threads';
import portsJson from '../../assets/ports.json';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public allCameras: Camera[];
  public occupiedSpace: String;
  public totalSpace: String;
  public recordingsNumber: any;
  public allZones: String[];

  @ViewChild('selectactivate') selectActivate: ElementRef;
  @ViewChild('selectdeactivate') selectDeactivate: ElementRef;

  public existTriggeredCamera: boolean = false;

  source: any;

  constructor(private http: HttpClient, private apiService: ApiService, private matDialog: MatDialog, @Inject(DOCUMENT) private document) { 

    this.source = new EventSource('http://' + document.location.hostname + ':' + portsJson.backendMain + '/notification');

  }

  ngOnInit() {
    this.update();
    this.subscribeUpdateEvent();
  }

  subscribeUpdateEvent(){
    this.source.addEventListener('message', message => {
      this.update();
    });
  }

  update(){
    this.apiService.getAllCameras().subscribe((data: Camera[]) => {
      this.allCameras = data;

      this.existTriggeredCamera = false;
      this.allCameras.forEach(a => {
        if(a.alarmStatus == "TRIGGERED") this.existTriggeredCamera = true;
      });

      this.allZones = [];
      this.allCameras.forEach(camera => {
        this.allZones.push(camera.zone);
      });

    });

    this.apiService.getSpaceInfo().subscribe((data: any) => {this.occupiedSpace = data.occupiedSpace; this.totalSpace = data.totalSpace;});
    this.apiService.getRecordingsNumber().subscribe((data: any) => this.recordingsNumber = data);

  }

  public redirectToLiveStream(event: any, camera: Camera){

    event.preventDefault();

    this.apiService.getStream(camera).subscribe({

      //if camera stream doesnt exists, create it
      error: (e) => this.apiService.addStream(camera).subscribe({

        error: (err) => console.log(err),
        complete: () => window.location.href = 'http://' + document.location.hostname + ':' + portsJson.rtsptoweb + '/pages/player/webrtc/' + camera.id + '/0'

      }),

      //if it exists, delete it and recreate it
      complete: () => {

        this.apiService.deleteStream(camera).subscribe({

          error: (e) => console.log(e), 
          complete: () => this.apiService.addStream(camera).subscribe({
            error: (err) => console.log(err),
            complete: () => window.location.href = 'http://' + document.location.hostname + ':' + portsJson.rtsptoweb + '/pages/player/webrtc/' + camera.id + '/0'
          }) 

        });

      } 

    });

  }

  public onEditClicked(event: any, camera: Camera){

    event.preventDefault();

    let dialogRef = this.matDialog.open(CameraDialogComponent, {
      width: '400px',
      data: { camera : camera }
    });

  }

  public onDeleteClicked(event: any, camera: Camera){
    event.preventDefault();

    this.apiService.deleteStream(camera).subscribe({
      error: (err) => null,
      complete: () => null
    });

    this.apiService.deleteCamera(camera).subscribe({
      error: (err) => console.log(err),
      complete: () => null
    });
    
  }

  public onAddClicked($event){

    //default empty camera
    let camera: Camera = {
      id: undefined,
      name: "",
      rtspUrl: "",
      alarmStatus: "DEACTIVATED",
      zone: undefined
    };

    let dialogRef = this.matDialog.open(CameraDialogComponent, {
      width: '400px',
      data: { camera : camera }
    });
    
  }

  public onCameraAlarmClicked(event: any, camera: Camera){
    if(camera.alarmStatus == "DEACTIVATED"){
      //activate alarm
      this.apiService.activateAlarm(camera).subscribe();
    }else{
      //deactivate alarm
      this.apiService.deactivateAlarm(camera).subscribe();
    }
  }

  public onRecordingsClicked(event: any){
    event.preventDefault();

    let dialogRef = this.matDialog.open(RecordingsComponent, {
      width: '800px',
      minHeight: '600px',
      data: this.source
    });

    dialogRef.afterClosed().subscribe({
      error: (err) => console.log(err),
      complete: () => {this.update(); this.subscribeUpdateEvent()}
    })

  }

  public onActivateGroup(event: any){

    let zone = this.selectActivate.nativeElement.value;

    if(zone == "all"){

      this.allCameras.forEach(camera => {
        
        if(camera.alarmStatus == "DEACTIVATED"){
          this.apiService.activateAlarm(camera).subscribe();
        }

      });

    }else{

      this.allCameras.forEach(camera => {
        
        if(camera.alarmStatus == "DEACTIVATED" && camera.zone == zone){
          this.apiService.activateAlarm(camera).subscribe();
        }

      });

    }

  }

  public onDeactivateGroup(event: any){

    let zone = this.selectDeactivate.nativeElement.value;

    if(zone == "all"){

      this.allCameras.forEach(camera => {
        
        if(camera.alarmStatus != "DEACTIVATED"){
          this.apiService.deactivateAlarm(camera).subscribe();
        }

      });

    }else{

      this.allCameras.forEach(camera => {
        
        if(camera.alarmStatus != "DEACTIVATED" && camera.zone == zone){
          this.apiService.deactivateAlarm(camera).subscribe();
        }

      });

    }

  }

}
