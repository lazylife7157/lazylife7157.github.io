<template>
  <div>
    <router-view />
    <div v-if="!is_root" class="divider"></div>
    <ul class="posts">
      <li v-for="(post, i) in posts" :key="i">
        <router-link :to="`/posts/${post.name}`">
          {{ post.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['posts'],
  computed: {
    is_root() {
      return this.$route.name === 'posts'
    }
  }
}
</script>

<style lang="sass" scoped>
@import 'open-color/open-color.scss'

.divider
  margin: 2rem 0
  width: 100%
  height: 1px
  background-color: $oc-gray-7

.posts
  margin: 2rem 0
  text-align: center
  li
    margin-top: 0.8rem
</style>
