import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {

  @Input() page;
  
  constructor() { }

  ngOnInit(): void {
  }

}
