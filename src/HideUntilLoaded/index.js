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
import PropTypes from 'prop-types'
import usePreloadImage from '../hooks/usePreloadImage'
import { animations, easings } from '../theme'
import styled, { css } from 'styled-components'

/**
 * Animates in a component once an image has loaded.
 *
 * Properties:
 * children
 * animationIn: {String} A named animation as defined in the theme animations
 * Spinner: {Component} An optional spinner component
 * imageToLoad: {String} A URL of the image being loaded
 * style: {Object} Custom style rules as required
 */

const HideUntilLoaded = ({
  animationIn,
  children,
  Spinner,
  imageToLoad,
  style
}) => {
  const [errored, loaded] = usePreloadImage(imageToLoad)

  const Container = styled.span`
    display:  'inline-block'
    position: 'relative'
    ${style}`

  const notLoaded = (!loaded && !errored)

  const Content = styled.div`
    transition: 'none'
    opacity:    ${notLoaded && imageToLoad ? 0 : animationIn ? null : 1}
    visibility: ${notLoaded && imageToLoad ? 'hidden' : null}
    animation:  ${!notLoaded && imageToLoad && animationIn ? animations[animationIn] || animationIn : null}
    transition: ${!notLoaded && imageToLoad && !animationIn ? 'opacity 500ms ease-out' : null}
    `
    const SpinnerContainer = styled.div`
      position:   'absolute'
      left:       '50%'
      top:        '50%'
      transition: 'opacity 500ms ease-out, transform 0.5s ${easings.easeInOutBack}
      opacity:    ${notLoaded ? 1 : 0}
      transform:  ${notLoaded ? 'translate(-50%, -50%)' : 'translate(-50%, -50%) scale(0.8)'}
    `
  return (
      <Container>
        <Content className="hide-until-loaded-content">
          {children}
        </Content>
        {Spinner && (
          <SpinnerContainer className="hide-until-loaded-spinner">
            <Spinner />
          </SpinnerContainer>
        )}
      </Container>
  )
}

HideUntilLoaded.propTypes = {
  animationIn: PropTypes.string,
  children: PropTypes.any.isRequired,
  imageToLoad: PropTypes.string.isRequired,
  Spinner: PropTypes.any,
  style: PropTypes.object
}

HideUntilLoaded.displayName = 'HideUntilLoaded'

export default HideUntilLoaded
