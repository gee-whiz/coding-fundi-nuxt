<template>
    <MDBNavbar expand="lg" light bg="light" position="top" container>
        <MDBNavbarBrand href="/">CodingFundi</MDBNavbarBrand>
        <MDBNavbarToggler @click="collapse1 = !collapse1" target="#navbarSupportedContent"></MDBNavbarToggler>
        <MDBCollapse v-model="collapse1" id="navbarSupportedContent">
            <MDBNavbarNav class="mb-2 mb-lg-0">
                <MDBNavbarItem to="/" active> Home </MDBNavbarItem>
                <MDBNavbarItem v-for="category in categories" :key="category.name">
                    <client-only v-if="category.subcategories">
                    <MDBDropdown class="nav-item" v-model="dropdown">
                        <MDBDropdownToggle tag="a" class="nav-link" @click="dropdown = !dropdown">{{ category.name }}
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
        </MDBCollapse>
    </MDBNavbar>
</template>
<script setup lang="ts">
import "vue3-toastify/dist/index.css";
import "mdb-vue-ui-kit/css/mdb.min.css";
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
} from "mdb-vue-ui-kit";
import { ref } from "vue";

const collapse1 = ref(false);
const dropdown = ref(false);
const categories = [
    { name: "Tech Insights", route: "categoryView", id: "EgSHPOGRh2Qxy3Ta5E3K8" },
    {
        name: "Tutorials",
        route: "",
        id: 2,
        subcategories: [
            { name: "Swift", route: "categoryView", id: "162W2d0fYq0f5PRdC3ggm4" },
            { name: "Vue js", route: "categoryView", id: "2AMM2Q21IYZGGuOOvzgAzF" },
        ],
    },
];

const showUnsubscribeModal = ref(false);
</script>

<style scoped>
.navbar-brand {
    color: #0468bf;
}
</style>
