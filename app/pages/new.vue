<script setup lang="ts">
const title = ref("");

async function upload() {
  const res = await $fetch("/api/dvds", {
    method: "POST",
    body: {
      title: title.value,
    },
  });

  await navigateTo("/");
}
</script>

<template>
  <h2>Add a new DVD</h2>
  <input v-model="title" type="text" placeholder="Title (required)" />
  <br />
  <button @click="upload">Upload</button>
</template>
