import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCandidateComponent } from './add-candidate.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('AddCandidateComponent', () => {
  let component: AddCandidateComponent;
  let fixture: ComponentFixture<AddCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCandidateComponent],
      imports: [HttpClientTestingModule,FormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
