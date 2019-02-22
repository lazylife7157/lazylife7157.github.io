import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMarkdown from 'vue-markdown'
import DynamicMarkdown from './components/DynamicMarkdown.vue'

Vue.config.productionTip = false
Vue.component('vue-markdown', VueMarkdown);
Vue.component('markdown', DynamicMarkdown);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
