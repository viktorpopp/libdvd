<script setup lang="ts">
const session = useAuth().useSession();
</script>

<template>
  <p v-if="session.isPending">Loading...</p>
  <p v-else-if="!session.data">
    Please <a href="/signup">sign up</a> or <a href="/login">log in</a>.
  </p>
  <div v-else>{{ navigateTo("/dashboard") }}</div>
</template>
