export class OrderTypes {
  static food = 'food';
  static delivery = 'delivery';
  static errands = 'errands';
  static grocery = 'grocery';

  static values = [this.food, this.delivery, this.errands, this.grocery];
}

export class UserTypes {
  static customer = 'customer';
  static rider = 'rider';
  static company = 'company';
  
  static values = [this.customer, this.rider, this.company];
}