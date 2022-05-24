import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelivererordersComponent } from './delivererorders.component';

describe('DelivererordersComponent', () => {
  let component: DelivererordersComponent;
  let fixture: ComponentFixture<DelivererordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelivererordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelivererordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
