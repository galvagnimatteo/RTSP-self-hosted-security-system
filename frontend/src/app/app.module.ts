import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SettingsComponent } from './settings/settings.component';
import { BrowserModule } from '@angular/platform-browser';
import { CameraDialogComponent } from './camera-dialog/camera-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { RecordingsComponent } from './recordings/recordings.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatAutocompleteModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    SettingsComponent,
    CameraDialogComponent,
    RecordingsComponent,

  ],
  entryComponents: [
    CameraDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
