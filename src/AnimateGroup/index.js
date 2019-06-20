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
//import '../theme/keyframes.css'
import { css } from 'styled-components'

/**
 * Animate a group or list of components.
 * Animations are applied as components are added to or removed from the group.
 * NOTE: Child keys are necessary for animations to work correctly.
 */
function AnimateGroup( props ) {

  const {
    // Name of animation used when adding a new component.
    // See theme/index.js for animation names.
    animationIn,
    // Name of animation used when removing an existing component.
    animationOut,
    // The CSS class name to apply to the group container.
    className,
    // Transition out duration.
    durationOut,
    // The group children.
    children
  } = props

  const transition = `transition: opacity ${durationOut}ms ease-out`; 
  const childState = {
    hidden: node => node.style = 'display: none',
    in:     node => node.style = css`${transition}; opacity: 1; animation: ${animations[animationIn] || animationIn}`,
    out:    node => node.style = css`${transition}; opacity: 0; animation: ${animations[animationOut] || animationOut}`
  }

  const groupChildren = React.Children.toArray(children).map(child => {
    const { key } = child
    return (<Transition
      key={key}
      timeout={500}
      onEntering={childState.hidden}
      onEntered={childState.in}
      onExiting={childState.out}
      onExited={childState.out}
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
  animationIn:  PropTypes.string,
  animationOut: PropTypes.string
}

AnimateGroup.defaultProps = {
  animationIn:  'fadeIn',
  animationOut: 'fadeOut',
  durationOut:  200
}

AnimateGroup.displayName = 'AnimateGroup'

export default AnimateGroup
