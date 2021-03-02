import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public isHeader;
  public isTask;
  public isAssessment;
  public isJobDetail;
  public isWorker;

  apiUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient
  ) { }

  setPage(page) {
    this.isHeader = false;
    this.isTask = false;
    this.isAssessment = false;
    this.isJobDetail = false;
    this.isWorker = false;

    if (page === 'header') this.isHeader = true;
    if (page === 'task') this.isTask = true;
    if (page === 'assesssment') this.isAssessment = true;
    if (page === 'jobDetail') this.isJobDetail = true;
    if (page === 'worker') this.isWorker = true;

    console.log(this.isHeader,this.isTask)
  }

  create(obj) {
    return this._http.post(this.apiUrl, obj);
  }

  getLists(obj) {
    return this._http.post(this.apiUrl, obj);
  }

}
