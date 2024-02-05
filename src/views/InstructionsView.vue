<template>
    <v-container>
        <h1>Instructions</h1>
        <div class="d-flex flex-column">
            <p style="padding-bottom:10px"> In normal speech, speakers pronounce some words in a sentence with more prominence than others. 
            The prominent words are in a sense emphasized for the listener, and stand out from other non-prominent words.</p>

            <p style="padding-bottom:10px"> In this experiment, you will be asked to listen to speech and rate how much particular words stand out
            from others in the sentence. In each trial, you will read a short dialogue between two speakers and see a 
            picture representing the situation they are talking about. Then, you will hear a spoken response to the 
            last part of the conversation you just read. You will rate two words in the spoken response according to 
            how much they stand out from others in the sentence. Occasionally, instead of rating words, you will be asked
            to answer a question about the dialogue you read.</p>

            <p style="padding-bottom:10px">You will start with a practice trial to familiarize yourself with the process.</p>
            
            <p>Click 'NEXT' when you are ready to proceed. <b> NOTE: If you cannot see text on the following page, you may need to adjust the zoom level in your web browser settings (usually a drop-down menu in the top right corner of the window).</b></p>
        </div>
        <v-btn class="mt-4" color="primary" @click="next">next <v-icon>chevron_right</v-icon></v-btn>
        
    </v-container>
</template>

<script setup>

import { useRouter } from "vue-router";

const router = useRouter();

const next = () => {
    router.push("/experiment");
}


</script>