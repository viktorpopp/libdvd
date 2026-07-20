<script setup lang="ts">
const email = ref("");
const password = ref("");
const loading = ref(false);

async function logIn() {
  await useAuth().signIn.email({
    email: email.value,
    password: password.value,
    callbackURL: "/dashboard",
  });
}
</script>

<template>
  <p v-if="loading">Loading...</p>
  <div v-else>
    <input type="text" v-model="email" placeholder="Email Address" />
    <br />
    <input type="password" v-model="password" placeholder="Password" />
    <br />
    <button @click="logIn">Log in</button>
  </div>
</template>
