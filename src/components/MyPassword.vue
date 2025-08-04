<script setup lang="ts">
import { ref, watch, computed} from "vue";

let valuePass = ref("");
let isInvalidPass = ref(false)
watch(valuePass, (value, prevValue) => {
    isInvalidPass=!valuePass.value||valuePass.value.length>10;
})
</script>
<template>
<app-password v-model="valuePass" :invalid="isInvalidPass" />
</template>