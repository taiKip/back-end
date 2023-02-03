export type bookOptionsType = {
  title?: any
    category?: any
    isbn?: any
    page?: number | 1
  limit?:number|12
}
const asc = 'asc'
const desc = 'desc'

export type sortOptionsType = {
  title?: string | 'asc'
}
export type userOptionsType = {
  name: string
  email: string
}
