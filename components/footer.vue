TEMPLATE SCRIPT

<template>
  <!-- Footer -->
  <MDBFooter :text="['center', 'lg-start', 'muted']">
    <!-- Section: Social media -->
    <div class="container p-4 pb-0 border-bottom">
      <section class="d-flex justify-content-center p-4 border-bottom">
        <!-- Facebook -->
        <a
          class="btn text-white btn-floating m-1"
          style="background-color: #3b5998"
          href="#!"
          role="button"
          ><i class="fab fa-facebook-f"></i
        ></a>

        <!-- Twitter -->
        <a
          class="btn text-white btn-floating m-1"
          style="background-color: #55acee"
          href="https://twitter.com/CodingFundi"
          role="button"
          ><i class="fab fa-twitter"></i
        ></a>
        <!-- Instagram -->
        <a
          class="btn text-white btn-floating m-1"
          style="background-color: #ac2bac"
          href="https://www.instagram.com/codingfundi/"
          role="button"
          ><i class="fab fa-instagram"></i
        ></a>

        <!-- Linkedin -->
        <a
          class="btn text-white btn-floating m-1"
          style="background-color: #0082ca"
          href="https://www.linkedin.com/company/coding-fundi"
          role="button"
          ><i class="fab fa-linkedin-in"></i
        ></a>
        <!-- Github -->
        <a
          class="btn text-white btn-floating m-1"
          style="background-color: #333333"
          href="#!"
          role="button"
          ><i class="fab fa-github"></i
        ></a>
      </section>
    </div>

    <!-- Section: Links  -->
    <section class="">
      <div class="container text-center text-md-start mt-5">
        <!-- Grid row -->
        <div class="row mt-3">
          <!-- Grid column -->
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4">About</h6>
            <p>
              <a href="/about" class="text-reset">Coding Fundi</a>
            </p>
          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4">Legal</h6>
            <p>
              <a href="/terms" class="text-reset">Terms and Privacy</a>
            </p>
          </div>
          <!-- Grid column -->
          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
            <p>
              <i class="fas fa-envelope me-3"></i>
              <a href="mailto:george@codingfundi.com">george@codingfundi.com</a>
            </p>
          </div>
          <!-- Grid column -->
        </div>
        <!-- Grid row -->
      </div>
    </section>
    <!-- Section: Links  -->

    <!-- Copyright -->
    <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05)">
      © 2023 Copyright:
      <a class="text-reset fw-bold" href="https://codingfundi.com/"
        >Coding Fundi</a
      >
      All rights reserved.
    </div>
    <!-- Copyright -->
  </MDBFooter>
  <!-- Footer -->
</template>

<script setup lang="ts">
import {
  MDBFooter,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBContainer,
} from "mdb-vue-ui-kit";
</script>
