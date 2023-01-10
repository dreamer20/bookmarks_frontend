<script setup>

const props = defineProps([
    'bookmarks',
    'setSearchString',
    'editBookmark',
    'deleteBookmark',
    'isFetching',
    'deletedBookmarks'
])
</script>

<template>
    <va-list class="list-wrapper">
      <va-list-item v-for="bookmark in props.bookmarks"
      class="list__item">
        <va-list-item-section class="icon-wrapper">
            <img 
              class="icon"
              :src="bookmark.icon_url" 
              onerror="this.onerror=null;this.src='/favicon.ico';"
              alt="Bookmark icon">
        </va-list-item-section>
        <va-list-item-section>
          <span class="bookmark-title">
            <a :href="bookmark.url" class="va-link" target="_blank">
              {{ bookmark.title }}
            </a>
          </span>
          <va-list-item-label>
            <span
              class="tag"
              v-if="bookmark.tags"
              v-for="tag in bookmark.tags.split(',')">
              <span
                class="tag-inner" 
                @click="props.setSearchString(`#${tag}`)">
                #{{ tag }}
              </span>
            </span>
          </va-list-item-label>
        </va-list-item-section>
        <va-list-item-section icon>
          <va-icon
            name="edit_square"
            class="edit"
            @click="props.editBookmark(bookmark)"/>
        </va-list-item-section>
        <va-list-item-section icon>
          <va-icon 
            v-if="props.isFetching && props.deletedBookmarks.has(bookmark.id)"
            name="sync"
            class="delete"
            spin />
          <va-icon
            v-else
            name="delete"
            class="delete"
            @click="props.deleteBookmark(bookmark.id)"/>
        </va-list-item-section>
      </va-list-item>
    </va-list>
</template>

<style scoped>
  .edit {
    cursor: pointer;
    color: #5f4807
  }

  .delete {
    cursor: pointer;
    color: #d7234e;
  }

  .icon-wrapper {
    flex: 0 0 auto;
  }
  
  .icon {
    width: 24px;
    height: 24px;
  }

  .bookmark-title {
    font-weight: 700;
    font-size: large;
  }

  .tag {
    color: #5f4807;
    text-decoration: underline #5f4807;
    padding: 0 5px;
  }
  
  .tag-inner:hover {
    color: #a93511;
    text-decoration: underline #a93511;
    cursor: pointer;
  }
</style>