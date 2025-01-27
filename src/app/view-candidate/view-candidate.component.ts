import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from '../candidate.service';
import { Candidate } from '../candidate';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-candidate.component.html',
  styleUrls: ['./view-candidate.component.css'] 
})
export class ViewCandidateComponent {
  id: number = 0;
  resumeUrl: SafeResourceUrl | null = null;
  candidate: Candidate = new Candidate();

  constructor(private route: ActivatedRoute, 
              private candidateService: CandidateService, 
              private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.candidateService.getCandidateById(this.id).subscribe(data => {
      this.candidate = data;
      this.fetchResume(this.id); 
    });
  }

  errorMessage: string | null = null;

  fetchResume(candidateId: number) {
    this.candidateService.getResume(candidateId).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);
        this.resumeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl); 
        this.errorMessage = null;  
      },
      (error) => {
        console.error('Error fetching resume:', error);
        this.errorMessage = 'Resume not found or there was an error fetching it.';
      }
    );
  }
  
  
}
