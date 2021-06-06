import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejestrationComponent } from './rejestration.component';

describe('RejestrationComponent', () => {
  let component: RejestrationComponent;
  let fixture: ComponentFixture<RejestrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejestrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejestrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
