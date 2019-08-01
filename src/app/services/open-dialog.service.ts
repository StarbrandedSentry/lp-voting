import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { VoteDialogComponent } from '../dialogs/vote-dialog/vote-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class OpenDialogService {

  constructor(private dialog: MatDialog) { }

  openVoteDialog(id: string){
    return this.dialog.open(VoteDialogComponent, {
      height: '400px',
      width: '600px',
      panelClass: 'vote-container',
      data:{
        id: id
      }
    });
  }
}
