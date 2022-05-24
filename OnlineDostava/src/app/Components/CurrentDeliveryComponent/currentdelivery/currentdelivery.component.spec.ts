import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentdeliveryComponent } from './currentdelivery.component';

describe('CurrentdeliveryComponent', () => {
  let component: CurrentdeliveryComponent;
  let fixture: ComponentFixture<CurrentdeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentdeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentdeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
