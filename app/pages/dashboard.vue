<script setup lang="ts">
const session = useAuth().useSession();
const { data: dvds } = await useFetch("/api/dvds");

if (!session.value.data && !session.value.isPending) {
  navigateTo("/");
}

async function newDvd() {
  await navigateTo("/new");
}
</script>

<template>
  <p v-if="session.isPending">Loading...</p>
  <main v-else>
    <h2>Hello {{ session?.data?.user.name }}!</h2>
    <button @click="newDvd">New DVD</button>
    <h3>Your DVDs:</h3>

    <p v-if="!dvds || dvds.length == 0">No DVDs found!</p>

    <ul v-else>
      <li v-for="dvd in dvds" :key="dvd.id">
        <p>{{ dvd.title }}</p>
        <img :src="dvd.imageUrl || undefined" alt="Image" />
      </li>
    </ul>
  </main>
</template>
