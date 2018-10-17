<template>
  <Tweezing v-bind="$props">
    <pre slot-scope="val">{{ val | trim }}</pre>
  </Tweezing>
</template>

<script>
import { Tweezing } from '../../src'

export default {
  props: ['to', 'duration', 'other', 'easing', 'interpolation', 'delay', 'tween'],
  components: { Tweezing },
  filters: {
    trim (v) {
      return JSON.stringify(v).replace(/\s+/g, '')
    },
  },
}
</script>
