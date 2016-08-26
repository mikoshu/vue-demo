var Vue = require('vue')
Vue.config.debug = true;

var app = new Vue({
  el: '#app',
  data: {
    views: 'my-input'
  },
  components: {
    'my-input': require('./components/input.vue')
  }
})