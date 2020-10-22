export type Player = {
  id: number
  name: string
  hash: string
}

export type Game = {
  id: number
}

export type Joinable = {
  game: Game
  token: string
}
