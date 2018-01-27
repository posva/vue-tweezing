import { mount, createLocalVue } from '@vue/test-utils'
import { Tweezing, tweezerHelper } from '../src'
import Tweezer from 'tweezer.js'
import Helper from './Helper'

// TODO use custom tweening

const localVue = createLocalVue()
localVue.use(Tweezing, {
  tweezer: tweezerHelper(Tweezer),
})

describe('Tweezing', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Helper, {
      propsData: {
        to: 0,
        duration: 30,
      },
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
