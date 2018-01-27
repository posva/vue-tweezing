// collection of functions to create tweens
const tweeners = {}

export const Tweezing = {
  props: {
    to: Number,
    tween: {
      type: [String, Function],
      default: () => 'default',
    },
  },

  data () {
    return {
      value: 0,
    }
  },

  created () {
    // ensure the watcher of tween to be called first so
    // tweenFn exists in `to` watcher
    this.$options.watch.tween.call(this, this.tween)
    this.value = this.to
    this.$options.watch.to.call(this, this.to)
  },

  render (h) {
    const node = this.$scopedSlots.default(this.value)
    if (Array.isArray(node)) {
      // TODO dev error
      return node[0]
    }
    return node
  },

  methods: {
    done () {
      this.$emit('done')
    },
  },

  watch: {
    tween  (tween) {
      if (typeof tween === 'function') {
        this.tweenFn = tween
      } else {
        // TODO warning if not string or non-existant
        this.tweenFn = tweeners[tween]
      }
    },
    to (to, old) {
      this.$tween = this.tweenFn(this.value, to, this.$attrs)
    },
  },

  // to use as a plugin
  install (Vue, options = {}) {
    Vue.component(options.name || 'Tweezing', Tweezing)
    const defaultTweener = options.default
    // could have used {name, default, ...options} but I don't really like
    // the way bubel polyfills it (even in es)
    delete options.name
    delete options.default
    const tweenerNames = Object.keys(options)
    tweenerNames.forEach(tweener => {
      tweeners[tweener] = options[tweener]
    })
    // Use the first one or anyone provided by the user
    tweeners.default = tweeners[defaultTweener || tweenerNames[0]]
  },
}

// helper for tweezer.js
export function tweezerHelper (Tweezer) {
  return function (start, end, opts) {
    return new Tweezer({
      start,
      end,
      ...opts,
    }).on('tick', value => {
      this.value = value
    }).on('done', () => this.done())
      .begin()
  }
}

export function tweenjsHelper (TWEEN) {
  return function (value, end, opts) {
    const container = { value }
    return new TWEEN.Tween(container)
      .to({ value: end }, opts.duration)
      .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
      .onUpdate(() => {
        this.value = container.value
      })
      .onComplete(() => this.done())
      .start()
  }
}
