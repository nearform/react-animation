import { useEffect, useRef, useState } from 'react'
import { findDOMNode } from 'react-dom'
import T from 'prop-types'

function IntersectionLoader(props) {
  const [value, setValue] = useState(null)
  const ref = useRef()

  useEffect(
    () => {
      const listener = entries => {
        if (entries[0].isIntersecting) {
          setValue(props.value)
        }
      }

      const observer = new IntersectionObserver(
        listener,
        props.intersectionObserverProps
      )

      observer.observe(findDOMNode(ref.current))

      return () => observer.unobserve(findDOMNode(ref.current))
    },
    [ref, props.value]
  )

  return props.children({ value, ref })
}

IntersectionLoader.propTypes = {
  value: T.any.isRequired,
  children: T.node.isRequired,
  intersectionObserverProps: T.object
}

IntersectionLoader.defaultProps = {
  intersectionObserverProps: {}
}

export default IntersectionLoader
