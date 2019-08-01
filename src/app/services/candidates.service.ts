import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { Category } from '../models/candidate-categories';
import { Candidate } from '../models/candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  voted: string;
  candidates: Observable<Candidate[]>;
  candidatesCol: AngularFirestoreCollection<Candidate>;
  ordCandidatesCol: AngularFirestoreCollection<Candidate>;
  ordCandidates: Observable<Candidate[]>;
  recoveredCandidates: Candidate[];
  presDoc: AngularFirestoreDocument<Candidate>;
  vPresDoc: AngularFirestoreDocument<Candidate>;
  secDoc: AngularFirestoreDocument<Candidate>;
  presSub; 
  vPresSub;
  secSub;
  recoveredOrdCandidates: Candidate[];

  constructor(public afs: AngularFirestore) { 
    this.candidatesCol = this.afs.collection('runners');
    this.ordCandidatesCol = this.afs.collection('runners', ref => ref.orderBy('votes', 'desc'));
    this.candidates = this.candidatesCol.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Candidate;
        data.id = a.payload.doc.id;

        return data;
      }))
    );
    this.ordCandidates = this.ordCandidatesCol.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Candidate;
        data.id = a.payload.doc.id;

        return data;
      }))
    );
  }

  getCandidates(){
    return this.candidates;
  }

  getOrderedCandidates(){
    return this.ordCandidates;
  }

  updatePresVotes(id: string){
    this.presDoc = this.afs.doc<Candidate>('runners/' + id);
    this.presSub = this.presDoc.valueChanges().subscribe(can => {
      can.votes = Number(can.votes) + 1;
      this.presDoc.update(can);
      this.presSub.unsubscribe();
    });
  }

  updateVPresVotes(id: string){
    this.vPresDoc = this.afs.doc<Candidate>('runners/' + id);
    this.vPresSub = this.vPresDoc.valueChanges().subscribe(can => {
      can.votes = Number(can.votes) + 1;
      this.vPresDoc.update(can);
      this.vPresSub.unsubscribe();
    });
  }

  updateSecVotes(id: string){
    this.secDoc = this.afs.doc<Candidate>('runners/' + id);
    this.secSub = this.secDoc.valueChanges().subscribe(can => {
      can.votes = Number(can.votes) + 1;
      this.secDoc.update(can);
      this.secSub.unsubscribe();
    });
  }
}
