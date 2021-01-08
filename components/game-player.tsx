import React, { useEffect, useRef, useState, RefObject } from 'react'

import videojs, { VideoJsPlayerOptions } from 'video.js'
import 'videojs-contrib-ads'
import 'videojs-ima'

import styles from './game-player.module.css'

interface Props {
  stream?: MediaStream
  progress: Number
}

const NEED_TO_REFRESH_TIMEOUT = 30 * 1000

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
  const [needToRefresh, setNeedToRefresh] = useState(false)

  useEffect(() => {
    const newPlayer = initVideoJsPlayer(videoRef)

    setVjsPlayer(newPlayer)

    setTimeout(() => {
      setNeedToRefresh(true)
    }, NEED_TO_REFRESH_TIMEOUT)

    return () => {
      vjsPlayer?.dispose()
    }
  }, [])

  useEffect(() => {
    if (vjsPlayer && props.stream) {
      bindMediaStream(vjsPlayer, props.stream)

      vjsPlayer.on('firstplay', () => {
        setPlayerVeil(false)
      })

      vjsPlayer.play()
    }
  }, [vjsPlayer, props.stream])

  useEffect(() => {}, [props.progress])

  const progressElem = !needToRefresh ? (
    <span>Loading... {props.progress}%</span>
  ) : (
    <span style={{ cursor: 'pointer' }} onClick={() => window.location.reload(true)}>
      <u>Please retry to refresh browser.</u>
    </span>
  )

  return (
    <div className={styles.playerContainer}>
      <div className={styles.playerVideoWrapper}>
        <video ref={videoRef} autoPlay={true} playsInline={true}></video>
      </div>
      {playerVeil && <div className={styles.playerVeil}>{progressElem}</div>}
    </div>
  )
}

export default GamePlayer
