<template>
  <div class="login">
    <form action="/" class="login__form" @submit.prevent="Registration">
      <div class="login-title">
        <span class="login-title-app">WhatsApp</span> Registration 
      </div>
      <div class="login-input">
        <div class="login-input-name">
          <my-input 
            required
            placeholder="Name" 
            label="Name"
            type="name"
            v-model:value="NameField"
            :error="rule.NameField.$errors"
          ></my-input>
        </div>
        <div class="login-input-email">
          <my-input 
            required
            placeholder="Email" 
            label="Email"
            type="email"
            v-model:value="EmailField"
            :error="rule.EmailField.$errors"
          ></my-input>
        </div>
        <div class="login-input-phone">
          <my-input 
            required
            placeholder="Phone" 
            label="Phone"
            type="phone"
            v-model:value="PhoneField"
            :error="rule.PhoneField.$errors"
          ></my-input>
        </div>
        <div class="login-input-pass">
          <my-input 
            required
            placeholder="Password" 
            label="Password"
            type="password"
            v-model:value="PasswordField"
            :error="rule.PasswordField.$errors"
          >
          </my-input>
        </div>
        <div class="login-input-repasss">
          <my-input 
            required
            placeholder="Password again" 
            label="Password again"
            type="password"
            v-model:value="RePasswordField"
            :error="rule.RePasswordField.$errors"
          >
          </my-input>
        </div>
      </div>
      <div class="login__button">
        <button type="submit" class="login-button">Регистрация</button>
      </div>
      <router-link to="/" class="login__reg-link">
        <a  class="reg-link">Уже есть аккаунт?</a>
      </router-link>
    </form>
  </div>
  
</template>


<script setup>
import userVuelidate, { useVuelidate } from '@vuelidate/core'
import {helpers, minLength, maxLength, numeric, email, sameAs} from '@vuelidate/validators'
import MyInput from '@/components/UI/CheckInput.vue' 
import { computed, ref } from 'vue'
import axios from 'axios'

const PasswordField = ref('')
const RePasswordField = ref('')
const PhoneField = ref('')
const EmailField = ref('')
const NameField = ref('')

const isEmpty = str => !str.trim().length;

const Registration = () => {
  rule.value.$touch()
  if(rule.value.$error) return
  if(isEmpty(NameField.value) || isEmpty(RePasswordField.value) || isEmpty(PhoneField.value) || isEmpty(EmailField.value)) {
    alert('Поле не может быть пустым')
    return
  }
  


  console.log(EmailField.value)
  console.log(RePasswordField.value)
  console.log(NameField.value)
  console.log(PhoneField.value)

  axios
    .post('http://localhost:8080/api/users',
    {
      username: NameField.value.trim(),
      mail: EmailField.value.trim(),
      password: RePasswordField.value.trim(),
      phone: PhoneField.value.trim(),
      contact: []
    }
    )
    .then(response => {
      console.log('Значение успешно добавленно');
  })
    .catch(err => {
        console.error('Ошибка при добавлении значения:', err);
    });

    window.location.href = '/';
}


const rules = computed(() => ({
    PasswordField: {
      minLengthPass: helpers.withMessage('Минимальная длина 3 символа', minLength(3)),
    },
    RePasswordField: {
      RePassword: helpers.withMessage('Неправильный пароль', sameAs(PasswordField.value)),
    },
    PhoneField: {
      PhoneNum: helpers.withMessage('Вы можете ввести только цифры', numeric),
    },
    EmailField: {
      email: helpers.withMessage('Вы ввели неверный email', email),
    },
    NameField: {
      minLength: helpers.withMessage('Минимальная длина 3 символа', minLength(3)),
      maxLength: helpers.withMessage('Максимальная длина 20 символов', maxLength(20)),
    },

  }))

const rule = useVuelidate(rules, {PasswordField, RePasswordField, PhoneField, EmailField, NameField})

</script>


<style lang="scss" scoped>
.login {
  width: 1396px;
  display: flex;
  justify-content: center;
  width: 100%;
  max-height: 0px;
  align-items: center;
  &-title {
    position: absolute;
    top: 20px;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 20px;
    &-app {
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
    height: 600px;
    position: relative;
    border: 2px solid #b5b5b5;
    background: #fff;
    border-radius: 15px;
  }
  &-input {
    width: 350px;
    &-name {
      display: flex;
      justify-content: center;
      margin-bottom: 26px;
      & input {
        margin: 0;
      }
    }
    &-email {
      display: flex;
      justify-content: center;
      margin-bottom: 26px;
      & input {
        margin: 0;
      }
    }
    &-phone {
      display: flex;
      justify-content: center;
      margin-bottom: 26px;
      & input {
        margin: 0;
      }
    }
    &-pass {
      display: flex;
      justify-content: center;
      margin-bottom: 26px;
      & input {
        margin: 0;
      }
    }
    &-repass {
      display: flex;
      justify-content: center;
      margin-bottom: 26px;
      & input {
        margin: 0;
      }
    }
  }
  &__button {
    margin-top: 25px;
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
