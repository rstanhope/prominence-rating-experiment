<template>
    <v-container>
        <h1>Experiment Complete</h1>
        <p>Thank you</p>
        <v-btn @click="submit">Click here to return to submit your responses and return to Prolific</v-btn>
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