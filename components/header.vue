<template>
    <MDBNavbar expand="lg" light bg="light" position="top" container>
        <MDBNavbarBrand href="/">CodingFundi</MDBNavbarBrand>
        <MDBNavbarToggler @click="collapse1 = !collapse1" target="#navbarSupportedContent"></MDBNavbarToggler>
        <MDBCollapse v-model="collapse1" id="navbarSupportedContent">
            <MDBNavbarNav class="mb-2 mb-lg-0">
                <MDBNavbarItem to="/" active @click="
                    collapse1 = !collapse1;
                dropdown = !dropdown;">Home</MDBNavbarItem>
                <MDBNavbarItem v-for="category in categories" :key="category.name">
                    <client-only v-if="category.subcategories">
                        <MDBDropdown class="nav-item" v-model="dropdown">
                            <MDBDropdownToggle tag="a" class="nav-link" @click="dropdown = !dropdown" >{{ category.name }}
                            </MDBDropdownToggle>
                            <MDBDropdownMenu>
                                <MDBDropdownItem v-for="sub in category.subcategories" :key="sub.name"
                                    :to="`/${sub.route}/${sub.id}`" @click="
                                        collapse1 = !collapse1;
                                    dropdown = !dropdown;
                                    ">{{ sub.name }}</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </client-only>
                    <MDBNavbarItem v-else :to="`/${category.route}/${category.id}`" @click="
                        collapse1 = !collapse1;
                    dropdown = !dropdown;">
                        {{ category.name }}
                    </MDBNavbarItem>
                </MDBNavbarItem>
            </MDBNavbarNav>
            <div v-if="isSubscribed && isVerified" class="d-flex align-items-center" @click="showUnsubscribeModal = true"
                style="cursor: pointer">
                <small class="text-muted"> Unsubscribe </small>
            </div>
        </MDBCollapse>
    </MDBNavbar>
    <MDBModal id="unsubscribeModal" tabindex="-1" labelledby="unsubscribeModalLabel" v-model="showUnsubscribeModal">
        <MDBModalHeader>
            <MDBModalTitle style="color: #2c3e50" id="unsubscribeModalLabel">
                Unsubscribe from CodingFundi Newsletters
            </MDBModalTitle>
        </MDBModalHeader>
        <MDBModalBody style="color: #2c3e50">
            Whoa there, Fundi! 🤔 Are you sure you want to say goodbye to our
            awesome updates, articles, and tutorials? You'll be missing out!
        </MDBModalBody>
        <MDBModalFooter>
            <MDBBtn color="secondary" @click="showUnsubscribeModal = false">
                Nope, Changed My Mind
            </MDBBtn>
            <MDBBtn color="primary" @click="unsubscribeToNewsLetter">
                Yep, Unsubscribe Me
            </MDBBtn>
        </MDBModalFooter>
    </MDBModal>
</template>
<script setup lang="ts">
import "mdb-vue-ui-kit/css/mdb.min.css";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { unsubscribe } from "@/services/subscription";
import {
    MDBBtn,
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from "mdb-vue-ui-kit";
import { ref } from "vue";
import { useStore } from "@/store";

const store = useStore();

const collapse1 = ref(false);
const dropdown = ref(false);
const isSubscribed = computed(() => store.isSubscribed);
const isVerified = computed(() => store.isVerified);
const showUnsubscribeModal = ref(false);
const hover = ref(false);

onMounted(async () => {
    await store.checkSubscriptionStatus();
});

const notify = (message: string, toastType: any) => {
    toast(message, {
        autoClose: 3000,
        type: toastType,
    });
};

const categories = [
    { name: "Tech Insights", route: "category", id: "EgSHPOGRh2Qxy3Ta5E3K8" },
    {
        name: "Tutorials",
        route: "",
        id: 2,
        subcategories: [
            { name: "Swift", route: "category", id: "162W2d0fYq0f5PRdC3ggm4" },
            { name: "Vue js", route: "category", id: "2AMM2Q21IYZGGuOOvzgAzF" },
        ],
    },
];

const unsubscribeToNewsLetter = async () => {
    showUnsubscribeModal.value = false;
    try {
        const response = await unsubscribe();
        if (response) {
            store.isSubscribed = false,
                store.isVerified = false,
                notify(
                    "Unsubscribed! It's not goodbye; it's see you later. 🌟",
                    "success"
                );
            console.log("Unsubscribed");
        }
    } catch (error) {
        notify("Oops! Something went wrong. Please try again later.", "error");
        console.error("Error in unsubscription:", error);
    }
};


</script>

<style scoped>
.navbar-brand {
    color: #0468bf;
}
</style>
