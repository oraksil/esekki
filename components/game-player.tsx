import Icon from './icon'
import React, { useEffect, useRef } from 'react'

interface Props {
  stream?: MediaStream
}

const GamePlayer = (props: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (props.stream && videoRef.current) {
      const node = videoRef.current
      node.srcObject = props.stream
      node.volume = 0.2
      node.play()
    }
  }, [props.stream])

  return (
    <div>
      <div>
        <video ref={videoRef}autoPlay={true} playsInline></video>
      </div>
      <div>
        <div>
          <Icon name="toll" />
          <Icon name="gamepad" />
        </div>
        <div> 
          <Icon name="link" />
        </div>
        <div>
          <Icon name="pause" />
          <Icon name="volume-off" />
        </div>
      </div>
    </div>
  )
}

export default GamePlayer
