import { mount, createLocalVue } from '@vue/test-utils'
import { Tweezing } from '../src'
import Helper from './utils/Helper'

// TODO use custom tweening
let tween
function custom (start, end, opts) {
  tween = {
    start: () => this.value = start,
    end: () => this.value = end,
    stop () { this.end() },
  }
  return tween
}

function other () {
  tween = {
    start: () => this.value = 0,
    end: () => this.value = 10,
  }
  return tween
}

describe('Tweezing', () => {
  describe('Custom tween', () => {
    let wrapper
    beforeEach(() => {
      const localVue = createLocalVue()
      localVue.use(Tweezing, {
        custom,
      })

      wrapper = mount(Helper, {
        localVue,
        propsData: {
          to: 0,
          tween: undefined,
        },
      })
    })

    test('changes the value', () => {
      tween.start()
      wrapper.setProps({ to: 1 })
      expect(wrapper.text()).toBe('0')
      tween.end()
      wrapper.update()
      expect(wrapper.text()).toBe('1')
    })

    test('can use custom tween function', () => {
      expect(wrapper.find(Tweezing).vm.tweenFn).toBe(custom)
      const spy = jest.fn()
      wrapper.setProps({ tween: spy })
      expect(wrapper.find(Tweezing).vm.tweenFn).toBe(spy)
    })
  })

  test('register Tweezing component by default', () => {
    const localVue = createLocalVue()
    localVue.use(Tweezing, { custom })
    expect(localVue.component('Tweezing')).toBeDefined()
  })

  test('customize component name', () => {
    const localVue = createLocalVue()
    localVue.use(Tweezing, {
      name: 'MyTween',
      custom,
    })

    expect(localVue.component('Tweezing')).not.toBeDefined()
    expect(localVue.component('MyTween')).toBeDefined()
  })

  test('use multiple tween engines', () => {
    const localVue = createLocalVue()
    localVue.use(Tweezing, {
      custom,
      other,
    })

    const wrapper = mount(Helper, {
      localVue,
      propsData: {
        to: 0,
        tween: 'other',
      },
    })
    expect(wrapper.find(Tweezing).vm.tweenFn).toBe(other)
    wrapper.setProps({ tween: 'custom' })
    expect(wrapper.find(Tweezing).vm.tweenFn).toBe(custom)
    wrapper.setProps({ tween: 'default' })
    expect(wrapper.find(Tweezing).vm.tweenFn).toBe(custom)
  })
})
