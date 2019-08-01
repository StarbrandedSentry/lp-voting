import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoteComponent } from './components/vote/vote.component';
import { TallyComponent } from './components/tally/tally.component';


const routes: Routes = [
  {path: '', redirectTo: '/vote', pathMatch: 'full'},
  {path: 'vote', component: VoteComponent},
  {path: 'tally', component: TallyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
