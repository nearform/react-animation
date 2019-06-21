/*
 * Copyright 2019 NearForm Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect, useState, useRef } from 'react'
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

  useEffect(
    () => {
      // Don't run the effect the first time through
      if (firstUpdate.current) {
        firstUpdate.current = false
        return
      }
      setAnimation('out')
    },
    [children]
  )

  const showDisplayContent = () => {
    if (animation === 'out') {
      setAnimation('in')
      setDisplayContent(children)
    }
  }

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

  const baseClassName = className || 'animate-on-change'
  return (
    <span
      onTransitionEnd={showDisplayContent}
      onAnimationEnd={showDisplayContent}
      className={`${baseClassName} ${baseClassName}-${animation}`}
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
