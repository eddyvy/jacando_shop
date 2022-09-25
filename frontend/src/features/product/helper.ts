import { Product } from './types'

export const getUniqueProducts = (prods: Product[]): Product[] => {
  const mapIds: Record<number, true> = {}
  const result: Product[] = []
  prods.forEach((p) => {
    if (mapIds[p.id]) return
    mapIds[p.id] = true
    result.push(p)
  })
  return result
}
