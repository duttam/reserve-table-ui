import { Customer } from './customer';
import { Restaurant } from './restaurant';

export interface Reservation{
    reservationId?;
    reservationDate?;
    noOfGuest?;
    reserveBy: Customer;    
    reservedAt: Restaurant;
}