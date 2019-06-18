/*
 * Copyright 2019 NearForm Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react'
import { mount } from 'enzyme'
import usePreloadImage from '../hooks/usePreloadImage'
import HideUntilLoaded from './'

jest.mock('../hooks/usePreloadImage')

describe('HideUntilLoaded', () => {
  beforeAll(() => {
    usePreloadImage.mockImplementation(() => [false, false])
  })

  it('should render child value', () => {
    const component = mount(
      <HideUntilLoaded imageToLoad="url">123</HideUntilLoaded>
    )
    expect(component.text()).toEqual('123')
  })

  it('should render child components', () => {
    const component = mount(
      <HideUntilLoaded imageToLoad="url">
        <div className="test-div">
          <p />
          <p />
        </div>
      </HideUntilLoaded>
    )
    expect(component.find('.test-div').length).toEqual(1)
    expect(component.find('p').length).toEqual(2)
  })

  it('should return children if no image specified', () => {
    const component = mount(
      <HideUntilLoaded imageToLoad="url">
        <div className="test-div">
          <p />
          <p />
        </div>
      </HideUntilLoaded>
    )
    expect(component.find('.test-div').length).toEqual(1)
    expect(component.find('p').length).toEqual(2)
  })

  it('should begin with the contents hidden', () => {
    const component = mount(
      <HideUntilLoaded imageToLoad="url">123</HideUntilLoaded>
    )
    expect(
      component.find('.hide-until-loaded-content').get(0).props.style.opacity
    ).toEqual(0)
    expect(
      component.find('.hide-until-loaded-content').get(0).props.style.animation
    ).toEqual(undefined)
  })

  it('should show content when loaded', () => {
    usePreloadImage.mockImplementation(() => [false, true])
    const component = mount(
      <HideUntilLoaded imageToLoad="url">123</HideUntilLoaded>
    )
    expect(
      component.find('.hide-until-loaded-content').get(0).props.style.opacity
    ).toEqual(1)
    expect(
      component.find('.hide-until-loaded-content').get(0).props.style.transition
    ).toEqual(expect.stringContaining('opacity 500ms ease-out'))
  })

  it('should apply animationIn when loaded', () => {
    usePreloadImage.mockImplementation(() => [false, true])
    const component = mount(
      <HideUntilLoaded imageToLoad="url" animationIn="popIn">
        123
      </HideUntilLoaded>
    )
    expect(
      component.find('.hide-until-loaded-content').get(0).props.style.animation
    ).toEqual(expect.stringContaining('pop-in'))
  })

  it('should apply custom animationIn text when loaded', () => {
    usePreloadImage.mockImplementation(() => [false, true])
    const component = mount(
      <HideUntilLoaded imageToLoad="url" animationIn="test text">
        123
      </HideUntilLoaded>
    )
    expect(
      component.find('.hide-until-loaded-content').get(0).props.style.animation
    ).toEqual(expect.stringContaining('test text'))
  })

  it('should apply animationIn when errored (as a fallback)', () => {
    usePreloadImage.mockImplementation(() => [true, false])
    const component = mount(
      <HideUntilLoaded imageToLoad="url" animationIn="popIn">
        123
      </HideUntilLoaded>
    )
    expect(
      component.find('.hide-until-loaded-content').get(0).props.style.animation
    ).toEqual(expect.stringContaining('pop-in'))
  })

  it('should show a given spinner', () => {
    const component = mount(
      <HideUntilLoaded
        imageToLoad="url"
        Spinner={() => <div className="example-spinner" />}
      >
        123
      </HideUntilLoaded>
    )
    expect(component.find('.example-spinner').length).toEqual(1)
  })

  it('should hide spinner when content loaded', () => {
    usePreloadImage.mockImplementation(() => [false, true])
    const component = mount(
      <HideUntilLoaded
        imageToLoad="url"
        Spinner={() => <div className="example-spinner" />}
      >
        123
      </HideUntilLoaded>
    )
    expect(
      component.find('.hide-until-loaded-spinner').get(0).props.style.opacity
    ).toEqual(0)
  })

  it('should accept custom styles', () => {
    const component = mount(
      <HideUntilLoaded imageToLoad="url" style={{ background: 'red' }}>
        123
      </HideUntilLoaded>
    )
    expect(component.find('span').get(0).props.style.background).toEqual('red')
  })
})
