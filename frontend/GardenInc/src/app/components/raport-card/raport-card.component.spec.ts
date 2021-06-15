import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaportCardComponent } from './raport-card.component';

describe('RaportCardComponent', () => {
  let component: RaportCardComponent;
  let fixture: ComponentFixture<RaportCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaportCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
