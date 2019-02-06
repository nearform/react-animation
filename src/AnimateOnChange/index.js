import React, { useLayoutEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { animations } from '../theme'
import '../theme/keyframes.css'

/**
 * Applies an animation to any changes of child content or components.
 *
 * Properties:
 * animate: { Boolean } Whether to perform the animation (optional)
 * children
 * animationIn: {String} A named animation as defined in the theme animations
 * animationOut: {String} A named animation as defined in the theme animations
 * durationOut: {Number} Time in ms for the out animation (default is 200ms)
 * style: {Object} Custom style rules as required
 */

const AnimateOnChange = ({
  animationIn,
  animationOut,
  children,
  className,
  durationOut,
  style
}) => {
  const [animation, setAnimation] = useState('')
  const [displayContent, setDisplayContent] = useState(children)
  const firstUpdate = useRef(true)

  useLayoutEffect(
    () => {
      // Don't run the effect the first time through
      if (firstUpdate.current) {
        firstUpdate.current = false
        return
      }

      setAnimation('out')
      const timeout = setTimeout(() => {
        setAnimation('in')
        setDisplayContent(children)
      }, durationOut)

      return () => {
        clearTimeout(timeout)
      }
    },
    [children]
  )

  const styles = {
    display: 'inline-block',
    transition: !className && `opacity ${durationOut}ms ease-out`,
    opacity: !className && animation === 'out' ? 0 : 1,
    ...style
  }

  switch (animation) {
    case 'in':
      styles.animation = animations[animationIn] || animationIn
      break
    case 'out':
      styles.animation = animations[animationOut] || animationOut
      break
  }

  return (
    <span
      className={`${className || 'animate-on-change'} ${className ||
        'animate-on-change'}-${animation}`}
      style={styles}
    >
      {displayContent}
    </span>
  )
}

AnimateOnChange.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  durationOut: PropTypes.number,
  animationIn: PropTypes.string,
  animationOut: PropTypes.string,
  style: PropTypes.object
}

AnimateOnChange.defaultProps = {
  durationOut: 200
}

AnimateOnChange.displayName = 'AnimateOnChange'

export default AnimateOnChange
