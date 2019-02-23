import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMarkdown from 'vue-markdown'
import GistMarkdown from './components/GistMarkdown.vue'

Vue.config.productionTip = false
Vue.component('vue-markdown', VueMarkdown);
Vue.component('gist-markdown', GistMarkdown);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
