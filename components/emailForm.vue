<template>
  <section v-if="!isSubscribed" class="border rounded p-3">
    <p style="color: #2b2c34">
      <strong>Stay in the Loop!</strong> Subscribe to the Coding Fundi
      newsletter and be the first to know about our latest updates, articles,
      and tutorials.
    </p>

    <form
      @submit.prevent="handleSubscribe"
      class="seva-form formkit-form"
      method="post"
      data-format="inline"
      data-version="5"
      min-width=""
    >
      <!--Errors-->
      <ul
        class="text-danger fw-bold"
        data-element="errors"
        data-group="alert"
      ></ul>

      <!--Fields-->
      <div
        data-element="fields"
        data-stacked="false"
        class="d-flex d-inline-block justify-content-center"
      >
        <!--Email address-->
        <div class="form-outline w-50">
          <MDBInput
            label="Email address"
            type="email"
            id="form1"
            required="true"
            class="form-control"
            v-model="emailInput"
          />
          <div class="form-notch">
            <div class="form-notch-leading" style="width: 9px"></div>
            <div class="form-notch-middle" style="width: 116.8px"></div>
            <div class="form-notch-trailing"></div>
          </div>
        </div>
        <!--Button-->
        <button class="btn btn-primary ms-2" data-element="submit">
          Subscribe
        </button>
      </div>
    </form>
    <p class="mt-3 mb-0">
      <small class="text-muted">
        By hitting 'Subscribe', you consent to receiving newsletters and
        promotional materials from Coding Fundi. Check out our
        <a class="text-info" href="/terms" target="_blank">Privacy Policy</a>
        for more details.
      </small>
    </p>
  </section>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { subscribe } from "@/services/subscription";
import { MDBInput } from "mdb-vue-ui-kit";

const store = useStore();
const isSubscribed = computed(() => store.$state.isSubscribed);
const isVerified = computed(() => store.$state.isVerified);
const emailInput = ref(" ");
const handleSubscribe = async () => {
  try {
    const response = await subscribe(emailInput.value);
    if (response.subscription.state === "active") {
      store.isSubscribed = true;
    } else {
      store.isSubscribed = true;
      store.isVerified = false;
      console.log(
        "Please check your email and click on the verification link to complete your subscription.",
        "info"
      );
    }
  } catch (error) {
    console.error("Error in subscription:", error);
  }
};

onMounted(async () => {
  await store.checkSubscriptionStatus();
});
</script>
