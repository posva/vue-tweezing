import { Easing } from '@tweenjs/tween.js'

export class Tween {
  constructor ({ value }) {
    this.startValue = value
  }

  to ({ value }, options) {
    this.endValue = value
    this.options = options
    return this
  }

  easing (easing) {
    this.easing = easing
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
    this.value = this.endValue
    this.tick(this.value)
    this.done()
  }
}

export default {
  Tween,
  Easing,
}
