import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReserveComponent } from './component/reserve/reserve.component';
import { LoginComponent } from './component/login/login.component';
import { ReservationComponent } from './component/reservation/reservation.component';



const routes: Routes = [
{ path: 'reserve', component: ReserveComponent },
{ path: 'login', component: LoginComponent },
{ path: 'reservation', component: ReservationComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
