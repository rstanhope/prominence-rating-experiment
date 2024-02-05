<template>
    <v-container>
        <div class="d-flex flex-column align-center">
        <h1>Experiment Complete</h1>
        <p>Thank you. Click below to submit your responses and return to Prolific.</p>
        <v-btn class="mt-4" color="primary" @click="submit">Submit <v-icon>chevron_right</v-icon></v-btn>
        </div>
    </v-container>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from "@/stores/store.js"

const store = useStore();

onMounted(()=>{
    window.onbeforeunload = null;
})

const submit = () => {
    //replace this with your Sona study provided completion URL
    let completionUrl = "https://northwestern-linguistics.sona-systems.com/webstudy_credit.aspx?experiment_id=1234&credit_token=123&survey_code=";
    completionUrl += store.pid;
    window.location.replace(completionUrl);
}
</script>