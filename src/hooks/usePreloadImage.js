import { useLayoutEffect, useState } from 'react'

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
        img.onload = () => setLoaded(true)
        img.onerror = () => setErrored(true)
      }
    },
    [imageToLoad]
  )
  return [errored, loaded]
}

export default usePreloadImage
