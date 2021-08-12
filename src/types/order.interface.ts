// NOTA: Generado automaticamente, podría estar incompleto

export interface ClientProfileData {
  document: string;
  firstName: string;
  documentType: string;
  userProfileId: string;
  lastName: string;
  phone: string;
}

export interface Seller {
  id: string;
  name: string;
  invoiceA: boolean;
}

export interface Item {
  name: string;
  imageUrl: string;
  detailUrl: string;
  id: string;
  price: number;
  quantity: string;
  courierId: string;
  orderId: string;
  seller: Seller;
  enabled: boolean;
}

export interface DeliveryPromisedTimeRange {
  initialTime: number;
  endingTime: number;
  code: string;
}

export interface MyShoppingData {
  code: string;
  observation: string;
  transitedOn: Date;
}

export interface Seller2 {
  id: string;
  name: string;
  invoiceA: boolean;
}

export interface DeliveryAddress {
  street: string;
  zipCode: string;
  city: string;
  state: string;
  observations?: any;
  number: number;
}

export interface OrderDelivery {
  deliveryId: string;
  orderId: string;
  dateDelivered: string;
  deliveryPromiseHD: string;
  deliveryPromisedTimeRange: DeliveryPromisedTimeRange;
  myShoppingData: MyShoppingData;
  delayed: boolean;
  seller: Seller2;
  hasAgenda: boolean;
  deliveryAddress: DeliveryAddress;
  deliveryType: string;
  status: string;
  hasLogisticOperator: boolean;
  envioPack: boolean;
  fravegaEnvio: boolean;
}

export interface Seller3 {
  id: string;
  name: string;
  invoiceA: boolean;
}

export interface Item2 {
  name: string;
  imageUrl: string;
  detailUrl: string;
  id: string;
  price: number;
  quantity: string;
  courierId: string;
  deliveryId: string;
  deliveryObjectId: string;
  orderId: string;
  seller: Seller3;
  enabled: boolean;
}

export interface ItemsByDelivery {
  id: string;
  deliveryId: string;
  deliveryType: string;
  orderDelivery: OrderDelivery;
  enabled: boolean;
  items: Item2[];
}

export default interface Order {
  orderIdToIssue: string;
  mixed: boolean;
  orderId: string;
  orderGroup: string;
  hasSubOrders: boolean;
  productName: string;
  amount: number;
  creationDate: string;
  clientProfileData: ClientProfileData;
  items: Item[];
  itemsByDelivery: ItemsByDelivery[];
  itemsBySubOrder: any[];
}
