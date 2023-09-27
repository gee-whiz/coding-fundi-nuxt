<template>
  <main style="margin-top: 58px">
    <MDBContainer class="mt-5 px-lg-5">
      <MDBContainer class="my-5 py-5">
        <MDBRow>
          <MDBCol md="12">
            <section class="my-5 text-center">
              <h1 class="display-1"><code>404</code></h1>
              <h4 class="mb-4">Whoops, you hit a bug!</h4>
              <p class="mb-0">
                Hey, don't worry, this kind of stuff even happens to pros. Looks like this page is either still in
                development, or it's become obsolete code.
              </p>
              <p class="mb-4">
                You can either <code>debug</code> back to where you came from or navigate to the <code>homepage</code> for
                some good reads and tutorials!
              </p>
              <MDBBtn @click="handleError" class="primary">Return to Coding Fundi's Hub</MDBBtn>
            </section>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  </main>
</template>


<script setup lang="ts">
import { MDBContainer, MDBCol, MDBRow, MDBBtn } from "mdb-vue-ui-kit";
const error = useError();

const handleError = () => {
  clearError({
    redirect: '/'
  });
};
</script>

<style scoped lang="scss">
.primary {
  background: #0468bf;
  color: #fff;
}
</style>