<template>
  <div>
    <router-view />
    <div v-if="!is_root" class="divider"></div>
    <ArticleList :parent="name" :list="list" />
  </div>
</template>

<script>
import ArticleList from './ArticleList.vue'


export default {
  props: ['name', 'list'],
  computed: {
    is_root() {
      return this.$route.name === this.name
    }
  },
  components: {
    ArticleList
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
</style>
