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

onMounted(()=>{
    window.onbeforeunload = null;
})

const submit = () => {
    const completionUrl = "https://app.prolific.com/submissions/complete?cc=C1HDAHIY";
    window.location.replace(completionUrl);
}
</script>