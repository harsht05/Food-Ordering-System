import { Food } from "./food";
import { Restaurant } from "./restaurant";

export class RestaurantFood {
    id: number;
  food: Food;
  restaurant: Restaurant;
  rate: number;
  addedToCart: boolean;
  quantity: number;

  constructor(id: number, food: Food, rate: number, restaurant: Restaurant) {
    this.id = id;
    this.food = food;
    this.restaurant = restaurant;
    this.rate = rate;
    this.addedToCart = false;
    this.quantity = 0;
  }
}
