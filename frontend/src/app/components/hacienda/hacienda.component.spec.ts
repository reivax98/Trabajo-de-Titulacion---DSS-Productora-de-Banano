import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaciendaComponent } from './hacienda.component';

describe('HaciendaComponent', () => {
  let component: HaciendaComponent;
  let fixture: ComponentFixture<HaciendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaciendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HaciendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
