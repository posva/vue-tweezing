export default class Tweezer {
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
