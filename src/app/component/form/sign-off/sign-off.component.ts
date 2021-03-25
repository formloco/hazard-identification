import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sign-off',
  templateUrl: './sign-off.component.html',
  styleUrls: ['./sign-off.component.scss']
})
export class SignOffComponent implements OnInit {

  @Input() signOffForm;

  constructor() { }

  ngOnInit(): void {
  }

}
