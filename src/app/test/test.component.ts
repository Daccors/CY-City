import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-test',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { this.buildForm();}

  private buildForm() {
    this.form = this.fb.group({
      test1: [null] // Declare 'test1' as a form control
    });   
  }

  exportValues() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
