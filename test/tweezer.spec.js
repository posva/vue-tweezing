import { mount, createLocalVue } from '@vue/test-utils'
import { Tweezing, tweezerHelper } from '../src'
import Tweezer from './mocks/tweezer'
import Helper from './utils/Helper'

const localVue = createLocalVue()
localVue.use(Tweezing, {
  tweezer: tweezerHelper(Tweezer),
})

describe('Tweezer', () => {
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

  test('accepts an object of values', () => {
    const tweezing = wrapper.find(Tweezing)
    wrapper.setProps({ to: { a: 0, b: 0 } })
    // tweezing.vm.$tween._start()
    wrapper.setProps({ to: { a: 1, b: 1 } })
    expect(wrapper.text()).toBe('{"a":0,"b":0}')
    tweezing.vm.$tween.a._end()
    tweezing.vm.$tween.b._end()
    wrapper.update()
    expect(wrapper.text()).toBe('{"a":1,"b":1}')
  })

  test('stops ongoing tween with a new one', () => {
    const tweezing = wrapper.find(Tweezing)
    const spy = jest.spyOn(tweezing.vm.$tween, 'stop')
    wrapper.setProps({ to: 1 })
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  describe('Options', () => {
    let spy
    let localVue
    beforeEach(() => {
      spy = jest.fn()
      function Mock (...args) {
        spy(...args)
        Tweezer.apply(this, args)
      }
      Mock.prototype = Tweezer.prototype
      localVue = createLocalVue()
      localVue.use(Tweezing, {
        tweezer: tweezerHelper(Mock),
      })
    })

    afterEach(() => {
      spy.mockRestore()
    })

    test('should pass on props as options', () => {
      wrapper = mount(Helper, {
        localVue,
        propsData: {
          to: 0,
          // these have to be added in Helper.vue
          duration: 10,
          other: true,
        },
      })
      const opts = spy.mock.calls[0][0]
      expect(opts).toBeTruthy()
      expect(opts.start).toBe(0)
      expect(opts.end).toBe(0)
      expect(opts.duration).toBe(10)
      expect(opts.other).toBe(true)
    })

    test('pass on easing prop', () => {
      wrapper = mount(Helper, {
        localVue,
        propsData: {
          to: 0,
          easing: 'foo',
        },
      })
      const opts = spy.mock.calls[0][0]
      expect(opts).toBeTruthy()
      expect(opts.start).toBe(0)
      expect(opts.end).toBe(0)
      expect(opts.easing).toBe('foo')
    })
  })
})
