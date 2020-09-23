export namespace WebRTCSession {
  var peer!: RTCPeerConnection
  var data!: RTCDataChannel
  var stream!: MediaStream

  export const setPeerConnection = (pc: RTCPeerConnection) => {
    peer = pc
  }

  export const setDataChannel = (dc: RTCDataChannel) => {
    data = dc
  }

  export const setMediaStream = (s: MediaStream) => {
    stream = s
  }
}


