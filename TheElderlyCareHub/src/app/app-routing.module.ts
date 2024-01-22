import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; 
import { DashBoard2Component } from './dash-board2/dash-board2.component';
import { ElderlyCheckComponent } from './elderly-check/elderly-check.component'; 
import { RoomsComponent  } from './rooms/rooms.component';

const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'elderly-check', component: ElderlyCheckComponent },
  { path: 'room-check', component: RoomsComponent },
  { path: 'dash-board2', component:  DashBoard2Component},

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
