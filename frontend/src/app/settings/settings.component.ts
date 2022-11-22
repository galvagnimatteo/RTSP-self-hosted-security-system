import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { EmailConfig } from 'app/emailconfig';

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

  fromMail: String;
  toMails: String;
  apiKey: String;
  apiSecret: String;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void { }

  onFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSaveAlarmFile(event: any){

    this.successAlarmFile = '';
    this.errorAlarmFile = '';

    if(this.fileToUpload == null){
      this.errorAlarmFile = "No file selected";
    }else{
      if(this.fileToUpload.type == "audio/mpeg"){

        const formData: FormData = new FormData();

        formData.append('file', this.fileToUpload);

        this.apiService.uploadAlarmFile(formData).subscribe({
  
          error: (err) => {console.log(err); this.errorAlarmFile = "Server error uploading file"; this.successAlarmFile = ""},
          complete: () => {this.errorAlarmFile = ""; this.successAlarmFile = "Upload completed successfully!"}
  
        });
      }else{
        this.errorAlarmFile = "Wrong file type"
      }
    }
  }

  onSaveEmailConfig(event: any){

    this.successEmailConfig = '';
    this.errorEmailConfig = '';

    if(this.apiKey.length == 0 || this.apiSecret.length == 0 || this.fromMail.length == 0 || this.toMails.length == 0){
      this.errorEmailConfig = "Please fill all fields";
    }else{

      let toArray =  this.toMails.split(",");

      let emailConfig: EmailConfig = {
        mailFrom: this.fromMail,
        mailTo: toArray,
        apiKey: this.apiKey,
        apiSecret: this.apiSecret,
      };

      this.apiService.setEmailConfig(emailConfig).subscribe({
  
        error: (err) => {console.log(err); this.errorEmailConfig = "Server error saving configuration"; this.successEmailConfig = ""},
        complete: () => {this.errorAlarmFile = ""; this.successEmailConfig = "Configuration updated successfully!"}

      });

    }
  }

}
