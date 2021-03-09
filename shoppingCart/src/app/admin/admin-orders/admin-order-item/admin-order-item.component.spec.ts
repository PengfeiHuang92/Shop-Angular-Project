import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderItemComponent } from './admin-order-item.component';

describe('AdminOrderItemComponent', () => {
  let component: AdminOrderItemComponent;
  let fixture: ComponentFixture<AdminOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
