<template>
  <VOnboardingWrapper ref="wrapper" :steps="steps"></VOnboardingWrapper>
  <v-dialog v-model="showFullPicture" persistent fullscreen :scrim="false" z-index="10">
    <v-card> 
      <div class="d-flex flex-column">
        <div class="d-flex justify-center mt-4">
          <v-img :src="'images/' + currentItem?.image" max-width="800" id="fullPictureDiv"
            @loadstart="imageLoading = true" @load="imageLoading = false; startPractice()">
            <template v-slot:error>
              <p style="text-align:center;color:red">Could not load image. Try refreshing the page</p>
            </template>
            <template v-slot:placeholder >
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
              </div>
            </template>
          </v-img>
        </div>
        <div class="d-flex justify-center mt-2">
          <v-btn id="fullPictureNextBtn" color="blue-grey" :disabled="slowDown || imageLoading" @click="next()">Next
            <v-icon>chevron_right</v-icon></v-btn>
        </div>
      </div>

    </v-card>

  </v-dialog>
  <v-container>
    <v-row>
      <v-col cols="4">

        <v-row justify="end">
          <v-img :src="'images/' + currentItem?.image" @loadstart="imageLoading = true" @load="imageLoading = false"
            width="345" height="230" max-width="345" max-height="230" class="mr-2 mt-2">
            <template v-slot:error>
              <p style="text-align:center;color:red">Could not load image. Try refreshing the page</p>
            </template>
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
              </div>
            </template>
          </v-img>
        </v-row>

      </v-col>
      <v-col cols="8">
        <v-fade-transition hide-on-leave>
          <div class="dialogue" v-if="state == 'dialogue'" id="dialogueDiv">
            <v-alert border="end" border-color="deep-orange accent-4" elevation="2" class="mb-2 ml-8">
              {{ currentItem.dialogueTurn1 }}
            </v-alert>
            <v-alert border="start" border-color="deep-purple accent-4" elevation="2" class="mb-2 mr-8">
              {{ currentItem.dialogueTurn2 }}
            </v-alert>
            <v-alert border="end" border-color="deep-orange accent-4" elevation="2" class="mb-2 ml-8">
              {{ currentItem.dialogueTurn3 }}
            </v-alert>
            <v-alert border="start" border-color="deep-purple accent-4" elevation="2" class="mb-2 mr-8">
              <div class="d-flex justify-center">
                <div class="dot-flashing" />
              </div>
            </v-alert>
            <v-row justify="center">
              <v-btn color="blue-grey" class="mt-4" :disabled="slowDown || imageLoading" @click="next">Next
                <v-icon>chevron_right</v-icon></v-btn>
            </v-row>
          </div>


          <div v-if="state == 'listen' || state == 'rate1' || state == 'rate2' || state == 'rate3' || state == 'rate4'">
            <v-alert border="end" border-color="deep-orange accent-4" elevation="2" class="mb-2 ml-8"
              id="targetQuestionDiv">
              {{ currentItem.dialogueTurn3 }}
            </v-alert>
            <v-alert border="start" border-color="deep-purple accent-4" elevation="2" class="mr-8">
              <div class="d-flex justify-center">
                <v-btn size="large" :disabled="isPlaying" :loading="isLoading" @click="playAudio" class="ma-1"
                  id="targetSentenceSoundButton">
                  <v-progress-circular :v-fade-transition="false" :model-value="playProgress"
                    class="mr-1"><v-icon>play_circle_filled</v-icon>
                  </v-progress-circular>
                  <span v-if="isPlaying">Playing</span>
                  <span v-else>Click to listen</span>
                </v-btn>
              </div>
            </v-alert>

            <section class="rating-elements">
              <div class="d-flex justify-center mb-4">
                <div class="d-flex flex-column elevation-4 mt-4 pa-2" style="border-radius: 4px;" id="targetSentenceDiv">
                  <h2 class="ml-2 font-weight-regular" v-html="targetSentence"></h2>
                </div>
              </div>
              <v-card variant="outlined" class="mt-6 ml-2 mr-2 pa-2" id="ratingDiv"
                v-if="state == 'rate1' || state == 'rate2' || state == 'rate3' || state == 'rate4'">
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

          <div v-if="state == 'catch'">
            <v-alert border="end" border-color="deep-orange accent-4" elevation="2" class="mb-2 ml-8"
              id="targetQuestionDiv">
              {{ currentItem?.dialogueTurn3 }}
            </v-alert>
            <div class="d-flex justify-center mb-4">
              <div class="d-flex flex-column elevation-4 mt-4 pa-2" style="border-radius: 4px;" id="targetSentenceDiv">
                <h2 class="ml-2 font-weight-regular" v-html="targetSentence"></h2>
              </div>
            </div>
            <div class="d-flex flex-column align-center">
              <v-radio-group v-model="response">
                <v-radio v-for="(option, key) in currentItem?.options" :key="key" :label="option.label"
                  :value="option"></v-radio>
              </v-radio-group>
            </div>
            <v-row justify="center">
              <v-btn color="blue-grey" class="mt-4 mb-4" @click="submit" :disabled="response == null">Submit
                <v-icon>chevron_right</v-icon></v-btn>
            </v-row>
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
import { onMounted, ref, computed } from 'vue';
import { useStore } from "@/stores/store.js"
import UsePlaySound from "@/composables/UsePlaySound";
import { useRouter } from "vue-router";
import { gsap } from "gsap"
import UseWait from "@/composables/UseWait"
const { wait } = UseWait()
import { getDatabase, ref as dbRef, child, serverTimestamp, push } from "firebase/database";
import { VOnboardingWrapper, useVOnboarding } from 'v-onboarding'
import 'v-onboarding/dist/style.css'
import Swal from 'sweetalert2';

//practice trial on-boarding
const steps = [
  {
    attachTo: { element: '#fullPictureDiv' }, content: { title: "At the beginning of every trial, you will see a picture that relates to the upcoming conversation. It may show objects, actions, or possibilities that are being discussed." }, options: {
      hideButtons: {
        exit: true,
        previous: true,
        next: false
      }
    }
  },
  {
    attachTo: { element: '#fullPictureNextBtn' }, content: { title: "Click 'NEXT' to view the conversation" }, options: {
      hideButtons: {
        exit: true,
        previous: true,
        next: true
      }
    }
  },  
  {
    attachTo: { element: '#dialogueDiv' }, content: { title: "Please read the dialogue carefully. When you see the animated dots, that means the conversation will continue after you click the 'next' button. Click 'next' when you're ready." }, options: {
      hideButtons: {
        exit: true,
        previous: true,
        next: true
      }
    }
  },
  {
    attachTo: { element: '#targetQuestionDiv' }, content: { title: "This is the last part of the conversation that you will see in writing. In the next step, you will hear a recording of what the other person said in response." }, options: {
      hideButtons: {
        exit: true,
        previous: true,
        next: false
      }
    }
  },
  {
    attachTo: { element: '#targetSentenceSoundButton' }, content: { title: "Click here to play the response. You can listen to this as many times as you wish." }, options: {
      hideButtons: {
        exit: true,
        previous: true,
        next: true
      }
    }
  },
  {
    attachTo: { element: '#targetSentenceDiv' }, content: { title: "This is a transcript of the sentence you just heard. The words you will be rating are underlined." }, options: {
      hideButtons: {
        exit: true,
        previous: true,
        next: false
      }
    }
  },
  {
    attachTo: { element: '#ratingDiv' }, content: { title: "Select your rating for the word in red, then click submit to rate the next underlined word." }, options: {
      hideButtons: {
        exit: true,
        previous: true,
        next: true
      }
    }
  },
  {
    attachTo: { element: '#targetSentenceDiv' }, content: { title: "Now you will be rating this next word that's currently highlighted in red." }, options: {
      hideButtons: {
        exit: true,
        previous: true,
        next: false
      }
    }
  },
  {
    attachTo: { element: '#ratingDiv' }, content: { title: "Again, select your rating for the word in red, then click submit. Remember that you can click above to listen to the sentence again if needed." }, options: {
      hideButtons: {
        exit: true,
        previous: true,
        next: true
      }
    }
  },
]
const wrapper = ref(null);
const { start, goToStep, finish } = useVOnboarding(wrapper);

const showFullPicture = ref(true);

const store = useStore();
const router = useRouter();

const state = ref('dialogue');//dialogue, listen, rate1, rate2, rate3, rate4, catch
const targetSentence = ref("");

const slowDown = ref(true);
const isPractice = computed(() => currentItem.value.isPractice === true);
const isCatchTrial = computed(() => currentItem.value.trialID.startsWith("catch"));
const currentItem = computed(() => store.list[store.index]);

const doSlowDown = async (duration = 1000) => {
  slowDown.value = true
  await wait(duration);
  slowDown.value = false


}
onMounted(async () => {
    await doSlowDown(2000);
})

const startPractice = async () => {
  await wait(500);
  if (isPractice.value == true) {
    start();
  }
}

const imageLoading = ref(false)

const next = async () => {
  if (state.value == 'dialogue') {
    if(showFullPicture.value == true){
      showFullPicture.value = false;
      if(isPractice.value == true){
        console.log("goto step")
        goToStep(2)
      } else {
        doSlowDown(2000);
      }
      return; 
    }
    targetSentence.value = currentItem.value.targetSentence;
    if (isCatchTrial.value == true) {
      state.value = "catch";
    } else {
      state.value = "listen"
      if (isPractice.value == true) {
        goToStep(3)
      }
    }

  } else if (state.value == 'listen') {
    state.value = "rate1"
    targetSentence.value = getHighlightWord(currentItem.value.targetSentence, currentItem.value.targetWord1, [currentItem.value.targetWord2, currentItem.value.targetWord3, currentItem.value.targetWord4]);
    if (isPractice.value == true) {
      goToStep(5)
    }
  } else if (state.value == 'rate1') {
    state.value = "rate2"
    targetSentence.value = getHighlightWord(currentItem.value.targetSentence, currentItem.value.targetWord2, [currentItem.value.targetWord1, currentItem.value.targetWord3, currentItem.value.targetWord4]);
    if (isPractice.value == true) {
      goToStep(7)
    }
  } else if (state.value == 'rate2' || state.value == 'catch') {
    if (isPractice.value == true) {
      finish();
      await Swal.fire({
        title: "Practice Complete",
        icon: "info",
        text: "You have completed the practice. Throughout the experiment, you will repeat the process of reading a conversation, listening to a spoken response, and rating words. Occasionally, instead of rating words, you will be asked a question about the dialogue. When you are ready, click 'start' to close this popup and begin the experiment.",
        confirmButtonText: 'Start'
      })
    }

    saveResponses();

    store.index += 1;
    if (store.index >= store.list.length) {
      router.push("/demographics")
    } else {
      state.value = 'dialogue';
      showFullPicture.value = true;
      doSlowDown(2000);
    }

  }
}

const getHighlightWord = (targetSentence, index, otherIndexes) => {
  index = index - 1;
  let sentence = targetSentence.split(" ");
  let formattedSentence = ""
  for (let i = 0; i < sentence.length; i++) {
    if (index == i) {
      formattedSentence += "<span class='highlight'>" + sentence[i] + "</span> ";
    } else {
      let found = 0;
      for (let k = 0; k < otherIndexes.length; k++) {
        if (otherIndexes[k] - 1 == i) {
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
  let duration = await getDuration("sounds/" + currentItem.value.audio);
  //console.log(duration);
  playProgress.value = 0;
  gsap.to(playProgress, duration, { value: 100 })
  await playSoundAsync("sounds/" + currentItem.value.audio, 1, 0);
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
  let dataToSave = { ...currentItem.value }
  if (isCatchTrial.value == true) {
    dataToSave.response1 = allResponses.value[0].label;
    dataToSave.catchSucceed = allResponses.value[0].correct;
  } else {
    dataToSave.response1 = allResponses.value[0];
    dataToSave.response2 = allResponses.value[1];
  }

  //dataToSave.response3 = allResponses.value[2];
  //dataToSave.response4 = allResponses.value[3];
  dataToSave.timestamp = serverTimestamp();
  let rtdbRef = child(dbRef(getDatabase()), "/data/" + store.pid);
  push(rtdbRef, dataToSave);
  allResponses.value = [];
}

const progress = computed(() => (store.index + 1) + "/" + store.list.length);

</script>


<style>
:root {
  --v-onboarding-overlay-z: 12;
}

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


