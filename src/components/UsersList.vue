<template>
    <div  class="users-empty" v-if="MainUser < 1">empty</div>
    <div v-else @click="sendId" class="users">
            <div class="users__item" v-for="user in MainUser" :key="user.id" @click="UserId = user.mail">
                <div @click="rr" v-if="user.mail != TrueName" class="users__contact" >
                    <div  class="users__img"><img src="src/assets/user(1).png" alt="user" class="user-img"></div>
                    <div class="users__info">
                        <div class="users__head">
                            <h4 class="users__name">{{ user.username }}</h4> 
                            <p class="users__time">23:35</p>
                        </div>
                        <div class="users__message">
                            <p class="chat-message">How to make Whatsapp clone using Vue!</p>
                        </div>
                    </div>
                    </div>
            </div>
    </div>

</template>


<script setup>
import {nextTick, onMounted, ref} from 'vue'

import axios from 'axios'
const props = defineProps( {
    TrueName: {
        type: String,
        required: true,
    },
    MainUser: {
        type: Array,
        required: true,
    },
    MainUserInfo: {
        type: Array,
        required: true,
    },
    
})
const UserId = ref(0)
let ScrollBar = ref('')

const rr = () => {
    setTimeout(() => {
        ScrollBar = document.querySelectorAll("#messageBody");
        for(let i = 0; ScrollBar.length > i; i++) {
            ScrollBar[i].scrollTop = ScrollBar[i].scrollHeight;
        }
    }, 20);

    
}

const emits = defineEmits(['sendId'])
const sendId = () => {
    emits('sendId', UserId)

}

</script>



<style lang="scss" scoped>

.users {
    &-empty {
        text-align: center;
        margin-top: 20px;
        font-size: 24px;
        opacity: 0.6;
        font-weight: 700;
    }
    &__contact  {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 15px;
        border-bottom: 1px solid rgba(0,0,0,0.06);
        cursor: pointer;
        &:hover {
            background: #f5f5f5;
        }
    }
    &__img {
        position: relative;
        min-width: 45px;
        height: 45px;
        overflow: hidden;
        border-radius: 50%;
        cursor: pointer;
        margin-right: 10px;
    }
    &__img .user-img {
        position: relative;
        width: 45px;
        height: 45px;
    }
    &__info {
        position: relative;
        width: 100%;
    }
    &__head  {
        display: flex;
        justify-content: space-between;
        margin-bottom: 11px;
    }
    &__name {
        font-size: 17px;
        font-weight: 600;
        color: #111;
    }
    &__time {
        font-size: 12px;
        color: #aaa;
    }
    &__message {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &__item_active {
        background-color: #ebebeb;
    }
}

.chat-message {
    position: relative;
    color: #aaa;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    font-size: 14px;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 17px;
    text-overflow: ellipsis;
}



</style>
