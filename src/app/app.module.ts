import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule, AngularFirestore} from '@angular/fire/firestore';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VoteComponent } from './components/vote/vote.component';
import { environment } from 'src/environments/environment.prod';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TallyComponent } from './components/tally/tally.component';
import { VoteDialogComponent } from './dialogs/vote-dialog/vote-dialog.component';
import { CandidatesService } from './services/candidates.service';

@NgModule({
  declarations: [
    AppComponent,
    VoteComponent,
    NavigationComponent,
    TallyComponent,
    VoteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    MatDialogModule, BrowserAnimationsModule
  ],
  providers: [CandidatesService],
  bootstrap: [AppComponent],
  entryComponents: [VoteDialogComponent]
})
export class AppModule { }
