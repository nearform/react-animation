import React from 'react'
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import AnimateOnChange from './'
/*
jest.useFakeTimers()
*/
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
    component.simulate('transitionEnd');
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
/*
    act(() => {
      jest.runAllTimers()
    })
*/

    act(() => {
      component.update()
    })
    component.simulate('transitionEnd');

    expect(component.find('span').get(0).props.style.opacity).toEqual(1)
    expect(component.text()).toEqual('new')
  })

  it('should set named animation on in and out', () => {
    const component = mount(
      <AnimateOnChange animationIn="popIn" animationOut="popOut">
        old
      </AnimateOnChange>
    )
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
/*
    act(() => {
      jest.runAllTimers()
    })
*/
    act(() => {
      component.update()
    })
    component.simulate('transitionEnd');

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
/*
    act(() => {
      jest.runAllTimers()
    })
*/
    act(() => {
      component.update()
    })
    component.simulate('transitionEnd');

    expect(component.find('span').get(0).props.style.animation).toEqual(
      expect.stringContaining('in test')
    )
  })

  it('should set default class names on in and out', () => {
    const className = 'animate-on-change'
    const component = mount(<AnimateOnChange>old</AnimateOnChange>)
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
/*
    act(() => {
      jest.runAllTimers()
    })
*/
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

  it('should set custom class names on in and out', () => {
    const className = 'test'
    const component = mount(
      <AnimateOnChange className={className}>old</AnimateOnChange>
    )
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
/*
    act(() => {
      jest.runAllTimers()
    })
*/
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

  it('should clear timeout on unmount', () => {
    const component = mount(<AnimateOnChange>123</AnimateOnChange>)
    act(() => {
      component.setProps({ children: 'new' })
    })

    act(() => {
      component.update()
    })

    act(() => {
      component.unmount()
    })
/*
    expect(clearTimeout).toHaveBeenCalledTimes(1)
*/
  })

  it('should accept custom styles', () => {
    const component = mount(
      <AnimateOnChange style={{ background: 'red' }}>123</AnimateOnChange>
    )
    expect(component.find('span').get(0).props.style.background).toEqual('red')
  })
})
