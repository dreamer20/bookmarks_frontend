<script setup>
  import AddModal from '../components/AddModal.vue'
  import EditModal from '../components/EditModal.vue';
  import Bookmarks from '../components/Bookmarks.vue'
  import Search from '../components/Search.vue'

</script>

<template>
  <AddModal />
  <EditModal />
  <div class="wrapper">
      <Search />
      <Bookmarks />
  </div>
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

  .wrapper {
    max-width: 700px;
    flex: 1 1;
    padding: 0 10px;
  }

</style>