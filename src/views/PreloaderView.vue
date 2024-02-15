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
    store.listFilename = route.query.list;
    let listToLoad;
    if (route.query.list == "fb") {
      //firebase - across subject design
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
      loadAcrossSubjectDesignList(listToLoad);
    } else if (route.query.list == "within") {
      //within subject design
      loadWithinSubjectDesignList();
    } else {
      //urlparam defined list - across subject design
      listToLoad = route.query.list + ".json"
      loadAcrossSubjectDesignList(listToLoad);
    }

    /*
    if (route.query.list != "fb") {
      if (route.query.list == "within") {
        console.log("within subject design");
      } else {
        listToLoad = route.query.list + ".json"
      }
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
    */
  }
})

async function loadAcrossSubjectDesignList(listToLoad) {
  try {
    const f = await fetch(listToLoad);
    store.list = await f.json();
    store.list = shuffle(store.list);
    store.index = 0

    //load practice list;
    const fp = await fetch("list_practice.json");
    let practiceList = await fp.json();
    practiceList[0].isPractice = true;

    //load catch trials
    const ct = await fetch("list_catch.json");
    let catchList = await ct.json();
    catchList = shuffle(catchList);

    //insert catch trials
    const catchTrialPositions = [2, 7, 11, 16, 20];

    for (let p = 0; p < catchTrialPositions.length; p++) {
      store.list.splice(catchTrialPositions[p], 0, catchList[p]);
    }

    //prepend practice list to regular list
    store.list = practiceList.concat(store.list)

    //done loading list
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

async function loadWithinSubjectDesignList() {
  let order = ["A", "B", "C"];
  let masterList = [];
  order = shuffle(order);
  //TODO: save order to participant's Firebase record

  for (let i = 0; i < order.length; i++) {
    //critical list
    let f = await fetch("critical_list" + order[i] + ".json");
    let criticalList = await f.json();

    //filler list
    f = await fetch("block" + (i + 1) + "_fillers.json");
    let fillerList = await f.json();

    //combine critical list and filler list
    let list = criticalList.concat(fillerList);
    list = shuffle(list);
    for (let l of list) {
      l.block = i + 1; //indicate which block each item belongs to
    }

    //load catch trials
    f = await fetch("block" + (i + 1) + "_catch.json");
    let catchTrials = await f.json();
    //catch trials must have two items
    if (catchTrials.length != 2) {
      Swal.fire({
        icon: 'error',
        title: "Error",
        text: "Catch trials must have two items!"
      })
      return null
    }
    //insert catch trials at controlled randomized positions
    list.splice(randomNumber(2, 4), 0, catchTrials[0]);
    list.splice(randomNumber(9, 13), 0, catchTrials[1]);

    masterList = masterList.concat(list)


    //insert breaks between blocks
    /*
    if (i < order.length - 1) {
      masterList = masterList.concat([{ trialID: "break" }]);
    }
    */
  }

  //save to pinia
  store.list = masterList;

  //load practice list;
  const fp = await fetch("list_practice.json");
  let practiceList = await fp.json();
  practiceList[0].isPractice = true;
  store.list = practiceList.concat(store.list)

  //done loading list
  isLoading.value = false
}


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

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const next = () => {
  Tone.start();
  router.push("/audioTest");
}

</script>
