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
import AnimateGroup from './'

jest.useFakeTimers()

describe('AnimateGroup', () => {

  it('should render child components', () => {
    const component = mount(
      <AnimateGroup>
        <div key="test-1" className="child test-1"></div>
        <div key="test-2" className="child test-2"></div>
        <div key="test-3" className="child test-3"></div>
      </AnimateGroup>
    )
    expect(component.find('.child').length).toEqual(3)
    expect(component.find('.test-1').length).toEqual(1)
    expect(component.find('.test-2').length).toEqual(1)
    expect(component.find('.test-3').length).toEqual(1)
  })

  it('should have a default duration out of 200', () => {
    const component = mount(<AnimateGroup><div key="1">one</div></AnimateGroup>)
    expect(component.get(0).props.durationOut).toEqual(200)
  })

  it('should render the correct transition out duration', () => {
    const durationOut = 250
    const component = mount(
      <AnimateGroup durationOut={durationOut}><div key="old" className="child">old</div></AnimateGroup>
    )

    expect(component.get(0).props.durationOut).toEqual(durationOut)

    act(() => {
      component.setProps({ children: (<div key="new" className="child">new</div>) })
      component.update()
    })

    expect(component.find('div.child').at(1).render().attr('style')).toEqual(
      expect.stringContaining(`${durationOut}ms`)
    )
  })

  it('should animate then change content when children changes', () => {
    const component = mount(<AnimateGroup><div key="old" className="old">old</div></AnimateGroup>)

    let child = component.find('div.old').at(0)
    expect(child.text()).toEqual('old')

    // Update the children to trigger animation
    act(() => {
      component.setProps({ children: (<div key="new" className="new">new</div>) })
      component.update()
    })
    jest.runAllTimers()

    // Expect old value while transitioning out
    child = component.find('div.old').at(0)
    expect(child.render().attr('style')).toEqual( expect.stringContaining('opacity: 0') )
    expect(child.text()).toEqual('old')

    // Test opacity and new value after duration has passed
    act(() => {
      component.update()
    })
    jest.runAllTimers()

    child = component.find('div.new').at(0)
    expect(child.render().attr('style')).toEqual( expect.stringContaining('opacity: 1') )
    expect(child.text()).toEqual('new')
  })

  it('should set named animation on in and out', () => {
    const component = mount(
      <AnimateGroup animationIn="popIn" animationOut="popOut">
        <div key="old" className="old">old</div>
      </AnimateGroup>
    )

    let child = component.find('div.old').at(0)
    expect(child.render().attr('style')).toEqual(undefined)
    expect(child.text()).toEqual('old')

    act(() => {
      component.setProps({ children: (<div key="new" className="new">new</div>) })
      component.update()
    })
    jest.runAllTimers()

    child = component.find('div.old').at(0)
    expect(child.render().attr('style')).toEqual(
      expect.stringContaining('pop-out')
    )

    act(() => {
      component.update()
    })
    jest.runAllTimers()

    child = component.find('div.new').at(0)
    expect(child.render().attr('style')).toEqual(
      expect.stringContaining('pop-in')
    )
    expect(child.text()).toEqual('new')
  })

  it('should set custom animation properties on in and out', () => {
    const component = mount(
      <AnimateGroup animationIn="in test" animationOut="out test">
        <div key="old" className="old">old</div>
      </AnimateGroup>
    )
    let child = component.find('div.old').at(0)
    expect(child.render().attr('style')).toEqual(undefined)

    act(() => {
      component.setProps({ children: (<div key="new" className="new">new</div>) })
      component.update()
    })
    jest.runAllTimers()

    child = component.find('div.old').at(0)
    expect(child.render().attr('style')).toEqual(
      expect.stringContaining('out test')
    )

    act(() => {
      component.update()
    })
    jest.runAllTimers()

    child = component.find('div.new').at(0)
    expect(child.render().attr('style')).toEqual(
      expect.stringContaining('in test')
    )
  })
/*
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
*/
    /*
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
  */
  it('should set custom class name on container', () => {
    const className = 'test'
    const component = mount(
      <AnimateGroup className={className}><div key="old">old</div></AnimateGroup>
    )
    expect(component.get(0).props.className).toEqual(
      expect.stringContaining(className)
    )
  })
})
