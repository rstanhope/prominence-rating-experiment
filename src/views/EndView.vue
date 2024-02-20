<template>
    <v-container>
        <div class="d-flex flex-column align-center">
        <h1>Experiment Complete</h1>
        <p>Thank you. Click below to submit your responses and return to Sona.</p>
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
    //replace this with your Sona or Prolific completion URL
    let completionUrl;
    if(store.listFilename == "fb"){
        //firebase reference list. most likely this is running on Prolific
        completionUrl = "prolific-completion-url-here";
    }else if(store.listFilename == "Sona_List1"){
        completionUrl = "https://northwestern-linguistics.sona-systems.com/webstudy_credit.aspx?experiment_id=166&credit_token=2cf128b5e84d4f31aa651f239ed8588e&survey_code=";
    }else if(store.listFilename == "Sona_List2"){
        completionUrl = "https://northwestern-linguistics.sona-systems.com/webstudy_credit.aspx?experiment_id=168&credit_token=333f85d6d73a4968a7fb4f9acc27cd1f&survey_code=";
    }else if(store.listFilename == "Sona_List3"){
        completionUrl = "https://northwestern-linguistics.sona-systems.com/webstudy_credit.aspx?experiment_id=169&credit_token=1b4b4362eea141d68e49239fa63a6290&survey_code=";
    }else if(store.listFilename == "Sona_List4"){
        completionUrl = "https://northwestern-linguistics.sona-systems.com/webstudy_credit.aspx?experiment_id=170&credit_token=5a3e4ed1bc8a4ba5b0ffb6e81fde131b&survey_code=";
    }else if(store.listFilename == "Sona_List5"){
        completionUrl = "https://northwestern-linguistics.sona-systems.com/webstudy_credit.aspx?experiment_id=171&credit_token=c5450f31556b4e39920680a0e47dc48e&survey_code=";
    }else if(store.listFilename == "Sona_List6"){
        completionUrl = "https://northwestern-linguistics.sona-systems.com/webstudy_credit.aspx?experiment_id=172&credit_token=d94319beda6a44c096b134f85eeac243&survey_code=";
    }else if(store.listFilename == "within"){
        completionUrl = "https://northwestern-linguistics.sona-systems.com/webstudy_credit.aspx?experiment_id=173&credit_token=1ddcecf6cafc4b129e517cd0e890a9bf&survey_code=";
    }
    
    completionUrl += store.pid;
    
    //console.log(completionUrl);
    window.location.replace(completionUrl);
}
</script>