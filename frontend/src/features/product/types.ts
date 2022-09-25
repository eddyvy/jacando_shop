export type Category = 'cheese' | 'fruit' | 'vegetable'

export type Product = {
  id: number
  category: Category
  price: number
  name: string
  description: string
  stock: number
  image: string
  isLocal?: boolean
  smellLevel?: number
  waterPct?: number
}

export type ProductsState = {
  cheeses: Product[]
  fruits: Product[]
  vegetables: Product[]
}
