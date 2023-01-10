<script setup>
import { onBeforeMount, ref } from 'vue';
import ListView from './ListView.vue';
import ThumbnailsView from './ThumbnailsView.vue'
import { api } from '../api';
import { useBookmarks } from '../stores/bookmarks'
import { useGlobalError } from '../stores/globalError'
import { useAuth } from '../stores/auth';
import { useModals } from '../stores/modals';

const bookmarks = useBookmarks()
const globalError = useGlobalError()
const modals = useModals()
const auth = useAuth()
const isFetching = ref(false)
const view = ref('thumbnail')
const options = [
  {value: 'list', icon: 'format_list_bulleted'},
  {value: 'thumbnail', icon: 'grid_view'}
]

async function getBookmarks() {
  try {
    const response = await api.getBookmarks(auth.token)

    if (!response.ok) {
      localStorage.removeItem('token')
      auth.removeToken()
      auth.setIsAuthenticated(false)
      router.push('/login')
    } else {
      const data = await response.json()
      bookmarks.setBookmarks(data)
    }
  } catch (err) {
    globalError.setMessage(err)
  }
}

function editBookmark(bookmark) {
  bookmarks.setEditedBookmark(bookmark)
  modals.setIsEditModalOpen(true)
}

async function deleteBookmark(id) {
  try {
    isFetching.value = true
    bookmarks.addDeletedBookmark(id)
    const response = await api.deleteBookmark(auth.token, id)

    if (!response.ok) {
      const data = await response.json()
      globalError.setMessage(data.detail)
    } else {
      bookmarks.removeDeletedBookmark(id)
      bookmarks.bookmarks = bookmarks.bookmarks.filter((bookmark) => bookmark.id !== id)
    }
  } catch (err) {
    globalError.setMessage(err)
  } finally {
    isFetching.value = false
    bookmarks.removeDeletedBookmark(id)
  }
}

onBeforeMount(getBookmarks)
</script>

<template>
  <div class="toggle-wrapper">
    <va-button-toggle
      v-model="view"
      :options="options"
      preset="secondary"
      border-color="primary"
      size="small" />
  </div>
  <div class="title-wrapper">
    <div class="va-title">bookmarks</div>
  </div>
  <ThumbnailsView
    v-if="view === 'thumbnail' ? true : false"
    :bookmarks="bookmarks.filteredBookmarks"
    :edit-bookmark="editBookmark"
    :delete-bookmark="deleteBookmark"
    :set-search-string="bookmarks.setSearchString"
    :is-fetching="isFetching"
    :deleted-bookmarks="bookmarks.deletedBookmarks" />
  <ListView v-else
    :bookmarks="bookmarks.filteredBookmarks"
    :edit-bookmark="editBookmark"
    :delete-bookmark="deleteBookmark"
    :set-search-string="bookmarks.setSearchString"
    :is-fetching="isFetching"
    :deleted-bookmarks="bookmarks.deletedBookmarks" />
</template>


<style scoped>

.toggle-wrapper {
  display: flex;
  justify-content: flex-end;
}
  .title-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    color:rgb(169, 169, 169);
  }

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