import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCajaComponent } from './tipo-caja.component';

describe('TipoCajaComponent', () => {
  let component: TipoCajaComponent;
  let fixture: ComponentFixture<TipoCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoCajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
