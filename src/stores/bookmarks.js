import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBookmarks = defineStore('bookmarks', () => {
  const bookmarks = ref([])
  const editedBookmark = ref(null)
  const deletedBookmarks = ref(new Set())
  const searchString = ref('')
  const filteredBookmarks = computed(() => {
    if (searchString.value[0] === '#') {
      return bookmarks.value.filter(
        (bookmark) => {
          if (bookmark.tags) {
            return bookmark.tags.indexOf(searchString.value.slice(1)) !== -1
          }
        }
      )
    } else {
      return bookmarks.value.filter(
        (bookmark) => bookmark.title.toLowerCase().indexOf(searchString.value) !== -1
      )
    }
  })

  function addBookmark(bookmark) {
    bookmarks.value.push(bookmark)
  }

  function setBookmarks(_bookmarks) {
    bookmarks.value = _bookmarks
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

  function updateBookmark(updated_bookmark) {
    const bookmarkIndex = bookmarks.value.findIndex((bookmark) => bookmark.id === updated_bookmark.id)
    bookmarks.value[bookmarkIndex] = updated_bookmark
  }

  function setSearchString(value) {
    searchString.value = value
  }

  function reset() {
    bookmarks.value = []
    editedBookmark.value = null
    deletedBookmarks.value = new Set()
    searchString.value = ''
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
    removeDeletedBookmark,
    updateBookmark,
    setSearchString,
    reset
  }
})
