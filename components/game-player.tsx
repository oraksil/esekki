import React, { useEffect, useRef, useState, RefObject } from 'react'

import videojs, { VideoJsPlayerOptions } from 'video.js'
import 'videojs-contrib-ads'
import 'videojs-ima'

import styles from './game-player.module.css'

interface Props {
  stream?: MediaStream
}

const initVideoJsPlayer = (videoRef: RefObject<HTMLVideoElement>, vjPlayerSetter: any) => {
  const vjOpts: VideoJsPlayerOptions = {
    autoplay: true,
    controls: false,
  }

  const onPlayerReady = () => {
    console.log('player ready')
  }

  vjPlayerSetter(videojs(videoRef.current, vjOpts, onPlayerReady))
}

const bindMediaStream = (player: videojs.Player, stream: MediaStream) => {
  const videoElem = player.tech({ IWillNotUseThisInPlugins: true }).el() as HTMLVideoElement
  videoElem.srcObject = stream
  player.volume(0.2)
}

const setupPlayerIMA = (vjPlayer: videojs.Player) => {
  const player = vjPlayer as any
  player?.ima({
    adTagUrl:
      'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=',
  })

  player?.on('adsready', () => {
    const completeEvents = [google.ima.AdEvent.Type.ALL_ADS_COMPLETED]
    completeEvents.forEach(evtType => {
      player.ima.addEventListener(evtType, () => {
        vjPlayer.load()
        vjPlayer.play()
      })
    })
  })
}

const GamePlayer = (props: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const [vjPlayer, setVjPlayer] = useState<videojs.Player>()

  useEffect(() => {
    initVideoJsPlayer(videoRef, setVjPlayer)
    return () => {
      vjPlayer?.dispose()
    }
  }, [])

  useEffect(() => {
    if (vjPlayer && props.stream) {
      bindMediaStream(vjPlayer, props.stream)

      setupPlayerIMA(vjPlayer)
    }
  }, [vjPlayer, props.stream])

  return (
    <div className={styles['player-container']}>
      <video ref={videoRef} autoPlay={true} playsInline></video>
    </div>
  )
}

export default GamePlayer
