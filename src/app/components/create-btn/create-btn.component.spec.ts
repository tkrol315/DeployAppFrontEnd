import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBtnComponent } from './create-btn.component';

describe('CreateBtnComponent', () => {
  let component: CreateBtnComponent;
  let fixture: ComponentFixture<CreateBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
