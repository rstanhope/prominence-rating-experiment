<template>
    <v-container>
        <h1>Instructions</h1>
        <div class="d-flex flex-column">
            <p>In this experiment you will ...</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima fuga adipisci, aliquid similique vitae, necessitatibus magnam, magni eos consectetur harum distinctio explicabo eligendi consequatur excepturi? Asperiores illum natus officiis reiciendis.</p>
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