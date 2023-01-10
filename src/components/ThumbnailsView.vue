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
    <div class="thumbnails">
      <div class="thumbnail" v-for="bookmark in props.bookmarks">
        <va-card>
          <va-card-title class="thumbnail-header">
            <span class="thumbnail-title" :title="bookmark.title">
              {{ bookmark.title }}
            </span>   
            <va-dropdown placement="bottom-end">
              <template #anchor>
                <va-icon
                  class="thumbnail-dropdown-btn" 
                  name="more_horiz" />
              </template>
          
              <va-dropdown-content>
                <div class="dropdown-list">
                  <div class="dropdown-item"
                    @click="props.editBookmark(bookmark)">
                    <span class="dropdown-item-text">
                      Edit
                    </span>
                    <va-icon
                      size="small"
                      name="edit_square"
                      color="#5f4807" />
                  </div>
                  <div class="dropdown-item">
                    <span class="dropdown-item-text"
                      @click="props.deleteBookmark">
                      Delete
                    </span>
                    <va-icon
                      size="small"
                      name="delete"
                      color="#d7234e" />
                  </div>
                </div>
              </va-dropdown-content>
            </va-dropdown>
          </va-card-title>
          <va-card-content class="thumbnail-content">
            <a :href="bookmark.url" target="_blank">
              <va-image
                :src="bookmark.thumbnail"
                style="height: 120px;" />
            </a>
          </va-card-content>
        </va-card>
    </div>
  </div>
</template>

<style scoped>

.thumbnails {
  display: flex;
  flex: 0 1 auto;
  flex-wrap: wrap;
  justify-content: center;
}

.thumbnail {
  margin: 10px;
  width: 200px;
}

.thumbnail-header {
  padding: 10px;
}

.thumbnail-title {
  white-space: nowrap;
  width: 100%;
  margin-right: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.thumbnail-dropdown-btn {
  cursor: pointer;
  color: #154EC1;
}

.thumbnail-dropdown-btn:hover {
  color: #3b69c6;
}

.thumbnail-content {
  padding: 0;
}

.dropdown-item {
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.dropdown-item:hover {
  color: #3b69c6;
}

.dropdown-item-text {
  padding-right: 5px;
}
</style>