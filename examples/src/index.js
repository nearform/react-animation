import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LazyLoad from 'react-lazyload'
import GithubIcon from './components/GithubIcon'
import Clock from './components/Clock'
import {
  AnimateOnChange,
  HideUntilLoaded,
  AnimateGroup,
  animations,
  easings
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

const easingNames = Object.keys(easings)

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
  const [randomWordGroup, setRandomWordGroup] = useState([getRandomFrom(words)])

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setRandomWord(getRandomFrom(words))
      setRandomEmoji(getRandomFrom(emojis))

      const word = getRandomFrom(words)
      if(randomWordGroup.includes(word)) {
        setRandomWordGroup(randomWordGroup.filter(w => w !== word))
      }
      else {
        setRandomWordGroup(randomWordGroup.concat([word]).sort())
      }

    }, 2000)
    return () => {
      clearInterval(wordInterval)
    }
  })
  return (
    <div>
      <section className={className}>
        <h1>
          React Animation{' '}
          <AnimateOnChange
            animationOut="bounceOut"
            animationIn="bounceIn"
            className="title-emoji"
          >
            {randomEmoji}
          </AnimateOnChange>
        </h1>
        <div className="page-content">
          <p>
            Animation for your React projects. Includes helpful components and
            pre-built animations.
          </p>
        </div>
        <div className="page-content">
          <h2>Installation</h2>
          <p>
            Requires React and React DOM version <code>^16.8.0</code> or newer.
          </p>
          <p>
            <code>npm install -s react-animation</code>
          </p>
        </div>
        <div className="page-content">
          <h2>AnimateOnChange</h2>
          <p>
            <code>import {`{ AnimateOnChange }`} from 'react-animation'</code>
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
                <AnimateOnChange animate>{randomWord}</AnimateOnChange>
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

          <h3>Custom animations</h3>
          <p>
            We can even pass out own string values for the{' '}
            <code>animation</code> property on the "in" and "out" stages. We do
            this by passing the string to <code>animationIn</code> and{' '}
            <code>animationOut</code>.
          </p>
          <p>
            Note: You will need to define <code>custom-animation-in</code> and{' '}
            <code>custom-animation-out</code> as keyframes yourself.
          </p>
          <LazyLoad height={200}>
            <div className="example">
              <pre>
                <code>{`This is
<AnimateOnChange
  animationIn="custom-animation-in 500ms ease-out forwards"
  animationOut="custom-animation-out 500ms ease-out forwards"
  durationOut={500}
>
${randomWord}
</AnimateOnChange>`}</code>
              </pre>
              <div className="example-aoc-animations">
                <div>
                  This is{' '}
                  <span className="example-aoc-animations-text">
                    <AnimateOnChange
                      animationIn="custom-animation-in 500ms ease-out forwards"
                      animationOut="custom-animation-out 500ms ease-out forwards"
                      durationOut={500}
                    >
                      {randomWord}
                    </AnimateOnChange>
                  </span>
                </div>
              </div>
            </div>
          </LazyLoad>

          <h3>Custom class name</h3>
          <p>
            If we want to control things more precisely or animate children
            elements, we can pass in a class name instead. By default the class
            names are:
            <code>animate-on-change</code>, <code>animate-on-change-in</code>,
            and <code>animate-on-change-out</code>. The last two are
            automatically generated, so if you supply the <code>className</code>{' '}
            of "foo" it will apply <code>foo</code>, <code>foo-in</code>, and{' '}
            <code>foo-out</code>.
          </p>
          <LazyLoad height={200}>
            <div className="example">
              <pre>
                <code>{`This is
<AnimateOnChange
  className="foo"
  durationOut={500}
>
${randomWord}
</AnimateOnChange>`}</code>
              </pre>
              <div className="example-aoc-animations">
                <div>
                  Class names are{' '}
                  <span className="example-aoc-animations-text">
                    <AnimateOnChange className="foo" durationOut={500}>
                      <div className="container">{randomWord}</div>
                    </AnimateOnChange>
                  </span>
                </div>
              </div>
            </div>
          </LazyLoad>
          <p>The code for the above animation looks like this:</p>
          <pre>
            <code>{`.foo {
.container {
    display: inline-block;
    position: relative;
    padding: 0 0 0 10px;
    width: 180px;

    &:after {
      background-color: rgb(73, 41, 136);
      content: '';
      position: absolute;
      top: 0;
      right: 100%;
      bottom: 0;
      left: 0;
      transition: all ${easings.easeOutExpo} 500ms 250ms;
    }
  }

  &.foo-out {
    .container:after {
      right: 0;
      transition: all ${easings.easeInOutBack} 500ms;
    }
  }
}`}</code>
          </pre>
        </div>
        <div className="page-content">
          <h2>HideUntilLoaded</h2>
          <p>
            <code>import {`{ HideUntilLoaded }`} from 'react-animation'</code>
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
        </div>

        <div className="page-content">
          <h2>AnimateGroup</h2>
          <p>
            <code>import {`{ AnimateGroup }`} from 'react-animation'</code>
          </p>
          <p>
            Use this component when you want to animate components being being added, 
            removed or modified within a group of components.
          </p>

          <LazyLoad height={200}>
            <div className="clock-example">
              <Clock animation="bounce" />
            </div>
          </LazyLoad>

          <p>
            By default this will fade-in new components as they are added to the group,
            and fade-out components that are removed from the group.
          </p>

          <LazyLoad height={200}>
            <div className="example">
              <pre>
                <code>{`<ul>
  <AnimateGroup animation="bounce">
    {randomWordGroup.map(word => (<li key={word}>
      {word}
    </li>))}
  </AnimateGroup>
</ul>`}</code>
              </pre>
              <div className="example-hul-spinner">
                <div>
                  <ul>
                  <AnimateGroup animation="bounce">
                    {randomWordGroup.map(word => (<li key={word}>{word}</li>))}
                  </AnimateGroup>
                  </ul>
                </div>
              </div>
            </div>
          </LazyLoad>

          <p>
            Components may be added of removed in any order.
            When using the component ensure that each child has a unique key within
            the group.
          </p>
          
          <p>
            The animation to use can be specified in the same way as <code>AnimateOnChange</code>,
            using <code>animationIn</code> and <code>animationOut</code> properties.
            Alternatively, a single <code>animation</code> property can be supplied with the base
            name of the animation to use;
            so <code>animation="fade"</code> is equivalent to 
            <code>animationIn="fadeIn" animationOut="fadeOut"</code>.
          </p>

        </div>

        <div className="page-content">
          <h2>Animations</h2>
          <p>
            <code>import {`{ animations }`} from 'react-animation'</code>
          </p>
          <p>
            Animations can be applied to your styling in animation properties
            such as <code>{`style={{animation: animations.popIn}}`}</code>
          </p>
          <p>
            Note: If you're using the animations by themselves you will also
            need to add in the bundle's <code>keyframes</code> using{' '}
            <code>{`import 'react-animation/dist/keyframes.css'`}</code>.
          </p>
          <p>
            If the animation isn't right you can override specific animation
            properties such as duration or timing function as needed.
          </p>
          <p>
            You could use them on components, or even use them on pages to have
            each page fade-in, for example.
          </p>
          <p>Hover or tap each example to see it in action.</p>
          <div className="example-animation-container">
            {animationNames.map(animationName => (
              <StyledAnimatedBox
                animationName={animationName}
                key={animationName}
              />
            ))}
          </div>
        </div>
        <div className="page-content">
          <h2>Easings (timing functions)</h2>
          <p>
            <code>import {`{ easings }`} from 'react-animation'</code>
          </p>
          <p>
            Similar to animations, you can use the built-in easings values in
            your projects. They are based on the timing functions set out on{' '}
            <a href="https://easings.net">easings.net</a>.
          </p>
          <ul>
            {easingNames.map(easingName => (
              <li key={easingName}>{easingName}</li>
            ))}
          </ul>
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
        <a href="https://github.com/nearform/react-animation">
          <GithubIcon />
        </a>
      </div>
    </div>
  )
}

DemoPage.propTypes = {
  className: PropTypes.string
}

const breakpoints = {
  desktop: '(min-width: 768px)'
}

const StyledDemoPage = styled(DemoPage)`
  align-items: center;
  animation-duration: 1000ms;
  animation: ${animations.fadeInUp};
  display: flex;
  padding: 0 20px;
  flex-direction: column;
  justify-content: center;

  @media ${() => breakpoints.desktop} {
    padding: 0;
  }

  h1 {
    color: #fff;
    font-size: 32px;
    line-height: 40px;
    margin-bottom: 0;
    width: calc(100% - 40px);

    @media ${() => breakpoints.desktop} {
      font-size: 64px;
      line-height: 80px;
      max-width: 800px;
    }

    .title-emoji {
      @media ${() => breakpoints.desktop} {
        font-size: 52px;
        line-height: 72px;
      }
    }
  }

  .page-content {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    box-shadow: 10px 10px 160px rgba(0, 0, 0, 0.4);
    margin: 20px;
    padding: 20px;
    width: calc(100% - 40px);

    &:first-of-type {
      padding-top: 40px;
    }

    @media ${() => breakpoints.desktop} {
      max-width: 800px;
      width: 100%;
    }
  }

  p {
    font-size: 14px;

    @media ${() => breakpoints.desktop} {
      font-size: 16px;
    }
  }

  h2 {
    margin-top: 0.5em;
    line-height: 24px;
    margin-bottom: 1em;

    @media ${() => breakpoints.desktop} {
      font-size: 32px;
      margin-bottom: 0.75em;
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
    padding: 2px 10px;

    a {
      color: rgb(29, 91, 225);
      font-weight: bold;
      text-decoration: none;
    }
  }

  .example {
    align-items: center;
    animation-delay: 500ms;
    animation-duration: 600ms;
    animation: ${animations.bounceIn};
    background: #fff;
    border-radius: 12px;
    box-shadow: 10px 10px 60px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-wrap: wrap;
    opacity: 0;
    padding: 10px 20px;
    margin-bottom: 1em;

    @media ${() => breakpoints.desktop} {
      flex-wrap: nowrap;
      margin: 0 -40px 30px;
    }

    > pre {
      align-items: center;
      background-color: rgba(23, 55, 175, 0.1);
      border-radius: 8px;
      display: flex;
      font-size: 14px;
      overflow: scroll;
      min-height: 150px;
      padding: 10px 20px;
      width: 100%;

      @media ${() => breakpoints.desktop} {
        width: 50%;
      }
    }

    > div {
      display: flex;
      justify-content: center;
      width: 100%;

      @media ${() => breakpoints.desktop} {
        width: 50%;
      }
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
        justify-content: space-between;
        flex-wrap: wrap;
      }

      p {
        font-size: 14px;
        margin-top: 0.25em;
      }

      &-box {
        border-radius: 6px;
        height: 100px;
        margin: 10px 20px;
        width: 100px;
        border: 4px solid #522f95;
        background: #7a29aa;
      }
    }
  }

  .clock-example {
    text-align: center;
    padding: 10px 20px;
    margin-bottom: 1em;
  }

  @keyframes custom-animation-in {
    from {
      transform: scale(2);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes custom-animation-out {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(2);
    }
  }

  .foo {
    .container {
      display: inline-block;
      position: relative;
      padding: 0 0 0 10px;
      width: 180px;

      &:after {
        background-color: rgb(73, 41, 136);
        content: '';
        position: absolute;
        top: 0;
        right: 100%;
        bottom: 0;
        left: 0;
        transition: all ${easings.easeOutExpo} 500ms 250ms;
      }
    }

    &.foo-out {
      .container:after {
        right: 0;
        transition: all ${easings.easeInOutBack} 500ms;
      }
    }
  }
`

render(<StyledDemoPage />, document.getElementById('root'))
