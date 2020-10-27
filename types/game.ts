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
  description: string
  max_players: number
  poster_url: string
  rom_name: string
}

export interface Game {
  id: number
}

export interface Joinable {
  gameId: number
  token: string
}
