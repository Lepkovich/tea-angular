export type ProductType = {
  id: number,
  image: string,
  title: string,
  description: string,
  price : number
}
export type OrderType = {
  name: string,
  last_name: string,
  phone: string,
  country: string,
  zip: string,
  product: string,
  address: string,
  comment?: string,
}
