export type DocDataWithId<T> = {
  id: string
} & T

export type WhitelistDocData = {
  address: string
  signature: string
}
