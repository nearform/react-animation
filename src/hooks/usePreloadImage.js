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
