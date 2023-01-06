<script setup>
  import { computed } from 'vue'
  import { useBookmarks } from '../stores/bookmarks';

  const bookmarks = useBookmarks()
  const isClearButtonVisible = computed(() => bookmarks.searchString ? true : false)

  function clear() {
    bookmarks.setSearchString('')
  }
</script>

<template>
  <va-form class="search-form">
    <va-input
      class="search-input mb-4"
      placeholder="Search bookmark (by tags: #tagname)"
      v-model="bookmarks.searchString">
      <template #appendInner>
        <va-icon
          name="cancel"
          color="--va-primary"
          v-if="isClearButtonVisible"
          @click="clear" />
      </template>

    </va-input>

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