<template>
  <div id="app">
    <button @click="toggle">toggle ({{ value }})</button>
    <Tweezing :to="value" :tween="tween" :duration="duration">
      <pre slot-scope="val">
target: {{ value }}
val: {{ val }}
      </pre>
    </Tweezing>
    <Tweezing tween="tweenjs" :to="value" :duration="duration">
      <template slot-scope="val">
        <pre>
target: {{ value }}
val: {{ val }}
        </pre>
      </template>
    </Tweezing>
  </div>
</template>

<script>
import Vue from 'vue'
import { Tweezing, tweezerHelper, tweenjsHelper } from '../src'
import Tweezer from 'tweezer.js'
import TWEEN from '@tweenjs/tween.js'

Vue.use(Tweezing, {
  tweezer: tweezerHelper(Tweezer),
  tweenjs: tweenjsHelper(TWEEN),
})

const tick = () => {
  TWEEN.update()
  requestAnimationFrame(tick)
}
requestAnimationFrame(tick)

export default {
  data: () => ({
    value: 0,
    duration: 500,
    // could also be just 'tweezer'
    tween: tweezerHelper(Tweezer),
  }),

  methods: {
    toggle () {
      const target = 200
      this.value = this.value > target / 2 ? 0 : target
    }
  },

  components: { Tweezing }
}
</script>
