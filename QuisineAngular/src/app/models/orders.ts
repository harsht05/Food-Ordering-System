import { Food } from "./food";
import { User } from "./user";

export class Orders {
    
    constructor(public orderId: number = 0,
        public quantity: number = 0,
        public totalPrice: number = 0,
        public date: Date = new Date(),
        public food: Food,
        public customer: User,
        public restaurant: User) {
    }
}
