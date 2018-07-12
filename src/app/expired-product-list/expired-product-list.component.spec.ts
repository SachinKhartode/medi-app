import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredProductListComponent } from './expired-product-list.component';

describe('ExpiredProductListComponent', () => {
  let component: ExpiredProductListComponent;
  let fixture: ComponentFixture<ExpiredProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
