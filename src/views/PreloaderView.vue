<template>
  <v-container>
    <h1>Loading</h1>
    <p v-if="isLoading">Please wait...</p>
    <p v-else>Click next to continue</p>
    <v-btn color="primary" class="mt-2" v-if="!isLoading" @click="next">Next <v-icon>chevron_right</v-icon></v-btn>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from "@/stores/store.js"
import { useRouter, useRoute } from "vue-router";
import * as Tone from 'tone';
import Swal from "sweetalert2";

const store = useStore();
const router = useRouter();
const route = useRoute();
const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;

  if (route.query.pid == null || route.query.pid == "") {
    //show error message
    Swal.fire({
      icon: 'error',
      title: "Error",
      text: "Missing participant ID!"
    })
    return;
  } else {
    store.pid = route.query.pid
  }

  if (route.query.list == null || route.query.list == "") {
    Swal.fire({
        icon: 'error',
        title: "Error",
        text: "Missing list file URL parameter"
      })
  } else {
    console.log("done loading", route.query.list)
    try {
      const f = await fetch(route.query.list + ".json");
      store.list = await f.json();
      store.index = 0
      isLoading.value = false
      
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: "Error",
        text: "Could not load " + route.query.list + ".json"
      })
    }
  }
})

const next = () => {
  Tone.start();
  router.push("/baseline");
}

</script>
