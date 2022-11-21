import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from 'app/api.service';
import { Camera } from 'app/camera';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';

@Component({
  selector: 'app-camera-dialog',
  templateUrl: './camera-dialog.component.html',
  styleUrls: ['./camera-dialog.component.scss']
})
export class CameraDialogComponent implements OnInit {

  public camera: Camera;
  public zones: String[];
  public error: String = "";

  control = new FormControl('');
  filteredZones: Observable<String[]>;

  constructor(public dialogRef: MatDialogRef<CameraDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private apiService: ApiService) {
    this.camera = data.camera ? data.camera : null;
    this.zones = [];
  }

  ngOnInit(): void { 

    this.apiService.getAllCameras().subscribe((data: Camera[]) => {
      data.forEach(element => {
        if(element.zone) if(!this.zones.includes(element.zone)) this.zones.push(element.zone)
      });

      this.filteredZones = this.control.valueChanges.pipe(
        startWith(this.control.value),
        map(value => this._filter(value || '')),
      );

    });

  }

  private _filter(value: string): String[] {
    const filterValue = value.toLowerCase();

    return this.zones.filter(option => option.toLowerCase().includes(filterValue));
  }

  public onSaveClicked(event: any, camera: Camera){

    if(camera.name.length == 0 || camera.rtspUrl.length == 0){ 
      this.error = "Camera name and RTSP URL cannot be empty."; 
    }else{
      this.error = null;

      if(camera.id == undefined){

        //the user is creating a new camera
        this.apiService.createCamera(camera).subscribe({
  
          error: (err) => {console.log(err); this.error = "Error creating camera on server"},
          complete: () => this.dialogRef.close()
  
        })
  
      }else{
  
        //the user is updating an existing camera
        this.apiService.updateCamera(camera).subscribe({
  
          error: (err) => {console.log(err); this.error = "Error updating camera on server"},
          complete: () => this.dialogRef.close()
  
        })
  
      }
    }

  }

}