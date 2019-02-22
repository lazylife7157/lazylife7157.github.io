<template>
  <div id="app">
    <ul id="nav">
      <li><router-link to="/posts">POSTS</router-link></li>
      <li><router-link to="/about">ABOUT</router-link></li>
    </ul>
    <div class="container">
      <div class="spacer"></div>
      <router-view class="view" />
      <div class="spacer"></div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="sass">
@import 'open-color/open-color.scss'
@import 'assets/css/default.sass'
@import 'assets/css/markdown.sass'

#app
  display: flex
  flex-direction: column
  justify-content: flex-start
  align-items: center
  height: 100vh

#nav
  width: 100%
  text-align: center
  background-color: $oc-gray-9
  padding: 2rem 0

  li
    display: inline
    margin: 0.5rem
    font-size: 1.1rem

    a
      color: $oc-violet-3
      text-decoration: none
      &:hover
        font-weight: bold
      &.router-link-active
        font-weight: bold
        color: $oc-pink-3

.container
  display: flex
  flex-direction: row
  width: 100%
  height: 100%

  @media (max-width: 800px)
    .spacer
      flex: 0
    .view
      flex: 1

  @media (min-width: 800px)
    .spacer
      flex: 1 1 0px
    .view
      flex: 4 1 800px
      max-width: 1024px
</style>
