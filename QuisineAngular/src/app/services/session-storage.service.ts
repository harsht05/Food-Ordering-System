import { Injectable } from '@angular/core';
import { RestaurantFood } from '../models/restaurant-food';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }
  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setMap(key: string, map: Map<RestaurantFood, number>): void {
    const serializedMap = JSON.stringify([...map]);
    sessionStorage.setItem(key, serializedMap);
  }

  getMap(key: string): Map<RestaurantFood, number> | null {
    const serializedMap = sessionStorage.getItem(key);
    if (serializedMap) {
      const deserializedMap = new Map<RestaurantFood, number>(JSON.parse(serializedMap));
      return deserializedMap;
    }
    return null;
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clearStorage(): void {
    sessionStorage.clear();
  }
}
