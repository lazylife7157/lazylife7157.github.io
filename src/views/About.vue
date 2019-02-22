<template>
  <div class="about">
    <ul>
      <li v-for="(item, i) in list" :key="i">
        <a :href="item.href" target="blank">{{ item.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    list: [{
      href: 'https://github.com/lazylife7157',
      text: 'Github'
    }, {
      href: 'https://www.linkedin.com/in/%EB%AF%BC%EB%B2%94-%EC%A1%B0-b948a7111/',
      text: 'Linkedin'
    }, {
      href: 'mailto:lazylife7157@gmail.com',
      text: 'Email'
    }]
  })
}
</script>

<style lang="sass" scoped>
.about
  ul
    margin-top: 2rem
    text-align: center
    li
      margin-top: 0.8rem
</style>
