// collection of functions to create tweens
const tweeners = {}

export const Tweezing = {
  props: {
    to: [Number, Object],
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
    ensureValue (val) {
      const targetType = typeof val
      const currentType = typeof this.value
      if (targetType === currentType) return
      // set initial value to current value
      if (targetType === 'number') {
        this.value = val
      } else if (targetType === 'object') {
        this.value = Object.keys(val).reduce((values, name) => {
          values[name] = val[name]
          return values
        }, {})
      }
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
      const type = typeof to
      this.ensureValue(to)

      if (type === 'number') {
        this.$tween = this.tweenFn(this.value, to, {
          $setValue: v => {
            this.value = v
          },
          ...this.$attrs,
        })
      } else if (type === 'object') {
        this.$tween = Object.keys(to).reduce((tweens, name) => {
          tweens[name] = this.tweenFn(this.value[name], to[name], {
            $setValue: v => {
              this.value[name] = v
            },
            ...this.$attrs,
          })
          return tweens
        }, Object.create(null))
      }
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
    // cancel previous tween
    if (this.$tween) {
      if (!this.$tween.__proto__) {
        for (const key in this.$tween) this.$tween[key].stop()
      } else {
        this.$tween.stop()
      }
    }
    let started
    return new Tweezer({
      start,
      end,
      ...opts,
    }).on('tick', value => {
      if (!started) {
        started = true
        this.$emit('start')
      }
      opts.$setValue(value)
    }).on('done', () => this.$emit('end'))
      .begin()
  }
}

export function tweenjsHelper (TWEEN) {
  return function (value, end, opts) {
    const container = { value }
    // cancel previous tween
    this.$tween && this.$tween.stop()
    return new TWEEN.Tween(container)
      .to({ value: end }, opts.duration)
      .interpolation(opts.interpolation || TWEEN.Interpolation.Linear)
      .easing(opts.easing || TWEEN.Easing.Quadratic.Out)
      .onStart(() => this.$emit('start'))
      .onUpdate(() => {
        opts.$setValue(container.value)
      })
      .onComplete(() => this.$emit('end'))
      .start()
  }
}
