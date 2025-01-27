import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCandidateComponent } from './list-candidate/list-candidate.component';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { UpdateCandidateComponent } from './update-candidate/update-candidate.component';

import { ViewCandidateComponent } from './view-candidate/view-candidate.component';

const routes: Routes = [
  {
    path: 'candidates', component: ListCandidateComponent
  },
  {
    path: 'addCandidate', component: AddCandidateComponent
  },
  {
    path: 'updateCandidate/:id', component: UpdateCandidateComponent
  }, {
    path: 'viewCandidate/:id', component: ViewCandidateComponent
  },
   {
    path: '', redirectTo: 'candidates', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
