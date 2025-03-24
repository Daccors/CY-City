import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddObjectFormComponent } from './add-object-form.component';

describe('AddObjectFormComponent', () => {
  let component: AddObjectFormComponent;
  let fixture: ComponentFixture<AddObjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddObjectFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddObjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
