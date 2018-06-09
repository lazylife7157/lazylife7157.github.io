<template>
<ul>
    <li v-for="post in posts" >
        <a :href="post.path">{{ post.title }} </a>
    </li>
</ul>
</template>


<script>
export default {
    props: ['posts']
}
</script>


<style lang="sass" scoped>

</style>
