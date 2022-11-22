"use strict";(self.webpackChunkmaterial_dashboard_angular=self.webpackChunkmaterial_dashboard_angular||[]).push([[446],{8446:function(De,O,p){p.r(O),p.d(O,{AdminLayoutModule:function(){return Ee}});var g=p(3144),b=p(5671),H=p(9800),h=p(9808),m=p(2382),y=p(8966),V=p(4004),z=p(8675),e=p(8003),k=p(520),x=function(){var a=function(){function r(i){(0,b.Z)(this,r),this.http=i}return(0,g.Z)(r,[{key:"getStream",value:function(n){var t=new k.WM({Authorization:"Basic "+Buffer.from("demo:demo").toString("base64")});return this.http.get("http://demo:demo@127.0.0.1:8083/stream/"+n.id.toString()+"/info",{headers:t})}},{key:"addStream",value:function(n){var t=new k.WM({Authorization:"Basic "+Buffer.from("demo:demo").toString("base64")});return this.http.post("http://demo:demo@127.0.0.1:8083/stream/"+n.id.toString()+"/add",{name:n.name,channels:{0:{name:"ch1",url:n.rtspUrl,on_demand:!0,debug:!1,status:0}}},{headers:t})}},{key:"deleteStream",value:function(n){var t=new k.WM({Authorization:"Basic "+Buffer.from("demo:demo").toString("base64")});return this.http.get("http://demo:demo@127.0.0.1:8083/stream/"+n.id.toString()+"/delete",{headers:t})}},{key:"getAllCameras",value:function(){return this.http.get("http://localhost:8080/getAllCameras")}},{key:"deleteCamera",value:function(n){return this.http.delete("http://localhost:8080/deleteCamera?id="+n.id)}},{key:"createCamera",value:function(n){return this.http.post("http://localhost:8080/createCamera",n)}},{key:"updateCamera",value:function(n){return this.http.put("http://localhost:8080/updateCamera",n)}},{key:"activateAlarm",value:function(n){return this.http.post("http://localhost:8080/activateAlarm",n)}},{key:"deactivateAlarm",value:function(n){return this.http.post("http://localhost:8080/deactivateAlarm",n)}},{key:"getSpaceInfo",value:function(){return this.http.get("http://localhost:8080/getSpaceInfo")}},{key:"getRecordingsNumber",value:function(){return this.http.get("http://localhost:8080/getRecordingsNumber")}},{key:"getRecording",value:function(n){return this.http.get("http://localhost:8080/getRecording?name="+n)}},{key:"getAllRecordings",value:function(){return this.http.get("http://localhost:8080/getAllRecordings")}},{key:"deleteRecording",value:function(n){return this.http.delete("http://localhost:8080/deleteRecording?name="+n)}},{key:"uploadAlarmFile",value:function(n){return this.http.post("http://localhost:8080/uploadAlarmFile",n)}},{key:"setEmailConfig",value:function(n){return this.http.post("http://localhost:8080/setEmailConfig",n)}}]),r}();return a.\u0275fac=function(i){return new(i||a)(e.LFG(k.eN))},a.\u0275prov=e.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a}(),I=p(3092),_=p(508);function U(a,r){if(1&a&&(e.TgZ(0,"mat-option",9),e._uU(1),e.qZA()),2&a){var i=r.$implicit;e.Q6J("value",i),e.xp6(1),e.Oqu(i)}}function j(a,r){if(1&a&&(e.TgZ(0,"p",10),e._uU(1),e.qZA()),2&a){var i=e.oxw();e.xp6(1),e.Oqu(i.error)}}var D=function(){var a=function(){function r(i,n,t){(0,b.Z)(this,r),this.dialogRef=i,this.data=n,this.apiService=t,this.error="",this.control=new m.NI(""),this.camera=n.camera?n.camera:null,this.zones=[]}return(0,g.Z)(r,[{key:"ngOnInit",value:function(){var n=this;this.apiService.getAllCameras().subscribe(function(t){t.forEach(function(o){o.zone&&(n.zones.includes(o.zone)||n.zones.push(o.zone))}),n.filteredZones=n.control.valueChanges.pipe((0,z.O)(n.control.value),(0,V.U)(function(o){return n._filter(o||"")}))})}},{key:"_filter",value:function(n){var t=n.toLowerCase();return this.zones.filter(function(o){return o.toLowerCase().includes(t)})}},{key:"onSaveClicked",value:function(n,t){var o=this;0==t.name.length||0==t.rtspUrl.length?this.error="Camera name and RTSP URL cannot be empty.":(this.error=null,null==t.id?this.apiService.createCamera(t).subscribe({error:function(l){console.log(l),o.error="Error creating camera on server"},complete:function(){return o.dialogRef.close()}}):this.apiService.updateCamera(t).subscribe({error:function(l){console.log(l),o.error="Error updating camera on server"},complete:function(){return o.dialogRef.close()}}))}}]),r}();return a.\u0275fac=function(i){return new(i||a)(e.Y36(y.so),e.Y36(y.WI),e.Y36(x))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-camera-dialog"]],decls:22,vars:11,consts:[["mat-dialog-title",""],["mat-dialog-content",""],["placeholder","Camera name",3,"ngModel","ngModelChange"],["auto","matAutocomplete"],[3,"value",4,"ngFor","ngForOf"],["type","text","placeholder","Camera zone","type","text",3,"matAutocomplete","ngModel","formControl","ngModelChange"],["placeholder","rtsp://your-url",3,"disabled","ngModel","ngModelChange"],["style","color: red;",4,"ngIf"],["mat-raised-button","",1,"btn","btn-default",3,"click"],[3,"value"],[2,"color","red"]],template:function(i,n){if(1&i&&(e.TgZ(0,"h1",0),e._uU(1),e.qZA(),e.TgZ(2,"div",1)(3,"label"),e._uU(4,"Name:"),e.qZA(),e.TgZ(5,"input",2),e.NdJ("ngModelChange",function(s){return n.camera.name=s}),e.qZA(),e._UZ(6,"br"),e.TgZ(7,"label"),e._uU(8,"Zone:"),e.qZA(),e.TgZ(9,"mat-autocomplete",null,3),e.YNc(11,U,2,2,"mat-option",4),e.ALo(12,"async"),e.qZA(),e.TgZ(13,"input",5),e.NdJ("ngModelChange",function(s){return n.camera.zone=s}),e.qZA(),e._UZ(14,"br"),e.TgZ(15,"label"),e._uU(16,"RTSP URL:"),e.qZA(),e.TgZ(17,"input",6),e.NdJ("ngModelChange",function(s){return n.camera.rtspUrl=s}),e.qZA()(),e.TgZ(18,"div"),e.YNc(19,j,2,1,"p",7),e.TgZ(20,"button",8),e.NdJ("click",function(s){return n.onSaveClicked(s,n.camera)}),e._uU(21,"Save"),e.qZA()()),2&i){var t=e.MAs(10);e.xp6(1),e.hij("",n.camera.id?"Edit":"Add"," camera"),e.xp6(4),e.Q6J("ngModel",n.camera.name),e.xp6(6),e.Q6J("ngForOf",e.lcZ(12,9,n.filteredZones)),e.xp6(2),e.Q6J("matAutocomplete",t)("ngModel",n.camera.zone)("formControl",n.control),e.xp6(4),e.Q6J("disabled",null!=n.camera.id)("ngModel",n.camera.rtspUrl),e.xp6(2),e.Q6J("ngIf",""!=n.error)}},directives:[y.uh,y.xY,m.Fj,m.JJ,m.On,I.XC,h.sg,_.ey,I.ZL,m.oH,h.O5],pipes:[h.Ov],styles:["input[_ngcontent-%COMP%]{margin-bottom:1rem;min-width:100%}button[_ngcontent-%COMP%]{min-width:100%}"]}),a}();function q(a,r){if(1&a){var i=e.EpF();e.TgZ(0,"video",7),e.NdJ("error",function(){return e.CHM(i),e.oxw().onVideoError()}),e.qZA()}if(2&a){var n=e.oxw();e.Q6J("src",n.selectedVideoSource,e.LSH)}}function G(a,r){if(1&a){var i=e.EpF();e.TgZ(0,"div",8)(1,"div",9)(2,"div",10)(3,"p",11),e._uU(4),e.qZA()(),e.TgZ(5,"div",12)(6,"i",13),e.NdJ("click",function(o){var l=e.CHM(i).$implicit;return e.oxw().onPlayVideoClicked(o,l)}),e._uU(7,"smart_display"),e.qZA()(),e.TgZ(8,"div",14)(9,"a",15),e.NdJ("click",function(o){var l=e.CHM(i).$implicit;return e.oxw().onDeleteClicked(o,l)}),e._uU(10,"Delete"),e.qZA()()()()}if(2&a){var n=r.$implicit;e.xp6(4),e.Oqu(n)}}function Y(a,r){1&a&&(e.TgZ(0,"p",16),e._uU(1,"Player error: video is too short to be played, consider deleting it."),e.qZA())}var X=function(){var a=function(){function r(i,n){(0,b.Z)(this,r),this.apiService=i,this.data=n}return(0,g.Z)(r,[{key:"ngOnInit",value:function(){var n=this;this.apiService.getAllRecordings().subscribe(function(t){return n.allVideos=t}),this.data.addEventListener("message",function(t){n.apiService.getAllRecordings().subscribe(function(o){return n.allVideos=o})}),this.error=!1}},{key:"onVideoError",value:function(){console.log("ERROR"),this.error=!0,this.selectedVideoSource=null}},{key:"onPlayVideoClicked",value:function(n,t){this.error=!1,this.selectedVideoSource="http://localhost:8080/getRecording?name="+t}},{key:"onDeleteClicked",value:function(n,t){n.preventDefault(),this.selectedVideoSource=="http://localhost:8080/getRecording?name="+t&&(this.selectedVideoSource=null),this.apiService.deleteRecording(t).subscribe({error:function(s){return console.log(s)},complete:function(){return null}})}}]),r}();return a.\u0275fac=function(i){return new(i||a)(e.Y36(x),e.Y36(y.WI))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-recordings"]],decls:9,vars:3,consts:[["mat-dialog-title",""],[1,"main-content"],[1,"container-fluid"],["id","video-player","autoplay","true","controls","",3,"src","error",4,"ngIf"],[1,"row"],["class","col-md-4",4,"ngFor","ngForOf"],["style","color: red;",4,"ngIf"],["id","video-player","autoplay","true","controls","",3,"src","error"],[1,"col-md-4"],[1,"card","card-chart"],[1,"card-header","card-header-info"],[1,"file-name"],[1,"card-body",2,"text-align","center!important"],[1,"material-icons","play","clickable",3,"click"],[1,"card-footer"],["href","",3,"click"],[2,"color","red"]],template:function(i,n){1&i&&(e.TgZ(0,"h1",0),e._uU(1,"Recordings"),e.qZA(),e.TgZ(2,"mat-dialog-content")(3,"div",1)(4,"div",2),e.YNc(5,q,1,1,"video",3),e.TgZ(6,"div",4),e.YNc(7,G,11,1,"div",5),e.qZA()(),e.YNc(8,Y,2,0,"p",6),e.qZA()()),2&i&&(e.xp6(5),e.Q6J("ngIf",null!=n.selectedVideoSource),e.xp6(2),e.Q6J("ngForOf",n.allVideos),e.xp6(1),e.Q6J("ngIf",n.error))},directives:[y.uh,y.xY,h.O5,h.sg],styles:[".file-name[_ngcontent-%COMP%]{text-align:center;font-size:medium;font-weight:500;margin-bottom:0rem}.hide[_ngcontent-%COMP%]{display:none}.clickable[_ngcontent-%COMP%]:hover{cursor:pointer}.play[_ngcontent-%COMP%]{font-size:4rem;font-weight:400;margin-top:.5rem}video[_ngcontent-%COMP%]{min-width:100%;max-width:100%;margin-bottom:1.5rem}"]}),a}(),Q=["selectactivate"],J=["selectdeactivate"];function W(a,r){if(1&a&&(e.TgZ(0,"option",28),e._uU(1),e.qZA()),2&a){var i=r.$implicit;e.s9C("value",i),e.xp6(1),e.Oqu(i)}}function K(a,r){if(1&a&&(e.TgZ(0,"option",28),e._uU(1),e.qZA()),2&a){var i=r.$implicit;e.s9C("value",i),e.xp6(1),e.Oqu(i)}}function $(a,r){if(1&a){var i=e.EpF();e.TgZ(0,"a",29),e.NdJ("click",function(t){return e.CHM(i),e.oxw().onRecordingsClicked(t)}),e._uU(1,"Go to recordings"),e.qZA()}}function ee(a,r){1&a&&(e.TgZ(0,"p"),e._uU(1,"Stop the alarm to see the recordings!"),e.qZA())}function te(a,r){1&a&&(e.TgZ(0,"p",36),e._uU(1,"(Click to activate)"),e.qZA())}function ie(a,r){1&a&&(e.TgZ(0,"p",36),e._uU(1,"(Click to deactivate)"),e.qZA())}function ne(a,r){1&a&&(e.TgZ(0,"p",36),e._uU(1,"(Click to deactivate)"),e.qZA())}var oe=function(r,i,n){return{"card-header-success":r,"card-header-danger":i,"card-header-warning":n}},ae=function(r){return{hide:r}};function re(a,r){if(1&a){var i=e.EpF();e.TgZ(0,"div",23)(1,"div",30)(2,"div",31),e.NdJ("click",function(o){var l=e.CHM(i).$implicit;return e.oxw().onCameraAlarmClicked(o,l)}),e.TgZ(3,"p",6),e._uU(4),e.qZA(),e.YNc(5,te,2,0,"p",32),e.YNc(6,ie,2,0,"p",32),e.YNc(7,ne,2,0,"p",32),e.qZA(),e.TgZ(8,"div",7)(9,"h4",17),e._uU(10),e.qZA(),e.TgZ(11,"p",16),e._uU(12),e.qZA(),e.TgZ(13,"a",29),e.NdJ("click",function(o){var l=e.CHM(i).$implicit;return e.oxw().redirectToLiveStream(o,l)}),e._uU(14,"See live stream"),e.qZA()(),e.TgZ(15,"div",33)(16,"a",34),e.NdJ("click",function(o){var l=e.CHM(i).$implicit;return e.oxw().onEditClicked(o,l)}),e._uU(17,"Edit"),e.qZA(),e.TgZ(18,"a",35),e.NdJ("click",function(o){var l=e.CHM(i).$implicit;return e.oxw().onDeleteClicked(o,l)}),e._uU(19,"Delete"),e.qZA()()()()}if(2&a){var n=r.$implicit;e.xp6(1),e.Q6J("ngSwitch",n.alarmStatus),e.xp6(1),e.Q6J("ngClass",e.kEZ(9,oe,"DEACTIVATED"==n.alarmStatus,"TRIGGERED"==n.alarmStatus,"ACTIVATED"==n.alarmStatus)),e.xp6(2),e.hij("Alarm ",n.alarmStatus,""),e.xp6(1),e.Q6J("ngSwitchCase","DEACTIVATED"),e.xp6(1),e.Q6J("ngSwitchCase","TRIGGERED"),e.xp6(1),e.Q6J("ngSwitchCase","ACTIVATED"),e.xp6(3),e.Oqu(n.name),e.xp6(2),e.hij("Zone: ",n.zone?n.zone:"no zone set",""),e.xp6(3),e.Q6J("ngClass",e.VKq(13,ae,"DEACTIVATED"!=n.alarmStatus))}}function le(a,r){if(1&a&&(e.TgZ(0,"p",16),e._uU(1),e.qZA()),2&a){var i=e.oxw();e.xp6(1),e.Oqu(i.errorAlarmFile)}}function ce(a,r){if(1&a&&(e.TgZ(0,"p",17),e._uU(1),e.qZA()),2&a){var i=e.oxw();e.xp6(1),e.Oqu(i.successAlarmFile)}}function ue(a,r){if(1&a&&(e.TgZ(0,"p",16),e._uU(1),e.qZA()),2&a){var i=e.oxw();e.xp6(1),e.Oqu(i.errorEmailConfig)}}function de(a,r){if(1&a&&(e.TgZ(0,"p",17),e._uU(1),e.qZA()),2&a){var i=e.oxw();e.xp6(1),e.Oqu(i.successEmailConfig)}}var he=[{path:"dashboard",component:function(){var a=function(){function r(i,n){(0,b.Z)(this,r),this.apiService=i,this.matDialog=n,this.existTriggeredCamera=!1,this.source=new EventSource("http://localhost:8080/notification")}return(0,g.Z)(r,[{key:"ngOnInit",value:function(){this.update(),this.subscribeUpdateEvent()}},{key:"subscribeUpdateEvent",value:function(){var n=this;this.source.addEventListener("message",function(t){n.update()})}},{key:"update",value:function(){var n=this;this.apiService.getAllCameras().subscribe(function(t){n.allCameras=t,n.existTriggeredCamera=!1,n.allCameras.forEach(function(o){"TRIGGERED"==o.alarmStatus&&(n.existTriggeredCamera=!0)}),n.allZones=[],n.allCameras.forEach(function(o){n.allZones.push(o.zone)})}),this.apiService.getSpaceInfo().subscribe(function(t){n.occupiedSpace=t.occupiedSpace,n.totalSpace=t.totalSpace}),this.apiService.getRecordingsNumber().subscribe(function(t){return n.recordingsNumber=t})}},{key:"redirectToLiveStream",value:function(n,t){var o=this;n.preventDefault(),this.apiService.getStream(t).subscribe({error:function(l){return o.apiService.addStream(t).subscribe({error:function(d){return console.log(d)},complete:function(){return window.location.href="http://localhost:8083/pages/player/webrtc/"+t.id+"/0"}})},complete:function(){o.apiService.deleteStream(t).subscribe({error:function(c){return console.log(c)},complete:function(){return o.apiService.addStream(t).subscribe({error:function(d){return console.log(d)},complete:function(){return window.location.href="http://localhost:8083/pages/player/webrtc/"+t.id+"/0"}})}})}})}},{key:"onEditClicked",value:function(n,t){n.preventDefault(),this.matDialog.open(D,{width:"400px",data:{camera:t}})}},{key:"onDeleteClicked",value:function(n,t){n.preventDefault(),this.apiService.deleteStream(t).subscribe({error:function(s){return null},complete:function(){return null}}),this.apiService.deleteCamera(t).subscribe({error:function(s){return console.log(s)},complete:function(){return null}})}},{key:"onAddClicked",value:function(n){this.matDialog.open(D,{width:"400px",data:{camera:{id:void 0,name:"",rtspUrl:"",alarmStatus:"DEACTIVATED",zone:void 0}}})}},{key:"onCameraAlarmClicked",value:function(n,t){"DEACTIVATED"==t.alarmStatus?this.apiService.activateAlarm(t).subscribe():this.apiService.deactivateAlarm(t).subscribe()}},{key:"onRecordingsClicked",value:function(n){var t=this;n.preventDefault(),this.matDialog.open(X,{width:"800px",minHeight:"600px",data:this.source}).afterClosed().subscribe({error:function(l){return console.log(l)},complete:function(){t.update(),t.subscribeUpdateEvent()}})}},{key:"onActivateGroup",value:function(n){var t=this,o=this.selectActivate.nativeElement.value;this.allCameras.forEach("all"==o?function(s){"DEACTIVATED"==s.alarmStatus&&t.apiService.activateAlarm(s).subscribe()}:function(s){"DEACTIVATED"==s.alarmStatus&&s.zone==o&&t.apiService.activateAlarm(s).subscribe()})}},{key:"onDeactivateGroup",value:function(n){var t=this,o=this.selectDeactivate.nativeElement.value;this.allCameras.forEach("all"==o?function(s){"DEACTIVATED"!=s.alarmStatus&&t.apiService.deactivateAlarm(s).subscribe()}:function(s){"DEACTIVATED"!=s.alarmStatus&&s.zone==o&&t.apiService.deactivateAlarm(s).subscribe()})}}]),r}();return a.\u0275fac=function(i){return new(i||a)(e.Y36(x),e.Y36(y.uw))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-dashboard"]],viewQuery:function(i,n){var t;1&i&&(e.Gf(Q,5),e.Gf(J,5)),2&i&&(e.iGM(t=e.CRH())&&(n.selectActivate=t.first),e.iGM(t=e.CRH())&&(n.selectDeactivate=t.first))},decls:63,vars:8,consts:[[1,"main-content"],[1,"container-fluid"],[1,"row"],[1,"col-lg-6","col-md-6","col-sm-6"],[1,"card"],[1,"card-header","card-header-primary","clickable",3,"click"],[1,"p-alarm-status"],[1,"card-body"],["selectactivate",""],["value","all"],[3,"value",4,"ngFor","ngForOf"],["selectdeactivate",""],[1,"card","card-stats"],[1,"card-header","card-header-default","card-header-icon"],[1,"card-icon"],[1,"material-icons"],[1,"card-category"],[1,"card-title"],[1,"card-footer"],[1,"stats"],["href","",3,"click",4,"ngIf"],[4,"ngIf"],["class","col-md-4",4,"ngFor","ngForOf"],[1,"col-md-4"],[1,"card","card-chart"],[1,"card-header","card-header-info"],[1,"card-body",2,"text-align","center!important"],[1,"material-icons","plus","clickable",3,"click"],[3,"value"],["href","",3,"click"],[1,"card","card-chart",3,"ngSwitch"],[1,"card-header","clickable",3,"ngClass","click"],["class","p-alarm-click-status",4,"ngSwitchCase"],[1,"card-footer",3,"ngClass"],["href","","href","",1,"update-link",3,"click"],["href","","href","",1,"delete-link",3,"click"],[1,"p-alarm-click-status"]],template:function(i,n){1&i&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5),e.NdJ("click",function(o){return n.onActivateGroup(o)}),e.TgZ(6,"p",6),e._uU(7,"Activate alarm for group"),e.qZA()(),e.TgZ(8,"div",7)(9,"select",null,8)(11,"option",9),e._uU(12,"All cameras"),e.qZA(),e.YNc(13,W,2,2,"option",10),e.qZA()()()(),e.TgZ(14,"div",3)(15,"div",4)(16,"div",5),e.NdJ("click",function(o){return n.onDeactivateGroup(o)}),e.TgZ(17,"p",6),e._uU(18,"Deactivate alarm for group"),e.qZA()(),e.TgZ(19,"div",7)(20,"select",null,11)(22,"option",9),e._uU(23,"All cameras"),e.qZA(),e.YNc(24,K,2,2,"option",10),e.qZA()()()()(),e.TgZ(25,"div",2)(26,"div",3)(27,"div",12)(28,"div",13)(29,"div",14)(30,"i",15),e._uU(31,"storage"),e.qZA()(),e.TgZ(32,"p",16),e._uU(33,"Used space"),e.qZA(),e.TgZ(34,"h3",17),e._uU(35),e.qZA()(),e.TgZ(36,"div",18)(37,"div",19),e._uU(38," Delete recordings to free space "),e.qZA()()()(),e.TgZ(39,"div",3)(40,"div",12)(41,"div",13)(42,"div",14)(43,"i",15),e._uU(44,"video_library"),e.qZA()(),e.TgZ(45,"p",16),e._uU(46,"Saved recordings"),e.qZA(),e.TgZ(47,"h3",17),e._uU(48),e.qZA()(),e.TgZ(49,"div",18)(50,"div",19),e.YNc(51,$,2,0,"a",20),e.YNc(52,ee,2,0,"p",21),e.qZA()()()()(),e.TgZ(53,"div",2),e.YNc(54,re,20,15,"div",22),e.TgZ(55,"div",23)(56,"div",24)(57,"div",25)(58,"p",6),e._uU(59,"Add camera"),e.qZA()(),e.TgZ(60,"div",26)(61,"i",27),e.NdJ("click",function(o){return n.onAddClicked(o)}),e._uU(62,"add"),e.qZA()()()()()()()),2&i&&(e.xp6(13),e.Q6J("ngForOf",n.allZones),e.xp6(11),e.Q6J("ngForOf",n.allZones),e.xp6(11),e.AsE("",n.occupiedSpace,"/",n.totalSpace," GB"),e.xp6(13),e.Oqu(n.recordingsNumber),e.xp6(3),e.Q6J("ngIf",!n.existTriggeredCamera),e.xp6(1),e.Q6J("ngIf",n.existTriggeredCamera),e.xp6(2),e.Q6J("ngForOf",n.allCameras))},directives:[m.YN,m.Kr,h.sg,h.O5,h.RF,h.mk,h.n9],styles:["p[_ngcontent-%COMP%]:last-child{margin-bottom:0}.p-alarm-status[_ngcontent-%COMP%]{text-align:center;font-size:large;font-weight:900;margin-bottom:.5rem}.p-alarm-click-status[_ngcontent-%COMP%]{text-align:center;font-size:medium;font-weight:600}@media screen and (max-width: 500px){.main-content[_ngcontent-%COMP%]{padding-left:0;padding-right:0}}.update-link[_ngcontent-%COMP%]{float:left}.delete-link[_ngcontent-%COMP%]{float:right}.plus[_ngcontent-%COMP%]{font-size:3rem;font-weight:400;margin-top:.5rem}.clickable[_ngcontent-%COMP%]:hover{cursor:pointer;filter:brightness(90%)}.hide[_ngcontent-%COMP%]{display:none}select[_ngcontent-%COMP%]{width:100%;text-align:center;-webkit-appearance:menulist;appearance:menulist;height:2rem;font-size:large}select[_ngcontent-%COMP%], input[_ngcontent-%COMP%]{border:1px solid #999999;border-radius:3px}"]}),a}()},{path:"settings",component:function(){var a=function(){function r(i){(0,b.Z)(this,r),this.apiService=i,this.fileToUpload=null,this.errorAlarmFile="",this.errorEmailConfig="",this.successAlarmFile="",this.successEmailConfig=""}return(0,g.Z)(r,[{key:"ngOnInit",value:function(){}},{key:"onFileInput",value:function(n){this.fileToUpload=n.item(0)}},{key:"onSaveAlarmFile",value:function(n){var t=this;if(this.successAlarmFile="",this.errorAlarmFile="",null==this.fileToUpload)this.errorAlarmFile="No file selected";else if("audio/mpeg"==this.fileToUpload.type){var o=new FormData;o.append("file",this.fileToUpload),this.apiService.uploadAlarmFile(o).subscribe({error:function(l){console.log(l),t.errorAlarmFile="Server error uploading file",t.successAlarmFile=""},complete:function(){t.errorAlarmFile="",t.successAlarmFile="Upload completed successfully!"}})}else this.errorAlarmFile="Wrong file type"}},{key:"onSaveEmailConfig",value:function(n){var t=this;if(this.successEmailConfig="",this.errorEmailConfig="",0==this.apiKey.length||0==this.apiSecret.length||0==this.fromMail.length||0==this.toMails.length)this.errorEmailConfig="Please fill all fields";else{var o=this.toMails.split(",");this.apiService.setEmailConfig({mailFrom:this.fromMail,mailTo:o,apiKey:this.apiKey,apiSecret:this.apiSecret}).subscribe({error:function(c){console.log(c),t.errorEmailConfig="Server error saving configuration",t.successEmailConfig=""},complete:function(){t.errorAlarmFile="",t.successEmailConfig="Configuration updated successfully!"}})}}}]),r}();return a.\u0275fac=function(i){return new(i||a)(e.Y36(x))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-settings"]],decls:43,vars:8,consts:[[1,"main-content"],[1,"container-fluid"],[1,"row"],[1,"col-md-5"],[1,"card","card-chart"],[1,"card-header","card-header-primary"],[1,"setting-title"],[1,"card-body"],["type","file","accept","audio/mpeg",3,"change"],["style","color: red;",4,"ngIf"],["style","color: green;",4,"ngIf"],[1,"btn","btn-default",3,"click"],["type","email","placeholder","from@email.com",3,"ngModel","ngModelChange"],["type","text","placeholder","to@email.com,other_to@email.com","type","text",3,"ngModel","ngModelChange"],["type","text","placeholder","your API key",3,"ngModel","ngModelChange"],["type","text","placeholder","your secret key",3,"ngModel","ngModelChange"],[2,"color","red"],[2,"color","green"]],template:function(i,n){1&i&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"p",6),e._uU(7,"Change alarm sound"),e.qZA()(),e.TgZ(8,"div",7)(9,"div")(10,"label"),e._uU(11,"Alarm sound file:"),e.qZA(),e.TgZ(12,"input",8),e.NdJ("change",function(o){return n.onFileInput(o.target.files)}),e.qZA(),e.YNc(13,le,2,1,"p",9),e.YNc(14,ce,2,1,"p",10),e.TgZ(15,"button",11),e.NdJ("click",function(o){return n.onSaveAlarmFile(o)}),e._uU(16,"Save"),e.qZA()()()()(),e.TgZ(17,"div",3)(18,"div",4)(19,"div",5)(20,"p",6),e._uU(21,"Change Mailjet settings"),e.qZA()(),e.TgZ(22,"div",7)(23,"div")(24,"label"),e._uU(25,"From:"),e.qZA(),e.TgZ(26,"input",12),e.NdJ("ngModelChange",function(o){return n.fromMail=o}),e.qZA(),e._UZ(27,"br"),e.TgZ(28,"label"),e._uU(29,"To:"),e.qZA(),e.TgZ(30,"input",13),e.NdJ("ngModelChange",function(o){return n.toMails=o}),e.qZA(),e._UZ(31,"br"),e.TgZ(32,"label"),e._uU(33,"API key:"),e.qZA(),e.TgZ(34,"input",14),e.NdJ("ngModelChange",function(o){return n.apiKey=o}),e.qZA(),e._UZ(35,"br"),e.TgZ(36,"label"),e._uU(37,"Secret key:"),e.qZA(),e.TgZ(38,"input",15),e.NdJ("ngModelChange",function(o){return n.apiSecret=o}),e.qZA(),e.YNc(39,ue,2,1,"p",9),e.YNc(40,de,2,1,"p",10),e.TgZ(41,"button",11),e.NdJ("click",function(o){return n.onSaveEmailConfig(o)}),e._uU(42,"Save"),e.qZA()()()()()()()()),2&i&&(e.xp6(13),e.Q6J("ngIf",""!=n.errorAlarmFile),e.xp6(1),e.Q6J("ngIf",""!=n.successAlarmFile),e.xp6(12),e.Q6J("ngModel",n.fromMail),e.xp6(4),e.Q6J("ngModel",n.toMails),e.xp6(4),e.Q6J("ngModel",n.apiKey),e.xp6(4),e.Q6J("ngModel",n.apiSecret),e.xp6(1),e.Q6J("ngIf",""!=n.errorEmailConfig),e.xp6(1),e.Q6J("ngIf",""!=n.successEmailConfig))},directives:[h.O5,m.Fj,m.JJ,m.On],styles:[".setting-title[_ngcontent-%COMP%]{text-align:center;font-size:large;font-weight:900;margin-bottom:0rem}select[_ngcontent-%COMP%], input[type=text][_ngcontent-%COMP%], input[type=email][_ngcontent-%COMP%]{border:2px solid #999999;border-radius:3px}input[_ngcontent-%COMP%]{margin-bottom:1rem;min-width:100%}button[_ngcontent-%COMP%]{min-width:100%}@media screen and (max-width: 500px){.main-content[_ngcontent-%COMP%]{padding-left:0;padding-right:0}}"]}),a}()}],_e=function(){var a=(0,g.Z)(function r(){(0,b.Z)(this,r)});return a.\u0275fac=function(i){return new(i||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[[_.si,_.BQ],_.BQ]}),a}(),M=p(7322),P=(p(925),function(){var a=(0,g.Z)(function r(){(0,b.Z)(this,r)});return a.\u0275fac=function(i){return new(i||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({}),a}()),fe=function(){var a=(0,g.Z)(function r(){(0,b.Z)(this,r)});return a.\u0275fac=function(i){return new(i||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({providers:[_.rD],imports:[[P,M.lN,_.BQ],P,M.lN]}),a}(),T=p(1314),me=p(712),L=p(8962);p(1777);var ye={provide:new e.OlP("mat-tooltip-scroll-strategy"),deps:[T.aV],useFactory:function be(a){return function(){return a.scrollStrategies.reposition({scrollThrottle:20})}}},ke=function(){var a=(0,g.Z)(function r(){(0,b.Z)(this,r)});return a.\u0275fac=function(i){return new(i||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({providers:[ye],imports:[[me.rt,h.ez,T.U8,_.BQ],_.BQ,L.ZD]}),a}(),Se={provide:new e.OlP("mat-select-scroll-strategy"),deps:[T.aV],useFactory:function Ae(a){return function(){return a.scrollStrategies.reposition()}}},we=function(){var a=(0,g.Z)(function r(){(0,b.Z)(this,r)});return a.\u0275fac=function(i){return new(i||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({providers:[Se],imports:[[h.ez,T.U8,_.Ng,_.BQ],L.ZD,M.lN,_.Ng,_.BQ]}),a}(),Ee=function(){var a=(0,g.Z)(function r(){(0,b.Z)(this,r)});return a.\u0275fac=function(i){return new(i||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[[h.ez,H.Bz.forChild(he),m.u5,m.UX,_e,_.si,M.lN,fe,we,ke]]}),a}()}}]);