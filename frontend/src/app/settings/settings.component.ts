import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  fileToUpload: File | null = null;
  errorAlarmFile: String = '';
  errorEmailConfig: String = '';
  successAlarmFile: String = '';
  successEmailConfig: String = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void { }

  onFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSaveAlarmFile(event: any){

    this.successAlarmFile = "";

    if(this.fileToUpload == null){
      this.errorAlarmFile = "No file selected";
    }else{
      if(this.fileToUpload.type == "audio/mpeg"){

        const formData: FormData = new FormData();

        formData.append('file', this.fileToUpload);

        this.apiService.uploadAlarmFile(formData).subscribe({
  
          error: (err) => {console.log(err); this.errorAlarmFile = "Server error uploading file"; this.successAlarmFile = ""},
          complete: () => {this.errorAlarmFile = ""; this.successAlarmFile = "Upload completed succesfully!"}
  
        });
      }else{
        this.errorAlarmFile = "Wrong file type"
      }
    }
  }

}
