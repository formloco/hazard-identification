import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from "../../service/app.service";
import { AuthService } from "../../service/auth.service";

import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  token;

  companyForm: FormGroup;
  hazardsForm: FormGroup;
  jobDetailForm: FormGroup;
  signOffForm: FormGroup;

  constructor(
    private router: Router,
    public appService: AppService,
    private formBuilder: FormBuilder,
    private authService: AuthService) {
    this.companyForm = this.formBuilder.group({
      date: [''],
      client: [''],
      reportedBy: [''],
      location: [''],
      hazardIdentification: [''],
      nearMiss: ['']
    });
    this.hazardsForm = this.formBuilder.group({
      values: this.formBuilder.array([
        this.formBuilder.group({
          tasks: [''],
          hazards: [''],
          severity: [''],
          probability: ['']
        })
      ])
    });
    this.jobDetailForm = this.formBuilder.group({
      jobDescription: [''],
      correctiveActions: ['']
    });
    this.signOffForm = this.formBuilder.group({
      correctiveActionCompleted: [''],
      completedByName: [''],
      completedBySignature: [''],
      completedBydate: [''],
      supervisorReceivedByName: [''],
      supervisorSignature: [''],
      supervisorSignatureDate: [''],
    });
  }


  ngOnInit(): void {
    // this.authService.token().subscribe(token => {
    //   this.token = token;
    //   localStorage.setItem('formToken', this.token.token);
    // });
  }

  getHistory() {

  }

}
