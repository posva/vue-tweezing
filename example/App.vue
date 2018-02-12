<template>
  <div id="app" @mousemove="mouseX = $event.clientX">
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

    <input type="number" v-model.number="value" />
    <input type="number" v-model.number="duration" />
    <Tweezing :to="object" tween="tweenjs" :duration="500">
      <pre slot-scope="data">{{ data }}</pre>
    </Tweezing>
    <Tweezing :to="array" tween="tweenjs" :duration="500">
      <pre slot-scope="data">{{ data }}</pre>
    </Tweezing>
    <Tweezing :to="value" tween="custom" :time="mouseXPer">
      <pre slot-scope="data">Custom: {{ data }}</pre>
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
  playbackTweenjs(value, end, opts, vm) {},
  custom(value, end, opts, vm) {
    if (vm._unwatchCustom) vm._unwatchCustom()
    const change = end - value
    const duration = 1
    // TODO custom stop function?
    vm._unwatchCustom = vm.$watch(
      '$attrs.time',
      time => {
        // linear easing inline
        opts.$setValue(change * time / duration + value)
      },
      { immediate: true }
    )
  },
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
    array: [0],
    mouseX: 0,
    // could also be just 'tweezer'
    tween: 'tweezer',
  }),

  methods: {
    toggle() {
      const target = 200
      this.value = this.value > target / 2 ? 0 : target
      this.array = Array.from(
        Array(1 + Math.floor(Math.random() * 3)),
        () => target * Math.random()
      )
    },
  },

  computed: {
    object() {
      return {
        value: this.value,
        duration: this.duration,
      }
    },

    mouseXPer() {
      return this.mouseX / document.documentElement.clientWidth
    },
  },

  components: { Tweezing },
}
</script>
