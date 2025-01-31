import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCandidateComponent } from './update-candidate.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('UpdateCandidateComponent', () => {
  let component: UpdateCandidateComponent;
  let fixture: ComponentFixture<UpdateCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCandidateComponent],
      providers: [
        { 
          provide: ActivatedRoute, 
          useValue: { 
            snapshot: { params: { id: '1' } }  // Mock ActivatedRoute params 
          } 
        }
      ],
      imports: [ HttpClientTestingModule, FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
