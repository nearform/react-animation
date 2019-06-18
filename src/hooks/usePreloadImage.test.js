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
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import usePreloadImage, { eventWrapper } from './usePreloadImage'

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

  it('should call the setError and setLoaded methods as true in the wrapper', () => {
    const testFn = jest.fn()
    eventWrapper(testFn)()
    expect(testFn).toHaveBeenCalledWith(true)
  })
})
