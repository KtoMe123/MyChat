<template>
  <div class="form-input">
    
    <input 
      class="input-text"
      :type="type"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      :value="value"
      @input="updateValue"
    >
    <label :for="name" class="input-label">{{label}}</label>
    <TransitionGroup class="errors">
      <div 
        class="form-error"
        v-for="element of error"
        :key="element.$uid"
      >
        <div class="form-error__message">{{element.$message}}</div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:value'])
const props = defineProps({
  error: {
    type: Array,
  },
  value: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
})

const updateValue = (event) => {
  emit('update:value', event.target.value)
}
</script>


<style lang="scss" scoped>

.form {
  &-input {
    margin-top: 10px;
    margin-bottom: 30px;
    z-index: 0;
    width: 100%;
    position: relative;

  }
  &-input:last-child {
    margin: 0;
  }
  &-error {
    color: red;
    border-radius: 7px;
    font-size: 15px;
    font-weight: 600;
    padding: 5px;
    position: absolute;
    right: 2px;
    top: -25px;
  }
}
.input {
  &-text {
  border: 1px solid gray;
  padding: 0 10px;
  height: 40px;
  border-radius: 15px;
  font-size: 15px;
  width: 100%;
  position: relative;
  z-index: 1;
    &:focus {
      & + .input-label {
        z-index: 1;
        opacity: 1;
        top: -20px;
      }
    }
    &:not(:placeholder-shown) {
      & + .input-label {
        z-index: 1;
        opacity: 1;
        top: -20px;
      }
    }
  }
  &-label {
    font-weight: bold;
    display: block;
    position: absolute;
    top: 20px;
    opacity: 0;
    z-index: -1;
    transition: .3s;
    font-size: 13px;
    color: black;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>