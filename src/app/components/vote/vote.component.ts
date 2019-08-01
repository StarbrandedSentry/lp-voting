import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/candidate-categories';
import { CategoriesService} from '../../services/categories.service';
import { subscribeOn } from 'rxjs/operators';
import { VotersService } from '../../services/voters.service';
import { Voter } from '../../models/voters';
import { CandidatesService } from '../../services/candidates.service';
import { Candidate } from '../../models/candidate';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  votingFlag: boolean = false;
  categories: Category[];
  presidents: Candidate[];
  vPresidents: Candidate[];
  secretaries: Candidate[];
  id: string;
  name: string;
  voter: Voter;
  exists: boolean;
  presCho: string;
  vPresCho: string;
  secCho: string;

  constructor(public catService: CategoriesService, public voterServ: VotersService, 
    public candidateServ: CandidatesService) { }

  ngOnInit() {
    this.voterServ.getVoters().subscribe(voters => {
      this.voterServ.recoveredVoters = voters;
    });

    this.candidateServ.getCandidates().subscribe(candidates => {
      this.candidateServ.recoveredCandidates = candidates;
    });
  }

  vote(){
    
    this.voterServ.recoveredVoters.forEach(element => {
      if(element.id === this.id){
        this.exists = true;
        //console.log(element.id);
      }
      else{
        this.exists = false;
      }
    });

    if(!this.exists){
      this.votingFlag = true;
      this.catService.getCategories().subscribe(
        categories => {
          this.categories = categories;
        }
      );
   

    }
    
  }

  choose(choice: Candidate){
    console.log(choice.name);
    console.log(choice.position);

    if(choice.position == 'president'){
      this.presCho = choice.id;
    }
    else if(choice.position == 'vice-president'){
      this.vPresCho = choice.id;
    }
    else if(choice.position == 'secretary'){
      this.secCho = choice.id;
    }
  }

  finishVote(){
    //this.voter.id = this.id;
    this.voter = {
      name: this.name
    };
    this.voterServ.setVoter(this.voter, this.id);
    this.candidateServ.updatePresVotes(this.presCho);
    this.candidateServ.updateVPresVotes(this.vPresCho);
    this.candidateServ.updateSecVotes(this.secCho);

    this.restartAll();
  }

  restartAll(){
    this.votingFlag = false;
    this.id = '';
    this.name = '';
    this.presCho = '';
    this.vPresCho = '';
    this.secCho = '';
    this.exists = true;
  }
}
