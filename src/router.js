import Vue from 'vue'
import Router from 'vue-router'
import DynamicMarkdown from './components/DynamicMarkdown.vue'
import posts from "@/assets/posts.json"


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/posts',
      alias: '/',
      name: 'posts',
      component: () => import('./views/Posts.vue'),
      props: {
        posts
      },
      children: [
        ...posts.map(post => ({
          path: post.name,
          name: post.name,
          component: DynamicMarkdown,
          props: {
            href: post.url
          }
        }))
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
  ]
})
