import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon} from '@angular/material/icon';
import { InformationsControlerService } from '../services/laravel-api/informations-controler.service';
import { MatTableDataSource } from '@angular/material/table';
import { DisplayAsTableComponent } from '../shared/display-as-table/display-as-table.component';
import { ObjectListService } from '../services/laravel-api/object-list.service';
import * as InstancesInterfaces from '../shared/InstancesInterfaces';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddLocationDialogComponent } from './add-location-dialog/add-location-dialog.component';

@Component({
  selector: 'app-add-object-form',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatStepperModule,
    MatButtonModule,
    MatIcon,
    ReactiveFormsModule,
    DisplayAsTableComponent,
    MatGridListModule,
    CommonModule
  ],
  templateUrl: './add-object-form.component.html',
  styleUrl: './add-object-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddObjectFormComponent {
  LocalisationInformations = inject(InformationsControlerService);
  ObjectAddService = inject(ObjectListService);
  readonly dialog = inject(MatDialog);

  type = signal<string>('');

  allObjectTypes = [];
  selectedType: keyof InstancesInterfaces.ObjectTypes | null = null;

  form: FormGroup | null = null;
  dynamicFields: string[] = [];
  nbCols: number = 1;

  columnNames: string[] = ['ID', 'Longitude', 'Latitude'];
  displayedColumns: string[] = ['id', 'longitude', 'latitude'];
  dataSource = new MatTableDataSource<InstancesInterfaces.localisation>([]);
  selectedRow: any = null;
  displayRow: String = '';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.LocalisationInformations.getObjects('localisation')
      .subscribe((locations) => { this.dataSource.data = locations as InstancesInterfaces.localisation[]; }); // Les données sont mises à jour directement dans le signal

    this.allObjectTypes = Object.keys(InstancesInterfaces.metadata);
    // Retire ce qui est mis automatiquement
  }

  selectRow(row: InstancesInterfaces.localisation): void {
    this.selectedRow = row;
    this.displayRow = 'ID: ' + row['id'] + '; Longitude: ' + row['longitude'] + '; Latitude : ' + row['latitude'];
  }

  onTypeChange(newType: string) {
    this.selectedType = newType as keyof InstancesInterfaces.ObjectTypes;
    // Récupérer la liste des attributs pour ce type (vous pouvez utiliser getDynamicObjectMetadata ou metadata directement)
    // Ici, on suppose que metadata contient la liste des clés à afficher.
    this.dynamicFields = InstancesInterfaces.metadata[this.selectedType] || [];

    this.dynamicFields = this.dynamicFields.slice(1, -2);
    this.dynamicFields = this.dynamicFields.filter(field => field !== 'localisation_id');

    // Construction dynamique du FormGroup : chaque attribut est un contrôle requis
    const group: { [key: string]: FormControl } = {};
    this.dynamicFields.forEach(field => {
      group[field] = new FormControl('', Validators.required);
    });
    this.form = this.fb.group(group);
  }

  onSubmit() {
    if (this.form && this.form.valid && this.selectedType) {
      console.log(`Nouvel objet ${this.selectedType} créé :`, this.form.value);
      // Ici, vous pouvez appeler votre service pour envoyer ces données à l'API :
      // this.objectListService.addUniqueObject(this.selectedType, 'URL_API', this.form.value).subscribe(...)
    }
  }

  openAddLocationDIalog(): void{
    const dialogRef = this.dialog.open(AddLocationDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}