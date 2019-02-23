<template>
  <vue-markdown class="markdown" :source="markdown"></vue-markdown>
</template>

<script>
export default {
  props: ['gist_file'],
  data: () => ({
    markdown: ''
  }),
  methods: {
    refresh() {
      fetch(`https://api.github.com/gists/${this.gist_file.gist_id}`)
        .then(response => response.json())
        .then(json => json.files[this.gist_file.file_name].content)
        .then(markdown => this.markdown = markdown)
    }
  },
  watch: {
    gist_file() {
      this.refresh()
    }
  },
  mounted() {
    this.refresh()
  }
}
</script>
