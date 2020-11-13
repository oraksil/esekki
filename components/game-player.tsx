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

const blankMediaStream = ({ width = 640, height = 480 } = {}) => {
  const canvas: any = Object.assign(document.createElement('canvas'), { width, height })
  canvas.getContext('2d')?.fillRect(0, 0, width, height)
  const video = Object.assign(canvas.captureStream().getVideoTracks()[0], { enabled: false })

  const ctx = new AudioContext(),
    oscillator = ctx.createOscillator()
  const dst: any = oscillator.connect(ctx.createMediaStreamDestination())
  oscillator.start()
  const audio = Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })

  return new MediaStream([video, audio])
}

const bindMediaStream = (vjsPlayer: videojs.Player, stream: MediaStream) => {
  const videoElem = vjsPlayer.tech({ IWillNotUseThisInPlugins: true }).el() as HTMLVideoElement
  videoElem.srcObject = stream
}

const setupPlayerIMA = (vjsPlayer: videojs.Player, playerVeilSetter: any) => {
  const unveilAndPlay = () => {
    vjsPlayer.load()
    vjsPlayer.play()
    playerVeilSetter(false)
  }

  const player = vjsPlayer as any
  player.ima({
    adTagUrl:
      'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=',
  })

  player.on('nopostroll', () => {
    console.log('nopostroll')
    unveilAndPlay()
  })
  player.on('adserror', () => {
    console.log('adserror')
    unveilAndPlay()
  })
  player.on('adsready', () => {
    console.log('adsready')
    const completeEvents = [google.ima.AdEvent.Type.ALL_ADS_COMPLETED]
    completeEvents.forEach(evtType => {
      player.ima.addEventListener(evtType, () => unveilAndPlay())
    })
  })
}

const GamePlayer = (props: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const [vjsPlayer, setVjsPlayer] = useState<videojs.Player>()
  const [playerVeil, setPlayerVeil] = useState(true)

  useEffect(() => {
    const newPlayer = initVideoJsPlayer(videoRef)

    setupPlayerIMA(newPlayer, setPlayerVeil)

    bindMediaStream(newPlayer, blankMediaStream())

    setVjsPlayer(newPlayer)

    return () => {
      vjsPlayer?.dispose()
    }
  }, [])

  useEffect(() => {
    if (vjsPlayer) {
      if (!props.stream) {
        vjsPlayer.play()
      } else {
        bindMediaStream(vjsPlayer, props.stream)
      }
    }
  }, [vjsPlayer, props.stream])

  return (
    <div className={styles['player-container']}>
      <div className={styles['player-video-wrapper']}>
        <video ref={videoRef} autoPlay={true} playsInline={true}></video>
      </div>
      {playerVeil && <div className={styles['player-veil']} />}
    </div>
  )
}

export default GamePlayer
