import { Component, OnInit } from '@angular/core';

import * as uuid from 'uuid';
import { Router, ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { FormBuilder, FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { AppService } from "../../service/app.service";
import { AuthService } from "../../service/auth.service";

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  token;
  templates;
  templateControls;

  templateForm: FormGroup;

  fileArray = [];
  isError = false;
  isNotFile = true;
  isImportOpen = false;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private authService: AuthService) { 
      this.templateForm = this.formBuilder.group({
        templateArray: this.formBuilder.array([])
      });
    }

  
  ngOnInit(): void {
    let obj = {
      form_id: '',
      tenant_id: ''
    }
    this.appService.getLists(obj).subscribe(templates => {
      this.templates = templates;
      this.templates.forEach(element => {
        const _templates = this.templateForm.controls.templateArray as FormArray;
        _templates.push(this.formBuilder.group({
          name: [element.form.name],
          description: [element.description],
          is_published: [element.is_published]
        }));
      });
    });
  }

  closeOverlay() {
    this.isImportOpen = false;
  }

  goHome() {
    this.authService.loginStatus = false;
    this.router.navigate(['']);
  }

}