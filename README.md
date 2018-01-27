vue-tweezing
===

> Easy, customizable and automatic tweening nicely served in scoped slots

VueTweezing works with any tweening engine and provide easy integration with some engines like
[Tween.js](), [Tweezer]() and [Shiftly]().

Demo (TODO link)

## Usage

Install it as a plugin:

```js
import { Tweezing, tweezerHelper } from 'vue-tweezing'
// import Tweezer to use it as our Tweening engine
import Tweezer 'tweezer.js'

// install the plugin with one single engines
// use the tweezerHelper to generate the function
// needed by VueTweezing to handle tweezing
Vue.use(Tweezing, {
  tweezer: tweezerHelper(Tweezer)
})
```

Use it as a component:

```vue
<Tweezing ref="tweezing" :to="value" duration="500" @done="doSomething">
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
    value: 0
  }
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

### Tweezer

### Tween.js

### Adding your own

You can check the examples in `src/index.js` to see how to create your own helpers.

## License

[MIT](http://opensource.org/licenses/MIT)
