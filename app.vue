<template>
  <NuxtLayout>
      <main class="flex-grow-1">
        <MDBContainer>
        <NuxtPage />
        </MDBContainer>
      </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { MDBContainer } from "mdb-vue-ui-kit";
</script>
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

.container {
  margin-top: 70px;
  margin-bottom: 16px;
}

</style>