<script setup>
  import { ref } from 'vue';
  import { useModals } from '../stores/modals';
  import { useAuth } from '../stores/auth';
  import { useBookmarks } from '../stores/bookmarks';
  import { useGlobalError } from '../stores/globalError';
  import { api } from '../api';

  const modals = useModals()
  const auth = useAuth()
  const globalError = useGlobalError()
  const bookmarks = useBookmarks()
  const isFetching = ref(false)
  const editForm = ref(null)
  const errorMessage = ref('')

  function closeModal() {
    modals.setIsEditModalOpen(false)
  }

  const titleValidation = [
    (v) => v.trim() || 'Title can\'t be empty'
  ]

  const inputValidation = [
    (v) => v.match(/^https?:\/\//gi) || 'Link must start with http(s)://'
  ]

  async function saveBookmark() {
    errorMessage.value = ''

    if (!editForm.value.validate()) return

    try {
      isFetching.value = true
      const response = await api.updateBookmark(auth.token, bookmarks.editedBookmark)

      if (!response.ok) {
        const data = await response.json()
        errorMessage.value = data.detail
      } else {
        const updated_bookmark = await response.json()
        const bookmarkIndex = bookmarks.bookmarks.findIndex((bookmark) => bookmark.id === updated_bookmark.id)

        bookmarks.bookmarks[bookmarkIndex] = updated_bookmark
        closeModal()
      }
    } catch (err) {
      globalError.setMessage(err)
    } finally {
      isFetching.value = false
    }
  }
</script>

<template>
  <va-modal
    v-model="modals.isEditModalOpen">
    <template #content="{ok}">
      <va-card-title>
        Edit bookmark
      </va-card-title>
      <va-card-content>
        <va-form ref="editForm" @validation="validation = $event">
          <div>
            <va-input
              label="Title"
              v-model="bookmarks.editedBookmark.title"
              class="mb-4 form-control"/>
          </div>
          <va-input
            label="URL"
            v-model="bookmarks.editedBookmark.url"
            class="mb-4 form-control"/>
          <p style="color: #d7234e;">{{ errorMessage }}</p>
          <div class="submit-wrapper">
            <va-button
              preset="primary"
              class="mr-3"
              @click="closeModal">
              Cancel
            </va-button>
            <va-button :loading="isFetching" @click="saveBookmark">
              Save
            </va-button>
          </div>
        </va-form>
      </va-card-content>
    </template>
  </va-modal>
</template>

<style scoped>

  .form-control {
    width: 300px;
  }
  .submit-wrapper {
    display: flex;
    justify-content: flex-end;
  }
</style>