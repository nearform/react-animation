import React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import LazyLoad from 'react-lazyload'
import { AnimateOnChange, HideUntilLoaded } from '../../src'
import './styles/normalize.css'
import './styles/global.css'

const DemoPage = ({ className }) => {
  return (
    <section className={className}>
      <div className="page-content">
        <h1>UI Animation Helpers</h1>
        <p>A description of the package.</p>
        <h2>Usage</h2>
        <p>Usage instructions</p>
        <h2>Components</h2>
        <p>Summary of what this is</p>

        <h3>AnimateOnChange</h3>
        <LazyLoad>
          <div className="example">
            <pre>
              <code>Exermple code</code>
            </pre>
            <div>
              <AnimateOnChange style={{ display: 'block' }}>
                Value to change
              </AnimateOnChange>
            </div>
          </div>
        </LazyLoad>
        <h3>HideUntilLoaded</h3>
        <pre>
          <code>Example code</code>
        </pre>
        <HideUntilLoaded imageToLoad="url">
          Show this when loaded
        </HideUntilLoaded>
        <p>
          Note: Use IntersectionObserver to trigger all the animations when
          visible
        </p>
        <pre>
          <code>Example code</code>
        </pre>
        <h2>Animations</h2>
        <p>Summary of what this is</p>
        <h3>popIn</h3>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
        <p>etc</p>
      </div>
    </section>
  )
}

const StyledDemoPage = styled(DemoPage)`
  display: flex;
  justify-content: center;

  .page-content {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    box-shadow: 10px 10px 160px rgba(0, 0, 0, 0.4);
    margin: 40px;
    max-width: 800px;
    padding: 20px;
    width: 100%;
  }

  .example {
    background: #fff;
    border-radius: 12px;
    box-shadow: 10px 10px 60px rgba(0, 0, 0, 0.1);
    display: flex;
    padding: 10px 20px;
    margin: 0 -40px;
    align-items: center;

    > pre {
      align-items: center;
      background-color: rgba(23, 55, 175, 0.1);
      border-radius: 8px;
      display: flex;
      min-height: 150px;
      padding: 10px 20px;
      width: 50%;
    }

    > div {
      display: flex;
      justify-content: center;
      width: 50%;
    }
  }
`

render(<StyledDemoPage />, document.getElementById('root'))
