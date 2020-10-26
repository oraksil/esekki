export interface Player {
  id: number
  name: string
  hash: string
}

export interface Pack {
  id: number
  status: string
  title: string
  maker: string
  desc: string
  maxPlayer: number
}

export interface Game {
  id: number
}

export interface Joinable {
  gameId: number
  token: string
}
