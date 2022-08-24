import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportadoraComponent } from './exportadora.component';

describe('ExportadoraComponent', () => {
  let component: ExportadoraComponent;
  let fixture: ComponentFixture<ExportadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportadoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
