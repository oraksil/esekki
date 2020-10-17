import React, { useEffect, useRef } from 'react'

import styles from './game-player.module.css'

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
    <div className={styles['player-container']}>
      <video ref={videoRef} autoPlay={true} playsInline></video>
    </div>
  )
}

export default GamePlayer
