<script setup lang="ts">
const name = ref("");
const email = ref("");
const password = ref("");
const loading = ref(false);

async function signUp() {
  await useAuth().signUp.email(
    {
      email: email.value,
      password: password.value,
      name: name.value,
    },
    {
      onRequest: () => {
        loading.value = true;
      },
      onSuccess: () => {
        navigateTo("/");
      },
      onError: (ctx) => {
        alert(ctx.error.message);
        loading.value = false;
      },
    },
  );
}
</script>

<template>
  <p v-if="loading">Loading...</p>
  <div v-else>
    <input type="text" v-model="name" placeholder="Name" />
    <br />
    <input type="text" v-model="email" placeholder="Email Address" />
    <br />
    <input type="password" v-model="password" placeholder="Password" />
    <br />
    <button @click="signUp">Sign up</button>
  </div>
</template>
