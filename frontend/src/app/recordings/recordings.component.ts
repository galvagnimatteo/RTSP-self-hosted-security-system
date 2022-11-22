import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-recordings',
  templateUrl: './recordings.component.html',
  styleUrls: ['./recordings.component.scss']
})
export class RecordingsComponent implements OnInit {

  public allVideos: String[];
  public selectedVideoSource: String;

  public error: boolean;

  private portsJson: any;

  constructor(private http: HttpClient, private apiService: ApiService, @Inject(MAT_DIALOG_DATA) public data: any) { 

    this.http.get("assets/ports.json").subscribe(data => {
      this.portsJson = data;
    });

  }

  ngOnInit(): void {

    this.apiService.getAllRecordings().subscribe((data: String[]) => this.allVideos = data);

    this.data.addEventListener('message', message => {
      this.apiService.getAllRecordings().subscribe((data: String[]) => this.allVideos = data);
    });

    this.error = false;

  }

  onVideoError(){
    console.log("ERROR")
    this.error = true;
    this.selectedVideoSource = null;
  }

  onPlayVideoClicked(event: any, videoName: String){
    this.error = false;
    this.selectedVideoSource = "http://localhost:" + this.portsJson.backendMain + "/getRecording?name=" + videoName;
  }

  onDeleteClicked(event: any, videoName: String){
    event.preventDefault();

    if(this.selectedVideoSource == "http://localhost:" + this.portsJson.backendMain + "/getRecording?name=" + videoName) this.selectedVideoSource = null;

    this.apiService.deleteRecording(videoName).subscribe({
      error: (err) => console.log(err),
      complete: () => null
    });
  }

}
