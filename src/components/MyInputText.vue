<template>
<app-input-text v-model="inputValue" :invalid="isInvalid" />
</template>
<script setup lang="ts">
import { ref, watch, onMounted, onUpdated, onActivated, computed} from "vue";
const inputValue = ref("");
const isInvalid=ref(false);

onActivated(()=>{
    isInvalid.value=(!inputValue.value)||(inputValue.value.length>10);
    console.log("value is");
    console.log(inputValue.value);
    console.log("invalid is "+isInvalid.value);
})
/*
onUpdated(()=>{
    isInvalid.value=!inputValue.value||inputValue.value.length>10;
    console.log("onupdated");
    console.log(value.value);
    console.log("invalid is "+isInvalid.value);
})*/
watch(inputValue, (curValue, prevValue) => {
    isInvalid.value=!inputValue.value||inputValue.length>10;
})
</script>
