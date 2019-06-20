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

import { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
    visibility: hidden;
  }
  to {
    opacity: 1;
    visibility: visible;
  }
`

const fadeOut = keyframes`
  from {
    opacity: 1;
    visibility: visible;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
`

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10em);
    visibility: hidden;
  }
  to {
    opacity: 1;
    transform: none;
    visibility: visible;
  }
`

const popIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: none;
  }
`

const popOut = keyframes`
  0% {
    opacity: 1;
    transform: none;
  }
  99% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
`

const slideIn = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: none;
  }
`

const slideOut = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
`

export default { fadeIn, fadeOut, fadeInUp, popIn, popOut, slideIn, slideOut }

