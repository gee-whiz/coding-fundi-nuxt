<template>
    <div class="banner" v-if="!isHidden">
        <p>
            Hey there, tech enthusiast! To make your journey with Coding Fundi
            smoother, we use cookies to understand how you interact with our content.
            This helps us improve your experience and serve you better. By clicking
            "Accept," you agree to our use of cookies in accordance with our
            <a href="/terms">Terms and Privacy Policy</a>.
        </p>
        <button type="button" class="accept-button" @click="acceptCookies">
            Accept cookies
        </button>
        <button type="button" class="decline-button" @click="declineCookies">
            Decline cookies
        </button>
    </div>
</template>


<script setup lang="ts">

const isHidden = ref(false);
const savedCookie = localStorage.getItem("cookie");

if (savedCookie === "true") {
    isHidden.value = true;
}
const acceptCookies = () => {
    localStorage.setItem("cookie", "true");
    isHidden.value = true;
};
const declineCookies = () => {
    localStorage.setItem("cookie", "false");
    isHidden.value = true;
};



</script>

<style scoped lang="scss">
.banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #f1f1f1;
    padding: 20px;
    text-align: center;
    z-index: 999;
}

p {
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5;
    color: #2c3e50;
}

button {
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;

    &.accept-button {
        background-color: #0468bf;
        border: none;
        color: white;
    }

    &.decline-button {
        background-color: #2c3e50;
        border: none;
        color: white;
    }
}
</style>
