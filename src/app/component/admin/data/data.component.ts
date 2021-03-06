import { Component, ChangeDetectorRef, OnInit, ViewChild, Input } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';

import { AppService } from "../../../service/app.service";
import { AuthService } from "../../../service/auth.service";
import { DataService } from "../../../service/data.service";
import { BuilderService } from "../../../service/builder.service";

import { IdbCrudService } from "../../../service-idb/idb-crud.service";

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  @Input() form;

  user;
  forms;
  files;
  token;
  columns;
  isFiles: boolean = false;
  isData: boolean = false;

  filePaths = [];
  columnLabels = [];
  currentIndex: number;
  currentFileIndex: number;

  columnsToDisplay: string[];

  data: any;
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    media: MediaMatcher,
    private dialog: MatDialog,
    public appService: AppService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private dataService: DataService,
    public builderService: BuilderService,
    public idbCrudService: IdbCrudService,
    changeDetectorRef: ChangeDetectorRef) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.getIdb();
  }

  transform(file) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(file);
  }

  getIdb() {
    this.idbCrudService.readAll('data').subscribe(data => {
      this.data = data;

      if (this.data.length > 0) {
        this.data = this.data.filter(
          data => data.form_id === this.appService.formObj.form_id
        );
        this.columnLabels = JSON.parse(this.appService.formObj.form.labels);
        this.setTable();
      }
    });
  }

  getCloud() {
    let obj = ({
      form_id: this.appService.formObj.form_id,
      tenant_id: this.appService.formObj.tenant_id
    })

    this.dataService.getData(obj).subscribe(data => {
      this.data = data;

      if (this.data.length > 0) this.setTable();

    });
  }

  setTable() {
    this.columns = Object.keys(this.data[0]);
    
    let colIndex;
    colIndex = this.columns.findIndex(col => col === 'tenant_id');
    this.columns.splice(colIndex, 1);
    colIndex = this.columns.findIndex(col => col === 'form_id');
    this.columns.splice(colIndex, 1);
    colIndex = this.columns.findIndex(col => col === 'date_archived');
    this.columns.splice(colIndex, 1);
    colIndex = this.columns.findIndex(col => col === 'id');
    this.columns.splice(colIndex, 1);
    colIndex = this.columns.findIndex(col => col === 'is_file');
    this.columns.splice(colIndex, 1);
    colIndex = this.columns.findIndex(col => col === 'file_array');
    this.columns.splice(colIndex, 1);
    colIndex = this.columns.findIndex(col => col === 'user_created');
    this.columns.splice(colIndex, 1);
    colIndex = this.columns.findIndex(col => col === 'form_columns');
    this.columns.splice(colIndex, 1);

    this.columnLabels = JSON.parse(this.appService.formObj.form.labels);
    this.columnLabels.push('Date Created');

    this.columnsToDisplay = this.columns;

    this.dataSource = this.data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isData = true;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  close() {
  
  }

  openList() {
    this.appService.isListMenu = true;
  }

}