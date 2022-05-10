import { Product } from './Product';

export class Order {
  id: number = 0;
  products: Product[] = [];
  address: String = '';
  comment: String = '';
  price: number = 0;
  deliverTime: number = this.RandomTime();
  done: boolean = false;
  accepted: boolean = false;
  acceptanceTime: Date | 0 = 0;
  userId: number = 0;

  public RandomTime() {
    let min = 15;
    let max = 80;
    return Math.floor(Math.random() * (max - min) + min);
  }
  public GetProducts(products: Product[]) {
    let ret = '';
    for (let i = 0; i < products.length; i++) {
      ret += products[i].ToString(products[i]);
      ret += '\n';
    }
    return ret;
  }
  public ToString(order: Order) {
    return (
      'ID:' +
      order.id +
      'Products: ' +
      order.GetProducts(order.products) +
      ' Address: ' +
      order.address +
      ' Comment: ' +
      order.comment +
      ' Oder price: ' +
      order.price +
      ' Deliver time: ' +
      order.deliverTime
    );
  }
}
