import {AfterViewInit, OnInit,Component, ViewChild, Input, ChangeDetectorRef, OnChanges, SimpleChanges} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-paginated-table',
  templateUrl: './paginated-table.component.html',
  styleUrls: ['./paginated-table.component.css']
})
export class PaginatedTableComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() displayedColumns = [];
  @Input() data: any[] = [];
  @Input() searchedColumn: string = "";
  dataSource = new MatTableDataSource<any>(this.data);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cd: ChangeDetectorRef) { }

  ngAfterViewInit() {
    let column = this.searchedColumn;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data[column].toLowerCase().includes(filter);
  };
  }

  ngOnInit(){
    this.dataSource = new MatTableDataSource<any>(this.data);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.data && changes.data.currentValue){
      this.dataSource = new MatTableDataSource<any>(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}