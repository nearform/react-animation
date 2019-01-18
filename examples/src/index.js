import React from 'react'
import { render } from 'react-dom'
import { AnimateOnChange, HideUntilLoaded } from '../../src'

const App = () => (
  <div>
    <p>
      <em>This is very much a WIP - proper content to follow</em>
    </p>
    <h1>UI Animation Helpers</h1>
    <p>A description of the package.</p>
    <h2>Usage</h2>
    <p>Usage instructions</p>
    <h2>Components</h2>
    <p>Summary of what this is</p>
    <h3>AnimateOnChange</h3>
    <pre>
      <code>Example code</code>
    </pre>
    <AnimateOnChange>Value to change</AnimateOnChange>
    <h3>HideUntilLoaded</h3>
    <pre>
      <code>Example code</code>
    </pre>
    <HideUntilLoaded imageToLoad="url">Show this when loaded</HideUntilLoaded>
    <p>
      Note: Use IntersectionObserver to trigger all the animations when visible
    </p>
    <pre>
      <code>Example code</code>
    </pre>
    <h2>Animations</h2>
    <p>Summary of what this is</p>
    <h3>popIn</h3>
    <p>etc</p>
  </div>
)

render(<App />, document.getElementById('root'))
