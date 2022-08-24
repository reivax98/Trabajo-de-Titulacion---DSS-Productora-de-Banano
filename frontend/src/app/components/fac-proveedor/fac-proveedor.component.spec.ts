import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacProveedorComponent } from './fac-proveedor.component';

describe('FacProveedorComponent', () => {
  let component: FacProveedorComponent;
  let fixture: ComponentFixture<FacProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacProveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
