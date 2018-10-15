# VueTweezing [![Build Status](https://badgen.net/circleci/github/posva/vue-tweezing)](https://circleci.com/gh/posva/vue-tweezing) [![npm package](https://badgen.net/npm/v/vue-tweezing)](https://www.npmjs.com/package/vue-tweezing) [![coverage](https://badgen.net/codecov/c/github/posva/vue-tweezing)](https://codecov.io/github/posva/vue-tweezing) [![thanks](https://badgen.net/badge/thanks/♥/pink)](https://github.com/posva/thanks)

> Easy, customizable and automatic tweening nicely served in scoped slots

VueTweezing works with any tweening engine and provide easy integration with some engines like
[tween.js](https://github.com/tweenjs/tween.js) and [Tweezer](https://github.com/jaxgeller/tweezer.js/)

[Demo](https://state-animations-amsterdam.surge.sh/polygon), [source](https://github.com/posva/state-animation-demos/blob/master/pages/polygon.vue)

## Usage

Install it as a plugin:

```js
import { Tweezing, tweezerHelper } from 'vue-tweezing'
// import Tweezer to use it as our Tweening engine
import Tweezer from 'tweezer.js'

// install the plugin with as many engines as you want
// use the tweezerHelper to generate the function
// needed by VueTweezing to handle tweezing
Vue.use(Tweezing, {
  tweezer: tweezerHelper(Tweezer),
})
```

Use it as a component:

```vue
<Tweezing ref="tweezing" :to="value" duration="500" @end="doSomething">
  <pre slot-scope="tweenedValue">
    target: {{ value }}
    val: {{ tweenedValue }}
  </pre>
</Tweezing>
```

Change `value` as you would usually do:

```js
const vm = new Vue({
  el: '#app',
  data: {
    value: 0,
  },
})
// somewhere else
vm.value = 200
```

You can play with the tween object by accessing the property `$tween` in the `Tweening` component:

```js
// given the example above
vm.$refs.tweezing.$tween.stop()
```

## Passing tweening options

Any prop passed to `Tweezing` different from `tween` and `to` will be considered an option and passed

## Supported Tweening engines

WIP

### Tweezer

### Tween.js

### Adding your own

WIP

You can check the examples in `src/index.js` to see how to create your own helpers.

## License

[MIT](http://opensource.org/licenses/MIT)
