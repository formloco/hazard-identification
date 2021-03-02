import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "../../service/auth.service";
import { ErrorService } from "../../service/error.service";

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {

  auth;
  token;
  pinForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private errorService: ErrorService) { 
    this.pinForm = this.fb.group({
      pin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  loginPIN() {
    let obj = {
      tenant_id: '',
      pin: this.pinForm.controls['pin'].value
    }
    this.authService.loginPIN(obj).subscribe(auth => {
      this.auth = auth;
      if (this.auth.message !== 'Sign in sucessful.')
        this.errorService.popSnackbar(this.auth.message);
      else
        this.router.navigate(['admin']);
    });
  }

  goHome() {
    this.authService.loginStatus = false;
    this.router.navigate(['']);
  }

}
