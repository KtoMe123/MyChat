<template>
  <div class="login">
    <form class="login__form" @submit.prevent="submitForm">
      <div class="login-title">
        <span class="login-title__text">WhatsApp</span> Login 
      </div>
      <div class="login-input">
          <my-input 
            placeholder="Email" 
            required
            v-model:value="EmailField"
            :error="rule.EmailField.$errors"
            label="Email"
            @input="InfoUser(SearchUser + EmailField)"
          >
          </my-input>
          <my-input 
            placeholder="Password" 
            label="Password"
            type="password"
            required
            v-model:value="PasswordField"
            :error="rule.PasswordField.$errors"
          >
            </my-input>

      </div>
      <div class="login__button">
        <button @click="f" type="submit" class="login-button">Вход</button>
      </div>
      <router-link to="/reg" class="login__reg-link">
        <a class="reg-link">Регистрация</a>
      </router-link>
    </form>
  </div>
  
</template>


<script setup>
import userVuelidate, { useVuelidate } from '@vuelidate/core'
import {helpers, sameAs} from '@vuelidate/validators'
import MyInput from '@/components/UI/CheckInput.vue'
import {computed, ref} from 'vue' 
import { useStore } from 'vuex'


const store = useStore()
const UsersInfo = computed(() => store.state.UsersInfo)
const PasswordField = ref('')
const EmailField = ref('')
const MainUser = ref('')
const SearchUser = ref(`http://localhost:8080/api/users/`)
const maindata = ref('')
const emit = defineEmits(['OpenMain'])

function InfoUser(href) {
  fetch(href)
    .then((response) => response.json())
    .then((data) => maindata.value = data)
}

function f() {
  console.log(maindata.value[0])
}

const submitForm = () => {
  if(maindata.value[0]?.id) { 
    if(EmailField.value != maindata.value[0].mail) {
      rule.value.$touch()
      if(rule.value.$error) return
    }
    if(PasswordField.value != maindata.value[0].password) {
      rule.value.$touch()
      if(rule.value.$error) return
    }
    if(PasswordField.value === maindata.value[0].password && EmailField.value === maindata.value[0].mail) {
      emit('OpenMain', [true, EmailField.value, maindata.value])
    }
  } else {
    rule.value.$touch()
    if(rule.value.$error) return
    return
  }
  
}

const rules = computed(() => ({
    PasswordField: {
      sameAsPassword: helpers.withMessage('Пароль не совпадает', sameAs(maindata.value[0]?.password))
    },
    EmailField: {
      TrueName: helpers.withMessage('Неправильная почта', sameAs(maindata.value[0]?.mail))
    },
  }))

const rule = useVuelidate(rules, {PasswordField, EmailField})

</script>


<style lang="scss" scoped>
.login {
  width: 1396px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #d9dbd5 ;
  height: 885px;
  &-title {
    position: absolute;
    top: 20px;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 20px;
    &__text {
      margin-bottom: 10px;
      font-size: 24px;
      font-weight: 600;
      color: rgb(18, 174, 135);
    }
  }
  &__form {
    width: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 440px;
    position: relative;
    background: #fff;
    border-radius: 15px;
    border: 2px solid #b5b5b5;
    
  }
  &-input {
    width: 300px;
    margin-bottom: 15px;

  }
  &__button {
    margin-top: 15px;
  }
  &-button {
    padding: 15px 29px;
    border-radius: 45px;
    background: rgb(6, 207, 156);
    color: rgb(17, 27, 33);
    font-size: 16px;
    font-weight: 600;
    line-height: 16px;
    &:hover {
      box-shadow: 0px 1px 10px 1px gray;
      background: rgb(6, 189, 143);
    }
  }
  &__reg-link {
    position: absolute;
    bottom: 25px;
  }
}

.reg-link {
  color: gray;
  &:hover {
    color: rgb(6, 189, 143);
  }
}

</style>
