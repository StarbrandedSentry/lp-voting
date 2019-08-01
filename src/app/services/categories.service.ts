import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { Category } from '../models/candidate-categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categories: Observable<Category[]>;
  categoryCollection: AngularFirestoreCollection<Category>;

  constructor(private afs: AngularFirestore) { 
    this.categoryCollection = this.afs.collection('candidates');
    this.categories = this.categoryCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Category;
        data.id = a.payload.doc.id;
        
        return data;
      })
      )
    );
  }

  getCategories(){
    return this.categories;
  }


}
