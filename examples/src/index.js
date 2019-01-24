import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LazyLoad from 'react-lazyload'
// import ShadowCircle from './components/ShadowCircle'
import GithubIcon from './components/GithubIcon'
import {
  AnimateOnChange,
  HideUntilLoaded,
  animations
  // easings
} from '../../src'
import './styles/normalize.css'
import './styles/global.css'

const words = [
  'Awesome',
  'Brilliant',
  'Handy',
  'Cool',
  'Perfect',
  'Effective',
  '👌',
  'Sensational',
  'Great',
  'Party 🎉',
  'Wow'
]

const animationNames = Object.keys(animations)

// const easingNames = Object.keys(easings)

const emojis = ['👌', '🎉', '😋', '🤩', '😻', '✨', '😍', '👍', '💥']

const getRandomFrom = array => array[Math.floor(Math.random() * array.length)]

const HideUntilLoadedWrapper = props => {
  const generateRandomPictureURL = () =>
    `https://loremflickr.com/1000/600?random&${Math.floor(Math.random() * 99) +
      1}`

  const [randomPictureURL, setRandomPictureURL] = useState(
    generateRandomPictureURL()
  )

  return (
    <div>
      <HideUntilLoaded {...props} imageToLoad={randomPictureURL}>
        <div>
          <div
            className="example-hul-image"
            style={{
              backgroundImage: `url(${randomPictureURL})`
            }}
          />
        </div>
      </HideUntilLoaded>
      <p
        className="example-hul-load"
        onClick={() => setRandomPictureURL(generateRandomPictureURL())}
      >
        Try again
      </p>
    </div>
  )
}

const AnimatedBox = ({ animationName, className }) => (
  <div className={`example-animation ${className}`}>
    <div className="example-animation-box" />
    <p>{animationName}</p>
  </div>
)

AnimatedBox.propTypes = {
  animationName: PropTypes.string,
  className: PropTypes.string
}

const StyledAnimatedBox = styled(AnimatedBox)`
  &:hover {
    .example-animation-box {
      animation: ${props => animations[props.animationName]};
      animation-delay: 200ms;
    }
  }

  .example-animation-box {
    animationDuration: '1000ms';

  }
}
`

const DemoPage = ({ className }) => {
  const [randomWord, setRandomWord] = useState(getRandomFrom(words))
  const [randomEmoji, setRandomEmoji] = useState(getRandomFrom(emojis))

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setRandomWord(getRandomFrom(words))
      setRandomEmoji(getRandomFrom(emojis))
    }, 2000)
    return () => {
      clearInterval(wordInterval)
    }
  })
  return (
    <div>
      <section className={className}>
        <div className="page-content">
          <h1>
            UI Animation Helpers{' '}
            <AnimateOnChange animationOut="bounceOut" animationIn="bounceIn">
              {randomEmoji}
            </AnimateOnChange>
          </h1>
          <p>
            A helpful package containing components and animation styles for
            when you want to add animation to an element, animate when something
            changes, hold off displaying a component until it's image has
            loaded, or even just if you need a consistent set of animation
            timing functions.
          </p>
        </div>
        <div className="page-content">
          <h2>Installation</h2>
          <p>
            <code>npm install ui-animation-helpers</code>
          </p>
        </div>
        <div className="page-content">
          <h2>AnimateOnChange Component</h2>
          <p>
            <code>
              import {`{ AnimateOnChange }`} from 'ui-animation-helpers'
            </code>
          </p>
          <p>
            The <code>AnimateOnChange</code> component waits for a change to any
            children and then creates a smooth transition between the old and
            new children states.
          </p>
          <h3>Default animation (fade)</h3>
          <p>
            It will fade out old content and fade in the new content when the
            content changes. This could be a number or string or any child
            components.
          </p>
          <LazyLoad height={200}>
            <div className="example">
              <pre>
                <code>{`<AnimateOnChange>
  ${randomWord}
</AnimateOnChange>`}</code>
              </pre>
              <div className="example-aoc-default">
                <AnimateOnChange>{randomWord}</AnimateOnChange>
              </div>
            </div>
          </LazyLoad>
          <h3>durationOut</h3>
          <p>
            You can control how long the animation takes using the{' '}
            <code>durationOut</code> property. By default it is <code>200</code>{' '}
            (milliseconds).
          </p>
          <LazyLoad height={200}>
            <div className="example">
              <pre>
                <code>{`
<AnimateOnChange
  durationOut="1000"
>
  ${randomWord}
</AnimateOnChange>`}</code>
              </pre>
              <div className="example-aoc-slow">
                <AnimateOnChange durationOut={1000}>
                  {randomWord}
                </AnimateOnChange>
              </div>
            </div>
          </LazyLoad>

          <h3>animationIn / animationOut</h3>
          <p>
            By passing in <code>animationIn</code> and <code>animationOut</code>{' '}
            we can change the fade animation to any others defined in the{' '}
            <code>animations</code> object.
          </p>
          <LazyLoad height={200}>
            <div className="example">
              <pre>
                <code>{`So very…
<AnimateOnChange
  animationIn="bounceIn"
  animationOut="bounceOut"
  durationOut={500}
>
  ${randomWord}
</AnimateOnChange>`}</code>
              </pre>
              <div className="example-aoc-animations">
                <div>
                  So very&hellip;{' '}
                  <span className="example-aoc-animations-text">
                    <AnimateOnChange
                      animationIn="bounceIn"
                      animationOut="bounceOut"
                      durationOut={500}
                    >
                      {randomWord}
                    </AnimateOnChange>
                  </span>
                </div>
              </div>
            </div>
          </LazyLoad>
          <p>
            Content is styled as <code>inline-block</code> by default but you
            can overwrite that by passing an optional <code>style</code> object.
          </p>
          <p>Find all the available animations listed under Animations.</p>
        </div>
        <div className="page-content">
          <h2>HideUntilLoaded Component</h2>
          <p>
            <code>
              import {`{ HideUntilLoaded }`} from 'ui-animation-helpers'
            </code>
          </p>
          <p>
            Nobody likes a half-downloaded image appearing when rendering our
            UI. This component helps by hiding any children content until a
            specified image has finished downloading.
          </p>

          <LazyLoad height={200}>
            <div className="example">
              <pre>
                <code>{`<HideUntilLoaded
  imageToLoad="https://picsum.photos/2200/1200/"
>
  ... your content ...
</HideUntilLoaded>`}</code>
              </pre>
              <div className="example-hul-default">
                <div>
                  <HideUntilLoadedWrapper />
                </div>
              </div>
            </div>
          </LazyLoad>
          <p>
            By default this will fade-in the content once the image referenced
            by url <code>imageToLoad</code> has finished loading.
          </p>

          <h3>Spinner</h3>
          <p>
            You can pass in your own component to act as a loading state - it
            will be shown until the image has loaded.
          </p>
          <LazyLoad height={200}>
            <div className="example">
              <pre>
                <code>{`<HideUntilLoaded
  imageToLoad="https://picsum.photos/2200/1200/"
  Spinner={() => <div>Loading...</div>}
>
  ... your content ...
</HideUntilLoaded>`}</code>
              </pre>
              <div className="example-hul-spinner">
                <div>
                  <HideUntilLoadedWrapper
                    Spinner={() => <div>Loading...</div>}
                  />
                </div>
              </div>
            </div>
          </LazyLoad>
          <p>
            By default this will fade-in the content once the image referenced
            by url <code>imageToLoad</code> has finished loading.
          </p>

          <h3>animationIn</h3>
          <p>
            Give the <code>HideUntilLoaded</code> component a named animation
            and it'll apply that.
          </p>
          <LazyLoad height={200}>
            <div className="example">
              <pre>
                <code>{`<HideUntilLoaded
  animationIn="bounceIn"
  imageToLoad="https://picsum.photos/2200/1200/"
  Spinner={() => <div>Loading...</div>}
>
  ... your content ...
</HideUntilLoaded>`}</code>
              </pre>
              <div className="example-hul-spinner">
                <div>
                  <HideUntilLoadedWrapper
                    animationIn="bounceIn"
                    Spinner={() => <div>Loading...</div>}
                  />
                </div>
              </div>
            </div>
          </LazyLoad>
          <p>The available animation names are defined next...</p>
        </div>
        <div className="page-content">
          <h2>Animations</h2>
          <p>
            <code>import {`{ animations }`} from 'ui-animation-helpers'</code>
          </p>
          <p>
            You will find a set of animations included with this repo. They come
            with their own keyframes which are added by the helper components.
            If you wish to use the animations in your styling, be sure to import
            the keyframes also using{' '}
            <code>import 'ui-animation-helpers/theme/keyframes.css'</code>.
          </p>
          <p>
            Animations can be applied to your styling in animation properties
            such as <code>{`style={{animation: animations.popIn}}`}</code>
          </p>
          <p>
            You could use them on components, or even use them on pages to have
            each page fade-in, for example.
          </p>
          <p>Hover over each example to see it in action.</p>
          <div className="example-animation-container">
            {animationNames.map(animationName => (
              <StyledAnimatedBox
                animationName={animationName}
                key={animationName}
              />
            ))}
          </div>
        </div>
        <p className="copyright">
          Made with{' '}
          <AnimateOnChange animationOut="bounceOut" animationIn="bounceIn">
            {randomEmoji}
          </AnimateOnChange>{' '}
          by <a href="https://nearform.com">NearForm</a>
        </p>
      </section>
      <div className="github-icon">
        <a href="https://github.com/nearform/ui-animation-helpers">
          <GithubIcon />
        </a>
      </div>
    </div>
  )
}

/*
Removing the easings bit for now

<div className="page-content">
  <h2>Easings (timing functions)</h2>
  <p>
    <code>import {`{ easings }`} from 'ui-animation-helpers'</code>
  </p>
  {easingNames.map(easingName => (
    <div className="example-easing" key={easingName}>
      {easingName}
      <LazyLoad
        height={200}
        unmountIfInvisible
        placeholder={<div style={{ height: '74px' }} />}
      >
        <ShadowCircle easingName={easingName} duration={5000} />
      </LazyLoad>
    </div>
  ))}
</div>

*/

DemoPage.propTypes = {
  className: PropTypes.string
}

const StyledDemoPage = styled(DemoPage)`
  animation: ${animations.fadeInUp};
  animation-duration: 1000ms;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: rgba(255, 255, 255, 0.9);
    font-size: 64px;
    margin-top: -69px;
  }

  .page-content {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    box-shadow: 10px 10px 160px rgba(0, 0, 0, 0.4);
    margin: 20px;
    max-width: 800px;
    padding: 20px;
    width: 100%;

    &:first-child {
      margin-top: 120px;
    }
  }

  p > code {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 6px;
    font-size: 14px;
    display: inline-block;
    margin: 0 2px;
    padding: 2px 6px;
  }

  .copyright {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 6px;
    font-size: 22px;
    display: inline-block;
    margin: 20px 0 40px;
    padding: 2px 6px;
  }

  .example {
    animation: ${animations.bounceIn};
    animation-duration: 600ms;
    animation-delay: 500ms;
    opacity: 0;
    background: #fff;
    border-radius: 12px;
    box-shadow: 10px 10px 60px rgba(0, 0, 0, 0.1);
    display: flex;
    padding: 10px 20px;
    margin: 0 -40px 30px;
    align-items: center;

    > pre {
      align-items: center;
      background-color: rgba(23, 55, 175, 0.1);
      border-radius: 8px;
      display: flex;
      font-size: 14px;
      overflow: scroll;
      min-height: 150px;
      padding: 10px 20px;
      width: 50%;
    }

    > div {
      display: flex;
      justify-content: center;
      width: 50%;
    }

    &-aoc {
      &-default {
        font-size: 40px;
      }
      &-animations {
        font-size: 18px;

        &-text {
          font-size: 24px;
        }
      }
      &-slow {
        font-size: 40px;
      }
    }

    &-hul {
      &-default {
        text-align: center;
      }
      &-spinner {
        text-align: center;
      }
      &-image {
        background-size: cover;
        box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2);
        border-radius: 6px;
        margin-top: 20px;
        height: 120px;
        width: 200px;
      }
      &-load {
        border: 2px solid #aaa;
        border-radius: 6px;
        background-image: linear-gradient(
          to left bottom,
          #d02018,
          #d5003f,
          #cd0064,
          #b70087,
          #901ca7
        );
        cursor: pointer;
        font-size: 12px;
        padding: 4px 8px;
        margin: 14px 0;
        width: 100px;
        color: #fff;
      }
    }

    &-animation {
      align-items: center;
      cursor: help;
      display: flex;
      flex-direction: column;

      &-container {
        display: flex;
        flex-wrap: wrap;
      }

      p {
        font-size: 14px;
        margin-top: 0.25em;
      }

      &-box {
        border-radius: 6px;
        height: 100px;
        margin: 10px 16px;
        width: 100px;
        border: 4px solid #522f95;
        background: #7a29aa;
      }
    }
  }
`

render(<StyledDemoPage />, document.getElementById('root'))
