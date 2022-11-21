import { Injectable } from '@angular/core';
import { Camera } from './camera';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //--------------------RTSP STREAMS-------------------------

  public getStream(camera: Camera): Observable<any>{

    const headers = new HttpHeaders({'Authorization':'Basic '+Buffer.from("demo:demo").toString('base64')});
    return this.http.get('http://demo:demo@127.0.0.1:8083/stream/' + camera.id.toString() + '/info', {headers});

  }

  public addStream(camera: Camera): Observable<any>{

    const headers = new HttpHeaders({'Authorization':'Basic ' + Buffer.from("demo:demo").toString('base64')});
    
    return this.http.post('http://demo:demo@127.0.0.1:8083/stream/' + camera.id.toString() + '/add', {
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
    return this.http.get('http://demo:demo@127.0.0.1:8083/stream/' + camera.id.toString() + '/delete', {headers});
    
  }

  //---------------------CAMERAS-----------------------

  public getAllCameras(): Observable<Camera[]>{
    return this.http.get<Camera[]>("http://localhost:8080/getAllCameras");
  }

  public deleteCamera(camera: Camera): Observable<any>{
    return this.http.delete<any>("http://localhost:8080/deleteCamera?id=" + camera.id);
  }

  public createCamera(camera: Camera): Observable<Camera>{
    return this.http.post<Camera>('http://localhost:8080/createCamera', camera);
  }

  public updateCamera(camera: Camera): Observable<any>{
    //remember: this updates only the name or/and the zone, not the rtsp url; delete camera and create a new one to restart motion detection service
    return this.http.put<Camera>('http://localhost:8080/updateCamera', camera);
  }

  public activateAlarm(camera: Camera): Observable<any>{
    return this.http.post<Camera>('http://localhost:8080/activateAlarm', camera);
  }

  public deactivateAlarm(camera: Camera): Observable<any>{
    return this.http.post<Camera>('http://localhost:8080/deactivateAlarm', camera);
  }

  public getSpaceInfo(): Observable<any>{
    return this.http.get<any>('http://localhost:8080/getSpaceInfo');
  }

  public getRecordingsNumber(): Observable<any>{
    return this.http.get<any>('http://localhost:8080/getRecordingsNumber');
  }

  public getRecording(name: String): Observable<any>{
    return this.http.get<any>('http://localhost:8080/getRecording?name=' + name);
  }

  public getAllRecordings(): Observable<any>{
    return this.http.get<String[]>('http://localhost:8080/getAllRecordings');
  }

  public deleteRecording(name: String): Observable<any>{
    return this.http.delete<any>('http://localhost:8080/deleteRecording?name=' + name);
  }

}
