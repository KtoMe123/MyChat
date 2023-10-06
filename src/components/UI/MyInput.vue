<template>
    <input 
        :value="modelValue" 
        @input="updateInput"
        class="input" 
        type="text" 
        :name="name"
        :placeholder="placeholder">
</template>


<script setup>

const props = defineProps({ 
    placeholder: {
        type: [String, Number]
    },
    modelValue: [String, Number],   

})
const emit = defineEmits(['update:modelValue'])
function updateInput(event) {
    emit('update:modelValue', event.target.value)
}
</script>

<style scoped>

.input {
    position: relative;
    width: 90%;
    margin: 0 20px;
    padding: 10px 20px;
    border: none;
    outline: none;
    border-radius: 30px;
    font-size: 16px;
    box-shadow: 0px 1px 5px 1px gray;
}

</style>
