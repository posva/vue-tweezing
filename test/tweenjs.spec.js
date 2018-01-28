import { mount, createLocalVue } from '@vue/test-utils'
import { Tweezing, tweenjsHelper } from '../src'
import TWEEN, { Tween } from './mocks/tweenjs'
import Helper from './utils/Helper'

const localVue = createLocalVue()
localVue.use(Tweezing, {
  tweenjs: tweenjsHelper(TWEEN),
})

describe('tween.js', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Helper, {
      localVue,
      propsData: {
        to: 0,
      },
    })
  })

  test('starts right away', () => {
    expect(wrapper.text()).toBe('0')
  })

  test('emits start when starting', () => {
    const tweezing = wrapper.find(Tweezing)
    expect(tweezing.emitted().start).toBeTruthy()
    expect(tweezing.emitted().start.length).toBe(1)
  })

  test('emits end when ending', () => {
    const tweezing = wrapper.find(Tweezing)
    tweezing.vm.$tween._end()
    expect(tweezing.emitted().end).toBeTruthy()
    expect(tweezing.emitted().end.length).toBe(1)
  })

  test('stops ongoing tween with a new one', () => {
    const tweezing = wrapper.find(Tweezing)
    const spy = jest.spyOn(tweezing.vm.$tween, 'stop')
    wrapper.setProps({ to: 1 })
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  test('should pass on props as options', () => {
    const spy = jest.fn()
    function Mock (...args) {
      spy(...args)
      Tween.apply(this, args)
    }
    Mock.prototype = Tween.prototype
    const localVue = createLocalVue()
    localVue.use(Tweezing, {
      tweezer: tweenjsHelper({ ...TWEEN, Tween: Mock }),
    })
    const spyTo = jest.spyOn(Tween.prototype, 'to')
    wrapper = mount(Helper, {
      localVue,
      propsData: {
        to: 0,
        // these have to be added in Helper.vue
        duration: 10,
        other: true,
      },
    })
    expect(spy).toHaveBeenCalledWith({
      value: 0,
    })
    expect(spyTo).toHaveBeenCalledWith({ value: 0 }, 10)
    spy.mockRestore()
    spyTo.mockRestore()
  })

  test('pass on easing prop', () => {
    const spy = jest.spyOn(Tween.prototype, 'easing')
    wrapper = mount(Helper, {
      localVue,
      propsData: {
        to: 0,
        easing: 'foo',
      },
    })
    expect(spy).toHaveBeenCalledWith('foo')
  })

  test('pass on interpolation prop', () => {
    const spy = jest.spyOn(Tween.prototype, 'interpolation')
    wrapper = mount(Helper, {
      localVue,
      propsData: {
        to: 0,
        interpolation: 'foo',
      },
    })
    expect(spy).toHaveBeenCalledWith('foo')
  })
})
