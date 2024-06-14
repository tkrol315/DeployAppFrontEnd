import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstancePopupComponent } from './create-instance-popup.component';

describe('CreateInstancePopupComponent', () => {
  let component: CreateInstancePopupComponent;
  let fixture: ComponentFixture<CreateInstancePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInstancePopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInstancePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
