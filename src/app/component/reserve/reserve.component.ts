import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/domain/reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  reservations: Reservation[];
  column: any[];
  
  

  constructor(private reservationService: ReservationService,private router :Router) { }

  ngOnInit() {
      // this.reservationService.getReservations().then(reservations =>{
      //   this.reservations = reservations;
      //   console.log(this.reservations);
      // });
      this.reservationService.getReservation().subscribe((response: Reservation[]) =>{
        this.reservations = response;
      });
      
      this.column = [
          { field: 'reservationId', header: 'ReservationID' },
          { field: 'reservationDate', header: 'ReservationDate' },
          { field: 'noOfGuest', header: 'No-Of-Guest' },
          { field: "reserveBy" ,header: 'CustomerName'},
          { field: "reserveAt" ,header: 'RestaurantName'}
          
          
      ];
  }

  addReservation(){
    this.router.navigate(['/reservation']);

  }

}
