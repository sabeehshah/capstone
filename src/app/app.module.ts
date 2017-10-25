import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule} from 'angular2-flash-messages';
import { AnimatorModule } from 'css-animator';
import { Ng2TableModule } from 'ng2-table';
import { DataTablesModule } from 'angular-datatables';

//AngularFire Imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';





//component imports
import { AppComponent } from './app.component';
import { AllScrimsComponent } from './components/all-scrims/all-scrims.component';
import { ScrimDetailsComponent } from './components/scrim-details/scrim-details.component';
import { AddScrimComponent } from './components/add-scrim/add-scrim.component';
import { EditScrimComponent } from './components/edit-scrim/edit-scrim.component';
import { MyScrimsComponent } from './components/my-scrims/my-scrims.component';
import { AllTeamsComponent } from './components/all-teams/all-teams.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { MyTeamsComponent } from './components/my-teams/my-teams.component';
import { AllPlayersComponent } from './components/all-players/all-players.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { PlayerDetailsComponent } from './components/player-details/player-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

//Service Imports
import { ScrimService } from './services/scrim.service';
import { TeamService } from './services/team.service';
import { PlayerService } from './services/player.service';
import { NotificationService } from './services/notification.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { FilterPipe } from './pipes/filter.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { MessageboardComponent } from './components/messageboard/messageboard.component';



const appRoutes: Routes =[
  {path:'scrims', component:AllScrimsComponent, canActivate:[AuthGuard]},
  {path:'myscrims', component:MyScrimsComponent, canActivate:[AuthGuard]},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'teams',component:AllTeamsComponent,canActivate:[AuthGuard]},
  {path:'myteams', component:MyTeamsComponent, canActivate:[AuthGuard]},
  {path:'add-scrim',component:AddScrimComponent,canActivate:[AuthGuard]},
  {path:'add-team',component:AddTeamComponent,canActivate:[AuthGuard]},
  {path:'team/:id', component:TeamDetailsComponent, canActivate:[AuthGuard]},
  {path:'scrim/:id',component:ScrimDetailsComponent,canActivate:[AuthGuard]},
  {path:'edit-team/:id', component:EditTeamComponent, canActivate:[AuthGuard]},
  {path:'edit-scrim/:id', component:EditScrimComponent, canActivate:[AuthGuard]},
  {path:'messageBoard', component:MessageboardComponent, canActivate:[AuthGuard]}
]

export const firebaseConfig = {
    apiKey: "AIzaSyBRoXK5D9o3fcFKWdQ-IWg_4f-vHlqzjpI",
    authDomain: "capstone-44cd4.firebaseapp.com",
    databaseURL: "https://capstone-44cd4.firebaseio.com",
    storageBucket: "capstone-44cd4.appspot.com",
    messagingSenderId: "913897789168"
}

@NgModule({
  declarations: [
    AppComponent,
    AllScrimsComponent,
    ScrimDetailsComponent,
    AddScrimComponent,
    EditScrimComponent,
    MyScrimsComponent,
    AllTeamsComponent,
    AddTeamComponent,
    EditTeamComponent,
    MyTeamsComponent,
    AllPlayersComponent,
    AddPlayerComponent,
    EditPlayerComponent,
    TeamDetailsComponent,
    PlayerDetailsComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    FilterPipe,
    FooterComponent,
    MessageboardComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    FlashMessagesModule,
    Ng2TableModule,
    DataTablesModule
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    ScrimService,
    TeamService,
    PlayerService,
    AuthService,
    AuthGuard,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
