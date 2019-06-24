# React Animation 👌

[![Coverage Status](https://coveralls.io/repos/github/nearform/react-animation/badge.svg?branch=master&v=1.0.6)](https://coveralls.io/github/nearform/react-animation?branch=master)
[![NPM version](https://img.shields.io/npm/v/react-animation.svg)](https://www.npmjs.com/package/react-animation)

Components and animations to easily add movement to your React project

## Demos

You can see each of the components and animations that are included on [this demo page](https://nearform.github.com/react-animation/).

## Usage

```
npm install --save react-animation
```

## Components

The following components can be used to easily add animation to specific circumstances.

### AnimateOnChange

It can be helpful to let users know when something has changed in our UI. This component aims to help by adding an animation to any content that changes.

    <AnimateOnChange>{value or child components}</AnimateOnChange>

The `AnimateOnChange` component will automatically fade out old content and fade in the new content when the content changes. This could be a number or string or any child components.

The following (optional) properties can be used:

- animationIn
- animationOut
- className
- durationOut
- style

By default, the animation used is a fade out and in. You can specify an animation for both the `out` (when the old content is removed) and `in` (when new content is shown) stages of the animation.

You can reference these by name, for example:

    <AnimateOnChange animationIn="popIn" animationOut="popOut">...</AnimateOnChange>

This will apply a `popOut` animation when removing the old content, and a `popIn` animation on the new content.

#### Custom `animationIn`and `animationOut` values

You can specify a built-in animation by name and it will call in the relevant animation property for you. If you prefer you can also supply a string here such as `my-animation 500ms ease-out forwards`. This way you can specify your own animation, as long as you've defined the `my-animation` keyframes somewhere.

#### ClassName

If you need more control, such as animating child components of pseudo-elements, you can supply a class name. By default, the component will add a `animate-on-change` class along with either `animate-on-change-in` and `animate-on-change-out` depending on the stage of the animation.

You can supply a `className` of "foo" and it will apply `foo`, `foo-in` and `foo-out` as necessary.

### HideUntilLoaded

Nobody likes a half-downloaded image appearing when rendering our UI. This component helps by hiding any children content until a specified image has finished downloading.

    <HideUntilLoaded imageToLoad="[IMAGE_URL]">Your content</HideUntilLoaded>

By default the component will apply an `opacity` of 0 and then a `transition` when loading has completed. This will fade in the fully downloaded content.

You can supply `animationIn` an animation name to use that instead of the default fade.

#### Spinners

You can specify any React component as a "spinner" or loading indicator. This will be shown while the loading is taking place, and then removed once the content is ready to be shown.

```
import MySpinner from '../MySpinner' // This could be an animated SVG or any React component

<HideUntilLoaded imageToLoad="[IMAGE_URL]" Spinner={Spinner}>Your content</HideUntilLoaded>

```

### AnimateGroup

This component makes it easy to animate additions and deletions to a group of components.

    <AnimateGroup animation="slide">{children}</AnimateGroup>

It is important for every child to have a unique key, in order for the component to detect changes to the group as children are added and removed.

Animations and transitions can be specified in the same way as for `AnimateOnChange`, using `animationIn` and `animationOut` properties. Alternatively, `AnimateGroup` supports the convenience property `animation` which allows the base name of the animation to be specified; so for example, setting `animation="bounce"` is equivalent to setting the properties `animationIn="bounceIn" animationOut="bounceOut"`.

Note that this component is different to `AnimateOnChange` as it _only_ animates addition of new elements and removal of existing ones; changes to existing elements are not animated. However, animation of updates to elements can be simulated by changing the child key when its value changes; this will be equivalent to removing the child's old value and replacing it with a new child with the new value.

## Animations

This package includes some pre-built animations along with their associated keyframes. As well as supplying the animation names to the above components, you can also apply these animations directly to your components:

```
import { animations } from 'react-animation'

const style = {
  animation: animations.popIn
}

<MyComponent style={style} />

```

In this example, `popIn` evaluates to `pop-in 500ms cubic-bezier(0.19, 1, 0.22, 1) forwards`.

The following animations are included:

- fadeIn
- fadeOut
- fadeInUp
- popIn
- popOut
- bounceIn
- bounceOut
- slideIn
- slideOut

### Using your own styles

You can pass any custom styles into the `AnimateOnChange` and `HideUntilLoaded` using the `style` property.

## Easings

As well as pre-built animations, this package includes a range of timing functions you can use in animations and transitions.

The full set can be seen in action on the [demo page](https://nearform.github.io/react-animation/).

You can apply these to your component styles like so:

```
import { easings } from 'react-animation'

const style = {
  animation: `pop-in ${easings.easeOutExpo} 500ms forwards`
}

<MyComponent style={style} />

```

The full list includes:

- linear
- easeInSine
- easeOutSine
- easeInOutSine
- easeInQuad
- easeOutQuad
- easeInOutQuad
- easeInCubic
- easeOutCubic
- easeInOutCubic
- easeInQuart
- easeOutQuart
- easeInOutQuart
- easeInQuint
- easeOutQuint
- easeInOutQuint
- easeInExpo
- easeOutExpo
- easeInOutExpo
- easeInBack
- easeOutBack
- easeInOutBack

## FAQ

### What is this for?

This package is for situations where UI needs to move or animate. These situations could include when data changes, or when an item takes a while to fully load a large background image.

The package also contains pre-built animations that can be applied to components.

### Why not use `ReactTransitionGroup` for many of the use cases?

`ReactTransitionGroup` is a useful and powerful approach to adding animation to elements, and you could certainly do most of what this package does with it. However you would need to define animation keyframes manually, and style each stage of each animation using classes.

This package aims to help when adding UI movement by making common actions easier. So for situations such as when data changes, or when an element needs to wait until loading has completed before animating into place, this package offers an easier way.

One benefit of this is ensuring that the animations you add to UI elements "feel" the same across a site or app.

`ReactTransitionGroup` provides a good approach to timing and managing classes but doesn't bring any animations or timing functions.

## License

Copyright 2019 NearForm

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.

You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,

WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and limitations under the License.
