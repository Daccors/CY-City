import { Component, EventEmitter, Injectable, Input, Output, ValueProvider } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
// Importez vos métadonnées
import { metadata2 } from '../../shared/InstancesInterfaces';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrl: './dynamic-form-field.component.scss',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule
  ]
})
export class DynamicFormFieldComponent {
  objectTypes: string[] = Object.keys(metadata2);
  @Output() formEmit = new EventEmitter<any>();
  @Output() nextEmit = new EventEmitter<void>();

  selectedType: string = '';
  selectList = {};

  form: FormGroup = new FormGroup({});

  currentMetadata: { key: string; type: string; constraint: string }[] = [];

  constructor(private fb: FormBuilder) { }

  onTypeChange(newType: string) {
    this.selectedType = newType;
    this.currentMetadata = metadata2[newType] || [];
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
        
        } else if ( field.type === 'select') {
          const options = field.constraint.split('|');
          this.selectList[field.key]= options;
        }
      }
      group[field.key] = new FormControl('', validators);
    });

    this.form = this.fb.group(group);
  }

  exportValues() {
    if (this.form.valid && this.selectedType) {
      const values = Object.entries(this.form.value).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, any>);
      this.formEmit.emit({type: this.selectedType, values: values});
      this.nextEmit.emit();
    }
  }
}