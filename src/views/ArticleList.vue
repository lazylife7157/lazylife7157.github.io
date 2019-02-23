<template>
  <ul class="list">
    <li v-for="(item, i) in list" :key="i">
      <router-link :to="`/${parent}/${item.name}`">
        {{ item.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['parent', 'list'],
}
</script>

<style lang="sass" scoped>
.list
  margin: 2rem 0
  text-align: center
  li
    margin-top: 0.8rem
</style>
