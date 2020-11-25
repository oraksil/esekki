import React, { useEffect, useRef, useState, RefObject } from 'react'

import videojs, { VideoJsPlayerOptions } from 'video.js'
import 'videojs-contrib-ads'
import 'videojs-ima'

import styles from './game-player.module.css'

interface Props {
  stream?: MediaStream
}

const initVideoJsPlayer = (videoRef: RefObject<HTMLVideoElement>) => {
  const vjsOpts: VideoJsPlayerOptions = {
    autoplay: 'any',
    controls: false,
  }

  const onPlayerReady = () => {
    console.log('player ready')
  }

  return videojs(videoRef.current, vjsOpts, onPlayerReady)
}

const bindMediaStream = (vjsPlayer: videojs.Player, stream: MediaStream) => {
  const videoElem = vjsPlayer.tech({ IWillNotUseThisInPlugins: true }).el() as HTMLVideoElement
  videoElem.srcObject = stream
}

const GamePlayer = (props: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const [vjsPlayer, setVjsPlayer] = useState<videojs.Player>()
  const [playerVeil, setPlayerVeil] = useState(true)

  useEffect(() => {
    const newPlayer = initVideoJsPlayer(videoRef)

    setVjsPlayer(newPlayer)

    return () => {
      vjsPlayer?.dispose()
    }
  }, [])

  useEffect(() => {
    if (vjsPlayer && props.stream) {
      bindMediaStream(vjsPlayer, props.stream)
      vjsPlayer.play()
      setPlayerVeil(false)
    }
  }, [vjsPlayer, props.stream])

  return (
    <div className={styles.playerContainer}>
      <div className={styles.playerVideoWrapper}>
        <video ref={videoRef} autoPlay={true} playsInline={true}></video>
      </div>
      {playerVeil && <div className={styles.playerVeil}>Loading...</div>}
    </div>
  )
}

export default GamePlayer
