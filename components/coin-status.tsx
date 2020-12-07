import React, { useEffect, useState } from 'react'

import Icon from './icon'

import styles from './coin-status.module.css'

import coinsIcon from '../public/assets/icons/coins.svg'

interface Props {
  coinsUsedInCharging: number
  chargingStartedAt: number
}

const MAX_COINS = 5
const TIME_TO_CHARGE_IN_SECS = 30 // 10 * 60
const nowInUnixSecs = () => Math.ceil(new Date().getTime() / 1000)
const secsToFormattedTime = (seconds: number) => {
  return new Date(seconds * 1000).toISOString().substr(14, 5)
}

const CoinStatus = (props: Props) => {
  const calcTotalCoins = () => {
    const chargedCoins = Math.floor(
      (nowInUnixSecs() - props.chargingStartedAt) / TIME_TO_CHARGE_IN_SECS
    )
    return Math.min(MAX_COINS - props.coinsUsedInCharging + chargedCoins, MAX_COINS)
  }

  const calcTimeToCharge = () => {
    const elapsed = (nowInUnixSecs() - props.chargingStartedAt) % TIME_TO_CHARGE_IN_SECS
    return TIME_TO_CHARGE_IN_SECS - elapsed
  }

  const [totalCoins, setTotalCoins] = useState(calcTotalCoins())
  const [timeToCharge, setTimeToCharge] = useState(calcTimeToCharge())

  let timerHandler: any
  useEffect(() => {
    if (timerHandler) {
      clearInterval(timerHandler)
    }

    timerHandler = setInterval(() => {
      setTotalCoins(() => calcTotalCoins())
      setTimeToCharge(() => calcTimeToCharge())
    }, 500)

    return () => {
      clearInterval(timerHandler)
    }
  }, [props])

  return (
    <div className={styles.container}>
      <Icon svg={coinsIcon} height='100%' fill='black' />
      <span className={styles.statusWrapper}>
        <span className={styles.coinsBadge}>{totalCoins}</span>
        <span className={styles.timeToCharge}>
          {totalCoins < MAX_COINS ? secsToFormattedTime(timeToCharge) : '-'}
        </span>
      </span>
    </div>
  )
}

export default CoinStatus
