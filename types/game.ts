export interface Player {
  id: number
  name: string
  hash: string
  lastCoins: number
  lastCoinsUsedAt: number
}

export interface Pack {
  id: number
  status: string
  title: string
  maker: string
  description: string
  maxPlayers: number
  posterUrl: string
  romName: string
}

export interface Game {
  id: number
}

export interface Joinable {
  gameId: number
  token: string
  username: string
  password: string
}
