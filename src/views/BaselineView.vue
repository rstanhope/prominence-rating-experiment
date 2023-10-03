<template>
  <v-container>
    <v-row>
      <v-col cols="12" justify-center>
        <v-fade-transition hide-on-leave>
          <div>
            <div elevation="2" class="d-flex justify-center pa-4" v-if="state=='blank'">
              <v-icon size="x-large" color="success">check_circle</v-icon>
            </div>
            <v-alert elevation="2" class="mr-8" v-if="state!='blank'">
              <div class="d-flex justify-center">
                <v-btn size="large" :disabled="isPlaying" :loading="isLoading" @click="playAudio" class="ma-1">
                  <v-progress-circular :v-fade-transition="false" :model-value="playProgress"
                    class="mr-1"><v-icon>play_circle_filled</v-icon>
                  </v-progress-circular>
                  <span v-if="isPlaying">Playing</span>
                  <span v-else>Click to listen</span>
                </v-btn>
              </div>
            </v-alert>

            <section class="rating-elements" v-if="state == 'rate1' || state == 'rate2'">
              <div class="d-flex justify-center mb-4">
                <div class="d-flex flex-column elevation-4 mt-4 pa-2" style="border-radius: 4px;">
                  <h2 class="ml-2 font-weight-regular" v-html="targetSentence"></h2>
                </div>
              </div>
              <v-card variant="outlined" class="mt-6 ml-2 mr-2 pa-2">
                <p style="text-align:center">How much did this word stand out?</p>
                <div class="d-flex flex-column align-center">
                  <v-radio-group v-model="response" inline>
                    <v-radio label="Not at all" value="1"></v-radio>
                    <v-radio label="Not very much" value="2"></v-radio>
                    <v-radio label="A little" value="3"></v-radio>
                    <v-radio label="A lot" value="4"></v-radio>
                  </v-radio-group>
                </div>
                <v-row justify="center">
                  <v-btn color="blue-grey" class="mt-4 mb-4" @click="submit" :disabled="response == null">Submit
                    <v-icon>chevron_right</v-icon></v-btn>
                </v-row>
              </v-card>

            </section>

          </div>
        </v-fade-transition>
      </v-col>
    </v-row>

    <v-footer app class="d-flex justify-center">
      {{ progress }}
    </v-footer>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from "@/stores/store.js"
import UsePlaySound from "@/composables/UsePlaySound";
import { useRouter } from "vue-router";
import { gsap } from "gsap"
import UseWait from "@/composables/UseWait"
const { wait } = UseWait()
import { getDatabase, ref as dbRef, child, serverTimestamp, push } from "firebase/database";


const store = useStore();
const router = useRouter();

const state = ref('listen');//listen, rate1, rate2
const targetSentence = ref("");

/*
const slowDown = ref(true);
const doSlowDown = async () => {
  slowDown.value = true
  await wait(1000);
  slowDown.value = false
}
onMounted(() => {
  doSlowDown();
})
*/


const next = async () => {
  if (state.value == 'dialogue') {
    state.value = "listen"
    targetSentence.value = store.list[store.index].targetSentence;
    //playAudio();
  } else if (state.value == 'listen') {
    state.value = "rate1"
    targetSentence.value = getHighlightWord(store.list[store.index].targetSentence, store.list[store.index].targetWord1, [store.list[store.index].targetWord2, store.list[store.index].targetWord3, store.list[store.index].targetWord4]);
  } else if (state.value == 'rate1') {
    state.value = "rate2"
    targetSentence.value = getHighlightWord(store.list[store.index].targetSentence, store.list[store.index].targetWord2, [store.list[store.index].targetWord1, store.list[store.index].targetWord3, store.list[store.index].targetWord4]);
  } else if (state.value == 'rate2') {
    saveResponses();

    store.index += 1;
    if (store.index >= store.list.length) {
      router.push("/end")
    } else {
      state.value = 'blank';
      await wait(500);
      state.value = 'listen';
    }
  }
}

const getHighlightWord = (targetSentence, index, otherIndexes) => {
  let sentence = targetSentence.split(" ");
  let formattedSentence = ""
  for (let i = 0; i < sentence.length; i++) {
    if (index == i) {
      formattedSentence += "<span class='highlight'>" + sentence[i] + "</span> ";
    } else {
      let found = 0;
      for (let k = 0; k < otherIndexes.length; k++) {
        if (otherIndexes[k] == i) {
          found = 1
          break;
        }
      }
      if (found == 1) {
        formattedSentence += "<span class='secondary-highlight'>" + sentence[i] + "</span> ";
      } else {
        formattedSentence += sentence[i] + " ";
      }
    }
  }
  return formattedSentence
}


const { playSoundAsync, isPlaying, isLoading, getDuration } = UsePlaySound();
const playProgress = ref(0)
const playAudio = async () => {
  let duration = await getDuration("sounds/" + store.list[store.index].audio);
  //console.log(duration);
  playProgress.value = 0;
  gsap.to(playProgress, duration, { value: 100 })
  await playSoundAsync("sounds/" + store.list[store.index].audio, 1, 0);
  playProgress.value = 0;
  if (state.value == "listen") {
    next();
  }
  console.log("sound done")
}

const response = ref(null);
const allResponses = ref([]);
const submit = async () => {
  //store array of responses
  allResponses.value.push(response.value);

  //clear out response
  response.value = null;

  gsap.to(".rating-elements", { opacity: 0, duration: 0.25 });
  gsap.to(".rating-elements", { opacity: 1, duration: 0.25, delay: 0.25 });
  await wait(250);
  next();
}

const saveResponses = () => {
  let dataToSave = { ...store.list[store.index] }
  dataToSave.response1 = allResponses.value[0];
  dataToSave.response2 = allResponses.value[1];
  //dataToSave.response3 = allResponses.value[2];
  //dataToSave.response4 = allResponses.value[3];
  dataToSave.timestamp = serverTimestamp();
  let rtdbRef = child(dbRef(getDatabase()), "/data/" + store.pid);
  push(rtdbRef, dataToSave);
}

const progress = computed(() => (store.index + 1) + "/" + store.list.length);

</script>


<style>
.highlight {
  color: red;
  text-decoration: underline;
  font-weight: bold;
}

.secondary-highlight {
  text-decoration: underline;
  font-weight: normal;
}

.dot-flashing {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dot-flashing 1s infinite linear alternate;
  animation-delay: 0.5s;
}

.dot-flashing::before,
.dot-flashing::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
}

.dot-flashing::before {
  left: -15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 0s;
}

.dot-flashing::after {
  left: 15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 1s;
}

@keyframes dot-flashing {
  0% {
    background-color: #9880ff;
  }

  50%,
  100% {
    background-color: rgba(152, 128, 255, 0.2);
  }
}
</style>


