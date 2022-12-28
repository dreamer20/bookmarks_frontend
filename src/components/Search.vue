<script setup>
  import { useBookmarks } from '../stores/bookmarks';

  const bookmarks = useBookmarks()
</script>

<template>
  <va-form class="search-form">
    <va-input
      class="search-input mb-4"
      placeholder="Search bookmark"
      v-model="bookmarks.searchString"/>
  </va-form>
</template>

<style scoped>
  .search-form {
    width: 100%;
  }

  .search-input {
    width: 100%;
  }
</style>