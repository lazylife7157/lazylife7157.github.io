<template>
  <vue-markdown class="markdown" :source="markdown"></vue-markdown>
</template>

<script>
export default {
  props: ['href'],
  data: () => ({
    markdown: ''
  }),
  methods: {
    refresh() {
      fetch(this.href)
        .then(response => response.text())
        .then(text => this.markdown = text)
    }
  },
  watch: {
    href() {
      this.refresh()
    }
  },
  mounted() {
    this.refresh()
  }
}
</script>
