# vue-tweezing

## Basic Usage

It's better to install it as a plugin, to add a default tweening engine:

```js
import { Tweezing, tweezerHelper } from 'vue-tweezing'
// import Tweezer to use it as our Tweening engine
import Tweezer from 'tweezer.js'

// install the plugin with one single engines
// use the tweezerHelper to generate the function
// needed by VueTweezing to handle tweezing
Vue.use(Tweezing, {
  tweezer: tweezerHelper(Tweezer)
})
```

Then you get access to the component `Tweezing`:

```html
<Tweezing ref="tweezing" :to="value" duration="500" @end="doSomething">
  <pre slot-scope="tweenedValue">
    target: {{ value }}
    val: {{ tweenedValue }}
  </pre>
</Tweezing>
```

In your js you can change `value` as you would usually:

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

That will trigger a new tween using Tweezer. See [Tweezer helper documentation](#Tweezer) for more information.

You can play with the tween object by accessing the property `$tween` in the `Tweening` component:

```js
// given the example above
vm.$refs.tweezing.$tween.stop()
```

