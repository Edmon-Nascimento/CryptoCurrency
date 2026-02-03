export type DataProps = {
    timestamp: number
    data: CoinProps[]
}

export type CoinResponse{
  data:CoinProps
}

export type CoinProps = {
  id: string
  rank: string
  symbol: string
  name: string
  supply: string
  maxSupply: string
  marketCapUsd: string
  volumeUsd24Hr: string
  priceUsd: string
  changePercent24Hr: string
  vwap24Hr: string
  explorer: string
}

