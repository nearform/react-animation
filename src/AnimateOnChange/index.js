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
  animate,
  animationIn,
  animationOut,
  children,
  durationOut,
  manual,
  style
}) => {
  const [animation, setAnimation] = useState('')
  const [displayContent, setDisplayContent] = useState(children)
  const firstUpdate = useRef(true)

  useLayoutEffect(
    () => {
      // Don't run the effect the first time through
      if (firstUpdate.current && !animate) {
        firstUpdate.current = false
        return
      }

      if (animate && !firstUpdate.current) {
        setDisplayContent(children)
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
    transition: `opacity ${durationOut}ms ease-out`,
    opacity: animation === 'out' ? 0 : 1,
    ...style
  }

  switch (animation) {
    case 'in':
      styles.animation = animationIn ? animations[animationIn] : undefined
      break
    case 'out':
      styles.animation = animationOut ? animations[animationOut] : undefined
      break
  }

  return <span style={styles}>{displayContent}</span>
}

AnimateOnChange.propTypes = {
  animate: PropTypes.bool,
  children: PropTypes.any.isRequired,
  durationOut: PropTypes.number,
  animationIn: PropTypes.string,
  animationOut: PropTypes.string,
  manual: PropTypes.bool,
  style: PropTypes.object
}

AnimateOnChange.defaultProps = {
  durationOut: 200
}

AnimateOnChange.displayName = 'AnimateOnChange'

export default AnimateOnChange
