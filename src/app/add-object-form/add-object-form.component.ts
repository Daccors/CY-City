import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { InformationsControlerService } from '../services/laravel-api/informations-controler.service';
import { MatTableDataSource } from '@angular/material/table';
import { ObjectListService } from '../services/laravel-api/object-list.service';
import * as InstancesInterfaces from '../shared/InstancesInterfaces';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddLocationDialogComponent } from './add-location-dialog/add-location-dialog.component';
import { DisplayAsTableComponent } from '../shared/display-as-table/display-as-table.component';
import { MatIcon } from '@angular/material/icon';
import { DynamicFormFieldComponent } from './dynamic-form-field/dynamic-form-field.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-add-object-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatStepperModule,
    MatButtonModule,
    DisplayAsTableComponent,
    MatGridListModule,
    CommonModule,
    MatIcon,
    DynamicFormFieldComponent,
    RouterLink,
    RouterLinkActive,
    MatDividerModule
  ],
  templateUrl: './add-object-form.component.html',
  styleUrl: './add-object-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddObjectFormComponent {
  LocalisationInformations = inject(InformationsControlerService);
  ObjectAddService = inject(ObjectListService);
  readonly dialog = inject(MatDialog);

  currentObject = { type: '', values: {} };

  //Tableau des localisations
  columnNames: string[] = ['ID', 'Longitude', 'Latitude'];
  displayedColumns: string[] = ['id', 'longitude', 'latitude'];
  dataSource = new MatTableDataSource<InstancesInterfaces.localisation>([]);
  selectedRow: any = null;
  displayRow: String = '';

  private _snackBar = inject(MatSnackBar);
  
  ngOnInit() {
    this.LocalisationInformations.getObjects('localisation')
      .subscribe((locations) => { this.dataSource.data = locations as InstancesInterfaces.localisation[]; }); // Les données sont mises à jour directement dans le signal
  }

  selectRow(row: InstancesInterfaces.localisation): void {
    this.selectedRow = row;
    this.displayRow = 'ID: ' + row['id'] + '; Longitude: ' + row['longitude'] + '; Latitude : ' + row['latitude'];
  }

  formValues(values: any) {
    this.currentObject = values;
  }

  async onSubmit() {
    this.currentObject.values['created_at'] = new Date();
    this.currentObject.values['updated_at'] = new Date();
    this.currentObject.values['localisations_id'] = this.selectedRow['id'];
    this.currentObject.values['id'] = await this.ObjectAddService.getFirstAvailableIndex(this.currentObject.type as keyof InstancesInterfaces.ObjectTypes);
    const newObject: InstancesInterfaces.ObjectTypes[keyof InstancesInterfaces.ObjectTypes] = this.castToObjectType(this.currentObject.type, this.currentObject.values);
    console.log("Données envoyées :", this.currentObject.values);

    this.ObjectAddService.addObject(this.currentObject.type as keyof InstancesInterfaces.ObjectTypes, newObject).subscribe((response) => {
      console.log(response);
      this.openSnackBar(this.currentObject.values['id'], this.currentObject.type);
    });
  }

  castToObjectType(name: string, values: any): InstancesInterfaces.ObjectTypes[keyof InstancesInterfaces.ObjectTypes] {
    const typedObject: InstancesInterfaces.ObjectTypes[keyof InstancesInterfaces.ObjectTypes] = values as InstancesInterfaces.ObjectTypes[keyof InstancesInterfaces.ObjectTypes];
    return typedObject;
  }

  openAddLocationDIalog(): void {
    const dialogRef = this.dialog.open(AddLocationDialogComponent, {});
    dialogRef.afterClosed().subscribe();
  }

  openSnackBar(ObjectID: number, type: string) {
    this._snackBar.openFromComponent(InformationsBarComponent, {
      duration: 3 * 1000,
      data: { ObjectID, type }
    });
  }
}


@Component({
  selector: 'informations_bar',
  template: `
  <span matSnackBarLabel>
  Objet {{data.type}} ajouter avec l'ID : {{data.ObjectID}}
</span>
  `,
  styles: `
    :host {
      display: flex;
    }
  `,
  imports: [MatButtonModule, MatSnackBarLabel],
})
export class InformationsBarComponent {
  snackBarRef = inject(MatSnackBarRef);
  data = inject(MAT_SNACK_BAR_DATA);
}