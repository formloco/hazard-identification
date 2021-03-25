import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpConfig} from './interceptor/httpconfig.interceptor'

import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'

// security & anonomous route
import { PinComponent } from './component/admin/pin/pin.component'
import { AdminComponent } from './component/admin/admin.component'
import { HeaderComponent } from './component/header/header.component'
import { FooterComponent } from './component/footer/footer.component'
import { LayoutComponent } from './component/layout/layout.component'
import { DesktopComponent } from './component/desktop/desktop.component'

// admin
import { DataComponent } from './component/admin/data/data.component'
import { ListRunComponent } from './component/admin/list-run/list-run.component'
import { FormListsComponent } from './component/admin/form-lists/form-lists.component'

// form
import { FormComponent } from './component/form/form.component'
import { TaskComponent } from './component/form/task/task.component'
import { CompanyComponent } from './component/form/company/company.component'
import { SignOffComponent } from './component/form/sign-off/sign-off.component'
import { JobDetailsComponent } from './component/form/job-details/job-details.component'

import { MaterialModule } from "./material.module"

import { AuthService } from './service/auth.service'
import { AuthGuard } from './service/auth-guard.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//indexDB
import { IdbPersistenceService } from './service-idb/idb-persistence.service'

@NgModule({
  declarations: [
    AppComponent,
    PinComponent,
    FormComponent,
    DataComponent,
    TaskComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    ListRunComponent,
    CompanyComponent,
    SignOffComponent,
    DesktopComponent,
    FormListsComponent,
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
    FormComponent,
    DataComponent,
    TaskComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    ListRunComponent,
    CompanyComponent,
    SignOffComponent,
    DesktopComponent,
    FormListsComponent,
    JobDetailsComponent
  ],
  providers: [AuthService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfig,
      multi: true
    },
    { provide: APP_INITIALIZER,
      useFactory: (idbPersistenceService: IdbPersistenceService) => () => idbPersistenceService.connect(),
      deps: [IdbPersistenceService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
