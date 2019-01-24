import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { easings } from '../../../../src'

const ShadowCircle = ({ className, duration }) => {
  const circleRef = useRef()
  const shadowCircleCount = 42
  const shadowCircles = []
  for (let i = 0; i < shadowCircleCount; i++) {
    shadowCircles.push(`${className.split(' ')[1]}-shadow-${i}`)
  }
  useEffect(() => {
    const drawShadow = () => {
      if (!circleRef.current) return
      const newCircleId = shadowCircles.pop()
      const position = circleRef.current.getBoundingClientRect()
      document.getElementById(newCircleId).style.left = position.left + 'px'
      document.getElementById(newCircleId).style.animationPlayState = 'running'
    }
    let start = 0
    let mark = 0
    drawShadow(0)
    const drawShadows = timestamp => {
      if (!start) start = timestamp
      if (timestamp - start > duration - duration / shadowCircleCount) return
      if (!mark) mark = timestamp
      const timeBetween = timestamp - mark
      if (timeBetween >= duration / shadowCircleCount) {
        drawShadow()
        mark = 0
      }
      if (shadowCircles.length) {
        window.requestAnimationFrame(drawShadows)
      }
    }
    window.requestAnimationFrame(drawShadows)
  })
  return (
    <div className={className}>
      {shadowCircles.map(id => (
        <div className="shadowCircle" id={id} key={id} />
      ))}
      <div className="circle" ref={circleRef} />
    </div>
  )
}

ShadowCircle.propTypes = {
  className: PropTypes.string,
  duration: PropTypes.number
}

const move = keyframes`
  0% {
    transform: none;
  }
  100% {
    transform: translateX(500px);
  }
`

const fade = keyframes`
  0% {
    opacity: 0;
  }
  1%, 30% {
    opacity 0.2;
  }
  60%, 100% {
    opacity: 0;
  }
`

const StyledShadowCircle = styled(ShadowCircle)`
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 10px;
  display: block;
  margin: 20px;
  width: 560px;

  .circle,
  .shadowCircle {
    animation: ${move} ${props => props.duration}ms
      ${props => easings[props.easingName]} infinite alternate;
    background: rgba(255, 0, 0, 0.5);
    border-radius: 50%;
    height: 40px;
    width: 40px;
  }
  .shadowCircle {
    animation: ${fade} ${props => props.duration * 2}ms
      ${props => easings[props.easingName]} infinite;
    animation-play-state: paused;
    background-color: #ccc;
    border: 1px solid #888;
    left: 0;
    opacity: 0;
    position: absolute;
  }
`

StyledShadowCircle.propTypes = {
  easingName: PropTypes.string,
  ...ShadowCircle.propTypes
}

StyledShadowCircle.defaultProps = {
  duration: 2000
}

StyledShadowCircle.displayName = 'ShadowCircle'

export default StyledShadowCircle
