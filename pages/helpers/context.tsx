import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../redux/store'
import { getPlayer } from '../../redux/common/actions'

const { Provider } = React.createContext({})

export const PlayerResolver = (props: any) => {
  const dispatch = useDispatch()

  const player = useSelector((state: RootState) => state.common.player)

  useEffect(() =>{
    if (!player.loaded && !player.current) {
      dispatch(getPlayer())
    }
  }, [])

  return <Provider value={{}}>{props.children}</Provider>
}

