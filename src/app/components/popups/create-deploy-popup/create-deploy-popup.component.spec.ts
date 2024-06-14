import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeployPopupComponent } from './create-deploy-popup.component';

describe('CreateDeployPopupComponent', () => {
  let component: CreateDeployPopupComponent;
  let fixture: ComponentFixture<CreateDeployPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDeployPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDeployPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
