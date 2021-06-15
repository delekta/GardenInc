import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalRaportCardComponent } from './total-raport-card.component';

describe('TotalRaportCardComponent', () => {
  let component: TotalRaportCardComponent;
  let fixture: ComponentFixture<TotalRaportCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalRaportCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalRaportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
