import Vue from 'vue'
import Router from 'vue-router'
import DynamicMarkdown from './components/DynamicMarkdown.vue'
import posts from "@/assets/posts.json"
import notes from "@/assets/notes.json"


Vue.use(Router)

function route_article(name, list) {
  return {
    path: `/${name}`,
    name: name,
    component: () => import('./views/Article.vue'),
    props: {
      name,
      list
    },
    children: [
      ...list.map(item => ({
        path: item.name,
        name: item.name,
        component: DynamicMarkdown,
        props: {
          href: item.url
        }
      }))
    ]
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/posts'
    },
    route_article('posts', posts),
    route_article('notes', notes),
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
  ]
})
