<template>
  <div>
    <Content :custom="false">
      {{ $page.frontmatter.date }}
    </Content>
  </div>
</template>

<script>

export default {
  computed: {
  }
}
</script>

<style scoped>

</style>
