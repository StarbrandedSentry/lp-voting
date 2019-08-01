import { Component, OnInit } from '@angular/core';
import { CandidatesService } from '../../services/candidates.service';
import { Candidate } from '../../models/candidate';

@Component({
  selector: 'app-tally',
  templateUrl: './tally.component.html',
  styleUrls: ['./tally.component.scss']
})
export class TallyComponent implements OnInit {
  candidates: Candidate[];
  president: string = 'president';

  constructor(public candidateServ: CandidatesService) { }

  ngOnInit() {
    this.candidateServ.getOrderedCandidates().subscribe(candidates => {
      this.candidateServ.recoveredOrdCandidates = candidates;
    });
  }

}
