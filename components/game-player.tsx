import styles from './game-player.module.css'
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
    <div className={styles['player-frame']}>
      <div className={styles['player']}>
        <video ref={videoRef} className="w-full h-full bg-purple-400" autoPlay={true} playsInline></video>
      </div>
      <div className={styles['player-ctl']}>
        <div className="absolute left-0 top-0 h-full px-2">
          <div className="inline-block p-2">
            <Icon name="toll" className="fill-current text-gray-200" />
          </div>
          <div className="inline-block p-2">
            <Icon name="gamepad" className="fill-current text-gray-200" />
          </div>
        </div>
        <div className="flex justify-center h-full"> 
          <div className="inline-block p-2">
            <Icon name="link" className="fill-current text-gray-200" />
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full px-2">
          <div className="inline-block p-2">
            <Icon name="pause" className="fill-current text-gray-200" />
          </div>
          <div className="inline-block p-2">
            <Icon name="volume-off" className="fill-current text-gray-200" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamePlayer
