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
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import AnimateOnChange from './'

describe('AnimateOnChange', () => {
  it('should render child value', () => {
    const component = mount(<AnimateOnChange>123</AnimateOnChange>)
    expect(component.text()).toEqual('123')
  })

  it('should render child components', () => {
    const component = mount(
      <AnimateOnChange>
        <div className="test-1">
          <p className="test-2" />
          <p className="test-3" />
        </div>
      </AnimateOnChange>
    )
    expect(component.find('.test-1').length).toEqual(1)
    expect(component.find('p').length).toEqual(2)
    expect(component.find('.test-2').length).toEqual(1)
    expect(component.find('.test-3').length).toEqual(1)
  })

  it('should have a default duration of 200', () => {
    const component = mount(<AnimateOnChange>123</AnimateOnChange>)
    expect(component.get(0).props.durationOut).toEqual(200)
  })

  it('should render the correct transition duration', () => {
    const durationOut = 250
    const component = mount(
      <AnimateOnChange durationOut={durationOut}>123</AnimateOnChange>
    )
    expect(component.get(0).props.durationOut).toEqual(250)
    expect(component.find('span').get(0).props.style.transition).toEqual(
      expect.stringContaining('250ms')
    )
  })

  it('should animate then change content when children changes', () => {
    const component = mount(<AnimateOnChange>old</AnimateOnChange>)
    component.simulate('transitionEnd')
    expect(component.find('span').get(0).props.style.opacity).toEqual(1)
    expect(component.text()).toEqual('old')

    // Update the children to trigger animation
    act(() => {
      component.setProps({ children: 'new' })
    })

    act(() => {
      component.update()
    })

    // Expect old value while transitioning out
    expect(component.find('span').get(0).props.style.opacity).toEqual(0)
    expect(component.text()).toEqual('old')

    // Test opacity and new value after duration has passed
    act(() => {
      component.update()
    })
    component.simulate('transitionEnd')

    expect(component.find('span').get(0).props.style.opacity).toEqual(1)
    expect(component.text()).toEqual('new')
  })

  it('should set named animation on in and out', () => {
    const component = mount(
      <AnimateOnChange animationIn="popIn" animationOut="popOut">
        old
      </AnimateOnChange>
    )
    component.simulate('transitionEnd')
    expect(component.find('span').get(0).props.style.animation).toEqual(
      undefined
    )
    expect(component.text()).toEqual('old')

    act(() => {
      component.setProps({ children: 'new' })
    })

    act(() => {
      component.update()
    })

    expect(component.find('span').get(0).props.style.animation).toEqual(
      expect.stringContaining('pop-out')
    )
    expect(component.text()).toEqual('old')

    act(() => {
      component.update()
    })
    component.simulate('transitionEnd')

    expect(component.find('span').get(0).props.style.animation).toEqual(
      expect.stringContaining('pop-in')
    )
    expect(component.text()).toEqual('new')
  })

  it('should set custom animation properties on in and out', () => {
    const component = mount(
      <AnimateOnChange animationIn="in test" animationOut="out test">
        old
      </AnimateOnChange>
    )
    component.simulate('transitionEnd')
    expect(component.find('span').get(0).props.style.animation).toEqual(
      undefined
    )

    act(() => {
      component.setProps({ children: 'new' })
    })

    act(() => {
      component.update()
    })

    expect(component.find('span').get(0).props.style.animation).toEqual(
      expect.stringContaining('out test')
    )

    act(() => {
      component.update()
    })
    component.simulate('transitionEnd')

    expect(component.find('span').get(0).props.style.animation).toEqual(
      expect.stringContaining('in test')
    )
  })

  it('should set default class names on in and out', () => {
    const className = 'animate-on-change'
    const component = mount(<AnimateOnChange>old</AnimateOnChange>)
    component.simulate('transitionEnd')
    expect(component.find('span').get(0).props.className).toEqual(
      expect.stringContaining(className)
    )
    expect(component.find('span').get(0).props.className).not.toEqual(
      expect.stringContaining(`${className}-in`)
    )
    expect(component.find('span').get(0).props.className).not.toEqual(
      expect.stringContaining(`${className}-out`)
    )

    act(() => {
      component.setProps({ children: 'new' })
    })

    act(() => {
      component.update()
    })

    expect(component.find('span').get(0).props.className).toEqual(
      expect.stringContaining(`${className}-out`)
    )
    expect(component.find('span').get(0).props.className).not.toEqual(
      expect.stringContaining(`${className}-in`)
    )

    act(() => {
      component.update()
    })
    component.simulate('transitionEnd')

    expect(component.find('span').get(0).props.className).not.toEqual(
      expect.stringContaining(`${className}-out`)
    )
    expect(component.find('span').get(0).props.className).toEqual(
      expect.stringContaining(`${className}-in`)
    )
  })

  it('should set custom class names on in and out', () => {
    const className = 'test'
    const component = mount(
      <AnimateOnChange className={className}>old</AnimateOnChange>
    )
    component.simulate('transitionEnd')
    expect(component.find('span').get(0).props.className).toEqual(
      expect.stringContaining(className)
    )
    expect(component.find('span').get(0).props.className).not.toEqual(
      expect.stringContaining(`${className}-in`)
    )
    expect(component.find('span').get(0).props.className).not.toEqual(
      expect.stringContaining(`${className}-out`)
    )

    act(() => {
      component.setProps({ children: 'new' })
    })

    act(() => {
      component.update()
    })

    expect(component.find('span').get(0).props.className).toEqual(
      expect.stringContaining(`${className}-out`)
    )
    expect(component.find('span').get(0).props.className).not.toEqual(
      expect.stringContaining(`${className}-in`)
    )

    act(() => {
      component.update()
    })
    component.simulate('transitionEnd');

    expect(component.find('span').get(0).props.className).not.toEqual(
      expect.stringContaining(`${className}-out`)
    )
    expect(component.find('span').get(0).props.className).toEqual(
      expect.stringContaining(`${className}-in`)
    )
  })

  it('should accept custom styles', () => {
    const component = mount(
      <AnimateOnChange style={{ background: 'red' }}>123</AnimateOnChange>
    )
    expect(component.find('span').get(0).props.style.background).toEqual('red')
  })
})
