import Link from 'next/link'

const JoinableGameCard = () => {
  return (
    <div>
      <div>
        <div>
          <Link href="/playing">
            <a>Join Game!</a>
          </Link>
        </div>      

        <img src="https://i.ytimg.com/vi/IWyS18Yf9J0/hqdefault.jpg" />

        <div>
          <div>
            <span>Game Title</span>
          </div>
          <div>
            <span>1</span>
            <span>/</span>
            <span>2</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JoinableGameCard
