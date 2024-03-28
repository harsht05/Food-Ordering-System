import { Customer } from "./customer";
import { Food } from "./food";
import { Restaurant } from "./restaurant";

export class Orders {
    
    constructor(public orderId: number = 0,
        public quantity: number = 0,
        public totalPrice: number = 0,
        public date: Date = new Date(),
        public deliveryAddress: string = '',
        public food: Food,
        public customer: Customer,
        public restaurant: Restaurant,
        public isCollapsed: boolean = true) {
    }
}
