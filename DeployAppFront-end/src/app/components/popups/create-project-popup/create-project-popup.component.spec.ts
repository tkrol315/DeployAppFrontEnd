import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectPopupComponent } from './create-project-popup.component';

describe('CreateProjectPopUpComponent', () => {
  let component: CreateProjectPopupComponent;
  let fixture: ComponentFixture<CreateProjectPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProjectPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateProjectPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
