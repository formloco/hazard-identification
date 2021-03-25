import { Component, ElementRef, ViewChild, Input, OnChanges } from '@angular/core'

import {COMMA, ENTER} from '@angular/cdk/keycodes'

import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete'
import { MatChipInputEvent } from '@angular/material/chips'
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"

import { AppService } from "../../../service/app.service"


interface Severity {
  value: string,
  viewValue: string
}
interface Probability {
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnChanges {

  @Input() hazardsForm
  @ViewChild('taskInput') taskInput: ElementRef<HTMLInputElement>
  @ViewChild('auto') matAutocomplete: MatAutocomplete
  @ViewChild('headerAuto') matAutocompleteHeader: MatAutocomplete
  
  panelOpenState = false

  visible = true
  selectable = true
  removable = true
  separatorKeysCodes: number[] = [ENTER, COMMA]
  
  taskCtrl = new FormControl()
  headerTasks: string[] = ['Lemon']
  allTasks: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry']

  filteredHeaderTasks: Observable<string[]>
  filteredTasks: Observable<string[]>
  tasks: string[][] = []
  
  hazardList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato']
  
  severities: Severity[] = [
    {viewValue:'Imminent Danger', value: 'imminent-danger'},
    {viewValue:'Serious', value: 'serious'},
    {viewValue:'Minor', value:'minor'},
    {viewValue:'Not applicable', value: 'NA'}
      ]
  
  probabilities: Probability[] = [
    {viewValue: 'Probable', value: 'probable' },
    {viewValue: 'Reasonably Probable', value: 'reasonably-probable'},
    {viewValue:'Remote', value: 'remote'},
    {viewValue: 'Extremely Remote', value: 'extremely-remote'}
  ]
  values: FormArray
 
  headerForm: FormGroup

  constructor(
    public appService: AppService,
    private formBuilder: FormBuilder) {

      this.filteredHeaderTasks = this.taskCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.allTasks.slice()))
 
    this.headerForm = this.formBuilder.group({
      headerHazards: [''],
      headerSeverity: [''],
      headerProbability: ['']
    })
  }

  ngOnChanges() {
    this.filteredHeaderTasks = this.headerForm.valueChanges.pipe(
      startWith(null),
      map((task: string | null) => task ? this._filter(task) : this.allTasks.slice()))


    // this.filteredTasks = this.hazardsForm.get('values').valueChanges.pipe(data => this.valueChanged(data))
    
    // this.filteredHeaderTasks = this.headerForm.get('values').valueChanges.pipe(data => this.valueChanged(data))

    
    this.values = this.hazardsForm.get('values')
    if (this.hazardsForm.value.length > 1)
    console.log(this.values, this.taskCtrl.get('value'))
  }


  addHazards(){
    this.hazardsForm.get('values').push(this.formBuilder.group({
      tasks:[''],
      hazards: [''],
      severity: [''],
      probability: ['']
    }))
    console.log(this.hazardsForm)
  }


  valueChanged(data) {
    return this.allTasks
  }

  addTask() {
    let headerValue = this.headerForm.get('value')
    console.log(this.headerTasks, this.headerForm.value)
  }

  add(event: MatChipInputEvent): void {
    const input = event.input
    const value = event.value

    if ((value || '').trim()) this.headerTasks.push(value.trim())

    if (input) input.value = ''

    this.taskCtrl.setValue(null)
  }

  remove(fruit: string): void {
    const index = this.headerTasks.indexOf(fruit)

    if (index >= 0) this.headerTasks.splice(index, 1)
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.headerTasks.push(event.option.viewValue)
    this.taskInput.nativeElement.value = ''
    this.taskCtrl.setValue(null)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase()

    return this.allTasks.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0)
  }

}
