import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { HideUntilLoaded, IntersectionLoader } from '../../utilities'
import Spinner from '../Spinner'

const description = `
A wrapper component that will proxy a property value to children only when they become visible.
`

const rand = () => Math.floor(Math.random() * 9999) + 1

const images = [
  'https://picsum.photos/2200/1200/?rand&' + rand(),
  'https://picsum.photos/2200/1200/?rand&' + rand(),
  'https://picsum.photos/2200/1200/?rand&' + rand(),
  'https://picsum.photos/2200/1200/?rand&' + rand(),
  'https://picsum.photos/2200/1200/?rand&' + rand(),
  'https://picsum.photos/2200/1200/?rand&' + rand(),
  'https://picsum.photos/2200/1200/?rand&' + rand(),
  'https://picsum.photos/2200/1200/?rand&' + rand(),
  'https://picsum.photos/2200/1200/?rand&' + rand()
]

const mediaContainerStyle = {
  border: '5px solid #fff',
  backgroundSize: 'cover',
  width: '300px',
  height: '200px',
  boxShadow: '10px 10px 40px rgba(0,0,0,.2)',
  margin: '20px'
}

storiesOf('UtilityComponents/IntersectionLoader', module)
  .addDecorator(withInfo({ inline: true }))
  .add(
    'Component',
    () => (
      <IntersectionLoader value="https://picsum.photos/2200/1200/?rand">
        {({ value, ref }) => (
          <HideUntilLoaded imageToLoad={value}>
            <div
              ref={ref}
              style={{
                backgroundImage: `url(${value})`,
                ...mediaContainerStyle
              }}
            />
            <h1>Image Title</h1>
          </HideUntilLoaded>
        )}
      </IntersectionLoader>
    ),
    { info: { text: description } }
  )
  .add('Multiple images', () => (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {images.map(image => (
        <IntersectionLoader key={image} value={image}>
          {({ value, ref }) => (
            <HideUntilLoaded imageToLoad={value} Spinner={Spinner}>
              <div
                ref={ref}
                style={{
                  backgroundImage: `url(${value})`,
                  ...mediaContainerStyle
                }}
              />
              <h1>Image Title</h1>
            </HideUntilLoaded>
          )}
        </IntersectionLoader>
      ))}
    </div>
  ))
