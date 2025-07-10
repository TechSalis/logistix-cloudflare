
// export enum UserType {
//   customer, rider, company,
// }

export type UserRole = 'customer' | 'rider' | 'company';
export type OrderType = 'food' | 'delivery' | 'grocery' | 'errands';

// export function userTypeFromString(source: string | null): UserType | undefined {
//   if (!source) return;
//   switch (source.toLowerCase()) {
//     case 'customer': return UserType.customer;
//     case 'rider': return UserType.rider;
//     case 'company': return UserType.company;
//   }
// }

// Convert enum to string
// export function userTypeToString(type: UserType): string {
//   return type.toString();
// }

// export enum OrderType {
//   food, delivery, grocery, errands
// }


// export function orderTypeFromString(source: string | null): OrderType | undefined {
//   if (!source) return;
//   switch (source.toLowerCase()) {
//     case 'food': return OrderType.food;
//     case 'delivery': return OrderType.delivery;
//     case 'grocery': return OrderType.grocery;
//     case 'errands': return OrderType.errands;
//   }
// }

// export function orderTypeToString(type: OrderType): string {
//   return type.toString();
// }
