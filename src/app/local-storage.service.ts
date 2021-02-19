import { Injectable } from '@angular/core';
import { Product } from './_interface/product.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getItem(key: string) {
    return localStorage.getItem(key)
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }

  public getAllProcutsOnStorage(): Product[] {
    var productList: Product[] = new Array();

    // get products from localStorage
    for (var key in Object.keys(localStorage)) {
      let valueFromLocalStorageAsString = this.getItem(Object.keys(localStorage)[key]);
      if (valueFromLocalStorageAsString != null) {
        let valueFromLocalStorage = JSON.parse(valueFromLocalStorageAsString);
        productList.push({ type: valueFromLocalStorage.type, name: valueFromLocalStorage.name, value: Number(valueFromLocalStorage.value) });
      }
    }

    // sort list by name, attr from Product
    productList.sort(function(a : Product, b : Product) {
      return ('' + a.name).localeCompare(b.name)
    });

    return productList;
  }

}
