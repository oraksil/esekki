import Link from 'next/link'
import styles from './cardboard.module.css'

import { RootState } from '../redux/store'

import { useSelector, useDispatch } from 'react-redux'

const PlayableGameCard = () => {
    const packs = useSelector((state: RootState) => state.common.packs)
    return (
        <div className={styles['cardboard']}>
            <img
                className={styles['poster-img']}
                src="https://i.ytimg.com/vi/IWyS18Yf9J0/hqdefault.jpg"
            />

            <div>
                <div className={styles['pack-profile']}>
                    <div>
                        <span className={styles['game-title']}>
                            {packs[0].title}
                        </span>
                    </div>
                    <div>
                        <span className={styles['game-manufacturer']}>
                            Game Producer
                        </span>
                    </div>
                    <Link href="/playing">
                        <button className={styles['btn-play']}>
                            {/* <img src="https://www.freepnglogos.com/uploads/play-button-png/icon-png-play-button-icons-and-png-backgrounds-24.png" /> */}
                            <span>PLAY GAME</span>
                        </button>
                    </Link>
                    {/* <div> */}
                    {/* <span>2</span> */}
                    {/* <span>P</span> */}
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default PlayableGameCard
