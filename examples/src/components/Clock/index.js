import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import AnimateGroup from '../../../../src/AnimateGroup'
import digits from './digits'

function ClockSegment({ value }) {

  const [ d0, d1 ] = (''+value).padStart( 2, '0')

  return (<span>
    <img src={digits[d0]} />
    <img src={digits[d1]} />
  </span>)
}

const ClockStyle = {
  color: 'red',
  backgroundColor: 'black',
  fontSize: '5em'
}

const pad = v => (''+v).padStart( 2, '0')

function Clock( props ) {

  const {
    animation
  } = props

  const [ hour, setHour ] = useState( 0 )
  const [ mins, setMins ] = useState( 0 )
  const [ secs, setSecs ] = useState( 0 )
  const [ started, setStarted ] = useState( false )

  useEffect( () => {
    if( !started ) {
      const incTime = () => {
        const time = new Date()
        setHour( time.getHours() )
        setMins( time.getMinutes() )
        setSecs( time.getSeconds() )
      }
      incTime()
      setInterval( incTime, 1000 )
      setStarted( true )
    }
  })

  const [ h0, h1 ] = pad( hour )
  const [ m0, m1 ] = pad( mins )
  const [ s0, s1 ] = pad( secs )

  return (<div style={ClockStyle}>
    <AnimateGroup animationIn={`${animation}In`} animationOut={`${animation}Out`}>
      <img key={`h0-${h0}`} src={digits[h0]} align="center" />
      <img key={`h1-${h1}`} src={digits[h1]} align="center" />
      <span key="sep0">:</span>
      <img key={`m0-${m0}`} src={digits[m0]} align="center" />
      <img key={`m1-${m1}`} src={digits[m1]} align="center" />
      <span key="sep1">:</span>
      <img key={`s0-${s0}`} src={digits[s0]} align="center" />
      <img key={`s1-${s1}`} src={digits[s1]} align="center" />
    </AnimateGroup>
  </div>)
}

export default Clock
