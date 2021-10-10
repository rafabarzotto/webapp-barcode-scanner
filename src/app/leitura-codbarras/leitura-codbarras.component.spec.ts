import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeituraCodbarrasComponent } from './leitura-codbarras.component';

describe('LeituraCodbarrasComponent', () => {
  let component: LeituraCodbarrasComponent;
  let fixture: ComponentFixture<LeituraCodbarrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeituraCodbarrasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeituraCodbarrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
