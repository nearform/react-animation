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
import {
  Transition,
  TransitionGroup,
} from 'react-transition-group'
import { animations } from '../theme'

function AnimateGroup( props ) {

  const {
    animationIn,
    animationOut,
    groupClassName,
    duration = 500,
    children
  } = props

  const transitions = {
    in:  node => node.style = `animation: ${animations[animationIn] || animationIn}`,
    out: node => node.style = `animation: ${animations[animationOut] || animationOut}`
  }

  const groupChildren = children.map(child => {
    const { key } = child
    return (<Transition
      key={key}
      timeout={duration}
      onEntering={transitions.in}
      onEntered={transitions.in}
      onExiting={transitions.out}
      onExited={transitions.out}
    >
      {child}
    </Transition>)
    })

    return (<TransitionGroup className={groupClassName}>
      {groupChildren}
    </TransitionGroup>)
}

export default AnimateGroup
