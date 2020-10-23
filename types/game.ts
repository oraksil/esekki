export interface Player {
  id: number
  name: string
  hash: string
}

export interface Game {
  id: number
}

export interface Joinable {
  gameId: number
  token: string
}
