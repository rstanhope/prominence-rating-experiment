<template>
    <v-container>
        <h1>Instructions</h1>
        <div class="d-flex flex-column">
            <p>In normal speech, speakers pronounce some words in a sentence with more prominence than others. 
            The prominent words are in a sense emphasized for the listener, and stand out from other non-prominent words.</p>

            <p>In this experiment, you will be asked to listen to speech and rate how much particular words stand out
            from others in the sentence. In each trial, you will hear one sentence and rate two words.</p>

            <p>You will start with a practice trial to familiarize yourself with the process.</p>
            
            <p>Click 'NEXT' when you are ready to proceed.</p>
        </div>
        <v-btn class="mt-4" color="primary" @click="next">next <v-icon>chevron_right</v-icon></v-btn>
        
    </v-container>
</template>

<script setup>

import { useRouter } from "vue-router";

const router = useRouter();

const next = () => {
    router.push("/baseline");
}


</script>