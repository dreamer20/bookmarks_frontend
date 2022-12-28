<script setup>
import { onBeforeMount, ref } from 'vue';
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
      bookmarks.bookmarks = data
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
    <va-list class="list-wrapper">
      <va-list-label>
        Bookmarks
      </va-list-label>
      <va-list-item v-for="bookmark in bookmarks.filteredBookmarks"
      class="list__item">
        <va-list-item-section class="icon-wrapper">
            <img 
              class="icon"
              :src="bookmark.icon_url" 
              onerror="this.onerror=null;this.src='https://via.placeholder.com/24';"
              alt="">
        </va-list-item-section>
        <va-list-item-section>
          <span class="bookmark-title">
            <a :href="bookmark.url" class="va-link" target="_blank">
              {{ bookmark.title }}
            </a>
          </span>
        </va-list-item-section>
        <va-list-item-section icon>
          <va-icon
            name="edit_square"
            class="edit"
            @click="editBookmark(bookmark)"/>
        </va-list-item-section>
        <va-list-item-section icon>
          <va-icon 
            v-if="isFetching && bookmarks.deletedBookmarks.has(bookmark.id)"
            name="sync"
            class="delete"
            spin />
          <va-icon
            v-else
            name="delete"
            class="delete"
            @click="deleteBookmark(bookmark.id)"/>
        </va-list-item-section>
      </va-list-item>
    </va-list>
</template>


<style scoped>
  .centered {
    display: flex;
    justify-content: center;
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
</style>