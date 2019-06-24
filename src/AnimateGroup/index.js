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

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {
  Transition,
  TransitionGroup,
} from 'react-transition-group'
import { animations } from '../theme'
import '../theme/keyframes.css'

const cssPrefixes = ['','-webkit-']
const css = ( name, styles ) => cssPrefixes.reduce( ( s, p ) => s+ `${p}${name}: ${styles}; `, '')

/**
 * Animate a group or list of components.
 * Animations are applied as components are added to or removed from the group.
 * NOTE: Child keys are necessary for animations to work correctly.
 */
function AnimateGroup( props ) {

  const {
    // Convenience property for setting animationIn and animationOut
    // at once; e.g. setting animation="slide" is equivalent to
    // animationIn="slideIn" animationOut="slideOut"
    animation,
    // Name of animation used when adding a new component.
    // See theme/index.js for animation names.
    animationIn = animation+'In',
    // Name of animation used when removing an existing component.
    animationOut = animation+'Out',
    // The CSS class name to apply to the group container.
    className,
    // Transition out duration.
    durationOut,
    // The group children.
    children
  } = props

  const transition      = `transition: opacity ${durationOut}ms ease-out`
  const animationInCSS  = animations[animationIn]  || animationIn
  const animationOutCSS = animations[animationOut] || animationOut

  const childState = {
    entering: node => node.style = 'display: none',
    entered:  node => node.style = `${transition}; opacity: 1; ${css('animation',animationInCSS)}`,
    exiting:  node => node.style = `${transition}; opacity: 0; ${css('animation',animationOutCSS)}`,
    exited:   node => node.style = `${transition}; opacity: 0; ${css('animation',animationOutCSS)}`
  }

  const groupChildren = React.Children.toArray(children).map(child => {
    const { key } = child
    return (<Transition
      key={key}
      timeout={500}
      onEntering={childState.entering}
      onEntered={childState.entered}
      onExiting={childState.exiting}
      onExited={childState.exited}
    >
      {child}
    </Transition>)
    })

    return (<TransitionGroup className={className}>
      {groupChildren}
    </TransitionGroup>)
}

AnimateGroup.propTypes = {
  children:     PropTypes.any.isRequired,
  className:    PropTypes.string,
  durationOut:  PropTypes.number,
  animation:    PropTypes.string,
  animationIn:  PropTypes.string,
  animationOut: PropTypes.string
}

AnimateGroup.defaultProps = {
  animation:    'fade',
  durationOut:  200
}

AnimateGroup.displayName = 'AnimateGroup'

export default AnimateGroup
