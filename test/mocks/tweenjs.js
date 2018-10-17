import { Easing, Interpolation } from '@tweenjs/tween.js'

export class Tween {
  constructor (container) {
    this.startValue = container
  }

  to (container, options) {
    this.endValue = container
    this.options = options
    return this
  }

  interpolation () {
    return this
  }

  easing () {
    return this
  }

  delay () {
    return this
  }

  onStart (fn) {
    this.startFn = fn
    return this
  }

  onUpdate (fn) {
    this.tick = fn
    return this
  }

  onComplete (fn) {
    this.done = fn
    return this
  }

  start () {
    this.startFn()
    this.value = this.startValue
    this.tick(this.value)
    return this
  }

  stop () {
    return this
  }

  // Custom function to make it end
  _end () {
    Object.assign(this.value, this.endValue)
    this.tick(this.value)
    this.done()
  }
}

export default {
  Tween,
  Easing,
  Interpolation,
}
