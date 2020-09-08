import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintManagementComponent } from './complaint-management.component';

describe('ComplaintManagementComponent', () => {
  let component: ComplaintManagementComponent;
  let fixture: ComponentFixture<ComplaintManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
