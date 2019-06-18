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

import { useLayoutEffect, useState } from 'react'

export const eventWrapper = methodToCall => () => methodToCall(true)

const usePreloadImage = imageToLoad => {
  const [loaded, setLoaded] = useState(true) // so that it renders on server
  const [errored, setErrored] = useState(false)
  useLayoutEffect(
    () => {
      if (typeof window === 'object' && imageToLoad) {
        setLoaded(false)
        setErrored(false)
        // Add a listener to wait until the preloadImage is ready
        const img = document.createElement('img')
        img.src = imageToLoad
        // On load, or on error, continue to show the component
        img.onload = eventWrapper(setLoaded)
        img.onerror = eventWrapper(setErrored)
      }
    },
    [imageToLoad]
  )
  return [errored, loaded]
}

export default usePreloadImage
