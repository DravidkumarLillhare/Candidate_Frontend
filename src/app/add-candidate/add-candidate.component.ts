import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Candidate } from '../candidate';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css'],
})
export class AddCandidateComponent {
  @ViewChild('candidateForm') candidateForm!: NgForm;
  candidate: Candidate = new Candidate();
  fileToUpload: File | null = null;
  fileError: string | null = null;
  id: number = 0;
  showAlert: boolean = false;

  constructor(private candidateService: CandidateService, private route: Router) {}

  onSubmit() {
    if (this.candidateForm.valid) {
      this.insertCandidate();
    } else {
      alert('Please fill in all required fields.');
    }
  }

  async insertCandidate() {
    try {
      const savedCandidate = await this.candidateService.insertCandidate(this.candidate).toPromise();
      if (savedCandidate) {
        console.log('Candidate saved:', savedCandidate);
        this.id = savedCandidate.id;

        if (this.fileToUpload) {
          this.uploadResume();
        } else {
          alert('Candidate inserted successfully without a resume.');
          this.candidateForm.resetForm();
        }
      } else {
        throw new Error('Candidate details could not be saved.');
      }
    } catch (error) {
      console.error('Error inserting candidate:', error);
      alert('Error inserting candidate.');
    }
  }

  async uploadResume() {
    if (this.id && this.fileToUpload) {
      try {
        const response = await this.candidateService.uploadResume(this.id, this.fileToUpload).toPromise();
        console.log('Resume uploaded successfully:', response);
        this.showAlert = true;

        setTimeout(() => {
          this.showAlert = false;
        }, 1000);

        this.candidateForm.resetForm();
      } catch (error) {
        console.error('Error uploading resume:', error);
        alert('Error uploading resume.');
      }
    } else {
      alert('Error: Missing candidate ID or file to upload.');
    }
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];

    if (file) {
      if (file.type !== 'application/pdf') {
        this.fileError = 'Only PDF files are allowed.';
        this.fileToUpload = null;
        return;
      }

      this.fileToUpload = file;
      this.fileError = null;
      console.log('Selected file:', file);
    } else {
      this.fileError = 'No file selected.';
      this.fileToUpload = null;
    }
  }

  showTooltipIfInvalid(tooltip: any) {
    if (!tooltip.isOpen() && (!this.candidateForm?.valid || !this.fileToUpload)) {
      tooltip.open();
      setTimeout(() => tooltip.close(), 2000);
    }
  }
}
