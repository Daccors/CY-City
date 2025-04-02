import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-display-as-table',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './display-as-table.component.html',
  styleUrl: './display-as-table.component.scss'
})
export class DisplayAsTableComponent implements AfterViewInit {

  @Input() displayedColumns: string[];
  @Input() dataSource: any;
  @Input() columnNames: string[];
  @Output() rowClicked =  new EventEmitter<any>();
  currentSelection: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  select(row:  any){
    this.rowClicked.emit(row);
    this.currentSelection = row;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}