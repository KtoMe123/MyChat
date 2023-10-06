<template>
    
    <div class="search-chat">
        <div class="search-chat__input">
            <input :value="modelValue" @input="updateInput" class="search-input" type="text" :placeholder="placeholder" name="search">
            <slot></slot>
        </div>
        </div>
</template>

<script setup>
    const props = defineProps({
        modelValue: [String, Number],
        placeholder: [String, Number]
    }) 
    const emit = defineEmits(['update:modelValue'])
    function updateInput(event) {
        emit('update:modelValue', event.target.value)
    }
    
</script>


<style lang="scss" scoped>
.search-chat {
    position: relative;
    width: 100%;
    height: 50px;
    background: #f6f6f6;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
    &__input {
        width: 100%;
    }
    &-input::placeholder {
        color: #bbb;
    }
}
.search-input {
    width: 100%;
    outline: none;
    border: none;
    background: #fff;
    padding: 6px;
    height: 38px;
    border-radius: 30px;
    font-size: 14px;
    padding-left: 40px;
}

</style>