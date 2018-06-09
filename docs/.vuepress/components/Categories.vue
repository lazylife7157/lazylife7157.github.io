<template>
<ul>
    <li v-for="posts, category in posts_of_categories">
        <h2>{{ category }}</h2>
        <Posts :posts="posts" />
    </li>
</ul>
</template>


<script>
import Posts from './Posts.vue';

export default {
    computed: {
        posts_of_categories () {
            let posts_of_categories = {};

            this.$site.pages
                .filter(page => page.path.startsWith('/posts/'))
                .forEach(page => {
                    const category = page.frontmatter.category

                    if (!posts_of_categories[category])
                        posts_of_categories[category] = [];

                    posts_of_categories[category].push({
                        title: page.title,
                        path: page.path,
                        category: category,
                        tage: page.frontmatter.tags
                    });
                });

            return posts_of_categories;
        }
    },
    components: {
        Posts
    }
}
</script>


<style lang="sass" scoped>

</style>
