import React from 'react'
import { DetailProvider } from '../../Context/detailContext'
import Detail from './detail'

function DetailMain() {
  return (
    <DetailProvider>
        <Detail/>
    </DetailProvider>
  )
}

export default DetailMain