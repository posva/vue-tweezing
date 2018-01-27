<template>
  <Tweezing v-bind="$attrs">
    <pre slot-scope="val">{{ val }}</pre>
  </Tweezing>
</template>

<script>
import { Tweezing } from '../src'

export default {
  data: () => ({
    value: 0,
  }),
  components: { Tweezing },
}
</script>
