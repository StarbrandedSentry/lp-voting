import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Voter } from '../models/voters';

@Injectable({
  providedIn: 'root'
})
export class VotersService {
  voters: Observable<Voter[]>;
  voterCol: AngularFirestoreCollection<Voter>;
  voterDoc: AngularFirestoreDocument<Voter>;
  recoveredVoters: Voter[];

  constructor(private afs: AngularFirestore) { 
    this.voterCol = this.afs.collection('voters');
    
    this.voters = this.voterCol.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Voter;
        data.id = a.payload.doc.id;

        return data;
      }))
    );
  }

  getVoters(){
    return this.voters;
  }

  setVoter(guy: Voter, id:string){
    this.voterDoc = this.afs.doc<Voter>('voters/' + id);
    this.voterDoc.set(guy);
  }
  
}
