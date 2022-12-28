<script setup>
  import { useModals } from '../stores/modals'
  import { ref } from 'vue';
  import { api } from '../api';
  import { useAuth } from '../stores/auth';
  import { useGlobalError } from '../stores/globalError';
  import { useBookmarks } from '../stores/bookmarks';

  const modals = useModals()
  const auth = useAuth()
  const globalError = useGlobalError()
  const bookmarks = useBookmarks()
  const url = ref('')
  const addForm = ref(null)
  const isFetching = ref(false)

  const inputValidation = [
    (v) => v.match(/^https?:\/\//gi) || 'Link must start with http(s)://'
  ]

  function closeModal() {
    url.value = ''
    modals.setIsAddModalOpen(false)
  }

  async function add() {
    if (!addForm.value.validate()) return

    try {
      isFetching.value = true
      const response = await api.addBookmark(url.value, auth.token)

      if (!response.ok) {
        const data = await response.json()
        globalError.setMessage(data.detail)
      } else {
        const bookmark = await response.json()
        url.value = ''
        bookmarks.addBookmark(bookmark)
        modals.setIsAddModalOpen(false)
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
    v-model="modals.isAddModalOpen">
    <template #content="{ok}">
      <va-card-title>
        Add bookmark
      </va-card-title>
      <va-card-content>
        <va-form ref="addForm" @validation="validation = $event">
          <va-input 
            label="URL"
            :rules="inputValidation"
            v-model="url"
            class="mb-4 form-control"/>
          <div class="submit-wrapper">
            <va-button
              preset="primary"
              class="mr-3"
              @click="closeModal">
              Cancel
            </va-button>
            <va-button :loading="isFetching" @click="add">
              Add
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
