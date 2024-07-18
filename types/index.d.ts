/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================

declare type ShopParams = {
  name: string;
  qty: number;
};

declare type PageHeadingParams = {
  title: string;
  bred3?: string;
  bred3link?: string;
};

declare type SettingsParams = {
  module?: string;
};

declare type SignUpParams = {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  email: string;
  password: string;
};

interface Product {
  _id: string;
  name: string;
  code: string;
  category: string;
  shop: string;
  price: number;
  qty: number;
  status: string;
  is_delete: string;
  categoryName?: string;
  shopName?: string;
}

interface Sale {
  _id: string;
  invoice: string;
  code: string;
  products: [];
  total: number;
  shop: string;
  status: string;
  qty: number;
  createdAt: string;
  existingQuantity?: number;
}

declare type LoginUser = {
  email: string;
  password: string;
};

declare type User = {
  $id: string;
  email: string;
  userId: string;
  dwollaCustomerUrl: string;
  dwollaCustomerId: string;
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
};

declare type NewUserParams = {
  userId: string;
  email: string;
  name: string;
  password: string;
};
