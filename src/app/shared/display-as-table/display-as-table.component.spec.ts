import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAsTableComponent } from './display-as-table.component';

describe('DisplayAsTableComponent', () => {
  let component: DisplayAsTableComponent;
  let fixture: ComponentFixture<DisplayAsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayAsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayAsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
