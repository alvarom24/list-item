import { Component } from '@angular/core';
import { ItemDataService } from './item-data.service';
import { Item } from './item';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ItemDataService]
})
export class AppComponent {
  constructor(private itemDataService: ItemDataService) {
  }

  items: Item[] = [];
  showCar: boolean = false;
  itemsCar: Item[] = [];

  private addToCar(item: Item) {
    let x = this.itemDataService.insertItemToCar(item);
    if (x) {
      alert('Product added to car');
    }
    else {
      alert('Product already exist on your car');
    }
  }

  private getItems() {
    this.itemDataService.getAllItems().subscribe(
      items => this.items = items,
      err => {
        console.log(err);
      });;

    console.log(this.items);
  }

  private totalCount() {
    return this.itemDataService.totalItemsCount();
  }

  private showCarList() {
    this.showCar = true;
    this.itemsCar = this.itemDataService.retrieveItemsFromCar();
  }

  private hideCarList() {
    this.showCar = false;
    this.itemsCar = [];
  }

  private deleteItemFromCar(item: Item) {
    this.itemDataService.removeItemFromCar(item);
    this.showCarList();
  }

  ngOnInit() {
    this.getItems();
  }
}

