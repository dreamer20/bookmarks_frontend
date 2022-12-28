import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBookmarks = defineStore('bookmarks', () => {
  const bookmarks = ref([])
  const editedBookmark = ref(null)
  const deletedBookmarks = ref(new Set())
  const searchString = ref('')
  const filteredBookmarks = computed(() => {
    return bookmarks.value.filter((bookmark) => bookmark.title.toLowerCase().indexOf(searchString.value) !== -1)
  })

  function addBookmark(bookmark) {
    bookmarks.value.push(bookmark)
  }

  function setBookmarks(bookmarks) {
    bookmarks.value = bookmarks
  }

  function setEditedBookmark(bookmark) {
    editedBookmark.value = Object.assign({}, bookmark)
  }

  function addDeletedBookmark(id) {
    deletedBookmarks.value.add(id)
  }

  function removeDeletedBookmark(id) {
    deletedBookmarks.value.delete(id)
  }

  return {
    bookmarks,
    editedBookmark,
    deletedBookmarks,
    searchString,
    filteredBookmarks,
    addBookmark,
    setBookmarks,
    setEditedBookmark,
    addDeletedBookmark,
    removeDeletedBookmark
  }
})
