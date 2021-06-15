import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaportsListComponent } from './raports-list.component';

describe('RaportsListComponent', () => {
  let component: RaportsListComponent;
  let fixture: ComponentFixture<RaportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaportsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
