<template>
    <v-container>
        <p>Thank you for participating in this study. Before you finish, we ask that you answer the following questions
            about yourself. The purpose of these questions is to allow the researcher to consider factors about your
            language background that may influence how you perceive English speech.</p>
            

        <v-form ref="form" v-model="valid" class="mt-4">
            <p>How old are you?</p>
            <v-text-field density="compact" v-model="age" :rules="ageRules" filled required></v-text-field>
            <v-radio-group v-model="gender" required :rules="requiredRules">
                <label>Gender:</label>
                <v-radio label="Male" value="Male"></v-radio>
                <v-radio label="Female" value="Female"></v-radio>
                <v-radio label="Non-binary" value="Non-binary"></v-radio>
                <v-radio label="Something not listed here (please write in)" value="Other"></v-radio>
                <v-text-field v-if="gender=='Other'" density="compact" v-model="genderOtherDescription" :rules="requiredRules"/>
                <v-radio label="Prefer not to say" value="Decline"></v-radio>
            </v-radio-group>
            <v-radio-group v-model="hearingProblems" required :rules="requiredRules">
                <label>Do you have any known hearing problem?</label>
                <v-radio label="Yes" value="Yes"></v-radio>
                <v-radio label="No" value="No"></v-radio>
            </v-radio-group>
            <v-radio-group v-model="visionProblems" required :rules="requiredRules">
                <label>Do you have any known uncorrected vision problem?</label>
                <v-radio label="Yes" value="Yes"></v-radio>
                <v-radio label="No" value="No"></v-radio>
            </v-radio-group>
            <v-radio-group v-model="readingDifficultyProblems" required :rules="requiredRules">
                <label>Do you have any known difficulty in reading?</label>
                <v-radio label="Yes" value="Yes"></v-radio>
                <v-radio label="No" value="No"></v-radio>
            </v-radio-group>
            <v-radio-group v-model="otherLanguages" required :rules="requiredRules">
                <label>Do you speak any languages other than English?</label>
                <v-radio label="Yes" value="Yes"></v-radio>
                <v-radio label="No" value="No"></v-radio>
            </v-radio-group>
            <p v-if="otherLanguages == 'Yes'">If YES, which language(s) and for how many years?</p>
            <v-text-field v-model="otherLanguagesDetails" density="compact" required
                filled v-if="otherLanguages == 'Yes'" :rules="requiredRules"></v-text-field>
            <v-radio-group v-model="englishFirstLanguage" required :rules="requiredRules" v-if="otherLanguages == 'Yes'">
                <label>Was English the first language you learned?</label>
                <v-radio label="Yes" value="Yes"></v-radio>
                <v-radio label="No" value="No"></v-radio>
            </v-radio-group>
            <p v-if="otherLanguages == 'Yes'">At what age did you start speaking English?</p>
            <v-text-field v-model="englishLanguageAge" density="compact" required
                filled v-if="otherLanguages == 'Yes'" :rules="[requiredRules,ageRules]"></v-text-field>
            <v-radio-group v-model="bornInUS" required :rules="requiredRules">
                <label>Were you born in the United States?</label>
                <v-radio label="Yes" value="Yes"></v-radio>
                <v-radio label="No" value="No"></v-radio>
            </v-radio-group>
            <v-radio-group v-model="internationalStudent" required :rules="requiredRules">
                <label>Are you an international student?</label>
                <v-radio label="Yes" value="Yes"></v-radio>
                <v-radio label="No" value="No"></v-radio>
            </v-radio-group>            
            <v-btn :disabled="!valid" color="success" @click="submit" class="mt-5">Submit</v-btn>
        </v-form>

    </v-container>
</template>

<script setup>
import { ref } from "vue";
import {
    ref as fbRef,
    getDatabase,
    update,
} from "firebase/database";
import { useRouter } from "vue-router";
import { useStore } from "@/stores/store.js"
import Swal from 'sweetalert2';

const router = useRouter();
const store = useStore();


const valid = ref(false);
const requiredRules = ref([(v) => !!v || "This field is required"]);
const ageRules = ref([(v) => (v > 0 && v <= 200) || "Valid age required"]);
const age = ref(null);
const gender = ref(null);
const genderOtherDescription= ref(null);
const hearingProblems = ref(null);
const visionProblems = ref(null);
const readingDifficultyProblems = ref(null);
const otherLanguages = ref(null);
const otherLanguagesDetails = ref(null);
const englishFirstLanguage = ref(null);
const englishLanguageAge = ref(null);
const bornInUS = ref(null);
const internationalStudent = ref(null);


const submit = () => {
    update(fbRef(getDatabase(), "participants/" + store.pid), {
        age: age.value,
        gender: gender.value,
        genderOtherDescription: genderOtherDescription.value,
        hearingProblems: hearingProblems.value,
        visionProblems: visionProblems.value,
        readingDifficultyProblems: readingDifficultyProblems.value,
        otherLanguages: otherLanguages.value,
        otherLanguagesDetails: otherLanguagesDetails.value,
        englishFirstLanguage: englishFirstLanguage.value,
        englishLanguageAge: englishLanguageAge.value,
        bornInUS: bornInUS.value,
        internationalStudent: internationalStudent.value
    })
        .then(() => {
            router.push("/end");
        })
        .catch(() => {
            Swal.fire({
                title: "Error",
                text: "Could not save responses. Please try again or contact the experimenter if the problem persists.",
                icon: "error"
            })

        });
}


</script>


<style scoped>
form > p, label {
    font-weight: bold;
}

</style>