import React, { useEffect, useRef, useState, RefObject } from 'react'

import videojs, { VideoJsPlayerOptions } from 'video.js'

import styles from './game-player.module.css'

interface Props {
  stream?: MediaStream
}

const setupVideoJsPlayer = (videoRef: RefObject<HTMLVideoElement>, vjPlayerSetter: any) => {
  const vjOpts: VideoJsPlayerOptions = {
    autoplay: true,
    controls: false,
    controlBar: false,
  }

  const onPlayerReady = () => {
    console.log('player ready')
  }

  vjPlayerSetter(videojs(videoRef.current, vjOpts, onPlayerReady))
}

const GamePlayer = (props: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const [vjPlayer, setVjPlayer] = useState<videojs.Player>()

  const bindMediaStream = (player: videojs.Player, stream: MediaStream) => {
    const videoElem = player.tech({ IWillNotUseThisInPlugins: true }).el() as HTMLVideoElement
    videoElem.srcObject = stream
  }

  useEffect(() => {
    setupVideoJsPlayer(videoRef, setVjPlayer)
    return () => {
      vjPlayer?.dispose()
    }
  }, [])

  useEffect(() => {
    if (vjPlayer && props.stream) {
      bindMediaStream(vjPlayer, props.stream)
      vjPlayer.volume(0.2)
    }
  }, [vjPlayer, props.stream])

  return (
    <div className={styles['player-container']}>
      <video ref={videoRef} autoPlay={true} playsInline></video>
    </div>
  )
}

export default GamePlayer
