import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/domain/car';
import { CarService } from 'src/app/services/carservice';

@Component({
  selector: 'app-carstable',
  templateUrl: './carstable.component.html',
  styleUrls: ['./carstable.component.css']
})
export class CarstableComponent implements OnInit {
 
  cars: Car[];
  selectedCar: Car;

  cols: any[];

  constructor(private carService: CarService) { }

  ngOnInit() {
      this.carService.getCarsSmall().then(cars => this.cars = cars);

      this.cols = [
          { field: 'vin', header: 'Vin' },
          { field: 'year', header: 'Year' },
          { field: 'brand', header: 'Brand' },
          { field: 'color', header: 'Color' },
          { field: 'color', header: 'Color' }

      ];
  }

  

  

  
 
  

  

}
