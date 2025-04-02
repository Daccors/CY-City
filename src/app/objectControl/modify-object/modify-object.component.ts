import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectListService } from '../../services/laravel-api/object-list.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import * as InstancesInterface from '../../shared/InstancesInterfaces';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { __values } from 'tslib';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { metadata2 } from '../../shared/InstancesInterfaces';

@Component({
  selector: 'app-modify-object',
  imports: [
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    UpperCasePipe,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './modify-object.component.html',
  styleUrl: './modify-object.component.scss'
})
export class ModifyObjectComponent {

  type: keyof InstancesInterface.ObjectTypes;
  id = -1;
  private objectList = inject(ObjectListService);

  object: InstancesInterface.ObjectTypes[keyof InstancesInterface.ObjectTypes];
  objectKey: any[];
  obejctKeyModify = {};
  currentObject: InstancesInterface.ObjectTypes[keyof InstancesInterface.ObjectTypes];

  form: FormGroup = new FormGroup({});
  currentMetadata: { key: string; type: string; constraint: string }[] = [];
  selectList = {};

  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.params['type'] as keyof InstancesInterface.ObjectTypes;
    this.id = this.route.snapshot.params['id'];

    this.objectList.getObjectById(this.type, this.id).subscribe(
      (data) => {
        this.currentObject = data;
        this.object = data;
        this.objectKey = Object.keys(this.object);
        this.objectKey.forEach((val) => {
          this.obejctKeyModify[val] = false;
        });
      });
    this.currentMetadata = metadata2[this.type] || [];

    this.buildForm();
  }

  private buildForm() {
    const group: { [key: string]: FormControl } = {};

    this.currentMetadata.forEach(field => {
      let validators = [];
      if (!(field.key === 'id' || field.key === 'localisations_id' || field.key === 'created_at' || field.key === 'updated_at')) {

        validators.push(Validators.required);

        if (field.type === 'number') {
          // On peut vérifier si la contrainte est de la forme "0-100"
          if (field.constraint && field.constraint.includes('-')) {
            const parts = field.constraint.split('-');
            const minVal = Number(parts[0]);
            const maxVal = Number(parts[1]);
            validators.push(Validators.min(minVal));
            validators.push(Validators.max(maxVal));
          }
        } else if (field.type === 'boolean') {
          validators.push(Validators.min(0));
          validators.push(Validators.max(1));

        } else if (field.type === 'select') {
          const options = field.constraint.split('|');
          this.selectList[field.key] = options;
        }
      }
      group[field.key] = new FormControl('', validators);
    });

    this.form = this.fb.group(group);
  }

  changeValue(): void {
    const values = Object.entries(this.form.value).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as InstancesInterface.ObjectTypes[keyof InstancesInterface.ObjectTypes]);
    Object.assign(this.currentObject, values);
    
    this.objectList.modifyObject(this.currentObject, this.type as keyof InstancesInterface.ObjectTypes, this.id);
  }
}
