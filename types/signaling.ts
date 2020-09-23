export type SdpInfo = {
  peer_id: number
  sdp: string
}

export type IceCandidate = {
  seq: number
  peer_id: number
  ice: string
}
