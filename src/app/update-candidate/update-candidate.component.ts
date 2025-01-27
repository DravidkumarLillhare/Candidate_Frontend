import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from '../candidate';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-update-candidate',
  templateUrl: './update-candidate.component.html',
  styleUrls:['./update-candidate.component.css']
})
export class UpdateCandidateComponent {
  id: number = 0;

  candidate: Candidate = new Candidate();
  showAlert: boolean = false;

  // toggleAlert() {
  //   this.showAlert = !this.showAlert;
  // }
  constructor(
    private candidateService: CandidateService, 
    private route: ActivatedRoute, 
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.candidateService.getCandidateById(this.id).subscribe(
      (data) => {
        this.candidate = data;
      },
      (error) => {
        console.error("Error during fetching candidate data", error);
      }
    );
  }


  onSubmit(){
    console.log("button clicked");
    this.candidateService.updateCandidate(this.id,this.candidate).subscribe(data=>{
      this.candidate=data;
    });
    console.log(this.candidate);
    this.showAlert = !this.showAlert;
    setTimeout(() => {
      this.goToCandidateList();
    }, 500);
  }

  goToCandidateList(){
    this.router.navigate(['/candidates']);
  }
}
