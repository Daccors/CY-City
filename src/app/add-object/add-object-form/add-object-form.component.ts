import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

export interface local {
  id: number;
  long: number;
  lat: number;
}

/* Liste à construire selon la BDD */
//BACK-END
const ELEMENT_DATA: local[] = [
  { id: 1, long: 0.00000, lat: 0.00000 },
  { id: 2, long: 0.00000, lat: 0.00000 },
  { id: 3, long: 0.00000, lat: 0.00000 },
  { id: 4, long: 0.00000, lat: 0.00000 },
  { id: 5, long: 0.00000, lat: 0.00000 },
];

@Component({
  selector: 'app-add-object-form',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatStepperModule,
    MatTableModule,
    MatButtonModule,
    MatIcon],
  templateUrl: './add-object-form.component.html',
  styleUrl: './add-object-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddObjectFormComponent {
  type: String = '';

  displayedColumns: string[] = ['id', 'long', 'lat'];
  dataSource = ELEMENT_DATA;

  selectedRow: any = null;
  displayRow: String = '';

  selectRow(row: any): void {
    this.selectedRow = row;
    this.displayRow = 'ID: ' + row['id'] + '; Longitude: ' + row['long'] + '; Latitude : ' + row['lat'];
  }
}
