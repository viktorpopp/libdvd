<script setup lang="ts">
const title = ref("");
const imageFile = ref<File | null>(null);
const uploading = ref(false);

async function upload() {
  if (title.value.length == 0 || !imageFile.value) {
    alert("Missing title or image!");
    return;
  }

  uploading.value = true;

  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("image", imageFile.value);

  const res = await $fetch("/api/dvds", {
    method: "POST",
    body: formData,
  });

  await navigateTo("/dashboard");
}

function handleImageChange(event: Event) {
  const htmlTarget = event.target as HTMLInputElement;
  if (!htmlTarget.files || !htmlTarget.files[0]) {
    alert("Huh?");
    return;
  }
  imageFile.value = htmlTarget.files[0];
}
</script>

<template>
  <h2>Add a new DVD</h2>
  <input v-model="title" type="text" placeholder="Title (required)" />
  <br />
  <input type="file" accept="image/*" @change="handleImageChange" />
  <br />
  <button @click="upload" :disabled="!imageFile || !title" v-if="!uploading">
    Upload
  </button>
  <p v-else>Uploading...</p>
</template>
