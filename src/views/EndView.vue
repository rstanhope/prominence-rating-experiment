<template>
    <v-container>
        <h1>Experiment Complete</h1>
        <p>Thank you</p>
    </v-container>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(()=>{
    window.onbeforeunload = null;
})
</script>