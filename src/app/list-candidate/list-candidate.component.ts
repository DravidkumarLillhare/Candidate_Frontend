import { Component, OnInit } from '@angular/core';
import { Candidate } from '../candidate';
import { CandidateService } from '../candidate.service';
import { Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';
import * as bootstrap from 'bootstrap';



@Component({
  selector: 'app-list-candidate',
  template: `
    <button (click)="showSuccess()">Show Success</button>
  `,
  templateUrl: './list-candidate.component.html',
  
  styleUrls: ['./list-candidate.component.css']
})
export class ListCandidateComponent implements OnInit {
  candidate_list: Candidate[] = [];
  showAlert:boolean=false;
  constructor(private candidateService: CandidateService,private router:Router, private toastr: ToastrService) {}
  
  ngOnInit(): void {
    this.loadCandidates(); 
  }

  private loadCandidates(): void {
    this.candidateService.getCandidateList().subscribe({
      next: (data) => {
        this.candidate_list = data;
      },
      error: (err) => {
        console.error('Error fetching candidates:', err);
      }
    });
  }

viewCandidate(id:number){
  this.router.navigate(['viewCandidate',id]);
}
  
updateCandidate(id:number){
  this.router.navigate(['updateCandidate',id]);
}


showSuccess() {
  this.toastr.success('Deleted!', 'Success', {
    timeOut: 500, 
positionClass: 'toast-top-right',
    progressBar: true, 
    progressAnimation: 'decreasing',  
  });
}



async deleteCandidate(id: number) {
    try {
      await this.deleteResume(id);
      await this.candidateService.deleteCandidateById(id).toPromise();
      console.log('Candidate deleted successfully.');
    
      this.showSuccess();
      this.loadCandidates();
    } catch (error) {
      console.error('Error deleting candidate or resume:', error);
      alert('An error occurred. Please try again.');
    }
  
}

async deleteResume(id: number): Promise<void> {
  try {
    await this.candidateService.deleteResume(id).toPromise();
    console.log('Resume deleted successfully.');
  } catch (error) {
    console.error('Error deleting resume:', error);
    throw new Error('Failed to delete resume.');
  }
}

candidateToDeleteId: number | null = null;
openConfirmationModal(candidateId: number) {
  this.candidateToDeleteId = candidateId;
  if (typeof document !== 'undefined') {
    import('bootstrap').then((bootstrap) => {
      const modal = new bootstrap.Modal(document.getElementById('confirmationModal')!);
      modal.show();
    });
  }
}

confirmDelete() {
  if (this.candidateToDeleteId) {
    this.candidateService.deleteCandidateById(this.candidateToDeleteId).subscribe(() => {
      console.log('Candidate deleted');
      this.showSuccess();
      this.loadCandidates();
    });
  }
  if (typeof document !== 'undefined') {
    import('bootstrap').then((bootstrap) => {
      const modal = new bootstrap.Modal(document.getElementById('confirmationModal')!);
      modal.hide();
    });
  }
}

}
