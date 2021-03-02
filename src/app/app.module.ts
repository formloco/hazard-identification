import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfig} from './interceptor/httpconfig.interceptor';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { PinComponent } from './component/pin/pin.component';
import { TaskComponent } from './component/task/task.component';
import { AdminComponent } from './component/admin/admin.component';
import { CompanyComponent } from './component/company/company.component';
import { WorkersComponent } from './component/workers/workers.component';
import { DesktopComponent } from './component/desktop/desktop.component';
import { AssessmentComponent } from './component/assessment/assessment.component';
import { JobDetailsComponent } from './component/job-details/job-details.component';

import { MaterialModule } from "./material.module";

import { AuthService } from './service/auth.service';
import { AuthGuard } from './service/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PinComponent,
    TaskComponent,
    AdminComponent,
    CompanyComponent,
    WorkersComponent,
    DesktopComponent,
    AssessmentComponent,
    JobDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  exports:[
    PinComponent,
    TaskComponent,
    AdminComponent,
    CompanyComponent,
    WorkersComponent,
    DesktopComponent,
    AssessmentComponent,
    JobDetailsComponent
  ],
  providers: [AuthService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfig,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
