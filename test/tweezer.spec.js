import { mount, createLocalVue } from '@vue/test-utils'
import { Tweezing, tweezerHelper } from '../src'
// import Tweezer from 'tweezer.js'
import Helper from './Helper'

class Tweezer {
  constructor ({ start, end }) {
    this.start = start
    this.end = end
    this.tick = () => {}
    this.done = () => {}
  }

  on (event, fn) {
    this[event] = fn
    return this
  }

  begin () {
    this.value = this.start
    this.tick(this.value)
    return this
  }

  stop () {
    return this
  }

  // Custom function to make it end
  _end () {
    this.value = this.end
    this.tick(this.value)
    this.done()
  }
}

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

  test('emits done when done', () => {
    const tweezing = wrapper.find(Tweezing)
    tweezing.vm.$tween._end()
    expect(tweezing.emitted().done).toBeTruthy()
    expect(tweezing.emitted().done.length).toBe(1)
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
      Tweezer.apply(this, args)
    }
    Mock.prototype = Tweezer.prototype
    const localVue = createLocalVue()
    localVue.use(Tweezing, {
      tweezer: tweezerHelper(Mock),
    })
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
      start: 0,
      end: 0,
      duration: 10,
      other: true,
    })
    spy.mockRestore()
  })
})
