import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ListCandidateComponent } from './list-candidate/list-candidate.component';
import { UpdateCandidateComponent } from './update-candidate/update-candidate.component';
import { ViewCandidateComponent } from './view-candidate/view-candidate.component';
import { ToastrModule,ToastrService } from 'ngx-toastr';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    ListCandidateComponent,
    AddCandidateComponent,
    UpdateCandidateComponent,
    ViewCandidateComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbTooltipModule,HttpClientTestingModule,
    
  ],
  providers: [
    provideClientHydration(),provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  title = 'Hello, Candidate_frontend';
 }
