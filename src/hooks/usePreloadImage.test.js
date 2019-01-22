import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import usePreloadImage from './usePreloadImage'

const TestComponent = ({ imageToLoad }) => {
  const [errored, loaded] = usePreloadImage(imageToLoad)
  return (
    <div className="test-div" errored={`${errored}`} loaded={`${loaded}`} />
  )
}

TestComponent.propTypes = {
  imageToLoad: PropTypes.string
}

describe('usePreloadImage', () => {
  it('should return false by default for initial loaded states', () => {
    const component = mount(<TestComponent imageToLoad="url" />)
    expect(component.find('.test-div').get(0).props.errored).toEqual('false')
    expect(component.find('.test-div').get(0).props.loaded).toEqual('false')
  })

  it('should return the default loaded state when no image supplied', () => {
    const component = mount(<TestComponent imageToLoad={undefined} />)
    expect(component.find('.test-div').get(0).props.errored).toEqual('false')
    expect(component.find('.test-div').get(0).props.loaded).toEqual('true')
  })

  // it('should call createElement on new image', () => {
  //   const createElementSpy = jest.fn()
  //   createElementSpy.mockResolvedValue({})
  //   global.document = {
  //     createElement: createElementSpy
  //   }
  //   mount(<TestComponent imageToLoad="url" />)
  //   expect(createElementSpy).toHaveBeenCalledWith('img')
  // })
})
