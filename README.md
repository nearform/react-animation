# UI Animation Helpers

[WIP]

This package provides components you can use to easily add animation to your components, along with a set of pre-built animations and timing functions.

## Demos

You can see each of the helpers and animations that are included in action on [this demo page](https://nearform.github.com/ui-animation-helpers/).

## Usage

```
npm install ui-animation-helpers
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
- durationOut
- style

By default, the animation used is a fade out and in. You can specify an animation for both the `out` (when the old content is removed) and `in` (when new content is shown) stages of the animation.

The package includes the following pre-canned animations:

- fadeIn
- fadeOut
- popIn
- popOut
- bounceIn

You can reference these by name, for example:

    <AnimateOnChange animationIn="popIn" animationOut="popOut">...</AnimateOnChange>

This will apply a `popOut` animation when removing the old content, and a `popIn` animation on the new content.

### HideUntilLoaded

Nobody likes a half-downloaded image appearing when rendering our UI. This component helps by hiding any children content until a specified image has finished downloading.

    <HideUntilLoaded imageToLoad="[IMAGE_URL]">Your content</HideUntilLoaded>

By default the component will apply an `opacity` of 0 and then a `transition` when loading has completed. This will fade in the fully downloaded content.

TODO: Add in a custom `animationIn` property

#### Spinners

You can specify any React component as a "spinner" or loading indicator. This will be shown while the loading is taking place, and then removed once the content is ready to be shown.

```
import MySpinner from '../MySpinner' // This could be an animated SVG or any React component

<HideUntilLoaded imageToLoad="[IMAGE_URL]" Spinner={Spinner}>Your content</HideUntilLoaded>

```

## Animations

This package includes some pre-built animations along with their associated keyframes. As well as supplying the animation names to the above components, you can also apply these animations directly to your components:

```
import { animations } from 'ui-animation-helpers'

const style = {
  animation: animations.popIn
}

<MyComponent style={style} />

```

In this example, `popIn` evaluates to `pop-in 500ms cubic-bezier(0.19, 1, 0.22, 1) forwards`.

The following animations are included:

- fadeIn
- fadeOut
- popIn
- popOut
- bounceIn

### Using your own animations

Currently there is no option to pass in your own `animation` properties, but this is something I'm keen to add as soon as possible.

## Easings

As well as pre-built animations, this package includes a range of timing functions you can use in animations and transitions.

The full set can be seen in action on the [demo page](https://nearform.github.io/ui-animation-helpers/).

You can apply these to your component styles like so:

```
import { easings } from 'ui-animation-helpers'

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

# Issues and contributing

Please take a second to read over this before opening an issue. Providing complete information upfront will help us address any issue (and ship new features!) faster.

We greatly appreciate bug fixes, documentation improvements and new features, however when contributing a new major feature, it is a good idea to idea to first open an issue, to make sure the feature it fits with the goal of the project, so we don't waste your or our time.

## Bug Reports

A perfect bug report would have the following:

1. Summary of the issue you are experiencing.
2. Details on what versions of node and XZY you are using (`node -v`).
3. A simple repeatable test case for us to run. Please try to run through it 2-3 times to ensure it is completely repeatable.

We would like to avoid issues that require a follow up questions to identify the bug. These follow ups are difficult to do unless we have a repeatable test case.

## For Developers

All contributions should fit the [standard](https://github.com/standard/standard) linter, and pass the tests.
You can test this by running:

```
npm test
```

In addition, make sure to add tests for any new features.
You can test the test coverage by running:

```
npm run ci-cov
```

## For Collaborators

Make sure to get a `:thumbsup:`, `+1` or `LGTM` from another collaborator before merging a PR. If you aren't sure if a release should happen, open an issue.

Release process:

- `npm test`
- `npm version <major|minor|patch>`
- `git push && git push --tags`
- `npm publish`

---

<a id="developers-certificate-of-origin"></a>

## Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

- (a) The contribution was created in whole or in part by me and I
  have the right to submit it under the open source license
  indicated in the file; or

- (b) The contribution is based upon previous work that, to the best
  of my knowledge, is covered under an appropriate open source
  license and I have the right under that license to submit that
  work with modifications, whether created in whole or in part
  by me, under the same open source license (unless I am
  permitted to submit under a different license), as indicated
  in the file; or

- (c) The contribution was provided directly to me by some other
  person who certified (a), (b) or (c) and I have not modified
  it.

- (d) I understand and agree that this project and the contribution
  are public and that a record of the contribution (including all
  personal information I submit with it, including my sign-off) is
  maintained indefinitely and may be redistributed consistent with
  this project or the open source license(s) involved.

  # Contributor Covenant Code of Conduct

  ## Our Pledge

  In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

  ## Our Standards

  Examples of behavior that contributes to creating a positive environment include:

  - Using welcoming and inclusive language
  - Being respectful of differing viewpoints and experiences
  - Gracefully accepting constructive criticism
  - Focusing on what is best for the community
  - Showing empathy towards other community members

  Examples of unacceptable behavior by participants include:

  - The use of sexualized language or imagery and unwelcome sexual attention or advances
  - Trolling, insulting/derogatory comments, and personal or political attacks
  - Public or private harassment
  - Publishing others' private information, such as a physical or electronic address, without explicit permission
  - Other conduct which could reasonably be considered inappropriate in a professional setting

  ## Our Responsibilities

  Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.

  Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, or to ban temporarily or permanently any contributor for other behaviors that they deem inappropriate, threatening, offensive, or harmful.

  ## Scope

  This Code of Conduct applies both within project spaces and in public spaces when an individual is representing the project or its community. Examples of representing a project or community include using an official project e-mail address, posting via an official social media account, or acting as an appointed representative at an online or offline event. Representation of a project may be further defined and clarified by project maintainers.

  ## Enforcement

  Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at opensource@nearform.com. The project team will review and investigate all complaints, and will respond in a way that it deems appropriate to the circumstances. The project team is obligated to maintain confidentiality with regard to the reporter of an incident. Further details of specific enforcement policies may be posted separately.

  Project maintainers who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the project's leadership.

  ## Attribution

  This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4, available at [http://contributor-covenant.org/version/1/4][version]

  [homepage]: http://contributor-covenant.org
  [version]: http://contributor-covenant.org/version/1/4/

## License

Copyright 2018 nearForm

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.

You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,

WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and limitations under the License.
