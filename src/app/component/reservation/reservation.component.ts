import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/domain/restaurant';
import { NgForm } from '@angular/forms';
import { ReservationService } from 'src/app/services/reservation.service';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { SelectItem } from 'primeng/components/common/selectitem';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/domain/customer';
import * as moment from 'moment';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reserveDate: Date;
  guestCount: Number;
  //customerName: String;
  restaurants: Restaurant[];
  //selectedRestaurant: Restaurant;
 // selectedCustomer:Customer;
  customers:Customer[];
  restaurantItems: SelectItem[];
  customerItems:SelectItem[];
  constructor(private reservationService : ReservationService,
    private router: Router,private restaurantService: RestaurantService,
    private customerServica :CustomerService) { }

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe((response:Restaurant[])=>{
      this.restaurants=response;
     this.restaurantItems= this.restaurants.map((restaurant:Restaurant)=>{
       //console.log("change");
        return {label:restaurant.restaurantName, value:restaurant};
      })
    })
    this.customerServica.getCustomers("active").subscribe((response)=>{
        this.customers=response;
        this.customerItems=this.customers.map((customer:Customer)=>{
          return {label:customer.firstname+" "+customer.lastname, value:customer};

        })
    })

  }
  onSubmit(form: NgForm) {
    let values = form.value;
    //let date:string=moment().format('YYYY-MM-DD HH:mm');
    //console.log(date);
    let payload = {
      reservationDate: moment(values.reservationDate).format('YYYY-MM-DD HH:mm'),
      noOfGuest: values.noOfGuest,
      reserveBy : values.reserveBy,
      reservedAt :values.reservedAt

    };

    //let httppayload: String = JSON.stringify(payload);

      this.reservationService.postReservation(payload)
      .subscribe(response => {        
        //console.log(response.data);
        this.router.navigate(['/reserve']);
      },
      error => console.log(error.message));
  }

}
