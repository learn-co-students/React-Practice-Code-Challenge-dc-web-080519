import React from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  const fillSushis = () => {
    return props.sushis.map(sushi => {
      return <Sushi key={sushi.id} eatSushi={props.eatSushi} {...sushi} />
    })
  }

  return (
    <div className="belt">
      { fillSushis() }
      <MoreButton moreSushi={props.moreSushi}/>
    </div>
  )
}

export default SushiContainer