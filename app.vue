<template>
  <NuxtLayout>
      <main class="flex-grow-1">
        <NuxtPage />
      </main>
  </NuxtLayout>
</template>

<script setup lang="ts"></script>
<style lang="scss">
.d-flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.min-vh-100 {
  min-height: 100vh;
}

.flex-grow-1 {
  flex-grow: 1;
}
</style>