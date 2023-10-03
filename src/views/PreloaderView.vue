<template>
  <v-container>
    <h1>Welcome</h1>
    <p v-if="isLoading">Please wait...</p>
    <div v-else>
      <p>Welcome! In this experiment you will be listening to sounds and rating prominent words.</p>
      <p>Click 'NEXT' to continue.</p>
    </div>
    <v-btn color="primary" class="mt-2" v-if="!isLoading" @click="next">Next <v-icon>chevron_right</v-icon></v-btn>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from "@/stores/store.js"
import { useRouter, useRoute } from "vue-router";
import * as Tone from 'tone';
import Swal from "sweetalert2";
import { getDatabase, ref as dbRef, child, get } from "firebase/database";

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
    let listToLoad;
    if (route.query.list != "fb") {
      listToLoad = route.query.list + ".json"
    } else {
      let snapshot = await get(child(dbRef(getDatabase()), "/list/"));
      if (snapshot.exists()) {
        listToLoad = snapshot.val() + ".json"; 
      } else {
        Swal.fire({
          icon: 'error',
          title: "Error",
          text: "Unable to load list file"
        })
        return null;
      }
    }

    try {
      const f = await fetch(listToLoad);
      store.list = await f.json();
      store.list = shuffle(store.list);
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

function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

const next = () => {
  Tone.start();
  router.push("/audioTest");
}

</script>
