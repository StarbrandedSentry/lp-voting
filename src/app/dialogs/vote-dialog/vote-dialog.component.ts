import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { CandidatesService } from '../../services/candidates.service';


@Component({
  selector: 'app-vote-dialog',
  templateUrl: './vote-dialog.component.html',
  styleUrls: ['./vote-dialog.component.scss']
})
export class VoteDialogComponent implements OnInit {
  id: string;

  constructor(@Inject(MAT_DIALOG_DATA) data, public dialogRef: MatDialogRef<VoteDialogComponent>,
    private candidateServ: CandidatesService) { 
      this.id = data.id;
  }

  ngOnInit() {
  }

}
