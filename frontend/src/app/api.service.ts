import { Injectable } from '@angular/core';
import { Camera } from './camera';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EmailConfig } from './emailconfig';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private portsJson: any;

  constructor(private http: HttpClient) {

    this.http.get("assets/ports.json").subscribe(data => {
      this.portsJson = data;
    });

  }

  //--------------------RTSP STREAMS-------------------------

  public getStream(camera: Camera): Observable<any>{

    const headers = new HttpHeaders({'Authorization':'Basic '+Buffer.from("demo:demo").toString('base64')});
    return this.http.get('http://demo:demo@127.0.0.1:' + this.portsJson.rtsptoweb + '/stream/' + camera.id.toString() + '/info', {headers});

  }

  public addStream(camera: Camera): Observable<any>{

    const headers = new HttpHeaders({'Authorization':'Basic ' + Buffer.from("demo:demo").toString('base64')});
    
    return this.http.post('http://demo:demo@127.0.0.1:' + this.portsJson.rtsptoweb + '/stream/' + camera.id.toString() + '/add', {
      "name": camera.name,
      "channels": {
          "0": {
              "name": "ch1",
              "url": camera.rtspUrl,
              "on_demand": true,
              "debug": false,
              "status": 0
          }
      }
    }, {headers});
    
  }

  public deleteStream(camera: Camera): Observable<any>{

    const headers = new HttpHeaders({'Authorization':'Basic '+Buffer.from("demo:demo").toString('base64')});
    return this.http.get('http://demo:demo@127.0.0.1:' + this.portsJson.rtsptoweb + '/stream/' + camera.id.toString() + '/delete', {headers});
    
  }

  //---------------------CAMERAS-----------------------

  public getAllCameras(): Observable<Camera[]>{
    return this.http.get<Camera[]>("http://localhost:" + this.portsJson.backendMain + "/getAllCameras");
  }

  public deleteCamera(camera: Camera): Observable<any>{
    return this.http.delete<any>("http://localhost:" + this.portsJson.backendMain + "/deleteCamera?id=" + camera.id);
  }

  public createCamera(camera: Camera): Observable<Camera>{
    return this.http.post<Camera>('http://localhost:' + this.portsJson.backendMain + '/createCamera', camera);
  }

  public updateCamera(camera: Camera): Observable<any>{
    //remember: this updates only the name or/and the zone, not the rtsp url; delete camera and create a new one to restart motion detection service
    return this.http.put<Camera>('http://localhost:' + this.portsJson.backendMain + '/updateCamera', camera);
  }

  public activateAlarm(camera: Camera): Observable<any>{
    return this.http.post<Camera>('http://localhost:' + this.portsJson.backendMain + '/activateAlarm', camera);
  }

  public deactivateAlarm(camera: Camera): Observable<any>{
    return this.http.post<Camera>('http://localhost:' + this.portsJson.backendMain + '/deactivateAlarm', camera);
  }

  public getSpaceInfo(): Observable<any>{
    return this.http.get<any>('http://localhost:' + this.portsJson.backendMain + '/getSpaceInfo');
  }

  public getRecordingsNumber(): Observable<any>{
    return this.http.get<any>('http://localhost:' + this.portsJson.backendMain + '/getRecordingsNumber');
  }

  public getRecording(name: String): Observable<any>{
    return this.http.get<any>('http://localhost:' + this.portsJson.backendMain + '/getRecording?name=' + name);
  }

  public getAllRecordings(): Observable<any>{
    return this.http.get<String[]>('http://localhost:' + this.portsJson.backendMain + '/getAllRecordings');
  }

  public deleteRecording(name: String): Observable<any>{
    return this.http.delete<any>('http://localhost:' + this.portsJson.backendMain + '/deleteRecording?name=' + name);
  }

  public uploadAlarmFile(file: FormData): Observable<any>{
    return this.http.post<any>('http://localhost:' + this.portsJson.backendMain + '/uploadAlarmFile', file);
  }

  public setEmailConfig(emailConfig: EmailConfig): Observable<any>{
    return this.http.post<any>('http://localhost:' + this.portsJson.backendMain + '/setEmailConfig', emailConfig);
  }

}
