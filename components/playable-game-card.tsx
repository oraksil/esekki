import Link from 'next/link'

const PlayableGameCard = () => {
  return (
    <div>
      <img src="https://i.ytimg.com/vi/IWyS18Yf9J0/hqdefault.jpg" />

      <div>
        <div>
          <Link href="/playing">
            <a>Play Game!</a>
          </Link>
        </div>
        <div>
          <div>
            <span>Game Title</span>
          </div>
          <div>
             <span>Game Producer</span>
          </div>
          <div>
            <span>2</span>
            <span>P</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayableGameCard 
