<template>
  <Tweezing v-bind="$props">
    <pre slot-scope="val">{{ val }}</pre>
  </Tweezing>
</template>

<script>
import { Tweezing } from '../../src'

export default {
  props: ['to', 'duration', 'other', 'easing'],
  components: { Tweezing },
}
</script>
