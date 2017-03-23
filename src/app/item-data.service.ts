import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Item } from './Item';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ItemDataService {
  constructor(private http: Http) { }
  private appCarToken: string = 'ITEM-LIST';

  getAllItems() {
    return this.http.get('/assets/items.json').map(response => response.json());
  }

  getItemById(id: number): Observable<Item> {
    return this.getAllItems().map(jobs => {
      return jobs.filter(item => item.id === id)[0];
    });
  }

  insertItemToCar(item: Item): boolean {
    item.quantity = 1;
    let currentStoredItems = this.retrieveItemsFromCar();
    if (!currentStoredItems) {
      const items: Array<any> = [];
      items.push(item);
      localStorage.setItem(this.appCarToken, JSON.stringify(items));
    } else {
      let foundItem = currentStoredItems.filter(found => found.id == item.id);
      if (foundItem.length > 0) {
        return false;
      }
      currentStoredItems.push(item);
      this.localStorageInsert(currentStoredItems);
    }

    return true;
  }

  retrieveItemsFromCar() {
    let storedToken: Array<any> = JSON.parse(localStorage.getItem(this.appCarToken));
    return storedToken;
  }

  removeItemFromCar(item: Item) {
    let currentStoredItems = this.retrieveItemsFromCar();
    if (currentStoredItems) {
      currentStoredItems.splice(currentStoredItems.indexOf(item), 1);
      this.localStorageInsert(currentStoredItems);
    }
  }

  totalItemsCount() {
    const total = this.retrieveItemsFromCar();
    return total == null ? 0 : total.length;
  }

  private localStorageInsert(items: Object) {
    localStorage.setItem(this.appCarToken, JSON.stringify(items));
  }

}
