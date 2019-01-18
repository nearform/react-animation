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

  it('should begin with the contents hidden', () => {
    const component = mount(
      <HideUntilLoaded imageToLoad="url">123</HideUntilLoaded>
    )
    expect(component.find('.content').get(0).props.style.animation).toEqual(
      undefined
    )
  })

  it('should apply animationIn when loaded', () => {
    usePreloadImage.mockImplementation(() => [false, true])
    const component = mount(
      <HideUntilLoaded imageToLoad="url">123</HideUntilLoaded>
    )
    expect(component.find('.content').get(0).props.style.animation).toEqual(
      expect.stringContaining('pop-in')
    )
  })

  it('should apply animationIn when errored (as a fallback)', () => {
    usePreloadImage.mockImplementation(() => [true, false])
    const component = mount(
      <HideUntilLoaded imageToLoad="url">123</HideUntilLoaded>
    )
    expect(component.find('.content').get(0).props.style.animation).toEqual(
      expect.stringContaining('pop-in')
    )
  })

  it('should set named animation on in and out', () => {
    usePreloadImage.mockImplementation(() => [false, true])
    const component = mount(
      <HideUntilLoaded animationIn="popIn">123</HideUntilLoaded>
    )
    expect(component.find('.content').get(0).props.style.animation).toEqual(
      expect.stringContaining('pop-in')
    )
    expect(component.text()).toEqual('new')
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

  it('should accept custom styles', () => {
    const component = mount(
      <HideUntilLoaded imageToLoad="url" style={{ background: 'red' }}>
        123
      </HideUntilLoaded>
    )
    expect(component.find('span').get(0).props.style.background).toEqual('red')
  })
})
